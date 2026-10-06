/** Icon-only camera button that saves a 4K image of the enclosing `.snap-card`. */
export function SnapshotButton({ onClick }: { onClick?: (event: any) => void }) {
  return (
    <button
      type="button"
      className="snap-btn"
      aria-label="Save a 4K snapshot"
      title="Save a 4K snapshot"
      onClick={onClick}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ fill: "none", stroke: "currentColor" }}
      >
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <rect x="9" y="10" width="6" height="6" rx="1" />
      </svg>
    </button>
  );
}
