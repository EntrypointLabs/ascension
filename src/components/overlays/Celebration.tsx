import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function Celebration({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="cel" aria-hidden="true">
        {(vm.cel?.bits || []).map((bit: any, i: any) => (
          <Fragment key={i}>
            <i className={bit?.cls} style={parseStyle(`${bit?.st ?? ""}`)} />
          </Fragment>
        ))}
      </div>
      <div className="cel-card" role="status" aria-live="polite">
        <span className="ob-mark cel-mark">
          <svg width="22" height="22" viewBox="-6 -6 112 112" aria-hidden="true">
            <path
              className="bmark-g"
              fillRule="evenodd"
              d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
            />
          </svg>
        </span>
        <div className="cel-txt">
          <b>{vm.cel?.title}</b>
          <span>{vm.cel?.sub}</span>
        </div>
        <button type="button" className="ob-btn primary cel-btn" onClick={vm.cel?.close}>
          Start trading
        </button>
      </div>
    </>
  );
}
