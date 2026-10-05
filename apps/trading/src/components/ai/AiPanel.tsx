import { Fragment } from "react";
import type { AriaBoolean, TerminalViewModel } from "@/terminal/types";

export function AiPanel({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <button
        type="button"
        className="ai-scrim"
        aria-label="Close assistant"
        onClick={vm.ai?.close}
      />
      <section className={vm.ai?.panelCls} role="dialog" aria-label="OpenFutures AI">
        <header className="ai-head">
          <button
            type="button"
            className="ai-chats-btn"
            aria-haspopup="menu"
            aria-expanded={vm.ai?.menuOpenStr as AriaBoolean}
            onClick={vm.ai?.toggleMenu}
          >
            <span>{vm.ai?.title}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <span className="ai-head-r">
            <button type="button" className="ai-hb" aria-label="New chat" onClick={vm.ai?.newChat}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              className="ai-hb ai-expand"
              aria-label={vm.ai?.expandLabel}
              onClick={vm.ai?.toggleExpand}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <rect x="4" y="4" width="16" height="16" rx="1" />
                <path d="M4 15h16" />
              </svg>
            </button>
            <button type="button" className="ai-hb" aria-label="Minimize" onClick={vm.ai?.close}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="M5 12h14" />
              </svg>
            </button>
          </span>
          {vm.ai?.menuOpen ? (
            <>
              <div className="ai-menu" role="menu">
                {(vm.ai?.chats || []).map((chat: any, i: any) => (
                  <Fragment key={i}>
                    <button
                      type="button"
                      role="menuitem"
                      className={chat?.cls}
                      onClick={chat?.pick}
                    >
                      <b>{chat?.title}</b>
                      <small>{chat?.meta}</small>
                    </button>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
        </header>
        <div className="ai-body" id="ai-body">
          {vm.ai?.empty ? (
            <>
              <div className="ai-hello">
                <span className="ai-mark lg">
                  <svg width="30" height="30" viewBox="-6 -6 112 112" aria-hidden="true">
                    <path
                      className="bmark-g"
                      fillRule="evenodd"
                      d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
                    />
                  </svg>
                </span>
                <div>
                  <b>OpenFutures AI</b>
                  <p>
                    Ask about markets, funding, venues or your own positions. Answers use the live
                    data on this screen.
                  </p>
                </div>
              </div>
            </>
          ) : null}
          {(vm.ai?.msgs || []).map((msg: any, i: any) => (
            <Fragment key={i}>
              <div className={msg?.cls}>
                {msg != null && msg.isAi ? (
                  <>
                    <span className="ai-mark sm">
                      <svg width="14" height="14" viewBox="-6 -6 112 112" aria-hidden="true">
                        <path
                          className="bmark-g"
                          fillRule="evenodd"
                          d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
                        />
                      </svg>
                    </span>
                  </>
                ) : null}
                <div className="ai-bubble">
                  {(msg?.lines || []).map((line: any, i2: any) => (
                    <Fragment key={i2}>
                      <p className={line?.cls}>{line?.text}</p>
                    </Fragment>
                  ))}
                  {msg != null && msg.canCopy ? (
                    <>
                      <button type="button" className="ai-copy" onClick={msg?.copy}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          style={{ fill: "none", stroke: "currentColor" }}
                        >
                          <rect x="9" y="9" width="12" height="12" rx="1" />
                          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </svg>
                        Copy
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        {vm.ai?.empty ? (
          <>
            <div className="ai-sugg" aria-label="Suggestions">
              {(vm.ai?.rows || []).map((row: any, i: any) => (
                <Fragment key={i}>
                  <div className="ai-row">
                    <div className={row?.cls}>
                      {(row?.items || []).map((item: any, i2: any) => (
                        <Fragment key={i2}>
                          <button
                            type="button"
                            className="ai-chip"
                            tabIndex={item?.tab}
                            aria-hidden={item?.hidden}
                            onClick={item?.ask}
                          >
                            <span className="ai-chip-ic">{item?.ic}</span>
                            {item?.label}
                          </button>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </>
        ) : null}
        <form className="ai-input" onSubmit={vm.ai?.submit}>
          <input
            type="text"
            placeholder="Ask OpenFutures AI"
            aria-label="Ask OpenFutures AI"
            value={vm.ai?.input ?? ""}
            onChange={vm.ai?.onInput}
            maxLength={400}
          />
          {vm.ai?.busy ? (
            <>
              <button
                type="button"
                className="ai-send stop"
                aria-label="Stop"
                onClick={vm.ai?.stop}
              >
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
                  <rect x="7" y="7" width="10" height="10" rx="1" />
                </svg>
              </button>
            </>
          ) : null}
          {vm.ai?.idle ? (
            <>
              <button
                type="submit"
                className="ai-send"
                aria-label="Send"
                disabled={!!vm.ai?.sendDisabled}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="M12 19V5" />
                  <path d="m6 11 6-6 6 6" />
                </svg>
              </button>
            </>
          ) : null}
        </form>
        <footer className="ai-foot">
          <span className="num">{vm.ai?.left} questions left today</span>
          <span>Early access. Not financial advice.</span>
        </footer>
      </section>
    </>
  );
}
