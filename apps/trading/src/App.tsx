import { ProfilePanel } from "@/components/account/ProfilePanel";
import { AiLauncher } from "@/components/ai/AiLauncher";
import { AiPanel } from "@/components/ai/AiPanel";
import { HomeDetailSheet } from "@/components/home/HomeDetailSheet";
import { HomePage } from "@/components/home/HomePage";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { LiquidityPage } from "@/components/liquidity/LiquidityPage";
import { AssetDetailsSheet } from "@/components/overlays/AssetDetailsSheet";
import { Celebration } from "@/components/overlays/Celebration";
import { FundSheet } from "@/components/overlays/FundSheet";
import { InAppBrowser } from "@/components/overlays/InAppBrowser";
import { SearchPalette } from "@/components/overlays/SearchPalette";
import { SettingsSheet } from "@/components/overlays/SettingsSheet";
import { ShareSheet } from "@/components/overlays/ShareSheet";
import { Toast } from "@/components/overlays/Toast";
import { TpSlSheet } from "@/components/overlays/TpSlSheet";
import { PropPage } from "@/components/prop/PropPage";
import { MobileBar } from "@/components/shell/MobileBar";
import { TabBar } from "@/components/shell/TabBar";
import { Ticker } from "@/components/shell/Ticker";
import { Topbar } from "@/components/shell/Topbar";
import { TradeLayout } from "@/components/trade/TradeLayout";
import { WatchDetailSheet } from "@/components/watch/WatchDetailSheet";
import { WatchPage } from "@/components/watch/WatchPage";
import { useTerminal } from "@/terminal/useTerminal";

export function App(props: any) {
  const vm = useTerminal(props);
  return (
    <div
      className={vm.appCls}
      data-chartfs={vm.chartFsState}
      data-ai={vm.aiLaunchState}
      data-theme={vm.theme}
      data-accent={vm.accentKey}
      data-screen={vm.screen}
      data-sheet={vm.sheet}
      data-drawer={vm.drawer}
      data-vpanel={vm.vpanelState}
      data-profile={vm.profileState}
      data-account={vm.account}
      data-wsheet={vm.wsheetState}
    >
      <Topbar vm={vm} />
      <Ticker vm={vm} />
      <TradeLayout vm={vm} />
      <ProfilePanel vm={vm} />
      <HomePage vm={vm} />
      <WatchPage vm={vm} />
      {vm.wsheetOpen ? <WatchDetailSheet vm={vm} /> : null}
      <PropPage vm={vm} />
      <LiquidityPage vm={vm} />
      {vm.fund?.open ? <FundSheet vm={vm} /> : null}
      {vm.sh?.open ? <ShareSheet vm={vm} /> : null}
      {vm.ts?.open ? <TpSlSheet vm={vm} /> : null}
      {vm.toast?.show ? <Toast vm={vm} /> : null}
      {vm.asd?.open ? <AssetDetailsSheet vm={vm} /> : null}
      {vm.cel?.show ? <Celebration vm={vm} /> : null}
      {vm.st?.open ? <SettingsSheet vm={vm} /> : null}
      {vm.ob?.open ? <Onboarding vm={vm} /> : null}
      {vm.iab?.open ? <InAppBrowser vm={vm} /> : null}
      {vm.home?.det?.open ? <HomeDetailSheet vm={vm} /> : null}
      {vm.ai?.showLauncher ? <AiLauncher vm={vm} /> : null}
      {vm.ai?.isOpen ? <AiPanel vm={vm} /> : null}
      <TabBar vm={vm} />
      {vm.srch?.isOpen ? <SearchPalette vm={vm} /> : null}
      <MobileBar vm={vm} />
      <button type="button" className="scrim" aria-label="Close" onClick={vm.closeAll} />
    </div>
  );
}
