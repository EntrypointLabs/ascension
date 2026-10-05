import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function FundingHistoryTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="dt dt-fund num" role="table" aria-label="Funding history">
        <div className="dt-row dt-head" role="row">
          <div role="columnheader">Time</div>
          <div role="columnheader">Market</div>
          <div role="columnheader">Venue</div>
          <div role="columnheader">Position</div>
          <div role="columnheader">Rate, 1h</div>
          <div role="columnheader">Payment</div>
        </div>
        {(vm.fundHist || []).map((fundHistItem: any, i: any) => (
          <Fragment key={i}>
            <div className="dt-row" role="row">
              <div role="cell">{fundHistItem?.time}</div>
              <div role="cell">
                <div className="mcell">
                  <img className="logo xs" src={fundHistItem?.logo} alt="" />
                  <b>{fundHistItem?.sym}-PERP</b>
                </div>
              </div>
              <div role="cell">
                <span className="vcell">
                  <img className="logo xxs" src={fundHistItem?.venueLogo} data-venue="1" alt="" />
                  {fundHistItem?.venueName}
                </span>
              </div>
              <div role="cell">
                <span className={`side ${fundHistItem?.sideCls ?? ""}`}>
                  {fundHistItem?.sideLabel}
                </span>{" "}
                {fundHistItem?.size}
              </div>
              <div role="cell">{fundHistItem?.rate}</div>
              <div role="cell" className={fundHistItem?.payCls}>
                {fundHistItem?.pay}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
