import type { ChangeEventHandler, ReactNode } from "react";
import type { TerminalViewModel } from "@/terminal/types";

type ViewQueries = Partial<{
  xq: string;
  onXq: ChangeEventHandler<HTMLInputElement>;
  fq: string;
  onFq: ChangeEventHandler<HTMLInputElement>;
}>;

/** Per-view queries; falls back to `wq` until the vm provides `xq`/`fq`. */
export function viewQueries(vm: TerminalViewModel) {
  const v = vm as TerminalViewModel & ViewQueries;
  return { xq: v.xq ?? vm.wq, onXq: v.onXq ?? vm.onWq, fq: v.fq ?? vm.wq, onFq: v.onFq ?? vm.onWq };
}

export function WatchSearch({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="search wsearch">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        style={{ fill: "none", stroke: "currentColor" }}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="text"
        placeholder={label}
        aria-label={label}
        value={value ?? ""}
        onChange={onChange}
      />
    </label>
  );
}

export function WatchEmpty({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="dock-empty" role="status">
      <b>{title}</b>
      <span>{children}</span>
    </div>
  );
}
