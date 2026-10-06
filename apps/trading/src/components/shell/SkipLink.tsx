import type { MouseEvent } from "react";

function mainTarget(): HTMLElement | null {
  const marked = document.getElementById("main");
  if (marked && marked.getClientRects().length) {
    return marked;
  }
  const pages = document.querySelectorAll<HTMLElement>("main, .page, .layout");
  return Array.from(pages).find((el) => el.getClientRects().length > 0) || null;
}

/** "Skip to content" link, visible only when focused; moves focus to the active page. */
export function SkipLink() {
  const skip = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = mainTarget();
    if (!target) {
      return;
    }
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus({ preventScroll: true });
  };
  return (
    <a className="skip-link" href="#main" onClick={skip}>
      Skip to content
    </a>
  );
}
