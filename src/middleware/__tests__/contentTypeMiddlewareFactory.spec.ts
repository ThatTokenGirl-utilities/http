import { contentType } from "..";
import { addMiddleware, clone, HttpRequest } from "../../requests";

describe("middleware: contentType", () => {
  test("adds content type to header", async () => {
    const requester = jest.fn();
    const request: HttpRequest = { url: "request-url", method: "POST" };
    const requesterWithMiddleware = addMiddleware(
      requester,
      contentType("content type")
    );
    await requesterWithMiddleware(request);

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
    const requesterWithMiddleware = addMiddleware(
      requester,
      contentType("new content type")
    );
    await requesterWithMiddleware(request);

    expect(requester).toHaveBeenCalledWith(
      clone(request, {
        headers: { "Content-Type": "content type" },
      })
    );
  });
});
