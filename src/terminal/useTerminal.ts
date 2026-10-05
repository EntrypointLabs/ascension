import { useEffect, useReducer, useRef } from "react";
import { Terminal } from "@/terminal/Terminal";
import { PATH_SCREENS, SCREEN_PATHS } from "@/terminal/routes";
import type { AppProps, Screen, TerminalViewModel } from "@/terminal/types";

/** Owns one Terminal for the lifetime of the component and re-renders whenever its state changes. */
export function useTerminal(props: AppProps): TerminalViewModel {
  const [, forceRender] = useReducer((count: number) => count + 1, 0);
  const terminalRef = useRef<Terminal | null>(null);
  if (!terminalRef.current) {
    const created = new Terminal(props);
    created._force = forceRender;
    terminalRef.current = created;
  }
  const terminal = terminalRef.current;
  const prevProps = useRef(props);
  terminal.props = props;

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
    if (!props.syncUrl) {
      return;
    }
    const onPopState = () => {
      terminal.setState({ screen: PATH_SCREENS[window.location.pathname] || "detail" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [terminal, props.syncUrl]);

  const screen: Screen | undefined = terminal.state.screen;
  useEffect(() => {
    if (!props.syncUrl || !screen) {
      return;
    }
    const path = SCREEN_PATHS[screen] || "/";
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
  }, [screen, props.syncUrl]);

  return terminal.renderVals();
}
