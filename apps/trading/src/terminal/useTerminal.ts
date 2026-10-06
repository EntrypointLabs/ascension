import { useEffect, useReducer, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { ROUTED_KEYS, routeFromUrl, titleFromState, urlFromState } from "@/router/paths";
import { Terminal } from "@/terminal/Terminal";
import type { AppProps, TerminalViewModel } from "@/terminal/types";

/** True when deep-link props in the hash already say where to start, so they win over the path. */
function propsChooseRoute(props: AppProps): boolean {
  const initial = props.initialState || {};
  return !!(
    props.initialScreen ||
    props.initialWview ||
    props.initialWatchOpen ||
    ROUTED_KEYS.some((key) => key in initial)
  );
}

/**
 * Owns one Terminal for the lifetime of the component, re-renders whenever its state changes,
 * and keeps the URL and the terminal's navigation state (see `router/paths.ts`) in step:
 * a new location is applied to state before rendering, and a navigation made through state
 * (any handler that sets `screen`, `sym`, `wview`, ...) is pushed to the history afterwards.
 */
export function useTerminal(props: AppProps): TerminalViewModel {
  const [, forceRender] = useReducer((count: number) => count + 1, 0);
  const terminalRef = useRef<Terminal | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  // The location whose route has been applied to state. Deep-link props skip the first one.
  const appliedKey = useRef<string | null>(propsChooseRoute(props) ? location.key : null);
  // The URL that state produced right after applying a location; reaching it again is a redirect.
  const settledUrl = useRef<string | null>(null);
  const mounted = useRef(false);

  if (!terminalRef.current) {
    const created = new Terminal(props);
    created._force = forceRender;
    terminalRef.current = created;
  }
  const terminal = terminalRef.current;
  const prevProps = useRef(props);
  terminal.props = props;

  const isMobile = (terminal.state.vw || window.innerWidth) < 768;
  if (appliedKey.current !== location.key) {
    appliedKey.current = location.key;
    const route = routeFromUrl(location.pathname, location.search);
    if (route) {
      // Applied during render, without a re-render of its own, so the page never flashes.
      terminal.state = { ...terminal.state, ...route };
    }
    settledUrl.current = urlFromState(terminal.state, isMobile);
  }
  const url = urlFromState(terminal.state, isMobile);
  if (settledUrl.current === null && appliedKey.current === location.key && !mounted.current) {
    // Deep-link props: the first URL is a rewrite of the one that was opened.
    settledUrl.current = url;
  }

  useEffect(() => {
    terminal.componentDidMount();
    return () => {
      terminal.componentWillUnmount();
    };
  }, [terminal]);

  useEffect(() => {
    if (prevProps.current !== props) {
      terminal.componentDidUpdate(prevProps.current);
      prevProps.current = props;
    }
  });

  useEffect(() => {
    if (url !== location.pathname + location.search) {
      // Canonicalising the URL that was just opened replaces it; a navigation adds an entry.
      navigate(url, { replace: url === settledUrl.current });
    }
    settledUrl.current = null;
    mounted.current = true;
  }, [url, location, navigate]);

  useEffect(() => {
    document.title = titleFromState(terminal.state, isMobile);
  }, [terminal, url, isMobile]);

  return terminal.renderVals();
}
