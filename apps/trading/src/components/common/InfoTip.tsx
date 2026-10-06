/** A small (i) button that shows `tip` on hover or keyboard focus. Styled by `.ib` in 15-controls.css. */
export function InfoTip({ tip }: { tip?: string }) {
  if (!tip) {
    return null;
  }
  return (
    <button type="button" className="ib" aria-label={tip} data-tip={tip}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        style={{ fill: "none", stroke: "currentColor" }}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
    </button>
  );
}
