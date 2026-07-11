"use client";

/**
 * Result-gate lead capture: an inline qualified MiniCapture rendered at the
 * moment of highest intent (the calculator result). This is the estate's
 * A/B-winning treatment (Property result_gate_capture -> TREATMENT; CIS
 * CalcResultCta). Only rendered for variant="page", so /embed/[slug] is
 * automatically excluded.
 */
import { MiniCapture } from "./MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Check your position with a charity accounts specialist"
        blurb="A calculator gives you the shape of the answer. We confirm your exact figures, the reliefs you can claim, and what your trustees need to file. No obligation, and we reply within one working day."
        submitLabel="Get my figures checked"
        className="rounded-2xl border-l-4 border-[var(--brand-primary)] bg-[var(--surface)] p-5 sm:p-6"
      />
    </div>
  );
}
