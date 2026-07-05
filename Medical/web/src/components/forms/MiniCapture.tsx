"use client";

/**
 * Reusable qualified lead capture used across conversion surfaces (calculator
 * result, resource block, exit-intent). Collects name + phone + email +
 * message (all required) for callable, named, contextful leads fit for
 * partner handoff. Topic-aware, consent-gated, honeypot-protected, and
 * stitched to the first-party journey (visitor_id/session_id).
 *
 * Submission flows through the server chokepoint (/api/leads/submit) with
 * an automatic fallback to the shared direct-insert if the route is
 * unavailable (5xx or network error). The honeypot field is named
 * enquiry_ref; a non-empty value is stored server-side as flagged rather
 * than silently dropped.
 *
 * Styled with Medical Accountants UK brand tokens: navy #001b3d + copper #b87333.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitMedicalLead } from "@/lib/leads/submit-client";
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
  "mt-1 w-full min-h-12 touch-manipulation border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--ink)] placeholder:text-[var(--muted)] shadow-sm focus:border-[var(--copper)] focus:outline-none focus:ring-2 focus:ring-[var(--copper)]/25 transition-colors";

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thank you. We will be in touch within one working day.",
  className = "my-8 rounded-2xl border-l-4 border-[var(--copper)] bg-[var(--surface)] p-6 sm:p-8",
  experimentKey,
  exposeOnView = true,
  messageMinLength = 10,
  messageMinWords = 0,
  messagePlaceholder = "A sentence or two about your situation helps us help you",
  onSuccess,
}: {
  /** Surface id for analytics (form tracking + GA label), e.g. "calc_result". */
  formId: string;
  /** Lead role written to the leads table (default "Other"). */
  role?: string;
  /** Prefix for the lead message, e.g. "[Calculator: locum-tax-calculator] ". */
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
  /** Set false when the parent surface already fires the exposure itself. */
  exposeOnView?: boolean;
  /** Minimum character count for the message field (default 10). */
  messageMinLength?: number;
  /** Minimum word count for the message field (default 0 = no word check). */
  messageMinWords?: number;
  /** Custom placeholder for the message textarea. */
  messagePlaceholder?: string;
  /** Called after a successful lead submission (e.g. to close a modal). */
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
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
      if (String(data.get("full_name") || "").trim().length < 2)
        errs.full_name = "Enter your name.";
      if (!emailRe.test(String(data.get("email") || "").trim()))
        errs.email = "Enter a valid email address.";
      const digits = String(data.get("phone") || "").replace(/\D/g, "");
      if (digits.length < 10)
        errs.phone = "Enter a phone number we can call you on.";
      const msg = String(data.get("message") || "").trim();
      if (msg.length < messageMinLength)
        errs.message = "Tell us a sentence or two about your situation.";
      else if (
        messageMinWords > 0 &&
        msg.split(/\s+/).filter(Boolean).length < messageMinWords
      )
        errs.message = "Please give us a bit more detail (a couple of sentences).";
      if (!data.get("consent")) errs.consent = "Please tick the box to continue.";
      return errs;
    },
    [messageMinLength, messageMinWords],
  );

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
          field === "email"
            ? "invalid_email"
            : field === "phone"
              ? "invalid_phone"
              : field === "message"
                ? "too_short"
                : "required";
        ft.onError(field, kind);
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

    const result = await submitMedicalLead(payload, honeypot);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(
        result.error ||
          "Something went wrong. Please try again or use the full form below.",
      );
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    setStatus("success");
    form.reset();
    setConsent(false);
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
          {/* Honeypot: visually hidden; bots fill it; real users never reach it.
              Named enquiry_ref (not company_url) to avoid browser autofill. */}
          <input
            type="text"
            name="enquiry_ref"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
          />

          <div>
            <label
              htmlFor={`${formId}-name`}
              className="block text-sm font-semibold text-[var(--ink)]"
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
            />
            {fieldErrors.full_name && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldErrors.full_name}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${formId}-email`}
                className="block text-sm font-semibold text-[var(--ink)]"
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
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor={`${formId}-phone`}
                className="block text-sm font-semibold text-[var(--ink)]"
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
              />
              {fieldErrors.phone && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor={`${formId}-message`}
              className="block text-sm font-semibold text-[var(--ink)]"
            >
              How can we help?
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={3}
              maxLength={1000}
              placeholder={messagePlaceholder}
              className={inputClass}
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
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
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--copper)]"
                aria-invalid={!!fieldErrors.consent}
              />
              <span>
                {siteConfig.leadConsentText} See our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--copper)] underline"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {fieldErrors.consent}
              </p>
            )}
          </div>

          {errorMessage && (
            <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3">
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
