/* @flow */
import React from "react";
import { render } from "react-dom";
import store from "./stores";
import { Provider } from "react-redux";

import App from "./components/App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element is not found");
}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
store.dispatch({ type: "tweet/poll_start" });
