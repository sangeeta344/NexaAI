import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
