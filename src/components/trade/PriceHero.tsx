import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function PriceHero({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="hero">
      <div>
        <div className="m-asset-row">
          <button
            type="button"
            className="m-asset"
            aria-haspopup="dialog"
            aria-label={`Switch market, now ${vm.m?.sym ?? ""}-PERP`}
            onClick={vm.openMarkets}
          >
            <img className="logo" src={vm.m?.logo} alt="" />
            <h1>{vm.m?.sym}-PERP</h1>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <span className="vtag2">
            <img className="logo xxs" src={vm.V?.logo} data-venue="1" alt="" />
            {vm.V?.name}
          </span>
        </div>
        <h2 className="num">
          <span className={vm.heroFlash}>${vm.heroPrice}</span>
        </h2>
        <p className={`num ${vm.heroDir ?? ""}`}>
          {vm.heroDelta} <span className="muted">{vm.heroLabel}</span>
        </p>
      </div>
      <dl className="stats">
        {(vm.stats || []).map((stat: any, i: any) => (
          <Fragment key={i}>
            <div className="stat">
              <dt>{stat?.label}</dt>
              <dd className="num">{stat?.value}</dd>
            </div>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}
