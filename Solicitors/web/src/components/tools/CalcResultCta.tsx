"use client";

/**
 * Calculator result CTA for Accounts for Lawyers. Renders an inline qualified
 * lead capture at the moment of highest intent (the calculator result), so
 * visitors confirm their figures with a specialist in-flow rather than having
 * to scroll to the full contact form below.
 *
 * Embed variant: this component is only rendered when variant="page" via the
 * shared Calculator's resultCta prop, so /embed/[slug] is automatically excluded.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string; label?: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Confirm your figure with a specialist solicitors' accountant"
        blurb="Client account rules are unforgiving. Have a specialist check your position, confirm the number is right for your specific situation, and point out anything worth acting on. No obligation, and we reply within one working day."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-5 sm:p-6"
      />
    </div>
  );
}
