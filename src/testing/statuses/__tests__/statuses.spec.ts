import { fakeRequesterFactory } from "../..";
import * as statuses from "..";
import { HttpRequest } from "../../../requests";

([
  ["ok", 200],
  ["unauthorized", 401],
  ["forbidden", 403],
  ["notFound", 404],
] as const).forEach(([name, status]) => {
  describe(`status: ${name}`, () => {
    describe("no parameters", () => {
      test(`response with status ${status} is returned`, async () => {
        const requester = fakeRequesterFactory(statuses[name]());

        const response = await requester({
          url: "requested_url",
          method: "PUT",
        });

        expect(response).toEqual({
          url: "requested_url",
          headers: {},
          status,
        });
      });
    });

    describe("no parameters", () => {
      test(`response with status ${status} is returned`, async () => {
        const requester = fakeRequesterFactory(statuses[name]());

        const response = await requester({
          url: "requested_url",
          method: "PUT",
        });

        expect(response).toEqual({
          url: "requested_url",
          headers: {},
          status,
        });
      });
    });

    describe("with results object", () => {
      test(`response with status ${status} and body is returned`, async () => {
        const body = {
          one: 1,
          two: "two",
          three: true,
        };
        const requester = fakeRequesterFactory(statuses[name](body));

        const response = await requester({
          url: "requested_url",
          method: "DELETE",
        });

        expect(response).toEqual({
          url: "requested_url",
          headers: {},
          status,
          body,
        });
      });
    });

    describe("with results object", () => {
      test(`response with status ${status} and body is returned`, async () => {
        const body = {
          one: 1,
          two: "two",
          three: true,
        };
        const requester = fakeRequesterFactory(statuses[name](body));

        const response = await requester({
          url: "requested_url",
          method: "DELETE",
        });

        expect(response).toEqual({
          url: "requested_url",
          headers: {},
          status,
          body,
        });
      });
    });

    describe("with results handler", () => {
      test("request is passed into handler", async () => {
        const handler = jest.fn();
        const requester = fakeRequesterFactory(statuses[name](handler));
        const request: HttpRequest = {
          url: "requested_url",
          method: "POST",
        };

        await requester(request);

        expect(handler).toHaveBeenCalledWith(request);
      });

      test(`response with status ${status} and body is returned`, async () => {
        const body = {
          one: 1,
          two: "two",
          three: true,
        };
        const requester = fakeRequesterFactory(statuses[name](() => body));

        const response = await requester({
          url: "requested_url",
          method: "GET",
        });

        expect(response).toEqual({
          url: "requested_url",
          headers: {},
          status,
          body,
        });
      });
    });
  });
});
