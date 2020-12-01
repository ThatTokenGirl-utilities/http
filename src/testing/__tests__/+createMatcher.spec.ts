import createMatcher from "../+createMatcher";

describe("function: createMatcher", () => {
  describe("path with no params", () => {
    const matcher = createMatcher("one/two");

    test("url matches path returns object", () => {
      expect(matcher("one/two")).toEqual({});
    });

    test("extra end parts to url returns null", () => {
      expect(matcher("one/two/three")).toBeNull();
    });
  });

  describe("path with nothing more than one parameter", () => {
    const matcher = createMatcher(":one");

    test("url matches path returns object with parameter", () => {
      expect(matcher("value")).toEqual({ one: "value" });
    });
  });
});
