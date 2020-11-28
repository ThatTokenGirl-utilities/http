import { clone } from "../requests";
import { Middleware } from "./+types";

export default function baseUrlMiddlewareFactory(baseUrl: string): Middleware {
  return (req, next) => {
    const { url } = req;

    req = clone(req, {
      url: combine(baseUrl, url),
    });

    return next(req);
  };
}

function combine(left: string, right: string) {
  if (left[left.length - 1] !== "/") {
    left += "/";
  }

  if (right[0] === "/") {
    right = right.substr(1);
  }

  return `${left}${right}`;
}
