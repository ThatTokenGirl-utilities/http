import { HttpHeaders } from "../headers";
import { Middleware, MiddlewareHandler } from "../middleware/+types";
import { HttpRequest, HttpResponse, Requester } from "./+types";

type RequestOptions = {
  headers?: HttpHeaders;
};

type HttpClient = {
  request(
    request: HttpRequest,
    ...middleware: Middleware[]
  ): Promise<HttpResponse>;

  get(url: string, opt?: RequestOptions): Promise<HttpResponse>;
  put(url: string, data?: any, opt?: RequestOptions): Promise<HttpResponse>;
  post(url: string, data?: any, opt?: RequestOptions): Promise<HttpResponse>;
  delete(url: string, opt?: RequestOptions): Promise<HttpResponse>;
};

export default function httpClientFactory(
  requester: Requester,
  ...middleware: Middleware[]
): HttpClient {
  const request = async (
    request: HttpRequest,
    ...additionalMiddleware: Middleware[]
  ) => {
    const all = [...middleware, ...additionalMiddleware];
    const action = all.length
      ? all.reduceRight((handler: MiddlewareHandler, m) => {
          return async (req) => await m(req, handler);
        }, requester)
      : requester;

    const res = await action(request);

    return res;
  };

  return {
    request,
    get: (url, opts = {}) => request({ ...opts, url, method: "GET" }),
    post: (url, body, opts = {}) =>
      request({ ...opts, url, body, method: "POST" }),
    put: (url, body, opts = {}) =>
      request({ ...opts, url, body, method: "PUT" }),
    delete: (url, opts = {}) => request({ ...opts, url, method: "DELETE" }),
  };
}
