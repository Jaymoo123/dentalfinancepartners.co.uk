"use client";

/**
 * Deep-scroll topic offer. When a not-yet-converted reader gets deep into a page
 * with a clear topic, surface that topic's calculator (and, once authored in
 * Phase 4, its free resource). Modal overlay = no layout shift. Frequency-capped:
 * one per session (module flag) and a 30-day per-topic suppress. Measured.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";
import { getTopic } from "@/lib/intent/taxonomy";

const SUPPRESS_DAYS = 30;
const suppressKey = (topic: string) => `ptp_deepscroll_${topic}`;

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
  const topic = getTopic(action.topic);
  const href = action.calculatorSlug ? `/calculators/${action.calculatorSlug}` : "/contact";

  const close = (dismiss: boolean) => {
    setOpen(false);
    if (dismiss) trackPersonalization("dismissed", action);
  };

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
          <h2 className="text-lg font-bold text-slate-900">
            Still working through {topic ? topic.label.toLowerCase() : "this"}?
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={() => close(true)}
            className="text-slate-400 hover:text-slate-700"
          >
            &times;
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Run your own numbers in a couple of minutes, or get a property tax
          specialist to check your position.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={href}
            data-cta="deep_scroll_modal"
            onClick={() => {
              trackPersonalization("clicked", action);
              setOpen(false);
            }}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-center font-semibold text-white hover:bg-emerald-700"
          >
            {action.ctaCopy}
          </Link>
          <Link
            href="/contact"
            onClick={() => {
              trackPersonalization("clicked", action);
              setOpen(false);
            }}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-center font-semibold text-slate-700 hover:bg-slate-50"
          >
            Talk to a specialist
          </Link>
        </div>
      </div>
    </div>
  );
}
