import { useRef } from "react";
import { scrollBehavior } from "@/components/common/motion";

/** Page controls as produced by the view model's `paginate`. */
export interface PagerModel {
  text?: string;
  prev?: () => void;
  next?: () => void;
  prevDis?: boolean;
  nextDis?: boolean;
  multi?: boolean;
  nums?: { label: string; cls: string; cur: string; go: () => void }[];
}

/** Table pager (`.pgx`); with `scrollTarget`, a page change scrolls that ancestor back into view. */
export function Pager({ pager, scrollTarget }: { pager?: PagerModel; scrollTarget?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const turn = (go?: () => void) => () => {
    go?.();
    if (!scrollTarget) {
      return;
    }
    requestAnimationFrame(() => {
      const target = ref.current?.closest<HTMLElement>(scrollTarget);
      if (!target) {
        return;
      }
      const scroller = target.closest<HTMLElement>(".page");
      const top = scroller ? Math.max(0, scroller.getBoundingClientRect().top) : 0;
      if (target.getBoundingClientRect().top < top) {
        target.scrollIntoView({ block: "start", behavior: scrollBehavior() });
      }
    });
  };
  return (
    <div className="pgx num" ref={ref}>
      <span className="pgx-t">{pager?.text}</span>
      <span className="pgx-c">
        <button
          type="button"
          className="pgx-a"
          aria-label="Previous page"
          disabled={!!pager?.prevDis}
          onClick={turn(pager?.prev)}
        >
          <Chevron d="m15 18-6-6 6-6" />
        </button>
        {(pager?.nums || []).map((num, i) => (
          <button
            key={i}
            type="button"
            className={num.cls}
            aria-current={num.cur === "page" ? "page" : undefined}
            onClick={turn(num.go)}
          >
            {num.label}
          </button>
        ))}
        <button
          type="button"
          className="pgx-a"
          aria-label="Next page"
          disabled={!!pager?.nextDis}
          onClick={turn(pager?.next)}
        >
          <Chevron d="m9 18 6-6-6-6" />
        </button>
      </span>
    </div>
  );
}

function Chevron({ d }: { d: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ fill: "none", stroke: "currentColor" }}
    >
      <path d={d} />
    </svg>
  );
}
