"use client";

import { useEffect, useState } from "react";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { site } from "@/lib/calculators/site";
import { focusRing } from "@/components/ui/layout-utils";

/**
 * FORK-VS-SHARED, answered in writing (deferred to phase 6 by P1-G).
 *
 * ADOPTION DECLINED, this wave: packages/web-shared/leads/MiniCapture.tsx.
 * Four reasons a reviewer can test, in order of weight:
 *
 * 1. PROP SIGNATURE. The kit component requires `siteConfig: MiniCaptureConfig`
 *    and `submitLead: MiniCaptureSubmitFn` at every call site (:122-123, both
 *    non-optional). This file's signature is FROZEN for this wave by the W6
 *    contract, because W2 (`components/blog/InlineMiniLeadForm.tsx`) and W4
 *    (`CalcResultCta` on the three calculator pages) both mount it
 *    concurrently. Adding two required props is the one change the contract
 *    forbids.
 * 2. BEHAVIOUR, NOT STYLE. The kit component is gated on
 *    `NEXT_PUBLIC_MINIFORMS_MULTISTEP` (`leads/capture-steps.ts:152`) and with
 *    the flag on it splits into a two-step flow with a role SELECT whose
 *    options come from `leadForm.roleOptions`. This form posts
 *    `role: "Other"` and asks four fields on one step. That is a funnel
 *    change, measured in leads per week, not a restyle, and the owner ruling
 *    for this wave is restructure and restyle only.
 * 3. LOCKED ANALYTICS. Its header declares the event names and props LOCKED
 *    because deploy-watch queries on other sites depend on them
 *    (`leads/MiniCapture.tsx:11-14`). Pointing a nineteenth site at them is a
 *    shared-surface decision, and `packages/web-shared/**` is a manager
 *    carve-out (trap 12).
 * 4. THE PACKAGE LOCK. W6 must show zero changes to any line matching
 *    `formId|data-cta|leadConsent|redirectOnSuccess|submitLabel|name=|
 *    enquiry_ref` in this file. A swap rewrites all of them.
 *
 * RECOMMENDATION TO THE MANAGER: do the swap, but as its own commit after the
 * port, with the flag OFF so the rendered flow is unchanged, and read leads per
 * week either side. The helpers in `leads/capture-steps.ts` are ALREADY adopted
 * on this site (`isSafeReturnPath` on /thank-you, `buildThankYouUrl` in
 * LeadForm), so the shared validation layer is in use even where the component
 * is not. `DetailsForm` and `BookingPicker` have no kit equivalent at all
 * (`packages/web-shared/leads/` holds MiniCapture, CalcResultCta,
 * MobileToolSlot, ResultGateModal and capture-steps, and nothing else), so for
 * those two there is nothing to adopt and the fork question does not arise.
 *
 * Phase 1's `focusRing` swap is VERIFIED present on all four form files
 * (imported from `@/components/ui/layout-utils` and composed into each input
 * recipe), so nothing here was re-applied.
 *
 * `site.leadConsentText` below is FROZEN (T19) and byte-identical to
 * Property's. Not touched.
 */
type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  `mt-1 w-full min-h-12 touch-manipulation border border-[var(--border)] bg-white px-3.5 py-3 text-base text-[var(--ink)] placeholder:text-[var(--muted)] shadow-sm focus:border-[var(--brand-primary)] ${focusRing} transition-colors`;

export function MiniCapture({
  formId,
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. We will be in touch within 24 hours.",
  className = "my-8 rounded-2xl border-l-4 border-[var(--brand-primary)] bg-[var(--surface)] p-6 sm:p-8",
}: {
  formId: string;
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs: Record<string, string> = {};
    if (String(data.get("full_name") || "").trim().length < 2) errs.full_name = "Enter your name.";
    if (!emailRe.test(String(data.get("email") || "").trim())) errs.email = "Enter a valid email address.";
    const digits = String(data.get("phone") || "").replace(/\D/g, "");
    if (digits.length < 10) errs.phone = "Enter a phone number we can call you on.";
    if (String(data.get("message") || "").trim().length < 10)
      errs.message = "Tell us a sentence or two about your business.";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    const payload = {
      full_name: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role: "Other",
      message: `${messagePrefix}: ${String(data.get("message") || "").trim()}`,
      source: site.sourceIdentifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      // Legitimate-interests acknowledgement: submitting the form IS the affirmative
      // act, so this is always true; consent_text records the exact wording shown.
      consent_given: true,
      consent_text: site.leadConsentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
      enquiry_ref: honeypotValue,
    };

    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
      setHoneypotValue("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or use our contact page.");
    }
  }

  return (
    <section className={className} aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-[var(--ink)] sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-[var(--brand-primary)]/30 bg-white p-4">
          <p className="text-sm font-semibold text-[var(--brand-primary)]">{successText}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2" noValidate>
          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-[var(--ink)]">
              Your name
            </label>
            <input id={`${formId}-name`} name="full_name" type="text" autoComplete="name" className={inputClass} />
            {fieldErrors.full_name && <p className="mt-1 text-xs text-red-600">{fieldErrors.full_name}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-[var(--ink)]">
              Phone
            </label>
            <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-[var(--ink)]">
              Email
            </label>
            <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-[var(--ink)]">
              About your business
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={3}
              className={inputClass}
              placeholder="e.g. community pharmacy with 8 staff, looking for help with NHS reconciliation"
            />
            {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor={`${formId}-ref`}>Reference</label>
            <input
              id={`${formId}-ref`}
              name="enquiry_ref"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypotValue}
              onChange={(e) => setHoneypotValue(e.target.value)}
            />
          </div>

          {/* Data-sharing acknowledgement (legitimate interests, not consent): submitting
              the enquiry is the affirmative act, so this is shown as a notice, not a
              tick-box. */}
          <p className="sm:col-span-2 text-xs leading-relaxed text-[var(--muted)]">{site.leadConsentText}</p>

          <div className="sm:col-span-2">
            <button
              type="submit"
              /* M1a: button-level id on the enquiry submit. This is the one
                 enquiry form on the site with no useFormTracking, so it is the
                 one that gains information (W6 §6). Goal is "form", the only
                 goal value the estate uses. */
              data-cta="mini_capture_submit"
              data-cta-goal="form"
              disabled={status === "loading"}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--brand-primary)] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : submitLabel}
            </button>
            {status === "error" && errorMessage && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
