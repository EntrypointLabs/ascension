import { OrderForm } from "@/components/trade/OrderForm";
import type { TerminalViewModel } from "@/terminal/types";

export function TradePane({ vm }: { vm: TerminalViewModel }) {
  return (
    <aside className={vm.tradePaneCls} aria-label="Place an order">
      {vm.tradeShow ? <OrderForm vm={vm} /> : null}
      {vm.tradeRail ? (
        <>
          <div className="rail">
            <button
              type="button"
              className="btn btn-icon sm"
              aria-label="Show trade panel"
              onClick={vm.expandTrade}
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
                <path d="m10 6-6 6 6 6" />
                <path d="M20 4v16" />
              </svg>
            </button>
            <span className="rail-label">Trade</span>
          </div>
        </>
      ) : null}
    </aside>
  );
}
