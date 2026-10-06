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
 * Renders as a tablist; extra classes position it (`seg-sm wviews`, `mw-sticky`, ...).
 */
export function IconToggle({
  items,
  label,
  className = "",
}: {
  items?: IconToggleItem[];
  label: string;
  className?: string;
}) {
  return (
    <div className={("ttg " + className).trim()} role="tablist" aria-label={label}>
      {(items || []).map((item, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          className={item.cls}
          aria-selected={item.pressed === "true"}
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
