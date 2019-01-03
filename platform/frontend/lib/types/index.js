// @flow

export type Timestamp = string;

export type Token = ?string;

export type Formatter = (null | typeof undefined | string | number) => string | null | typeof undefined;
