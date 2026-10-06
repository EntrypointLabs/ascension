/** Draws one stroked icon path from `ICON_PATHS` (or any path string) at the given size. */
export function IconPath({ d, size = 15 }: { d?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ fill: "none", stroke: "currentColor" }}
    >
      <path d={d} />
    </svg>
  );
}
