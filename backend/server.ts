import { Application, Router, Context } from "./deps.ts";
import { createUser, authenticateUser, checkUserExists,updateUserProfile } from "./controllers/userController.ts";
import { create, verify, config } from "./deps.ts";
import { getServerStatus } from "./services/minecraftService.ts";
import { vseMiddleware } from "./middleware/vseMiddleware.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import { UserProfileUpdate } from "./types/userTypes.ts";



const app = new Application();
const router = new Router();
const env = config();
const secretKey = env.KEY;
const path = 'api/auth';

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
router.post("${this.path}/register", async (context) => {
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

router.post("${this.path}/login", async (context) => {
  const body: LoginFields = await context.request.body.json();
  const { email, password } = body;
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
    context.response.body = { message: "Logged in successfully" };
  } else {
    context.response.status = 401;
    context.response.body = { message: "Wrong credentials" };
  }
});

router.post("${this.path}/logout", async (context) => {
  context.cookies.set("user", "", { //Set the cookie with an age of 0
    httpOnly: true,
    secure: false,
    signed: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  
  context.response.status = 200;
  context.response.body = { message: "Logged out successfully" };
});
router.put("${this.path}/user/profile", authMiddleware, async (context) => {
  const userId = context.state.user.id;
  const body = await context.request.body().value;

  const updatedData: UserProfileUpdate = {
    username: body.username,
    email: body.email,
    avatar: body.avatar,
    // Asegúrate de capturar solo los campos permitidos para actualizar
  };

  const success = await updateUserProfile(userId, updatedData);

  if (success) {
    context.response.body = { message: "Profile updated successfully" };
  } else {
    context.response.status = 500;
    context.response.body = { message: "Failed to update profile" };
  }
});



app.use(vseMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;
await app.listen({ port: PORT });
