"use client";

/**
 * Email-gated download unlock for Accounts for Lawyers.
 *
 * On a successful lead insert it reveals the download links inline. Email
 * delivery is NOT wired in R3 (RESOURCE_EMAIL_ENABLED = false; on-page only).
 * Success copy says the download is ready on this page; it does NOT promise an
 * email was sent.
 *
 * Honeypot: enquiry_ref. Pass value to submitSolicitorLead; do NOT early-return
 * on a filled honeypot. The server chokepoint stores the row flagged and returns
 * success so a real human caught by browser autofill is never silently dropped.
 *
 * Consent: uses siteConfig.resourceConsentText (in-house-only, never names a
 * partner), not the partner-aware leadConsentText.
 *
 * Feature flag: if neither the xlsx nor the guide is enabled for this topic,
 * renders nothing.
 */
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitSolicitorLead } from "@/lib/leads/submit-client";
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
import type { GateCopy } from "@/lib/resources/copy";
import { ExcelPreview } from "@/components/resources/ExcelPreview";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-11 touch-manipulation rounded-lg border border-[var(--border)] bg-white px-3.5 py-2.5 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-colors";

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
    // Honeypot: read value but do NOT early-return. Pass to chokepoint.
    const honeypot = String(data.get("enquiry_ref") || "").trim();
    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

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
      extras: { resource_gate: true },
    };

    const result = await submitSolicitorLead(payload, honeypot);
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

    // Email path: NOT wired in R3 (RESOURCE_EMAIL_ENABLED = false; on-page delivery only).
    // Re-enable by setting RESOURCE_EMAIL_ENABLED = true once a from-domain is verified.

    setStatus("success");
    setConsent(false);
  }

  // Belt-and-braces feature flag: never render the gate for a topic with no
  // enabled+present asset.
  if (!hasEnabledResource(topic)) return null;

  const xlsxReady = isXlsxEnabled(resource);
  const guideReady = isGuideEnabled(resource);

  return (
    <section
      ref={rootRef}
      className="not-prose @container my-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-16px_rgba(15,23,42,0.18)] ring-1 ring-[var(--ink)]/[0.03]"
      aria-labelledby="resource-gate-heading"
    >
      {/* Branded top accent */}
      <div className="h-1 bg-[var(--primary)]" />

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)]/70 px-5 py-2 sm:px-6 sm:py-2.5">
        <h3 id="resource-gate-heading" className="text-lg font-bold text-[var(--ink)] sm:text-xl">
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
            <div role="status" className="rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-5">
              <p className="text-sm font-semibold text-[var(--primary-dark)]">
                You are in. Your downloads are ready below.
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
                    className="inline-flex items-center justify-center rounded-full border-2 border-[var(--primary)] px-5 py-3 text-base font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/5"
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
                {/* Honeypot: off-screen, hidden from humans */}
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
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                      aria-invalid={!!fieldErrors.consent}
                      aria-describedby={fieldErrors.consent ? "resource-consent-error" : undefined}
                    />
                    <span>
                      {siteConfig.resourceConsentText} See our{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--primary)] underline"
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
                  {status === "loading" ? "Unlocking..." : "Unlock the downloads"}
                </button>
              </form>
              <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
                Instant access on this page. We will only use your email to send you the odd genuinely useful update, and you can opt out any time.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
