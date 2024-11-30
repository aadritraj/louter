import { Router } from "./router.ts";
import type { Method } from "./router.ts";

const thisRouter = new Router();

thisRouter.addRoute("GET", "/", () => "Base route");
thisRouter.addRoute("GET", "/example", () => "Example route");

Deno.serve((req) => {
  const url = new URL(req.url);

  const method = req.method as Method;
  const path = url.pathname;

  console.log(method, path);

  const request = thisRouter.handle(method, path);

  return new Response(request, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
});
