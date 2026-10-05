import type { CSSProperties } from "react";

/**
 * Parses a `prop: value; prop: value` string into a React style object.
 * The view model emits some styles as strings because a single value can carry several
 * declarations (for example the layout's grid columns and rows).
 */
export function parseStyle(css: string): CSSProperties {
  const style: Record<string, string> = {};
  String(css)
    .split(";")
    .forEach((declaration) => {
      const colon = declaration.indexOf(":");
      if (colon < 0) {
        return;
      }
      const property = declaration.slice(0, colon).trim();
      const value = declaration.slice(colon + 1).trim();
      if (property) {
        const key = property.startsWith("--")
          ? property
          : property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        style[key] = value;
      }
    });
  return style;
}
