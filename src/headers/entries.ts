import { HttpHeaders } from "./+types";

export default function entries(
  headers: HttpHeaders | undefined
): [string, string | string[]][] {
  return Object.entries(headers ?? {});
}
