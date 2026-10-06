import { Fragment } from "react";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { IconToggle } from "@/components/common/IconToggle";
import { Watermark } from "@/components/common/Watermark";
import type { WatchDetail } from "@/components/watch/types";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

/** Expanded market panel (`.md`); `actions` adds the watchlist and share buttons. */
export function MarketDetail({
  vm,
  actions = false,
}: {
  vm: TerminalViewModel;
  actions?: boolean;
}) {
  const wd: WatchDetail | undefined = vm.wd;
  const stats = (
    <dl className="md-stats num">
      {(wd?.stats || []).map((stat, i2) => (
        <Fragment key={i2}>
          <div>
            <dt>{stat?.label}</dt>
            <dd className={stat?.cls}>{stat?.value}</dd>
          </div>
        </Fragment>
      ))}
    </dl>
  );
  return (
    <div className="md">
      <div className="md-main">
        {actions ? (
          <div className="md-top">
            {stats}
            <div className="md-acts">
              <button
                type="button"
                className="btn btn-icon sm"
                aria-label={`Add ${wd?.sym ?? ""}-PERP to watchlist`}
                aria-pressed={wd?.favPressed}
                onClick={wd?.toggleFav}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={parseStyle(`fill: ${wd?.favFill ?? ""}; stroke: currentColor`)}
                >
                  <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-icon sm"
                aria-label={`Share ${wd?.sym ?? ""}-PERP`}
                onClick={wd?.share}
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
                  <path d="M12 15V3" />
                  <path d="m7 8 5-5 5 5" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          stats
        )}
        <div className="md-chart-head">
          <div className="md-ct">
            <span>{wd?.chart?.title}</span>
            <b className={`num ${wd?.chart?.valCls ?? ""}`}>{wd?.chart?.value}</b>
          </div>
          <IconToggle items={vm.wdmetrics} label="Chart" className="seg-sm" role="group" />
        </div>
        <div className="md-chart">
          <p className="sr">
            {wd?.chart?.title} chart for {wd?.sym}: latest {wd?.chart?.value}, high {wd?.chart?.hi},
            low {wd?.chart?.lo}.
          </p>
          <Watermark />
          {(wd?.chart?.lines || []).map((line, i2) => (
            <Fragment key={i2}>
              <svg
                className="lc-svg"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={line?.area} style={parseStyle(`fill: ${line?.fill ?? ""}`)} />
                <path
                  d={line?.d}
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={parseStyle(`fill: none; stroke: ${line?.c ?? ""}`)}
                />
              </svg>
            </Fragment>
          ))}
          <svg
            className="lc-svg"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={wd?.chart?.barsUp} style={{ fill: "var(--text)" }} />
            <path d={wd?.chart?.barsDown} style={{ fill: "#d7303a" }} />
            <path
              d={wd?.chart?.zero}
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--line-3)" }}
            />
          </svg>
          <span className="md-y top num">{wd?.chart?.hi}</span>
          <span className="md-y bot num">{wd?.chart?.lo}</span>
          <ChartTooltip tip={wd?.chart?.tip} head={[wd?.chart?.tip?.when]} />
          <div
            className="mwc-hit"
            onPointerMove={wd?.chart?.move}
            onPointerDown={wd?.chart?.move}
            onPointerLeave={wd?.chart?.leave}
          />
        </div>
        <div className="md-x num">
          {(wd?.chart?.x || []).map((xItem, i2) => (
            <Fragment key={i2}>
              <span>{xItem?.t}</span>
            </Fragment>
          ))}
        </div>
        <div className="md-legend num">
          {(wd?.chart?.legend || []).map((legendItem, i2) => (
            <Fragment key={i2}>
              <span>
                <i style={parseStyle(`background: ${legendItem?.c ?? ""}`)} />
                {legendItem?.label}
                <b>{legendItem?.value}</b>
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <aside className="md-side">
        <div className="md-side-head">
          <b>Exchanges</b>
          <span>By open interest</span>
        </div>
        <div className="md-ex-list">
          {(wd?.ex || []).map((exItem, i2) => (
            <Fragment key={i2}>
              <button
                type="button"
                className={exItem?.cls}
                aria-pressed={exItem?.selected}
                onClick={exItem?.pick}
              >
                <img className="logo sm" src={exItem?.logo} data-venue="1" alt="" />
                <span className="mx-name">
                  <b>{exItem?.name}</b>
                  <small>{exItem?.native}</small>
                </span>
                <span className="mx-num num">
                  <b>{exItem?.price}</b>
                  <small className={exItem?.fundCls}>{exItem?.fund} APR</small>
                </span>
                <span className="mx-share num">
                  <i>
                    <span style={parseStyle(`width: ${exItem?.share ?? ""}%`)} />
                  </i>
                  <small>{exItem?.shareText}</small>
                </span>
              </button>
            </Fragment>
          ))}
        </div>
        <div className="md-sel">
          <div className="md-sel-head">
            <span className="xcell">
              <img className="logo xs" src={wd?.sel?.logo} data-venue="1" alt="" />
              <b>{wd?.sel?.name}</b>
              <span className={wd?.sel?.dotCls} />
              <small className="num">{wd?.sel?.lat}</small>
            </span>
            <IconToggle items={vm.wdsel} label="Exchange detail" className="seg-sm" role="group" />
          </div>
          {wd?.selBook ? (
            <>
              <div className="vb-head">
                <div>
                  <span>Size</span>
                  <span>Bid</span>
                </div>
                <div>
                  <span>Ask</span>
                  <span>Size</span>
                </div>
              </div>
              {(wd?.sel?.book || []).map((bookItem, i2) => (
                <Fragment key={i2}>
                  <div className="vb-row num">
                    <div className="vb-half bid">
                      <i style={parseStyle(`width: ${bookItem?.bd ?? ""}%`)} />
                      <span>{bookItem?.bs}</span>
                      <span className="up">{bookItem?.bp}</span>
                    </div>
                    <div className="vb-half ask">
                      <i style={parseStyle(`width: ${bookItem?.ad ?? ""}%`)} />
                      <span className="down">{bookItem?.ap}</span>
                      <span>{bookItem?.as}</span>
                    </div>
                  </div>
                </Fragment>
              ))}
              <div className="md-sel-foot num">
                <span>Spread {wd?.sel?.spread}</span>
                <span>Basis {wd?.sel?.basis}</span>
              </div>
            </>
          ) : null}
          {wd?.selSpecs ? (
            <>
              <dl className="md-specs num">
                {(wd?.sel?.specs || []).map((spec, i2) => (
                  <Fragment key={i2}>
                    <div>
                      <dt>{spec?.k}</dt>
                      <dd>{spec?.v}</dd>
                    </div>
                  </Fragment>
                ))}
              </dl>
            </>
          ) : null}
          <button type="button" className="btn btn-primary md-trade" onClick={wd?.sel?.trade}>
            Trade {wd?.sym} on {wd?.sel?.name}
          </button>
        </div>
      </aside>
    </div>
  );
}
