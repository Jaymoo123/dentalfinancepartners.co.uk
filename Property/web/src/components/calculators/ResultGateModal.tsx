"use client";

/**
 * Result-gate interstitial: shipped default since 2026-06-30 (was the treatment
 * arm of the now-concluded `result_gate_capture` experiment, which it won on
 * leads). Shown once per session when a reader presses "See your result" on an
 * in-blog calculator. It offers a qualified capture before revealing the
 * figure, with a small de-emphasized escape so the result is NEVER walled off:
 * closing it any way (escape link, X, backdrop, Esc) reveals the result, and so
 * does submitting (which also marks the visitor converted via the lead path, so
 * they are never gated again). Styling mirrors ExitIntentModal so it feels native.
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
  /** Calculator slug, for the lead message + the skip diagnostic. */
  campaign: string;
  /** Reveal the result + close the gate. Called on submit and on every dismiss. */
  onReveal: () => void;
}) {
  const pathname = usePathname() || "";
  const topic = getTopic(deriveTopic(pathname));
  const dialogRef = useRef<HTMLDivElement>(null);

  // Dismissing the gate (X, link, backdrop, or Esc) reveals the result and records
  // a single result_gate_skip cta_click. Tracked manually so backdrop + Esc are
  // counted too; the buttons carry NO data-cta, so autoCapture does not double-count.
  const skip = useCallback(() => {
    track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" });
    onReveal();
  }, [onReveal]);

  // Focus the dialog container once on open (NOT a form field, which would fire a
  // false form-start).
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  // Escape dismisses + reveals.
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
        className="relative w-full max-w-lg border-l-4 border-emerald-600 bg-white p-6 shadow-2xl outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={skip}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          aria-label="Skip and show my result"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Before you see your result</p>

        <MiniCapture
          formId="calc_result_gate"
          messagePrefix={`[Result gate: ${campaign}]`}
          heading={topic?.ctaCopy || "Want a specialist to check your figure?"}
          blurb="A calculator gives the shape of the answer. Tell us your situation and a specialist will confirm your exact figure and the legitimate ways to reduce it, with no obligation."
          submitLabel="Get my figure confirmed"
          successText="Sent. Check your email and phone now, we have just messaged you to arrange your free review."
          className="mt-2"
          messagePlaceholder="The more detail the better. Tell us about the property or situation, rough figures, and what you're trying to work out. A couple of sentences is ideal."
          messageMinLength={40}
          messageMinWords={8}
          onSuccess={() => window.setTimeout(onReveal, 1800)}
        />

        <button
          type="button"
          onClick={skip}
          className="mt-4 block w-full text-center text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          No thanks, just show my result
        </button>
      </div>
    </div>
  );
}
