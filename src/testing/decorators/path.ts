import createMatcher from "../+createMatcher";
import { TestHandler } from "../+types";
import { HttpRequest, HttpResponse } from "../../requests";

export default function path<T>(
  template: string
): (
  handler: (req: HttpRequest, params: T) => Promise<HttpResponse>
) => TestHandler {
  const matcher = createMatcher(template);

  return (handler) => {
    return (req) => {
      console.log(req);
      const match = matcher(req.url);
      console.log(match);
      if (match) {
        return handler(req, match as any);
      }

      return null;
    };
  };
}
