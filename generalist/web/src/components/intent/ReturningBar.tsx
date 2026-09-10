"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar (fixed overlay = no layout shift) shown only to returning, not-yet-
 * converted visitors, pointing them back at their last topic. Suppressed
 * for the rest of the session once dismissed. Measured via personalization_* events.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";

const DISMISS_KEY = "hd_returning_bar_dismissed";

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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-primary-600 bg-slate-900 text-white shadow-2xl">
      <div className={`${siteContainerLg} flex items-center justify-between gap-3 py-3 text-sm`}>
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
            className={`${btnPrimary} shrink-0 whitespace-nowrap`}
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
            className="text-slate-300 hover:text-white"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
