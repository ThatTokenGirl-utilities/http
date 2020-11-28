import { HttpRequest, HttpResponse, Requester } from "../+types";
import { Middleware } from "../../middleware/+types";
import addMiddleware from "../addMiddleware";

describe("function: addMiddleware", () => {
  const request: HttpRequest = {
    url: "request url",
    method: "POST",
  };
  const response: HttpResponse = {
    url: "response url",
    status: 200,
    headers: {},
  };

  let requester: Requester;
  beforeEach(() => {
    requester = jest.fn().mockResolvedValue(response);
  });

  test("factory creates a request function that runs the global middleware in order", () => {
    const first: Middleware = jest.fn((req, next) => {
      expect(second).not.toHaveBeenCalled();
      return next(req);
    });

    const second: Middleware = jest.fn((req, next) => {
      expect(first).toHaveBeenCalled();
      return next(req);
    });

    const requestWithMiddleware = addMiddleware(requester, first, second);

    return requestWithMiddleware(request).then((res) => {
      expect(requester).toHaveBeenCalledWith(request);
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);
      expect(res).toEqual(response);
    });
  });

  test("factory creates a request function that passes the modified request of first middleware into second", () => {
    const firstRequest: HttpRequest = {
      url: "first middleware",
      method: "GET",
      headers: {},
    };

    const first: Middleware = jest.fn((req, next) => {
      expect(req).toEqual(request);
      return next(firstRequest);
    });

    const secondRequest: HttpRequest = {
      url: "second middleware",
      method: "DELETE",
      headers: {},
    };

    const second: Middleware = jest.fn((req, next) => {
      expect(req).toEqual(firstRequest);
      return next(secondRequest);
    });

    const requestWithMiddleware = addMiddleware(requester, first, second);

    return requestWithMiddleware(request).then((res) => {
      expect(requester).toHaveBeenCalledWith(secondRequest);
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);
      expect(res).toEqual(response);
    });
  });
});
