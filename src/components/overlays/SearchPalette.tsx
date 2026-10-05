import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function SearchPalette({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button
        type="button"
        className="srch-backdrop"
        aria-label="Close search"
        onClick={vm.srch?.close}
      />
      <div className="srch" role="dialog" aria-modal="true" aria-label="Search">
        <div className="srch-input">
          <svg
            width="16"
            height="16"
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
            value={vm.srch?.q ?? ""}
            onChange={vm.srch?.onQ}
            placeholder="Search markets, venues and positions"
            aria-label="Search"
            autoFocus={true}
          />
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label="Close search"
            onClick={vm.srch?.close}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="srch-tabs" role="tablist" aria-label="Search in">
          {(vm.srch?.tabs || []).map((tab: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="tab"
                className={tab?.cls}
                aria-selected={tab?.pressed}
                onClick={tab?.pick}
              >
                {tab?.label}
                <span className="num">{tab?.count}</span>
              </button>
            </Fragment>
          ))}
        </div>
        <div className="srch-body">
          {(vm.srch?.sections || []).map((section: any, i: any) => (
            <Fragment key={i}>
              <section className="srch-sec" aria-label={section?.title}>
                <div className="ss-head">
                  <b>{section?.title}</b>
                  <span>{section?.h1}</span>
                  <span>{section?.h2}</span>
                  <span>{section?.h3}</span>
                  <span>{section?.h4}</span>
                </div>
                {(section?.items || []).map((item: any, i2: any) => (
                  <Fragment key={i2}>
                    <button type="button" className={item?.cls} onClick={item?.open}>
                      <img className="logo" src={item?.logo} alt="" />
                      <span className="sr-id">
                        <b>
                          {item?.title}
                          {item != null && item.hasTag ? (
                            <>
                              <span className="lev">{item?.tag}</span>
                            </>
                          ) : null}
                        </b>
                        <small>{item?.sub}</small>
                      </span>
                      <span className="sr-c1 num">
                        <b>{item?.c1}</b>
                        <small className={item?.c1subCls}>{item?.c1sub}</small>
                      </span>
                      <span className="sr-c num">{item?.c2}</span>
                      <span className="sr-c num">{item?.c3}</span>
                      <span className={`sr-c num ${item?.c4Cls ?? ""}`}>{item?.c4}</span>
                    </button>
                  </Fragment>
                ))}
                {section != null && section.hasMore ? (
                  <>
                    <button type="button" className="ss-more" onClick={section?.more}>
                      {section?.moreText}
                    </button>
                  </>
                ) : null}
              </section>
            </Fragment>
          ))}
          {vm.srch?.empty ? (
            <>
              <div className="srch-empty">
                <b>No matches for "{vm.srch?.q}"</b>
                <span>Try a ticker like BTC, an index like US500, or a venue like OKX.</span>
              </div>
            </>
          ) : null}
        </div>
        <div className="srch-foot">
          <span>
            <kbd>Esc</kbd>Close
          </span>
          <span>
            <kbd>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="M9 10 4 15l5 5" />
                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              </svg>
            </kbd>
            Open
          </span>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>Move
          </span>
          <span className="sf-hint">Tip: type a venue name to see every market it lists</span>
        </div>
      </div>
    </>
  );
}
