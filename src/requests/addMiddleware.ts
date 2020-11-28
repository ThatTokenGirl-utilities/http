import { Middleware, MiddlewareHandler } from "../middleware";
import { Requester, HttpRequest } from "./+types";

export default function addMiddleware(
  requester: Requester,
  ...middleware: Middleware[]
): Requester {
  return async (request: HttpRequest) => {
    const all = [...middleware];
    const action = all.length
      ? all.reduceRight((handler: MiddlewareHandler, m) => {
          return async (req) => await m(req, handler);
        }, requester)
      : requester;

    const res = await action(request);

    return res;
  };
}
