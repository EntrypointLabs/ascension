import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";
import { LogoTile } from "@openfutures/ui";

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
        <LogoTile size="lg" markSize={22} className="cel-mark" />
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
