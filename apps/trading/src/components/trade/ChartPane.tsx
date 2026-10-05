import { DetailNav } from "@/components/trade/DetailNav";
import { MarketDetails } from "@/components/trade/MarketDetails";
import { MarketHeader } from "@/components/trade/MarketHeader";
import { MarketPositions } from "@/components/trade/MarketPositions";
import { PriceHero } from "@/components/trade/PriceHero";
import { ChartCard } from "@/components/trade/chart/ChartCard";
import type { TerminalViewModel } from "@/terminal/types";

export function ChartPane({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="pane col-chart" aria-label="Chart">
      <DetailNav vm={vm} />
      <MarketHeader vm={vm} />
      <PriceHero vm={vm} />
      <ChartCard vm={vm} />
      {vm.mlist?.hasHere ? <MarketPositions vm={vm} /> : null}
      <MarketDetails vm={vm} />
    </section>
  );
}
