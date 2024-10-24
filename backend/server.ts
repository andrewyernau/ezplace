import { Application, Router, Context } from "./deps.ts";
import { createUser, authenticateUser, checkUserExists } from "./controllers/userController.ts";
import { create, verify, config } from "./deps.ts";
import { getServerStatus } from "./services/minecraftService.ts";



const app = new Application();
const router = new Router();
const env = config();
const secretKey = env.KEY; 

type RegisterFields = {
    username: string,
    password: string,
    email: string,
    minecraftUsername: string
}
// Minecraft related routes
router.get("/api/minecraft/status", async (context) => {
  const serverHost = "play.ezplace.es";

  const status = await getServerStatus(serverHost);
  context.response.body = status;
});

//Web related routes
router.post("/api/register", async (context) => {
  if (!context.request.hasBody) {
    context.response.status = 400;
    context.response.body = { message: "No body found in the request" };
    return;
  }

  const body: RegisterFields = await context.request.body.json();
  const { username, email, password, minecraftUsername } = body;

  if (!username || !email || !password || !minecraftUsername) {
    context.response.status = 400;
    context.response.body = { message: "Empty fields" };
    return;
  }

  const existingUser = await checkUserExists(email, username);
  if (existingUser) {
    context.response.status = 409; // HTTP Conflict
    context.response.body = { message: "Username or email already in use" };
    return;
  }

  const insertedId = await createUser(username, email, password, minecraftUsername );

  context.response.status = 201;
  context.response.body = { message: "User crated", id: insertedId };
});

type LoginFields = {
    email: string,
    password: string
}

router.post("/api/login", async (context) => {
  const body: LoginFields = await context.request.body.json()
  const { email, password } = body
  const user = await authenticateUser(email, password);
  if (user) {
    const jwt = await create({ alg: "HS256", typ: "JWT" }, { id: user._id.$oid }, secretKey);

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);

    context.cookies.set("user", jwt, {
      httpOnly: true,
      secure: false,
      signed: true,
      sameSite: "lax",
      expires: expiryDate,
      path: "/",
    });
    context.response.body = { message: "Logged in succesfully", token: jwt };
  } else {
    context.response.status = 401;
    context.response.body = { message: "Wrong credentials" };
  }
});



app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;
await app.listen({ port: PORT });
