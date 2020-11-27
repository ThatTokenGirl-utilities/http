import { HttpClient, httpClientFactory, HttpRequest } from "../../requests";
import { fetchRequester } from "..";
import { entries } from "../../headers";

describe("requester: fetchRequester", () => {
  const fetchMock = jest
    .fn()
    .mockImplementation(() => Promise.resolve(new Response()));
  global.fetch = fetchMock;

  let httpClient: HttpClient;

  beforeEach(() => {
    fetchMock.mockClear();
    httpClient = httpClientFactory(fetchRequester());
  });

  test("fetch requet is made", () => {
    const request: HttpRequest = {
      url: "request-url",
      method: "POST",
      headers: {
        header1: "one",
        header2: ["2.1", "2.2"],
      },
      body: { one: "one", two: 2 },
    };

    return httpClient.request(request).then(() => {
      const headers = new Headers();
      headers.append("header1", "one");
      headers.append("header2", "2.1,2.2");
      expect(fetchMock).toHaveBeenCalledWith(
        new Request(request.url, {
          method: "POST",
          headers,
          body: request.body,
        })
      );
    });
  });

  test("json response returns body with javascript object", async () => {
    const body = { one: "one", two: 2 };

    fetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        new Response(JSON.stringify(body), {
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
      )
    );

    const response = await httpClient.get("request_url");

    expect(response.body).toEqual(body);
  });

  test("url is set on response", async () => {
    const body = { one: "one", two: 2 };
    const fetchResponse = new Response(JSON.stringify(body), {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    Object.defineProperty(fetchResponse, "url", { value: "response_url" });
    fetchMock.mockImplementationOnce(() => Promise.resolve(fetchResponse));

    const response = await httpClient.get("request_url");

    expect(response.url).toEqual("response_url");
  });

  test("status and statusText is set on response", async () => {
    const body = { one: "one", two: 2 };
    const fetchResponse = new Response(JSON.stringify(body), {
      status: 400,
      statusText: "status text",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    fetchMock.mockImplementationOnce(() => Promise.resolve(fetchResponse));

    const response = await httpClient.get("request_url");

    expect(response.status).toEqual(400);
    expect(response.statusText).toEqual("status text");
  });
});
