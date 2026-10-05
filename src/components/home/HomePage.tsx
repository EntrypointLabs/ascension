import { Fragment } from "react";
import { HomeSearchRow } from "@/components/home/HomeSearchRow";
import { HomeSheet } from "@/components/home/HomeSheet";
import { HomeTop } from "@/components/home/HomeTop";
import type { TerminalViewModel } from "@/terminal/types";

export function HomePage({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="page page-home" aria-label="Trade home">
      <div className="page-inner hm">
        <HomeTop vm={vm} />
        <div className="hm-band" role="tablist" aria-label="Show">
          {(vm.home?.views || []).map((view: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="tab"
                className={view?.cls}
                aria-selected={view?.pressed}
                onClick={view?.pick}
              >
                <span className="hb-ic">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <path d={view?.icon} />
                  </svg>
                </span>
                {view?.label}
                <span className="num hb-n">{view?.count}</span>
              </button>
            </Fragment>
          ))}
        </div>
        <HomeSearchRow vm={vm} />
        <HomeSheet vm={vm} />
      </div>
    </section>
  );
}
