import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function BalancesTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="dt dt-bal num" role="table" aria-label="Balances">
        <div className="dt-row dt-head" role="row">
          <div role="columnheader">Account</div>
          <div role="columnheader">Asset</div>
          <div role="columnheader">Equity</div>
          <div role="columnheader">Available</div>
          <div role="columnheader">In Margin</div>
          <div role="columnheader">Unrealized PnL</div>
        </div>
        {(vm.balances || []).map((balance: any, i: any) => (
          <Fragment key={i}>
            <div className="dt-row" role="row">
              <div role="cell">
                <b>{balance?.name}</b>
              </div>
              <div role="cell">USDC</div>
              <div role="cell">{balance?.equity}</div>
              <div role="cell">{balance?.free}</div>
              <div role="cell">{balance?.used}</div>
              <div role="cell" className={balance?.upnlCls}>
                {balance?.upnl}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
