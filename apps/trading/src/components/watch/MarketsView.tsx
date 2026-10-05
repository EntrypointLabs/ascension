import { MarketsTableCard } from "@/components/watch/MarketsTableCard";
import { PerformanceCard } from "@/components/watch/PerformanceCard";
import type { TerminalViewModel } from "@/terminal/types";

export function MarketsView({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <PerformanceCard vm={vm} />
      <MarketsTableCard vm={vm} />
    </>
  );
}
