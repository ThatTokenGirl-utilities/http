import { clone } from "../requests";
import createMatcher from "./+createMatcher";
import { DataHandler, TestHandler } from "./+types";

export default function path<T>(
  template: string,
  handler: TestHandler
): TestHandler {
  const matcher = createMatcher(template);

  return (req) => {
    const match = matcher(req.url);

    if (match) {
      return handler(
        clone(req, {
          body: {
            ...req.body,
            ...match,
          },
        })
      );
    }

    return null;
  };
}
