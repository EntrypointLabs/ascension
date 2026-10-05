import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function AssetDetailsSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button type="button" className="fd-scrim" aria-label="Close" onClick={vm.asd?.close} />
      <div className="fd-sheet asd" role="dialog" aria-label={`${vm.asd?.name ?? ""} details`}>
        <span className="hm-grab" aria-hidden="true" />
        <div className="asd-head">
          <img className="logo" src={vm.asd?.logo} alt="" />
          <div>
            <b>{vm.asd?.name}</b>
            <span>
              {vm.asd?.sym}-PERP<span className="mi-cat">{vm.asd?.cat}</span>
            </span>
          </div>
          <span className="asd-acts">
            <button
              type="button"
              className="btn btn-icon sm"
              aria-label={`Add ${vm.asd?.sym ?? ""}-PERP to watchlist`}
              aria-pressed={vm.asd?.favPressed}
              onClick={vm.asd?.toggleFav}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                strokeLinejoin="round"
                aria-hidden="true"
                style={parseStyle(`fill: ${vm.asd?.favFill ?? ""}; stroke: currentColor`)}
              >
                <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-icon sm"
              aria-label={`Share ${vm.asd?.sym ?? ""}-PERP`}
              onClick={vm.asd?.share}
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
            <button
              type="button"
              className="btn btn-icon sm"
              aria-label="Close"
              onClick={vm.asd?.close}
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
          </span>
        </div>
        <div className="asd-price num">
          <b>${vm.asd?.price}</b>
          <span className={vm.asd?.dir}>{vm.asd?.chg} today</span>
        </div>
        <p className="mi-about">{vm.asd?.about}</p>
        <dl className="mstat-grid num mi-grid">
          {(vm.asd?.rows || []).map((row: any, i: any) => (
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
            {(vm.asd?.venues || []).map((venue: any, i: any) => (
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
          {(vm.asd?.links || []).map((link: any, i: any) => (
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
        <div className="asd-cta">
          <button type="button" className="cta long" onClick={vm.asd?.trade}>
            Trade {vm.asd?.sym}-PERP
          </button>
        </div>
      </div>
    </>
  );
}
