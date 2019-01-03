// @flow

import ReactDOM from "react-dom";
import React from "react";
import { AppContainer } from "react-hot-loader";

import App from "@/containers/App";

const render = (Component) => {
  const root = document.getElementById("app");

  if (root !== null) {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      root,
    );
  } else {
    throw new Error("Unable to locate app root");
  }
};

render(App);

if (module.hot) {
  module.hot.accept();
}
