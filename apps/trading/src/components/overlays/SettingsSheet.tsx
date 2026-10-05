import { Fragment } from "react";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function SettingsSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button
        type="button"
        className="fd-scrim"
        aria-label="Close settings"
        onClick={vm.st?.close}
      />
      <div className="fd-sheet st-sheet" role="dialog" aria-label="Settings">
        <span className="hm-grab" aria-hidden="true" />
        <div className="fd-head">
          <h2>Settings</h2>
          <button type="button" className="fd-hbtn fd-x" aria-label="Close" onClick={vm.st?.close}>
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
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <p className="ob-lbl">Order routing</p>
        <button
          type="button"
          className={vm.ob?.routeCls}
          role="switch"
          aria-checked={vm.ob?.routeStr as AriaBoolean}
          onClick={vm.ob?.toggleRoute}
        >
          <span>
            <b>Smart routing</b>
            <small>{vm.ob?.routeSub}</small>
          </span>
          <span className="ob-sw" aria-hidden="true">
            <i />
          </span>
        </button>
        {vm.ob?.routeOff ? (
          <>
            <p className="ob-lbl">Always trade on</p>
            <div className="ob-venue-grid">
              {(vm.ob?.venuePick || []).map((venuePickItem: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    className={venuePickItem?.cls}
                    aria-pressed={venuePickItem?.pressed}
                    onClick={venuePickItem?.pick}
                  >
                    <img className="logo" src={venuePickItem?.logo} data-venue="1" alt="" />
                    {venuePickItem?.name}
                  </button>
                </Fragment>
              ))}
            </div>
          </>
        ) : null}
        <p className="ob-lbl">App mode</p>
        <div className="ob-art-modes st-modes">
          <button
            type="button"
            className={vm.ob?.proCls}
            aria-pressed={vm.ob?.proStr as AriaBoolean}
            onClick={vm.ob?.pickPro}
          >
            <span className="obm-ic">
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
                <path d="M7 4v16M17 4v16" />
                <rect x="4.5" y="8" width="5" height="7" rx="1" />
                <rect x="14.5" y="6" width="5" height="9" rx="1" />
              </svg>
            </span>
            <b>Pro</b>
            <small>Trade freely. Nothing is scored.</small>
          </button>
          <button
            type="button"
            className={vm.ob?.propCls}
            aria-pressed={vm.ob?.propStr as AriaBoolean}
            onClick={vm.ob?.pickProp}
          >
            <span className="obm-ic">
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
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
                <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
              </svg>
            </span>
            <b>Prop</b>
            <small>Evaluations and funded accounts.</small>
          </button>
        </div>
        <p className="ob-lbl">Theme</p>
        <div className="ob-themes">
          {(vm.ob?.themes || []).map((theme: any, i: any) => (
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
        <p className="ob-lbl">Legal</p>
        <div className="st-legal">
          <span>{vm.st?.termsLine}</span>
          <span className="st-links">
            <a href="#" onClick={vm.ob?.openTerms}>
              Terms
            </a>
            <a href="#" onClick={vm.ob?.openPrivacy}>
              Privacy
            </a>
            <a href="#" onClick={vm.ob?.openCookies}>
              Cookies
            </a>
          </span>
        </div>
        <button type="button" className="ob-btn ghost st-replay" onClick={vm.st?.replay}>
          Replay the introduction
        </button>
      </div>
    </>
  );
}
