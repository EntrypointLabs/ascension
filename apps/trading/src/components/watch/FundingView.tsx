import { Fragment } from "react";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { FundingTableCard } from "@/components/watch/FundingTableCard";
import type { TerminalViewModel } from "@/terminal/types";

export function FundingView({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <section className="mw-card snap-card" data-snap="carry">
        <div className="mw-card-h">
          <div>
            <h2 className="h-i">
              Carry Opportunities
              <InfoTip tip="Go long where funding is cheapest and short where it is highest to collect the spread. The yearly estimate is on 10,000 USD." />
            </h2>
          </div>
          <div className="mw-card-a">
            <div className="dd">
              <button
                type="button"
                className={vm.mw?.dd?.cyCat?.btnCls}
                aria-haspopup="listbox"
                aria-expanded={vm.mw?.dd?.cyCat?.openStr}
                onClick={vm.mw?.dd?.cyCat?.toggle}
              >
                <span className="dd-l">{vm.mw?.dd?.cyCat?.label}</span>
                <b>{vm.mw?.dd?.cyCat?.cur}</b>
                <svg
                  className="dd-chev"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {vm.mw?.dd?.cyCat?.open ? (
                <>
                  <button
                    type="button"
                    className="dd-scrim"
                    aria-label="Close"
                    onClick={vm.mw?.dd?.cyCat?.close}
                  />
                  <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.cyCat?.label}>
                    {(vm.mw?.dd?.cyCat?.opts || []).map((opt: any, i: any) => (
                      <Fragment key={i}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={opt?.sel}
                          className={opt?.cls}
                          onClick={opt?.pick}
                        >
                          {opt != null && opt.hasLogo ? (
                            <>
                              <img className="logo" src={opt?.logo} data-venue="1" alt="" />
                            </>
                          ) : null}
                          <span>{opt?.label}</span>
                          <em className="num">{opt?.count}</em>
                          <svg
                            className="dd-tick"
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
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <SnapshotButton onClick={vm.mw?.snap} />
          </div>
        </div>
        <div className="carry">
          {(vm.mw?.carry || []).map((carryItem: any, i: any) => (
            <Fragment key={i}>
              <button type="button" className="cy" onClick={carryItem?.trade}>
                <span className="cy-m">
                  <img className="logo" src={carryItem?.logo} alt="" />
                  <b>{carryItem?.sym}-PERP</b>
                </span>
                <span className="cy-leg">
                  <span className="cy-l">
                    <small>Long</small>
                    <img className="logo" src={carryItem?.longLogo} data-venue="1" alt="" />
                    {carryItem?.longName}
                    <em className="num">{carryItem?.longRate}</em>
                  </span>
                  <span className="cy-s">
                    <small>Short</small>
                    <img className="logo" src={carryItem?.shortLogo} data-venue="1" alt="" />
                    {carryItem?.shortName}
                    <em className="num">{carryItem?.shortRate}</em>
                  </span>
                </span>
                <span className="cy-r num">
                  <b>{carryItem?.apr}</b>
                  <small>{carryItem?.est} a year on $10K</small>
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </section>
      <FundingTableCard vm={vm} />
    </>
  );
}
