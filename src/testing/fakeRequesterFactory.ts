import { Requester } from "../requests";
import { TestHandler } from "./+types";

export default function fakeRequesterFactory(
  ...handlers: TestHandler[]
): Requester {
  return async (req) => {
    for (let i = 0; i < handlers.length; i++) {
      const handlerResult = handlers[i](req);

      if (handlerResult) {
        const result = await handlerResult;

        if (result.status !== 500 && !("mockRequesterError" in result)) {
          return result;
        }
      }
    }

    const mockRequesterError = `No handler was able to handle the requested url: ${req.method} ${req.url}`;

    return {
      url: req.url,
      status: 500,
      headers: {},
      body: {
        mockRequesterError,
      },
    };
  };
}
