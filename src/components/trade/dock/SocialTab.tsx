import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function SocialTab({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="soc-wrap soc-dock">
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
                <small className={`${vm.soc?.mentionsCls ?? ""} num`}>{vm.soc?.mentionsChg}</small>
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
            <div className="soc-col">
              <h4>What people are saying</h4>
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
            </div>
            <div className="soc-col">
              <h4>News</h4>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
