"use client";

import { MiniCapture } from "./MiniCapture";

/**
 * The in-flow ask under a calculator result. One of exactly TWO capture
 * surfaces on a calculator page, the other being the panel at the foot of the
 * page; both are in flow and neither is new. Do not add a third, and do not
 * change when either fires.
 *
 * Mounted only on the page variant (the shared renderer drops `resultCta` in
 * the embed), so a partner's iframe carries no form.
 */
export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Check your position with a crypto tax specialist"
        blurb="A calculator gives you the shape of the answer. We confirm your exact figures, the reliefs you can claim, and what you need to file. No obligation."
        submitLabel="Get my figures checked"
        /* Sits INSIDE the shared renderer's white card, which already carries a
           4px brand rule down its own left edge, so this one does not repeat it:
           a slate card with a ring is the edge it needs here. */
        className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6"
      />
    </div>
  );
}
