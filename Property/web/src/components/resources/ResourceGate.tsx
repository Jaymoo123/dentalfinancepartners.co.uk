"use client";

/**
 * Email-gated download unlock — a FORK of InlineMiniLeadForm (keeps the honeypot,
 * mandatory consent, submitLead, useFormTracking, visitor/session ids and
 * validation). It gates DOWNLOADS only — never page content.
 *
 * On a successful lead insert it:
 *   - reveals the (enabled) download links inline,
 *   - fires "/api/resources/deliver" so the lead is ALSO emailed the links,
 *   - tracks "resource_unlocked" + the GA generate_lead event.
 *
 * Feature flag: if neither the xlsx nor the guide is enabled for this topic, the
 * component renders NOTHING (the injection wiring only mounts it when an asset is
 * enabled, but this is a belt-and-braces guard so it can never gate a missing
 * file). PHASE A: all assets disabled → renders null everywhere.
 */
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { getVisitorId, getSessionId } from "@/lib/analytics/ids";
import { track } from "@/lib/analytics/track";
import type { TopicKey } from "@/lib/intent/taxonomy";
import {
  resourceForTopic,
  isXlsxEnabled,
  isGuideEnabled,
  hasEnabledResource,
} from "@/lib/resources/registry";
import type { GateCopy } from "@/lib/resources/copy";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors";

export function ResourceGate({ topic, copy }: { topic: TopicKey; copy: GateCopy }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const ft = useFormTracking("resource_gate");

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  const resource = resourceForTopic(topic);

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

    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setErrorMessage("Download not connected. Email us directly, we respond same day.");
      return;
    }

    setStatus("loading");
    const email = String(data.get("email") || "").trim();
    const magnetTitle = resource?.magnetTitle ?? "resource";
    const payload = {
      full_name: "—",
      email,
      phone: "",
      role: "resource",
      practice_name: "—",
      message: `[Resource: ${topic}] ${magnetTitle}`,
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

    ft.onLead({ source: payload.source, role: "resource" });
    track("resource_unlocked", { topic });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `${niche.niche_id}_resource_${topic}`,
          value: 1,
        });
      }
    }

    // Also email the lead the links (separate from the internal notify/sync).
    // Best-effort: the inline reveal works regardless of this call's outcome.
    try {
      void fetch("/api/resources/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          email,
          visitor_id: getVisitorId() || undefined,
          session_id: getSessionId() || undefined,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* delivery email is best-effort; the inline download still works */
    }

    setStatus("success");
    setConsent(false);
  }

  // Belt-and-braces feature flag: never render the gate for a topic with no
  // enabled+present asset. The injection wiring also checks this, so in Phase A
  // (everything disabled) the gate is never mounted AND would render null anyway.
  if (!hasEnabledResource(topic)) return null;

  const xlsxReady = isXlsxEnabled(resource);
  const guideReady = isGuideEnabled(resource);

  return (
    <section
      className="my-12 border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8"
      aria-labelledby="resource-gate-heading"
    >
      <h3 id="resource-gate-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
        {copy.heading}
      </h3>
      <p className="mt-2 text-sm text-slate-700 leading-relaxed">{copy.blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            You&apos;re in. Your downloads are ready below, and we&apos;ve emailed you a copy of the links.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            {xlsxReady && resource?.xlsx && (
              <a
                href={resource.xlsx.file}
                className={`${btnPrimary} text-center`}
                download
              >
                {resource.xlsx.label}
              </a>
            )}
            {guideReady && resource?.guide && (
              <a
                href={`/resources/${resource.guide.slug}`}
                className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-600 px-5 py-3 text-base font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                {resource.guide.label}
              </a>
            )}
          </div>
        </div>
      ) : (
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
          className="mt-5 space-y-4"
          noValidate
          aria-busy={status === "loading"}
        >
          {/* Honeypot: off-screen, hidden from humans; only bots fill it. */}
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
          />
          <div>
            <label htmlFor="resource-email" className="block text-sm font-semibold text-slate-900">
              Email
            </label>
            <input
              type="email"
              id="resource-email"
              name="email"
              required
              autoComplete="email"
              maxLength={100}
              placeholder={niche.lead_form.placeholders.email}
              className={inputClass}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "resource-email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="resource-email-error" className="mt-1.5 text-xs font-medium text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="resource-consent"
              className="flex items-start gap-3 text-xs leading-relaxed text-slate-600"
            >
              <input
                type="checkbox"
                id="resource-consent"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                aria-invalid={!!fieldErrors.consent}
                aria-describedby={fieldErrors.consent ? "resource-consent-error" : undefined}
              />
              <span>
                I agree to my details being shared by {niche.display_name} with specialist partners for the
                purpose of responding to my enquiry and providing specialist advice. See our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 underline"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p id="resource-consent-error" className="mt-1.5 text-xs font-medium text-red-600">
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
            className={`${btnPrimary} w-full sm:w-auto`}
          >
            {status === "loading" ? "Unlocking..." : "Email me the downloads"}
          </button>
        </form>
      )}
    </section>
  );
}
