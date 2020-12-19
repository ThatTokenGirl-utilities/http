import { clone } from "../requests";
import { Middleware } from "./+types";

export default function jsonBodyFactory(): Middleware {
    return (req, next) => {
        req = clone(req, {
            body: req.body === undefined || req.body === null ? req.body : JSON.stringify(req.body)
        });

        return next(req);
    }
}