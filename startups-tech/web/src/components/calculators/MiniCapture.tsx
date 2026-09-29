"use client";

import { useEffect, useState } from "react";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { site } from "@/lib/calculators/site";
import { focusRing, btnPrimary } from "@/components/ui/layout-utils";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
 * The ring is `focusRing` from src/components/ui/layout-utils.ts, not a
 * retyped copy of its four utilities. Same value, one source: the phase-1
 * decline note on that export is what makes --focus-ring the site's only ring
 * token, and a hand-written duplicate here would silently survive a change to
 * it. The bare `outline-none` that used to sit here set `outline-style: none`
 * unconditionally, which defeats `focusRing`'s `focus-visible:outline` (it
 * resolves its style from the same property): a real Tab measured no ring at
 * all. Removed, along with the second `focus:ring-2 focus:ring-primary-600/25`
 * layer (1.46:1 on this ground), so `focusRing` is the only ring mechanism.
 * slate-600 placeholder is 5.90 on white and slate-900 input text is 17.85.
 */
const inputClass =
  `mt-1 w-full min-h-12 touch-manipulation border border-slate-200 bg-white px-3.5 py-3 text-base text-slate-900 placeholder:text-slate-600 shadow-sm focus:border-primary-600 ${focusRing} transition-colors`;

export function MiniCapture({
  formId,
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. We'll be in touch within one working day.",
  className = "my-8 rounded-2xl border-l-4 border-primary-600 bg-slate-50 p-6 sm:p-8",
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

  const consentText = `${site.leadConsentText} See our Privacy Policy.`;

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
      errs.message = "Tell us a sentence or two about your business.";
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
      // Legitimate-interests acknowledgement: submitting the form IS the affirmative
      // act, so this is always true; consent_text records the exact wording shown
      // as the audit trail.
      consent_given: true,
      consent_text: consentText,
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
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-slate-900 sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-primary-600/30 bg-white p-4">
          <p className="text-sm font-semibold text-primary-700">{successText}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2" noValidate>
          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-slate-900">
              Your name
            </label>
            <input id={`${formId}-name`} name="full_name" type="text" autoComplete="name" className={inputClass} />
            {fieldErrors.full_name && <p className="mt-1 text-xs text-red-700">{fieldErrors.full_name}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-slate-900">
              Phone
            </label>
            <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-700">{fieldErrors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-slate-900">
              Email
            </label>
            <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-700">{fieldErrors.email}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-slate-900">
              About your business
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={3}
              className={inputClass}
              placeholder="e.g. We are raising a seed round and want to check our SEIS eligibility, or we need to set up an EMI scheme..."
            />
            {fieldErrors.message && <p className="mt-1 text-xs text-red-700">{fieldErrors.message}</p>}
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

          {/* Data-sharing acknowledgement (legitimate interests, not consent): submitting
              the enquiry is the affirmative act, so this is shown as a notice, not a
              tick-box. */}
          <p className="sm:col-span-2 text-xs leading-relaxed text-slate-600">
            {site.leadConsentText} See our{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={`font-medium underline ${focusRing}`}>
              Privacy Policy
            </a>
            .
          </p>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              /* ADOPTED: `btnPrimary` from src/components/ui/layout-utils.ts,
                 which grounds on --btn-ground (primary-700, white label 7.90)
                 and carries the site's --focus-ring recipe. The old local
                 recipe grounded on primary-600 and signalled hover with
                 opacity, which drags the label's contrast down rather than
                 changing the ground. min-w-[10rem] comes with it and is
                 harmless on both submit labels. */
              className={btnPrimary}
            >
              {status === "loading" ? "Sending..." : submitLabel}
            </button>
            {status === "error" && errorMessage && (
              <p className="mt-2 text-sm text-red-700" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
