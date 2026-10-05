import { createRoot } from "react-dom/client";
import { App } from "@/App";
import type { AppProps } from "@/terminal/types";
import "@/styles/index.css";

// Initial UI state can be passed as URL-encoded JSON in the hash,
// e.g. `/#{"initialScreen":"watch","initialTheme":"light"}`.
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

createRoot(document.getElementById("root")!).render(<App {...readHashProps()} />);
