import { HttpRequest, HttpResponse } from "../../requests";
import fakeRequesterFactory from "../fakeRequesterFactory";

describe("fakeRequesterFactory", () => {
  describe("using an inner fakeRequester", () => {
    const innerHandler = jest.fn();
    const outerHandler = jest.fn();

    const inner = fakeRequesterFactory(innerHandler);
    const requester = fakeRequesterFactory(inner, outerHandler);

    beforeEach(() => {
      innerHandler.mockClear();
      outerHandler.mockClear();
    });

    describe("inner requester fulfils request", () => {
      const response: HttpResponse = {
        url: "inner_url",
        headers: {},
        status: 200,
      };

      beforeEach(() => {
        innerHandler.mockResolvedValueOnce(response);
        outerHandler.mockResolvedValueOnce({
          url: "outer_url",
          headers: {},
          status: 200,
        });
      });

      test("response from inner requester is returned", async () => {
        const request: HttpRequest = {
          url: "request_url",
          method: "GET",
        };

        const result = await requester(request);

        expect(innerHandler).toHaveBeenCalledWith(request);
        expect(outerHandler).not.toHaveBeenCalled();

        expect(result).toEqual(response);
      });
    });

    describe("inner requester does not fulfill request", () => {
      const response: HttpResponse = {
        url: "outer_url",
        headers: {},
        status: 200,
      };

      beforeEach(() => {
        outerHandler.mockResolvedValueOnce(response);
      });

      test("response from outer requester is returned", async () => {
        const request: HttpRequest = {
          url: "request_url",
          method: "GET",
        };

        const result = await requester(request);
        expect(result).toEqual(response);
        expect(innerHandler).toHaveBeenCalledWith(request);
        expect(outerHandler).toHaveBeenCalledWith(request);
      });
    });
  });
});
