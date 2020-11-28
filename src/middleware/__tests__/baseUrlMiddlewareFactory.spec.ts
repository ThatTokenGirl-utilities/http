import { baseUrl } from "..";
import { addMiddleware, Requester } from "../../requests";

describe("middleware: baseUrl", () => {
  const innerRequester = jest
    .fn()
    .mockImplementation(() => Promise.resolve({}));

  beforeEach(() => {
    innerRequester.mockClear();
  });

  test("combines base url ending in a slash and request url NOT starting with a slash", async () => {
    const requester = addMiddleware(
      innerRequester,
      baseUrl("https://base_url/")
    );

    await requester({ url: "request_url", method: "GET" });

    expect(innerRequester).toHaveBeenCalledWith({
      url: "https://base_url/request_url",
      method: "GET",
    });
  });

  test("combines base url NOT ending in a slash and request url NOT starting with a slash", async () => {
    const requester = addMiddleware(
      innerRequester,
      baseUrl("https://base_url")
    );

    await requester({ url: "request_url", method: "GET" });

    expect(innerRequester).toHaveBeenCalledWith({
      url: "https://base_url/request_url",
      method: "GET",
    });
  });

  test("combines base url NOT ending in a slash and request url starting with a slash", async () => {
    const requester = addMiddleware(
      innerRequester,
      baseUrl("https://base_url")
    );

    await requester({ url: "/request_url", method: "GET" });

    expect(innerRequester).toHaveBeenCalledWith({
      url: "https://base_url/request_url",
      method: "GET",
    });
  });

  test("combines base url ending in a slash and request url starting with a slash", async () => {
    const requester = addMiddleware(
      innerRequester,
      baseUrl("https://base_url/")
    );

    await requester({ url: "/request_url", method: "GET" });

    expect(innerRequester).toHaveBeenCalledWith({
      url: "https://base_url/request_url",
      method: "GET",
    });
  });
});
