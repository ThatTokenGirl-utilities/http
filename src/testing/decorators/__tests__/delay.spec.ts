import { fakeRequesterFactory } from "../..";
import { delay } from "..";
import { HttpRequest, HttpResponse } from "../../../requests";

jest.useFakeTimers();

describe("decorator: delay", () => {
  const handler = jest.fn();
  const requester = fakeRequesterFactory(delay(100)(handler));

  beforeEach(() => {
    handler.mockClear();
    (setTimeout as any).mockClear();
  });

  describe("handler handles request", () => {
    let response: HttpResponse;
    beforeEach(() => {
      response = {
        url: "url",
        status: 200,
        headers: {},
      };

      handler.mockResolvedValueOnce(response);
    });

    test("response is resolved after timer", async () => {
      const request: HttpRequest = {
        url: "url",
        method: "GET",
      };
      const responsePromise = requester(request);

      expect(handler).toHaveBeenCalledWith(request);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
      jest.advanceTimersByTime(100);

      const result = await responsePromise;

      expect(result).toEqual(response);
    });
  });

  describe("handler doesn't handle request", () => {
    beforeEach(() => {
      handler.mockImplementationOnce(() => null);
    });

    test("setTimeout is never called", async () => {
      const request: HttpRequest = {
        url: "url",
        method: "POST",
      };

      await requester(request);

      expect(handler).toHaveBeenCalledWith(request);
      expect(setTimeout).not.toHaveBeenCalled();
    });
  });
});
