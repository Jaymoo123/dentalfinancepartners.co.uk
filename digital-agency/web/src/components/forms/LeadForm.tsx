"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitAffLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";

const fieldClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/25 transition-colors";

type FormStatus = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ukPhoneRe = /^[\d\s+().-]{10,}$/;

function hasMinDigits(phone: string, min: number): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= min;
}

type LeadFormProps = {
  redirectOnSuccess?: boolean;
  submitLabel?: string;
  /** Destination on success when redirectOnSuccess is true. Defaults to /thank-you. */
  successRedirect?: string;
};

export function LeadForm({
  redirectOnSuccess = true,
  submitLabel = "Send enquiry",
  successRedirect = "/thank-you",
}: LeadFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourceUrl(window.location.href);
    }
  }, []);

  // AN-01: form lifecycle tracking — no field values captured, only field names + outcome.
  const { onFieldFocus, onFieldBlur, onError, onSubmit: trackFormSubmit, onLead } = useFormTracking("lead_form");

  const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const role = String(data.get("role") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (fullName.length < 2) errs.fullName = "Enter your name.";
    if (!emailRe.test(email)) errs.email = "Enter a valid email address.";

    if (!ukPhoneRe.test(phone)) {
      errs.phone = "Use only digits, spaces, +, -, ( ) for example 07700 900123";
    } else if (!hasMinDigits(phone, 10)) {
      errs.phone = "Enter at least 10 digits.";
    }

    if (!role) errs.role = "Select your agency type.";

    if (message.length > 0 && message.length < 10) {
      errs.message = "Add a sentence or two if you have a specific question.";
    }

    if (!data.get("consent")) errs.consent = "Please tick the box to continue.";

    return errs;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    // LD-03: honeypot — enquiry_ref is visually hidden; bots fill it; humans never reach it.
    // Value is passed to the server chokepoint which stores it flagged and returns success.
    // NEVER abort client-side on honeypot (silent-drop kills real autofilled submissions).
    const honeypotValue = String(data.get("enquiry_ref") || "").trim();

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const [field] of Object.entries(errs)) {
        const kind =
          field === "email" ? "invalid_email"
          : field === "phone" ? "invalid_phone"
          : field === "message" ? "too_short"
          : "required";
        onError(field, kind);
      }
      return;
    }

    setStatus("loading");

    // AN-01: emit form_submit with count of completed fields.
    const completedCount =
      (["fullName", "email", "phone", "role", "message"] as const)
        .filter((f) => String(data.get(f) || "").trim()).length + (consent ? 1 : 0);
    trackFormSubmit(completedCount);

    // LD-05: stitch visitor + session ids so each lead row links to its analytics events.
    const payload = {
      full_name: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role: String(data.get("role") || "").trim(),
      message: String(data.get("message") || "").trim(),
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl || String(data.get("sourceUrl") || "").trim(),
      submitted_at: new Date().toISOString(),
      consent_given: consent,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
    };

    const result = await submitAffLead(payload, honeypotValue);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or email us directly.");
      return;
    }

    setStatus("success");
    // AN-01: fire first-party lead event (replaces direct gtag conversion call).
    onLead({ role: payload.role });
    form.reset();
    setConsent(false);

    if (redirectOnSuccess) {
      setTimeout(() => {
        router.push(successRedirect);
      }, 800);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate aria-busy={status === "loading"}>
      <input type="hidden" name="sourceUrl" value={sourceUrl} readOnly />
      {/* LD-03: honeypot — visually hidden, estate-standard name enquiry_ref.
          Value passed to server chokepoint which stores it flagged and returns success.
          Client NEVER aborts on honeypot — silent drop kills real autofilled submissions. */}
      <input
        type="text"
        name="enquiry_ref"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div>
        <label htmlFor="role" className="block text-sm font-semibold text-slate-900">
          {niche.lead_form.role_label}
        </label>
        <select
          id="role"
          name="role"
          required
          autoComplete="off"
          className={fieldClass}
          aria-invalid={!!fieldErrors.role}
          aria-describedby={fieldErrors.role ? "role-error" : undefined}
          onFocus={() => onFieldFocus("role")}
          onBlur={(e) => onFieldBlur("role", !!e.target.value)}
        >
          <option value="">Select...</option>
          {niche.lead_form.role_options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {fieldErrors.role && (
          <p id="role-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.role}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          maxLength={100}
          placeholder={niche.lead_form.placeholders.name}
          className={fieldClass}
          aria-invalid={!!fieldErrors.fullName}
          aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
          onFocus={() => onFieldFocus("fullName")}
          onBlur={(e) => onFieldBlur("fullName", !!e.target.value)}
        />
        {fieldErrors.fullName && (
          <p id="fullName-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.fullName}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            maxLength={100}
            placeholder={niche.lead_form.placeholders.email}
            className={fieldClass}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            onFocus={() => onFieldFocus("email")}
            onBlur={(e) => onFieldBlur("email", !!e.target.value, e.target.value.length)}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-900">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            maxLength={20}
            placeholder={niche.lead_form.placeholders.phone}
            className={fieldClass}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            onFocus={() => onFieldFocus("phone")}
            onBlur={(e) => onFieldBlur("phone", !!e.target.value)}
          />
          {fieldErrors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs font-medium text-red-600">
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900">
          Message <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          placeholder={niche.lead_form.placeholders.message}
          className={fieldClass}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          onFocus={() => onFieldFocus("message")}
          onBlur={(e) => onFieldBlur("message", !!e.target.value)}
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-indigo-600"
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
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
          <p id="consent-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.consent}
          </p>
        )}
      </div>

      {errorMessage && (
        <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{errorMessage}</p>
        </div>
      )}

      {status === "success" && !redirectOnSuccess && (
        <div role="status" className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-900">
            Thanks! We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success" || !consent}
        className={`${btnPrimary} w-full`}
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : submitLabel}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">
        We respond within 24 hours and store your details securely.
      </p>
    </form>
  );
}
