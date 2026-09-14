"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar (fixed overlay = no layout shift) shown only to returning, not-yet-
 * converted visitors, pointing them back at their last CIS topic. Suppressed
 * for the rest of the session once dismissed. Measured via personalization_* events.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";

const DISMISS_KEY = "bfp_returning_bar_dismissed";

export function ReturningBar() {
  const action = useIntent("returning_bar");
  const [dismissed, setDismissed] = useState(true); // hidden until we confirm
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-primary-600 bg-[var(--dark)] text-white shadow-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 text-sm sm:px-6 lg:px-8">
        <span className="min-w-0">
          <span className="font-semibold">Welcome back. {offer.reason}.</span>{" "}
          <span className="hidden text-slate-300 sm:inline">{offer.blurb}</span>
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={offer.href}
            data-cta="returning_bar"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => trackPersonalization("clicked", action)}
            className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 py-2 font-semibold text-[var(--accent-strong)] transition-colors duration-150 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
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
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-300 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
