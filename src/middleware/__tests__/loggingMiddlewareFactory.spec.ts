import { logging } from "..";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  Requester,
} from "../../requests";
import { httpClientFactory } from "../../requests";

describe("middleware: logging", () => {
  let requester: Requester;
  let client: HttpClient;
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

      client = httpClientFactory(requester, logging({ logger }));
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

      return client.request(request).then(() => {
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

      return client.request(request).then((res) => {
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

      return client.request(request).catch(() => {
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

      return client.request(request).catch((err) => {
        expect(err).toBe(error);
      });
    });
  });
});
