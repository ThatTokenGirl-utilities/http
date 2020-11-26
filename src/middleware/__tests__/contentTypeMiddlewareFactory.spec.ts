import { contentType } from "..";
import { clone, httpClientFactory, HttpRequest } from "../../requests";

describe("middleware: contentType", () => {
  test("adds content type to header", async () => {
    const requester = jest.fn();
    const request: HttpRequest = { url: "request-url", method: "POST" };
    const client = httpClientFactory(requester, contentType("content type"));
    await client.request(request);

    expect(requester).toHaveBeenCalledWith(
      clone(request, {
        headers: { "Content-Type": "content type" },
      })
    );
  });

  test("only adds Content-Type if not exist on request", async () => {
    const requester = jest.fn();
    const request: HttpRequest = {
      url: "request-url",
      method: "POST",
      headers: { "Content-Type": "content type" },
    };
    const client = httpClientFactory(
      requester,
      contentType("new content type")
    );
    await client.request(request);

    expect(requester).toHaveBeenCalledWith(
      clone(request, {
        headers: { "Content-Type": "content type" },
      })
    );
  });
});
