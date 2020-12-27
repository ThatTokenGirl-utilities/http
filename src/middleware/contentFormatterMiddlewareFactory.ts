import { clone } from "../requests";
import { Formatter, Middleware } from "./+types";

export default function contentFormatterMiddlewareFactory(...formatters: Formatter[]): Middleware {
    return (req, next) => {
        if(!hasBody(req.body))
            return next(req);

        const copy = clone(req);
        for(let i = 0; i < formatters.length; i++) {
            const formatter = normalizeFormatter(formatters[i]);
            const formatted = formatter(copy);

            if(formatted !== null) {
                req = clone(req, {
                    body: formatted
                });

                break;
            }
        }

        return next(req);
    }
}

function normalizeFormatter(formatter: Formatter): Extract<Formatter, Function> {
    return typeof formatter === 'function'
        ? formatter
        : (req) => {
            const contentType = req.headers && req.headers['Content-Type'] || '';
            const list = typeof contentType === 'string' ? [contentType] : contentType;

            const match = list.find(x => x.indexOf(formatter.matches) >= 0);

            return match && formatter.formatter(req.body) || null;
        }
}

function hasBody(body: any): boolean {
    return body !== null && body !== undefined;
}