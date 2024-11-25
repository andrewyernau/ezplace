import { Application, Router, Context } from "./deps.ts";
import {
  createUser,
  authenticateUser,
  checkUserExists,
  updateUserProfile,
} from "./controllers/userController.ts";
import { create, verify, config } from "./deps.ts";
import { getServerStatus } from "./services/minecraftService.ts";
import { vseMiddleware } from "./middleware/vseMiddleware.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import { UserProfileUpdate } from "./types/userTypes.ts";
import { oakCors } from "./deps.ts";
import mojangRouter from "./services/mojangService.ts";

const app = new Application();
const router = new Router();
const env = config();
const secretKey = env.KEY;

type RegisterFields = {
  username: string;
  password: string;
  email: string;
  minecraftUsername: string;
};
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

  const insertedId = await createUser(
    username,
    email,
    password,
    minecraftUsername
  );

  context.response.status = 201;
  context.response.body = { message: "User crated", id: insertedId };
});

type LoginFields = {
  email: string;
  password: string;
};

router.post("${this.path}/login", async (context) => {
  const body: LoginFields = await context.request.body.json();
  const { email, password } = body;
  const user = await authenticateUser(email, password);

  if (user) {
    const jwt = await create(
      { alg: "HS256", typ: "JWT" },
      { id: user._id.$oid },
      secretKey
    );

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

router.post("/api/fast-login", async (context) => {
  try {
    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = { message: "Request body is required" };
      return;
    }

    const body = context.request.body(); // Obtenemos el body
    const data = await body.value; // Extraemos los valores del body

    if (typeof data !== "object") {
      context.response.status = 400;
      context.response.body = { message: "Invalid body format, expected JSON" };
      return;
    }

    const { username } = data; // Accedemos al username
    if (!username) {
      context.response.status = 400;
      context.response.body = { message: "Username is required" };
      return;
    }

    const jwt = await create(
      { alg: "HS256", typ: "JWT" },
      { username }, // Incluimos el username en el token
      secretKey
    );

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);

    context.cookies.set("user", jwt, {
      httpOnly: true,
      secure: false, // Cambia a `true` en producción
      signed: true,
      sameSite: "lax",
      expires: expiryDate,
      path: "/",
    });

    context.response.body = { message: "Fast login successful", username };
  } catch (err) {
    console.error("Error handling /api/fast-login:", err);
    context.response.status = 500;
    context.response.body = { message: "Internal server error" };
  }
});


router.get("/api/session", async (context) => {
  const jwt = context.cookies.get("user");
  if (!jwt) {
    context.response.status = 401;
    context.response.body = { message: "Not logged in" };
    return;
  }

  try {
    const payload = await verify(jwt, secretKey, "HS256");
    context.response.body = { username: payload.username };
  } catch {
    context.response.status = 401;
    context.response.body = { message: "Invalid session" };
  }
});

router.post("/api/logout", async (context) => {
  context.cookies.set("user", "", {
    //Set the cookie with an age of 0
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
router.put("/api/user/profile", authMiddleware, async (context) => {
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

const corsOptions = {
  origin: (requestOrigin: string | undefined) => {
    const allowedOrigins = [
      "http://localhost:5173", // Desarrollo
      "https://ezplace.net", // Producción
    ];
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
      return requestOrigin; // Permitir origen específico
    }
    return ""; // Bloquear otros orígenes
  },
  credentials: true, // Permitir cookies/credenciales
};

app.use(oakCors(corsOptions));
app.use(vseMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(mojangRouter.routes());
app.use(mojangRouter.allowedMethods());
app.use(async (ctx, next) => {
  console.log("Middleware ejecutado para:", ctx.request.url);
  await next();
});

const PORT = 8000;
await app.listen({ port: PORT });
