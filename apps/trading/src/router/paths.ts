import { MARKETS } from "@/data/markets";
import type { TerminalState } from "@/terminal/Terminal";
import type { Screen } from "@/terminal/types";

export const WATCH_VIEWS = ["markets", "exchanges", "funding"] as const;
export const LIQUIDITY_VIEWS = ["vaults", "analytics"] as const;

export const ROUTED_KEYS = ["screen", "sym", "wview", "watchOpen", "lqView", "account"] as const;
export type RouteState = Partial<Pick<TerminalState, (typeof ROUTED_KEYS)[number]>>;

const SYMBOLS = new Map(MARKETS.map((market) => [market.sym.toLowerCase(), market.sym]));

function marketParam(value: string | null | undefined): string | null {
  return (value && SYMBOLS.get(value.toLowerCase())) || null;
}

export function routeFromUrl(pathname: string, search: string): RouteState | null {
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const [section, param, extra] = parts;
  if (extra) {
    return null;
  }
  switch (section) {
    case undefined:
      return { screen: "home" };
    case "trade": {
      if (!param) {
        return { screen: "detail" };
      }
      const sym = marketParam(param);
      return sym ? { screen: "detail", sym } : null;
    }
    case "watch": {
      const wview = param || "markets";
      if (!(WATCH_VIEWS as readonly string[]).includes(wview)) {
        return null;
      }
      return {
        screen: "watch",
        wview,
        watchOpen: marketParam(new URLSearchParams(search).get("market")),
      };
    }
    case "liquidity": {
      const lqView = param || "vaults";
      if (!(LIQUIDITY_VIEWS as readonly string[]).includes(lqView)) {
        return null;
      }
      return { screen: "liquidity", lqView };
    }
    case "prop":
      return param ? null : { screen: "prop", account: "prop" };
    case "profile":
      return param ? null : { screen: "profile" };
    default:
      return null;
  }
}

export function urlFromState(state: TerminalState, isMobile: boolean): string {
  const screen: Screen = state.screen;
  const trade = "/trade/" + state.sym;
  switch (screen) {
    case "home":
      return isMobile ? "/" : trade;
    case "watch": {
      const view = state.wview && state.wview !== "markets" ? "/" + state.wview : "";
      const market = state.watchOpen ? "?market=" + state.watchOpen : "";
      return "/watch" + view + market;
    }
    case "liquidity":
      return state.lqView === "analytics" ? "/liquidity/analytics" : "/liquidity";
    case "prop":
      return state.account === "prop" ? "/prop" : isMobile ? "/" : trade;
    case "profile":
      return "/profile";
    default:
      return trade;
  }
}

export function titleFromState(state: TerminalState, isMobile: boolean): string {
  const page: Record<Screen, string> = {
    home: isMobile ? "Markets" : state.sym + "-PERP",
    detail: state.sym + "-PERP",
    watch: "Market Watch",
    liquidity: "Liquidity",
    prop: "Prop",
    profile: "Profile",
  };
  return (page[state.screen as Screen] || "Trade") + " · OpenFutures";
}
