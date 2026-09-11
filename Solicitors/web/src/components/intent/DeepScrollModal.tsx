"use client";

/**
 * Deep-scroll topic offer. When a not-yet-converted reader gets deep into a page
 * with a clear topic, surface that topic's calculator (and, once authored in
 * Phase 4, its free resource). Modal overlay = no layout shift. Frequency-capped:
 * one per session (module flag) and a 30-day per-topic suppress. Measured.
 *
 * Styled with the site's CSS variable tokens (--primary, --ink, --accent, etc.).
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { useIntent, trackPersonalization } from "./IntentProvider";

const SUPPRESS_DAYS = 30;
const suppressKey = (topic: string) => `afl_deepscroll_${topic}`;

function isSuppressed(topic: string): boolean {
  try {
    const v = window.localStorage.getItem(suppressKey(topic));
    return v ? Date.now() - Number(v) < SUPPRESS_DAYS * 86_400_000 : false;
  } catch {
    return false;
  }
}
function suppress(topic: string): void {
  try {
    window.localStorage.setItem(suppressKey(topic), String(Date.now()));
  } catch {
    /* ignore */
  }
}

// One modal per page-load session, across topics.
let shownThisSession = false;

export function DeepScrollModal() {
  const action = useIntent("deep_scroll_modal");
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!action || open || shownThisSession) return;
    if (isSuppressed(action.topic)) return;
    setOpen(true);
    shownThisSession = true;
    suppress(action.topic);
    if (!shownRef.current) {
      shownRef.current = true;
      trackPersonalization("shown", action);
    }
  }, [action, open]);

  if (!open || !action) return null;
  const offer = action.offer;

  // Secondary action: always a route to a specialist, unless the primary offer
  // already IS the specialist (then the secondary is the topic's calculator).
  const secondaryHref =
    offer.kind === "specialist" && action.calculatorSlug
      ? `/calculators/${action.calculatorSlug}`
      : "/contact";
  const secondaryLabel =
    offer.kind === "specialist" && action.calculatorSlug
      ? "Open the calculator instead"
      : "Talk to a specialist";

  const close = (dismiss: boolean) => {
    setOpen(false);
    if (dismiss) trackPersonalization("dismissed", action);
  };

  const primaryLabel =
    offer.kind === "tool"
      ? "Open the calculator"
      : offer.kind === "guide"
        ? "Get the free guide"
        : "Talk to a specialist";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={() => close(true)}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl ring-1 ring-slate-200/70"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">{offer.title}</h2>
          <button
            type="button"
            aria-label="Close"
            data-cta="deep_scroll_close"
            onClick={() => close(true)}
            className="-mr-1 -mt-1 flex min-h-12 min-w-12 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            &times;
          </button>
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
          {offer.reason}
        </p>
        <p className="mt-2 text-sm text-slate-600">{offer.blurb}</p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={offer.href}
            data-cta="deep_scroll_modal"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => {
              trackPersonalization("clicked", action);
              setOpen(false);
            }}
            className={`${btnPrimary} w-full`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            onClick={() => {
              trackPersonalization("clicked", action);
              setOpen(false);
            }}
            className={`${btnSecondary} w-full`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
