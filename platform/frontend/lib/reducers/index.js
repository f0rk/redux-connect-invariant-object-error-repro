// @flow

import createHistory from "history/createBrowserHistory";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import type { ConnectedRouter } from "connected-react-router";

import { authnzReducer as authnz } from "capitalrx-authnz";
import type { AuthnzState } from "capitalrx-authnz";

export const history = createHistory();

export type State = {
  authnz: AuthnzState,
  router: ConnectedRouter,
  form: any, // probably not a great idea, but redux form defines it this way internally
};

const reducers = {
  authnz,
  router: connectRouter(history),
  form: formReducer,
};

export default reducers;
