"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitSiteLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { track } from "@accounting-network/web-shared/analytics/track";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";

const fieldClass =
  "mt-2 w-full min-h-12 touch-manipulation rounded-md border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-[var(--brand-primary)] focus:outline-none";
const labelClass = "block text-sm font-medium text-neutral-900";
const errorClass = "mt-2 text-xs text-red-600";
const btnClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[var(--brand-primary)] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50";

type FormStatus = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ukPhoneRe = /^[\d\s+().-]{10,}$/;
const FORM_ID = "lead_form";

type LeadFormProps = {
  redirectOnSuccess?: boolean;
  submitLabel?: string;
  successRedirect?: string;
};

export function LeadForm({
  redirectOnSuccess = true,
  submitLabel = "Send enquiry",
  successRedirect = "/thank-you",
}: LeadFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<0 | 1>(0);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);

  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [monthlyRevenueBand, setMonthlyRevenueBand] = useState("");
  const [vatRegistered, setVatRegistered] = useState("");
  const [stockLocation, setStockLocation] = useState("");
  const [fulfilmentModel, setFulfilmentModel] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const step2HeaderRef = useRef<HTMLHeadingElement>(null);
  const step2ViewFired = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
    track("form_step_view", { form_id: FORM_ID, step: 1, step_id: "about_you" });
  }, []);

  const { onFieldFocus, onFieldBlur, onError, onSubmit: trackFormSubmit, onLead } =
    useFormTracking(FORM_ID);

  const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;

  function validateStep1(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!role) errs.role = "Select an option.";
    if (message.trim().length > 0 && message.trim().length < 10) {
      errs.message = "Add a sentence or two if you have a specific question.";
    }
    return errs;
  }

  function validateStep2(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (fullName.trim().length < 2) errs.fullName = "Enter your name.";
    if (!emailRe.test(email.trim())) errs.email = "Enter a valid email address.";
    if (!ukPhoneRe.test(phone.trim())) {
      errs.phone = "Use only digits, spaces, +, -, ( ) for example 07700 900123";
    } else if (phone.replace(/\D/g, "").length < 10) {
      errs.phone = "Enter at least 10 digits.";
    }
    if (!consent) errs.consent = "Please tick the box to continue.";
    return errs;
  }

  function goToStep2() {
    const errs = validateStep1();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const field of Object.keys(errs)) {
        onError(field, field === "message" ? "too_short" : "required");
      }
      return;
    }
    track("form_step_complete", { form_id: FORM_ID, step: 1, step_id: "about_you" });
    setStep(1);
  }

  useEffect(() => {
    if (step === 1) {
      if (!step2ViewFired.current) {
        step2ViewFired.current = true;
        track("form_step_view", { form_id: FORM_ID, step: 2, step_id: "your_details" });
      }
      step2HeaderRef.current?.focus();
    }
  }, [step]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const honeypotValue = (honeypotRef.current?.value ?? "").trim();

    const errs = validateStep2();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const field of Object.keys(errs)) {
        const kind =
          field === "email" ? "invalid_email"
          : field === "phone" ? "invalid_phone"
          : "required";
        onError(field, kind);
      }
      return;
    }

    setStatus("loading");

    const completedCount =
      [role, message, fullName, email, phone].filter((v) => v.trim()).length + (consent ? 1 : 0);
    trackFormSubmit(completedCount);
    track("form_step_complete", { form_id: FORM_ID, step: 2, step_id: "your_details" });

    const result = await submitSiteLead(
      {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        message: message.trim(),
        source: niche.content_strategy.source_identifier,
        source_url: sourceUrl,
        submitted_at: new Date().toISOString(),
        consent_given: consent,
        consent_text: consentText,
        consent_at: new Date().toISOString(),
        visitor_id: getVisitorId() ?? undefined,
        session_id: getSessionId() ?? undefined,
        extras: {
          ...(platforms ? { platforms } : {}),
          ...(monthlyRevenueBand ? { monthly_revenue_band: monthlyRevenueBand } : {}),
          ...(vatRegistered ? { vat_registered: vatRegistered } : {}),
          ...(stockLocation ? { stock_location: stockLocation } : {}),
          ...(fulfilmentModel ? { fulfilment_model: fulfilmentModel } : {}),
        },
      },
      honeypotValue,
    );

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again shortly.");
      return;
    }

    setStatus("success");
    onLead({ role });

    if (redirectOnSuccess) {
      setTimeout(() => router.push(successRedirect), 800);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate aria-busy={status === "loading"}>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="enquiry_ref">Leave blank</label>
        <input
          ref={honeypotRef}
          id="enquiry_ref"
          type="text"
          name="enquiry_ref"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500" aria-live="polite">
        Step {step + 1} of 2 &middot; {step === 0 ? "About you" : "Your details"}
      </p>

      {step === 0 && (
        <>
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            {fieldErrors.role && <p id="role-error" className={errorClass}>{fieldErrors.role}</p>}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              onFocus={() => onFieldFocus("message")}
              onBlur={(e) => onFieldBlur("message", !!e.target.value)}
            />
            {fieldErrors.message && (
              <p id="message-error" className={errorClass}>{fieldErrors.message}</p>
            )}
          </div>

          <button type="button" onClick={goToStep2} className={btnClass}>
            Continue
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h3 ref={step2HeaderRef} tabIndex={-1} className="text-lg font-semibold text-neutral-900 outline-none">
            Where should we send our reply?
          </h3>

          <div>
            <label htmlFor="fullName" className={labelClass}>Full name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              maxLength={100}
              placeholder={niche.lead_form.placeholders.name}
              className={fieldClass}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={!!fieldErrors.fullName}
              aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              onFocus={() => onFieldFocus("fullName")}
              onBlur={(e) => onFieldBlur("fullName", !!e.target.value)}
            />
            {fieldErrors.fullName && (
              <p id="fullName-error" className={errorClass}>{fieldErrors.fullName}</p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                maxLength={100}
                placeholder={niche.lead_form.placeholders.email}
                className={fieldClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                onFocus={() => onFieldFocus("email")}
                onBlur={(e) => onFieldBlur("email", !!e.target.value, e.target.value.length)}
              />
              {fieldErrors.email && (
                <p id="email-error" className={errorClass}>{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                maxLength={20}
                placeholder={niche.lead_form.placeholders.phone}
                className={fieldClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                onFocus={() => onFieldFocus("phone")}
                onBlur={(e) => onFieldBlur("phone", !!e.target.value)}
              />
              {fieldErrors.phone && (
                <p id="phone-error" className={errorClass}>{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="platforms" className={labelClass}>
              Platforms sold on <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <input
              type="text"
              id="platforms"
              name="platforms"
              maxLength={200}
              placeholder="e.g. Amazon, Shopify, eBay"
              className={fieldClass}
              value={platforms}
              onChange={(e) => setPlatforms(e.target.value)}
              onFocus={() => onFieldFocus("platforms")}
              onBlur={(e) => onFieldBlur("platforms", !!e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="monthly_revenue_band" className={labelClass}>
              Monthly revenue band <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <select
              id="monthly_revenue_band"
              name="monthly_revenue_band"
              className={fieldClass}
              value={monthlyRevenueBand}
              onChange={(e) => setMonthlyRevenueBand(e.target.value)}
              onFocus={() => onFieldFocus("monthly_revenue_band")}
              onBlur={(e) => onFieldBlur("monthly_revenue_band", !!e.target.value)}
            >
              <option value="">Select...</option>
              <option value="under_5k">Under £5k</option>
              <option value="5k_20k">£5k&ndash;£20k</option>
              <option value="20k_100k">£20k&ndash;£100k</option>
              <option value="100k_plus">£100k+</option>
            </select>
          </div>

          <div>
            <label htmlFor="vat_registered" className={labelClass}>
              VAT registered? <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <select
              id="vat_registered"
              name="vat_registered"
              className={fieldClass}
              value={vatRegistered}
              onChange={(e) => setVatRegistered(e.target.value)}
              onFocus={() => onFieldFocus("vat_registered")}
              onBlur={(e) => onFieldBlur("vat_registered", !!e.target.value)}
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>

          <div>
            <label htmlFor="stock_location" className={labelClass}>
              Stock location <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <select
              id="stock_location"
              name="stock_location"
              className={fieldClass}
              value={stockLocation}
              onChange={(e) => setStockLocation(e.target.value)}
              onFocus={() => onFieldFocus("stock_location")}
              onBlur={(e) => onFieldBlur("stock_location", !!e.target.value)}
            >
              <option value="">Select...</option>
              <option value="uk_only">UK only</option>
              <option value="eu_fulfilment">EU fulfilment</option>
              <option value="fba_3pl_abroad">FBA/3PL abroad</option>
              <option value="dropship">Dropship</option>
            </select>
          </div>

          <div>
            <label htmlFor="fulfilment_model" className={labelClass}>
              Fulfilment model <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <select
              id="fulfilment_model"
              name="fulfilment_model"
              className={fieldClass}
              value={fulfilmentModel}
              onChange={(e) => setFulfilmentModel(e.target.value)}
              onFocus={() => onFieldFocus("fulfilment_model")}
              onBlur={(e) => onFieldBlur("fulfilment_model", !!e.target.value)}
            >
              <option value="">Select...</option>
              <option value="own_warehouse">Own warehouse</option>
              <option value="fba">FBA</option>
              <option value="3pl">3PL</option>
              <option value="dropship">Dropship</option>
              <option value="digital">Digital</option>
            </select>
          </div>

          <div>
            <label htmlFor="consent" className="flex items-start gap-3 text-xs leading-relaxed text-neutral-600">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand-primary)]"
                aria-invalid={!!fieldErrors.consent}
                aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
              />
              <span>
                {siteConfig.leadConsentText} See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p id="consent-error" className={errorClass}>{fieldErrors.consent}</p>
            )}
          </div>

          {errorMessage && (
            <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          {status === "success" && !redirectOnSuccess && (
            <div role="status" className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-900">
                Thanks. We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !consent}
              className={btnClass}
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Sent" : submitLabel}
            </button>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-sm font-medium text-neutral-500 underline"
            >
              Back
            </button>
          </div>

          <p className="text-xs leading-relaxed text-neutral-500">
            We respond within 24 hours and store your details securely.
          </p>
        </>
      )}
    </form>
  );
}
