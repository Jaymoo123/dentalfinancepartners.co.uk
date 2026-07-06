"use client";

/**
 * Phase-0 deterministic specialist widget for Trade Tax Specialists (construction-cis).
 *
 * A topic-aware proactive assistant that shows a tailored opener, routes to /contact,
 * and captures an email + message via email_only captureMode. No LLM. No booking branch.
 * Suppressed once the visitor has converted (isConverted() from visitMemory).
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--primary).
 * Uses: var(--accent) = #f97316 (orange), var(--dark) = #1e293b (slate).
 * Hard hex fallbacks where Tailwind cannot use CSS vars.
 *
 * Stand-down: sets bfp_assistant_active="1" in sessionStorage.
 * ExitIntentModal.tsx:87 already reads this key. Do NOT edit ExitIntentModal.
 *
 * Storage prefix: bfp (FROZEN). Never ptp_/dfp_/cfp_.
 *   bfp_assistant_active     - stand-down flag for ExitIntentModal
 *   bfp_assistant_autoopened - auto-open once-per-session guard
 *   bfp_journey              - journey entries (via journeyModel.ts)
 *
 * Chip: /contact only. No /book. Phase-0 escalation = enquiry form only.
 *
 * Honeypot field: enquiry_ref. NEVER early-return on filled honeypot.
 * Pass through to submitCisLead. Server stores the row flagged.
 *
 * captureMode: "email_only" -- the gate collects email only; full-mode validation
 * would 400 on empty name/phone (the D-3 lesson). Consent = leadConsentText
 * (widget IS an enquiry, not a resource gate, so partner-aware line is correct).
 *
 * UK English. No em-dashes. No "DJH".
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitCisLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { track } from "@accounting-network/web-shared/analytics/track";
import { onAnalyticsEvent } from "@accounting-network/web-shared/analytics/bus";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { useIntentContext } from "@/components/intent/IntentProvider";
import { getTopic } from "@/lib/intent/taxonomy";
import { initJourneyModel, recordPath, getJourneyProfile } from "@/lib/intent/journeyModel";
import { openerFor, exitOpener, frictionOpener } from "@/lib/assistant/opener";

type Status = "idle" | "loading" | "success" | "error";
type Trigger = "cadence" | "exit" | "friction";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Orange/slate token input class (no --gold, no --navy, no --primary)
const inputClass =
  "mt-1 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-base text-[var(--dark)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25 min-h-12 touch-manipulation";

// Cadence thresholds: 30s / 70s / 120s / 180s of VISIBLE page time.
const CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000];
// Auto-open: present the card ONCE per session shortly after landing for immediacy.
const AUTO_OPEN_DELAY_MS = 600;
const ASSISTANT_ACTIVE_KEY = "bfp_assistant_active";
const AUTO_OPEN_KEY = "bfp_assistant_autoopened";

export function SpecialistWidget() {
  const ctx = useIntentContext();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [peekLine, setPeekLine] = useState<string | null>(null);
  const [peekVisible, setPeekVisible] = useState(false);
  const [composing, setComposing] = useState(false);

  const openedRef = useRef(false);
  const engagedRef = useRef(false);
  const openRef = useRef(false);
  const pingCountRef = useRef(0);
  const visibleMsRef = useRef(0);
  const lastLineRef = useRef<string | null>(null);
  const lastPropsRef = useRef<Record<string, string | number> | null>(null);
  const ft = useFormTracking("specialist_widget");

  const active = !!ctx;

  // Suppress the proactive layer for converted visitors.
  const suppressed = useMemo(() => {
    if (typeof window === "undefined") return true;
    try {
      return isConverted();
    } catch {
      return false;
    }
  }, []);

  // Show a tailored ping. Re-derives the journey each time; never repeats a line.
  const runPing = useCallback((trigger: Trigger) => {
    if (engagedRef.current || typeof window === "undefined") return;
    const profile = getJourneyProfile();
    let line: string;
    let variant: string;
    if (trigger === "friction") {
      line = frictionOpener(profile);
      variant = "friction";
    } else if (trigger === "exit") {
      line = exitOpener(profile);
      variant = "exit";
    } else {
      const idx = pingCountRef.current;
      line = openerFor(profile, idx);
      variant = `ping_${idx + 1}`;
      pingCountRef.current = idx + 1;
    }
    if (line === lastLineRef.current) return; // never repeat verbatim
    lastLineRef.current = line;

    const props: Record<string, string | number> = {
      surface: "assistant_nudge",
      trigger,
      variant,
      rule_id: `assistant_${profile.stage}`,
      topic: profile.primaryTopic ?? "",
      stage: profile.stage,
      signals: profile.signals.slice(0, 6).join(","),
      content: line.slice(0, 120),
    };
    lastPropsRef.current = props;
    setPeekLine(line);
    setPeekVisible(true);
    setUnread((n) => n + 1);
    track("personalization_shown", props);
  }, []);

  // The visitor engaged: stop this session's proactive cadence + clear the badge.
  const engage = useCallback(() => {
    engagedRef.current = true;
    setPeekVisible(false);
    setUnread(0);
  }, []);

  // Init the journey model + flag the assistant active (so ExitIntentModal stands down).
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    initJourneyModel();
    try {
      window.sessionStorage.setItem(ASSISTANT_ACTIVE_KEY, "1");
    } catch {
      // storage unavailable
    }
  }, [active]);

  // Record each page visit in the journey trail.
  useEffect(() => {
    if (active) recordPath(pathname ?? "/");
  }, [active, pathname]);

  // Mirror `open` into a ref for the cadence tick.
  useEffect(() => { openRef.current = open; }, [open]);

  // Escalating dwell cadence.
  useEffect(() => {
    if (!active || suppressed) return;
    let lastTick = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      const dt = now - lastTick;
      lastTick = now;
      if (document.visibilityState === "visible") visibleMsRef.current += dt;
      if (engagedRef.current || openRef.current) return;
      const next = CADENCE_THRESHOLDS_MS[pingCountRef.current];
      if (next != null && visibleMsRef.current >= next) runPing("cadence");
    }, 1000);
    return () => window.clearInterval(id);
  }, [active, suppressed, runPing]);

  // Exit-intent: single instant ping on desktop cursor leave / mobile fast scroll-up.
  useEffect(() => {
    if (!active || suppressed || typeof window === "undefined") return;
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    let armed = false;
    let fired = false;
    const armTimer = window.setTimeout(() => { armed = true; }, desktop ? 10_000 : 8_000);
    let cleanup = () => {};
    const fire = () => {
      if (!armed || fired || engagedRef.current) return;
      fired = true;
      runPing("exit");
      cleanup();
    };
    if (desktop) {
      const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 0) fire(); };
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
    return () => { window.clearTimeout(armTimer); cleanup(); };
  }, [active, suppressed, runPing]);

  // Friction: form_error event -> instant ping.
  useEffect(() => {
    if (!active) return;
    return onAnalyticsEvent((name: string) => {
      if (name === "form_error" && !engagedRef.current) runPing("friction");
    });
  }, [active, runPing]);

  // Auto-open: once per session (production) or always (dev).
  useEffect(() => {
    if (!active || suppressed || typeof window === "undefined") return;
    if (process.env.NODE_ENV === "production") {
      try {
        if (window.sessionStorage.getItem(AUTO_OPEN_KEY) === "1") return;
      } catch {
        // ignore
      }
    }
    const t = window.setTimeout(() => {
      if (engagedRef.current || openRef.current) return;
      try {
        window.sessionStorage.setItem(AUTO_OPEN_KEY, "1");
      } catch {
        // ignore
      }
      const profile = getJourneyProfile();
      const line = openerFor(profile, 0);
      lastLineRef.current = line;
      if (window.innerWidth < 640) {
        const props = {
          surface: "assistant_nudge",
          trigger: "auto",
          variant: "peek",
          rule_id: `assistant_${profile.stage}`,
          topic: profile.primaryTopic ?? "",
          content: line.slice(0, 120),
        };
        lastPropsRef.current = props;
        setPeekLine(line);
        setPeekVisible(true);
        setUnread((n) => n + 1);
        track("personalization_shown", props);
      } else {
        setPeekLine((prev) => prev ?? line);
        setOpen(true);
        if (!openedRef.current) {
          openedRef.current = true;
          track("support_opened", { topic: profile.primaryTopic ?? "", via: "auto" });
        }
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [active, suppressed]);

  if (!ctx) return null;

  const topic = getTopic(ctx.pageTopic ?? ctx.entryTopic);
  const journeyTopic = open ? getTopic(getJourneyProfile().primaryTopic) : null;
  const calcSlug = journeyTopic?.primaryCalculator ?? topic?.primaryCalculator ?? null;

  function trackNudge(kind: "clicked" | "dismissed") {
    track(`personalization_${kind}`, lastPropsRef.current ?? { surface: "assistant_nudge" });
  }

  function handleOpen(fromPeek: boolean) {
    if (!peekLine) setPeekLine(openerFor(getJourneyProfile(), 0));
    setComposing(false);
    setOpen(true);
    if (!openedRef.current) {
      openedRef.current = true;
      track("support_opened", { topic: topic?.key ?? "", via: fromPeek ? "nudge" : "button" });
    }
    if (fromPeek) trackNudge("clicked");
    engage();
  }

  function closePanel() {
    setOpen(false);
    setComposing(false);
  }

  function onChip(goal: "calculator" | "question" | "contact") {
    track("cta_click", { cta_id: `assistant_${goal}`, placement: "assistant_card", topic: topic?.key ?? "" });
    engage();
    if (goal === "question") setComposing(true);
  }

  function dismissPeek() {
    setPeekVisible(false);
    trackNudge("dismissed");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    // Honeypot: enquiry_ref. NEVER early-return. Pass through to server which stores flagged.
    const honeypot = String(data.get("enquiry_ref") || "").trim();
    if (honeypot) ft.onError("enquiry_ref", "honeypot");
    const email = String(data.get("email") || "").trim();
    const question = String(data.get("question") || "").trim();
    if (!emailRe.test(email)) {
      setError("Enter a valid email address.");
      ft.onError("email", "validation");
      return;
    }
    if (!question) {
      setError("Add a short message so the specialist knows how to help.");
      ft.onError("question", "validation");
      return;
    }
    ft.onSubmit(2);
    setStatus("loading");
    const profile = getJourneyProfile();
    const topicTag = profile.primaryTopic ? ` (${profile.primaryTopic})` : "";
    // The widget IS an enquiry: use leadConsentText (not resourceConsentText).
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    const payload = {
      full_name: "",
      email,
      phone: "",
      role: "Other",
      message: `[Specialist question${topicTag}] ${question}`,
      source: niche.content_strategy.source_identifier,
      source_url: typeof window !== "undefined" ? window.location.href : "",
      submitted_at: new Date().toISOString(),
      consent_given: true,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
      extras: {
        capture_channel: "assistant",
        trigger: (lastPropsRef.current?.trigger as string) ?? "widget",
      },
      captureMode: "email_only" as const,
    };
    const result = await submitCisLead(payload, honeypot);
    if (!result.success) {
      setStatus("error");
      setError(result.error || "Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }
    ft.onLead({ source: payload.source, role: "specialist_widget" });
    track("lead_submitted", { source: payload.source, role: "specialist_widget" });
    setStatus("success");
  }

  return (
    <div className="fixed bottom-24 right-4 z-[55] flex flex-col items-end print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Trade Tax Specialists assistant"
          className="mb-3 flex w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          style={{ height: "min(72dvh, 34rem)" }}
        >
          {/* Header: slate background, orange accent */}
          <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ background: "#1e293b" }}>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 ring-white/15"
              style={{ background: "#f97316" }}
            >
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-tight">Trade Tax Specialists</p>
              <p className="truncate text-[11px] text-white/70">A specialist replies within one working day</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={closePanel}
              className="flex min-h-11 min-w-11 items-center justify-center shrink-0 text-2xl leading-none text-white/70 hover:text-white"
            >
              &times;
            </button>
          </div>

          {/* Conversation */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {peekLine && (
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#f97316" }}
                >
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-gray-800 shadow-sm">
                  {peekLine}
                </div>
              </div>
            )}
            {status === "success" ? (
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#f97316" }}
                >
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-orange-100 bg-orange-50 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
                  Thanks, a specialist has your message and will be in touch by email. Please check your inbox and spam folder so our reply is not missed.
                </div>
              </div>
            ) : !composing ? (
              <div className="flex flex-wrap gap-2 pl-9">
                {calcSlug && (
                  <a
                    href={`/calculators/${calcSlug}`}
                    onClick={() => onChip("calculator")}
                    className="inline-flex items-center rounded-full border border-orange-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 hover:bg-orange-50"
                  >
                    See your numbers
                  </a>
                )}
                <a
                  href="/contact"
                  onClick={() => onChip("contact")}
                  className="inline-flex items-center rounded-full border border-orange-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 hover:bg-orange-50"
                >
                  Get in touch
                </a>
              </div>
            ) : null}
          </div>

          {/* Footer: primary action reveals composer */}
          {!composing && status !== "success" && (
            <div className="border-t border-gray-200 bg-white p-3">
              <button
                type="button"
                onClick={() => onChip("question")}
                className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                style={{ background: "#1e293b" }}
              >
                Ask a specialist
              </button>
            </div>
          )}

          {/* Composer */}
          {composing && status !== "success" && (
            <div className="border-t border-gray-200 bg-white p-3">
              <form
                onSubmit={onSubmit}
                className="space-y-2"
                noValidate
                onFocusCapture={(e) => {
                  const t = e.target;
                  if ((t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.name) ft.onFieldFocus(t.name);
                }}
                onBlurCapture={(e) => {
                  const t = e.target;
                  if ((t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.name)
                    ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()), t.name === "email" ? t.value.length : undefined);
                }}
              >
                {/* Honeypot: off-screen, hidden from humans. NEVER early-return on filled. */}
                <input
                  type="text"
                  name="enquiry_ref"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  autoComplete="email"
                  maxLength={100}
                  className={inputClass}
                />
                <textarea
                  name="question"
                  required
                  rows={2}
                  maxLength={500}
                  placeholder="Your message to a specialist"
                  className={inputClass}
                />
                {error && <p className="text-xs font-medium text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#1e293b" }}
                >
                  {status === "loading" ? "Sending..." : "Send to a specialist"}
                </button>
                <p className="text-[11px] leading-relaxed text-gray-500">
                  {siteConfig.leadConsentText} See our{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    style={{ color: "#1e293b" }}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Proactive peek */}
      {!open && peekVisible && peekLine && (
        <div className="mb-3 flex w-[min(88vw,20rem)] items-start gap-2 rounded-2xl border border-orange-200 bg-white p-3 shadow-2xl">
          <button
            type="button"
            onClick={() => handleOpen(true)}
            className="flex-1 text-left text-sm font-medium leading-snug text-gray-800 hover:text-gray-900"
          >
            {peekLine}
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismissPeek}
            className="-mr-1 -mt-1 flex min-h-11 min-w-11 items-center justify-center shrink-0 rounded p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Trigger button: slate pill with orange ring on unread */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : handleOpen(false))}
        data-cta="specialist_widget"
        className="relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:opacity-90"
        style={{ background: "#1e293b" }}
      >
        {!open && unread > 0 && (
          <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none"
              style={{ background: "#f97316" }}
            />
            <span className="relative flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
              {unread}
            </span>
          </span>
        )}
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {open ? "Close" : "Ask a specialist"}
      </button>
    </div>
  );
}
