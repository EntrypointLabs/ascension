import { useRef } from "react";
import { useDialogFocus, useScrollLock } from "@/components/common/useDialogFocus";
import { MarketDetail } from "@/components/watch/MarketDetail";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function WatchDetailSheet({ vm }: { vm: TerminalViewModel }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  useScrollLock();
  useDialogFocus(sheetRef, () => vm.closeAll?.());
  return (
    <>
      <div
        ref={sheetRef}
        className="wsheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${vm.wd?.name ?? ""} across exchanges`}
        tabIndex={-1}
      >
        <span className="grab" aria-hidden="true" />
        <div className="wsheet-head">
          <img className="logo sm" src={vm.wd?.logo} alt="" />
          <div>
            <b>{vm.wd?.sym}</b>
            <small className="num">
              ${vm.wd?.vwap} <span className={vm.wd?.dir}>{vm.wd?.chgText}</span>
            </small>
          </div>
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label={`Add ${vm.wd?.sym ?? ""}-PERP to watchlist`}
            aria-pressed={vm.wd?.favPressed}
            onClick={vm.wd?.toggleFav}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              strokeLinejoin="round"
              aria-hidden="true"
              style={parseStyle(`fill: ${vm.wd?.favFill ?? ""}; stroke: currentColor`)}
            >
              <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label={`Share ${vm.wd?.sym ?? ""}-PERP`}
            onClick={vm.wd?.share}
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
            className="btn btn-icon sm"
            aria-label="Close"
            onClick={vm.closeAll}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <MarketDetail vm={vm} />
      </div>
    </>
  );
}
