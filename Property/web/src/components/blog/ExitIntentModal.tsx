"use client";

/**
 * Exit-intent capture. Self-contained: mounted once globally, it arms only on the
 * relevant routes (blog + calculator pages), derives its topic from the URL, and
 * triggers on desktop (mouse leaves the top) OR mobile (a leave-style scroll back
 * to the top after going deep). Both arms now use the qualified MiniCapture (name
 * + phone + email + message); the exit_intent_offer experiment varies only the
 * offer copy (control = generic, treatment = topic-aware). Reach + trigger apply
 * to both arms.
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getVisitorId } from "@accounting-network/web-shared/analytics/ids";
import { track } from "@accounting-network/web-shared/analytics/track";
import { assignVariant } from "@/lib/experiments/assign";
import { setActiveExperiment } from "@accounting-network/web-shared/analytics/experiments/active";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";
import { MiniCapture } from "@/components/forms/MiniCapture";
import { trackExperimentView } from "@/lib/experiments/exposure";

const STORAGE_KEY = "blog-exit-intent-dismissed-v1";
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
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
}
function isLikelyDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
}

export function ExitIntentModal() {
  const pathname = usePathname() || "";
  const topicKey = deriveTopic(pathname);
  const topic = getTopic(topicKey);
  const relevant = pathname.startsWith("/blog/") || pathname.startsWith("/calculators/");

  const [open, setOpen] = useState(false);
  // exit_intent_offer is assigned + registered only when the modal actually fires,
  // so exposure = "was shown the offer" (not every page load).
  const [offer, setOffer] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      track("exit_intent_shown", { topic: topicKey || "" });
      // exit_intent_offer exposure, fired once per shown modal for BOTH arms
      // (MiniCapture suppresses its own via exposeOnView={false}).
      trackExperimentView("exit_intent_offer", "exit_intent");
    }
  }, [open, topicKey]);

  // Arm the trigger (desktop mouseleave OR mobile leave-style scroll), once, only
  // on relevant routes and when not suppressed.
  useEffect(() => {
    if (typeof window === "undefined" || !relevant || isSuppressed()) return;

    const desktop = isLikelyDesktop();
    let armed = false;
    const armTimer = window.setTimeout(() => { armed = true; }, desktop ? 10000 : 8000);
    const fire = () => {
      if (!armed || isSuppressed()) return;
      const v = assignVariant(getVisitorId() || "", "exit_intent_offer");
      if (v) {
        setActiveExperiment("exit_intent_offer", v);
        setOffer(v);
      }
      setOpen(true);
      suppress();
    };

    let cleanup = () => {};
    if (desktop) {
      const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 0) fire(); };
      document.addEventListener("mouseleave", onMouseLeave);
      cleanup = () => document.removeEventListener("mouseleave", onMouseLeave);
    } else {
      // Mobile: they scrolled deep, then scrolled back up toward the top/address bar.
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const treatment = offer === "treatment";
  const heading = treatment
    ? topic?.ctaCopy || "Get a free review of your situation"
    : "Get a free review of your situation";
  const blurb = treatment
    ? "Tell us where to reach you and a specialist will review your position and the next sensible step, with no obligation."
    : "Tell us a bit about your situation and a specialist will review it and the next sensible step, with no obligation.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit_intent-heading"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="relative w-full max-w-lg border-l-4 border-emerald-600 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Before you go</p>

        <MiniCapture
          formId="exit_intent"
          experimentKey="exit_intent_offer"
          exposeOnView={false}
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
