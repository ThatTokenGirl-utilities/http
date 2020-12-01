import { TestHandler, Transformer } from "../+types";
import { HttpRequest, HttpResponse } from "../../requests";

export default function status<T>(statusCode: number): TestHandler;
export default function status<T>(statusCode: number, result: T): TestHandler;
export default function status<T>(
  statusCode: number,
  handler: Transformer<T>
): TestHandler;

export default function status<T>(
  statusCode: number,
  resultOrHandler?: T | Transformer<T>
): TestHandler {
  const handler =
    typeof resultOrHandler === "function"
      ? (resultOrHandler as Transformer<T>)
      : () => resultOrHandler;

  return (req) => {
    const body = handler(req);
    const response: HttpResponse = {
      url: req.url,
      status: statusCode,
      headers: {},
      body,
    };

    return Promise.resolve(response);
  };
}
