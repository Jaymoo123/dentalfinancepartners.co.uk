"use client";

import { MiniCapture } from "./MiniCapture";

/**
 * The ONE lead form that sits directly under the calculator result, mounted
 * through the kit's `resultCta` seam
 * (packages/web-shared/tools/components/Calculator.tsx, rendered only when
 * `variant === "page"`). Pre-existing, not a gate: the result renders in full
 * above it whether or not anyone fills this in.
 *
 * ADOPTION DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx.
 * It is a full-width band with its own tinted ground, eyebrow, title,
 * description and proof-point list, written to close a page. This mount sits
 * INSIDE the calculator card, immediately under the result panel, and its
 * heading and blurb are already published strings. Swapping it in would change
 * the shape of the surface and require authoring a second set of copy.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx, an
 * interruption, banned estate-wide.
 *
 * Every string below is unchanged.
 */
export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="border-t border-slate-200 pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Check your position with a startup tax specialist"
        blurb="A calculator gives you the shape of the answer. We confirm your exact figures, the reliefs you can claim, and what your business needs to file. No obligation, and we reply within one working day."
        submitLabel="Get my figures checked"
        className="rounded-2xl border-l-4 border-primary-600 bg-slate-50 p-5 sm:p-6"
      />
    </div>
  );
}
