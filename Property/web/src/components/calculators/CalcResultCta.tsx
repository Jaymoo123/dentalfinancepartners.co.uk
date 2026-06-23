"use client";

/**
 * Calculator result CTA. Shipped default (was the calc_result_capture treatment):
 * the qualified capture at the moment of highest intent (the calculator result),
 * instead of the old trailing CTA link that dead-ended at ~0 leads.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function CalcResultCta({
  campaign,
  experimentKey,
  exposeOnView,
}: {
  campaign: string;
  label?: string;
  /** When set, this control-arm capture is measured under that experiment. */
  experimentKey?: string;
  exposeOnView?: boolean;
}) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <MiniCapture
        formId="calc_result"
        experimentKey={experimentKey}
        exposeOnView={exposeOnView}
        messagePrefix={`[Calculator result: ${campaign}]`}
        heading="Confirm your figure with a specialist"
        blurb="A calculator gives the shape of the answer. We confirm your exact figure and the legitimate ways to reduce it, with no obligation. Leave your details and we'll be in touch."
        submitLabel="Get my figure confirmed"
        className="rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-5 sm:p-6"
      />
    </div>
  );
}
