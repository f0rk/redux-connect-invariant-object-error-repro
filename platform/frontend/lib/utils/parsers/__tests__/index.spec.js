// @flow

import { Decimal } from "decimal.js";

import { parseNumber } from "../";

describe("Test number parsing", () => {
  test("Correctly handles Decimal objects", () => {
    const expected = new Decimal("123.45");

    const actual = parseNumber(expected);
    expect(actual).toBe(expected);
  });

  test("Correctly handles numbers", () => {
    const tests = [
      {
        input: 123.45,
        expected: new Decimal("123.45"),
      },
      {
        input: 123,
        expected: new Decimal("123"),
      },
    ];

    for (const t of tests) {
      const actual = parseNumber(t.input);
      expect(actual).toEqual(t.expected);
    }
  });

  test("Parses simple strings", () => {
    const tests = [
      {
        input: "123.45",
        expected: new Decimal("123.45"),
      },
      {
        input: "123",
        expected: new Decimal("123"),
      },
      {
        input: "-123.45",
        expected: new Decimal("-123.45"),
      },
      {
        input: ".00000000000000000000000001",
        expected: new Decimal(".00000000000000000000000001"),
      },
    ];

    for (const t of tests) {
      const actual = parseNumber(t.input);
      expect(actual).toEqual(t.expected);
    }
  });

  test("Parses complex strings", () => {
    const tests = [
      {
        input: " 123,456.00",
        expected: new Decimal("123456.00"),
      },
      {
        input: "(54,234)",
        expected: new Decimal("-54234"),
      },
      {
        input: "$100",
        expected: new Decimal("100"),
      },
      {
        input: "-$23.34",
        expected: new Decimal("-23.34"),
      },
      {
        input: "($67.30)",
        expected: new Decimal("-67.30"),
      },
      {
        input: " ( 123, 456 . 01 )  ",
        expected: new Decimal("-123456.01"),
      },
    ];

    for (const t of tests) {
      const actual = parseNumber(t.input);
      expect(actual).toEqual(t.expected);
    }
  });
});
