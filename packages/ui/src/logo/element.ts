// <of-logo>: the logo as a custom element, for pages that are not React.
//
//   <of-logo></of-logo>                          the bare mark
//   <of-logo variant="brand"></of-logo>          beside the product name
//   <of-logo variant="tile" size="lg"></of-logo> the mark in its square
//   <of-logo size="32" label="OpenFutures"></of-logo>
//
// It renders into the light DOM, so the page's stylesheet (logo.css) and a data-theme
// attribute on an ancestor style it exactly as they style the React components.

import { logoMarkSvg } from "./mark";
import { isLogoTileSize, logoTileHtml } from "./tile";

export const LOGO_ELEMENT_NAME = "of-logo";

const pixels = (value: string | null) => {
  const size = Number(value);
  return value !== null && Number.isFinite(size) && size > 0 ? size : undefined;
};

class LogoElement extends HTMLElement {
  static observedAttributes = ["variant", "size", "mark-size", "label"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  private render() {
    const variant = this.getAttribute("variant");
    const size = this.getAttribute("size");
    if (variant === "brand" || variant === "tile") {
      this.innerHTML = logoTileHtml({
        variant,
        size: isLogoTileSize(size) ? size : undefined,
        markSize: pixels(this.getAttribute("mark-size")),
      });
      return;
    }
    this.innerHTML = logoMarkSvg({
      size: pixels(size),
      title: this.getAttribute("label") ?? undefined,
    });
  }
}

/** Registers <of-logo>. Safe to call more than once. */
export function defineLogoElement(): void {
  if (typeof customElements === "undefined" || customElements.get(LOGO_ELEMENT_NAME)) return;
  customElements.define(LOGO_ELEMENT_NAME, LogoElement);
}
