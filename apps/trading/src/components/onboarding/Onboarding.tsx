import { TermsStep } from "@/components/onboarding/TermsStep";
import { TourStep } from "@/components/onboarding/TourStep";
import type { TerminalViewModel } from "@/terminal/types";

export function Onboarding({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="ob-scrim" aria-hidden="true" />
      <section className="onb" role="dialog" aria-modal="true" aria-label="Welcome to OpenFutures">
        {vm.ob?.isTerms ? <TermsStep vm={vm} /> : null}
        {vm.ob?.isTour ? <TourStep vm={vm} /> : null}
      </section>
    </>
  );
}
