// @flow

import { formatDollars } from "../";

describe("Test formatting functions", () => {
  test("Correctly formats dollar amounts", () => {
    const tests = [
      {
        input: "123.45",
        expected: "$123.45",
      },
      {
        input: "-123.45",
        expected: "($123.45)",
      },
      {
        input: "-123",
        expected: "($123.00)",
      },
    ];

    for (const t of tests) {
      const actual = formatDollars(t.input);
      expect(actual).toBe(t.expected);
    }
  });
});
