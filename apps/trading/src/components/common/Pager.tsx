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

/** "1 to 10 of 31" with previous, numbered and next page buttons (`.pgx`). */
export function Pager({ pager }: { pager?: PagerModel }) {
  return (
    <div className="pgx num">
      <span className="pgx-t">{pager?.text}</span>
      <span className="pgx-c">
        <button
          type="button"
          className="pgx-a"
          aria-label="Previous page"
          disabled={!!pager?.prevDis}
          onClick={pager?.prev}
        >
          <Chevron d="m15 18-6-6 6-6" />
        </button>
        {(pager?.nums || []).map((num, i) => (
          <button
            key={i}
            type="button"
            className={num.cls}
            aria-current={num.cur === "page" ? "page" : undefined}
            onClick={num.go}
          >
            {num.label}
          </button>
        ))}
        <button
          type="button"
          className="pgx-a"
          aria-label="Next page"
          disabled={!!pager?.nextDis}
          onClick={pager?.next}
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
