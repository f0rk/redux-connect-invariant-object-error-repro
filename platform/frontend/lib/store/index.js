// @flow

import type { Store as ReduxStore } from "redux";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers, { history } from "@/reducers";
import type { Action, Dispatch } from "@/actions";
import type { State } from "@/reducers";

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore<State, Action, Dispatch>(
  combineReducers({
    ...reducers,
  }),
  composeEnhancers(applyMiddleware(middleware)),
);

export { store, history };

export type Store = ReduxStore<State, Action>;
