import { IconPath } from "@/components/common/IconPath";

export interface IconToggleItem {
  /** Icon path, usually from `ICON_PATHS`. */
  ic?: string;
  label?: string;
  /** `is-active` (or `is-on`) marks the selected option. */
  cls?: string;
  pressed?: "true" | "false" | string;
  pick?: () => void;
}

/**
 * Segmented control whose options carry an icon tile and a label (`.ttg`).
 * Renders as a tablist by default; `role="group"` renders pressed toggle buttons instead, for
 * controls that switch a chart or panel rather than a view. Extra classes position it
 * (`seg-sm wviews`, `mw-sticky`, ...).
 */
export function IconToggle({
  items,
  label,
  className = "",
  role = "tablist",
}: {
  items?: IconToggleItem[];
  label: string;
  className?: string;
  role?: "tablist" | "group";
}) {
  const isTabs = role === "tablist";
  return (
    <div className={("ttg " + className).trim()} role={role} aria-label={label}>
      {(items || []).map((item, i) => (
        <button
          key={i}
          type="button"
          role={isTabs ? "tab" : undefined}
          className={item.cls}
          aria-selected={isTabs ? item.pressed === "true" : undefined}
          aria-pressed={isTabs ? undefined : item.pressed === "true"}
          onClick={item.pick}
        >
          <span className="ms-ic" aria-hidden="true">
            <IconPath d={item.ic} />
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
