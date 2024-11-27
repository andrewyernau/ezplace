import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { SessionProvider } from "./components/SessionContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ThemeProvider>
  </React.StrictMode>
);
