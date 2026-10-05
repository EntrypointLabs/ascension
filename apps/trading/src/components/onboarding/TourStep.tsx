import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";
import { LogoTile } from "@openfutures/ui";

export function TourStep({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="ob-top">
        <span className="ob-step num">{vm.ob?.stepText}</span>
        <button type="button" className="ob-skip" onClick={vm.ob?.skip}>
          Skip setup
        </button>
      </div>
      <div
        className="ob-viewport"
        id="ob-viewport"
        onPointerDown={vm.ob?.down}
        onPointerMove={vm.ob?.move}
        onPointerUp={vm.ob?.up}
        onPointerCancel={vm.ob?.up}
      >
        <div className="ob-track" id="ob-track" style={parseStyle(`--i: ${vm.ob?.idx ?? ""}`)}>
          <div className="ob-slide" aria-hidden={vm.ob?.h1 as AriaBoolean}>
            <div className="ob-art ob-art-route" aria-hidden="true">
              <div className="oar-venues">
                {(vm.ob?.venues || []).map((venue: any, i: any) => (
                  <Fragment key={i}>
                    <span className="oar-v">
                      <img className="logo" src={venue?.logo} data-venue="1" alt="" />
                      <em className="num">{venue?.px}</em>
                    </span>
                  </Fragment>
                ))}
              </div>
              <div className="oar-lines">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="oar-best">
                <LogoTile size="sm" />
                <b>Best fill</b>
                <span className="num">{vm.ob?.bestName}</span>
              </div>
            </div>
            <h2>Every venue, one ticket</h2>
            <p>
              OpenFutures compares price, fees and depth across Binance, OKX, Hyperliquid, Lighter,
              Variational and dYdX for every order, then sends it to the cheapest one. One balance,
              one set of positions.
            </p>
          </div>
          <div className="ob-slide" aria-hidden={vm.ob?.h2 as AriaBoolean}>
            <div className="ob-art ob-art-panel">
              <button
                type="button"
                className={vm.ob?.routeCls}
                role="switch"
                aria-checked={vm.ob?.routeStr as AriaBoolean}
                onClick={vm.ob?.toggleRoute}
              >
                <span>
                  <b>Smart routing</b>
                  <small>{vm.ob?.routeSub}</small>
                </span>
                <span className="ob-sw" aria-hidden="true">
                  <i />
                </span>
              </button>
              {vm.ob?.routeOff ? (
                <>
                  <p className="ob-lbl">Always trade on</p>
                  <div className="ob-venue-grid">
                    {(vm.ob?.venuePick || []).map((venuePickItem: any, i: any) => (
                      <Fragment key={i}>
                        <button
                          type="button"
                          className={venuePickItem?.cls}
                          aria-pressed={venuePickItem?.pressed}
                          onClick={venuePickItem?.pick}
                        >
                          <img className="logo" src={venuePickItem?.logo} data-venue="1" alt="" />
                          {venuePickItem?.name}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <h2>Routing is your call</h2>
            <p>
              Smart routing is on by default. Turn it off to send every order to one venue you
              choose. Either way, you can still pick a venue for a single order from the order
              panel.
            </p>
          </div>
          <div className="ob-slide" aria-hidden={vm.ob?.h3 as AriaBoolean}>
            <div className="ob-art ob-art-modes">
              <button
                type="button"
                className={vm.ob?.proCls}
                aria-pressed={vm.ob?.proStr as AriaBoolean}
                onClick={vm.ob?.pickPro}
              >
                <span className="obm-ic">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <path d="M7 4v16M17 4v16" />
                    <rect x="4.5" y="8" width="5" height="7" rx="1" />
                    <rect x="14.5" y="6" width="5" height="9" rx="1" />
                  </svg>
                </span>
                <b>Pro</b>
                <small>Trade freely. Nothing is scored.</small>
              </button>
              <button
                type="button"
                className={vm.ob?.propCls}
                aria-pressed={vm.ob?.propStr as AriaBoolean}
                onClick={vm.ob?.pickProp}
              >
                <span className="obm-ic">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
                    <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
                  </svg>
                </span>
                <b>Prop</b>
                <small>
                  Pass an evaluation, then trade the vault's capital and keep 80% of profits.
                </small>
              </button>
            </div>
            <h2>Pro or Prop</h2>
            <p>
              Pro trades your own balance. Prop trades capital from the OpenFutures Vault: pass an
              evaluation within the loss limits, then keep 80% of profits. Anyone can supply the
              vault's liquidity. Switch modes in the top bar.
            </p>
          </div>
          <div className="ob-slide" aria-hidden={vm.ob?.h4 as AriaBoolean}>
            <div className="ob-art ob-art-panel">
              <p className="ob-lbl">Theme</p>
              <div className="ob-themes">
                {(vm.ob?.themes || []).map((theme: any, i: any) => (
                  <Fragment key={i}>
                    <button
                      type="button"
                      className={theme?.cls}
                      aria-pressed={theme?.pressed}
                      onClick={theme?.pick}
                    >
                      <i className={theme?.sw} />
                      {theme?.label}
                    </button>
                  </Fragment>
                ))}
              </div>
              <p className="ob-lbl">Start your watchlist</p>
              <div className="ob-watch">
                {(vm.ob?.watch || []).map((watchItem: any, i: any) => (
                  <Fragment key={i}>
                    <button
                      type="button"
                      className={watchItem?.cls}
                      aria-pressed={watchItem?.pressed}
                      onClick={watchItem?.pick}
                    >
                      <img className="logo" src={watchItem?.logo} alt="" />
                      {watchItem?.sym}
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
            <h2>Make it yours</h2>
            <p>
              Pick a look and the markets you want close at hand. Starred markets show up under
              Watchlist everywhere.
            </p>
          </div>
          <div className="ob-slide" aria-hidden={vm.ob?.h5 as AriaBoolean}>
            <div className="ob-art ob-art-panel ob-summary">
              {(vm.ob?.summary || []).map((summaryItem: any, i: any) => (
                <Fragment key={i}>
                  <div className="obs-row">
                    <span>{summaryItem?.k}</span>
                    <b>{summaryItem?.v}</b>
                  </div>
                </Fragment>
              ))}
            </div>
            <h2>You are all set</h2>
            <p>
              Everything here can be changed later in Settings, including replaying this
              introduction.
            </p>
          </div>
        </div>
      </div>
      <div className="ob-foot">
        <button
          type="button"
          className="ob-nav"
          aria-label="Previous"
          disabled={!!vm.ob?.prevDis}
          onClick={vm.ob?.prev}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div className="ob-dots" role="tablist" aria-label="Steps">
          {(vm.ob?.dots || []).map((dot: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="tab"
                className={dot?.cls}
                aria-label={dot?.label}
                aria-selected={dot?.on}
                onClick={dot?.go}
              />
            </Fragment>
          ))}
        </div>
        {vm.ob?.notLast ? (
          <>
            <button
              type="button"
              className="ob-nav primary"
              aria-label="Next"
              onClick={vm.ob?.next}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        ) : null}
        {vm.ob?.isLast ? (
          <>
            <button type="button" className="ob-btn primary ob-finish" onClick={vm.ob?.finish}>
              Start trading
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}
