interface Window {
  /** Present once the hosted TradingView widget script has loaded. */
  TradingView?: any;
  /** Optional host bridge; when present it supplies sample data and a download helper. */
  claude?: { use?: (capability: string) => Promise<any> };
  __ofFontCss?: Promise<string>;
}

interface Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
}
