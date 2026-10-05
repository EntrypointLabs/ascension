import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function TermsStep({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="ob-terms">
        <span className="ob-mark">
          <svg width="26" height="26" viewBox="-6 -6 112 112" aria-hidden="true">
            <path
              className="bmark-g"
              fillRule="evenodd"
              d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
            />
          </svg>
        </span>
        <h2>Welcome to OpenFutures</h2>
        <p className="ob-sub">Before you trade, please review and accept the following.</p>
        <button
          type="button"
          className={vm.ob?.t1Cls}
          role="checkbox"
          aria-checked={vm.ob?.t1Str as AriaBoolean}
          onClick={vm.ob?.toggleT1}
        >
          <span className="ob-box">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m5 12 5 5 9-10" />
            </svg>
          </span>
          <span>
            I have read and agree to the{" "}
            <a href="#" onClick={vm.ob?.openTerms}>
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" onClick={vm.ob?.openPrivacy}>
              Privacy Policy
            </a>
            , and I understand that perpetual futures carry a high risk of loss.
          </span>
        </button>
        <button
          type="button"
          className={vm.ob?.t2Cls}
          role="checkbox"
          aria-checked={vm.ob?.t2Str as AriaBoolean}
          onClick={vm.ob?.toggleT2}
        >
          <span className="ob-box">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m5 12 5 5 9-10" />
            </svg>
          </span>
          <span>
            I accept the use of essential cookies, as described in the{" "}
            <a href="#" onClick={vm.ob?.openCookies}>
              Cookie Policy
            </a>
            .
          </span>
        </button>
        {vm.ob?.declined ? (
          <>
            <p className="ob-note">
              OpenFutures needs both to open trading for you. You can read every policy first, then
              come back.
            </p>
          </>
        ) : null}
        <div className="ob-actions">
          <button type="button" className="ob-btn ghost" onClick={vm.ob?.decline}>
            Decline
          </button>
          <button
            type="button"
            className="ob-btn primary"
            disabled={!!vm.ob?.acceptDis}
            onClick={vm.ob?.accept}
          >
            Accept and continue
          </button>
        </div>
      </div>
    </>
  );
}
