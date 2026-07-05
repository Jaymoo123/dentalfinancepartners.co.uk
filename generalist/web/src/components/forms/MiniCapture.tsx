"use client";

/**
 * Reusable qualified lead capture used across conversion surfaces (calculator
 * result, resource block, exit-intent). Collects name + phone + email +
 * message (all required) for callable, named, contextful leads fit for
 * partner handoff. Topic-aware, consent-gated, honeypot-protected, and
 * stitched to the first-party journey (visitor_id/session_id) so it fires
 * form_start / form_submit / lead_submitted.
 *
 * Submission flows through the server chokepoint (/api/leads/submit) with
 * an automatic fallback to the shared direct-insert if the route is
 * unavailable (5xx or network error). The honeypot field is named
 * enquiry_ref; a non-empty value is stored server-side as flagged rather
 * than silently dropped.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitGeneralistLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import {
  trackExperimentView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/25 transition-colors";

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. We'll be in touch within 24 hours.",
  className = "my-8 rounded-2xl border-l-4 border-orange-500 bg-slate-50 p-6 sm:p-8",
  experimentKey,
  exposeOnView = true,
}: {
  /** Surface id for analytics (form tracking + GA label), e.g. "calc_result". */
  formId: string;
  /** Lead role written to the leads table (default "Other"). */
  role?: string;
  /** Prefix for the lead message, e.g. "[Calculator: salary-dividend] ". */
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
  /** Parent A/B experiment this capture belongs to (e.g. "calc_result_capture").
   *  Drives experiment_view (on scroll-into-view, unless exposeOnView=false) and
   *  experiment_action (on first field focus = engaged the capture). */
  experimentKey?: string;
  /** Set false when the parent surface already fires the exposure itself (e.g.
   *  the exit-intent modal fires it once on open for both arms). */
  exposeOnView?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const ft = useFormTracking(formId);

  // Building-block funnel: exposure on scroll-into-view (unless the parent fires
  // its own), and the proximal "engaged the capture" action on first field focus.
  const startedExpRef = useRef(false);
  const expRef = useInViewOnce<HTMLElement>(() => {
    if (experimentKey && exposeOnView) trackExperimentView(experimentKey, formId);
  });
  const markStarted = useCallback(() => {
    if (startedExpRef.current) return;
    startedExpRef.current = true;
    if (experimentKey) trackExperimentAction(experimentKey, formId);
  }, [experimentKey, formId]);

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    if (String(data.get("full_name") || "").trim().length < 2) errs.full_name = "Enter your name.";
    if (!emailRe.test(String(data.get("email") || "").trim())) errs.email = "Enter a valid email address.";
    const digits = String(data.get("phone") || "").replace(/\D/g, "");
    if (digits.length < 10) errs.phone = "Enter a phone number we can call you on.";
    if (String(data.get("message") || "").trim().length < 10) errs.message = "Tell us a sentence or two about your situation.";
    if (!data.get("consent")) errs.consent = "Please tick the box to continue.";
    return errs;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    // Collect honeypot value; pass through to server rather than dropping silently.
    const honeypot = String(data.get("enquiry_ref") || "").trim();

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const [field] of Object.entries(errs)) {
        const kind =
          field === "email" ? "invalid_email"
          : field === "phone" ? "invalid_phone"
          : field === "message" ? "too_short"
          : "required";
        ft.onError(field, kind);
      }
      return;
    }
    ft.onSubmit(4); // passed validation, about to POST

    setStatus("loading");
    const userMessage = String(data.get("message") || "").trim();
    const payload = {
      full_name: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role,
      message: `${messagePrefix}${userMessage}`,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      consent_given: consent,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
    };

    const result = await submitGeneralistLead(payload, honeypot);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag("event", "generate_lead", { event_category: "engagement", event_label: `${niche.niche_id}_${formId}`, value: 1 });
    }

    setStatus("success");
    form.reset();
    setConsent(false);
  }

  return (
    <section ref={expRef} className={className} aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-slate-900 sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
          <p className="text-sm font-semibold text-orange-900">{successText}</p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          onFocusCapture={(e) => {
            const t = e.target as HTMLElement & { name?: string };
            if (t?.name) {
              ft.onFieldFocus(t.name);
              markStarted();
            }
          }}
          onBlurCapture={(e) => {
            const t = e.target as HTMLElement & { name?: string; value?: string };
            if (t?.name) ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
          }}
          className="mt-5 space-y-4"
          noValidate
          aria-busy={status === "loading"}
        >
          {/* Honeypot: visually hidden; bots fill it; real users never reach it.
              Named enquiry_ref (not company_url) to avoid browser autofill. */}
          <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />

          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-slate-900">Full name</label>
            <input
              type="text"
              id={`${formId}-name`}
              name="full_name"
              required
              autoComplete="name"
              maxLength={100}
              placeholder={niche.lead_form.placeholders.name}
              className={inputClass}
              aria-invalid={!!fieldErrors.full_name}
            />
            {fieldErrors.full_name && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.full_name}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-slate-900">Email</label>
              <input
                type="email"
                id={`${formId}-email`}
                name="email"
                required
                autoComplete="email"
                maxLength={100}
                placeholder={niche.lead_form.placeholders.email}
                className={inputClass}
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-slate-900">Phone</label>
              <input
                type="tel"
                id={`${formId}-phone`}
                name="phone"
                required
                autoComplete="tel"
                maxLength={20}
                placeholder={niche.lead_form.placeholders.phone}
                className={inputClass}
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-slate-900">How can we help?</label>
            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={3}
              maxLength={1000}
              placeholder="A sentence or two about your situation helps us help you"
              className={inputClass}
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.message}</p>}
          </div>

          <div>
            <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
              <input
                type="checkbox"
                id={`${formId}-consent`}
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-orange-500"
                aria-invalid={!!fieldErrors.consent}
              />
              <span>
                {siteConfig.leadConsentText} See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 underline">Privacy Policy</a>.
              </span>
            </label>
            {fieldErrors.consent && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.consent}</p>}
          </div>

          {errorMessage && (
            <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <button type="submit" disabled={status === "loading" || !consent} className={`${btnPrimary} w-full sm:w-auto`}>
            {status === "loading" ? "Sending..." : submitLabel}
          </button>
        </form>
      )}
    </section>
  );
}
