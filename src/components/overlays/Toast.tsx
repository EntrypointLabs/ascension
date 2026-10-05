import type { TerminalViewModel } from "@/terminal/types";

export function Toast({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="toast" role="status">
        {vm.toast?.text}
      </div>
    </>
  );
}
