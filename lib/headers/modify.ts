import { HttpHeaders } from "./+types";

export default function modify(
  headers: HttpHeaders | undefined,
  name: string,
  value: string | string[]
): HttpHeaders;
export default function modify(
  headers: HttpHeaders | undefined,
  toSet: HttpHeaders
): HttpHeaders;

export default function modify(
  headers: HttpHeaders | undefined = {},
  nameOrObj: string | HttpHeaders,
  value?: string | string[]
): HttpHeaders {
  const toSet =
    typeof nameOrObj === "string"
      ? { [nameOrObj]: value as string | string[] }
      : nameOrObj;

  return { ...headers, ...toSet };
}
