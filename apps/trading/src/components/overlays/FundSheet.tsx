import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function FundSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button type="button" className="fd-scrim" aria-label="Close" onClick={vm.fund?.close} />
      <div className="fd-sheet" role="dialog" aria-label={vm.fund?.title}>
        <span className="hm-grab" aria-hidden="true" />
        <div className="fd-head">
          {vm.fund?.hasBack ? (
            <>
              <button type="button" className="fd-hbtn" aria-label="Back" onClick={vm.fund?.back}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </>
          ) : null}
          <h2>{vm.fund?.title}</h2>
          <button
            type="button"
            className="fd-hbtn fd-x"
            aria-label="Close"
            onClick={vm.fund?.close}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        {vm.fund?.isDepositList ? (
          <>
            <div className="fd-list">
              <button type="button" className="fd-opt" onClick={vm.fund?.pickCrypto}>
                <span className="fd-txt">
                  <b>Crypto</b>
                  <small>Receive USDC from any wallet</small>
                </span>
                <span className="fd-ic">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4" />
                  </svg>
                </span>
              </button>
              <button type="button" className="fd-opt" onClick={vm.fund?.soon}>
                <span className="fd-txt">
                  <b>
                    Apple Pay<span className="fd-badge">New</span>
                  </b>
                  <small>Buy USDC instantly, no wallet needed</small>
                </span>
                <span className="fd-ic">
                  <svg width="58" height="34" viewBox="0 4.5 24 15" aria-hidden="true">
                    <path
                      style={{ fill: "currentColor" }}
                      d="M2.15 4.318a42.16 42.16 0 0 0-.454.003c-.15.005-.303.013-.452.04a1.44 1.44 0 0 0-1.06.772c-.07.138-.114.278-.14.43-.028.148-.037.3-.04.45A10.2 10.2 0 0 0 0 6.222v11.557c0 .07.002.138.003.207.004.15.013.303.04.452.027.15.072.291.142.429a1.436 1.436 0 0 0 .63.63c.138.07.278.115.43.142.148.027.3.036.45.04l.208.003h20.194l.207-.003c.15-.004.303-.013.452-.04.15-.027.291-.071.428-.141a1.432 1.432 0 0 0 .631-.631c.07-.138.115-.278.141-.43.027-.148.036-.3.04-.45.002-.07.003-.138.003-.208l.001-.246V6.221c0-.07-.002-.138-.004-.207a2.995 2.995 0 0 0-.04-.452 1.446 1.446 0 0 0-1.2-1.201 3.022 3.022 0 0 0-.452-.04 10.448 10.448 0 0 0-.453-.003zm0 .512h19.942c.066 0 .131.002.197.003.115.004.25.01.375.032.109.02.2.05.287.094a.927.927 0 0 1 .407.407.997.997 0 0 1 .094.288c.022.123.028.258.031.374.002.065.003.13.003.197v11.552c0 .065 0 .13-.003.196-.003.115-.009.25-.032.375a.927.927 0 0 1-.5.693 1.002 1.002 0 0 1-.286.094 2.598 2.598 0 0 1-.373.032l-.2.003H1.906c-.066 0-.133-.002-.196-.003a2.61 2.61 0 0 1-.375-.032c-.109-.02-.2-.05-.288-.094a.918.918 0 0 1-.406-.407 1.006 1.006 0 0 1-.094-.288 2.531 2.531 0 0 1-.032-.373 9.588 9.588 0 0 1-.002-.197V6.224c0-.065 0-.131.002-.197.004-.114.01-.248.032-.375.02-.108.05-.199.094-.287a.925.925 0 0 1 .407-.406 1.03 1.03 0 0 1 .287-.094c.125-.022.26-.029.375-.032.065-.002.131-.002.196-.003zm4.71 3.7c-.3.016-.668.199-.88.456-.191.22-.36.58-.316.918.338.03.675-.169.888-.418.205-.258.345-.603.308-.955zm2.207.42v5.493h.852v-1.877h1.18c1.078 0 1.835-.739 1.835-1.812 0-1.07-.742-1.805-1.808-1.805zm.852.719h.982c.739 0 1.161.396 1.161 1.089 0 .692-.422 1.092-1.164 1.092h-.979zm-3.154.3c-.45.01-.83.28-1.05.28-.235 0-.593-.264-.981-.257a1.446 1.446 0 0 0-1.23.747c-.527.908-.139 2.255.374 2.995.249.366.549.769.944.754.373-.014.52-.242.973-.242.454 0 .586.242.98.235.41-.007.667-.366.915-.733.286-.417.403-.82.41-.841-.007-.008-.79-.308-.797-1.209-.008-.754.615-1.113.644-1.135-.352-.52-.9-.578-1.09-.593a1.123 1.123 0 0 0-.092-.002zm8.204.397c-.99 0-1.606.533-1.652 1.256h.777c.072-.358.369-.586.845-.586.502 0 .803.266.803.711v.309l-1.097.064c-.951.054-1.488.484-1.488 1.184 0 .72.548 1.207 1.332 1.207.526 0 1.032-.281 1.264-.727h.019v.659h.788v-2.76c0-.803-.62-1.317-1.591-1.317zm1.94.072l1.446 4.009c0 .003-.073.24-.073.247-.125.41-.33.571-.711.571-.069 0-.206 0-.267-.015v.666c.06.011.267.019.335.019.83 0 1.226-.312 1.568-1.283l1.5-4.214h-.868l-1.012 3.259h-.015l-1.013-3.26zm-1.167 2.189v.316c0 .521-.45.917-1.024.917-.442 0-.731-.228-.731-.579 0-.342.278-.56.769-.593z"
                    />
                  </svg>
                </span>
              </button>
              <button type="button" className="fd-opt" onClick={vm.fund?.soon}>
                <span className="fd-txt">
                  <b>Debit card</b>
                  <small>Deposit cash with a debit card</small>
                </span>
                <span className="fd-ic">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{ fill: "none" }}
                  >
                    <rect
                      x="2.5"
                      y="5"
                      width="19"
                      height="14"
                      rx="3"
                      style={{ fill: "currentColor" }}
                    />
                    <rect
                      x="2.5"
                      y="8.5"
                      width="19"
                      height="2.4"
                      style={{ fill: "var(--raised)" }}
                    />
                    <rect
                      x="5.5"
                      y="14"
                      width="5"
                      height="1.8"
                      rx="0.9"
                      style={{ fill: "var(--raised)" }}
                    />
                  </svg>
                </span>
              </button>
              <button type="button" className="fd-opt" onClick={vm.fund?.soon}>
                <span className="fd-txt">
                  <b>Exchanges and apps</b>
                  <small>Coinbase, Binance, Cash App</small>
                </span>
                <span className="fd-ic">
                  <span className="fd-apps">
                    <span className="fd-app cb">
                      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          style={{ fill: "#ffffff" }}
                          fillRule="evenodd"
                          d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-3 6.2a.8.8 0 0 1 .8-.8h4.4a.8.8 0 0 1 .8.8v5.6a.8.8 0 0 1-.8.8H9.8a.8.8 0 0 1-.8-.8z"
                        />
                      </svg>
                    </span>
                    <span className="fd-app bn">
                      <img src={vm.fund?.binanceLogo} alt="" width="24" height="24" />
                    </span>
                    <span className="fd-app ca">
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          style={{ fill: "#ffffff" }}
                          d="M23.59 3.475a5.1 5.1 0 00-3.05-3.05c-1.31-.42-2.5-.42-4.92-.42H8.36c-2.4 0-3.61 0-4.9.4a5.1 5.1 0 00-3.05 3.06C0 4.765 0 5.965 0 8.365v7.27c0 2.41 0 3.6.4 4.9a5.1 5.1 0 003.05 3.05c1.3.41 2.5.41 4.9.41h7.28c2.41 0 3.61 0 4.9-.4a5.1 5.1 0 003.06-3.06c.41-1.3.41-2.5.41-4.9v-7.25c0-2.41 0-3.61-.41-4.91zm-6.17 4.63l-.93.93a.5.5 0 01-.67.01 5 5 0 00-3.22-1.18c-.97 0-1.94.32-1.94 1.21 0 .9 1.04 1.2 2.24 1.65 2.1.7 3.84 1.58 3.84 3.64 0 2.24-1.74 3.78-4.58 3.95l-.26 1.2a.49.49 0 01-.48.39H9.63l-.09-.01a.5.5 0 01-.38-.59l.28-1.27a6.54 6.54 0 01-2.88-1.57v-.01a.48.48 0 010-.68l1-.97a.49.49 0 01.67 0c.91.86 2.13 1.34 3.39 1.32 1.3 0 2.17-.55 2.17-1.42 0-.87-.88-1.1-2.54-1.72-1.76-.63-3.43-1.52-3.43-3.6 0-2.42 2.01-3.6 4.39-3.71l.25-1.23a.48.48 0 01.48-.38h1.78l.1.01c.26.06.43.31.37.57l-.27 1.37c.9.3 1.75.77 2.48 1.39l.02.02c.19.2.19.5 0 .68z"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </>
        ) : null}
        {vm.fund?.isWithdrawList ? (
          <>
            <p className="fd-avail num">
              Available to withdraw <b>{vm.fund?.available}</b>
            </p>
            <div className="fd-list">
              <button type="button" className="fd-opt" onClick={vm.fund?.pickCrypto}>
                <span className="fd-txt">
                  <b>Crypto wallet</b>
                  <small>Send USDC to any address</small>
                </span>
                <span className="fd-ic">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4" />
                  </svg>
                </span>
              </button>
              <button type="button" className="fd-opt" onClick={vm.fund?.soon}>
                <span className="fd-txt">
                  <b>Bank account</b>
                  <small>Cash out to your bank in 1 to 2 days</small>
                </span>
                <span className="fd-ic">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <path d="M3 10 12 4l9 6" />
                    <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
                  </svg>
                </span>
              </button>
              <button type="button" className="fd-opt" onClick={vm.fund?.soon}>
                <span className="fd-txt">
                  <b>Exchanges and apps</b>
                  <small>Coinbase, Binance</small>
                </span>
                <span className="fd-ic">
                  <span className="fd-apps">
                    <span className="fd-app cb">
                      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          style={{ fill: "#ffffff" }}
                          fillRule="evenodd"
                          d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-3 6.2a.8.8 0 0 1 .8-.8h4.4a.8.8 0 0 1 .8.8v5.6a.8.8 0 0 1-.8.8H9.8a.8.8 0 0 1-.8-.8z"
                        />
                      </svg>
                    </span>
                    <span className="fd-app bn">
                      <img src={vm.fund?.binanceLogo} alt="" width="24" height="24" />
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </>
        ) : null}
        {vm.fund?.isCrypto ? (
          <>
            <div className="fd-step">
              <span className="fd-lbl">Network</span>
              <div className="fd-nets" role="group" aria-label="Network">
                {(vm.fund?.nets || []).map((net: any, i: any) => (
                  <Fragment key={i}>
                    <button
                      type="button"
                      className={net?.cls}
                      aria-pressed={net?.pressed}
                      onClick={net?.pick}
                    >
                      {net?.label}
                    </button>
                  </Fragment>
                ))}
              </div>
              {vm.fund?.isDep ? (
                <>
                  <span className="fd-lbl">Your USDC deposit address on {vm.fund?.netName}</span>
                  <div className="fd-addr">
                    <code className="num">{vm.fund?.address}</code>
                    <button type="button" className="fd-copy" onClick={vm.fund?.copy}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ fill: "none", stroke: "currentColor" }}
                      >
                        <rect x="9" y="9" width="12" height="12" rx="2" />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                      {vm.fund?.copyLabel}
                    </button>
                  </div>
                  <p className="fd-note">
                    Send only USDC on {vm.fund?.netName} to this address. Deposits arrive after{" "}
                    {vm.fund?.confs} and are credited to your {vm.fund?.acctName}.
                  </p>
                </>
              ) : null}
              {vm.fund?.isWd ? (
                <>
                  <label className="fd-lbl" htmlFor="wd-addr">
                    Destination address
                  </label>
                  <input
                    id="wd-addr"
                    className="fd-input"
                    type="text"
                    placeholder="0x..."
                    value={vm.fund?.wdAddr ?? ""}
                    onChange={vm.fund?.onWdAddr}
                  />
                  <label className="fd-lbl" htmlFor="wd-amt">
                    Amount
                  </label>
                  <div className="fd-amt">
                    <input
                      id="wd-amt"
                      className="fd-input num"
                      type="text"
                      placeholder="0.00"
                      value={vm.fund?.wdAmt ?? ""}
                      onChange={vm.fund?.onWdAmt}
                    />
                    <span>USDC</span>
                    <button type="button" className="fd-max" onClick={vm.fund?.max}>
                      Max
                    </button>
                  </div>
                  <p className="fd-note num">
                    Network fee about {vm.fund?.fee}. You receive {vm.fund?.receive}.
                  </p>
                  <button
                    type="button"
                    className="cta fd-cta"
                    disabled={!!vm.fund?.wdDisabled}
                    onClick={vm.fund?.submit}
                  >
                    {vm.fund?.wdCta}
                  </button>
                </>
              ) : null}
            </div>
          </>
        ) : null}
        {vm.fund?.hasToast ? (
          <>
            <p className="fd-toast" role="status">
              {vm.fund?.toast}
            </p>
          </>
        ) : null}
      </div>
    </>
  );
}
