import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function ShareSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button type="button" className="sh-scrim" aria-label="Close share" onClick={vm.sh?.close} />
      <div className="sh-dialog" role="dialog" aria-label={`Share ${vm.sh?.kindLabel ?? ""}`}>
        <span className="hm-grab" aria-hidden="true" />
        <div className="sh-headbar">
          <h2>Share {vm.sh?.kindLabel}</h2>
          <button type="button" className="fd-hbtn fd-x" aria-label="Close" onClick={vm.sh?.close}>
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
        <div className="sh-body">
          <div className="sh-stage">
            <div className={vm.sh?.themeCls} id="share-card">
              <div className="shc-grain" aria-hidden="true" />
              <div className="shc-head">
                <span className="shc-av">
                  {vm.sh?.hasPic ? (
                    <>
                      <img src={vm.sh?.avatar} alt="" />
                    </>
                  ) : null}
                  {vm.sh?.noPic ? (
                    <>
                      <b>{vm.sh?.initials}</b>
                    </>
                  ) : null}
                </span>
                <b className="shc-user">{vm.sh?.user}</b>
              </div>
              <div className="shc-mkt">
                <img className="logo" src={vm.sh?.logo} alt="" />
                <b>{vm.sh?.title}</b>
                <span className={vm.sh?.tagCls}>{vm.sh?.tag}</span>
              </div>
              <div className="shc-big">
                <b className={`${vm.sh?.bigCls ?? ""} num`}>{vm.sh?.big}</b>
                {vm.sh?.hasSub ? (
                  <>
                    <span className={`${vm.sh?.subCls ?? ""} num`}>{vm.sh?.sub}</span>
                  </>
                ) : null}
              </div>
              <p className="shc-line2 num">{vm.sh?.detail}</p>
              {vm.sh?.hasNote ? (
                <>
                  <p className="shc-note">{vm.sh?.note}</p>
                </>
              ) : null}
              <div className="shc-tear" aria-hidden="true">
                <i />
                <span />
                <i />
              </div>
              <div className="shc-foot">
                <span className="shc-brand">
                  <svg width="18" height="18" viewBox="-6 -6 112 112" aria-hidden="true">
                    <path
                      className="shc-mk"
                      fillRule="evenodd"
                      d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
                    />
                  </svg>
                  <b>OpenFutures</b>
                </span>
                <span className="shc-code">
                  <small>Trade with code</small>
                  <b>{vm.sh?.code}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="sh-ctrl">
            <span className="sh-lbl">Card style</span>
            <div className="sh-themes" role="group" aria-label="Card style">
              {(vm.sh?.themes || []).map((theme: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    className={theme?.cls}
                    aria-pressed={theme?.pressed}
                    onClick={theme?.pick}
                  >
                    <i className={theme?.sw} />
                    {theme?.label}
                  </button>
                </Fragment>
              ))}
            </div>
            {vm.sh?.showUsdCtl ? (
              <>
                <span className="sh-lbl">Show</span>
              </>
            ) : null}
            {vm.sh?.showUsdCtl ? (
              <>
                <div className="sh-toggles">
                  <button
                    type="button"
                    className={vm.sh?.usdCls}
                    aria-pressed={vm.sh?.usdPressed}
                    onClick={vm.sh?.toggleUsd}
                  >
                    <span className="sw" />
                    Dollar amounts
                  </button>
                </div>
              </>
            ) : null}
            <label className="sh-lbl" htmlFor="sh-note">
              Caption <span className="num">{vm.sh?.noteCount}</span>
            </label>
            <textarea
              id="sh-note"
              className="sh-note"
              rows={2}
              maxLength={90}
              placeholder="One line on why (optional)"
              value={vm.sh?.note ?? ""}
              onChange={vm.sh?.onNote}
            />
            <span className="sh-lbl">Profile photo</span>
            <div className="sh-photo">
              <label className="sh-upload">
                <input type="file" accept="image/*" onChange={vm.sh?.onPhoto} />
                Upload photo
              </label>
              {vm.sh?.hasCustomPic ? (
                <>
                  <button type="button" className="sh-linkbtn" onClick={vm.sh?.removePhoto}>
                    Use default
                  </button>
                </>
              ) : null}
            </div>
            <div className="sh-actions">
              <button type="button" className="sh-primary" onClick={vm.sh?.download}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                {vm.sh?.dlLabel}
              </button>
              <button type="button" className="sh-secondary" onClick={vm.sh?.copy}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                {vm.sh?.copyLabel}
              </button>
              <button type="button" className="sh-secondary" onClick={vm.sh?.postX}>
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    style={{ fill: "currentColor" }}
                    d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43z"
                  />
                </svg>
                Post
              </button>
            </div>
            {vm.sh?.hasMsg ? (
              <>
                <p className="sh-msg" role="status">
                  {vm.sh?.msg}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
