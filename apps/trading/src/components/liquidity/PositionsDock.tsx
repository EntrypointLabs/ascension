import { IconPath } from "@/components/common/IconPath";
import { Pager } from "@/components/common/Pager";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import type { TerminalViewModel } from "@/terminal/types";

/** The depositor's own lots and activity, in a collapsible dock under the vault table. */
export function PositionsDock({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <section className={liq.dockCls} data-snap="liquidity-positions" aria-label="Your liquidity">
      <div className="dock-head">
        <div className="tabs" role="tablist" aria-label="Your liquidity">
          {liq.tabs.map((tab, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={tab.cls}
              aria-selected={tab.pressed === "true"}
              onClick={tab.pick}
            >
              {tab.label}
              <span className="count">{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="lq-dock-tools">
          <SnapshotButton onClick={vm.mw?.snap} />
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label={liq.dockLabel}
            aria-expanded={liq.dockOpen}
            onClick={liq.toggleDock}
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
              <path d={liq.dockChevron} />
            </svg>
          </button>
        </div>
      </div>
      {liq.dockOpen ? (
        <div className="lq-dock-body">
          {liq.isDeposits ? <DepositsTab vm={vm} /> : null}
          {liq.isActivity ? <ActivityTab vm={vm} /> : null}
        </div>
      ) : null}
    </section>
  );
}

function DepositsTab({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  return (
    <>
      <div className="wfilter">
        <div className="ttg lq-status" role="group" aria-label="Status">
          {liq.posF.map((filter, i) => (
            <button
              key={i}
              type="button"
              className={filter.cls}
              aria-pressed={filter.pressed === "true"}
              onClick={filter.pick}
            >
              <span className="ms-ic" aria-hidden="true">
                <IconPath d={filter.ic} />
              </span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
        <span className="lq-total num">
          In Vaults (USDC) <b>{liq.myValue}</b>
        </span>
      </div>
      {liq.hasLots ? (
        <>
          <div className="lq-ltable num" role="table" aria-label="Your deposits">
            <div className="lq-lr lq-th" role="row">
              <span role="columnheader">
                <span className="rk">#</span>Vault
              </span>
              <span role="columnheader">Deposited On</span>
              <span role="columnheader">Entry APR (%)</span>
              <span role="columnheader">Unlock Date</span>
              <span role="columnheader">Days Left</span>
              <span role="columnheader">Deposited (USDC)</span>
              <span role="columnheader">Value (USDC)</span>
              <span role="columnheader">Earned (USDC)</span>
              <span role="columnheader">Status</span>
              <span aria-hidden="true" />
            </div>
            {liq.lots.map((lot, i) => (
              <div key={i} className="lq-lr" role="row">
                <span className="lq-lname" role="cell">
                  <span className="rk num">{lot.num}</span>
                  <b>{lot.vault}</b>
                </span>
                <span role="cell" data-k="Deposited on">
                  {lot.on}
                </span>
                <span role="cell" data-k="Entry APR" className="lq-eapr">
                  {lot.apr}
                </span>
                <span role="cell" data-k="Unlocks">
                  {lot.unlock}
                </span>
                <span role="cell" data-k="Days left">
                  {lot.daysLeft}
                </span>
                <span role="cell" data-k="Deposited">
                  {lot.deposited}
                </span>
                <span role="cell" data-k="Value">
                  {lot.value}
                </span>
                <span role="cell" data-k="Earned" className="up">
                  {lot.earned}
                </span>
                <span role="cell" data-k="Status">
                  <span className={lot.statusCls}>{lot.status}</span>
                </span>
                <span className="lq-act" role="cell">
                  {lot.canWithdraw ? (
                    <button type="button" className="lq-btn" onClick={lot.withdraw}>
                      Withdraw
                    </button>
                  ) : null}
                  {lot.canExit ? (
                    <button type="button" className="lq-btn ghost" onClick={lot.exit}>
                      Exit Early
                    </button>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
          <Pager pager={liq.lotsPager} />
        </>
      ) : (
        <p className="lq-empty">No deposits yet. Pick a vault above to start earning.</p>
      )}
    </>
  );
}

function ActivityTab({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  if (!liq.hasLog) {
    return <p className="lq-empty">No activity yet.</p>;
  }
  return (
    <>
      <div className="lq-ltable num" role="table" aria-label="Your liquidity activity">
        <div className="lq-lr lq-ar lq-th" role="row">
          <span role="columnheader">
            <span className="rk">#</span>Vault
          </span>
          <span role="columnheader">Date</span>
          <span role="columnheader">Action</span>
          <span role="columnheader">Amount (USDC)</span>
          <span role="columnheader">Entry APR (%)</span>
          <span role="columnheader">Penalty (USDC)</span>
        </div>
        {liq.log.map((entry, i) => (
          <div key={i} className="lq-lr lq-ar" role="row">
            <span className="lq-lname" role="cell">
              <span className="rk num">{entry.num}</span>
              <b>{entry.vault}</b>
            </span>
            <span role="cell" data-k="Date">
              {entry.date}
            </span>
            <span role="cell" data-k="Action">
              <span className={entry.actCls}>{entry.act}</span>
            </span>
            <span role="cell" data-k="Amount">
              {entry.amt}
            </span>
            <span role="cell" data-k="Entry APR" className="lq-eapr">
              {entry.apr}
            </span>
            <span role="cell" data-k="Penalty">
              {entry.pen}
            </span>
          </div>
        ))}
      </div>
      <Pager pager={liq.logPager} />
    </>
  );
}
