"use client";

import { useState } from "react";

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
  // Honeypot, humans never fill this; bots typically do. Filled => silent reject.
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    // Silently accept bot submissions but discard
    if (website) {
      setState("ok");
      return;
    }
    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          agencyType: agencyType || undefined,
          source,
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Subscription failed");
      }
      setState("ok");
      setEmail("");
      setAgencyType("");
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
    return (
      <div className={containerClass} role="status" aria-live="polite">
        <p className="font-semibold text-slate-900">Thanks. Almost done.</p>
        <p className="mt-1 text-sm text-slate-700">{successMessage}</p>
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
