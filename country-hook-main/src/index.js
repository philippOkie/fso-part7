import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Replace ReactDOM.render with createRoot
const root = document.getElementById("root") || document.createElement("div");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<App />);
