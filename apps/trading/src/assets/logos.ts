import aapl from "./logos/aapl.svg?inline";
import binance from "./logos/binance.svg?inline";
import btc from "./logos/btc.svg?inline";
import doge from "./logos/doge.svg?inline";
import dydx from "./logos/dydx.svg?inline";
import eth from "./logos/eth.svg?inline";
import eurusd from "./logos/eurusd.svg?inline";
import gbpusd from "./logos/gbpusd.svg?inline";
import hype from "./logos/hype.svg?inline";
import lighter from "./logos/lighter.png?inline";
import nvda from "./logos/nvda.svg?inline";
import okx from "./logos/okx.svg?inline";
import pepe from "./logos/pepe.svg?inline";
import sol from "./logos/sol.svg?inline";
import sui from "./logos/sui.svg?inline";
import tsla from "./logos/tsla.svg?inline";
import us100 from "./logos/us100.svg?inline";
import us30 from "./logos/us30.svg?inline";
import us500 from "./logos/us500.svg?inline";
import usdjpy from "./logos/usdjpy.svg?inline";
import variational from "./logos/variational.svg?inline";
import wti from "./logos/wti.svg?inline";
import xau from "./logos/xau.svg?inline";
import xrp from "./logos/xrp.svg?inline";
import pfp from "./avatar.jpg?inline";

// Inlined as data URIs because the share-card and snapshot exports rasterise DOM through an
// SVG foreignObject, which cannot load external image URLs.
export const LOGOS: Record<string, string> = {
  aapl,
  binance,
  btc,
  doge,
  dydx,
  eth,
  eurusd,
  gbpusd,
  hype,
  lighter,
  nvda,
  okx,
  pepe,
  sol,
  sui,
  tsla,
  us100,
  us30,
  us500,
  usdjpy,
  variational,
  wti,
  xau,
  xrp,
  pfp,
};
