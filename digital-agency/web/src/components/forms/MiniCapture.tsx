"use client";

/**
 * Reusable QUALIFIED lead capture used across conversion surfaces (calculator
 * result, resource block, mobile tool, exit-intent, blog inline). Collects name +
 * phone + email + message, all required, for callable / named / contextful leads
 * fit for follow-up. Topic-aware, consent-gated, honeypot-protected, and fully
 * stitched to the first-party journey (visitor_id/session_id) so it fires
 * form_start / form_submit / lead_submitted.
 *
 * Honeypot: enquiry_ref is passed to the server chokepoint which stores it
 * flagged and returns success. Client NEVER silently drops a submission.
 * Validation aborts emit form_error (no swallowing).
 *
 * Styled with Agency Founder Finance indigo tokens (#4f46e5).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitAffLead } from "@/lib/leads/submit-client";
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
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/25 transition-colors";

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. We will be in touch within 24 hours.",
  className = "my-8 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50 p-6 sm:p-8",
  experimentKey,
  exposeOnView = true,
  messagePlaceholder,
  messageMinLength = 10,
  onSuccess,
}: {
  /** Surface id for analytics (form tracking + GA label), e.g. "calc_result". */
  formId: string;
  /** Lead role written to the leads table (default "Other"). */
  role?: string;
  /** Prefix for the lead message, e.g. "[Calculator result: salary-dividend]". */
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
  /** Parent A/B experiment this capture belongs to (e.g. "calc_result_capture").
   *  Drives experiment_view (on scroll-into-view, unless exposeOnView=false) +
   *  experiment_action (on first field focus). */
  experimentKey?: string;
  /** Set false when the parent surface already fires the exposure itself. */
  exposeOnView?: boolean;
  messagePlaceholder?: string;
  /** Minimum message length (default 10). */
  messageMinLength?: number;
  /** Called after a successful submission (e.g. to close a modal). */
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot value — tracked in state so bots that fill it are detected server-side.
  const [honeypotValue, setHoneypotValue] = useState("");
  const ft = useFormTracking(formId);

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

  const validate = useCallback(
    (data: FormData) => {
      const errs: Record<string, string> = {};
      if (String(data.get("full_name") || "").trim().length < 2) errs.full_name = "Enter your name.";
      if (!emailRe.test(String(data.get("email") || "").trim())) errs.email = "Enter a valid email address.";
      const digits = String(data.get("phone") || "").replace(/\D/g, "");
      if (digits.length < 10) errs.phone = "Enter a phone number we can call you on.";
      const msg = String(data.get("message") || "").trim();
      if (msg.length < messageMinLength) errs.message = "Tell us a sentence or two about your situation.";
      if (!data.get("consent")) errs.consent = "Please tick the box to continue.";
      return errs;
    },
    [messageMinLength],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    // Validate first; emit form_error on each failing field (no swallowing).
    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const [field] of Object.entries(errs)) {
        ft.onError(field, "required");
      }
      return;
    }

    ft.onSubmit(4);
    setStatus("loading");

    const userMessage = String(data.get("message") || "").trim();
    const payload = {
      full_name: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role,
      message: messagePrefix ? `${messagePrefix}: ${userMessage}` : userMessage,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      consent_given: consent,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
    };

    // LD-03: honeypot value passed to the server; server stores flagged, returns success.
    const result = await submitAffLead(payload, honeypotValue);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });
    setStatus("success");
    form.reset();
    setConsent(false);
    setHoneypotValue("");
    onSuccess?.();
  }

  return (
    <section ref={expRef} className={className} aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-slate-900 sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-900">{successText}</p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          onFocusCapture={(e) => {
            const t = e.target as HTMLElement & { name?: string };
            if (t?.name && t.name !== "enquiry_ref") {
              ft.onFieldFocus(t.name);
              markStarted();
            }
          }}
          onBlurCapture={(e) => {
            const t = e.target as HTMLElement & { name?: string; value?: string };
            if (t?.name && t.name !== "enquiry_ref")
              ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
          }}
          className="mt-5 space-y-4"
          noValidate
          aria-busy={status === "loading"}
        >
          {/* LD-03: honeypot — visually hidden, estate-standard name enquiry_ref.
              Value passed to server chokepoint which stores it flagged and returns success.
              Client NEVER aborts on honeypot — silent drop kills real autofilled submissions. */}
          <input
            type="text"
            name="enquiry_ref"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
            value={honeypotValue}
            onChange={(e) => setHoneypotValue(e.target.value)}
          />

          <div>
            <label htmlFor={`${formId}-full_name`} className="block text-sm font-semibold text-slate-900">
              Full name
            </label>
            <input
              type="text"
              id={`${formId}-full_name`}
              name="full_name"
              required
              autoComplete="name"
              maxLength={100}
              placeholder="Alex Smith"
              className={inputClass}
              aria-invalid={!!fieldErrors.full_name}
              aria-describedby={fieldErrors.full_name ? `${formId}-full_name-error` : undefined}
            />
            {fieldErrors.full_name && (
              <p id={`${formId}-full_name-error`} className="mt-1.5 text-xs font-medium text-red-600">
                {fieldErrors.full_name}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-slate-900">
                Email
              </label>
              <input
                type="email"
                id={`${formId}-email`}
                name="email"
                required
                autoComplete="email"
                maxLength={100}
                placeholder="alex@youragency.com"
                className={inputClass}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
              />
              {fieldErrors.email && (
                <p id={`${formId}-email-error`} className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-slate-900">
                Phone
              </label>
              <input
                type="tel"
                id={`${formId}-phone`}
                name="phone"
                required
                autoComplete="tel"
                maxLength={20}
                placeholder="07700 900123"
                className={inputClass}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? `${formId}-phone-error` : undefined}
              />
              {fieldErrors.phone && (
                <p id={`${formId}-phone-error`} className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-slate-900">
              Brief message
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={3}
              maxLength={1000}
              placeholder={messagePlaceholder || "Tell us what you need help with"}
              className={inputClass}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
            />
            {fieldErrors.message && (
              <p id={`${formId}-message-error`} className="mt-1.5 text-xs font-medium text-red-600">
                {fieldErrors.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
              <input
                type="checkbox"
                id={`${formId}-consent`}
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-indigo-600"
                aria-invalid={!!fieldErrors.consent}
                aria-describedby={fieldErrors.consent ? `${formId}-consent-error` : undefined}
              />
              <span>
                {siteConfig.leadConsentText} See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-700 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p id={`${formId}-consent-error`} className="mt-1.5 text-xs font-medium text-red-600">
                {fieldErrors.consent}
              </p>
            )}
          </div>

          {errorMessage && (
            <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !consent}
            className={`${btnPrimary} w-full`}
          >
            {status === "loading" ? "Sending..." : submitLabel}
          </button>
        </form>
      )}
    </section>
  );
}
