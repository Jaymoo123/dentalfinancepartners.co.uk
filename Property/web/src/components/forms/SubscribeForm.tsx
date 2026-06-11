"use client";

/**
 * Marketing opt-in form for the nurture engine ("property tax updates"). Distinct
 * from MiniCapture (which captures a lead with the lead-enquiry consent): this is
 * a low-friction email-only subscribe with its OWN marketing consent + unsubscribe
 * promise, shown to engaged visitors (e.g. the end of a blog post).
 *
 * Posts to /api/subscribe (service-role write to the RLS-locked subscribers table).
 * Fires first-party subscribe_view / subscribe_submitted so the opt-in funnel is
 * measurable. Honeypot-protected. Copy carries no em-dashes (house rule).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@accounting-network/web-shared/analytics/track";
import { getVisitorId } from "@accounting-network/web-shared/analytics/ids";
import { deriveTopic } from "@/lib/intent/deriveTopic";

type Status = "idle" | "loading" | "success" | "error";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONSENT_TEXT =
  "Yes, email me free property tax updates from Property Tax Partners. I understand these are general information, not advice, and I can unsubscribe at any time.";

export function SubscribeForm({
  source = "subscribe_form",
  heading = "Get the property tax updates worth reading",
  blurb = "A short, occasional email on the changes that actually affect UK landlords (Section 24, incorporation, CGT, the 2026 allowances). Plain English, no spam, unsubscribe anytime.",
  className = "my-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8",
}: {
  /** Where this form sits, for attribution (e.g. "blog_footer"). */
  source?: string;
  heading?: string;
  blurb?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seenRef = useRef(false);

  // Fire subscribe_view once when the form mounts (it only renders on engaged surfaces).
  useEffect(() => {
    if (seenRef.current) return;
    seenRef.current = true;
    try {
      track("subscribe_view", { source });
    } catch {
      /* analytics is best-effort */
    }
  }, [source]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      const form = e.currentTarget;
      const data = new FormData(form);
      if (String(data.get("company_url") || "").trim() !== "") return; // honeypot
      const email = String(data.get("email") || "").trim();
      if (!emailRe.test(email)) {
        setError("Enter a valid email address.");
        return;
      }
      if (!consent) {
        setError("Please tick the box to continue.");
        return;
      }

      setStatus("loading");
      const topic = deriveTopic(pathname || "") || "";
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            consent: true,
            consent_text: CONSENT_TEXT,
            visitor_id: getVisitorId() || undefined,
            topic,
            source,
          }),
        });
        const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
        if (!res.ok || !json.ok) {
          setStatus("error");
          setError("Something went wrong. Please try again in a moment.");
          return;
        }
        setStatus("success");
        try {
          track("subscribe_submitted", { source, topic });
        } catch {
          /* best-effort */
        }
        form.reset();
        setConsent(false);
      } catch {
        setStatus("error");
        setError("Something went wrong. Please try again in a moment.");
      }
    },
    [consent, pathname, source],
  );

  return (
    <section className={className} aria-labelledby="subscribe-heading">
      <h3 id="subscribe-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            You are in. Check your inbox, your first update is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate aria-busy={status === "loading"}>
          {/* Honeypot */}
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
          />

          <div>
            <label htmlFor="subscribe-email" className="block text-sm font-semibold text-slate-900">
              Email
            </label>
            <input
              type="email"
              id="subscribe-email"
              name="email"
              required
              autoComplete="email"
              maxLength={100}
              placeholder="you@example.co.uk"
              className="mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="subscribe-consent" className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
              <input
                type="checkbox"
                id="subscribe-consent"
                name="consent"
                checked={consent}
                onChange={(ev) => setConsent(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
              />
              <span>
                Yes, email me free property tax updates from Property Tax Partners. These are general
                information, not advice, and I can{" "}
                <span className="font-semibold text-slate-700">unsubscribe at any time</span>. See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          {error && (
            <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !consent}
            className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? "Subscribing..." : "Send me updates"}
          </button>
        </form>
      )}
    </section>
  );
}
