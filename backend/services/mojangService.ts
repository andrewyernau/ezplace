import { Application, Router } from "../deps.ts";

const router = new Router();

// Middleware para configurar CORS
const corsMiddleware = async (ctx: any, next: any) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
};

// Ruta que obtiene el perfil de usuario de Mojang
router.get("/mojang-api/users/profiles/minecraft/:username", async (context) => {
  const { username } = context.params;

  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  
  if (response.ok) {
    const data = await response.json();
    context.response.status = 200;
    context.response.body = data; // Enviar los datos del perfil de usuario
  } else {
    context.response.status = 404;
    context.response.body = { error: "User not found" };
  }
});

const app = new Application();
app.use(corsMiddleware); // Añadir el middleware de CORS
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
