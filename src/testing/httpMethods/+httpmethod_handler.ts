import { TestHandler } from "../+types";

export default function httpmethod_handler(
  method: "GET" | "POST" | "PUT" | "DELETE"
): (handler: TestHandler) => TestHandler {
  return (handler) => (req) => {
    if (req.method === method) {
      return handler(req);
    }

    return null;
  };
}
