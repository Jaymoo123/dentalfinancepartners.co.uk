"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitMedicalLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";

const fieldClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--ink)] shadow-sm focus:border-[var(--copper)] focus:outline-none focus:ring-2 focus:ring-[var(--copper)]/25";

type FormStatus = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ukPhoneRe = /^[\d\s+().-]{10,}$/;

function hasMinDigits(phone: string, min: number): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= min;
}

type LeadFormProps = {
  /** When false, successful submit shows inline message instead of redirecting */
  redirectOnSuccess?: boolean;
  submitLabel?: string;
};

export function LeadForm({
  redirectOnSuccess = true,
  submitLabel = "Send enquiry",
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

  // SEC-08: form lifecycle tracking (no field values captured, only field names + outcome).
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
      errs.phone = "Use only digits, spaces, +, -, ( ) e.g. 07700 900123 or +44 20 1234 5678";
    } else if (!hasMinDigits(phone, 10)) {
      errs.phone = "Enter at least 10 digits.";
    }

    if (!role) errs.role = "Tell us which type of medical professional you are.";

    if (message.length > 0 && message.length < 10) {
      errs.message = "If you add a note, a sentence or two is enough, but not just a word or two.";
    }

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

    const practiceName = String(data.get("practiceName") || "").trim();

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
      extras: practiceName ? { practice_name: practiceName } : undefined,
    };

    const result = await submitMedicalLead(payload, honeypot);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(
        result.error ||
          "That did not go through. Try again, or email us. Either works.",
      );
      return;
    }

    setStatus("success");
    // LD-04: fire first-party lead event (replaces direct gtag conversion call)
    onLead({ role: payload.role });
    form.reset();
    setConsent(false);
    if (redirectOnSuccess) {
      router.push("/thank-you");
    }
  }

  if (status === "success" && !redirectOnSuccess) {
    return (
      <div
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900"
        role="status"
      >
        <p className="font-semibold">Thank you. We have your message.</p>
        <p className="mt-2 text-sm">We will come back within one working day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
      aria-busy={status === "loading" ? "true" : "false"}
    >
      <input type="hidden" name="sourceUrl" value={sourceUrl} readOnly />
      {/* practiceName preserved for medical practice context; stored in extras */}
      <input type="hidden" name="practiceName" value="" readOnly />
      {/* LD-03: honeypot -- visually hidden, bots fill it, humans never reach it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="enquiry_ref">Enquiry reference (leave blank)</label>
        <input id="enquiry_ref" type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[var(--ink)]">
          Your name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder={niche.lead_form.placeholders.name}
          className={fieldClass}
          aria-invalid={fieldErrors.fullName ? "true" : "false"}
          aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
          onFocus={() => onFieldFocus("fullName")}
          onBlur={(e) => onFieldBlur("fullName", !!e.target.value)}
        />
        {fieldErrors.fullName ? (
          <p id="err-fullName" className="mt-1 text-sm text-red-700">
            {fieldErrors.fullName}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)]">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={niche.lead_form.placeholders.email}
            className={fieldClass}
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
            onFocus={() => onFieldFocus("email")}
            onBlur={(e) => onFieldBlur("email", !!e.target.value, e.target.value.length)}
          />
          {fieldErrors.email ? (
            <p id="err-email" className="mt-1 text-sm text-red-700">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--ink)]">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder={niche.lead_form.placeholders.phone}
            className={fieldClass}
            aria-invalid={fieldErrors.phone ? "true" : "false"}
            aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
            onFocus={() => onFieldFocus("phone")}
            onBlur={(e) => onFieldBlur("phone", !!e.target.value)}
          />
          {fieldErrors.phone ? (
            <p id="err-phone" className="mt-1 text-sm text-red-700">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-[var(--ink)]">
          {niche.lead_form.role_label}
        </label>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          className={fieldClass}
          aria-invalid={fieldErrors.role ? "true" : "false"}
          aria-describedby={fieldErrors.role ? "err-role" : undefined}
          onFocus={() => onFieldFocus("role")}
          onBlur={(e) => onFieldBlur("role", !!e.target.value)}
        >
          <option value="" disabled>
            Please select
          </option>
          {niche.lead_form.role_options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.role ? (
          <p id="err-role" className="mt-1 text-sm text-red-700">
            {fieldErrors.role}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--ink)]">
          What&apos;s on your mind?{" "}
          <span className="font-normal text-[var(--muted)]">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} min-h-[9rem] resize-y py-3`}
          placeholder={niche.lead_form.placeholders.message}
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? "err-message" : undefined}
          onFocus={() => onFieldFocus("message")}
          onBlur={(e) => onFieldBlur("message", !!e.target.value)}
        />
        {fieldErrors.message ? (
          <p id="err-message" className="mt-1 text-sm text-red-700">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-xs leading-relaxed text-[var(--muted)]">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--copper)]"
            aria-invalid={fieldErrors.consent ? "true" : "false"}
            aria-describedby={fieldErrors.consent ? "err-consent" : undefined}
          />
          <span>
            {siteConfig.leadConsentText} See our{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--copper)] underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {fieldErrors.consent ? (
          <p id="err-consent" className="mt-1 text-sm text-red-700">
            {fieldErrors.consent}
          </p>
        ) : null}
      </div>

      {status === "error" && errorMessage ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading" || !consent}
        className={`${btnPrimary} w-full min-w-0 sm:min-w-[12rem]`}
      >
        {status === "loading" ? "Sending..." : submitLabel}
      </button>

      <p className="text-xs leading-relaxed text-[var(--muted)]">We store your details securely.</p>
    </form>
  );
}
