import { parseStyle } from "@/lib/style";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function DetailNav({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="detail-nav">
      <button type="button" className="btn btn-icon" aria-label="Back" onClick={vm.goHome}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ fill: "none", stroke: "currentColor" }}
        >
          <path d="M19 12H5" />
          <path d="m11 6-6 6 6 6" />
        </svg>
      </button>
      <span className="dn-r">
        <button
          type="button"
          className="btn btn-icon"
          aria-label={`Share ${vm.m?.sym ?? ""}-PERP`}
          onClick={vm.shareAsset}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <path d="M12 15V3" />
            <path d="m7 8 5-5 5 5" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-icon"
          aria-label="Add to watchlist"
          aria-pressed={vm.favPressed as AriaBoolean}
          onClick={vm.toggleFav}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
            strokeLinejoin="round"
            aria-hidden="true"
            style={parseStyle(`fill: ${vm.favFill ?? ""}; stroke: currentColor`)}
          >
            <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9Z" />
          </svg>
        </button>
      </span>
    </div>
  );
}
