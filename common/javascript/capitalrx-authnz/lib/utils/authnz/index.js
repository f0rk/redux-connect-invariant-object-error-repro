// @flow

import type { Dispatch } from "redux";

import {
  authnzDidLogOut,
  authnzDisableLoginButton,
  authnzReceivedToken,
  authnzReceiveTOTPURI,
  authnzReset,
  authnzShowPasswordEntry,
  authnzShowTOTPEntry,
  authnzShowTOTPSetup,
} from "../../actions";
import { storeToken, removeToken } from "../helpers";
import type { Token } from "../../types";

export const password = (dispatch: Dispatch<Object>) => {
  return dispatch(authnzShowPasswordEntry());
};

export type AfterLoginFunc = (token: Token) => mixed;

export const mfa = (dispatch: Dispatch<Object>, email: string, password: string, afterLogin: AfterLoginFunc) => {
  dispatch(authnzDisableLoginButton());

  const args = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      email: email,
    }),
  };

  const url = site.baseUrl + "/authnz/mfa";

  return fetch(url, args)
    .then((response) => response.json())
    .then((json) => {

      if (json.status === 403) {
        alert(json.message);
      } else {
        if (json.mfa_type === "totp") {
          return dispatch(authnzShowTOTPEntry());
        } else if (json.mfa_type === "totp_setup") {
          return getTOTPURI(dispatch, email, password).then(() => {
            dispatch(authnzShowTOTPSetup());
          });
        } else if (json.mfa_type === null) {
          return login(dispatch, email, password, afterLogin);

          // really shouldn't happen, but treat the same as null? maybe error instead?
        } else {
          return login(dispatch, email, password, afterLogin);
        }
      }
    });
};

export const getTOTPURI = (dispatch: Dispatch<Object>, email: string, password: string) => {
  const args = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  const url = site.baseUrl + "/authnz/totp_uri";

  return fetch(url, args)
    .then((response) => response.json())
    .then((json) => {

      if (json.status === 403) {
        alert(json.message);
      } else {
        return dispatch(authnzReceiveTOTPURI(json.uri));
      }
    });
};

const _loginOrSetup = (dispatch: Dispatch<Object>, path: string, afterLogin: AfterLoginFunc, params: Object) => {
  dispatch(authnzDisableLoginButton());

  const args = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(params),
  };

  const url = site.baseUrl + path;

  return fetch(url, args)
    .then((response) => response.json())
    .then((json) => {

      if (json.status === 403) {
        alert(json.message);
        dispatch(authnzReset());
      } else {
        dispatch(authnzReceivedToken(json.token));
        storeToken(json.token);

        if (typeof afterLogin !== "undefined" && afterLogin !== null) {
          afterLogin(json.token);
        }
      }
      dispatch(authnzReset());
    })
    .catch(function(error) {

      alert("There was a problem with your request (authnz): " + error.message);
      dispatch(authnzReset());
    });
};

export const login = (dispatch: Dispatch<Object>, email: string, password: string, afterLogin: AfterLoginFunc, mfaNumber?: string) => {
  return _loginOrSetup(dispatch, "/authnz/login", afterLogin, {
    email,
    password,
    mfa_number: mfaNumber,
  });
};

export const totpSetup = (
  dispatch: Dispatch<Object>,
  email: string,
  password: string,
  afterLogin: AfterLoginFunc,
  mfaNumber1: string,
  mfaNumber2: string,
) => {
  return _loginOrSetup(dispatch, "/authnz/totp_setup", afterLogin, {
    email,
    password,
    mfa_number_1: mfaNumber1,
    mfa_number_2: mfaNumber2,
  });
};

export const logout = (dispatch: Dispatch<Object>, afterLogout: () => mixed) => {
  removeToken();
  dispatch(authnzDidLogOut());

  afterLogout();
};
