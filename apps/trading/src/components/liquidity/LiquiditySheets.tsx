import type { ReactNode } from "react";
import type { TerminalViewModel } from "@/terminal/types";

/** Bottom sheet on phones, centred dialog on larger screens (`.fd-sheet`). */
function Sheet({
  title,
  rows,
  onClose,
  children,
}: {
  title: string;
  rows: { k: string; v: string }[];
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <button type="button" className="fd-scrim" aria-label="Close" onClick={onClose} />
      <div
        className="fd-sheet cr-sheet lq-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className="hm-grab" aria-hidden="true" />
        <div className="fd-head">
          <h2>{title}</h2>
          <button type="button" className="fd-hbtn fd-x" aria-label="Close" onClick={onClose}>
            <svg
              width="16"
              height="16"
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
        <div className="pp-rows lq-sheet-rows">
          {rows.map((row, i) => (
            <div key={i} className="obs-row">
              <span>{row.k}</span>
              <b className="num">{row.v}</b>
            </div>
          ))}
        </div>
        {children}
      </div>
    </>
  );
}

/** Amount entry for a deposit into the chosen vault. */
export function DepositSheet({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <Sheet title={liq.sheetTitle} rows={liq.sheetRows} onClose={liq.closeSheet}>
      <label className="fd-lbl" htmlFor="lq-amt">
        Amount, USDC
      </label>
      <div className="fd-amt">
        <input
          id="lq-amt"
          className="fd-input num"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={liq.amt}
          onChange={liq.onAmt}
        />
      </div>
      <div className="cr-chips">
        {liq.quick.map((chip, i) => (
          <button key={i} type="button" className="wk-o" onClick={chip.pick}>
            {chip.label}
          </button>
        ))}
        <span className="cr-max num">{liq.avail}</span>
      </div>
      {liq.estEarn ? <p className="lq-est num">{liq.estEarn}</p> : null}
      <button type="button" className="cta fd-cta" disabled={liq.ctaDis} onClick={liq.submit}>
        {liq.cta}
      </button>
    </Sheet>
  );
}

/** Confirms leaving a locked vault before unlock, showing the penalty. */
export function EarlyExitSheet({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <Sheet title={liq.exitTitle} rows={liq.exitRows} onClose={liq.closeSheet}>
      <button type="button" className="cta fd-cta lq-exit-cta" onClick={liq.exitConfirm}>
        Exit and Pay the Penalty
      </button>
    </Sheet>
  );
}
