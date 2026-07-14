"use client";

import { MiniCapture } from "./MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading="Check your position with a pharmacy finance specialist"
        blurb="A calculator gives you the shape of the answer. We confirm your exact figures, the reliefs you can claim, and what your business needs to file. No obligation, and we reply within one working day."
        submitLabel="Get my figures checked"
        className="rounded-2xl border-l-4 border-[var(--brand-primary)] bg-[var(--surface)] p-5 sm:p-6"
      />
    </div>
  );
}
