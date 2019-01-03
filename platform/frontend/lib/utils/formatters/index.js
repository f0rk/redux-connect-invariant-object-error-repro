// @flow

import moment from "moment";
import numeral from "numeral";

import { parseNumber } from "@/utils/parsers";
import type { Formatter } from "@/types";

const isEmpty = (val: any): boolean %checks => {
  return typeof val === "undefined" || val === null;
};

const isString = (val: any): boolean %checks => {
  return typeof val === "string";
};

export const formatDate = (
  val: null | typeof undefined | string | moment | Date,
  dateFormatString: string = "YYYY-MM-DD hh:mm:ss A",
  timezone: boolean = true,
): any => {
  if (isEmpty(val)) {
    return val;
  }

  const dateFormat = (v): string => {
    if (timezone) {
      return moment(v).format(dateFormatString);
    } else {
      return moment.utc(v).format(dateFormatString);
    }
  };
  if (
    isString(val)
    && ((val: any): string).search(
      /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])(\D?([01]\d|2[0-3])\D?([0-5]\d)\D?([0-6]\d([.]\d+)?)?)([zZ]|([+-][01]\d|2[0-3])\D?([0-5]\d)?)?$/,
    ) !== -1
  ) {
    return dateFormat(((val: any): string));
  }

  if (moment.isMoment(val)) {
    return dateFormat(val);
  }

  if (val instanceof Date) {
    return dateFormat(val);
  }

  return val;
};

export const formatDollars = (
  val: null | typeof undefined | string | number,
  withDecimals: boolean = true,
): string | null | typeof undefined => {
  if (isEmpty(val)) {
    return val;
  }

  let formatString = "($0,0.00)";
  if (!withDecimals) {
    formatString = "($0,0)";
  }

  const ret = parseNumber(val);
  return numeral(ret).format(formatString);
};

export const formatPercent: Formatter = (val) => {
  if (isEmpty(val)) {
    return val;
  }

  const ret = parseNumber(val);
  return numeral(ret).format("0,0.00%");
};

export const formatNumber: Formatter = (val) => {
  if (isEmpty(val)) {
    return val;
  }

  const ret = parseNumber(val);
  return numeral(ret).format("0,0.00");
};

export const formatCount: Formatter = (val) => {
  if (isEmpty(val)) {
    return val;
  }

  const ret = parseNumber(val);
  return numeral(ret).format("0,0");
};
