import { Middleware } from "./+types";

export default function retryMiddlewareFactory(attempts: number): Middleware {
  return async (req, next) => {
    let error: any;
    for (let i = 0; i < attempts; i++) {
      try {
        return await next(req);
      } catch (err) {
        error = err;
      }
    }

    throw new Error(`Request failed after ${attempts} attempts: ${error}`);
  };
}
