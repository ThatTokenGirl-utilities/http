import { contentFormatters } from "../../middleware";
import { addMiddleware, clone, HttpRequest } from "../../requests";
import { jsonFormatter } from '../index';

describe('formatter: jsonFormatter', () => {
    const requester = jest.fn();
    const withMiddleware = addMiddleware(requester, contentFormatters(jsonFormatter));

    beforeEach(() => {
        requester.mockClear();
    })

    describe('content-type is application/json', () => {
        test('body is stringified', async () => {
            const request: HttpRequest = {
                url: 'testurl',
                body: { test: 'body' },
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            };

            await withMiddleware(request);

            expect(requester).toHaveBeenCalledWith(clone(request, {
                body: JSON.stringify(request.body)
            }));
        })
    })
})