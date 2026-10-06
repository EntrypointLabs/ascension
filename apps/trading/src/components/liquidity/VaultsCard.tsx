import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import type { TerminalViewModel } from "@/terminal/types";

/** The five term vaults: filter by term, sort by column, and open a deposit. */
export function VaultsCard({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  const dd = liq.termDD;
  return (
    <section className="mw-card snap-card lq-card" data-snap="liquidity-vaults">
      <div className="lq-head">
        <h2 className="h-i">
          Liquidity Vaults
          <InfoTip tip="Your deposit unlocks on its deposit date plus the term, and earns the APR of the day you enter" />
        </h2>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>

      <div className="lq-bar">
        <div className="lq-dd">
          <button type="button" className={dd.cls} aria-expanded={dd.open} onClick={dd.toggle}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            <span>{dd.label}</span>
            {dd.count ? <em className="num">{dd.count}</em> : null}
          </button>
          {dd.open ? (
            <div
              className="lq-menu"
              role="listbox"
              aria-label={dd.label}
              aria-multiselectable="true"
            >
              <div className="lq-search">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for term"
                  aria-label="Search for term"
                  value={liq.search}
                  onChange={liq.onSearch}
                />
                <button type="button" className="lq-clear" onClick={dd.clear}>
                  Clear
                </button>
              </div>
              {dd.opts.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  role="option"
                  className={opt.cls}
                  aria-selected={opt.checked}
                  onClick={opt.pick}
                >
                  <i className="lq-check" aria-hidden="true" />
                  <span className="num">{opt.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {liq.hasFilters ? (
          <button type="button" className="lq-reset" onClick={liq.clearAll}>
            Clear filters
          </button>
        ) : null}
      </div>
      {dd.open ? (
        <button
          type="button"
          className="lq-scrim"
          aria-label="Close filter"
          onClick={liq.closeDD}
        />
      ) : null}

      <div className="lq-scroll">
        <div className="lq-table" role="table" aria-label="Liquidity vaults">
          <div className="lq-tr lq-th" role="row">
            <span role="columnheader">
              <span className="rk">#</span>Vault
            </span>
            <span role="columnheader" className="lq-c-asset">
              Asset
            </span>
            {liq.heads.map((head, i) => (
              <span key={i} role="columnheader" aria-sort={head.sortDir} className={"lq-c-" + i}>
                <button type="button" className={head.cls} onClick={head.pick}>
                  {head.label}
                  <i aria-hidden="true">{head.arrow}</i>
                </button>
              </span>
            ))}
            <span role="columnheader" className="lq-c-range">
              APR 30d Range (%)
            </span>
            <span role="columnheader" className="th-i">
              Unlock Date
              <InfoTip tip="The date your deposit unlocks if you deposit today" />
            </span>
            <span role="columnheader" className="th-i lq-c-exit">
              Early Exit (%)
              <InfoTip tip="Exiting before unlock costs a penalty that falls evenly from 10% to 0% by the unlock date" />
            </span>
            <span aria-hidden="true" />
          </div>
          {liq.rows.map((row, i) => (
            <div key={i} className="lq-row" role="row">
              <span className="lq-name" role="cell">
                <span className="rk num">{row.num}</span>
                <span className="lq-av">
                  <img className="logo" src={liq.usdc} alt="USDC" />
                </span>
                <span className="lq-nm">
                  <b>{row.vault}</b>
                </span>
              </span>
              <span className="lq-cell lq-asset lq-c-asset" role="cell" data-k="Asset">
                <b>
                  <img className="logo" src={liq.usdc} alt="" />
                  USDC
                </b>
              </span>
              <span className="lq-cell num lq-c-0" role="cell" data-k="Term (days)">
                <b>{row.term}</b>
              </span>
              <span className="lq-cell num lq-c-1" role="cell" data-k="Deposits (USDC)">
                <b>{row.deposits}</b>
              </span>
              <span className="lq-cell num lq-c-2" role="cell" data-k="Liquidity (USDC)">
                <b>{row.liq}</b>
              </span>
              <span className="lq-cell num lq-c-3" role="cell" data-k="Utilization (%)">
                <b>{row.util}</b>
                <span className="lq-ub" aria-hidden="true">
                  <i style={{ width: row.utilW + "%" }} />
                </span>
              </span>
              <span className="lq-cell lq-apr num lq-c-4" role="cell" data-k="APR Today (%)">
                <b>{row.apr}</b>
              </span>
              <span className="lq-cell num lq-c-range" role="cell" data-k="APR 30d Range (%)">
                <b>{row.range}</b>
              </span>
              <span className="lq-cell num" role="cell" data-k="Unlock Date">
                <b>{row.unlock}</b>
              </span>
              <span className="lq-cell num lq-c-exit" role="cell" data-k="Early Exit (%)">
                <b>10 to 0</b>
              </span>
              <span className="lq-act" role="cell">
                <button type="button" className="lq-btn" onClick={row.deposit}>
                  Deposit
                </button>
              </span>
            </div>
          ))}
          {liq.empty ? <p className="lq-empty">No vaults match these filters.</p> : null}
        </div>
      </div>
      <div className="pgx num">
        <span className="pgx-t">{liq.pagerText}</span>
      </div>
    </section>
  );
}
