import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { HomePage } from "@/components/home/HomePage";
import { TradeLayout } from "@/components/trade/TradeLayout";
import type { TerminalViewModel } from "@/terminal/types";

// The trade page and the phone market list are where most visits start, so they ship in the
// main bundle; the other pages load when first opened.
const WatchRoute = lazy(() => import("@/router/WatchRoute"));
const LiquidityPage = lazy(() =>
  import("@/components/liquidity/LiquidityPage").then((m) => ({ default: m.LiquidityPage })),
);
const PropPage = lazy(() =>
  import("@/components/prop/PropPage").then((m) => ({ default: m.PropPage })),
);

/** One page per route; the shell around it (top bar, ticker, overlays) stays mounted. */
export function AppRoutes({ vm }: { vm: TerminalViewModel }) {
  const trade = <TradeLayout vm={vm} />;
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Phones start on the market list; larger screens are redirected to /trade/:symbol. */}
        <Route path="/" element={vm.screen === "home" ? <HomePage vm={vm} /> : trade} />
        <Route path="/trade/:symbol?" element={trade} />
        <Route path="/watch/:view?" element={<WatchRoute vm={vm} />} />
        <Route path="/liquidity/:view?" element={<LiquidityPage vm={vm} />} />
        <Route path="/prop" element={<PropPage vm={vm} />} />
        {/* On larger screens the profile is a panel over the trade page. */}
        <Route path="/profile" element={trade} />
        {/* Unknown paths are redirected to the trade page by useTerminal. */}
        <Route path="*" element={trade} />
      </Routes>
    </Suspense>
  );
}
