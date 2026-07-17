"use client";

/**
 * Result-gate interstitial: shown once per session when a reader presses
 * "See your result" on an in-blog calculator. Offers qualified capture before
 * revealing the figure, with a de-emphasized escape so the result is NEVER
 * walled off. Closing any way (escape link, X, backdrop, Esc) reveals the
 * result; submitting also marks the visitor converted.
 */
import { useCallback, useEffect, useRef } from "react";
import { track } from "../analytics/track";
import type { MiniCaptureConfig, MiniCaptureSubmitFn } from "./MiniCapture";
import { MiniCapture } from "./MiniCapture";

export function ResultGateModal({
  campaign,
  onReveal,
  topicCtaCopy,
  siteConfig,
  submitLead,
}: {
  campaign: string;
  onReveal: () => void;
  /** Resolved topic CTA heading (caller provides; falls back to generic copy). */
  topicCtaCopy?: string;
  siteConfig: MiniCaptureConfig;
  submitLead: MiniCaptureSubmitFn;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const skip = useCallback(() => {
    track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" });
    onReveal();
  }, [onReveal]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc_result_gate-heading"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) skip();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-lg border-l-4 border-[var(--brand-primary)] bg-white p-6 shadow-2xl outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={skip}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          aria-label="Skip and show my result"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Before you see your result</p>

        <MiniCapture
          formId="calc_result_gate"
          messagePrefix={`[Result gate: ${campaign}]`}
          heading={topicCtaCopy || "Want a specialist to check your figure?"}
          blurb="A calculator gives the shape of the answer. Tell us your situation and a specialist will confirm your exact figure and the legitimate ways to reduce it, with no obligation."
          submitLabel="Get my figure confirmed"
          successText="Sent. Check your email and phone now, we have just messaged you to arrange your free review."
          className="mt-2"
          messagePlaceholder="The more detail the better. Tell us about your situation, rough figures, and what you're trying to work out. A couple of sentences is ideal."
          onSuccess={() => window.setTimeout(onReveal, 1800)}
          siteConfig={siteConfig}
          submitLead={submitLead}
        />

        <button
          type="button"
          onClick={skip}
          className="mt-4 block w-full text-center text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
        >
          No thanks, just show my result
        </button>
      </div>
    </div>
  );
}
