// @flow

import { Provider } from "react-redux";
import React from "react";
import { Route, Redirect, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import { Auth } from "capitalrx-authnz";
import { store, history } from "@/store";

console.log(store);

import "./style.sass";

const authorize = (Component, props, unwrapped) => {
  const state = store.getState();

  if (state.authnz.isLoggedIn) {
    if (unwrapped) {
      return <Component {...props} />;
    } else {
      return (
        <div className="main-wrapper">
          <div className="logged-in">
            <Component {...props} />
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="main">
          <Switch>
            <Route path="/" exact component={() => { return <Redirect to="/login" /> }} />
            <Route path="/login" component={Auth} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
