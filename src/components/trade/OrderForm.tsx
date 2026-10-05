import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function OrderForm({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <span className="grab" aria-hidden="true" />
      <div className="sheet-head">
        <h2>
          <img className="logo xs" src={vm.m?.logo} alt="" />
          <span>Trade {vm.m?.sym}-PERP</span>
        </h2>
        <button
          type="button"
          className="btn btn-icon"
          aria-label="Close order form"
          onClick={vm.closeAll}
        >
          <svg
            width="20"
            height="20"
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
      <div className="tp-row">
        <button
          type="button"
          className="tp-btn"
          onClick={vm.toggleMode}
          aria-label={`Margin mode, ${vm.marginMode ?? ""}`}
        >
          {vm.marginMode}
        </button>
        <button
          type="button"
          className="tp-btn num"
          aria-expanded={vm.levOpenStr as AriaBoolean}
          onClick={vm.toggleLev}
          aria-label={`Leverage ${vm.lev ?? ""}x`}
        >
          <span>{vm.lev}x</span>
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-icon sm pane-tools tp-collapse"
          aria-label="Collapse trade panel"
          onClick={vm.collapseTrade}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <path d="m14 6 6 6-6 6" />
            <path d="M4 4v16" />
          </svg>
        </button>
      </div>
      {vm.levOpen ? (
        <>
          <div className="lev-pop">
            <label className="field-label" htmlFor="lev">
              <span>Leverage</span>
              <span className="lev-val num">{vm.lev}x</span>
            </label>
            <input
              id="lev"
              className="range"
              type="range"
              min="1"
              max={vm.m?.max}
              step="1"
              value={vm.lev ?? ""}
              onChange={vm.onLev}
              style={parseStyle(`--fill: ${vm.levFill ?? ""}%`)}
            />
            <div className="range-scale num">
              <span>1x</span>
              <span>{vm.m?.max}x</span>
            </div>
          </div>
        </>
      ) : null}
      {vm.isProp ? (
        <>
          <button type="button" className="prop-line cr-strip num" onClick={vm.prop2?.goProp}>
            <span className="mode-dot prop" />
            <b>Prop</b>
            <span>{vm.prop2?.stripText}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      ) : null}
      <div className="tabs tp-tabs" role="tablist" aria-label="Order type">
        {(vm.otabs || []).map((otab: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              role="tab"
              className={otab?.cls}
              aria-selected={otab?.pressed}
              onClick={otab?.pick}
            >
              {otab?.label}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="seg" role="group" aria-label="Direction">
        <button
          type="button"
          className={vm.longCls}
          aria-pressed={vm.isLongStr as AriaBoolean}
          onClick={vm.pickLong}
        >
          Buy / Long
        </button>
        <button
          type="button"
          className={vm.shortCls}
          aria-pressed={vm.isShortStr as AriaBoolean}
          onClick={vm.pickShort}
        >
          Sell / Short
        </button>
      </div>
      <dl className="tp-lines num">
        <div>
          <dt>Available</dt>
          <dd>{vm.freeText} USDC</dd>
        </div>
        <div>
          <dt>Position</dt>
          <dd>{vm.posLine}</dd>
        </div>
      </dl>
      {vm.isLimit ? (
        <>
          <div className="tp-input">
            <label htmlFor="limit-price">Price</label>
            <input id="limit-price" type="text" value={vm.limit ?? ""} onChange={vm.onLimit} />
            <span>USD</span>
          </div>
        </>
      ) : null}
      <div className="tp-input">
        <label htmlFor="margin">Size</label>
        <input id="margin" type="text" value={vm.size ?? ""} onChange={vm.onSize} />
        <span>USDC</span>
      </div>
      <div className="tp-slider">
        <input
          className="range"
          type="range"
          min="0"
          max="100"
          step="1"
          value={vm.sizePct ?? ""}
          onChange={vm.onPct}
          aria-label="Size as a percent of available"
          style={parseStyle(`--fill: ${vm.sizePct ?? ""}%`)}
        />
        <span className="pct-box num">{vm.sizePct}%</span>
      </div>
      <label className="tp-check">
        <input type="checkbox" checked={!!vm.reduceOnly} onChange={vm.toggleReduce} />
        Reduce only
      </label>
      <button
        type="button"
        className={`cta ${vm.side ?? ""}`}
        disabled={!!vm.ctaDisabled}
        onClick={vm.placeOrder}
      >
        {vm.ctaText}
      </button>
      <dl className="tp-details num">
        <div>
          <dt>Liquidation Price</dt>
          <dd>{vm.liqText}</dd>
        </div>
        <div>
          <dt>Order Value</dt>
          <dd>{vm.posText}</dd>
        </div>
        <div>
          <dt>Margin Required</dt>
          <dd>{vm.marginReq}</dd>
        </div>
        <div>
          <dt>Fees</dt>
          <dd>{vm.feeText}</dd>
        </div>
      </dl>
      <section className="vsel" aria-label="Venue">
        <button
          type="button"
          className="vsel-row"
          aria-expanded={vm.q?.openStr as AriaBoolean}
          onClick={vm.q?.toggle}
        >
          <span className="vs-l">Venue</span>
          <span className="vs-r">
            <img className="logo xxs" src={vm.q?.selLogo} data-venue="1" alt="" />
            {vm.q?.selName}
            {vm.q?.selIsBest ? (
              <>
                <span className="best-pill">Best</span>
              </>
            ) : null}
            <small className="num">{vm.q?.count} options</small>
            <svg
              className="q-chev"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
        {vm.q?.open ? (
          <>
            <div
              className="vsel-list"
              role="listbox"
              aria-label="Venues ranked by cost for this order"
            >
              {(vm.q?.all || []).map((allItem: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    role="option"
                    className={allItem?.cls}
                    aria-selected={allItem?.selected}
                    onClick={allItem?.pick}
                  >
                    <span className="vo-rank num">{allItem?.rank}</span>
                    <img className="logo xs" src={allItem?.logo} data-venue="1" alt="" />
                    <span className="vo-name">{allItem?.name}</span>
                    <span className="vo-r num">
                      <b>{allItem?.fill}</b>
                      <small className={allItem?.deltaCls}>{allItem?.delta}</small>
                    </span>
                    <span className="vo-check" aria-hidden="true">
                      {allItem != null && allItem.isSel ? (
                        <>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{ fill: "none", stroke: "currentColor" }}
                          >
                            <path d="m5 12 5 5 9-10" />
                          </svg>
                        </>
                      ) : null}
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
