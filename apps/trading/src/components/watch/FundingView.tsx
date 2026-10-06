import { Fragment } from "react";
import { Dropdown } from "@/components/common/Dropdown";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { FundingTableCard } from "@/components/watch/FundingTableCard";
import type { CarryItem } from "@/components/watch/types";
import type { TerminalViewModel } from "@/terminal/types";

export function FundingView({ vm }: { vm: TerminalViewModel }) {
  const carry: CarryItem[] = vm.mw?.carry || [];
  return (
    <>
      <section className="mw-card snap-card cy-card" data-snap="carry">
        <div className="mw-card-h">
          <div>
            <h2 className="h-i">
              Carry Opportunities
              <InfoTip tip="Go long where funding is cheapest and short where it is highest to collect the spread. The yearly estimate is on 10,000 USD." />
            </h2>
          </div>
          <div className="mw-card-a">
            <Dropdown dd={vm.mw?.dd?.cyCat} />
            <SnapshotButton onClick={vm.mw?.snap} />
          </div>
        </div>
        <div className="carry">
          {carry.map((carryItem, i) => (
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
