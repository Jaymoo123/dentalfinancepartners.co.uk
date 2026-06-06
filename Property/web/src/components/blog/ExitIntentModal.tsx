"use client";

import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { track } from "@/lib/analytics/track";
import { getVisitorId, getSessionId } from "@/lib/analytics/ids";

type Status = "idle" | "loading" | "success" | "error";

const STORAGE_KEY = "blog-exit-intent-dismissed-v1";
const SUPPRESS_DAYS = 30;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors";

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const ts = Number(raw);
  if (!Number.isFinite(ts)) return false;
  const ageMs = Date.now() - ts;
  return ageMs < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
}

function suppress(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
}

function isLikelyDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
}

export function ExitIntentModal({ topic }: { topic?: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const ft = useFormTracking("exit_intent_form");

  // Record when the exit-intent modal is actually shown (a UX/funnel signal).
  useEffect(() => {
    if (open) track("exit_intent_shown", { topic: topic || "" });
  }, [open, topic]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLikelyDesktop()) return;
    if (isSuppressed()) return;

    setSourceUrl(window.location.href);

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 10000);

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY > 0) return;
      if (isSuppressed()) return;
      setOpen(true);
      suppress();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  const consentText = `I agree to my details being shared by ${niche.display_name} with specialist partners for the purpose of responding to my enquiry and providing specialist advice. See our Privacy Policy.`;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    const email = String(data.get("email") || "").trim();
    if (!emailRe.test(email)) errs.email = "Enter a valid email address.";
    if (!data.get("consent")) errs.consent = "Please tick the box to continue.";
    return errs;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "").trim() !== "") return; // honeypot
    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    ft.onSubmit(2);

    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setErrorMessage("Form not connected. Email us directly, we respond same day.");
      return;
    }

    setStatus("loading");
    const topicTag = topic ? ` (${topic})` : "";
    const payload = {
      full_name: "—",
      email: String(data.get("email") || "").trim(),
      phone: "",
      role: "Other",
      practice_name: "—",
      message: `[Exit intent${topicTag}] Email-only capture`,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      consent_given: consent,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
    };

    const result = await submitLead(payload, supabaseUrl, supabaseKey);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: "exit_intent" });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `${niche.niche_id}_exit_intent`,
          value: 1,
        });
      }
    }

    setStatus("success");
    setConsent(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-lg border-l-4 border-emerald-600 bg-white p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-lg"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Before you go
        </p>
        <h2 id="exit-intent-heading" className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          Want a free 20-minute review of your situation?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Drop your email. We&apos;ll send a short note with the next sensible step for your case, no phone call needed.
        </p>

        {status === "success" ? (
          <div role="status" className="mt-5 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Thanks. Look out for our note within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            onFocusCapture={(e) => {
              const t = e.target;
              if (t instanceof HTMLInputElement && t.name) ft.onFieldFocus(t.name);
            }}
            onBlurCapture={(e) => {
              const t = e.target;
              if (t instanceof HTMLInputElement && t.name)
                ft.onFieldBlur(t.name, Boolean(t.value), t.name === "email" ? t.value.length : undefined);
            }}
            className="mt-5 space-y-4"
            noValidate
            aria-busy={status === "loading"}
          >
            {/* Honeypot: off-screen, hidden from humans; only bots fill it. */}
            <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />
            <div>
              <label htmlFor="exit-email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="exit-email"
                name="email"
                required
                autoComplete="email"
                maxLength={100}
                placeholder={niche.lead_form.placeholders.email}
                className={inputClass}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "exit-email-error" : undefined}
              />
              {fieldErrors.email && (
                <p id="exit-email-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="exit-consent" className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  id="exit-consent"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                  aria-invalid={!!fieldErrors.consent}
                  aria-describedby={fieldErrors.consent ? "exit-consent-error" : undefined}
                />
                <span>
                  I agree to my details being shared by {niche.display_name} with specialist partners for the purpose of responding to my enquiry and providing specialist advice. See our{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {fieldErrors.consent && (
                <p id="exit-consent-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.consent}
                </p>
              )}
            </div>

            {errorMessage && (
              <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !consent}
              className={`${btnPrimary} w-full`}
            >
              {status === "loading" ? "Sending..." : "Send me a review"}
            </button>
            <p className="text-xs text-slate-500">
              We respond within 24 hours and store your email securely.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
