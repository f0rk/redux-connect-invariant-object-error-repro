import querystring from "querystring";

export const parse = (val) => {
  let fixed = val;

  if (fixed.match(/^[?]/)) {
    fixed = fixed.substr(1);
  }
  return querystring.parse(fixed);
};

export const stringify = (obj) => {
  return querystring.stringify(obj);
};
