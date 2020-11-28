import { HttpClient, Requester } from "./+types";

export default function httpClientFactory(requester: Requester): HttpClient {
  const request = requester;
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
