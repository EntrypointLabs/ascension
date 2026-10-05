import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function Ticker({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="ticker" aria-label="Market movers">
      <div className="tk-track">
        <div className="tk-set">
          {(vm.tickers || []).map((ticker: any, i: any) => (
            <Fragment key={i}>
              <button type="button" onClick={ticker?.pick}>
                <img className="logo xxs" src={ticker?.logo} alt="" />
                <b>{ticker?.sym}-PERP</b>
                <span className={`num ${ticker?.dir ?? ""}`}>{ticker?.chgText}</span>
              </button>
            </Fragment>
          ))}
        </div>
        <div className="tk-set" aria-hidden="true">
          {(vm.tickers || []).map((ticker: any, i: any) => (
            <Fragment key={i}>
              <button type="button" tabIndex={-1} onClick={ticker?.pick}>
                <img className="logo xxs" src={ticker?.logo} alt="" />
                <b>{ticker?.sym}-PERP</b>
                <span className={`num ${ticker?.dir ?? ""}`}>{ticker?.chgText}</span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
