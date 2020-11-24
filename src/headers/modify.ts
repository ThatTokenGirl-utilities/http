import { HttpHeaders } from "./+types";

export default function modify(
  headers: HttpHeaders,
  name: string,
  value: string | string[]
): HttpHeaders;
export default function modify(
  headers: HttpHeaders,
  toSet: HttpHeaders
): HttpHeaders;

export default function modify(
  headers: HttpHeaders,
  nameOrObj: string | HttpHeaders,
  value?: string | string[]
): HttpHeaders {
  const toSet =
    typeof nameOrObj === "string"
      ? { [nameOrObj]: value as string | string[] }
      : nameOrObj;

  return { ...headers, ...toSet };
}
