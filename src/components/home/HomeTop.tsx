import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function HomeTop({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="hm-top">
      <header className="hm-head">
        <span className="hm-brand">
          <span className="bmark" aria-hidden="true">
            <svg width="26" height="26" viewBox="-6 -6 112 112">
              <path
                className="bmark-g"
                fillRule="evenodd"
                d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
              />
            </svg>
          </span>
          <b>OpenFutures</b>
        </span>
        <span className="hm-head-r">
          <button
            type="button"
            className="hm-ibtn hm-av"
            aria-label="Profile"
            onClick={vm.goProfile}
          >
            <img src={vm.pfp} alt="" />
          </button>
          <div className="modesw modesw-hm modesw-head" role="group" aria-label="App mode">
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
        </span>
      </header>
      <div className="hm-bal">
        <div className="hm-bal-top">
          <span>{vm.home?.balLabel}</span>
        </div>
        <p className="hm-eq num">
          <span className="hm-cur">$</span>
          {vm.home?.eqWhole}
          <span className="hm-cents">.{vm.home?.eqCents}</span>
        </p>
        <p className="hm-sub num">
          <b className={vm.home?.upnlCls}>{vm.home?.upnl}</b> unrealized, {vm.home?.posCount} open
          positions
        </p>
        <div className="hm-money">
          <button type="button" className="hm-mbtn primary" onClick={vm.fund?.openDeposit}>
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
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
            Deposit
          </button>
          <button type="button" className="hm-mbtn" onClick={vm.fund?.openWithdraw}>
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
              <path d="M12 19V5" />
              <path d="m6 11 6-6 6 6" />
            </svg>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
