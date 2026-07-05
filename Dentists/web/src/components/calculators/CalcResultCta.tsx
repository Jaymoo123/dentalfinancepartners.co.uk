"use client";

/**
 * Calculator result CTA for Dental Finance Partners. Renders an inline
 * qualified lead capture at the moment of highest intent (the calculator
 * result), so users convert in-flow rather than having to scroll to the full
 * form below.
 *
 * Embed variant: this component is only rendered when variant="page" via the
 * shared Calculator's resultCta prop, so /embed/[slug] is automatically excluded.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { calculatorMessagePrefix } from "@/lib/lead-message";

export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={calculatorMessagePrefix(campaign)}
        heading="Sense-check your figure with a specialist dental accountant"
        blurb="Calculators give you a solid starting point, but the final number depends on your NHS Pension status, prior-year reliefs, and how different taxes interact in your specific structure. A short conversation with a dental-specialist accountant puts a firm figure on it, with no obligation."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface)] p-5 sm:p-6"
      />
    </div>
  );
}
