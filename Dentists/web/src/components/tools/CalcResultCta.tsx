"use client";

/**
 * Calculator result CTA for Dental Finance Partners. Renders an inline qualified
 * lead capture at the moment of highest intent (the calculator result), so
 * visitors confirm their figures with a specialist dental accountant in-flow
 * rather than having to scroll to the full contact form below.
 *
 * Styled with Dentists CSS variable tokens (var(--gold), var(--navy)).
 * No new npm dependencies.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string; label?: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Confirm your figure with a specialist dental accountant"
        blurb="NHS pensions and practice tax are unforgiving in the detail. Have a specialist check your position, confirm the number is right for your specific situation, and point out anything worth acting on. No obligation, and we reply within one working day."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-5 sm:p-6"
      />
    </div>
  );
}
