import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

const STORAGE_KEY = "openfutures-page-scroll";
const RESTORE_TIMEOUT_MS = 1500;

function readSaved(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function documentWasRestored() {
  const entry = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  return entry?.type === "reload" || entry?.type === "back_forward";
}

function writeSaved(saved: Record<string, number>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {}
}

/**
 * On desktop each page scrolls inside its own `.page` element, which the browser does not restore.
 * Remembers that offset per history entry and puts it back on Back, Forward and reload.
 */
export function usePageScroll() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const saved = useRef<Record<string, number>>(readSaved());
  const keyRef = useRef(location.key);
  const appliedKey = useRef<string | null>(null);
  keyRef.current = location.key;

  useEffect(() => {
    let frame = 0;
    const onScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!(target instanceof HTMLElement) || !target.classList.contains("page")) {
        return;
      }
      saved.current[keyRef.current] = target.scrollTop;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => writeSaved(saved.current));
    };
    document.addEventListener("scroll", onScroll, true);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  useLayoutEffect(() => {
    if (appliedKey.current === location.key) {
      return;
    }
    const isFirstRun = appliedKey.current === null;
    appliedKey.current = location.key;
    if (isFirstRun ? !documentWasRestored() : navigationType !== "POP") {
      return;
    }
    const target = saved.current[location.key];
    if (!target) {
      return;
    }
    const key = location.key;
    const startedAt = performance.now();
    const restore = () => {
      if (appliedKey.current !== key) {
        return;
      }
      const page = document.querySelector<HTMLElement>(".page:not(.page-loading)");
      if (page && page.scrollHeight - page.clientHeight >= target) {
        page.scrollTop = target;
        return;
      }
      if (performance.now() - startedAt < RESTORE_TIMEOUT_MS) {
        requestAnimationFrame(restore);
      } else if (page) {
        page.scrollTop = target;
      }
    };
    restore();
  }, [location.key, navigationType]);
}
