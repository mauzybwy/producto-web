/*****************************************************************************
 * Import
 *****************************************************************************/
import React from "react";
import "style/index.css";
import "style/app.scss";
import Favicon from "react-favicon";
import ReactDOM from "react-dom";
import App from "./App";

/*****************************************************************************
 * Render
 *****************************************************************************/
ReactDOM.render(
  <div>
    <React.Suspense fallback={<div />}>
      <App />
    </React.Suspense>
    <Favicon url={require("./images/logo512.png")} />
  </div>,
  document.getElementById("producto-extension-root")
);
