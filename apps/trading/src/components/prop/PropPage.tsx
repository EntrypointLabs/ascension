import { PropTradeView } from "@/components/prop/PropTradeView";
import type { TerminalViewModel } from "@/terminal/types";

export function PropPage({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="page page-prop" aria-label="Prop">
      <div className="page-inner cr pp2">
        <header className="cr-head">
          <div>
            <h1>Prop</h1>
            <p>Trade vault capital. Keep 80%.</p>
            <button type="button" className="lq-link" onClick={vm.goLiquidity}>
              Funded by the OpenFutures Vaults
            </button>
          </div>
        </header>
        <PropTradeView vm={vm} />
      </div>
    </section>
  );
}
