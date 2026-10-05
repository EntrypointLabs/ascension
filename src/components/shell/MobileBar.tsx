import type { TerminalViewModel } from "@/terminal/types";

export function MobileBar({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="mobile-bar">
      <button type="button" className="cta long" onClick={vm.sheetLong}>
        Long {vm.m?.sym}
      </button>
      <button type="button" className="cta short" onClick={vm.sheetShort}>
        Short {vm.m?.sym}
      </button>
    </div>
  );
}
