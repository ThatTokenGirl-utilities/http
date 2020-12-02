import { fakeRequesterFactory, path } from "..";
import { clone, HttpRequest, HttpResponse } from "../../requests";
import { ok } from "../statuses";

describe("handler: path", () => {
  const handler = jest.fn();
  const requester = fakeRequesterFactory(path("one/two/:param")(handler));

  beforeEach(() => {
    handler.mockClear();
    handler.mockImplementationOnce((req) => {
      const response: HttpResponse = {
        url: req.url,
        status: 200,
        headers: {},
      };

      return Promise.resolve(response);
    });
  });

  test("can chain path with other test handler", async () => {
    const requestHandler = fakeRequesterFactory(path("one/:param")(ok()));

    const response = await requestHandler({
      url: "one/2",
      method: "PUT",
    });

    expect(response).toEqual({
      url: "one/2",
      status: 200,
      headers: {},
    });
  });

  describe("when path matches", () => {
    const request: HttpRequest = {
      url: "one/two/three",
      method: "GET",
    };

    test("the response is returned", async () => {
      const response = await requester(request);

      expect(response).toEqual({
        url: "one/two/three",
        status: 200,
        headers: {},
      });
    });

    test("request and params are passed to handler", async () => {
      const newRequest = clone(request, {
        body: {
          value1: "one",
          value2: 2,
        },
      });
      await requester(newRequest);

      expect(handler).toHaveBeenCalledWith(newRequest, {
        param: "three",
      });
    });
  });

  describe(`when path doesn't match`, () => {
    const request: HttpRequest = {
      url: "another_url",
      method: "POST",
    };

    test("response with 500 status and mock error message returned", async () => {
      const response = await requester(request);

      expect(response.status).toBe(500);
      expect(response.body).toBeTruthy();
      expect(response.body.mockRequesterError).toBeTruthy();
    });
  });
});
