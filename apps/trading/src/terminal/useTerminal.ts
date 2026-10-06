import { useEffect, useReducer, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { ROUTED_KEYS, routeFromUrl, titleFromState, urlFromState } from "@/router/paths";
import { Terminal } from "@/terminal/Terminal";
import type { AppProps, TerminalViewModel } from "@/terminal/types";

function propsChooseRoute(props: AppProps): boolean {
  const initial = props.initialState || {};
  return !!(
    props.initialScreen ||
    props.initialWview ||
    props.initialWatchOpen ||
    ROUTED_KEYS.some((key) => key in initial)
  );
}

export function useTerminal(props: AppProps): TerminalViewModel {
  const [, forceRender] = useReducer((count: number) => count + 1, 0);
  const terminalRef = useRef<Terminal | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const appliedKey = useRef<string | null>(propsChooseRoute(props) ? location.key : null);
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
      // Applied during render rather than in an effect so the new page never flashes the old state.
      terminal.state = { ...terminal.state, ...route };
    }
    settledUrl.current = urlFromState(terminal.state, isMobile);
  }
  const url = urlFromState(terminal.state, isMobile);
  if (settledUrl.current === null && appliedKey.current === location.key && !mounted.current) {
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
