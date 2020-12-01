import { TestHandler } from "../+types";
import { HttpResponse } from "../../requests";

export default function decoratorFactory<Args extends any[]>(
  action: (
    response: Promise<HttpResponse>,
    ...args: Args
  ) => Promise<HttpResponse>
): (...args: Args) => (inner: TestHandler) => TestHandler {
  return (...args: Args) => {
    return (inner) => {
      return (req) => {
        const res = inner(req);
        if (!res) return null;

        return action(res, ...args);
      };
    };
  };
}
