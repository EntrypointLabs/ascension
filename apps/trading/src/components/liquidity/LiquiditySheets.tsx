import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import type { TerminalViewModel } from "@/terminal/types";

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Bottom sheet on phones, centred dialog on larger screens (`.fd-sheet`).
 * Focus moves into the sheet on open, stays inside it while open, and returns to whatever
 * opened it on close. Escape closes; submitting the form (Enter in the input) runs `onSubmit`.
 */
function Sheet({
  title,
  rows,
  onClose,
  onSubmit,
  children,
}: {
  title: string;
  rows: { k: string; v: string }[];
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
}) {
  const sheetRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const sheet = sheetRef.current;
    const first = sheet?.querySelector<HTMLElement>("input, .fd-cta") || sheet;
    first?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      } else if (event.key === "Tab" && sheet) {
        const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) {
          return;
        }
        const head = items[0];
        const tail = items[items.length - 1];
        if (event.shiftKey && document.activeElement === head) {
          event.preventDefault();
          tail.focus();
        } else if (!event.shiftKey && document.activeElement === tail) {
          event.preventDefault();
          head.focus();
        } else if (!sheet.contains(document.activeElement)) {
          event.preventDefault();
          head.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (opener && opener.isConnected) {
        opener.focus();
      }
    };
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <>
      <button
        type="button"
        className="fd-scrim"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
      />
      <form
        ref={sheetRef}
        className="fd-sheet cr-sheet lq-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onSubmit={submit}
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
      </form>
    </>
  );
}

/** Amount entry for a deposit into the chosen vault. */
export function DepositSheet({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <Sheet
      title={liq.sheetTitle}
      rows={liq.sheetRows}
      onClose={liq.closeSheet}
      onSubmit={liq.submit}
    >
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
          aria-describedby="lq-avail lq-est"
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
        <span id="lq-avail" className="cr-max num">
          {liq.avail}
        </span>
      </div>
      <p id="lq-est" className="lq-est num" aria-live="polite">
        {liq.estEarn}
      </p>
      <button type="submit" className="cta fd-cta" disabled={liq.ctaDis}>
        {liq.cta}
      </button>
    </Sheet>
  );
}

/** Confirms leaving a locked vault before unlock, showing the penalty. */
export function EarlyExitSheet({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <Sheet
      title={liq.exitTitle}
      rows={liq.exitRows}
      onClose={liq.closeSheet}
      onSubmit={liq.exitConfirm}
    >
      <button type="submit" className="cta fd-cta lq-exit-cta">
        Exit and Pay the Penalty
      </button>
    </Sheet>
  );
}
