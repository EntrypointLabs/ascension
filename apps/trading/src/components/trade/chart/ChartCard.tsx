import { Fragment } from "react";
import { ChartToolbar } from "@/components/trade/chart/ChartToolbar";
import { DepthChart } from "@/components/trade/chart/DepthChart";
import { FundingChart } from "@/components/trade/chart/FundingChart";
import { PriceChart } from "@/components/trade/chart/PriceChart";
import type { TerminalViewModel } from "@/terminal/types";

export function ChartCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="chart-card">
      <div className="fs-head">
        <img className="logo" src={vm.m?.logo} alt="" />
        <b>{vm.m?.sym}-PERP</b>
        <span className="num fs-px">${vm.heroPrice}</span>
        <span className={`num ${vm.heroDir ?? ""}`}>{vm.heroDelta}</span>
        <span className="fs-venue">
          <img className="logo xxs" src={vm.V?.logo} data-venue="1" alt="" />
          {vm.V?.name}
        </span>
        <button
          type="button"
          className="fs-close"
          aria-label="Exit full screen"
          onClick={vm.exitFs}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className="cv-tabs ch-tabs" role="tablist" aria-label="Chart">
        {(vm.cvTabs || []).map((cvTab: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              role="tab"
              className={cvTab?.cls}
              aria-selected={cvTab?.pressed}
              onClick={cvTab?.pick}
            >
              {cvTab?.label}
            </button>
          </Fragment>
        ))}
      </div>
      <ChartToolbar vm={vm} />
      {vm.cvPrice ? <PriceChart vm={vm} /> : null}
      {vm.cvDepth ? <DepthChart vm={vm} /> : null}
      {vm.cvFunding ? <FundingChart vm={vm} /> : null}
    </div>
  );
}
