import type { ReactNode } from "react";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import type { TerminalViewModel } from "@/terminal/types";

/**
 * A Liquidity chart card: title with an info tip, optional subtitle and a snapshot button.
 * `snap` names the exported image; `className` sets the grid span (`lq-half`, `lq-full`).
 */
export function ChartCard({
  vm,
  title,
  info,
  sub,
  snap,
  className = "lq-half",
  children,
}: {
  vm: TerminalViewModel;
  title: string;
  info: string;
  sub?: ReactNode;
  snap: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={"mw-card snap-card lq-chart " + className} data-snap={snap}>
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            {title}
            <InfoTip tip={info} />
          </h2>
          {sub ? <p className="num">{sub}</p> : null}
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      {children}
    </section>
  );
}
