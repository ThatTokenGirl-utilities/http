import { HttpHeaders } from "../headers";
import { Middleware } from "../middleware/+types";

export interface HttpRequest {
  readonly url: string;
  readonly method:
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";
  readonly body?: any;
  readonly headers?: HttpHeaders;
}

export type HttpResponse = {
  readonly url: string;
  readonly status: number;
  readonly headers: HttpHeaders;
  readonly statusText?: string;
  readonly body?: any;
};

export type Requester = (req: HttpRequest) => Promise<HttpResponse>;

type RequestOptions = {
  headers?: HttpHeaders;
};

export type HttpClient = {
  request(
    request: HttpRequest,
    ...middleware: Middleware[]
  ): Promise<HttpResponse>;

  get(url: string, opt?: RequestOptions): Promise<HttpResponse>;
  put(url: string, data?: any, opt?: RequestOptions): Promise<HttpResponse>;
  post(url: string, data?: any, opt?: RequestOptions): Promise<HttpResponse>;
  delete(url: string, opt?: RequestOptions): Promise<HttpResponse>;
};
