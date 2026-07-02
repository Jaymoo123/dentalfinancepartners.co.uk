"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitPropertyLead, type PropertyLeadPayload } from "@/lib/leads/submit-client";
import { validateEnquiryParts, composeEnquiryMessage, SITUATION_MIN_CHARS } from "@/lib/leads/enquiry-message";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { setBookingNudge } from "@accounting-network/web-shared/analytics/visitMemory";

const fieldClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors";

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
  const [situationLen, setSituationLen] = useState(0);
  const ft = useFormTracking("lead_form");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourceUrl(window.location.href);
    }
  }, []);

  const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const role = String(data.get("role") || "").trim();

    if (fullName.length < 2) errs.fullName = "Enter your name.";
    if (!emailRe.test(email)) errs.email = "Enter a valid email address.";

    if (phone.length === 0) {
      errs.phone = "Enter a phone number we can call you on.";
    } else if (!ukPhoneRe.test(phone)) {
      errs.phone = "Use only digits, spaces, +, -, ( ), e.g. 07700 900123";
    } else if (!hasMinDigits(phone, 10)) {
      errs.phone = "Enter at least 10 digits.";
    }

    if (!role) errs.role = "Select your landlord type.";

    const situation = String(data.get("situation") || "").trim();
    const prompted = String(data.get("prompted") || "").trim();
    const callGoal = String(data.get("callGoal") || "").trim();
    const enquiryErrs = validateEnquiryParts({ situation, prompted, callGoal });
    Object.assign(errs, enquiryErrs);

    return errs;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    // Capture honeypot value; the server decides what to do with it (never silently drops).
    const honeypotValue = String(data.get("enquiry_ref") || "").trim();

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const [field, kind] of Object.entries(errs)) ft.onError(field, kind ? "validation" : "validation");
      return;
    }
    ft.onSubmit(Object.keys(data).length);

    setStatus("loading");
    const situation = String(data.get("situation") || "").trim();
    const prompted = String(data.get("prompted") || "").trim();
    const callGoal = String(data.get("callGoal") || "").trim();
    const payload: PropertyLeadPayload = {
      full_name: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role: String(data.get("role") || "").trim(),
      message: composeEnquiryMessage({ situation, prompted, callGoal }),
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl || String(data.get("sourceUrl") || "").trim(),
      submitted_at: new Date().toISOString(),
      // Legitimate-interests acknowledgement: submitting the form IS the affirmative
      // act, so this is always true; consent_text records the exact wording shown
      // (data-sharing agreement Annex B.1) as the audit trail.
      consent_given: true,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      // Stitch this lead to its anonymous first-party journey (no-op if untracked).
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
    };

    const result = await submitPropertyLead(payload, honeypotValue);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or email us directly.");
      ft.onError("form", "server");
      return;
    }

    // First-party conversion event (system of record), stitched to the journey.
    ft.onLead({ source: payload.source, role: payload.role });

    // Track conversion in Google Analytics
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

    if (result.needsCheck) {
      // Lead was recorded but the phone number looks wrong. Stay on the form.
      setStatus("idle");
      setFieldErrors({ phone: "That number does not look right. Please check it and submit again." });
      return;
    }

    setStatus("success");
    form.reset();
    setSituationLen(0);

    // Remember the booking capability (token only, nothing personal) so the
    // continuity layer can nudge them back to pick a slot until they book.
    if (result.bookingToken) setBookingNudge(result.bookingToken, Date.now() + 14 * 24 * 3600000);

    if (redirectOnSuccess) {
      // Carry the signed booking token so the thank-you page can offer the
      // native slot picker straight away (the highest-intent moment).
      const bt = result.bookingToken ? `?bt=${encodeURIComponent(result.bookingToken)}` : "";
      setTimeout(() => {
        router.push(`/thank-you${bt}`);
      }, 800);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={(e) => {
        const t = e.target as HTMLElement & { name?: string };
        if (t?.name) ft.onFieldFocus(t.name);
      }}
      onBlurCapture={(e) => {
        const t = e.target as HTMLElement & { name?: string; value?: string };
        if (t?.name) ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
      }}
      className="space-y-5"
      noValidate
      aria-busy={status === "loading"}
    >
      <input type="hidden" name="sourceUrl" value={sourceUrl} />
      {/* Honeypot: off-screen, hidden from humans; only bots fill it. Non-semantic name so
          browser autofill / password managers don't target it (was company_url). */}
      <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />

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
          />
          {fieldErrors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs font-medium text-red-600">
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="situation" className="block text-sm font-semibold text-slate-900">
          Your situation
        </label>
        <textarea
          id="situation"
          name="situation"
          required
          rows={4}
          maxLength={800}
          placeholder="e.g. I own two buy to lets in my own name and this year's tax bill has jumped. Wondering if a limited company makes sense."
          className={fieldClass}
          aria-invalid={!!fieldErrors.situation}
          aria-describedby={fieldErrors.situation ? "situation-error" : "situation-hint"}
          onChange={(e) => setSituationLen(e.target.value.trim().length)}
        />
        {fieldErrors.situation ? (
          <p id="situation-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.situation}
          </p>
        ) : (
          <p
            id="situation-hint"
            className={
              situationLen >= SITUATION_MIN_CHARS
                ? "mt-1.5 text-xs font-medium text-emerald-700"
                : "mt-1.5 text-xs text-slate-500"
            }
          >
            {situationLen === 0
              ? "A couple of sentences helps us prepare properly for your call."
              : situationLen < SITUATION_MIN_CHARS
                ? "Keep going. A couple of sentences helps us prepare properly for your call."
                : "Thanks, that gives us plenty to work with."}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="prompted" className="block text-sm font-semibold text-slate-900">
          What&#39;s prompted this now?
        </label>
        <input
          type="text"
          id="prompted"
          name="prompted"
          required
          maxLength={200}
          placeholder="e.g. Just received my Self Assessment bill"
          autoComplete="off"
          className={fieldClass}
          aria-invalid={!!fieldErrors.prompted}
          aria-describedby={fieldErrors.prompted ? "prompted-error" : undefined}
        />
        {fieldErrors.prompted && (
          <p id="prompted-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.prompted}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="callGoal" className="block text-sm font-semibold text-slate-900">
          What do you want from the call?
        </label>
        <input
          type="text"
          id="callGoal"
          name="callGoal"
          required
          maxLength={200}
          placeholder="e.g. To know whether a limited company would save me money"
          autoComplete="off"
          className={fieldClass}
          aria-invalid={!!fieldErrors.callGoal}
          aria-describedby={fieldErrors.callGoal ? "callGoal-error" : undefined}
        />
        {fieldErrors.callGoal && (
          <p id="callGoal-error" className="mt-1.5 text-xs font-medium text-red-600">
            {fieldErrors.callGoal}
          </p>
        )}
      </div>

      {/* Data-sharing acknowledgement (legitimate interests, not consent): submitting
          the enquiry is the affirmative act, so this is shown as a notice, not a
          tick-box (data-sharing agreement Annex B.1). */}
      <p className="text-xs leading-relaxed text-slate-500">
        {siteConfig.leadConsentText} See our{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
          Privacy Policy
        </a>
        .
      </p>

      {errorMessage && (
        <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{errorMessage}</p>
        </div>
      )}

      {status === "success" && !redirectOnSuccess && (
        <div role="status" className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Thanks! We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`${btnPrimary} w-full`}
      >
        {status === "loading" ? "Verifying your details..." : status === "success" ? "Sent!" : submitLabel}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">
        We respond within 24 hours and store your details securely.
      </p>
    </form>
  );
}
