import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AuthProvider from "./auth/AuthProvider";
import store from "./store/index";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
