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
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { trackExperimentView, trackExperimentAction } from "@/lib/experiments/exposure";
import type { TopicKey } from "@/lib/intent/taxonomy";
import {
  resourceForTopic,
  isXlsxEnabled,
  isGuideEnabled,
  hasEnabledResource,
} from "@/lib/resources/registry";
import type { GateCopy } from "@/lib/resources/copy";
import { ExcelPreview } from "@/components/resources/ExcelPreview";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-11 touch-manipulation rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors";

export function ResourceGate({
  topic,
  copy,
  split = false,
  placement = "calculator",
  category,
}: {
  topic: TopicKey;
  copy: GateCopy;
  /** side-by-side preview + form when the container is wide (calc page); the
   *  default is a single stacked column (preview, then form) for narrow places
   *  like blog posts. */
  split?: boolean;
  /** Where the gate is surfaced — "calculator" | "blog" | "embed". */
  placement?: string;
  /** Blog category slug when placement === "blog". */
  category?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const ft = useFormTracking("resource_gate");
  const startedExpRef = useRef(false);

  // Shared event context: which topic, and where the gate is surfaced.
  const gateBase = { topic, placement, ...(category ? { category } : {}) };

  // Gate impression: fire gate_view the first time the gate scrolls into view —
  // the denominator for the view -> unlock rate (the gate is often mid-article).
  // This is also the gate_to_form experiment's control-arm exposure.
  const rootRef = useInViewOnce<HTMLElement>(() => {
    track("gate_view", gateBase);
    trackExperimentView("gate_to_form", "resource_block");
  });

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  const resource = resourceForTopic(topic);

  // Email-only resource downloads are NOT shared with the partner firm (agreement
  // Annex B.2), so they use the marketing-consent wording, never the lead
  // acknowledgement, and keep a tick-to-consent box.
  const consentText = `${siteConfig.resourceConsentText} See our Privacy Policy.`;

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
      full_name: "",
      email,
      phone: "",
      role: "resource",
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
    track("resource_unlocked", gateBase);

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
      ref={rootRef}
      className="not-prose @container my-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-16px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.03]"
      aria-labelledby="resource-gate-heading"
    >
      {/* Branded top accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />

      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-2 sm:px-6 sm:py-2.5">
        <h3 id="resource-gate-heading" className="text-lg font-bold text-slate-900 sm:text-xl">
          {copy.heading}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{copy.blurb}</p>
      </div>

      <div className={cn("grid", split && "@3xl:grid-cols-[1.1fr_0.9fr]")}>
        {/* Left: the proof — a preview of the real model. Hidden on mobile
            (the wide grid doesn't fit a phone), leaving just the email form. */}
        <div className="hidden items-center p-4 sm:flex sm:p-6">
          <ExcelPreview topic={topic} />
        </div>

        {/* Right: the value + capture (or, after success, the unlocked downloads) */}
        <div
          className={cn(
            "flex flex-col justify-center border-slate-200 bg-slate-50 p-4 sm:border-t sm:p-6",
            split && "@3xl:border-l @3xl:border-t-0",
          )}
        >
          {status === "success" ? (
        <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
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
        <>
          <form
          onSubmit={onSubmit}
          onFocusCapture={(e) => {
            const t = e.target as HTMLElement & { name?: string };
            if (t?.name) {
              ft.onFieldFocus(t.name);
              if (!startedExpRef.current) {
                startedExpRef.current = true;
                trackExperimentAction("gate_to_form", "resource_block"); // engaged the gate
              }
            }
          }}
          onBlurCapture={(e) => {
            const t = e.target as HTMLElement & { name?: string; value?: string };
            if (t?.name) ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
          }}
          className="space-y-4"
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
                {siteConfig.resourceConsentText} See our{" "}
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
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Instant access on this page, and we&apos;ll email you the links too. No spam.
          </p>
        </>
      )}
        </div>
      </div>
    </section>
  );
}
