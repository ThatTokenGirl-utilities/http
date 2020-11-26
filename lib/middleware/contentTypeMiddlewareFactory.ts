import { modify } from "../headers";
import { clone } from "../requests";
import { Middleware } from "./+types";

export default function contentTypeFactoryMiddleware(
  contentType: string
): Middleware {
  return (req, next) => {
    if (!req.headers || !req.headers["Content-Type"]) {
      req = clone(req, {
        headers: modify(req.headers, { "Content-Type": contentType }),
      });
    }

    return next(req);
  };
}
