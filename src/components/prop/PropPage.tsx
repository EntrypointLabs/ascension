import { Fragment } from "react";
import { PropLiquidityView } from "@/components/prop/PropLiquidityView";
import { PropTradeView } from "@/components/prop/PropTradeView";
import type { TerminalViewModel } from "@/terminal/types";

export function PropPage({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="page page-prop" aria-label="Prop">
      <div className="page-inner cr pp2">
        <header className="cr-head">
          <div>
            <h1>Prop</h1>
            <p>Trade vault capital, or fund the vault.</p>
          </div>
        </header>
        <div className="lg-tabs pp-tabs" role="tablist" aria-label="Prop">
          {(vm.prop2?.tabs || []).map((tab: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="tab"
                className={tab?.cls}
                aria-selected={tab?.pressed}
                onClick={tab?.pick}
              >
                {tab?.label}
              </button>
            </Fragment>
          ))}
        </div>
        {vm.prop2?.isTrade ? <PropTradeView vm={vm} /> : null}
        {vm.prop2?.isLp ? <PropLiquidityView vm={vm} /> : null}
      </div>
    </section>
  );
}
