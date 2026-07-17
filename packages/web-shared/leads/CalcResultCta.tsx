"use client";

import type { MiniCaptureConfig, MiniCaptureSubmitFn } from "./MiniCapture";
import { MiniCapture } from "./MiniCapture";

export function CalcResultCta({
  campaign,
  experimentKey,
  exposeOnView,
  siteConfig,
  submitLead,
  onExperimentView,
  onExperimentAction,
}: {
  campaign: string;
  label?: string;
  experimentKey?: string;
  exposeOnView?: boolean;
  siteConfig: MiniCaptureConfig;
  submitLead: MiniCaptureSubmitFn;
  onExperimentView?: (key: string, formId: string) => void;
  onExperimentAction?: (key: string, formId: string) => void;
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
        className="rounded-2xl border-l-4 border-[var(--brand-primary)] bg-slate-50 p-5 sm:p-6"
        postSubmit="redirect"
        siteConfig={siteConfig}
        submitLead={submitLead}
        onExperimentView={onExperimentView}
        onExperimentAction={onExperimentAction}
      />
    </div>
  );
}
