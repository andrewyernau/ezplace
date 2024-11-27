import { Hono } from "hono";
import { cors } from "hono/cors";
import mojangRouter from "./services/mojangService.ts";
import { jwt, sign, verify, decode } from "hono/jwt";
import { setCookie, getCookie } from "./deps.ts";
import { getServerStatus } from "./services/minecraftService.ts";
import { config } from "./deps.ts";

const app = new Hono();
const env = config();
const secretKey = "my-secret-key";
// Configurar CORS globalmente para todas las rutas
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"], // Permitir solicitudes desde el cliente
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    credentials: true, // Permitir envío de cookies y credenciales
  })
);

// Agregar rutas de servicios externos como el de Mojang
app.route("/", mojangRouter);

app.get("/api/minecraft/status", async (c) => {
  const host = "play.ezplace.es";
  const status = await getServerStatus(host);
  return c.json(status, 200);
});

// Rutas protegidas con JWT
app.post("/api/fast-login", async (c) => {
  try {
    const { username, id } = await c.req.json(); // El cliente debe enviar también el ID

    if (!username || !id) {
      return c.json({ message: "Username and ID are required" }, 400);
    }

    const token = await sign({ username, id }, secretKey, "HS256"); // Incluye ambos valores

    setCookie(c, "session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return c.json({ message: "Fast login successful", username });
  } catch (error) {
    console.error("Fast login error:", error);
    return c.json(
      { error: "Internal server error while creating a cookie" },
      500
    );
  }
});

app.get("/api/session", async (c) => {
  const jwtCookie = getCookie(c, "session");

  if (!jwtCookie) {
    return c.json({ message: "No session cookie found. Please log in." }, 401);
  }

  try {
    const payload = await verify(jwtCookie, secretKey, "HS256");
    return c.json({ username: payload.username, id: payload.id }); // Incluye `id` en la respuesta
  } catch (error) {
    console.error("Session verification error:", error);
    return c.json({ error: "Invalid or expired session token." }, 401);
  }
});

app.post("/api/logout", async (c) => {
  try {
    
    setCookie(c, "session", "", { 
      httpOnly: true, 
      secure: true, 
      sameSite: "Lax", 
      maxAge: 0, 
    });
    
    return c.json({ message: "Logout successful" });
  } catch (error) {
    console.error("logout error:", error);
    return c.json(
      { error: "Internal server error while deleting a cookie" },
      500
    );
  }
});

// Middleware para manejar solicitudes no definidas
app.notFound((c) => c.text("Not Found", 404));

// Inicializar el servidor
Deno.serve({ port: 8000 }, app.fetch);
