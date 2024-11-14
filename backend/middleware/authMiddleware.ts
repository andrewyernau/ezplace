import { Context } from "../deps.ts";
import { verify,config } from "../deps.ts";

export async function authMiddleware(context: Context, next: Function) {
    const env = config();
    const jwt = await context.cookies.get("user", { signed: true });

    if (jwt) {
        try {
            const payload = await verify(jwt, env.KEY || "", "HS256");
            context.state.user = payload;
            await next(); 
        } catch (error) {
        context.response.status = 401;
        context.response.body = { message: "Invalid token" };
        return;
    }
    } else {
        context.response.status = 401;
        context.response.body = { message: "Authentication required" };
  }
}