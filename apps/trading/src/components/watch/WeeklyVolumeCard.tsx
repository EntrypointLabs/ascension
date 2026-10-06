import { Fragment } from "react";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { Dropdown } from "@/components/common/Dropdown";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { Watermark } from "@/components/common/Watermark";
import type { Weekly } from "@/components/watch/types";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function WeeklyVolumeCard({ vm }: { vm: TerminalViewModel }) {
  const weekly: Weekly | undefined = vm.mw?.weekly;
  return (
    <section className="mw-card snap-card wk" data-snap="weekly-volume">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            Weekly Notional Volume by Venue (USD)
            <InfoTip tip="Total value traded each week, stacked by venue. Hover a week for the split." />
          </h2>
          <p>{weekly?.sub}</p>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="wk-body">
        <div className="wk-total num">
          <b>{weekly?.total}</b>
          <span>total in period</span>
        </div>
        <div className="wk-chart">
          <div className="pf-y num" aria-hidden="true">
            {(weekly?.yTicks || []).map((yTick, i) => (
              <Fragment key={i}>
                <span style={parseStyle(`top: ${yTick?.y ?? ""}%`)}>{yTick?.label}</span>
              </Fragment>
            ))}
          </div>
          <div className="pf-area">
            <p className="sr">
              Stacked bar chart of weekly notional volume by venue, {weekly?.sub}. {weekly?.total}{" "}
              total in period. Venues: {(weekly?.legend || []).map((item) => item.name).join(", ")}.
            </p>
            <Watermark />
            <div className="mwc-gridy" aria-hidden="true">
              {(weekly?.yTicks || []).map((yTick, i) => (
                <Fragment key={i}>
                  <i style={parseStyle(`top: ${yTick?.y ?? ""}%`)} />
                </Fragment>
              ))}
            </div>
            <svg
              className="mwc-svg"
              viewBox="0 0 1000 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {(weekly?.paths || []).map((path, i) => (
                <Fragment key={i}>
                  <path d={path?.d} style={parseStyle(`fill: ${path?.color ?? ""}`)} />
                </Fragment>
              ))}
            </svg>
            <ChartTooltip tip={weekly?.tip} head={[weekly?.tip?.date, weekly?.tip?.total]} />
            <div
              className="mwc-hit"
              onPointerMove={weekly?.move}
              onPointerDown={weekly?.move}
              onPointerLeave={weekly?.leave}
            />
          </div>
          <div className="pf-x num" aria-hidden="true">
            {(weekly?.xTicks || []).map((xTick, i) => (
              <Fragment key={i}>
                <span className={xTick?.cls} style={parseStyle(`left: ${xTick?.x ?? ""}%`)}>
                  {xTick?.label}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="wk-legend">
          {(weekly?.legend || []).map((legendItem, i) => (
            <Fragment key={i}>
              <span>
                <i style={parseStyle(`background: ${legendItem?.color ?? ""}`)} />
                {legendItem?.name}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="wk-filters">
        <Dropdown dd={vm.mw?.dd?.wkPeriod} />
        <Dropdown dd={vm.mw?.dd?.wkVenue} />
        <Dropdown dd={vm.mw?.dd?.wkCat} />
        {weekly?.canReset ? (
          <>
            <button type="button" className="wk-reset" onClick={weekly?.reset}>
              Reset filters
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}
