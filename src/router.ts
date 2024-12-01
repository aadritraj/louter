import { red } from "@std/fmt/colors";
export type Method = "GET" | "POST" | "PUT";

interface Route {
  path: string;
  method: Method;
  handler: () => string;
}

export class Router {
  private routes: Route[] = [];

  public getRoute(method: Method, path: string) {
    return this.routes.find((r) => r.method === method && r.path === path);
  }

  public addRoute(method: Method, path: string, handler: () => string) {
    const routeExists = this.getRoute(method, path);

    if (routeExists) {
      console.warn(
        red("ERR"),
        `Attempt to register route ${path} as ${method} twice! Skipping...`,
      );
      return;
    }

    this.routes.push({ path, method, handler });
  }

  public handle(method: Method, path: string) {
    const route = this.getRoute(method, path);

    if (route) {
      return route.handler();
    }

    return "404";
  }
}
