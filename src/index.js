/* @flow */
import React from "react";
import { render } from "react-dom";
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

import App from "./components/App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element is not found");
}
render(<App />, rootElement);
