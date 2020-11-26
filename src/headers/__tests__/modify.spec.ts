import { HttpHeaders } from "../+types";
import modify from "../modify";

describe("function: set", () => {
  test("set new string header value", () => {
    performTestSingleHeader({}, "new-header", "new-value", {
      "new-header": "new-value",
    });
  });

  test("set new string[] header value", () => {
    performTestSingleHeader({}, "new-header", ["new-value1", "new-value2"], {
      "new-header": ["new-value1", "new-value2"],
    });
  });

  test("replaces existing string header value with string[]", () => {
    performTestSingleHeader(
      { name: "value" },
      "name",
      ["new-value1", "new-value2"],
      {
        name: ["new-value1", "new-value2"],
      }
    );
  });

  test("replaces existing string[] header value with string", () => {
    performTestSingleHeader(
      { name: ["value1", "value2"] },
      "name",
      "new-value",
      {
        name: "new-value",
      }
    );
  });

  test("set all headers", () => {
    performTestMultipleHeaders(
      {
        header1: "value1",
        header2: ["value2-1", "value2-2"],
        header3: "value3",
      },
      {
        header1: ["new-value1", "new-value2"],
        header3: "new-value3",
      },
      {
        header1: ["new-value1", "new-value2"],
        header2: ["value2-1", "value2-2"],
        header3: "new-value3",
      }
    );
  });

  test("can set single header for undefined", () => {
    performTestSingleHeader(undefined, "header", "value", { header: "value" });
  });

  test("can set multiple header for undefined", () => {
    performTestMultipleHeaders(
      undefined,
      { header1: "value-1", header2: "value-2" },
      { header1: "value-1", header2: "value-2" }
    );
  });
});

function performTestSingleHeader(
  current: HttpHeaders | undefined,
  name: string,
  value: string | string[],
  expected: HttpHeaders
) {
  const next = modify(current, name, value);
  expect(next).not.toBe(current);
  expect(next).toEqual(expected);
}

function performTestMultipleHeaders(
  current: HttpHeaders | undefined,
  toSet: HttpHeaders,
  expected: HttpHeaders
) {
  const next = modify(current, toSet);
  expect(next).not.toBe(current);
  expect(next).toEqual(expected);
}
