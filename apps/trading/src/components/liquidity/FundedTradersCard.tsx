import { InfoTip } from "@/components/common/InfoTip";
import { Pager } from "@/components/common/Pager";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import type { TerminalViewModel } from "@/terminal/types";

/** Every account the vaults fund, sortable by size, PnL or days, with drawdown bars. */
export function FundedTradersCard({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <section className="mw-card snap-card lq-traders" data-snap="liquidity-traders">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            Funded Traders
            <InfoTip tip="Every account the vaults fund" />
          </h2>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="wfilter">
        <div className="mwc-seg" role="group" aria-label="Sort">
          {liq.traderSorts.map((sort, i) => (
            <button key={i} type="button" className={sort.cls} onClick={sort.pick}>
              {sort.label}
            </button>
          ))}
        </div>
      </div>
      <div className="lq-scroll">
        <div className="pv-table num" role="table" aria-label="Funded traders">
          <div className="pv-tr pv-th" role="row">
            <span role="columnheader">
              <span className="rk">#</span>Trader
            </span>
            <span role="columnheader">Account (USD)</span>
            <span role="columnheader">PnL (%)</span>
            <span role="columnheader" className="th-i">
              Drawdown Used (%)
              <InfoTip tip="How much of the 10% maximum loss the trader has used" />
            </span>
            <span role="columnheader">Days</span>
            <span role="columnheader">Status</span>
          </div>
          {liq.traders.map((trader, i) => (
            <div key={i} className={trader.rowCls} role="row">
              <span className="pv-name" role="cell">
                <span className="rk num">{trader.num}</span>
                <b>{trader.name}</b>
              </span>
              <span role="cell">{trader.size}</span>
              <span role="cell" className={trader.pnlCls}>
                {trader.pnl}
              </span>
              <span role="cell" className="pv-dd">
                <i className={trader.ddCls}>
                  <b style={{ width: trader.ddW + "%" }} />
                </i>
                <em>{trader.dd}</em>
              </span>
              <span role="cell">{trader.days}</span>
              <span role="cell" className={trader.stCls}>
                {trader.st}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Pager pager={liq.tradersPager} />
    </section>
  );
}
