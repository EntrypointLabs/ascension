import { InfoTip } from "@/components/common/InfoTip";
import { Pager } from "@/components/common/Pager";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import type { League } from "@/components/watch/types";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function ExchangeShareCard({ vm }: { vm: TerminalViewModel }) {
  const league: League | undefined = vm.mw?.league;
  return (
    <section className="mw-card snap-card lg" data-snap="league-table">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            League Table
            <InfoTip tip="Venues, markets or asset classes ranked by open interest" />
          </h2>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="lg-tabs" role="tablist" aria-label="League">
        {(league?.tabs || []).map((tab, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className={tab.cls}
            aria-selected={tab.pressed}
            onClick={tab.pick}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="lg-table num" role="table" aria-label="League table">
        <div className="lg-tr lg-th" role="row">
          <span role="columnheader">#</span>
          <span role="columnheader">Name</span>
          {(league?.heads || []).map((head, i) => {
            const sorted = /\bis-on\b/.test(head.cls || "");
            const sortable = !/\bno-sort\b/.test(head.cls || "");
            return (
              <div
                key={i}
                className="lg-hc"
                role="columnheader"
                aria-sort={sortable ? (sorted ? "descending" : "none") : undefined}
              >
                {sortable ? (
                  <button type="button" className={head.cls} onClick={head.pick}>
                    {head.label}
                  </button>
                ) : (
                  <span className={head.cls}>{head.label}</span>
                )}
              </div>
            );
          })}
        </div>
        {(league?.rows || []).map((row, i) => (
          <div key={i} className="lg-tr" role="row">
            <span className="lg-rk" role="cell">
              {row.rank}
            </span>
            <span className="lg-nm" role="cell">
              {row.hasLogo ? (
                <img className="logo" src={row.logo} data-venue={row.venue} alt="" />
              ) : null}
              {row.hasDot ? <i style={parseStyle(`background: ${row.dot ?? ""}`)} /> : null}
              <button type="button" className="lg-open" onClick={row.open}>
                <b>{row.name}</b>
              </button>
            </span>
            <span role="cell">{row.count}</span>
            <span role="cell">{row.oi}</span>
            <span role="cell">{row.vol}</span>
            <span role="cell" className={row.d30Cls}>
              {row.d30}
            </span>
            <span className="lg-sh" role="cell">
              <em>{row.share}</em>
              <i>
                <b style={parseStyle(`width: ${row.shareW ?? ""}%`)} />
              </i>
            </span>
          </div>
        ))}
      </div>
      <Pager pager={league?.pager} scrollTarget=".mw-card" />
    </section>
  );
}
