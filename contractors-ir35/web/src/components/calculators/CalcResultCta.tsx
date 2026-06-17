"use client";

/**
 * Calculator result CTA for contractors-ir35. Renders an inline qualified lead
 * capture at the moment of highest intent (the calculator result), so users
 * convert in-flow rather than having to scroll to the full form below.
 *
 * Embed variant: this component is only rendered when variant="page" via the
 * shared Calculator's resultCta prop, so /embed/[slug] is automatically excluded.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string; label?: string }) {
  return (
    <div className="mt-6 border-t border-neutral-200 pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Confirm your figure with a contractor specialist"
        blurb="Estimates get you close. A specialist confirms your exact position, the most tax-efficient salary, dividend and pension split, and your IR35 status. No obligation, and we reply within one working day."
        submitLabel="Get my figure checked"
        className="rounded-2xl border-l-4 border-cyan-700 bg-neutral-50 p-5 sm:p-6"
      />
    </div>
  );
}
