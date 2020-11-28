import { HttpRequest, HttpResponse, Requester } from "../+types";
import { Middleware } from "../../middleware/+types";
import httpClientFactory from "../httpClientFactory";

describe("function: makeRequestFactory", () => {
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

  test("factory creates a request function that returns the response from the requester", () => {
    const { request: makeRequest } = httpClientFactory(requester);

    return makeRequest(request).then((res) => {
      expect(requester).toHaveBeenCalledWith(request);
      expect(res).toEqual(response);
    });
  });

  test(`get function makes a 'GET' request`, () => {
    const client = httpClientFactory(requester);

    return client.get("get_url").then(() => {
      expect(requester).toHaveBeenCalledWith({ url: "get_url", method: "GET" });
    });
  });

  test(`post function makes a 'POST' request`, () => {
    const client = httpClientFactory(requester);
    const body = { one: "one", two: 2 };
    return client.post("post_url", body).then(() => {
      expect(requester).toHaveBeenCalledWith({
        url: "post_url",
        body,
        method: "POST",
      });
    });
  });

  test(`put function makes a 'PUT' request`, () => {
    const client = httpClientFactory(requester);
    const body = { one: "one", two: 2 };
    return client.put("put_url", body).then(() => {
      expect(requester).toHaveBeenCalledWith({
        url: "put_url",
        body,
        method: "PUT",
      });
    });
  });

  test(`delete function makes a 'DELETE' request`, () => {
    const client = httpClientFactory(requester);

    return client.delete("delete_url").then(() => {
      expect(requester).toHaveBeenCalledWith({
        url: "delete_url",
        method: "DELETE",
      });
    });
  });
});
