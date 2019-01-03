// @flow

import type { Dispatch } from "redux";

import { authnzDidLogOut, authnzReceivedToken } from "../../actions";
import type { Token } from "../../types";

export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getToken = (): Token => {
  return localStorage.getItem("token") || "";
};

export const getHeaders = () => {
  const token = getToken();

  const headers = new Headers({
    "Content-Type": "application/json",
    // $FlowIgnore
    Authorization: "Bearer " + token,
  });

  return headers;
};

export const wrappedFetch = (dispatch: Dispatch<Object>, url: string, args: Object, cb: (Object) => mixed) => {
  return fetch(url, args)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 403) {
          removeToken();
          dispatch(authnzDidLogOut());
        } else {
          response
            .json()
            .then((json) => {
              if (typeof json.message !== "undefined") {
                alert(json.message);
              } else {
                alert("An error occurred. Please contact support. Code: " + response.status);
              }
            })
            .catch(() => {
              alert("An error occurred. Please contact support. Code: " + response.status);
            });
        }
      } else {
        return response.json().then((json) => {
          if (typeof json.token !== "undefined") {
            dispatch(authnzReceivedToken(json.token));
            storeToken(json.token);
          }
          if (json !== null) {
            return cb(json);
          } else {
            throw new Error("json was null");
          }
        });
      }
    })
    .catch(function(error) {
      alert("There was a problem with your request (helpers): " + error.message);
    });
};

export const later = (delay: number): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
