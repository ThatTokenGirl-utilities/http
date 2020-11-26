import { HttpRequest } from "./+types";

export default function clone(
  request: HttpRequest,
  update?: Partial<HttpRequest>
): HttpRequest {
  return { ...request, ...update };
}
