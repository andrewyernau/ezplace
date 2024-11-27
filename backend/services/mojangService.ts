import { Hono } from 'hono';

const mojangRouter = new Hono();

// Ruta que obtiene el perfil de usuario de Mojang
mojangRouter.get('/mojang-api/users/profiles/minecraft/:username', async (c) => {
  const username = c.req.param('username'); // Obtener el parámetro de la URL

  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  if (response.ok) {
    const data = await response.json();
    return c.json(data, 200); // Enviar los datos del perfil de usuario
  } else {
    return c.json({ error: 'User not found' }, 404);
  }
});

export default mojangRouter;
