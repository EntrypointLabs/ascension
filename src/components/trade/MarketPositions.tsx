import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function MarketPositions({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <section
        className="m-section flat m-pos"
        aria-label={`Open positions in ${vm.m?.sym ?? ""}-PERP`}
      >
        <div className="m-head">
          <h3>Open positions</h3>
          <span className="num">{vm.mlist?.hereCount}</span>
        </div>
        <div className="hm-list m-list-plain pc-list">
          {(vm.mlist?.here || []).map((hereItem: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                className="hm-row"
                aria-haspopup="dialog"
                onClick={hereItem?.details}
              >
                <span className="av">
                  <img className="logo" src={hereItem?.logo} alt="" />
                  <img className="av-badge" src={hereItem?.venueLogo} data-venue="1" alt="" />
                </span>
                <span className="hm-id">
                  <b className="hm-t2">
                    <span className="hm-tk">{hereItem?.sym}-PERP</span>
                    <span className="lev">{hereItem?.lev}</span>
                  </b>
                  <small>
                    <span className={`dir ${hereItem?.sideCls ?? ""}`}>{hereItem?.side}</span>
                  </small>
                </span>
                <span className="hm-px num">
                  <b className={hereItem?.pnlCls}>{hereItem?.pnl}</b>
                  <small className={hereItem?.pnlCls}>{hereItem?.roeA}</small>
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
