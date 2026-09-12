"use client";

/**
 * Result-gate interstitial for the Medical Accountants UK premium calculator tier.
 *
 * Shown when a reader presses "See my result" on a gated calculator, generic or
 * premium. ResultGate owns when that is: once per calculator, with the reveal
 * remembered per calculator in sessionStorage. Offers a qualified capture before revealing the
 * figure, with an always-present escape so the result is NEVER walled off:
 *   - Submitting the form reveals the result and marks the visitor converted.
 *   - Closing any way (X button, "No thanks" link, backdrop click, Esc key)
 *     reveals the result without capture.
 *   - Embeds never gate. Premium gates in-blog only; the generic fleet gates on
 *     every page surface, including the /nhs-pension pillar.
 *
 * TOKEN DISCIPLINE: Medical uses navy #001b3d + copper #b87333. Tokens:
 *   - var(--gold): accent border on the modal card (alias -> copper)
 *   - var(--accent): focus rings (alias -> copper)
 *   - var(--navy): backdrop scrim (bg-[var(--navy)]/60)
 *   - var(--muted), var(--ink): text hierarchy
 * NEVER var(--primary).
 *
 * Three non-negotiables (Section 4 of the brief):
 *   1. Escape hatch ALWAYS reveals (X, backdrop click, Esc, "No thanks" link).
 *   2. isConverted() visitors are NEVER gated (checked by PremiumCalculator).
 *   3. Asked once per calculator (per-calculator sessionStorage key, in ResultGate).
 *      Message floors are the estate defaults (20 chars / 4 words, capture-steps.ts);
 *      this call site previously raised them to 40/8 and no submit was possible.
 *
 * topicKey is threaded as a PROP (never re-derived from the URL).
 *
 * Event discipline: only allowlisted event names (packages/web-shared/analytics/types.ts).
 *   - Every dismiss fires cta_click with cta_id="result_gate_skip".
 *   - Submission fires form_start / form_submit / lead_submitted via MiniCapture.
 *   - result_gate_skip is a cta_id VALUE on the allowlisted cta_click event, not a new name.
 */
import { useCallback, useEffect, useRef } from "react";
import { track } from "@accounting-network/web-shared/analytics/track";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import { MiniCapture } from "@/components/forms/MiniCapture";

export function ResultGateModal({
  campaign,
  tier = "premium",
  topicKey = null,
  onReveal,
}: {
  /** Calculator id (toolId), for the lead message + the skip diagnostic. */
  campaign: string;
  /** "generic" or "premium"; only used to disambiguate the lead payload. */
  tier?: "generic" | "premium";
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--navy)]/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) skip();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-lg border-l-4 border-[var(--gold)] bg-white p-6 shadow-2xl outline-none sm:p-8 rounded-xl"
      >
        {/* X close button */}
        <button
          type="button"
          onClick={skip}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl text-[var(--muted)] hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
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
          className="text-xs font-bold uppercase tracking-wider text-[var(--navy)]"
        >
          Before you see your result
        </p>

        <MiniCapture
          formId="calc_result_gate"
          /* The tier is in the prefix because four ids are BOTH a generic slug
             and a premium tool id, so without it two leads from two different
             calculators arrive indistinguishable in the leads table. The
             sessionStorage keys were namespaced for the same reason; the lead
             payload was not, until a review caught it. */
          messagePrefix={`[Result gate: ${tier}/${campaign}]`}
          heading={
            topic?.ctaCopy ||
            "Want a specialist to check your figure?"
          }
          blurb="A calculator gives the shape of the answer. NHS pensions, the annual allowance taper and private-practice incorporation are unforgiving in the detail. Tell us your situation and we will match it to a regulated firm that works with doctors, so a specialist medical accountant there can confirm your exact figure and the sensible next step. Enquiring commits you to nothing."
          submitLabel="Get my figure confirmed"
          successText="Thanks. We will match you with a specialist medical accountant from our partner network, who will contact you about your figure. Your result is below."
          className="mt-2"
          messagePlaceholder="The more detail the better. Tell us about your NHS pension situation or private practice, rough figures, and what you are trying to work out. A couple of sentences is ideal."
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
