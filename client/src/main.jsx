import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProvideAuth } from "./hooks/useProvideAuth";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
