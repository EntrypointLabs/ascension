# @openfutures/ui

Shared interface pieces for the OpenFutures apps. It starts with the logo.

## Logo

One shape, defined once in `src/logo/mark.ts`, drawn four ways:

| Use | From | For |
| --- | --- | --- |
| `<LogoMark />` | `@openfutures/ui` | the bare mark, in React |
| `<LogoTile />` | `@openfutures/ui` | the mark in its square, in React |
| `<of-logo>` | `@openfutures/ui/logo-element` | either of the above on a page that is not React |
| `logoMarkSvg()`, `logoTileHtml()` | `@openfutures/ui/logo`, `/logo-tile` | the same markup as strings |

```tsx
import { LogoMark, LogoTile } from "@openfutures/ui";

<LogoTile variant="brand" />                 // beside the product name
<LogoTile size="lg" />                       // 44px square; xs 22, sm 24, md 28, lg 44, xl 48
<LogoTile size="lg" markSize={22} />         // same square, smaller mark
<LogoMark size={18} aria-hidden="true" />    // bare; without a size it is sized by CSS
```

```js
import { defineLogoElement } from "@openfutures/ui/logo-element";
defineLogoElement();
// <of-logo></of-logo>  <of-logo variant="brand"></of-logo>  <of-logo variant="tile" size="lg"></of-logo>
```

The square's look lives in `@openfutures/ui/logo.css`; import it wherever a tile is used. A
`brand` tile is light on the dark theme and drops away on the light theme. A `tile` is always
there and flips: light with a dark mark on the dark theme, dark with a white mark on the light
theme. The light theme is whatever sits under an element with `data-theme="light"`.

The tiles render the class names the design prototype uses (`bmark`, `ob-mark`, `ai-mark`).
The trading app's parity checks compare its markup with the prototype exactly, so those names
are part of the output and must not change.

## Icons

`pnpm --filter @openfutures/ui icons` draws `favicon.ico`, `favicon.svg` and
`apple-touch-icon.png` from the mark and copies them into each app's `public` folder. Run it
after changing the mark.
