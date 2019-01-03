// @flow

import { storeToken } from "../";

describe("Test user auth token helpers", () => {
  test("sets the token in localStorage", () => {
    const expected = "some value";
    storeToken(expected);

    const actual = window.localStorage.getItem("token");
    expect(actual).toBe(expected);
  });
});
