import { Router } from "../deps.ts";

const mojangRouter = new Router();

// Ruta que obtiene el perfil de usuario de Mojang
mojangRouter.get("/mojang-api/users/profiles/minecraft/:username", async (context) => {
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

export default mojangRouter;
