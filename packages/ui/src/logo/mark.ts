// The OpenFutures mark as plain data, with no framework dependency, so a React app,
// a static page and a build script can all draw the same shape.

export const LOGO_MARK_VIEWBOX = "-6 -6 112 112";

export const LOGO_MARK_PATH =
  "M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z";

export interface LogoMarkSvgOptions {
  /** Width and height in pixels. Left out, the mark is sized by CSS. */
  size?: number;
  /** Class for the path, for places that colour the mark from their own stylesheet. */
  pathClassName?: string;
  /** Accessible name. Without one the mark is treated as decoration and hidden from assistive tech. */
  title?: string;
}

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** The mark as an SVG string, for places that cannot render the React component. */
export function logoMarkSvg({ size, pathClassName, title }: LogoMarkSvgOptions = {}): string {
  const dimensions = size === undefined ? "" : `width="${size}" height="${size}" `;
  const labelling = title
    ? `role="img" aria-label="${escapeAttribute(title)}"`
    : 'aria-hidden="true"';
  const pathClass = pathClassName ? `class="${escapeAttribute(pathClassName)}" ` : "";
  return (
    `<svg ${dimensions}viewBox="${LOGO_MARK_VIEWBOX}" ${labelling}>` +
    `<path ${pathClass}fill-rule="evenodd" d="${LOGO_MARK_PATH}"/></svg>`
  );
}
