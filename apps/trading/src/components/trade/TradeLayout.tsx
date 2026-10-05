import { ChartPane } from "@/components/trade/ChartPane";
import { MarketsColumn } from "@/components/trade/MarketsColumn";
import { OrderBookPane } from "@/components/trade/OrderBookPane";
import { TradePane } from "@/components/trade/TradePane";
import { ActivityDock } from "@/components/trade/dock/ActivityDock";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function TradeLayout({ vm }: { vm: TerminalViewModel }) {
  return (
    <main className="layout" style={parseStyle(`grid-template-columns: ${vm.cols ?? ""}`)}>
      <MarketsColumn vm={vm} />
      <ChartPane vm={vm} />
      <button
        type="button"
        className={vm.h1Cls}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize chart and order book. Drag, or use arrow keys. Double-click to reset."
        onPointerDown={vm.h1?.down}
        onPointerMove={vm.h1?.move}
        onPointerUp={vm.h1?.up}
        onPointerCancel={vm.h1?.up}
        onKeyDown={vm.h1?.key}
        onDoubleClick={vm.resetPanes}
      >
        <span />
      </button>
      <OrderBookPane vm={vm} />
      <button
        type="button"
        className={vm.h2Cls}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize order book and trade panel. Drag, or use arrow keys. Double-click to reset."
        onPointerDown={vm.h2?.down}
        onPointerMove={vm.h2?.move}
        onPointerUp={vm.h2?.up}
        onPointerCancel={vm.h2?.up}
        onKeyDown={vm.h2?.key}
        onDoubleClick={vm.resetPanes}
      >
        <span />
      </button>
      <TradePane vm={vm} />
      <button
        type="button"
        className={vm.hvCls}
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize the activity panel. Drag, or use arrow keys. Double-click to reset."
        onPointerDown={vm.hv?.down}
        onPointerMove={vm.hv?.move}
        onPointerUp={vm.hv?.up}
        onPointerCancel={vm.hv?.up}
        onKeyDown={vm.hv?.key}
        onDoubleClick={vm.resetPanes}
      >
        <span />
      </button>
      <ActivityDock vm={vm} />
    </main>
  );
}
