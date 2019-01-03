// @flow

import type { Dispatch as ReduxDispatch } from "redux";

import { ActionTypes } from "../constants";
import type { Token } from "../types";

type AuthnzShowEmailEntryAction = {
  type: "AUTHNZ_SHOW_EMAIL_ENTRY",
};

export const authnzShowEmailEntry = (): AuthnzShowEmailEntryAction => {
  return {
    type: ActionTypes.AUTHNZ_SHOW_EMAIL_ENTRY,
  };
};

type AuthnzShowPasswordEntryAction = {
  type: "AUTHNZ_SHOW_PASSWORD_ENTRY",
};

export const authnzShowPasswordEntry = (): AuthnzShowPasswordEntryAction => {
  return {
    type: ActionTypes.AUTHNZ_SHOW_PASSWORD_ENTRY,
  };
};

type AuthnzDisableLoginButtonAction = {
  type: "AUTHNZ_DISABLE_LOGIN_BUTTON",
};

export const authnzDisableLoginButton = (): AuthnzDisableLoginButtonAction => {
  return {
    type: ActionTypes.AUTHNZ_DISABLE_LOGIN_BUTTON,
  };
};

type AuthnzShowTOTPEntryAction = {
  type: "AUTHNZ_SHOW_TOTP_ENTRY",
};

export const authnzShowTOTPEntry = (): AuthnzShowTOTPEntryAction => {
  return {
    type: ActionTypes.AUTHNZ_SHOW_TOTP_ENTRY,
  };
};

type AuthnzShowTOTPSetupAction = {
  type: "AUTHNZ_SHOW_TOTP_SETUP",
};

export const authnzShowTOTPSetup = (): AuthnzShowTOTPSetupAction => {
  return {
    type: ActionTypes.AUTHNZ_SHOW_TOTP_SETUP,
  };
};

type AuthnzReceiveTOTPURIAction = {
  type: "AUTHNZ_RECEIVE_TOTP_URI",
  uri: string,
};

export const authnzReceiveTOTPURI = (uri: string): AuthnzReceiveTOTPURIAction => {
  return {
    type: ActionTypes.AUTHNZ_RECEIVE_TOTP_URI,
    uri: uri,
  };
};

type AuthnzReceivedTokenAction = {
  type: "AUTHNZ_RECEIVED_TOKEN",
  token: Token,
};

export const authnzReceivedToken = (token: Token): AuthnzReceivedTokenAction => {
  return {
    type: ActionTypes.AUTHNZ_RECEIVED_TOKEN,
    token: token,
  };
};

type AuthnzResetAction = {
  type: "AUTHNZ_RESET",
};

export const authnzReset = (): AuthnzResetAction => {
  return {
    type: ActionTypes.AUTHNZ_RESET,
  };
};

type AuthnzDidLogOutAction = {
  type: "AUTHNZ_DID_LOG_OUT",
};

export const authnzDidLogOut = (): AuthnzDidLogOutAction => {
  return {
    type: ActionTypes.AUTHNZ_DID_LOG_OUT,
  };
};

export type Action =
  | AuthnzShowEmailEntryAction
  | AuthnzShowPasswordEntryAction
  | AuthnzDisableLoginButtonAction
  | AuthnzShowTOTPEntryAction
  | AuthnzShowTOTPSetupAction
  | AuthnzReceiveTOTPURIAction
  | AuthnzReceivedTokenAction
  | AuthnzResetAction
  | AuthnzDidLogOutAction;

export type Dispatch = ReduxDispatch<Action>;
