import { Context } from "../deps.ts";
import { isValidEmail, isValidPassword } from "../utils/validation.ts";
import { sanitizeText } from "../utils/sanitization.ts";
import { escapeString } from "../utils/escaping.ts";

export async function vseMiddleware(context: Context, next: Function) {
  if (context.request.hasBody) {
    const body = await context.request.body().value;

    for (const key in body) {
      if (typeof body[key] === "string") {
        // Sanitization and escaping
        body[key] = escapeString(sanitizeText(body[key]));

        // Validation
        if (key === "email" && !isValidEmail(body[key])) {
          context.response.status = 400;
          context.response.body = { message: "Invalid email format" };
          return;
        }
        if (key === "password" && !isValidPassword(body[key])) {
          context.response.status = 400;
          context.response.body = { message: "Password must be at least 8 characters" };
          return;
        }
      }
    }

    // Guardar el cuerpo procesado en el estado del contexto en lugar de sobrescribir `context.request.body`
    context.state.sanitizedBody = body;
  }
  await next();
}
