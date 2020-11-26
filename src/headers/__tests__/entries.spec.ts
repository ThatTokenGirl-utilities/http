import { entries } from "..";

describe("function: entries", () => {
  test("converts header into key, value pairs", () => {
    expect(
      entries({ header1: "value1", header2: "value2", header3: "value3" })
    ).toEqual([
      ["header1", "value1"],
      ["header2", "value2"],
      ["header3", "value3"],
    ]);
  });

  test("undefined header is converted to empty array", () => {
    expect(entries(undefined)).toEqual([]);
  });
});
