import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-bootstrap/dist/react-bootstrap"; // Import react-bootstrap
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { AtuhContextProvider } from "./Store/auth-context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AtuhContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AtuhContextProvider>
  </React.StrictMode>
);
