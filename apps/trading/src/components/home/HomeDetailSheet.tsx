import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function HomeDetailSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button
        type="button"
        className="hd-scrim"
        aria-label="Close details"
        onClick={vm.home?.det?.close}
      />
      <div className="hd-sheet" role="dialog" aria-label={`${vm.home?.det?.title ?? ""} details`}>
        <span className="hm-grab" aria-hidden="true" />
        <div className="hd-head">
          <img className="logo" src={vm.home?.det?.logo} alt="" />
          <div className="hd-id">
            <b>
              {vm.home?.det?.title}
              {vm.home?.det?.hasLev ? (
                <>
                  <span className="lev">{vm.home?.det?.lev}</span>
                </>
              ) : null}
            </b>
            <small>
              <span className={`dir ${vm.home?.det?.sideCls ?? ""}`}>{vm.home?.det?.side}</span>
              <img className="logo xxs" src={vm.home?.det?.venueLogo} data-venue="1" alt="" />
              {vm.home?.det?.venue}
            </small>
          </div>
          <button
            type="button"
            className="hm-ibtn"
            aria-label="Close"
            onClick={vm.home?.det?.close}
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
        <div className="hd-hero num">
          <span>{vm.home?.det?.heroLabel}</span>
          <b className={vm.home?.det?.heroCls}>{vm.home?.det?.hero}</b>
          <small className={vm.home?.det?.heroCls}>{vm.home?.det?.heroSub}</small>
        </div>
        <dl className="hd-grid num">
          {(vm.home?.det?.rows || []).map((row: any, i: any) => (
            <Fragment key={i}>
              <div>
                <dt>{row?.k}</dt>
                <dd>{row?.v}</dd>
              </div>
            </Fragment>
          ))}
        </dl>
        <div className={vm.home?.det?.actCls}>
          <button
            type="button"
            className="hm-act hd-share"
            aria-label="Share"
            onClick={vm.home?.det?.share}
          >
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
              <path d="M12 15V3" />
              <path d="m7 8 5-5 5 5" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
            </svg>
          </button>
          {vm.home?.det?.hasTpsl ? (
            <>
              <button type="button" className="hm-act" onClick={vm.home?.det?.tpsl}>
                TP / SL
              </button>
            </>
          ) : null}
          <button type="button" className="hm-act" onClick={vm.home?.det?.goMarket}>
            Open
          </button>
          {vm.home?.det?.hasPrimary ? (
            <>
              <button type="button" className="hm-act danger" onClick={vm.home?.det?.primary}>
                {vm.home?.det?.primaryLabel}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
