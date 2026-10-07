"use client";

/**
 * Returning-visitor greeting (deterministic, topic-aware). A dismissible bottom
 * bar (fixed overlay = no layout shift) shown only to returning, not-yet-
 * converted visitors, pointing them back at their last pharmacy topic.
 * Suppressed for the rest of the session once dismissed. Measured via
 * personalization_* events.
 *
 * Ported from construction-cis/web/src/components/intent/ReturningBar.tsx with
 * three changes: the hook comes from the kit provider (one provider on this
 * site, not two), the dismiss key carries this site's `pfp` prefix, and the
 * rings use this site's `focusRing` recipe instead of the kit's
 * `outline-primary-400` literal, which src/tests/focus-ring.test.ts bans.
 *
 * Suppression rule, from Property/web/src/components/intent/ReturningBar.tsx:13
 * (read-only ground truth): sessionStorage, one key, dismissible for the
 * session.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "@accounting-network/web-shared/support/IntentProvider";
import { focusRing } from "@/components/ui/layout-utils";
import { ruleLabel } from "@/lib/intent/labels";

const DISMISS_KEY = "pfp_returning_bar_dismissed";

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
      trackPersonalization("shown", action, ruleLabel);
    }
  }, [action, dismissed]);

  if (!action || dismissed) return null;
  const offer = action.offer;

  return (
    <div
      role="region"
      aria-label="Welcome back"
      className="ground-dark fixed inset-x-0 bottom-0 z-40 border-t-4 border-primary-600 bg-primary-950 text-white shadow-2xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 text-sm sm:px-6 lg:px-8">
        <span className="min-w-0">
          <span className="font-semibold">Welcome back. {offer.reason}.</span>{" "}
          <span className="hidden text-slate-300 sm:inline">{offer.blurb}</span>
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={offer.href}
            data-cta="returning_bar"
            data-cta-placement="returning_bar"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => trackPersonalization("clicked", action, ruleLabel)}
            className={`inline-flex min-h-11 items-center rounded-xl bg-white px-4 py-2 font-semibold text-primary-900 transition-colors duration-150 hover:bg-primary-50 ${focusRing}`}
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
              trackPersonalization("dismissed", action, ruleLabel);
            }}
            className={`flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-300 transition-colors duration-150 hover:bg-white/10 hover:text-white ${focusRing}`}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
