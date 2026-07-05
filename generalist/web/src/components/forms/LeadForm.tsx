"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitGeneralistLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";

const fieldClass =
  "mt-2 w-full min-h-12 touch-manipulation border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-orange-500 focus:outline-none";

const labelClass = "block text-sm font-medium text-neutral-900";
const errorClass = "mt-2 text-xs text-red-600";

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

  // SEC-08: form lifecycle tracking - no field values captured, only field names + outcome.
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

    if (!role) errs.role = "Select an option.";

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

    // LD-03: collect honeypot value and pass it to the server chokepoint.
    // The server stores flagged rows rather than silently dropping them, so no
    // real lead is ever lost and bots receive no detection signal.
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
        onError(field, kind);
      }
      return;
    }

    setStatus("loading");

    // LD-02: emit form_submit with count of completed fields
    const completedCount =
      (["fullName", "email", "phone", "role", "message"] as const)
        .filter((f) => String(data.get(f) || "").trim()).length + (consent ? 1 : 0);
    trackFormSubmit(completedCount);

    // LD-05: stitch visitor + session ids so each lead row links to its analytics events
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

    const result = await submitGeneralistLead(payload, honeypot);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or email us directly.");
      return;
    }

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `${niche.niche_id}_${payload.role}`,
          value: 1,
        });
      }
    }

    setStatus("success");
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
    <form onSubmit={onSubmit} className="space-y-6" noValidate aria-busy={status === "loading"}>
      <input type="hidden" name="sourceUrl" value={sourceUrl} />
      {/* LD-03: honeypot - visually hidden, bots fill it, humans never reach it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="enquiry_ref">Reference (leave blank)</label>
        <input id="enquiry_ref" type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
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
          <p id="role-error" className={errorClass}>
            {fieldErrors.role}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fullName" className={labelClass}>
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
          <p id="fullName-error" className={errorClass}>
            {fieldErrors.fullName}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
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
            <p id="email-error" className={errorClass}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
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
            <p id="phone-error" className={errorClass}>
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="font-normal text-neutral-500">(optional)</span>
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
          <p id="message-error" className={errorClass}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-xs leading-relaxed text-neutral-600">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-orange-500"
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
          />
          <span>
            {siteConfig.leadConsentText} See our{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium text-orange-600 underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p id="consent-error" className={errorClass}>
            {fieldErrors.consent}
          </p>
        )}
      </div>

      {errorMessage && (
        <div role="alert" className="border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      {status === "success" && !redirectOnSuccess && (
        <div role="status" className="border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm font-medium text-orange-900">
            Thanks. We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success" || !consent}
        className={`${btnPrimary} w-full`}
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Sent" : submitLabel}
      </button>

      <p className="text-xs leading-relaxed text-neutral-500">
        We respond within 24 hours and store your details securely.
      </p>
    </form>
  );
}
