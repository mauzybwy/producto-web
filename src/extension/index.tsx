/*****************************************************************************
 * Import
 *****************************************************************************/
import React from "react";
import "style/index.css";
import "style/app.scss";
import Favicon from "react-favicon";
import ReactDOM from "react-dom";
import App from "./App";
import ExtensionOverlay from "../screens/extension-overlay";

/*****************************************************************************
 * Render
 *****************************************************************************/
const popupRoot = document.getElementById("producto-extension-root");

if (popupRoot) {
  ReactDOM.render(
    <div>
      <React.Suspense fallback={<div />}>
        <App />
      </React.Suspense>
      <Favicon url={require("./images/logo512.png")} />
    </div>,
    popupRoot,
  );
} else {
  const shadowHost = document.createElement("div");
  shadowHost.id = "producto-shadow-host";
  shadowHost.attachShadow({ mode: "open" });

  const injectionElement = document.querySelector<HTMLElement>("body");
  console.log(injectionElement)
  injectionElement.appendChild(shadowHost);
  
  ReactDOM.render(
    <div id="producto-root">
      <React.Suspense fallback={<div />}>
        <ExtensionOverlay />
      </React.Suspense>
    </div>,
    document.getElementById("producto-shadow-host").shadowRoot
  );
}
