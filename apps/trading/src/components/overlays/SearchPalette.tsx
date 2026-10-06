import { useEffect, useRef, type KeyboardEvent } from "react";
import { useEdgeFade } from "@/components/common/ScrollRegion";
import { useDialogFocus } from "@/components/common/useDialogFocus";
import type { TerminalViewModel } from "@/terminal/types";

interface SearchItem {
  kind: string;
  id: string;
  cls: string;
  selected: boolean;
  logo?: string;
  title: string;
  hasTag?: boolean;
  tag?: string;
  sub?: string;
  c1?: string;
  c1sub?: string;
  c1subCls?: string;
  c2?: string;
  c3?: string;
  c4?: string;
  c4Cls?: string;
  open: () => void;
  hover: () => void;
}

interface SearchSection {
  key: string;
  title: string;
  headers: string[];
  items: SearchItem[];
}

interface SearchTab {
  id: string;
  label: string;
  count: string;
  cls: string;
  selected: boolean;
  pick: () => void;
}

interface SearchSort {
  label: string;
  sorted: boolean;
  pick: () => void;
}

function SectionHead({ section, sorts }: { section: SearchSection; sorts?: SearchSort[] | null }) {
  return (
    <div className="ss-head" aria-hidden={sorts ? undefined : true}>
      <b>{section.title}</b>
      <span>{section.headers[0]}</span>
      {sorts
        ? sorts.map((sort) => (
            <button
              key={sort.label}
              type="button"
              className={"ss-sort" + (sort.sorted ? " is-on" : "")}
              aria-pressed={sort.sorted}
              onClick={sort.pick}
            >
              {sort.label}
              <span aria-hidden="true">{sort.sorted ? " ↓" : ""}</span>
            </button>
          ))
        : section.headers.slice(1).map((header) => <span key={header}>{header}</span>)}
    </div>
  );
}

function ResultRow({ item }: { item: SearchItem }) {
  if (item.kind === "more") {
    return (
      <div
        id={item.id}
        role="option"
        aria-selected={item.selected}
        className={item.cls}
        onClick={item.open}
        onMouseMove={item.hover}
      >
        {item.title}
      </div>
    );
  }
  return (
    <div
      id={item.id}
      role="option"
      aria-selected={item.selected}
      className={item.cls}
      onClick={item.open}
      onMouseMove={item.hover}
    >
      <img className="logo" src={item.logo} alt="" />
      <span className="sr-id">
        <b>
          {item.title}
          {item.hasTag ? <span className="lev">{item.tag}</span> : null}
        </b>
        <small>{item.sub}</small>
      </span>
      <span className="sr-c1 num">
        <b>{item.c1}</b>
        {item.c1sub ? <small className={item.c1subCls}>{item.c1sub}</small> : null}
      </span>
      <span className="sr-c num">{item.c2}</span>
      <span className="sr-c num">{item.c3}</span>
      <span className={`sr-c num ${item.c4Cls ?? ""}`}>{item.c4}</span>
    </div>
  );
}

export function SearchPalette({ vm }: { vm: TerminalViewModel }) {
  const srch = vm.srch;
  const dialogRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabs: SearchTab[] = srch?.tabs || [];
  const sections: SearchSection[] = srch?.sections || [];
  const sorts: SearchSort[] | null = srch?.sorts ?? null;
  useDialogFocus(dialogRef, () => srch?.close(), "input");
  useEdgeFade(tabsRef);

  useEffect(() => {
    if (srch?.activeId) {
      document.getElementById(srch.activeId)?.scrollIntoView({ block: "nearest" });
    }
  }, [srch?.activeId]);

  useEffect(() => {
    document
      .getElementById(srch?.activeTabId ?? "")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [srch?.activeTabId]);

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = tabs.findIndex((tab) => tab.selected);
    const next =
      event.key === "ArrowRight"
        ? (current + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (current - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : -1;
    if (next < 0) {
      return;
    }
    event.preventDefault();
    tabs[next].pick();
    requestAnimationFrame(() => document.getElementById(tabs[next].id)?.focus());
  };

  const sortable = !!sorts && sections.length === 1;

  return (
    <>
      <div className="srch-backdrop" aria-hidden="true" onClick={srch?.close} />
      <div ref={dialogRef} className="srch" role="dialog" aria-modal="true" aria-label="Search">
        <div className="srch-input">
          <svg
            width="16"
            height="16"
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
            role="combobox"
            value={srch?.q ?? ""}
            onChange={srch?.onQ}
            onKeyDown={srch?.onKey}
            placeholder="Search markets, venues and positions"
            aria-label="Search markets, venues and positions"
            aria-expanded={true}
            aria-autocomplete="list"
            aria-controls={srch?.listId}
            aria-activedescendant={srch?.activeId}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label="Close search"
            onClick={srch?.close}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div
          ref={tabsRef}
          className="srch-tabs xscroll"
          role="tablist"
          aria-label="Search in"
          onKeyDown={onTabKey}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={tab.id}
              type="button"
              role="tab"
              className={tab.cls}
              aria-selected={tab.selected}
              aria-controls="srch-panel"
              tabIndex={tab.selected ? 0 : -1}
              onClick={tab.pick}
            >
              {tab.label}
              <span className="num">{tab.count}</span>
            </button>
          ))}
        </div>
        <div
          id="srch-panel"
          className="srch-body"
          role="tabpanel"
          aria-labelledby={srch?.activeTabId}
          tabIndex={-1}
        >
          {sortable ? <SectionHead section={sections[0]} sorts={sorts} /> : null}
          <div id={srch?.listId} role="listbox" aria-label="Results">
            {sections.map((section) => (
              <div key={section.key} className="srch-sec" role="group" aria-label={section.title}>
                {sortable ? null : <SectionHead section={section} />}
                {section.items.map((item) => (
                  <ResultRow key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
          {srch?.empty ? (
            <div className="srch-empty">
              <b>No matches for "{srch?.q}"</b>
              <span>Try a ticker like BTC, an index like US500, or a venue like Bybit.</span>
            </div>
          ) : null}
        </div>
        <div className="sr" role="status">
          {srch?.status}
        </div>
        <div className="srch-foot" aria-hidden="true">
          <span>
            <kbd>Esc</kbd>Close
          </span>
          <span>
            <kbd>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="M9 10 4 15l5 5" />
                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              </svg>
            </kbd>
            Open
          </span>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>Move
          </span>
          <span className="sf-hint">Tip: type a venue name to see every market it lists</span>
        </div>
      </div>
    </>
  );
}
