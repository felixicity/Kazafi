import React from "react";
import store from "./store";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
      <Provider store = {store}>
            <React.StrictMode>
                    <App />
            </React.StrictMode>
      </Provider>
);
