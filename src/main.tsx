import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Clarity from "@microsoft/clarity";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

if (import.meta.env.PROD && clarityProjectId) {
  Clarity.init(clarityProjectId);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
