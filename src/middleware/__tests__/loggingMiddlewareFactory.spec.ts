import { logging } from "..";
import {
  addMiddleware,
  HttpRequest,
  HttpResponse,
  Requester,
} from "../../requests";

describe("middleware: logging", () => {
  let requester: Requester;
  let requesterWithMiddleware: Requester;
  let responsePromise: Promise<HttpResponse>;

  beforeEach(() => {
    requester = jest.fn(() => responsePromise);
  });

  describe("logging middlename with simple logger", () => {
    let logger: { log: jest.Mock; error: jest.Mock };
    beforeEach(() => {
      logger = {
        log: jest.fn(),
        error: jest.fn(),
      };

      requesterWithMiddleware = addMiddleware(requester, logging({ logger }));
    });

    test("for success, logs both request and response", () => {
      const request: HttpRequest = {
        url: "request_url",
        method: "POST",
      };

      const response: HttpResponse = {
        url: "resposne_url",
        status: 200,
        headers: {},
        statusText: "status text",
        body: {},
      };

      responsePromise = Promise.resolve(response);

      return requesterWithMiddleware(request).then(() => {
        expect(logger.log).toHaveBeenCalledTimes(2);
        expect(logger.log).toHaveBeenCalledWith(request);
        expect(logger.log).toHaveBeenCalledWith(response);
      });
    });

    test("for success, the response is returned", () => {
      const request: HttpRequest = {
        url: "request_url",
        method: "POST",
      };

      const response: HttpResponse = {
        url: "resposne_url",
        status: 200,
        headers: {},
        statusText: "status text",
        body: {},
      };

      responsePromise = Promise.resolve(response);

      return requesterWithMiddleware(request).then((res) => {
        expect(res).toBe(response);
      });
    });

    test("for error, logs requeset and err", () => {
      const request: HttpRequest = {
        url: "request_url",
        method: "POST",
      };
      const error = "error message";

      responsePromise = Promise.reject(error);

      return requesterWithMiddleware(request).catch(() => {
        expect(logger.error).toHaveBeenCalledWith(request, error);
      });
    });

    test("for error, err is rethrown", () => {
      const request: HttpRequest = {
        url: "request_url",
        method: "POST",
      };
      const error = "error message";

      responsePromise = Promise.reject(error);

      return requesterWithMiddleware(request).catch((err) => {
        expect(err).toBe(error);
      });
    });
  });
});
