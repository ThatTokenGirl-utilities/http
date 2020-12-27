import { contentFormatters } from "..";
import { addMiddleware, clone, HttpRequest, HttpResponse } from "../../requests";

describe('middleware: contentFormatters', () => {
    const response: HttpResponse = {
        url: 'testUrl',
        headers: {},
        body: { test: 'test' },
        status: 200
    };
    const requester = jest.fn().mockResolvedValue(response)

    beforeEach(() => {
        requester.mockClear();
    });

    describe('formatter as function', () => {
        const formatter = jest.fn();
        const withMiddleware = addMiddleware(requester, contentFormatters(formatter));
        const baseRequest: HttpRequest = {
            url: 'testUrl.com',
            method: 'POST'
        };

        beforeEach(() => {
            formatter.mockClear();
        });

        describe('request body is null', () => {
            const request = clone(baseRequest, { body: null });

            test('formatter is not called', async () => {
                const result = await withMiddleware(request);
                expect(requester).toHaveBeenCalledWith(request);
                expect(formatter).not.toHaveBeenCalled();
                expect(result).toEqual(response);
            });
        })
        
        describe("request body is undefined", () => {
            const request = clone(baseRequest, { body: undefined });

            test('when request body is undefined, formatter is not called', async () => {
                const result = await withMiddleware(request);
                expect(requester).toHaveBeenCalledWith(request);
                expect(formatter).not.toHaveBeenCalled();
                expect(result).toEqual(response);
            });
        });

        describe('request body has value', () => {
            const request = clone(baseRequest, { body: 'test value' });

            describe('formatter returns value', () => {
                const updatedBody = { changing: 'value' };
                beforeEach(() => {
                    formatter.mockReturnValue(updatedBody);
                });

                test('body is modified', async () => {
                    const result = await withMiddleware(request);
                    expect(formatter).toHaveBeenCalledWith(request);
                    expect(requester).toHaveBeenCalledWith(clone(request, { body: updatedBody }));
                    expect(result).toEqual(response);
                });
            });
 
            describe(`formatter returns a null value`, () => {
                beforeEach(() => {
                    formatter.mockReturnValue(null);
                });

                test('body remains unchanged', async () => {
                    const result = await withMiddleware(request);
                    expect(formatter).toHaveBeenCalledWith(request);
                    expect(requester).toHaveBeenCalledWith(request);
                    expect(result).toEqual(response);
                });
            })
        })
    });

    describe('formatter as an object', () => {
        const formatter = {
            matches: 'test-content',
            formatter: jest.fn().mockReturnValue({ changing: 'value' })
        };
        const withMiddleware = addMiddleware(requester, contentFormatters(formatter));
        const baseRequest: HttpRequest = {
            url: 'testUrl.com',
            method: 'POST'
        };

        beforeEach(() => {
            formatter.formatter.mockClear();
        });

        describe('when request contains a matching content type', () => {
            const requestWithContentType: HttpRequest = clone(baseRequest, {
                headers: {
                    'Content-Type': formatter.matches
                }
            });

            test(`when body is null, formatter doesn't run`, async () => {
                const request: HttpRequest = clone(requestWithContentType, {
                    body: null,
                })
    
                const result = await withMiddleware(request);
    
                expect(result).toEqual(response);
                expect(formatter.formatter).not.toHaveBeenCalled();
                expect(requester).toHaveBeenCalledWith(request);
            });
    
            test(`when body is undefined, formatter doesn't run`, async () => {
                const request: HttpRequest = clone(requestWithContentType, {
                    body: undefined,
                })
    
                const result = await withMiddleware(request);
    
                expect(result).toEqual(response);
                expect(formatter.formatter).not.toHaveBeenCalled();
                expect(requester).toHaveBeenCalledWith(request);
            });

            test('when body has value, body is formatted', async () => {
                const request: HttpRequest = clone(requestWithContentType, {
                    body: { test: 'any' },
                });

                const result = await withMiddleware(request);

                expect(result).toEqual(response);
                expect(formatter.formatter).toHaveBeenCalledWith(request.body);
                expect(requester).toHaveBeenCalledWith(clone(request, {
                    body: { changing: 'value' }
                }))
            });
        });
    })
})