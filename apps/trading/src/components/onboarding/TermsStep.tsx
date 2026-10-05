import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";
import { LogoTile } from "@openfutures/ui";

export function TermsStep({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="ob-terms">
        <LogoTile size="lg" />
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
