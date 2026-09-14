"use client";

import { useEffect, useState } from "react";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { niche } from "@/config/niche-loader";
import { btnPrimary } from "@/components/ui/layout-utils";
import { site } from "@/lib/calculators/site";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same recipe as the site's main LeadForm (components/forms/LeadForm.tsx:14),
// plus a focus RING: a 1px border colour change on its own is a weak focus
// indicator, and this form is the only one on the calculator pages.
const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-md border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-500 transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30";

export function MiniCapture({
  formId,
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. We'll be in touch.",
  // Radii and edges on the standard: rounded-xl with a slate ring, not the
  // pre-port rounded-2xl plus a 4px brand rule. Slate card on a white ground,
  // so it has an edge; the one caller that mounts this inside the calculator's
  // own white card passes its own className.
  className = "rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8",
}: {
  formId: string;
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs: Record<string, string> = {};
    if (String(data.get("full_name") || "").trim().length < 2) errs.full_name = "Enter your name.";
    if (!emailRe.test(String(data.get("email") || "").trim())) errs.email = "Enter a valid email address.";
    const digits = String(data.get("phone") || "").replace(/\D/g, "");
    if (digits.length < 10) errs.phone = "Enter a phone number we can call you on.";
    if (String(data.get("message") || "").trim().length < 10)
      errs.message = "Tell us a sentence or two about your situation.";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    const payload = {
      full_name: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role: "Other",
      message: `${messagePrefix}: ${String(data.get("message") || "").trim()}`,
      source: site.sourceIdentifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      // Legitimate-interests acknowledgement: submitting is the affirmative
      // act; consent_text stores the exact notice rendered below.
      consent_given: true,
      consent_text: site.leadConsentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
      enquiry_ref: honeypotValue,
    };

    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
      setHoneypotValue("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or use our contact page.");
    }
  }

  return (
    <section className={className} aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-[var(--ink)] sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-[var(--brand-primary)]/30 bg-white p-4">
          <p className="text-sm font-semibold text-[var(--brand-primary)]">{successText}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2" noValidate>
          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-[var(--ink)]">
              Your name
            </label>
            <input id={`${formId}-name`} name="full_name" type="text" autoComplete="name" className={inputClass} />
            {fieldErrors.full_name && <p className="mt-1 text-xs text-red-600">{fieldErrors.full_name}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-[var(--ink)]">
              Phone
            </label>
            <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-[var(--ink)]">
              Email
            </label>
            <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-[var(--ink)]">
              About your situation
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={3}
              className={inputClass}
              /* Was a HOSPITALITY placeholder ("pub with 12 staff ... tronc
                 setup and food VAT") on a crypto site, inherited from whichever
                 site this component was copied from. Now the canonical crypto
                 string, read from niche.config.json so it cannot drift from the
                 site's main lead form. */
              placeholder={niche.lead_form.placeholders.message}
            />
            {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
          </div>

          {/* Honeypot: non-semantic name, visually hidden, ignored by humans. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor={`${formId}-ref`}>Reference</label>
            <input
              id={`${formId}-ref`}
              name="enquiry_ref"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypotValue}
              onChange={(e) => setHoneypotValue(e.target.value)}
            />
          </div>

          {/* Data-sharing acknowledgement (legitimate interests, not consent):
              submitting is the affirmative act, so this is a notice, not a
              tick-box. Rendered text is stored byte-identical as consent_text. */}
          <div className="sm:col-span-2">
            <p className="text-xs leading-relaxed text-[var(--muted)]">{site.leadConsentText}</p>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              /* The site button recipe, not a fourth hand-rolled one. It already
                 fixes display, size, padding, weight, hover, disabled and a
                 focus-visible outline this button previously had none of, so
                 nothing is appended on top of it: a competing single-class
                 utility would tie on specificity and be settled by Tailwind's
                 emission order rather than by this class string. */
              className={btnPrimary}
            >
              {status === "loading" ? "Sending..." : submitLabel}
            </button>
            {status === "error" && errorMessage && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
