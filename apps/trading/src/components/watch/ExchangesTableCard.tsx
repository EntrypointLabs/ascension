import { Fragment } from "react";
import { Dropdown } from "@/components/common/Dropdown";
import { InfoTip } from "@/components/common/InfoTip";
import { Pager } from "@/components/common/Pager";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { WatchEmpty, WatchSearch } from "@/components/watch/WatchSearch";
import type { ExchangeRow } from "@/components/watch/types";
import type { TerminalViewModel } from "@/terminal/types";

export function ExchangesTableCard({ vm }: { vm: TerminalViewModel }) {
  const rows: ExchangeRow[] = vm.exListP || [];
  return (
    <section className="mw-card snap-card mw-tablecard" data-snap="venues-table">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            All Venues
            <InfoTip tip="Every connected venue with volume, open interest, its top markets and feed health" />
          </h2>
          <p>{vm.mwTableSub?.venues}</p>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="mw-card-tools">
        <div className="wfilter">
          <Dropdown dd={vm.mw?.dd?.xtype} />
          <WatchSearch label="Search exchanges" value={vm.xq} onChange={vm.onXq} />
        </div>
      </div>
      <div className="wt wt-ex num" role="table" aria-label="Exchanges">
        <div className="wt-row wt-head" role="row">
          <div role="columnheader">
            <span className="rk">#</span>Exchange
          </div>
          <div role="columnheader">Chain</div>
          <div role="columnheader">Markets</div>
          <div role="columnheader">24h Volume (USD)</div>
          <div role="columnheader">Open Interest (USD)</div>
          <div role="columnheader">Top by Volume</div>
          <div role="columnheader">Top by OI</div>
          <div role="columnheader">Funding Range, APR (%)</div>
          <div role="columnheader">Feed</div>
          <div role="columnheader">Updated</div>
        </div>
        {rows.map((exListPItem, i) => (
          <Fragment key={i}>
            <div className="wt-group" role="rowgroup">
              <div className="wt-row" role="row">
                <div role="cell">
                  <span className="xc-name">
                    <span className="rk num">{exListPItem?.num}</span>
                    <img className="logo sm" src={exListPItem?.logo} data-venue="1" alt="" />
                    <span className="wname">
                      <b>
                        {exListPItem?.name}
                        <span className="lev xtype">{exListPItem?.type}</span>
                      </b>
                      <small className="mono">{exListPItem?.url}</small>
                    </span>
                  </span>
                </div>
                <div role="cell">{exListPItem?.chain}</div>
                <div role="cell">{exListPItem?.markets}</div>
                <div role="cell">{exListPItem?.volN}</div>
                <div role="cell">{exListPItem?.oiN}</div>
                <div role="cell">
                  <span className="xcell r">
                    <img className="logo xxs" src={exListPItem?.topVolLogo} alt="" />
                    {exListPItem?.topVol}
                  </span>
                </div>
                <div role="cell">
                  <span className="xcell r">
                    <img className="logo xxs" src={exListPItem?.topOiLogo} alt="" />
                    {exListPItem?.topOi}
                  </span>
                </div>
                <div role="cell">
                  <span className="down">{exListPItem?.fMinN}</span> to {exListPItem?.fMaxN}
                </div>
                <div role="cell">
                  <span className="feedc r">
                    <span className={exListPItem?.dotCls} />
                    {exListPItem?.status},{" "}
                    <span className={exListPItem?.latCls}>{exListPItem?.lat}</span>
                  </span>
                </div>
                <div role="cell" className="muted">
                  {exListPItem?.updated}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="wlist">
        {rows.map((exListPItem, i) => (
          <Fragment key={i}>
            <div className="wrow-m xrow-m">
              <img className="logo" src={exListPItem?.logo} data-venue="1" alt="" />
              <span className="wname">
                <b>
                  {exListPItem?.name}
                  <span className="lev xtype">{exListPItem?.type}</span>
                </b>
                <small className="num">
                  {exListPItem?.chain}, {exListPItem?.markets} markets
                </small>
              </span>
              <span className="mk-price num">
                <span>{exListPItem?.vol}</span>
                <small className="feedc">
                  <span className={exListPItem?.dotCls} />
                  {exListPItem?.lat}
                </small>
              </span>
            </div>
          </Fragment>
        ))}
      </div>
      {vm.noEx ? (
        <WatchEmpty title="No exchanges match">Try Binance, DEX or Arbitrum.</WatchEmpty>
      ) : null}
      <Pager pager={vm.exPager} scrollTarget=".mw-card" />
    </section>
  );
}
