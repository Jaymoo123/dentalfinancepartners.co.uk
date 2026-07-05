"use client";

/**
 * Deep-scroll topic offer. When a not-yet-converted reader gets deep into a
 * page with a clear topic, surface that topic's calculator (or a free specialist
 * review). Modal overlay = no layout shift. Frequency-capped: one per session
 * (module flag) and a 30-day per-topic suppress. Measured.
 *
 * Styled with Dental Finance Partners navy/gold brand tokens.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";

const SUPPRESS_DAYS = 30;
const suppressKey = (topic: string) => `dfp_deepscroll_${topic}`;

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

let shownThisSession = false;

export function DeepScrollModal() {
  const action = useIntent("deep_scroll_modal");
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!action || open || shownThisSession) return;
    if (isSuppressed(action.topic)) return;
    // Shared per-session cap with ExitIntentModal: at most ONE topic-offer
    // modal per session, whichever surface fires first (QA finding, wave 2).
    try {
      if (window.sessionStorage.getItem("dfp_modal_shown") === "1") return;
      window.sessionStorage.setItem("dfp_modal_shown", "1");
    } catch { /* private browsing: fall back to module flag */ }
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
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-[var(--navy)]">{offer.title}</h2>
          <button
            type="button"
            aria-label="Close"
            data-cta="deep_scroll_close"
            onClick={() => close(true)}
            className="text-[var(--muted)] hover:text-[var(--navy)]"
          >
            &times;
          </button>
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--gold-strong)]">
          {offer.reason}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">{offer.blurb}</p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={offer.href}
            data-cta="deep_scroll_modal"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => {
              trackPersonalization("clicked", action);
              setOpen(false);
            }}
            className="rounded-lg bg-[var(--gold)] px-4 py-2.5 text-center font-semibold text-[var(--navy)] hover:bg-[var(--gold-strong)]"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            onClick={() => {
              trackPersonalization("clicked", action);
              setOpen(false);
            }}
            className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-center font-semibold text-[var(--navy)] hover:bg-[var(--surface-elevated)]"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
