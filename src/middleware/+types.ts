import { HttpRequest, HttpResponse } from "../requests/+types";

export type MiddlewareHandler = (req: HttpRequest) => Promise<HttpResponse>;
export type Middleware = (
  req: HttpRequest,
  next: MiddlewareHandler
) => Promise<HttpResponse>;
export type FormattedBody = string | object | boolean | number;
export type Formatter = ((req: HttpRequest) => FormattedBody | null) | {
    matches: string,
    formatter: (body: string) => FormattedBody
}