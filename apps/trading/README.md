# OpenFutures trading app

Perpetual-futures trading terminal: trade, Market Watch, Prop and Liquidity screens, across
several venues. Built with Vite, React 19, TypeScript and Tailwind CSS v4.

This codebase started as a 1:1 source rebuild of the v90 design prototype. The Liquidity screen
and the info tips, icon toggles and icon-only snapshot buttons come from v104, rebuilt with
their own modules rather than copied as one block, and with layout fixes over the prototype. The prototype is not in the
repository; the parity checks expect a local copy at `reference/openfutures-v90.html`. Markup, styles and behaviour match the prototype; everything
that looks like live data is still simulated and is meant to be replaced (see
[Integration points](#integration-points)).

## Commands

From the repository root, `pnpm dev` starts this app. From this folder:

```sh
pnpm dev          # dev server
pnpm build        # type-check and production build
pnpm typecheck
pnpm preview      # serve the production build
```

## Layout

```
src/
  main.tsx               entry; reads initial props from the URL hash
  App.tsx                root element and the list of screens and overlays
  assets/                logos and avatar, inlined as data URIs
  data/                  seed data: markets, venues, timeframes, account, prop
  lib/                   app-side helpers: price feed, trade history, avatars,
                         style parsing, image export
  terminal/
    Terminal.ts          controller: state, lifecycle, price tick, chart sync
    viewModel.ts         derives the view model (values and handlers) from state
    liquidity/           the Liquidity screen's view model, split by concern: vault
                         snapshots, the depositor's book, chart geometry, analytics,
                         funded traders; `buildLiquidityViewModel` becomes `vm.liq`
    useTerminal.ts       React hook that owns a Terminal and re-renders on change
    types.ts             AppProps, TerminalViewModel
  components/            presentational components, grouped by screen; `common/` holds
                         shared pieces (info tip, icon toggle, snapshot button, pager)
  styles/
    index.css            Tailwind entry and import order
    theme.css            Tailwind theme: colours, fonts, breakpoints, variants
    tokens.css           colour tokens for the dark and light themes
    base.css             element-level rules
    terminal/NN-*.css    the component styles, in cascade order
```

Domain types, formatting, seeded random, series and order-book maths live in
`packages/core` and are imported as `@openfutures/core`.

### How rendering works

`useTerminal(props)` creates one `Terminal`, which holds all UI state. On every state change it
calls `buildViewModel(terminal)`, which returns a single object: display-ready values plus the
event handlers. `App` passes that object to every component as `vm`. Components hold no state
and contain no logic beyond mapping `vm` to markup.

`TerminalViewModel` is inferred from `buildViewModel`, so a component that reads a key the view
model does not produce fails type-checking.

### Typing status

`strict` is on and the project type-checks with no suppressions. Domain data, helpers, the hook
and the component props are fully typed. Inside `Terminal.ts` and `viewModel.ts`, which are
ported from the prototype, state is `Record<string, any>` and many locals are annotated `any`.
Tightening those is the natural next step: start with a real `TerminalState` interface.

## Styling

Tailwind v4 is set up through `@tailwindcss/vite`.

- `theme.css` maps the design tokens into Tailwind, so `bg-surface`, `text-text-3`,
  `border-line-2`, `text-up` and so on work and follow the active theme. It also defines the
  breakpoints the layout uses (`xs` 380, `sm` 520, `md` 768, `lg` 1024, `xl` 1200, `2xl` 1600)
  and `dark:` / `light:` variants keyed on `data-theme`.
- The prototype's styles are class-based CSS, not utilities. They are kept as they were, split
  into ordered partials in `styles/terminal/` and loaded into Tailwind's `components` layer, so
  utilities added in markup override them.
- The partials are one stylesheet cut into pieces. Later rules override earlier ones, so keep
  the import order in `index.css`.
- Tailwind's preflight is not loaded: the design relies on browser defaults, and adding the
  reset changes the rendering.

New UI can be written with utilities; existing components can be migrated to utilities one at a
time, using the parity checks below to confirm nothing moved.

## Integration points

| What | Where | Today |
| --- | --- | --- |
| Markets, venues, timeframes | `src/data/` | static seed data |
| Prices | `src/lib/prices.ts`, ticked once a second from `Terminal.componentDidMount` | deterministic simulation that mutates `MARKETS` in place |
| Order book and fills | `packages/core/src/orderBook.ts` | simulated per market and venue |
| Positions, orders, history | `src/data/account.ts`, `src/data/prop.ts`; copied into `Terminal` state | seed data, changed only by local handlers |
| Liquidity vaults, deposits, funded traders | `src/data/liquidity.ts`, `src/terminal/liquidity/` | seeded and deterministic per day; deposits, withdrawals and early exits update `lqBook` in state. Penalty and earnings maths is in `packages/core/src/liquidity.ts` |
| Order placement, TP/SL, deposits, prop and vault actions | handlers in `src/terminal/viewModel.ts` | update local state and show a toast |
| Assistant | `aiEndpoint` prop | `POST { system, messages }`, expects `{ text }`; canned local answers when unset |
| In-app browser | `browseProxy` prop | loads `<proxy>?url=...`; disabled when unset |
| Chart | `Terminal.syncTv`, candles built in `viewModel.ts` and `packages/core/src/candles.ts` | TradingView Lightweight Charts (npm, v4.2.3) fed simulated candles; `Timeframe.history` sets how many are loaded. `tvWidget` swaps in the hosted TradingView widget |
| Routing | `syncUrl` prop | mirrors the screen to `/`, `/watch`, `/prop`, `/liquidity`, `/profile` |

Props are declared in `src/terminal/types.ts`. Preferences (theme, accent, routing, onboarding)
persist in `localStorage` under `openfutures-*` keys.

## Parity checks

`scripts/` holds the checks used to confirm the rebuild matches the prototype. They load both in
headless Chrome with a paused clock and seeded randomness.

```sh
npx serve -l 4801 reference        # the prototype
pnpm build && pnpm preview --port 4802

pnpm parity          # fixed states: DOM, computed styles of every element, pixels
pnpm parity:crawl    # scripted clicks and typing, DOM compared after every step
```

Pass a name prefix to run a subset, for example `pnpm parity m-` for mobile only.

The price chart is masked in the pixel comparison: it deliberately goes beyond the prototype,
which loaded the chart library from a CDN and showed about 90 candles with no history behind them.

## Behaviour carried over from the prototype

These are reproduced as they are in the prototype and are worth a decision before launch:

- The chart's drawing tools and indicator menu never appear. The object that drives them is
  overwritten before it reaches the view model (see the comment at `ta:` in `viewModel.ts`).
- `src/data/prop.ts` exports a prop trade history that nothing reads yet.
