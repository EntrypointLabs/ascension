import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/** Sets `data-more` to "l", "r" or "l r" while a horizontal scroller has hidden content on that side. */
export function useEdgeFade(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const more = [el.scrollLeft > 1 ? "l" : "", el.scrollLeft < max - 1 ? "r" : ""]
        .filter(Boolean)
        .join(" ");
      if (more) {
        el.dataset.more = more;
      } else {
        delete el.dataset.more;
      }
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(el);
    Array.from(el.children).forEach((child) => observer?.observe(child));
    return () => {
      el.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, [ref]);
}

/** Focusable `.xscroll` region that fades the edge with more content (`data-more`). */
export function ScrollRegion({
  className,
  label,
  children,
}: {
  className?: string;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEdgeFade(ref);

  return (
    <div ref={ref} className={className} role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}
