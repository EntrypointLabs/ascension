import type { Screen } from "@/terminal/types";

export const SCREEN_PATHS: Record<Screen, string> = {
  home: "/",
  detail: "/",
  watch: "/watch",
  prop: "/prop",
  liquidity: "/liquidity",
  profile: "/profile",
};

export const PATH_SCREENS: Record<string, Screen> = {
  "/": "detail",
  "/watch": "watch",
  "/prop": "prop",
  "/liquidity": "liquidity",
  "/profile": "profile",
};
