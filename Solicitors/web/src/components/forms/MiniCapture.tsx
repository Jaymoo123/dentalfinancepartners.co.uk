"use client";

/**
 * Reusable qualified lead capture for the Solicitors (Accounts for Lawyers)
 * site. Collects name + phone + email + message, all required, for callable
 * leads fit for partner handoff. Topic-aware, consent-gated, honeypot-protected
 * via the enquiry_ref field (stored flagged on the server, never silently
 * dropped), and fully stitched to the first-party journey so it fires
 * form_start / form_submit / lead_submitted.
 *
 * Styled with the site's CSS variable tokens (--border, --accent, --primary,
 * --ink, --muted, --surface). Consent checkbox is always present -- never
 * replaced with a notice-only pattern.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitSolicitorLead } from "@/lib/leads/submit-client";
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
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--ink)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25";

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thank you. We will be in touch within one working day.",
  className = "my-8 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-6 sm:p-8",
  experimentKey,
  exposeOnView = true,
  messagePlaceholder,
  messageMinLength,
  messageMinWords,
  onSuccess,
}: {
  /** Surface id for analytics (form tracking + GA label), e.g. "calc_result". */
  formId: string;
  /** Lead role written to the leads table (default "Other"). */
  role?: string;
  /** Prefix for the lead message, e.g. "[Calculator result: solicitor-take-home]". */
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
  /** Parent A/B experiment this capture belongs to (e.g. "calc_result_capture").
   *  Drives experiment_view (on scroll-into-view, unless exposeOnView=false) +
   *  experiment_action (on first field focus = engaged the capture). */
  experimentKey?: string;
  /** Set false when the parent surface already fires the exposure itself. */
  exposeOnView?: boolean;
  /**
   * Optional: custom placeholder text for the message textarea.
   * Parity with Property MiniCapture. When absent the existing default is used.
   */
  messagePlaceholder?: string;
  /**
   * Optional: minimum character count for the message field (additive, overrides
   * the default 10-char minimum only when supplied). Parity with Property.
   */
  messageMinLength?: number;
  /**
   * Optional: minimum word count for the message field. When supplied, validation
   * also requires at least this many whitespace-separated words. Parity with Property.
   */
  messageMinWords?: number;
  /**
   * Optional: callback fired after a successful lead submission (before the
   * success state is rendered). Parity with Property's ResultGateModal wiring:
   * used to reveal the gated result immediately on submit.
   */
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState("");
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

  const effectiveMinLength = messageMinLength ?? 10;
  const effectiveMinWords = messageMinWords ?? 0;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    if (String(data.get("full_name") || "").trim().length < 2)
      errs.full_name = "Enter your name.";
    if (!emailRe.test(String(data.get("email") || "").trim()))
      errs.email = "Enter a valid email address.";
    const digits = String(data.get("phone") || "").replace(/\D/g, "");
    if (digits.length < 10)
      errs.phone = "Enter a phone number we can call you on.";
    const msgVal = String(data.get("message") || "").trim();
    const msgTooShort = msgVal.length < effectiveMinLength;
    const msgTooFewWords =
      effectiveMinWords > 0 &&
      msgVal.split(/\s+/).filter(Boolean).length < effectiveMinWords;
    if (msgTooShort || msgTooFewWords)
      errs.message = "Tell us a sentence or two about your situation.";
    if (!data.get("consent"))
      errs.consent = "Please tick the box to continue.";
    return errs;
  }, [effectiveMinLength, effectiveMinWords]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const [field, kind] of Object.entries(errs)) {
        ft.onError(field, kind === "Enter your name." ? "required" : "invalid");
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
      message: `${messagePrefix}: ${userMessage}`,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      consent_given: consent,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
    };

    const result = await submitSolicitorLead(payload, enquiryRef);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(
        result.error ||
          "Something went wrong. Please try again or use the full contact form below.",
      );
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag)
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `${niche.niche_id}_${formId}`,
          value: 1,
        });
    }

    setStatus("success");
    form.reset();
    setConsent(false);
    setEnquiryRef("");
    onSuccess?.();
  }

  return (
    <section ref={expRef} className={className} aria-labelledby={`${formId}-heading`}>
      <h3
        id={`${formId}-heading`}
        className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl"
      >
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{blurb}</p>

      {status === "success" ? (
        <div
          role="status"
          className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
        >
          <p className="text-sm font-semibold text-emerald-900">{successText}</p>
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
          {/* LD-03: honeypot -- visually hidden, server stores flagged when non-empty */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor={`${formId}-enquiry-ref`}>Reference (leave blank)</label>
            <input
              id={`${formId}-enquiry-ref`}
              type="text"
              name="enquiry_ref"
              tabIndex={-1}
              autoComplete="off"
              value={enquiryRef}
              onChange={(e) => setEnquiryRef(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-name`}
              className="block text-sm font-medium text-[var(--ink)]"
            >
              Full name
            </label>
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
              aria-describedby={fieldErrors.full_name ? `${formId}-err-name` : undefined}
            />
            {fieldErrors.full_name && (
              <p id={`${formId}-err-name`} className="mt-1 text-xs font-medium text-red-700">
                {fieldErrors.full_name}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${formId}-email`}
                className="block text-sm font-medium text-[var(--ink)]"
              >
                Email
              </label>
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
                aria-describedby={fieldErrors.email ? `${formId}-err-email` : undefined}
              />
              {fieldErrors.email && (
                <p id={`${formId}-err-email`} className="mt-1 text-xs font-medium text-red-700">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor={`${formId}-phone`}
                className="block text-sm font-medium text-[var(--ink)]"
              >
                Phone
              </label>
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
                aria-describedby={fieldErrors.phone ? `${formId}-err-phone` : undefined}
              />
              {fieldErrors.phone && (
                <p id={`${formId}-err-phone`} className="mt-1 text-xs font-medium text-red-700">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor={`${formId}-message`}
              className="block text-sm font-medium text-[var(--ink)]"
            >
              How can we help?
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={3}
              maxLength={1000}
              placeholder={messagePlaceholder ?? "A sentence or two about your situation helps us prepare"}
              className={`${inputClass} min-h-[6rem] resize-y py-3`}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? `${formId}-err-message` : undefined}
            />
            {fieldErrors.message && (
              <p id={`${formId}-err-message`} className="mt-1 text-xs font-medium text-red-700">
                {fieldErrors.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${formId}-consent`}
              className="flex items-start gap-3 text-xs leading-relaxed text-[var(--muted)]"
            >
              <input
                type="checkbox"
                id={`${formId}-consent`}
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                aria-invalid={!!fieldErrors.consent}
                aria-describedby={fieldErrors.consent ? `${formId}-err-consent` : undefined}
              />
              <span>
                {siteConfig.leadConsentText} See our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] underline"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p id={`${formId}-err-consent`} className="mt-1 text-xs font-medium text-red-700">
                {fieldErrors.consent}
              </p>
            )}
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3"
            >
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !consent}
            className={`${btnPrimary} w-full sm:w-auto`}
          >
            {status === "loading" ? "Sending..." : submitLabel}
          </button>
        </form>
      )}
    </section>
  );
}
