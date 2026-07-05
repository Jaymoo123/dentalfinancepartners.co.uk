"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar shown only to returning, not-yet-converted visitors, pointing them back at
 * their last topic. Suppressed for the rest of the session once dismissed.
 * Measured via personalization_* events.
 *
 * Styled with Dental Finance Partners navy/gold brand tokens.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--navy)] bg-[var(--navy)] text-white shadow-2xl">
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
            className="rounded bg-[var(--gold)] px-3 py-1.5 font-semibold text-[var(--navy)] hover:bg-[var(--gold-strong)]"
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
            className="text-white/60 hover:text-white"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
