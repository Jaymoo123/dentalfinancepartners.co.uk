"use client";

import { useEffect, useState } from "react";
import { track } from "@accounting-network/web-shared/analytics/track";
import { AGENCY_NEWSLETTER_CONSENT_TEXT } from "@/config/nurture-consent";

type Variant = "card" | "inline" | "minimal";

type Props = {
  variant?: Variant;
  source: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  successMessage?: string;
  showAgencyType?: boolean;
};

const AGENCY_TYPES = [
  "Marketing / digital",
  "Creative / branding",
  "PR / communications",
  "Web design / development",
  "Performance / PPC / SEO",
  "Recruitment / talent",
  "Other agency",
];

export function SignupForm({
  variant = "card",
  source,
  heading = "The Agency Founder Tax Brief",
  body = "One short email a week. UK tax, pay, structure, exit. Plain text, one CTA, unsubscribe one click.",
  ctaLabel = "Subscribe",
  successMessage = "Check your inbox to confirm your subscription.",
  showAgencyType = true,
}: Props) {
  const [email, setEmail] = useState("");
  const [agencyType, setAgencyType] = useState("");
  // LD-09: marketing consent is its own user-operated checkbox. The stored
  // consent_text is exactly the label rendered next to it — never inferred,
  // never hardcoded-true.
  const [consent, setConsent] = useState(false);
  // Honeypot, humans never fill this; bots typically do. Filled => silent reject.
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"confirm-required" | "recorded" | null>(null);

  // AN-05: emit subscribe_view once when the form mounts (impression-level signal)
  useEffect(() => {
    track("subscribe_view", { source });
  }, [source]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    // Silently accept bot submissions but discard
    if (website) {
      setState("ok");
      return;
    }
    if (!consent) {
      setState("err");
      setError("Please tick the consent box so we can email you the Tax Brief.");
      return;
    }
    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/nurture/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          consent_text: AGENCY_NEWSLETTER_CONSENT_TEXT,
          topic: agencyType || undefined,
          source,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Subscription failed");
      }
      const j = await res.json().catch(() => ({}));
      setMode(j?.mode === "confirm-required" ? "confirm-required" : "recorded");
      track("subscribe_submitted", { source });
      setState("ok");
      setEmail("");
      setAgencyType("");
      setConsent(false);
    } catch (err) {
      setState("err");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const containerClass =
    variant === "card"
      ? "rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      : variant === "inline"
        ? "rounded-lg bg-indigo-50 border border-indigo-100 p-5"
        : "";

  if (state === "ok") {
    const headline = mode === "recorded" ? "You're on the list." : "Thanks. Almost done.";
    const bodyText =
      mode === "recorded"
        ? "We'll email you when the next edition goes out."
        : successMessage;
    return (
      <div className={containerClass} role="status" aria-live="polite">
        <p className="font-semibold text-slate-900">{headline}</p>
        <p className="mt-1 text-sm text-slate-700">{bodyText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={containerClass} noValidate>
      {/* Honeypot, visually hidden, off-screen, autocomplete off. Real users won't touch it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={`newsletter-website-${source}`}>Website (leave blank)</label>
        <input
          id={`newsletter-website-${source}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      {variant !== "minimal" && (
        <>
          <p className="text-base font-semibold text-slate-900">{heading}</p>
          <p className="mt-1 text-sm text-slate-700">{body}</p>
        </>
      )}
      <div className={variant === "minimal" ? "flex gap-2" : "mt-4 space-y-2"}>
        <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@youragency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {showAgencyType && variant !== "minimal" && (
          <>
            <label className="sr-only" htmlFor={`newsletter-type-${source}`}>
              Your agency type
            </label>
            <select
              id={`newsletter-type-${source}`}
              value={agencyType}
              onChange={(e) => setAgencyType(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">My agency is… (optional)</option>
              {AGENCY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </>
        )}
        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Subscribing…" : ctaLabel}
        </button>
      </div>
      {/* LD-09: required, user-operated marketing-consent checkbox. The label
          text below IS the stored consent_text — keep them identical. */}
      <label
        htmlFor={`newsletter-consent-${source}`}
        className="mt-3 flex items-start gap-2 text-xs text-slate-600"
      >
        <input
          id={`newsletter-consent-${source}`}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span>{AGENCY_NEWSLETTER_CONSENT_TEXT}</span>
      </label>
      {state === "err" && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {variant !== "minimal" && (
        <p className="mt-3 text-xs text-slate-500">
          No spam. Unsubscribe one click. We never share your email.
        </p>
      )}
    </form>
  );
}
