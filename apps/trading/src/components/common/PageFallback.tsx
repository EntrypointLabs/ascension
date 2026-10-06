import { Component, type ReactNode } from "react";

const PAGE_NAMES: Record<string, string> = {
  watch: "Market Watch",
  liquidity: "Liquidity",
  prop: "Prop",
};

export function PageFallback({ screen }: { screen: string }) {
  const name = PAGE_NAMES[screen] || "page";
  const hasStats = screen !== "prop";
  return (
    <section className="page page-loading" aria-busy="true">
      <div className="page-inner">
        <span className="sr-only" role="status">
          Loading {name}
        </span>
        <div className="sk-head" aria-hidden="true">
          <div>
            <i className="sk sk-title" />
            <i className="sk sk-line" />
          </div>
          <i className="sk sk-toggle" />
        </div>
        {hasStats ? (
          <div className="sk-stats" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="sk-stat">
                <i className="sk sk-label" />
                <i className="sk sk-value" />
              </div>
            ))}
          </div>
        ) : null}
        <div className="sk-card" aria-hidden="true">
          <i className="sk sk-label" />
          <i className="sk sk-block" />
        </div>
      </div>
    </section>
  );
}

interface BoundaryProps {
  /** Clears the error when it changes, so navigating away recovers. */
  resetKey: string;
  children: ReactNode;
}

export class PageErrorBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(prev: BoundaryProps) {
    if (this.state.failed && prev.resetKey !== this.props.resetKey) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) {
      return this.props.children;
    }
    return (
      <section className="page page-loading page-error" role="alert">
        <div className="page-inner">
          <div className="pe-box">
            <h1>This page didn't load</h1>
            <p>
              Check your connection and try again. If the app was just updated, a reload fixes it.
            </p>
            <button type="button" className="pe-btn" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        </div>
      </section>
    );
  }
}
