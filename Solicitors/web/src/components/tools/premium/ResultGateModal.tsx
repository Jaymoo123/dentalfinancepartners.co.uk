"use client";

/**
 * Result-gate interstitial for the Solicitors premium calculator tier.
 *
 * Shown at most once per session when a reader presses "See your result" on an
 * in-blog premium calculator. Offers a qualified capture before revealing the
 * figure, with an always-present escape so the result is NEVER walled off:
 *   - Submitting the form reveals the result and marks the visitor converted.
 *   - Closing any way (X button, "No thanks" link, backdrop click, Esc key)
 *     reveals the result without capture.
 *   - This gate is in-blog only; calculator-page and embed placements never gate.
 *
 * Behaviour matches Property's ResultGateModal exactly. Styled with Solicitors
 * CSS variable tokens; no new npm dependencies.
 *
 * Event discipline: only allowlisted event names (packages/web-shared/analytics/types.ts).
 *   - Dismiss fires cta_click with cta_id="result_gate_skip".
 *   - Submission fires form_start / form_submit / lead_submitted via MiniCapture.
 */
import { useCallback, useEffect, useRef } from "react";
import { track } from "@accounting-network/web-shared/analytics/track";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import { MiniCapture } from "@/components/forms/MiniCapture";

export function ResultGateModal({
  campaign,
  topicKey = null,
  onReveal,
}: {
  /** Calculator id (toolId), for the lead message + the skip diagnostic. */
  campaign: string;
  /** Resolved intent topic, threaded down from PremiumUpgrade (never re-derived from the URL). */
  topicKey?: TopicKey | null;
  /** Reveal the result + close the gate. Called on submit and on every dismiss. */
  onReveal: () => void;
}) {
  const topic = topicKey ? getTopic(topicKey) : null;

  const dialogRef = useRef<HTMLDivElement>(null);

  // Dismiss: reveal the result and record a cta_click (skip diagnostic).
  // Tracked manually so backdrop + Esc are counted too; buttons carry NO data-cta
  // to avoid double-counting from the autocapture layer.
  const skip = useCallback(() => {
    track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" });
    onReveal();
  }, [onReveal]);

  // Focus the dialog container once on open (NOT a form field, which would fire a
  // false form-start event).
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  // Escape key dismisses and reveals.
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
        className="relative w-full max-w-lg border-l-4 border-[var(--primary)] bg-white p-6 shadow-2xl outline-none sm:p-8 rounded-xl"
      >
        {/* X close button */}
        <button
          type="button"
          onClick={skip}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Skip and show my result"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p
          id="calc_result_gate-heading"
          className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]"
        >
          Before you see your result
        </p>

        <MiniCapture
          formId="calc_result_gate"
          messagePrefix={`[Result gate: ${campaign}]`}
          heading={
            topic?.ctaCopy ||
            "Want a specialist to check your figure?"
          }
          blurb="A calculator gives the shape of the answer. Client account rules and partner tax are unforgiving in the detail. Tell us your firm's situation and a specialist solicitors' accountant will confirm your exact figure and the sensible next step, with no obligation."
          submitLabel="Get my figure confirmed"
          successText="Thanks, we will be in touch within one working day. Your result is below."
          className="mt-2"
          messagePlaceholder="The more detail the better. Tell us about your firm's situation, rough figures, and what you are trying to work out. A couple of sentences is ideal."
          messageMinLength={40}
          messageMinWords={8}
          onSuccess={onReveal}
        />

        <button
          type="button"
          onClick={skip}
          className="mt-4 block w-full text-center text-xs text-[var(--muted)] underline underline-offset-2 hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          No thanks, just show my result
        </button>
      </div>
    </div>
  );
}
