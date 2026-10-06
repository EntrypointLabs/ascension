import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Calls `onEscape` when Escape is pressed anywhere in the document while mounted. */
export function useEscape(onEscape: () => void, enabled = true) {
  const ref = useRef(onEscape);
  ref.current = onEscape;
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        ref.current();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [enabled]);
}

/** Moves focus into a modal, traps Tab, closes on Escape and restores focus on unmount. */
export function useDialogFocus(
  dialogRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  initial?: string,
) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const first = (initial && dialog?.querySelector<HTMLElement>(initial)) || dialog;
    first?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      } else if (event.key === "Tab" && dialog) {
        const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.tabIndex >= 0 && el.getClientRects().length > 0,
        );
        if (!items.length) {
          event.preventDefault();
          return;
        }
        const head = items[0];
        const tail = items[items.length - 1];
        if (!dialog.contains(document.activeElement)) {
          event.preventDefault();
          head.focus();
        } else if (
          event.shiftKey &&
          (document.activeElement === head || document.activeElement === dialog)
        ) {
          event.preventDefault();
          tail.focus();
        } else if (!event.shiftKey && document.activeElement === tail) {
          event.preventDefault();
          head.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (opener && opener.isConnected && opener !== document.body) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);
}

/** Stops the page behind an overlay from scrolling while mounted. */
export function useScrollLock(scrollers = ".page") {
  useEffect(() => {
    const els = [
      document.documentElement,
      document.body,
      ...Array.from(document.querySelectorAll<HTMLElement>(scrollers)),
    ];
    const prev = els.map((el) => el.style.overflow);
    els.forEach((el) => {
      el.style.overflow = "hidden";
    });
    return () => {
      els.forEach((el, i) => {
        el.style.overflow = prev[i];
      });
    };
  }, [scrollers]);
}
