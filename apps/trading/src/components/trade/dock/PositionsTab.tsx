import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function PositionsTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      {vm.hasPositions ? (
        <>
          <div className="dt dt-pos num" role="table" aria-label="Open positions">
            <div className="dt-row dt-head" role="row">
              <div role="columnheader">Market</div>
              <div role="columnheader">Side</div>
              <div role="columnheader">Venue</div>
              <div role="columnheader">Size</div>
              <div role="columnheader">Value</div>
              <div role="columnheader">Entry Price</div>
              <div role="columnheader">Mark Price</div>
              <div role="columnheader">Liq. Price</div>
              <div role="columnheader">Margin</div>
              <div role="columnheader">PnL (ROE)</div>
              <div role="columnheader">
                <span className="sr">Actions</span>
              </div>
            </div>
            {(vm.positions || []).map((position: any, i: any) => (
              <Fragment key={i}>
                <div className="dt-row" role="row">
                  <div role="cell">
                    <div className="mcell">
                      <img className="logo sm" src={position?.logo} alt="" />
                      <div>
                        <b>
                          {position?.sym}-PERP
                          <span className="lev">{position?.levText}</span>
                        </b>
                      </div>
                    </div>
                  </div>
                  <div role="cell">
                    <span className={`dir ${position?.sideCls ?? ""}`}>
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
                        <path d={position?.dirPath} />
                      </svg>
                      {position?.sideLabel}
                    </span>
                  </div>
                  <div role="cell">
                    <span className="vcell">
                      <img className="logo xxs" src={position?.venueLogo} data-venue="1" alt="" />
                      {position?.venueName}
                    </span>
                  </div>
                  <div role="cell">{position?.sizeText}</div>
                  <div role="cell">{position?.valueText}</div>
                  <div role="cell">{position?.entryText}</div>
                  <div role="cell">{position?.markText}</div>
                  <div role="cell">{position?.liqText}</div>
                  <div role="cell">{position?.marginText}</div>
                  <div role="cell">
                    <div className="pnl">
                      <b className={position?.pnlCls}>{position?.pnlText}</b>
                      <small className={position?.pnlCls}>{position?.roeText}</small>
                    </div>
                  </div>
                  <div role="cell">
                    <span className="row-actions">
                      <button
                        type="button"
                        className="mini mini-ic"
                        aria-label={`Share ${position?.sym ?? ""}-PERP position`}
                        onClick={position?.share}
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
                      <button type="button" className="mini" onClick={position?.tpsl}>
                        {position?.tpslLabel}
                      </button>
                      <button type="button" className="mini" onClick={position?.close}>
                        Close
                      </button>
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
      {vm.noPositions ? (
        <>
          <div className="dock-empty">
            <b>No open positions</b>
            <span>Positions you open on this account show up here.</span>
          </div>
        </>
      ) : null}
    </>
  );
}
