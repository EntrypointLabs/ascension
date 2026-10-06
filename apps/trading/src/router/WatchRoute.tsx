import { WatchDetailSheet } from "@/components/watch/WatchDetailSheet";
import { WatchPage } from "@/components/watch/WatchPage";
import type { TerminalViewModel } from "@/terminal/types";

/** Market Watch, plus the phone sheet for the market named in `?market=`. */
export default function WatchRoute({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <WatchPage vm={vm} />
      {vm.wsheetOpen ? <WatchDetailSheet vm={vm} /> : null}
    </>
  );
}
