"use client";

/**
 * calc_result_capture experiment — what happens at the moment of highest intent
 * (the calculator result). control = the current trailing CTA link to /contact;
 * treatment = an inline email/phone capture right at the result, so the warm
 * "I just saw my number" intent is captured instead of clicking away. Drop-in
 * replacement for <PageResultCta> on the page (non-embed) calculator variants.
 */
import { useExperiment } from "@/components/experiments/useExperiment";
import { PageResultCta } from "./PageResultCta";
import { MiniCapture } from "@/components/forms/MiniCapture";

export function CalcResultCta({ campaign, label }: { campaign: string; label?: string }) {
  const variant = useExperiment("calc_result_capture");

  if (variant === "treatment") {
    return (
      <div className="mt-6 border-t border-slate-200 pt-5">
        <MiniCapture
          formId="calc_result"
          messagePrefix={`[Calculator result: ${campaign}]`}
          heading="Confirm your figure with a specialist"
          blurb="A calculator gives the shape of the answer. We confirm your exact figure and the legitimate ways to reduce it, with no obligation. Leave your details and we'll be in touch."
          submitLabel="Get my figure confirmed"
          className="rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-5 sm:p-6"
        />
      </div>
    );
  }

  // control + first render (null) = today's behaviour
  return <PageResultCta campaign={campaign} label={label} />;
}
