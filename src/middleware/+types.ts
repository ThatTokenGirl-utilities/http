import { HttpRequest, HttpResponse } from "../requests/+types";

export type MiddlewareHandler = (req: HttpRequest) => Promise<HttpResponse>;
export type Middleware = (
  req: HttpRequest,
  next: MiddlewareHandler
) => Promise<HttpResponse>;
