import { fakeRequesterFactory, path } from "..";
import { clone, HttpRequest, HttpResponse } from "../../requests";
import { ok } from "../statuses";

describe("handler: path", () => {
  const handler = jest.fn();
  const requester = fakeRequesterFactory(path("one/two/:param", handler));

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

    test("for null body, a new body is created with parameters from url added", async () => {
      await requester(request);

      expect(handler).toHaveBeenCalledWith(
        clone(request, {
          body: {
            param: "three",
          },
        })
      );
    });

    test("for existing body, parameters from url are added to body", async () => {
      const newRequest = clone(request, {
        body: {
          value1: "one",
          value2: 2,
        },
      });

      await requester(newRequest);

      expect(handler).toHaveBeenCalledWith(
        clone(newRequest, {
          body: {
            ...newRequest.body,
            param: "three",
          },
        })
      );
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
