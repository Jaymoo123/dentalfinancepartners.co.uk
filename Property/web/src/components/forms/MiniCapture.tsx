"use client";

/**
 * Reusable QUALIFIED lead capture used across the conversion surfaces (calculator
 * result, resource block, mobile tool, exit-intent, blog inline). Collects name +
 * phone + email + message, all required, for callable / named / contextful leads
 * fit for partner handoff. Topic-aware, acknowledgement-based, honeypot-protected, and
 * fully stitched to the first-party journey (visitor_id/session_id) so it fires
 * form_start / form_submit / lead_submitted.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { trackExperimentView, trackExperimentAction } from "@/lib/experiments/exposure";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors";

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. We'll be in touch within 24 hours.",
  className = "my-8 rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8",
  experimentKey,
  exposeOnView = true,
  onSuccess,
}: {
  /** Surface id for analytics (form tracking + GA label), e.g. "calc_result". */
  formId: string;
  /** Lead role written to the leads table (default "Other"). */
  role?: string;
  /** Prefix for the lead message, e.g. "[Calculator result: section-24]". */
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
  /** Parent A/B experiment this capture belongs to (e.g. "exit_intent_offer").
   *  Drives experiment_view (on scroll-into-view, unless exposeOnView=false) +
   *  experiment_action (on first field focus = engaged the capture). */
  experimentKey?: string;
  /** Set false when the parent surface already fires the exposure itself (e.g.
   *  the exit-intent modal fires it once on open for both arms). */
  exposeOnView?: boolean;
  /** Called after a successful lead submit (e.g. so a result-gate can reveal the
   *  result). The lead is already recorded + the visitor marked converted. */
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const ft = useFormTracking(formId);

  // Building-block funnel: exposure on scroll-into-view (unless the parent fires
  // its own), and the proximal "engaged the capture" action on first field focus.
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

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    if (String(data.get("full_name") || "").trim().length < 2) errs.full_name = "Enter your name.";
    if (!emailRe.test(String(data.get("email") || "").trim())) errs.email = "Enter a valid email address.";
    const digits = String(data.get("phone") || "").replace(/\D/g, "");
    if (digits.length < 10) errs.phone = "Enter a phone number we can call you on.";
    if (String(data.get("message") || "").trim().length < 10) errs.message = "Tell us a sentence or two about your situation.";
    return errs;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "").trim() !== "") {
      ft.onError("company_url", "honeypot"); // value-free diagnostic; behaviour unchanged (still blocks)
      return;
    }
    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    ft.onSubmit(4); // passed validation, about to POST

    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setErrorMessage("Form not connected. Email us directly, we respond same day.");
      return;
    }

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
      // Legitimate-interests acknowledgement: submitting IS the affirmative act, so
      // this is always true; consent_text records the exact wording shown (Annex B.1).
      consent_given: true,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
    };

    const result = await submitLead(payload, supabaseUrl, supabaseKey);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag("event", "generate_lead", { event_category: "engagement", event_label: `${niche.niche_id}_${formId}`, value: 1 });
    }

    setStatus("success");
    form.reset();
    onSuccess?.();
  }

  return (
    <section ref={expRef} className={className} aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-slate-900 sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
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
          {/* Honeypot */}
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />

          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-slate-900">Full name</label>
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
            {fieldErrors.full_name && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.full_name}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-slate-900">Email</label>
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
              {fieldErrors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-slate-900">Phone</label>
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
              {fieldErrors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-slate-900">How can we help?</label>
            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={3}
              maxLength={1000}
              placeholder="A sentence or two about your situation helps us help you"
              className={inputClass}
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.message}</p>}
          </div>

          {/* Data-sharing acknowledgement (legitimate interests, not consent):
              submitting is the affirmative act, so this is a notice, not a tick-box
              (data-sharing agreement Annex B.1). */}
          <p className="text-xs leading-relaxed text-slate-500">
            {siteConfig.leadConsentText} See our{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">Privacy Policy</a>.
          </p>

          {errorMessage && (
            <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <button type="submit" disabled={status === "loading"} className={`${btnPrimary} w-full sm:w-auto`}>
            {status === "loading" ? "Sending..." : submitLabel}
          </button>
        </form>
      )}
    </section>
  );
}
