import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function OrdersTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      {vm.hasOrders ? (
        <>
          <div className="dt dt-ord num" role="table" aria-label="Open orders">
            <div className="dt-row dt-head" role="row">
              <div role="columnheader">Market</div>
              <div role="columnheader">Side</div>
              <div role="columnheader">Venue</div>
              <div role="columnheader">Type</div>
              <div role="columnheader">Price</div>
              <div role="columnheader">Amount</div>
              <div role="columnheader">Value</div>
              <div role="columnheader">Filled</div>
              <div role="columnheader">Placed</div>
              <div role="columnheader">
                <span className="sr">Actions</span>
              </div>
            </div>
            {(vm.orders || []).map((order: any, i: any) => (
              <Fragment key={i}>
                <div className="dt-row" role="row">
                  <div role="cell">
                    <div className="mcell">
                      <img className="logo sm" src={order?.logo} alt="" />
                      <div>
                        <b>{order?.sym}-PERP</b>
                      </div>
                    </div>
                  </div>
                  <div role="cell">
                    <span className={`dir ${order?.sideCls ?? ""}`}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ fill: "none", stroke: "currentColor" }}
                      >
                        <path d={order?.dirPath} />
                      </svg>
                      {order?.sideLabel}
                    </span>
                  </div>
                  <div role="cell">
                    <span className="vcell">
                      <img className="logo xxs" src={order?.venueLogo} data-venue="1" alt="" />
                      {order?.venueName}
                    </span>
                  </div>
                  <div role="cell">{order?.type}</div>
                  <div role="cell">{order?.priceText}</div>
                  <div role="cell">{order?.amountText}</div>
                  <div role="cell">{order?.valueText}</div>
                  <div role="cell">
                    <span className="fillbar">
                      {order?.filledText}
                      <i>
                        <span style={parseStyle(`width: ${order?.filled ?? ""}%`)} />
                      </i>
                    </span>
                  </div>
                  <div role="cell">{order?.placed}</div>
                  <div role="cell">
                    <span className="row-actions">
                      <button
                        type="button"
                        className="mini mini-ic"
                        aria-label={`Share ${order?.sym ?? ""}-PERP order`}
                        onClick={order?.share}
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
                      <button type="button" className="mini" onClick={order?.cancel}>
                        Cancel
                      </button>
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
      {vm.noOrders ? (
        <>
          <div className="dock-empty">
            <b>No open orders</b>
            <span>Limit orders waiting to fill show up here.</span>
          </div>
        </>
      ) : null}
    </>
  );
}
