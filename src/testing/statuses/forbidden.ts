import { TestHandler } from "../+types";
import status from "./status";

export default function forbidden(): TestHandler;
export default function forbidden<T>(result: T): TestHandler;
export default function forbidden<T>(handler: Transformer<T>): TestHandler;

export default function forbidden<T>(
  resultOrHandler?: T | Transformer<T>
): TestHandler {
  return status(403, resultOrHandler);
}
