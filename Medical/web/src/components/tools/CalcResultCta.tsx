"use client";

/**
 * Calculator result CTA for Medical Accountants UK. Renders an inline
 * qualified lead capture at the moment of highest intent (the calculator
 * result), so visitors confirm their figures with a specialist medical
 * accountant in-flow rather than having to scroll to the full contact form.
 *
 * Styled with Medical CSS variable tokens (var(--copper), var(--navy)).
 * No new npm dependencies.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}] `}
        heading="Sense-check your figure with a specialist medical accountant"
        blurb="NHS pensions, private practice tax, and incorporation are unforgiving in the detail. Have a specialist review your position, confirm the number is right for your specific situation, and flag anything worth acting on. No obligation, and we reply within one working day."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-[var(--copper)] bg-[var(--surface-elevated)] p-5 sm:p-6"
      />
    </div>
  );
}
