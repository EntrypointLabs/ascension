import type { TerminalViewModel } from "@/terminal/types";

export function TpSlSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button type="button" className="fd-scrim" aria-label="Close" onClick={vm.ts?.close} />
      <div className="fd-sheet ts-sheet" role="dialog" aria-label="Take profit and stop loss">
        <span className="hm-grab" aria-hidden="true" />
        <div className="fd-head">
          <h2>TP / SL</h2>
          <button type="button" className="fd-hbtn fd-x" aria-label="Close" onClick={vm.ts?.close}>
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
        <div className="ts-pos num">
          <img className="logo" src={vm.ts?.logo} alt="" />
          <b>{vm.ts?.title}</b>
          <span className={`dir ${vm.ts?.sideCls ?? ""}`}>{vm.ts?.side}</span>
          <span className="ts-meta">
            Entry {vm.ts?.entry}, mark {vm.ts?.mark}
          </span>
        </div>
        <label className="fd-lbl" htmlFor="ts-tp">
          Take profit price
        </label>
        <div className="fd-amt">
          <input
            id="ts-tp"
            className="fd-input num"
            type="text"
            inputMode="decimal"
            placeholder={vm.ts?.tpHint}
            value={vm.ts?.tp ?? ""}
            onChange={vm.ts?.onTp}
          />
          <span className={`ts-est ${vm.ts?.tpCls ?? ""}`}>{vm.ts?.tpEst}</span>
        </div>
        <label className="fd-lbl" htmlFor="ts-sl">
          Stop loss price
        </label>
        <div className="fd-amt">
          <input
            id="ts-sl"
            className="fd-input num"
            type="text"
            inputMode="decimal"
            placeholder={vm.ts?.slHint}
            value={vm.ts?.sl ?? ""}
            onChange={vm.ts?.onSl}
          />
          <span className={`ts-est ${vm.ts?.slCls ?? ""}`}>{vm.ts?.slEst}</span>
        </div>
        {vm.ts?.hasErr ? (
          <>
            <p className="fd-note ts-err">{vm.ts?.err}</p>
          </>
        ) : null}
        <p className="fd-note">
          Both orders close the whole position at market when the mark price reaches them. Leave a
          field empty to skip it.
        </p>
        <div className="ts-actions">
          <button type="button" className="hm-act" onClick={vm.ts?.clear}>
            Clear both
          </button>
          <button
            type="button"
            className="cta fd-cta"
            disabled={!!vm.ts?.saveDisabled}
            onClick={vm.ts?.save}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
