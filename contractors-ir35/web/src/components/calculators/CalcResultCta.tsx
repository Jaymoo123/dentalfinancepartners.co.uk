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

// Card recipe: one radius, hairline ring. `rounded-2xl` plus a 4px border was
// the pre-redesign recipe. primary-600 #0e7490 on neutral-50 #fafafa = 5.13.
export function CalcResultCta({ campaign }: { campaign: string; label?: string }) {
  return (
    <div className="mt-6 border-t border-neutral-200 pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Confirm your figure with a contractor specialist"
        blurb="Estimates get you close. A specialist confirms your exact position, the most tax-efficient salary, dividend and pension split, and your IR35 status. No obligation, and no hard sell."
        submitLabel="Get my figure checked"
        className="rounded-xl border-l-4 border-primary-600 bg-neutral-50 p-5 ring-1 ring-neutral-200/70 sm:p-6"
      />
    </div>
  );
}
