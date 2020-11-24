import { HttpHeaders } from "../headers";

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
