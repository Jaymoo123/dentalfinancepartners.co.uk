"use client";

/**
 * Result-gate interstitial for the generalist premium in-blog calculator fleet.
 *
 * Shown once per session when a blog reader presses "See your result". Offers
 * a qualified capture before revealing the figure. Three non-negotiables:
 *
 * 1. The escape hatch ALWAYS reveals. Closing by any means (X, backdrop, Esc,
 *    or the "No thanks" link) calls onReveal() and shows the result. The
 *    result is never walled off.
 * 2. isConverted() visitors are NEVER gated (bypassed upstream in PremiumCalculator).
 * 3. Once per session (enforced by gateModalShownThisSession in PremiumCalculator).
 *
 * Every dismiss fires exactly one cta_click(result_gate_skip). Submitting the
 * form marks the visitor converted via the MiniCapture lead path (so they are
 * never re-gated), then calls onReveal().
 *
 * Styled with generalist orange-600, not Property's emerald.
 */

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@accounting-network/web-shared/analytics/track";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";
import { MiniCapture } from "@/components/forms/MiniCapture";

export function ResultGateModal({
  campaign,
  onReveal,
}: {
  /** Calculator slug, for the lead message prefix and skip diagnostic. */
  campaign: string;
  /** Reveal the result and close the gate. Called on submit and on every dismiss. */
  onReveal: () => void;
}) {
  const pathname = usePathname() || "";
  const topic = getTopic(deriveTopic(pathname));
  const dialogRef = useRef<HTMLDivElement>(null);

  // Every dismiss path fires exactly one result_gate_skip event then reveals.
  const skip = useCallback(() => {
    track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" });
    onReveal();
  }, [onReveal]);

  // Focus the dialog container on open (not a form field, to avoid a false form-start).
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

  // Fire gate_view once on open.
  useEffect(() => {
    track("gate_view", { calculator_slug: campaign, placement: "result_gate" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        className="relative w-full max-w-lg border-l-4 border-orange-600 bg-white p-6 shadow-2xl outline-none sm:p-8"
      >
        {/* X close button — always reveals */}
        <button
          type="button"
          onClick={skip}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Skip and show my result"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-wider text-orange-700">
          Before you see your result
        </p>

        <MiniCapture
          formId="calc_result_gate"
          messagePrefix={`[Result gate: ${campaign}]`}
          heading={topic?.ctaCopy ?? "Want a specialist to check your figure?"}
          blurb="A calculator gives the shape of the answer. Tell us your situation and a specialist will confirm your exact figure and the legitimate ways to reduce it, with no obligation."
          submitLabel="Get my figure confirmed"
          successText="Thanks, we'll be in touch within 24 hours. Your result is below."
          className="mt-2"
          messagePlaceholder="Tell us about your situation, the rough figures involved, and what you are trying to work out. A couple of sentences is ideal."
          messageMinLength={40}
          messageMinWords={8}
          onSuccess={onReveal}
        />

        {/* Escape link — always reveals; de-emphasised so the form gets first look */}
        <button
          type="button"
          onClick={skip}
          className="mt-4 block w-full text-center text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          No thanks, just show my result
        </button>
      </div>
    </div>
  );
}
