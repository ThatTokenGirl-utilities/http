import { TestHandler } from "../+types";
import status from "./status";

export default function unauthorized(): TestHandler;
export default function unauthorized<T>(result: T): TestHandler;
export default function unauthorized<T>(handler: Transformer<T>): TestHandler;

export default function unauthorized<T>(
  resultOrHandler?: T | Transformer<T>
): TestHandler {
  return status(401, resultOrHandler);
}
