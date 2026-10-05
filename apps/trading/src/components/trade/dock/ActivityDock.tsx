import { Fragment } from "react";
import { BalancesTab } from "@/components/trade/dock/BalancesTab";
import { DockPager } from "@/components/trade/dock/DockPager";
import { FundingHistoryTab } from "@/components/trade/dock/FundingHistoryTab";
import { OrderHistoryTab } from "@/components/trade/dock/OrderHistoryTab";
import { OrdersTab } from "@/components/trade/dock/OrdersTab";
import { PositionsTab } from "@/components/trade/dock/PositionsTab";
import { SocialTab } from "@/components/trade/dock/SocialTab";
import { TradeHistoryTab } from "@/components/trade/dock/TradeHistoryTab";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function ActivityDock({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="dock" aria-label="Your activity">
      <div className="dock-head">
        <div className="tabs" role="tablist" aria-label="Your activity">
          {(vm.ptabs || []).map((ptab: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="tab"
                className={ptab?.cls}
                aria-selected={ptab?.pressed}
                onClick={ptab?.pick}
              >
                {ptab?.label}
                <span className="count">{ptab?.count}</span>
              </button>
            </Fragment>
          ))}
          <span className="tab-sep" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            className={vm.socTab?.cls}
            aria-selected={vm.socTab?.pressed as AriaBoolean}
            onClick={vm.socTab?.pick}
          >
            <span className="st-live" aria-hidden="true" />
            Socials<span className={vm.socTab?.fgCls}>{vm.socTab?.fg}</span>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-icon sm"
          aria-label={vm.dockToggleLabel}
          onClick={vm.toggleDock}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <path d={vm.dockChevron} />
          </svg>
        </button>
      </div>
      <div className="dock-body">
        {vm.tabSoc ? <SocialTab vm={vm} /> : null}
        {vm.tabPos ? <PositionsTab vm={vm} /> : null}
        {vm.tabOrd ? <OrdersTab vm={vm} /> : null}
        {vm.tabHist ? <TradeHistoryTab vm={vm} /> : null}
        {vm.tabBal ? <BalancesTab vm={vm} /> : null}
        {vm.tabFund ? <FundingHistoryTab vm={vm} /> : null}
        {vm.tabOhist ? <OrderHistoryTab vm={vm} /> : null}
        {vm.pager?.show ? <DockPager vm={vm} /> : null}
      </div>
    </section>
  );
}
