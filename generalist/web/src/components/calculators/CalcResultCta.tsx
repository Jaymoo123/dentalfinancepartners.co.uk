"use client";

/**
 * Calculator result CTA for Holloway Davies. Renders an inline qualified lead
 * capture at the moment of highest intent (the calculator result), so users
 * convert in-flow rather than having to scroll to the full form below.
 *
 * Embed variant: this component is only rendered when variant="page" via the
 * shared Calculator's resultCta prop, so /embed/[slug] is automatically excluded.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { calculatorMessagePrefix } from "@/lib/lead-message";

export function CalcResultCta({ campaign }: { campaign: string; label?: string }) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={calculatorMessagePrefix(campaign)}
        heading="Sense-check your figure with an accountant"
        blurb="Calculators give you a solid starting point, but the final number depends on timing, reliefs you may not have considered, and how different taxes interact. A quick conversation with one of our accountants puts a firm figure on it, with no obligation."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-orange-500 bg-slate-50 p-5 sm:p-6"
      />
    </div>
  );
}
