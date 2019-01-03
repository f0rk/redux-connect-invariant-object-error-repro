// @flow

import type { Dispatch as ReduxDispatch } from "redux";

import type { Action as AuthnzAction } from "capitalrx-authnz";

import { ActionTypes } from "@/constants";

// XXX: should be imported... but can't figure out how to get it
type ReduxFormInitializeAction = {
  type: "@@redux-form/INITIALIZE",
  meta?: any,
  payload?: any,
  error?: any,
};

type ReduxFormResetAction = {
  type: "@@redux-form/RESET",
  meta?: any,
  payload?: any,
  error?: any,
};

type ReduxFormAction = ReduxFormInitializeAction | ReduxFormResetAction;

export type Action =
  AuthnzAction
  | ReduxFormAction;

export type Dispatch = ReduxDispatch<Action>;
