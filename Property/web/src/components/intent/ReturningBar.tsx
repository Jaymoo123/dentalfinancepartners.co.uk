"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar (fixed overlay = no layout shift) shown only to returning, not-yet-
 * converted visitors, pointing them back at their last topic. Suppressed for the
 * rest of the session once dismissed. Measured via personalization_* events.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";
import { getTopic } from "@/lib/intent/taxonomy";

const DISMISS_KEY = "ptp_returning_bar_dismissed";

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
  const topic = getTopic(action.topic);
  const href = action.calculatorSlug ? `/calculators/${action.calculatorSlug}` : "/contact";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-700 bg-emerald-900 text-white shadow-2xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 text-sm">
        <span>
          Welcome back. Pick up where you left off with{" "}
          {topic ? topic.label.toLowerCase() : "your property tax"}.
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={href}
            data-cta="returning_bar"
            onClick={() => trackPersonalization("clicked", action)}
            className="rounded bg-white px-3 py-1.5 font-semibold text-emerald-900 hover:bg-emerald-50"
          >
            {action.ctaCopy}
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
            className="text-emerald-200 hover:text-white"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
