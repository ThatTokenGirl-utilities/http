import "isomorphic-fetch";

import { entries } from "../headers";
import { Requester } from "../requests";

export default function fetchRequesterFactory(): Requester {
  return async (req) => {
    const headers = new Headers();

    if (req.headers && !req.headers["Content-Type"]) {
      headers.set("Content-Type", "application/json");
    }

    if (req.headers) {
      Object.entries(req.headers).forEach(([key, value]) => {
        const toadd = value instanceof Array ? value : [value];

        toadd.forEach((value) => headers.append(key, value));
      });
    }

    const res = await fetch(
      new Request(req.url, {
        method: req.method ?? "get",
        headers: entries(req.headers ?? {}).reduce((headers, [key, value]) => {
          headers.set(
            key,
            (typeof value === "string" ? [value] : value).reduce(
              (acc, v) => `${acc}${!acc ? "" : ","}${v}`
            )
          );
          return headers;
        }, new Headers()),
        body: req.body,
      })
    );

    const body =
      res.headers.get("Content-Type") === "application/json"
        ? await res.json()
        : await res.text();

    const responseHeaders: any = {};

    res.headers.forEach((value, key) => {
      const values: string[] =
        typeof value === "string" ? value.split(",") : [value + ""];
      responseHeaders[key] =
        values.length === 0 ? "" : values.length === 1 ? values[0] : values;
    });

    return {
      url: res.url ?? "",
      headers: responseHeaders,
      status: res.status,
      statusText: res.statusText,
      body,
    };
  };
}
