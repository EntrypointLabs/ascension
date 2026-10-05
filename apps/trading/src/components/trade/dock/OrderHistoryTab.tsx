import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function OrderHistoryTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="dt dt-oh num" role="table" aria-label="Order history">
        <div className="dt-row dt-head" role="row">
          <div role="columnheader">Time</div>
          <div role="columnheader">Market</div>
          <div role="columnheader">Venue</div>
          <div role="columnheader">Type</div>
          <div role="columnheader">Side</div>
          <div role="columnheader">Price</div>
          <div role="columnheader">Amount</div>
          <div role="columnheader">Filled</div>
          <div role="columnheader">Status</div>
        </div>
        {(vm.orderHist || []).map((orderHistItem: any, i: any) => (
          <Fragment key={i}>
            <div className="dt-row" role="row">
              <div role="cell">{orderHistItem?.time}</div>
              <div role="cell">
                <div className="mcell">
                  <img className="logo xs" src={orderHistItem?.logo} alt="" />
                  <b>{orderHistItem?.sym}-PERP</b>
                </div>
              </div>
              <div role="cell">
                <span className="vcell">
                  <img className="logo xxs" src={orderHistItem?.venueLogo} data-venue="1" alt="" />
                  {orderHistItem?.venueName}
                </span>
              </div>
              <div role="cell">{orderHistItem?.type}</div>
              <div role="cell">
                <span className={`side ${orderHistItem?.sideCls ?? ""}`}>
                  {orderHistItem?.sideLabel}
                </span>
              </div>
              <div role="cell">{orderHistItem?.price}</div>
              <div role="cell">{orderHistItem?.amount}</div>
              <div role="cell">{orderHistItem?.filled}</div>
              <div role="cell">
                <span className={orderHistItem?.statusCls}>{orderHistItem?.status}</span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
