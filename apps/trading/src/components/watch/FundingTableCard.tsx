import { Fragment } from "react";
import { Dropdown } from "@/components/common/Dropdown";
import { InfoTip } from "@/components/common/InfoTip";
import { Pager } from "@/components/common/Pager";
import { ScrollRegion } from "@/components/common/ScrollRegion";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { viewQueries, WatchEmpty, WatchSearch } from "@/components/watch/WatchSearch";
import type { FundingRow, VenueLogo } from "@/components/watch/types";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function FundingTableCard({ vm }: { vm: TerminalViewModel }) {
  const rows: FundingRow[] = vm.fmRowsP || [];
  const heads: VenueLogo[] = vm.fmHead || [];
  const search = viewQueries(vm);
  return (
    <section className="mw-card snap-card mw-tablecard" data-snap="funding-grid">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            Funding by Market and Venue
            <InfoTip tip="The funding rate for each market on each venue. Positive means longs pay shorts." />
          </h2>
          <p>{vm.mwTableSub?.funding}</p>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="mw-card-tools">
        <div className="fm-bar">
          <Dropdown dd={vm.mw?.dd?.funit} />
          <div className="fm-right">
            <span className="fm-key num">
              <span>
                <i className="k-pos" />
                Longs pay shorts
              </span>
              <span>
                <i className="k-neg" />
                Shorts pay longs
              </span>
            </span>
            <WatchSearch label="Search markets" value={search.fq} onChange={search.onFq} />
          </div>
        </div>
      </div>
      <div className="fm-cards" role="list" aria-label="Funding by market">
        {rows.map((fmRowsPItem, i) => (
          <Fragment key={i}>
            <div className="fmc" role="listitem">
              <div className="fmc-top">
                <span className="rk num">{fmRowsPItem?.num}</span>
                <img className="logo" src={fmRowsPItem?.logo} alt="" />
                <b>{fmRowsPItem?.sym}-PERP</b>
                <span className="fmc-spread num">
                  <small>Spread</small>
                  {fmRowsPItem?.spread}
                </span>
              </div>
              <div className="fmc-carry">
                <span>
                  Long on{" "}
                  <img className="logo xxs" src={fmRowsPItem?.longLogo} data-venue="1" alt="" />
                  {fmRowsPItem?.longName}
                </span>
                <span>
                  Short on{" "}
                  <img className="logo xxs" src={fmRowsPItem?.shortLogo} data-venue="1" alt="" />
                  {fmRowsPItem?.shortName}
                </span>
              </div>
              <div className="fmc-rates num">
                {(fmRowsPItem.cells || []).map((cell, i2) => (
                  <Fragment key={i2}>
                    <span className={cell?.mcls}>
                      <img className="logo" src={cell?.logo} data-venue="1" alt={cell?.vn} />
                      <span
                        className="fchip"
                        style={parseStyle(
                          `background: ${cell?.bg ?? ""}; color: ${cell?.fg ?? ""}`,
                        )}
                      >
                        {cell?.v}
                      </span>
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <ScrollRegion className="xscroll fm-wrap" label="Funding rates table">
        <div className="fm num" role="table" aria-label="Funding by market and exchange">
          <div className="fm-row fm-head" role="row">
            <div role="columnheader">
              <span className="rk">#</span>Market
            </div>
            {heads.map((fmHeadItem, i) => (
              <Fragment key={i}>
                <div role="columnheader">
                  <img className="logo xs" src={fmHeadItem?.logo} alt="" />
                  <span>{fmHeadItem?.name}</span>
                </div>
              </Fragment>
            ))}
            <div role="columnheader">Spread</div>
            <div role="columnheader">Best Carry</div>
          </div>
          {rows.map((fmRowsPItem, i) => (
            <Fragment key={i}>
              <div className="fm-row" role="row">
                <div role="cell">
                  <span className="xcell">
                    <span className="rk num">{fmRowsPItem?.num}</span>
                    <img className="logo xs" src={fmRowsPItem?.logo} alt="" />
                    <b>{fmRowsPItem?.sym}</b>
                  </span>
                </div>
                {(fmRowsPItem.cells || []).map((cell, i2) => (
                  <Fragment key={i2}>
                    <div role="cell">
                      <span
                        className="fchip"
                        style={parseStyle(
                          `background: ${cell?.bg ?? ""}; color: ${cell?.fg ?? ""}`,
                        )}
                      >
                        {cell?.v}
                      </span>
                    </div>
                  </Fragment>
                ))}
                <div role="cell">
                  <b>{fmRowsPItem?.spread}</b>
                </div>
                <div role="cell">
                  <span className="carry2">
                    <span>
                      Long{" "}
                      <img className="logo xxs" src={fmRowsPItem?.longLogo} data-venue="1" alt="" />
                      {fmRowsPItem?.longName}
                    </span>
                    <span>
                      Short{" "}
                      <img
                        className="logo xxs"
                        src={fmRowsPItem?.shortLogo}
                        data-venue="1"
                        alt=""
                      />
                      {fmRowsPItem?.shortName}
                    </span>
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </ScrollRegion>
      {rows.length === 0 ? (
        <WatchEmpty title="No markets match">Try a ticker like ETH, US500 or Gold.</WatchEmpty>
      ) : null}
      <Pager pager={vm.fmPager} scrollTarget=".mw-card" />
    </section>
  );
}
