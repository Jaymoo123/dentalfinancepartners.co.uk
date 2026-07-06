"use client";

/**
 * Email-gated download unlock for Agency Founder Finance.
 *
 * On a successful lead insert it reveals the download links inline on the page.
 * Email delivery is NOT wired (RESOURCE_EMAIL_DELIVERY_ENABLED=false; on-page
 * delivery only). Success copy says the download is ready on this page; it does
 * NOT promise an email was sent.
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--dark), no var(--primary).
 * Uses indigo/slate tokens: --accent, --ink, --ink-soft, --surface, --surface-elevated,
 * --border, --muted. Accent is indigo #4f46e5.
 *
 * Consent: uses siteConfig.resourceConsentText (in-house-only wording, never
 * names Reflex Accounting). Resource downloads are NOT shared with the partner firm.
 *
 * Submit: goes through submitAffLead with extras { resource_gate: true }
 * so the server chokepoint can exclude these rows from the partner-CC notify path.
 *
 * Honeypot: enquiry_ref. Value is passed through to submitAffLead; do NOT
 * early-return on a filled honeypot (F4 fix). The server stores the row flagged and
 * returns success so a real human caught by browser autofill is never silently
 * dropped (estate-standard fix).
 *
 * Belt-and-braces: if neither the xlsx nor the guide is enabled for this topic,
 * renders nothing (hasEnabledResource guard).
 *
 * aff divergence A: SINGLE blog injection point, no short-post fallback branch.
 * aff divergence B: captureMode "email_only" as a field (not a separate route).
 * Storage prefix: aff (FROZEN). No ptp_/dfp_/cfp_/bfp_ keys.
 */
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitAffLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import type { TopicKey } from "@/lib/intent/taxonomy";
import {
  resourceForTopic,
  isXlsxEnabled,
  isGuideEnabled,
  hasEnabledResource,
} from "@/lib/resources/registry";
import { RESOURCE_EMAIL_DELIVERY_ENABLED } from "@/lib/resources/config";
import type { GateCopy } from "@/lib/resources/copy";
import { ExcelPreview } from "@/components/resources/ExcelPreview";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// aff token-safe input class (no --primary, no --gold)
const inputClass =
  "mt-1 w-full min-h-11 touch-manipulation rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25 transition-colors";

export function ResourceGate({
  topic,
  copy,
  split = false,
  placement = "calculator",
  category,
}: {
  topic: TopicKey;
  copy: GateCopy;
  /** Side-by-side preview + form when the container is wide (calc page);
   *  default is a single stacked column (preview, then form) for blog posts. */
  split?: boolean;
  /** Where the gate is surfaced: "calculator" | "blog" | "embed". */
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

  const gateBase = { topic, placement, ...(category ? { category } : {}) };

  // Fire gate_view the first time the gate scrolls into view.
  const rootRef = useInViewOnce<HTMLElement>(() => {
    track("gate_view", gateBase);
  });

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  const resource = resourceForTopic(topic);

  // In-house-only consent text for resource downloads (never names a partner).
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

    // Honeypot: read value but do NOT early-return (F4 fix).
    // Pass through to submitAffLead so the server stores the row flagged.
    // This means a real human caught by browser autofill is never silently dropped.
    const honeypot = String(data.get("enquiry_ref") || "").trim();

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    const email = String(data.get("email") || "").trim();
    const magnetTitle = resource?.magnetTitle ?? "resource";

    const result = await submitAffLead(
      {
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
        extras: { resource_gate: true },
        // email_only: the gate collects ONLY an email; full-mode validation
        // would 400 every submission on the empty name/phone (D-3 lesson).
        // The message prefix keeps the 10-char floor satisfied.
        captureMode: "email_only",
      },
      honeypot,
    );

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: niche.content_strategy.source_identifier, role: "resource" });
    track("resource_unlocked", gateBase);

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `aff_resource_${topic}`,
          value: 1,
        });
      }
    }

    // Email path: NOT wired (RESOURCE_EMAIL_DELIVERY_ENABLED = false; on-page delivery only).
    // Re-enable by flipping RESOURCE_EMAIL_DELIVERY_ENABLED = true once a from-domain is verified.
    if (RESOURCE_EMAIL_DELIVERY_ENABLED) {
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
    }

    setStatus("success");
    setConsent(false);
  }

  // Belt-and-braces: never render the gate for a topic with no enabled asset.
  if (!hasEnabledResource(topic)) return null;

  const xlsxReady = isXlsxEnabled(resource);
  const guideReady = isGuideEnabled(resource);

  return (
    <section
      ref={rootRef}
      className="not-prose @container my-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-16px_rgba(15,23,42,0.18)] ring-1 ring-[var(--ink)]/[0.03]"
      aria-labelledby="resource-gate-heading"
    >
      {/* Branded top accent: indigo */}
      <div className="h-1 bg-[var(--accent)]" />

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)]/70 px-5 py-2 sm:px-6 sm:py-2.5">
        <h3 id="resource-gate-heading" className="font-serif text-lg font-bold text-[var(--ink)] sm:text-xl">
          {copy.heading}
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{copy.blurb}</p>
      </div>

      <div className={["grid", split ? "@3xl:grid-cols-[1.1fr_0.9fr]" : ""].join(" ").trim()}>
        {/* Left: preview of the real model. Hidden on mobile. */}
        <div className="hidden items-center p-4 sm:flex sm:p-6">
          <ExcelPreview topic={topic} />
        </div>

        {/* Right: value + capture (or, after success, the unlocked downloads) */}
        <div
          className={[
            "flex flex-col justify-center border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:border-t sm:p-6",
            split ? "@3xl:border-l @3xl:border-t-0" : "",
          ].join(" ").trim()}
        >
          {status === "success" ? (
            <div
              role="status"
              className="rounded-xl border border-indigo-100 bg-[var(--surface-elevated)] p-5"
            >
              <p className="text-sm font-semibold text-[var(--ink)]">
                {/* Email delivery OFF: no email promise */}
                You&apos;re in. Your download is ready below.
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
                    className="inline-flex items-center justify-center rounded-full border-2 border-[var(--accent)] px-5 py-3 text-base font-semibold text-[var(--accent)] transition-colors hover:bg-indigo-50"
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
                  if (t?.name) ft.onFieldFocus(t.name);
                }}
                onBlurCapture={(e) => {
                  const t = e.target as HTMLElement & { name?: string; value?: string };
                  if (t?.name) ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
                }}
                className="space-y-4"
                noValidate
                aria-busy={status === "loading"}
              >
                {/* Honeypot: off-screen, hidden from humans, only bots fill it.
                    Non-semantic name so browser autofill never targets it.
                    Value passed through: no early-return (F4 fix). */}
                <input
                  type="text"
                  name="enquiry_ref"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
                />
                <div>
                  <label htmlFor="resource-email" className="block text-sm font-semibold text-[var(--ink)]">
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
                    className="flex items-start gap-3 text-xs leading-relaxed text-[var(--ink-soft)]"
                  >
                    <input
                      type="checkbox"
                      id="resource-consent"
                      name="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                      aria-invalid={!!fieldErrors.consent}
                      aria-describedby={fieldErrors.consent ? "resource-consent-error" : undefined}
                    />
                    <span>
                      {siteConfig.resourceConsentText} See our{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--accent)] underline"
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
                  {status === "loading" ? "Unlocking..." : "Get the model"}
                </button>
              </form>
              {/* Email delivery OFF: no email promise in the footer copy */}
              <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
                Instant access on this page. No spam.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
