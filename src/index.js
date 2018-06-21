import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router, Route, IndexRoute } from "react-router";
import { HashRouter } from "react-router-dom";

const Root = () => {
  return (
    <HashRouter>
      <Route path="/" component={App} />
    </HashRouter>
  );
};
ReactDOM.render(<Root />, document.querySelector("#root"));
