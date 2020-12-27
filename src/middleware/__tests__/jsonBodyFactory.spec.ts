import { jsonBody } from "..";
import { addMiddleware, clone, HttpRequest, Requester } from "../../requests";

describe('middleware: jsonBody', () => {
    test('converts object body into a json string', async () => {
        const requester = jest.fn();
        const body = {
            one: 1,
            two: 'two',
            three: true
        };
        const request: HttpRequest = { url: "request-url", method: "POST", body };
        const requesterWithMiddleware = addMiddleware(
            requester,
            jsonBody()
        );
        await requesterWithMiddleware(request);

        expect(requester).toHaveBeenCalledWith(
            clone(request, {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
        )
    });

    test(`doesn't convert body if body is undefined; application/json added to header`, async () => {
        const requester = jest.fn();
        const request: HttpRequest = { url: "request-url", method: "POST" };
        const requesterWithMiddleware = addMiddleware(
            requester,
            jsonBody()
        );
        await requesterWithMiddleware(request);

        expect(requester).toHaveBeenCalledWith(
            clone(request, {
                headers: { 'Content-Type': 'application/json' },
            })
        )
    });

    test(`doesn't convert body if body is null; application/json added to header`, async () => {
        const requester = jest.fn();
        const request: HttpRequest = { url: "request-url", method: "POST", body: null };
        const requesterWithMiddleware = addMiddleware(
            requester,
            jsonBody()
        );
        await requesterWithMiddleware(request);

        expect(requester).toHaveBeenCalledWith(
            clone(request, {
                headers: { 'Content-Type': 'application/json' },
            })
        )
    });
});