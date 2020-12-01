import { TestHandler, Transformer } from "../+types";
import status from "./status";

export default function ok(): TestHandler;
export default function ok<T>(result: T): TestHandler;
export default function ok<T>(handler: Transformer<T>): TestHandler;

export default function ok<T>(
  resultOrHandler?: T | Transformer<T>
): TestHandler {
  return status(200, resultOrHandler);
}
