import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
