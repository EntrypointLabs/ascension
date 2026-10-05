import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function MarketHeader({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="mkt-head">
      <button
        type="button"
        className="asset-btn"
        aria-haspopup="dialog"
        aria-expanded={vm.drawerOpen as AriaBoolean}
        onClick={vm.openDrawer}
      >
        <img className="logo sm" src={vm.m?.logo} alt="" />
        <span className="ab-name">{vm.m?.sym}-PERP</span>
        <svg
          width="16"
          height="16"
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
      <span className="mdiv" aria-hidden="true" />
      <dl className="mstats num">
        {(vm.hstats || []).map((hstat: any, i: any) => (
          <Fragment key={i}>
            <div className="mstat">
              <dt>{hstat?.label}</dt>
              <dd className={hstat?.cls}>{hstat?.value}</dd>
            </div>
          </Fragment>
        ))}
      </dl>
      <button
        type="button"
        className="btn btn-icon sm fav"
        aria-label="Add to watchlist"
        aria-pressed={vm.favPressed as AriaBoolean}
        onClick={vm.toggleFav}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
          style={parseStyle(`fill: ${vm.favFill ?? ""}; stroke: currentColor`)}
        >
          <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9Z" />
        </svg>
      </button>
      <button
        type="button"
        className="btn btn-icon sm fav share-asset"
        aria-label={`Share ${vm.m?.sym ?? ""}-PERP`}
        onClick={vm.shareAsset}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
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
    </div>
  );
}
