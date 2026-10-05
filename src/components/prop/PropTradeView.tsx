import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function PropTradeView({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      {vm.prop2?.none ? (
        <>
          <section className="mw-card">
            <div className="mw-card-h">
              <div>
                <h2>Get Funded</h2>
                <p>Pass the evaluation and trade the vault's capital.</p>
              </div>
            </div>
            <div className="pp-plans">
              {(vm.prop2?.plans || []).map((plan: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    className={plan?.cls}
                    aria-pressed={plan?.pressed}
                    onClick={plan?.pick}
                  >
                    <b className="num">{plan?.size}</b>
                    <span className="num">{plan?.fee} fee</span>
                  </button>
                </Fragment>
              ))}
            </div>
            <div className="pp-rules">
              {(vm.prop2?.rules || []).map((rule: any, i: any) => (
                <Fragment key={i}>
                  <div>
                    <span>{rule?.k}</span>
                    <b className="num">{rule?.v}</b>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="pp-steps">
              <span className="pp-step is-on">
                <i>1</i>Evaluation
              </span>
              <span className="pp-step">
                <i>2</i>Funded
              </span>
              <span className="pp-step">
                <i>3</i>Payouts
              </span>
            </div>
            <div className="pp-cta">
              <button type="button" className="ob-btn primary" onClick={vm.prop2?.start}>
                Start Evaluation, {vm.prop2?.planFee}
              </button>
            </div>
          </section>
        </>
      ) : null}
      {vm.prop2?.hasAcct ? (
        <>
          <div className="pp-grid2">
            <section className="mw-card snap-card" data-snap="prop-account">
              <div className="mw-card-h">
                <div>
                  <h2>{vm.prop2?.size} Account</h2>
                  <p>
                    <span className={vm.prop2?.phaseCls}>{vm.prop2?.phase}</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="snap-btn"
                  aria-label="Save a 4K snapshot"
                  title="Save a 4K snapshot"
                  onClick={vm.mw?.snap}
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
                    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                    <rect x="9" y="10" width="6" height="6" rx="1" />
                  </svg>
                  <span>Snapshot</span>
                </button>
              </div>
              <div className="pp-eq">
                <span>Equity</span>
                <b className="num">{vm.prop2?.equity}</b>
                <em className={`num ${vm.prop2?.pnlCls ?? ""}`}>
                  {vm.prop2?.pnl} ({vm.prop2?.pnlPct})
                </em>
              </div>
              <div className="pp-checks">
                {(vm.prop2?.checks || []).map((check: any, i: any) => (
                  <Fragment key={i}>
                    <div className={check?.cls}>
                      <div className="pp-ck-t">
                        <span>{check?.k}</span>
                        <b className="num">{check?.v}</b>
                      </div>
                      <span className={`pp-bar ${check?.bar ?? ""}`}>
                        <i style={parseStyle(`width: ${check?.w ?? ""}%`)} />
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
              {vm.prop2?.isEval ? (
                <>
                  <p className="pp-note">{vm.prop2?.fundNote}</p>
                  <div className="pp-cta two">
                    <button type="button" className="ob-btn ghost" onClick={vm.prop2?.goTrade}>
                      Trade This Account
                    </button>
                    <button
                      type="button"
                      className="ob-btn primary"
                      disabled={!!vm.prop2?.cantFund}
                      onClick={vm.prop2?.requestFunded}
                    >
                      Request Funded Account
                    </button>
                  </div>
                </>
              ) : null}
              {vm.prop2?.isFunded ? (
                <>
                  <div className="pp-cta">
                    <button type="button" className="ob-btn primary" onClick={vm.prop2?.goTrade}>
                      Trade This Account
                    </button>
                  </div>
                </>
              ) : null}
              {vm.prop2?.broken ? (
                <>
                  <button type="button" className="cr-close" onClick={vm.prop2?.reset}>
                    Start a New Evaluation
                  </button>
                </>
              ) : null}
            </section>
            {vm.prop2?.isFunded ? (
              <>
                <section className="mw-card">
                  <div className="mw-card-h">
                    <div>
                      <h2>Payouts</h2>
                      <p>{vm.prop2?.nextPayout}</p>
                    </div>
                  </div>
                  <div className="pp-pay">
                    <div>
                      <span>Your 80%</span>
                      <b className="num up">{vm.prop2?.share}</b>
                    </div>
                    <div>
                      <span>Vault 20%</span>
                      <b className="num">{vm.prop2?.vaultShare}</b>
                    </div>
                  </div>
                  <div className="pp-cta">
                    <button
                      type="button"
                      className="ob-btn primary"
                      disabled={!!vm.prop2?.noPayout}
                      onClick={vm.prop2?.requestPayout}
                    >
                      Request Payout
                    </button>
                  </div>
                </section>
              </>
            ) : null}
            {vm.prop2?.isEval ? (
              <>
                <section className="mw-card">
                  <div className="mw-card-h">
                    <div>
                      <h2>How It Works</h2>
                    </div>
                  </div>
                  <div className="pp-steps vert">
                    <span className="pp-step is-on">
                      <i>1</i>Hit the target within the loss limits
                    </span>
                    <span className="pp-step">
                      <i>2</i>Trade the vault's capital
                    </span>
                    <span className="pp-step">
                      <i>3</i>Keep 80% of profits
                    </span>
                  </div>
                </section>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
