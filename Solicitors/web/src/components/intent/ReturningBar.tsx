"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar (fixed overlay = no layout shift) shown only to returning, not-yet-
 * converted visitors, pointing them back at their last topic. Suppressed for
 * the rest of the session once dismissed. Measured via personalization_* events.
 *
 * Styled with the site's CSS variable tokens (--primary, --ink, etc.).
 *
 * KNOWN DEAD 2026-09-11, not fixed here. `evaluate("returning_bar")` needs
 * `ctx.lastTopic ?? ctx.entryTopic`, both of which come from visitMemory, which
 * is only written when AnalyticsProvider is given a `deriveTopic` prop. This
 * site's root layout does not pass one (Property does, via a thin client
 * wrapper), so both are permanently null and this component has returned null
 * on every render since 2026-07-05: zero `personalization_shown` rows with
 * surface='returning_bar', against 675 for deep_scroll_modal. Wiring the prop
 * also changes which offer the sticky bar shows on topic-less routes, i.e. it
 * changes visible copy, so it is an owner decision, not an instrumentation fix.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";

const DISMISS_KEY = "afl_returning_bar_dismissed";

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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--primary)] bg-[var(--primary)] text-white shadow-2xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="min-w-0">
          <span className="font-semibold">Welcome back. {offer.reason}.</span>{" "}
          <span className="hidden text-white/80 sm:inline">{offer.blurb}</span>
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={offer.href}
            data-cta="returning_bar"
            // Never fired (see below), so no live placement series to split.
            data-cta-placement="returning_bar"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => trackPersonalization("clicked", action)}
            className="rounded bg-white px-3 py-1.5 font-semibold text-[var(--primary)] hover:bg-white/90"
          >
            {offer.title}
          </Link>
          <button
            type="button"
            aria-label="Dismiss"
            data-cta="returning_bar_close"
            data-cta-placement="returning_bar"
            onClick={() => {
              try {
                window.sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {
                /* ignore */
              }
              setDismissed(true);
              trackPersonalization("dismissed", action);
            }}
            className="text-white/80 hover:text-white"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
