import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function InAppBrowser({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button type="button" className="iab-scrim" aria-label="Close" onClick={vm.iab?.close} />
      <div className="iab sf" role="dialog" aria-label={vm.iab?.siteName}>
        <div className="sf-top">
          <button type="button" className="sf-done" onClick={vm.iab?.close}>
            Done
          </button>
          <div className="sf-nav-d">
            <button
              type="button"
              className="sf-ic"
              aria-label="Back"
              disabled={!!vm.iab?.backDis}
              onClick={vm.iab?.back}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="sf-ic"
              aria-label="Forward"
              disabled={!!vm.iab?.fwdDis}
              onClick={vm.iab?.fwd}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <div className="sf-field">
            <button
              type="button"
              className="sf-aa"
              aria-label="Text size"
              onClick={vm.iab?.cycleText}
            >
              <span>A</span>A
            </button>
            <span className="sf-url">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <rect x="5" y="11" width="14" height="10" rx="1" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <span>{vm.iab?.domain}</span>
            </span>
            <button type="button" className="sf-ic sm" aria-label="Reload" onClick={vm.iab?.reload}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="M20 11a8 8 0 1 0-2.3 5.7" />
                <path d="M20 4v7h-7" />
              </svg>
            </button>
          </div>
          <div className="sf-acts-d">
            <button type="button" className="sf-ic" aria-label="Share" onClick={vm.iab?.share}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
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
            <button type="button" className="sf-ic" aria-label="Copy link" onClick={vm.iab?.copy}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <rect x="9" y="9" width="12" height="12" rx="1" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            </button>
          </div>
        </div>
        <div className={vm.iab?.progCls} aria-hidden="true">
          <i />
        </div>
        <div className="iab-body">
          {vm.iab?.isReader ? (
            <>
              <article className={vm.iab?.rdCls}>
                <div className="rd-src">
                  <span className="rd-src-ic">{vm.iab?.srcIni}</span>
                  <span>
                    <b>{vm.iab?.siteName}</b>
                    <small>
                      {vm.iab?.date} · {vm.iab?.readTime}
                    </small>
                  </span>
                </div>
                <h1>{vm.iab?.title}</h1>
                <p className="rd-lede">{vm.iab?.lede}</p>
                {(vm.iab?.paras || []).map((para: any, i: any) => (
                  <Fragment key={i}>
                    <p>{para}</p>
                  </Fragment>
                ))}
                <div className="rd-assets">
                  <span>In this story</span>
                  {(vm.iab?.assets || []).map((asset: any, i: any) => (
                    <Fragment key={i}>
                      <div className="rd-asset">
                        <img className="logo" src={asset?.logo} alt="" />
                        <span>
                          <b>{asset?.sym}-PERP</b>
                          <small className="num">
                            ${asset?.price} <span className={asset?.dir}>{asset?.chg}</span>
                          </small>
                        </span>
                        <button type="button" className="btn btn-primary" onClick={asset?.trade}>
                          Trade
                        </button>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <button type="button" className="rd-visit" onClick={vm.iab?.visit}>
                  Visit {vm.iab?.siteName}
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </article>
            </>
          ) : null}
          {vm.iab?.isPost ? (
            <>
              <article className={vm.iab?.rdCls}>
                <div className="rd-post">
                  <img className="post-av" src={vm.iab?.avatar} alt="" />
                  <span>
                    <b>{vm.iab?.name}</b>
                    <small>
                      {vm.iab?.handle} · {vm.iab?.platform} · {vm.iab?.date}
                    </small>
                  </span>
                </div>
                <p className="rd-posttext">{vm.iab?.text}</p>
                <div className="post-foot num">
                  <span className={vm.iab?.tagCls}>{vm.iab?.tag}</span>
                  <span>{vm.iab?.likes} likes</span>
                  <span>{vm.iab?.replies} replies</span>
                </div>
                <h3 className="rd-h3">Replies</h3>
                {(vm.iab?.thread || []).map((threadItem: any, i: any) => (
                  <Fragment key={i}>
                    <div className="rd-reply">
                      <img className="post-av sm" src={threadItem?.avatar} alt="" />
                      <span>
                        <b>{threadItem?.handle}</b>
                        <small>{threadItem?.ago}</small>
                        <span>{threadItem?.text}</span>
                      </span>
                    </div>
                  </Fragment>
                ))}
                <div className="rd-assets">
                  {(vm.iab?.assets || []).map((asset: any, i: any) => (
                    <Fragment key={i}>
                      <div className="rd-asset">
                        <img className="logo" src={asset?.logo} alt="" />
                        <span>
                          <b>{asset?.sym}-PERP</b>
                          <small className="num">
                            ${asset?.price} <span className={asset?.dir}>{asset?.chg}</span>
                          </small>
                        </span>
                        <button type="button" className="btn btn-primary" onClick={asset?.trade}>
                          Trade
                        </button>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </article>
            </>
          ) : null}
          {vm.iab?.isWeb ? (
            <>
              {vm.iab?.canLoad ? (
                <>
                  <iframe
                    className="iab-frame"
                    src={vm.iab?.frameSrc}
                    title={vm.iab?.siteName}
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-popups allow-forms"
                  />
                </>
              ) : null}
              {vm.iab?.noLoad ? (
                <>
                  <div className="iab-off">
                    <span className="iab-off-ic">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ fill: "none", stroke: "currentColor" }}
                      >
                        <rect x="5" y="11" width="14" height="10" rx="1" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                    </span>
                    <b>{vm.iab?.domain}</b>
                    <p>
                      Pages open right here through the OpenFutures browser in the live app. This
                      preview runs in a sandbox that can't reach other websites, so the page can't
                      be shown here.
                    </p>
                    <button type="button" className="hm-act" onClick={vm.iab?.copy}>
                      Copy link
                    </button>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="sf-bottom">
          <button
            type="button"
            className="sf-ic"
            aria-label="Back"
            disabled={!!vm.iab?.backDis}
            onClick={vm.iab?.back}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="sf-ic"
            aria-label="Forward"
            disabled={!!vm.iab?.fwdDis}
            onClick={vm.iab?.fwd}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button type="button" className="sf-ic" aria-label="Share" onClick={vm.iab?.share}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
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
          <button type="button" className="sf-ic" aria-label="Copy link" onClick={vm.iab?.copy}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <rect x="9" y="9" width="12" height="12" rx="1" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
