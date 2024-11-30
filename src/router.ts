export type Method = "GET" | "POST" | "PUT";

interface Route {
  path: string;
  method: Method;
  handler: () => string;
}

export class Router {
  private routes: Route[] = [];

  public addRoute(method: Method, path: string, handler: () => string) {
    this.routes.push({ path, method, handler });
  }

  public handle(method: Method, path: string) {
    const route = this.routes.find((r) =>
      r.method === method && r.path === path
    );

    if (route) {
      return route.handler();
    }

    return "404";
  }
}
