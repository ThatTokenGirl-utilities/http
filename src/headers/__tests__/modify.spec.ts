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
});

function performTestSingleHeader(
  current: HttpHeaders,
  name: string,
  value: string | string[],
  expected: HttpHeaders
) {
  const next = modify(current, name, value);
  expect(next).not.toBe(current);
  expect(next).toEqual(expected);
}

function performTestMultipleHeaders(
  current: HttpHeaders,
  toSet: HttpHeaders,
  expected: HttpHeaders
) {
  const next = modify(current, toSet);
  expect(next).not.toBe(current);
  expect(next).toEqual(expected);
}
