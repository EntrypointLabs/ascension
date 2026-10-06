import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "@/App";
import type { AppProps } from "@/terminal/types";
import "@/styles/index.css";

// Pages live at real paths (see `router/paths.ts`). For tests and demos, initial UI state can
// also be passed as URL-encoded JSON in the hash, e.g. `/#{"initialTheme":"light"}`.
function readHashProps(): AppProps {
  try {
    if (location.hash.length > 1) {
      return JSON.parse(decodeURIComponent(location.hash.slice(1)));
    }
  } catch {
    // an unreadable hash is ignored
  }
  return {};
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App {...readHashProps()} />
  </BrowserRouter>,
);
