"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar shown only to returning, not-yet-converted visitors, pointing them back at
 * their last topic. Suppressed for the rest of the session once dismissed.
 * Measured via personalization_* events.
 *
 * Navy ground, so gold is doing the one job the design delta keeps for it: a
 * gold button with a NAVY label (6.23). Restyle only. The returning-visitor
 * predicate, the dismiss key and the session suppression are untouched.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { focusRing } from "@/components/ui/layout-utils";
import { useIntent, trackPersonalization } from "./IntentProvider";

const DISMISS_KEY = "dfp_returning_bar_dismissed";

export function ReturningBar() {
  const action = useIntent("returning_bar");
  const [dismissed, setDismissed] = useState(true);
  const shownRef = useRef(false);

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (action && !dismissed && !shownRef.current) {
      shownRef.current = true;
      trackPersonalization("shown", action);
    }
  }, [action, dismissed]);

  if (!action || dismissed) return null;
  const offer = action.offer;

  return (
    <div
      role="region"
      aria-label="Welcome back"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--gold)] bg-[var(--navy)] text-white shadow-2xl"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="min-w-0">
          <span className="font-semibold">Welcome back. {offer.reason}.</span>{" "}
          <span className="hidden text-white/70 sm:inline">{offer.blurb}</span>
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={offer.href}
            data-cta="returning_bar"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => trackPersonalization("clicked", action)}
            className={`rounded-lg bg-[var(--gold)] px-3 py-1.5 font-bold text-[var(--navy)] transition-colors duration-150 hover:bg-[var(--gold-strong)] ${focusRing}`}
          >
            {offer.title}
          </Link>
          <button
            type="button"
            aria-label="Dismiss"
            data-cta="returning_bar_close"
            onClick={() => {
              try {
                window.sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {
                /* ignore */
              }
              setDismissed(true);
              trackPersonalization("dismissed", action);
            }}
            className={`rounded-lg p-1 text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white ${focusRing}`}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
