import { Fragment } from "react";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function HomeSearchRow({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="hm-searchrow">
      <div className="hm-tools hm-tools-top">
        <label className="search hm-search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ fill: "none", stroke: "currentColor" }}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            placeholder={vm.home?.searchPh}
            aria-label={vm.home?.searchPh}
            value={vm.home?.q ?? ""}
            onChange={vm.home?.onQ}
          />
        </label>
        {vm.home?.vMarkets ? (
          <>
            <div className="hm-sortwrap">
              <button
                type="button"
                className="hm-sort"
                aria-haspopup="listbox"
                aria-expanded={vm.home?.sortOpenStr as AriaBoolean}
                aria-label={`Sort by ${vm.home?.sortAria ?? ""}`}
                onClick={vm.home?.toggleSort}
              >
                <span>{vm.home?.sortLabel}</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d={vm.home?.sortIcon} />
                </svg>
              </button>
              {vm.home?.sortOpen ? (
                <>
                  <button
                    type="button"
                    className="hm-scrim"
                    aria-label="Close sort options"
                    onClick={vm.home?.toggleSort}
                  />
                  <div className="hm-menu" role="listbox" aria-label="Sort markets">
                    {(vm.home?.sortGroups || []).map((sortGroup: any, i: any) => (
                      <Fragment key={i}>
                        <div className="hm-mgroup">
                          <span className="hm-mtitle">{sortGroup?.title}</span>
                          {(sortGroup?.opts || []).map((opt: any, i2: any) => (
                            <Fragment key={i2}>
                              <button
                                type="button"
                                role="option"
                                className={opt?.cls}
                                aria-selected={opt?.selected}
                                onClick={opt?.pick}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  style={{ fill: "none", stroke: "currentColor" }}
                                >
                                  <path d={opt?.icon} />
                                </svg>
                                {opt?.label}
                                {opt != null && opt.isOn ? (
                                  <>
                                    <svg
                                      className="hm-check"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.9"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      aria-hidden="true"
                                      style={{ fill: "none", stroke: "currentColor" }}
                                    >
                                      <path d="m5 12 5 5 9-10" />
                                    </svg>
                                  </>
                                ) : null}
                              </button>
                            </Fragment>
                          ))}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
