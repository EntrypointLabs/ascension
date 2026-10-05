import { Fragment } from "react";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function Topbar({ vm }: { vm: TerminalViewModel }) {
  return (
    <header className="topbar">
      <a className="brand" href="#">
        <span className="bmark" aria-hidden="true">
          <svg width="26" height="26" viewBox="-6 -6 112 112">
            <path
              className="bmark-g"
              fillRule="evenodd"
              d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
            />
          </svg>
        </span>
        <span>OpenFutures</span>
      </a>
      <nav className="nav" aria-label="Main">
        {(vm.navItems || []).map((navItem: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              className={navItem?.cls}
              aria-current={navItem?.current}
              onClick={navItem?.go}
            >
              {navItem?.label}
            </button>
          </Fragment>
        ))}
      </nav>
      <button
        type="button"
        className="srch-trigger"
        aria-haspopup="dialog"
        aria-expanded={vm.srch?.openStr as AriaBoolean}
        aria-label="Search markets, venues and positions"
        onClick={vm.srch?.open}
      >
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
        <span>Search markets, venues, positions</span>
        <kbd>{vm.srch?.kbd}</kbd>
      </button>
      <div className="top-actions">
        <button
          type="button"
          className="btn btn-icon sm srch-mobile"
          aria-label="Search"
          onClick={vm.srch?.open}
        >
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
        </button>
        <button
          type="button"
          className="btn btn-primary btn-deposit"
          onClick={vm.fund?.openDeposit}
        >
          Deposit
        </button>
        <button
          type="button"
          className="profile-btn"
          aria-haspopup="dialog"
          aria-expanded={vm.profileOpen as AriaBoolean}
          onClick={vm.toggleProfile}
        >
          <span className="avatar">
            <img src={vm.pfp} alt="" />
          </span>
          <span className="profile-name">kai.trades</span>
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div className="modesw modesw-top" role="group" aria-label="App mode">
          <button
            type="button"
            className={vm.mode?.proCls}
            aria-pressed={vm.mode?.proPressed as AriaBoolean}
            onClick={vm.mode?.setPro}
          >
            <span className="ms-ic">
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
                <path d="M7 4v16M17 4v16" />
                <rect x="4.5" y="8" width="5" height="7" rx="1" />
                <rect x="14.5" y="6" width="5" height="9" rx="1" />
              </svg>
            </span>
            Pro
          </button>
          <button
            type="button"
            className={vm.mode?.propCls}
            aria-pressed={vm.mode?.propPressed as AriaBoolean}
            onClick={vm.mode?.setProp}
          >
            <span className="ms-ic">
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
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
                <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
              </svg>
            </span>
            Prop
          </button>
        </div>
      </div>
    </header>
  );
}
