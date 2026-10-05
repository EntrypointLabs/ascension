import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function MarketDetails({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="m-section m-tabsec" aria-label="Market details">
      <div className="m-tabs" role="tablist" aria-label="Market details">
        {(vm.mtabs || []).map((mtab: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              role="tab"
              className={mtab?.cls}
              aria-selected={mtab?.pressed}
              onClick={mtab?.pick}
            >
              {mtab?.label}
            </button>
          </Fragment>
        ))}
      </div>
      {vm.mtBook ? (
        <>
          <div className="m-subhead m-subhead-book">
            <span className="vtag2">
              <img className="logo xxs" src={vm.V?.logo} data-venue="1" alt="" />
              {vm.V?.name}
            </span>
            <span className="bk-ctrl-r">
              <button
                type="button"
                className="ctrl-btn num"
                aria-label="Price grouping, tap to change"
                onClick={vm.cycleTick}
              >
                {vm.tickText}
              </button>
              <button
                type="button"
                className="ctrl-btn"
                aria-label="Size unit, tap to change"
                onClick={vm.toggleUnit}
              >
                {vm.unitLabel}
              </button>
            </span>
          </div>
          <div className="mbook-head">
            <div>
              <span>Size ({vm.unitLabel})</span>
              <span>Bid</span>
            </div>
            <div>
              <span>Ask</span>
              <span>Size ({vm.unitLabel})</span>
            </div>
          </div>
          {(vm.mbook || []).map((mbookItem: any, i: any) => (
            <Fragment key={i}>
              <div className="mbook-row num">
                <div className="mb-half bid">
                  <i style={parseStyle(`width: ${mbookItem?.bd ?? ""}%`)} />
                  <span>{mbookItem?.bs}</span>
                  <span className="up">{mbookItem?.bp}</span>
                </div>
                <div className="mb-half ask">
                  <i style={parseStyle(`width: ${mbookItem?.ad ?? ""}%`)} />
                  <span className="down">{mbookItem?.ap}</span>
                  <span>{mbookItem?.as}</span>
                </div>
              </div>
            </Fragment>
          ))}
        </>
      ) : null}
      {vm.mtStats ? (
        <>
          <div className="m-subhead">
            <span>
              {vm.bookVia}
              {vm.V?.name}
            </span>
          </div>
          <dl className="mstat-grid num">
            {(vm.stats || []).map((stat: any, i: any) => (
              <Fragment key={i}>
                <div>
                  <dt>{stat?.label}</dt>
                  <dd>{stat?.value}</dd>
                </div>
              </Fragment>
            ))}
          </dl>
        </>
      ) : null}
      {vm.mtInfo ? (
        <>
          <div className="mi-head">
            <img className="logo" src={vm.m?.logo} alt="" />
            <div>
              <b>{vm.info?.name}</b>
              <span className="mi-cat">{vm.info?.cat}</span>
            </div>
          </div>
          <p className="mi-about">{vm.info?.about}</p>
          <dl className="mstat-grid num mi-grid">
            {(vm.info?.rows || []).map((row: any, i: any) => (
              <Fragment key={i}>
                <div>
                  <dt>{row?.k}</dt>
                  <dd>{row?.v}</dd>
                </div>
              </Fragment>
            ))}
          </dl>
          <div className="mi-venues">
            <span>Listed on</span>
            <span className="mi-vlogos">
              {(vm.info?.venues || []).map((venue: any, i: any) => (
                <Fragment key={i}>
                  <img
                    className="logo xs"
                    src={venue?.logo}
                    data-venue="1"
                    alt={venue?.name}
                    title={venue?.name}
                  />
                </Fragment>
              ))}
            </span>
          </div>
          <div className="mi-links">
            {(vm.info?.links || []).map((link: any, i: any) => (
              <Fragment key={i}>
                <a className="mi-link" href={link?.href} onClick={link?.open}>
                  <span>
                    <b>{link?.label}</b>
                    <small>{link?.sub}</small>
                  </span>
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
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
      {vm.mtSocials ? (
        <>
          <div className="soc">
            <div className="soc-side">
              <section className="fg" aria-label={`Fear and greed for ${vm.m?.sym ?? ""}`}>
                <div className="fg-top">
                  <span>Fear & Greed, {vm.m?.sym}</span>
                  <small>Updated {vm.soc?.updated}</small>
                </div>
                <div className="fg-main">
                  <b className="num">{vm.soc?.fg?.score}</b>
                  <span className={vm.soc?.fg?.cls}>{vm.soc?.fg?.label}</span>
                </div>
                <div className="fg-meter" aria-hidden="true">
                  <i className="z1" />
                  <i className="z2" />
                  <i className="z3" />
                  <i className="z4" />
                  <i className="z5" />
                  <span className="fg-mark" style={parseStyle(`left: ${vm.soc?.fg?.pos ?? ""}%`)} />
                </div>
                <div className="fg-scale">
                  <span>Extreme fear</span>
                  <span>Neutral</span>
                  <span>Extreme greed</span>
                </div>
                <p className="fg-line num">
                  Yesterday {vm.soc?.fg?.yday}, last week {vm.soc?.fg?.week}
                </p>
                <div className="fg-comps">
                  {(vm.soc?.fg?.comps || []).map((comp: any, i: any) => (
                    <Fragment key={i}>
                      <div className="fg-comp">
                        <span>{comp?.k}</span>
                        <span className="fg-bar">
                          <i style={parseStyle(`width: ${comp?.v ?? ""}%`)} />
                        </span>
                        <b className="num">{comp?.v}</b>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </section>
              <section className="soc-pulse" aria-label="Social activity">
                <div>
                  <span>Mentions, 24h</span>
                  <b className="num">{vm.soc?.mentions}</b>
                  <small className={`${vm.soc?.mentionsCls ?? ""} num`}>
                    {vm.soc?.mentionsChg}
                  </small>
                </div>
                <div>
                  <span>Bullish posts</span>
                  <b className="num">{vm.soc?.bull}%</b>
                  <span className="soc-split">
                    <i style={parseStyle(`width: ${vm.soc?.bull ?? ""}%`)} />
                  </span>
                </div>
              </section>
            </div>
            <div className="soc-main">
              <div className="soc-tabs" role="tablist" aria-label="Socials">
                {(vm.soc?.tabs || []).map((tab: any, i: any) => (
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
              {vm.soc?.vPosts ? (
                <>
                  <div className="soc-list">
                    {(vm.soc?.posts || []).map((post: any, i: any) => (
                      <Fragment key={i}>
                        <button type="button" className="post" onClick={post?.open}>
                          <img className="post-av" src={post?.avatar} alt="" />
                          <span className="post-body">
                            <span className="post-meta">
                              <b>{post?.name}</b>
                              <span>{post?.handle}</span>
                              <span className="post-plat">{post?.platform}</span>
                              <span>{post?.ago}</span>
                            </span>
                            <span className="post-text">{post?.text}</span>
                            <span className="post-foot num">
                              <span className={post?.tagCls}>{post?.tag}</span>
                              <span className="pf-stat">
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
                                  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
                                </svg>
                                {post?.likes}
                              </span>
                              <span className="pf-stat">
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
                                  <path d="M4 5h16v11H9l-5 4z" />
                                </svg>
                                {post?.replies}
                              </span>
                            </span>
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {vm.soc?.vNews ? (
                <>
                  <div className="soc-list">
                    {(vm.soc?.news || []).map((item: any, i: any) => (
                      <Fragment key={i}>
                        <button type="button" className="news" onClick={item?.open}>
                          <span className="news-meta">
                            <span className="news-logos">
                              {(item?.logos || []).map((logo: any, i2: any) => (
                                <Fragment key={i2}>
                                  <img className="logo" src={logo} alt="" />
                                </Fragment>
                              ))}
                            </span>
                            <span>
                              {item?.date} · {item?.source}
                            </span>
                          </span>
                          <span className="news-title">{item?.title}</span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
