import { HttpRequest, HttpResponse } from "../requests";
import { Middleware } from "./+types";

type Logger = {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
};

type LoggingMiddlewareFactoryOptions =
  | {
      logger: Logger;
    }
  | {
      requestLogger: (req: HttpRequest) => void;
      responseLogger: (res: HttpResponse) => void;
      errorLogger: (req: HttpRequest, err: any) => void;
    };

export default function logginMiddlewareFactory(
  options: LoggingMiddlewareFactoryOptions
): Middleware {
  return (req, next) => {
    const requestLogger: (req: HttpRequest) => void =
      "logger" in options
        ? (req) => options.logger.log(req)
        : options.requestLogger;
    const responseLogger: (res: HttpResponse) => void =
      "logger" in options
        ? (res) => options.logger.log(res)
        : options.responseLogger;
    const errorLogger: (req: HttpRequest, err: any) => void =
      "logger" in options
        ? (req: HttpRequest, err: any) => options.logger.error(req, err)
        : options.errorLogger;

    requestLogger(req);

    return next(req)
      .then((res) => (responseLogger(res), res))
      .catch((err) => {
        errorLogger(req, err);
        throw err;
      });
  };
}
