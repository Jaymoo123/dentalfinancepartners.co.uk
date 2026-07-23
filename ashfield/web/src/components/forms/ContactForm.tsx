"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "mt-2 w-full min-h-12 touch-manipulation rounded-none border border-hairline-strong bg-white px-3.5 py-3 font-sans text-[1.0625rem] text-ink placeholder:text-ink-45 transition-colors duration-[180ms] focus:border-navy focus:outline-none";

const labelClass = "block font-sans text-sm font-medium text-ink";
const errorClass = "mt-2 font-sans text-xs text-red-700";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ENQUIRY_TYPES = [
  { value: "rent-a-site", label: "Rent a site" },
  { value: "buy-leads", label: "Buy leads" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

// In-house handling: Ashfield enquiries are never shared with a partner firm.
export const CONSENT_TEXT =
  "I agree to Ashfield Trading Ltd using my details to respond to my enquiry and to follow up about the services I have asked about. Enquiries are handled in-house and are not shared with any third-party firm. I can opt out at any time.";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    setSourceUrl(window.location.href);
  }, []);

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (String(data.get("fullName") || "").trim().length < 2) errs.fullName = "Enter your name.";
    if (!emailRe.test(String(data.get("email") || "").trim()))
      errs.email = "Enter a valid email address.";
    if (!String(data.get("enquiryType") || "").trim()) errs.enquiryType = "Select an option.";
    // ponytail: message floor mirrors the server's email_only minMessage (10 chars)
    if (String(data.get("message") || "").trim().length < 10)
      errs.message = "Tell us a sentence or two about what you are looking for.";
    if (!consent) errs.consent = "Please tick the box to continue.";
    return errs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");

    const enquiryType = String(data.get("enquiryType") || "").trim();
    const firmName = String(data.get("firmName") || "").trim();
    const now = new Date().toISOString();

    const payload = {
      full_name: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: "",
      role:
        ENQUIRY_TYPES.find((t) => t.value === enquiryType)?.label ?? "Other",
      message: String(data.get("message") || "").trim(),
      // ponytail: no phone field on this commercial form, so the server's
      // email_only validation path (email + message) is the correct contract.
      captureMode: "email_only",
      source: "ashfield",
      source_url: sourceUrl,
      submitted_at: now,
      consent_given: consent,
      consent_text: `${CONSENT_TEXT} See our Privacy Policy.`,
      consent_at: now,
      // Honeypot passes through to the server, which stores flagged rather than
      // dropping (browser autofill has caught real humans before).
      enquiry_ref: String(data.get("enquiry_ref") || "").trim(),
      ...(firmName ? { extras: { firm_name: firmName, enquiry_type: enquiryType } } : { extras: { enquiry_type: enquiryType } }),
    };

    let ok = false;
    let serverError: string | null = null;
    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;
      ok = res.ok && json?.success === true;
      serverError = json?.error ?? null;
    } catch {
      ok = false;
    }

    if (!ok) {
      setStatus("error");
      setErrorMessage(serverError || "Something went wrong. Please try again shortly.");
      return;
    }

    setStatus("success");
    form.reset();
    setConsent(false);
    router.push("/thank-you");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate aria-busy={status === "loading"}>
      {/* Honeypot: visually hidden, bots fill it, humans never reach it. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="enquiry_ref">Leave blank</label>
        <input id="enquiry_ref" type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="fullName" className={labelClass}>
          Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          maxLength={100}
          className={fieldClass}
          aria-invalid={!!fieldErrors.fullName}
          aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
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
            className={fieldClass}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className={errorClass}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="firmName" className={labelClass}>
            Firm name <span className="font-normal text-ink-45">(optional)</span>
          </label>
          <input
            type="text"
            id="firmName"
            name="firmName"
            autoComplete="organization"
            maxLength={120}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="enquiryType" className={labelClass}>
          What is your enquiry about?
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          autoComplete="off"
          className={fieldClass}
          defaultValue=""
          aria-invalid={!!fieldErrors.enquiryType}
          aria-describedby={fieldErrors.enquiryType ? "enquiryType-error" : undefined}
        >
          <option value="" disabled>
            Select an option
          </option>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {fieldErrors.enquiryType && (
          <p id="enquiryType-error" className={errorClass}>
            {fieldErrors.enquiryType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          placeholder="Which niche are you interested in, and roughly what capacity do you have for new clients?"
          className={fieldClass}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="message-error" className={errorClass}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="consent"
          className="flex items-start gap-3 font-sans text-xs leading-relaxed text-ink-70"
        >
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-navy"
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
          />
          <span>
            {CONSENT_TEXT} See our{" "}
            <a href="/privacy-policy" className="font-medium text-navy underline">
              privacy policy
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
          <p className="font-sans text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={status === "loading" || status === "success" || !consent}
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Sent" : "Send enquiry"}
      </Button>

      <p className="type-caption !text-ink-70">
        We reply within one working day and store your details securely.
      </p>
    </form>
  );
}
