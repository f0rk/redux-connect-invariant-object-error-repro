// @flow

import { Decimal } from "decimal.js";

export const parseNumber = (val: Decimal | number | string) => {
  if (val instanceof Decimal) {
    return val;
  }

  if (!isNaN(val) || typeof val === "number") {
    return new Decimal(val);
  }

  let ret = "" + val;
  ret = ret.replace(/[$,% ]/g, "");

  if (ret.search(/^\(\d+(\.\d+)?\)$/) !== -1) {
    ret = "-" + ret.replace(/[()]/g, "");
  }

  return new Decimal(ret);
};
