import { HttpHeaders } from "../+types";
import append from "../append";

describe("function: append", () => {
  test("adds string value to header", () => {
    performTestSingleHeader({}, "new-header", "value", {
      "new-header": "value",
    });
  });

  test("adds string[] value to header", () => {
    performTestSingleHeader({}, "new-header", ["value1", "value2"], {
      "new-header": ["value1", "value2"],
    });
  });

  test("appends string value to existing header with string value", () => {
    performTestSingleHeader(
      {
        name: "value",
      },
      "name",
      "new-value",
      {
        name: ["value", "new-value"],
      }
    );
  });

  test("appends string[] value to existing header with string value", () => {
    performTestSingleHeader(
      {
        name: "value",
      },
      "name",
      ["new-value1", "new-value2"],
      {
        name: ["value", "new-value1", "new-value2"],
      }
    );
  });

  test("appends string value to existing header with string[] value", () => {
    performTestSingleHeader(
      {
        name: ["value1", "value2"],
      },
      "name",
      "new-value",
      {
        name: ["value1", "value2", "new-value"],
      }
    );
  });

  test("appends string[] value to existing header with string[] value", () => {
    performTestSingleHeader(
      {
        name: ["value1", "value2"],
      },
      "name",
      ["new-value1", "new-value2"],
      {
        name: ["value1", "value2", "new-value1", "new-value2"],
      }
    );
  });

  test("adds and appends headers", () => {
    performTestMultipleHeaders(
      {
        existing: "one",
      },
      {
        existing: "two",
        "new-header": "new-value",
      },
      {
        existing: ["one", "two"],
        "new-header": "new-value",
      }
    );
  });

  test("add header to undefined", () => {
    performTestSingleHeader(undefined, "header", "value", { header: "value" });
  });

  test("add multiple headers to undefined", () => {
    performTestMultipleHeaders(
      undefined,
      { header1: "value1", header2: "value2" },
      { header1: "value1", header2: "value2" }
    );
  });
});

function performTestSingleHeader(
  current: HttpHeaders | undefined,
  name: string,
  value: string | string[],
  expected: HttpHeaders
) {
  const next = append(current, name, value);
  expect(next).not.toBe(current);
  expect(next).toEqual(expected);
}

function performTestMultipleHeaders(
  current: HttpHeaders | undefined,
  toAppend: HttpHeaders,
  expected: HttpHeaders
) {
  const next = append(current, toAppend);
  expect(next).not.toBe(current);
  expect(next).toEqual(expected);
}
