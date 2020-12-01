import * as httpMethods from "..";
import { TestHandler } from "../../+types";
import { fakeRequesterFactory } from "../..";
import { HttpResponse, Requester } from "../../../requests";

["GET", "POST", "PUT", "DELETE"].forEach((method, _, array) => {
  const lower = method === "DELETE" ? "remove" : method.toLowerCase();
  describe(`httpMethod: ${lower}`, () => {
    const innerHandler = jest.fn();
    const requester: Requester = fakeRequesterFactory(
      httpMethods[lower](innerHandler)
    );

    beforeEach(() => {
      innerHandler.mockClear();
      innerHandler.mockImplementationOnce((req) => {
        const res: HttpResponse = {
          url: req.url,
          headers: {},
          status: 200,
        };

        return Promise.resolve(res);
      });
    });

    test(`${method} request returns response`, async () => {
      const res = await requester({
        url: `request_${lower}`,
        method: method as any,
      });

      expect(res).toEqual({
        url: `request_${lower}`,
        headers: {},
        status: 200,
      });
    });

    array
      .filter((x) => x !== method)
      .forEach((otherMethod) => {
        test(`${otherMethod} request returns a 500 response with error`, async () => {
          const request = {
            url: `request_${lower}`,
            method: otherMethod as any,
          };

          const response = await requester(request);

          expect(response.status).toBe(500);
          expect(response.url).toBe(request.url);
          expect(response.body).toBeTruthy();
          expect(response.body.mockRequesterError).toBeTruthy();
        });
      });
  });
});
