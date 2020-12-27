import { modify } from "../headers";
import { clone } from "../requests";
import { Middleware } from "./+types";

export default function jsonBodyFactory(): Middleware {
    return async (req, next) => {
        let response = await next(req);

        if(response && typeof response.body === 'string') {
            response = {
                ...response,
                body: JSON.parse(response.body)
            };
        }

        return response;
    }
}