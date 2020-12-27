import { jsonBody } from "..";
import { addMiddleware, clone, HttpRequest, HttpResponse, Requester } from "../../requests";

describe('middleware: jsonBody', () => {
    test('parses string body into object', async () => {
        const response: HttpResponse = {
            url: 'test',
            status: 200,
            headers: {},
            body: JSON.stringify({ test: 'value' })
        }
        const requester = jest.fn().mockResolvedValue(response);
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
        const result = await requesterWithMiddleware(request);

        expect(requester).toHaveBeenCalledWith(request
        );
        expect(result).toEqual({
            ...response,
            body: JSON.parse(response.body)
        });
    });
});