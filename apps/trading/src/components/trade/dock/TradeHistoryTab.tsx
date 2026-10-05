import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function TradeHistoryTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="dt dt-hist num" role="table" aria-label="Trade history">
        <div className="dt-row dt-head" role="row">
          <div role="columnheader">Time</div>
          <div role="columnheader">Market</div>
          <div role="columnheader">Venue</div>
          <div role="columnheader">Action</div>
          <div role="columnheader">Price</div>
          <div role="columnheader">Amount</div>
          <div role="columnheader">Fee</div>
          <div role="columnheader">Realized PnL</div>
          <div role="columnheader">
            <span className="sr">Share</span>
          </div>
        </div>
        {(vm.history || []).map((historyItem: any, i: any) => (
          <Fragment key={i}>
            <div className="dt-row" role="row">
              <div role="cell">{historyItem?.time}</div>
              <div role="cell">
                <div className="mcell">
                  <img className="logo xs" src={historyItem?.logo} alt="" />
                  <b>{historyItem?.sym}-PERP</b>
                </div>
              </div>
              <div role="cell">
                <span className="vcell">
                  <img className="logo xxs" src={historyItem?.venueLogo} data-venue="1" alt="" />
                  {historyItem?.venueName}
                </span>
              </div>
              <div role="cell">
                <span className={`side ${historyItem?.sideCls ?? ""}`}>{historyItem?.action}</span>
              </div>
              <div role="cell">{historyItem?.priceText}</div>
              <div role="cell">{historyItem?.amountText}</div>
              <div role="cell">{historyItem?.feeText}</div>
              <div role="cell" className={historyItem?.pnlCls}>
                {historyItem?.pnlText}
              </div>
              <div role="cell">
                <button
                  type="button"
                  className="mini mini-ic"
                  aria-label="Share this trade"
                  onClick={historyItem?.share}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
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
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
