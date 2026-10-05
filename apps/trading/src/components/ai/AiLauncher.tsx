import type { TerminalViewModel } from "@/terminal/types";
import { LogoTile } from "@openfutures/ui";

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
          <LogoTile size="md" />
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
