// @flow

import { decodeToken } from "jwt-js";

import { ActionTypes, AuthnzStateTypes } from "../../constants";
import type { Action } from "../../actions";
import type { Token } from "../../types";

const token: Token = localStorage.getItem("token");
let isLoggedIn: boolean = false;
if (token) {
  try {
    const tokenData = decodeToken(token);
    const currentTime = Date.now() / 1000;
    if (tokenData.payload.exp > currentTime) {
      isLoggedIn = true;
    }
  } catch (e) {
    // wipe out the token if we can't process it
    localStorage.removeItem("token");
  }
}

export type AuthnzState = {
  state: string,
  loginButtonIsDisabled: boolean,
  isLoggedIn: boolean,
  roles: Array<string>,
  token: Token,
  totpURI: ?string,
};

const DEFAULT_AUTHNZ_STATE: AuthnzState = {
  state: AuthnzStateTypes.SHOW_EMAIL_ENTRY,
  loginButtonIsDisabled: false,
  isLoggedIn: isLoggedIn,
  roles: [],
  token: token,
  totpURI: null,
};

const authnz = (state: AuthnzState = DEFAULT_AUTHNZ_STATE, action: Action): AuthnzState => {
  if (action.type === ActionTypes.AUTHNZ_SHOW_EMAIL_ENTRY) {
    return {
      ...state,
      state: AuthnzStateTypes.SHOW_EMAIL_ENTRY,
    };
  } else if (action.type === ActionTypes.AUTHNZ_SHOW_PASSWORD_ENTRY) {
    return {
      ...state,
      state: AuthnzStateTypes.SHOW_PASSWORD_ENTRY,
    };
  } else if (action.type === ActionTypes.AUTHNZ_DISABLE_LOGIN_BUTTON) {
    return {
      ...state,
      loginButtonIsDisabled: true,
    };
  } else if (action.type === ActionTypes.AUTHNZ_SHOW_TOTP_ENTRY) {
    return {
      ...state,
      state: AuthnzStateTypes.SHOW_TOTP_ENTRY,
      loginButtonIsDisabled: false,
    };
  } else if (action.type === ActionTypes.AUTHNZ_SHOW_TOTP_SETUP) {
    return {
      ...state,
      state: AuthnzStateTypes.SHOW_TOTP_SETUP,
      loginButtonIsDisabled: false,
    };
  } else if (action.type === ActionTypes.AUTHNZ_RECEIVE_TOTP_URI) {
    return {
      ...state,
      totpURI: action.uri,
    };
  } else if (action.type === ActionTypes.AUTHNZ_RECEIVED_TOKEN) {
    const localData = decodeToken(action.token);

    return {
      ...state,
      roles: localData.payload.roles,
      isLoggedIn: true,
    };
  } else if (action.type === ActionTypes.AUTHNZ_RESET) {
    return {
      ...state,
      state: AuthnzStateTypes.SHOW_EMAIL_ENTRY,
      loginButtonIsDisabled: false,
      totpURI: null,
    };
  } else if (action.type === ActionTypes.AUTHNZ_DID_LOG_OUT) {
    return {
      state: AuthnzStateTypes.SHOW_EMAIL_ENTRY,
      loginButtonIsDisabled: false,
      isLoggedIn: false,
      roles: [],
      token: null,
      totpURI: null,
    };
  } else {
    return state;
  }
};

export default authnz;
