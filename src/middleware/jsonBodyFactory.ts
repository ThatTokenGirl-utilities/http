import { Middleware } from "./+types";

export default function jsonBodyFactory(): Middleware {
    return async (req, next) => {
        let response = await next(req);

        if(response?.body && typeof response.body === 'string') {
            response = {
                ...response,
                body: JSON.parse(response.body)
            };
        }

        return response;
    }
}