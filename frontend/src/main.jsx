import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
// In your component or global styles file (e.g., App.css)
import "@fontsource/roboto"; // This imports all weights and styles of Roboto

// You can also import specific weights and styles like this:
import "@fontsource/roboto/300.css"; // Light weight
import "@fontsource/roboto/500-italic.css"; // Medium italic style

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
