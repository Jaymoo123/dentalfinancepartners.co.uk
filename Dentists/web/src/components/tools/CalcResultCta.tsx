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
        blurb="A calculator works from what you type into it. NHS pensions and practice tax are unforgiving in the detail, so have a specialist confirm the figure holds for your actual contract and income mix, and flag anything worth acting on before a deadline fixes it. No obligation."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-5 sm:p-6"
      />
    </div>
  );
}
