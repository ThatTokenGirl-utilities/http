import { HttpHeaders } from "./+types";

export default function append(
  headers: HttpHeaders,
  name: string,
  value: string | string[]
): HttpHeaders;
export default function append(
  headers: HttpHeaders,
  toAppend: HttpHeaders
): HttpHeaders;

export default function append(
  headers: HttpHeaders,
  nameOrObj: HttpHeaders | string,
  value?: string | string[]
): HttpHeaders {
  const toAppend =
    typeof nameOrObj === "string" ? { [nameOrObj]: value } : nameOrObj;

  const next = { ...headers };

  for (let [name, value] of Object.entries(toAppend)) {
    if (name in next) {
      const appendValue = typeof value === "string" ? [value] : value;
      const currentValue = next[name];
      const nextValue =
        typeof currentValue === "string"
          ? [currentValue, ...appendValue!]
          : [...currentValue, ...appendValue!];

      next[name] = nextValue;
    } else {
      next[name] = value!;
    }
  }

  return next;
}
