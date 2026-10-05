import type { TerminalViewModel } from "@/terminal/types";

export function AiLauncher({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className={vm.ai?.launchCls}>
        <button
          type="button"
          className="ail-open"
          onClick={vm.ai?.open}
          aria-label="Ask OpenFutures AI"
        >
          <span className="ai-mark">
            <svg width="18" height="18" viewBox="-6 -6 112 112" aria-hidden="true">
              <path
                className="bmark-g"
                fillRule="evenodd"
                d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
              />
            </svg>
          </span>
          <span className="ail-txt">Ask OpenFutures AI</span>
          <kbd className="ail-kbd">{vm.ai?.kbd}</kbd>
        </button>
        <button
          type="button"
          className="ail-x"
          aria-label="Hide the assistant button"
          onClick={vm.ai?.hide}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </>
  );
}
