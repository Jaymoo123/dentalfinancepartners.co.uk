"use client";

/**
 * Exit-intent lead capture for Dental Finance Partners blog and calculator
 * pages. Self-contained: mounted once globally, arms only on the relevant
 * routes (blog + calculator pages), derives its topic from the URL, and
 * triggers on desktop (mouse leaves the top) OR mobile (leave-style scroll
 * back to the top after going deep). Uses the qualified MiniCapture
 * (name + phone + email + message) with a topic-aware offer.
 *
 * This is a qualified-lead capture modal, not a newsletter.
 *
 * R3 stand-down guard: when `dfp_assistant_active` is set to "1"
 * in sessionStorage (by the SpecialistWidget, live in R3 WS6), this modal
 * defers so both exit surfaces never fire together.
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@accounting-network/web-shared/analytics/track";
import { getConsent } from "@accounting-network/web-shared/analytics/consent";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";
import { MiniCapture } from "@/components/forms/MiniCapture";

const STORAGE_KEY = "dfp-exit-intent-dismissed-v1";
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
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, desktop ? 10000 : 8000);

    const fire = () => {
      if (!armed || isSuppressed()) return;
      // Mid-visit opt-out honoured at fire time, not just at arm time.
      if (getConsent() === "denied") return;
      // Shared per-session cap with DeepScrollModal (one topic-offer modal max).
      try {
        if (window.sessionStorage.getItem("dfp_modal_shown") === "1") return;
      } catch { /* ignore */ }
      // Stand-down: the SpecialistWidget (R3 WS6) sets dfp_assistant_active on mount.
      // When it is active this session, defer so both exit surfaces never fire together.
      if (window.sessionStorage.getItem("dfp_assistant_active") === "1") return;
      try {
        window.sessionStorage.setItem("dfp_modal_shown", "1");
      } catch { /* ignore */ }
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

  const heading = topic?.ctaCopy || "Get a free review of your situation";
  const blurb =
    "Tell us where to reach you and a specialist dental accountant will review your position and the sensible next step, with no obligation.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit_intent-heading"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--navy)]/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-lg border-l-4 border-[var(--gold)] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
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

        <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold-strong)]">
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
