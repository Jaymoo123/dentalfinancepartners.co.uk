"use client";

/**
 * Exit-intent qualified-lead capture for Agency Founder Finance blog and
 * calculator pages. Replaces the retired newsletter ExitIntentModal.
 *
 * Arms only on /blog/* and /calculators/* routes. Derives its topic from the
 * URL. Triggers on desktop (mouse leaves the top of the viewport) or mobile
 * (scroll-back-to-top after going deep). Uses MiniCapture (name + phone +
 * email + message) with a topic-aware offer.
 *
 * Per-session cap: shares the "aff_modal_shown" sessionStorage key with
 * DeepScrollModal so only one topic-offer modal fires per page load.
 *
 * Fire-time consent re-check: a mid-visit opt-out is honoured at the moment
 * the modal would fire, not only at arm time.
 *
 * R3 stand-down guard: when aff_assistant_active is "1" in sessionStorage
 * (set by SpecialistWidget in R3 WS6), this modal defers so both exit surfaces
 * never fire together.
 *
 * Indigo palette to match aff brand.
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@accounting-network/web-shared/analytics/track";
import { getConsent } from "@accounting-network/web-shared/analytics/consent";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";
import { MiniCapture } from "@/components/forms/MiniCapture";

const STORAGE_KEY = "aff-exit-intent-dismissed-v1";
const SUPPRESS_DAYS = 30;

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const ts = Number(raw);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
}
function suppress(): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }
}
function isLikelyDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
}

export function ExitIntentModal() {
  const pathname = usePathname() || "";
  const topicKey = deriveTopic(pathname);
  const topic = getTopic(topicKey);
  const relevant =
    pathname.startsWith("/blog/") || pathname.startsWith("/calculators/");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      track("exit_intent_shown", { topic: topicKey || "" });
    }
  }, [open, topicKey]);

  useEffect(() => {
    if (typeof window === "undefined" || !relevant || isSuppressed()) return;
    if (getConsent() === "denied") return;

    const desktop = isLikelyDesktop();
    let armed = false;
    const armTimer = window.setTimeout(
      () => {
        armed = true;
      },
      desktop ? 10000 : 8000,
    );

    const fire = () => {
      if (!armed || isSuppressed()) return;
      if (getConsent() === "denied") return;
      try {
        if (window.sessionStorage.getItem("aff_modal_shown") === "1") return;
      } catch {
        /* ignore */
      }
      // R3 stand-down: SpecialistWidget sets aff_assistant_active when active.
      try {
        if (window.sessionStorage.getItem("aff_assistant_active") === "1") return;
      } catch {
        /* ignore */
      }
      try {
        window.sessionStorage.setItem("aff_modal_shown", "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
      suppress();
    };

    let cleanup = () => {};
    if (desktop) {
      const onMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) fire();
      };
      document.addEventListener("mouseleave", onMouseLeave);
      cleanup = () => document.removeEventListener("mouseleave", onMouseLeave);
    } else {
      let maxY = 0;
      let lastY = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        maxY = Math.max(maxY, y);
        if (maxY > 700 && y < 150 && lastY - y > 4) fire();
        lastY = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanup = () => window.removeEventListener("scroll", onScroll);
    }
    return () => {
      window.clearTimeout(armTimer);
      cleanup();
    };
  }, [relevant]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const heading = topic?.ctaCopy || "Get a free review of your agency situation";
  const blurb =
    "Tell us where to reach you and a one-line summary of your situation. An agency finance specialist will reply within 24 hours, with no obligation.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-lg border-l-4 border-indigo-600 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
          Before you go
        </p>

        <MiniCapture
          formId="exit_intent"
          messagePrefix={`[Exit intent${topicKey ? ` (${topicKey})` : ""}]`}
          heading={heading}
          blurb={blurb}
          submitLabel="Request my review"
          className="mt-2"
        />
      </div>
    </div>
  );
}
