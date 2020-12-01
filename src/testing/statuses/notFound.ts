import { TestHandler } from "../+types";
import status from "./status";

export default function notFound(): TestHandler;
export default function notFound<T>(result: T): TestHandler;
export default function notFound<T>(handler: Transformer<T>): TestHandler;

export default function notFound<T>(
  resultOrHandler?: T | Transformer<T>
): TestHandler {
  return status(404, resultOrHandler);
}
