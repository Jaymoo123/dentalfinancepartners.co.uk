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
import { useExperimentInView, trackExperimentAction } from "@/lib/experiments/exposure";

export function CalcResultCta({ campaign, label }: { campaign: string; label?: string }) {
  const variant = useExperiment("calc_result_capture");
  // Control exposure/action (the link). Treatment is instrumented inside MiniCapture.
  const controlRef = useExperimentInView<HTMLDivElement>("calc_result_capture", "calc_result");

  if (variant === "treatment") {
    return (
      <div className="mt-6 border-t border-slate-200 pt-5">
        <MiniCapture
          formId="calc_result"
          experimentKey="calc_result_capture"
          messagePrefix={`[Calculator result: ${campaign}]`}
          heading="Confirm your figure with a specialist"
          blurb="A calculator gives the shape of the answer. We confirm your exact figure and the legitimate ways to reduce it, with no obligation. Leave your details and we'll be in touch."
          submitLabel="Get my figure confirmed"
          className="rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-5 sm:p-6"
        />
      </div>
    );
  }

  // control + first render (null) = today's behaviour: the result CTA link.
  // Building block = clicking that CTA (heads to the lead form).
  return (
    <div
      ref={controlRef}
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest("a[data-cta]")) {
          trackExperimentAction("calc_result_capture", "calc_result");
        }
      }}
    >
      <PageResultCta campaign={campaign} label={label} />
    </div>
  );
}
