"use client";

/**
 * Curated specialist widget for Dental Finance Partners.
 *
 * A topic-aware FAQ plus an honest "ask a specialist" lead capture. Not a
 * chatbot pretending to be a person: it answers common questions and routes
 * the rest to a real specialist. Consent/SSR-safe, no-op in /embed and /admin
 * (gated via the intent context). Styled with Dentists CSS-variable tokens.
 *
 * TOKEN HARDENING: no var(--gold), no orange-*, no emerald-*.
 * Uses Dentists-defined tokens: --navy, --gold, --gold-soft, --surface,
 * --surface-elevated, --border, --ink, --ink-soft, --muted.
 *
 * Proactive layer (Phase 0, deterministic, no LLM): presents as a prominent
 * card. Auto-opens ONCE per session shortly after landing for immediacy.
 * Otherwise surfaces a badge "peek" with a journey-tailored one-liner that
 * escalates over the session (at 30/70/120/180s of VISIBLE page time),
 * re-tailors each time, and fires instantly on exit-intent or form friction.
 * Stops the moment the visitor opens it (or has converted / opted out).
 *
 * Stand-down: sets dfp_assistant_active so ExitIntentModal knows the assistant
 * is live and stands down (never two exit prompts at once).
 * ExitIntentModal ALREADY reads this key at line 82; only the setter is new.
 *
 * Chip: "Book a free call" -> /contact (no /book path on Dentists).
 * Widget capture: email + message via email_only captureMode through submitDentistLead.
 * Consent: uses siteConfig.leadConsentText (the Reflex-aware line; the widget
 *   IS an enquiry, so this is correct).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitDentistLead } from "@/lib/leads/submit-client";
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

// Dentists token-safe input class
const inputClass =
  "mt-1 w-full rounded-lg border-2 border-[var(--border)] bg-white px-3 py-2 text-base text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/25 min-h-12 touch-manipulation";

// Cadence thresholds (ms of VISIBLE page time): first ping 30s, then +40s, +50s, +60s.
const CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000];
// Auto-open: present the card ONCE per session shortly after landing.
const AUTO_OPEN_KEY = "dfp_assistant_autoopened";
const AUTO_OPEN_DELAY_MS = 600;

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
      window.sessionStorage.setItem("dfp_assistant_active", "1");
    } catch {
      /* ignore */
    }
  }, [active]);

  // Record each page in the journey trail.
  useEffect(() => {
    if (active) recordPath(pathname || "/");
  }, [active, pathname]);

  // Mirror `open` into a ref so the cadence tick reads it without re-subscribing.
  useEffect(() => { openRef.current = open; }, [open]);

  // Escalating dwell cadence, keyed to visible-tab time.
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

  // Exit-intent: a single instant tailored ping.
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

  // Friction: form silently failed (honeypot/validation) -> instant ping.
  useEffect(() => {
    if (!active) return;
    return onAnalyticsEvent((name: string) => {
      if (name === "form_error" && !engagedRef.current) runPing("friction");
    });
  }, [active, runPing]);

  // Auto-open: ONCE per session in production; always in dev.
  useEffect(() => {
    if (!active || suppressed || typeof window === "undefined") return;
    if (process.env.NODE_ENV === "production") {
      try {
        if (window.sessionStorage.getItem(AUTO_OPEN_KEY) === "1") return;
      } catch {
        /* ignore */
      }
    }
    const t = window.setTimeout(() => {
      if (engagedRef.current || openRef.current) return;
      try {
        window.sessionStorage.setItem(AUTO_OPEN_KEY, "1");
      } catch {
        /* ignore */
      }
      const profile = getJourneyProfile();
      const line = openerFor(profile, 0);
      lastLineRef.current = line;
      if (window.innerWidth < 640) {
        // Mobile: announce with peek; tap to open.
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

  // ctx is null in /embed, /admin, or when the visitor opted out.
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

  function onChip(goal: "calculator" | "question" | "call") {
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
    // Honeypot: non-semantic name so autofill/password managers do not target it.
    // Do NOT early-return: the server chokepoint stores the row flagged.
    const honeypot = String(data.get("enquiry_ref") || "").trim();
    // Honeypot is tag-only (autofill hits real humans); no friction ping.
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
    const topicTag = topic ? ` (${topic.key})` : "";
    // The widget IS an enquiry, so the Reflex-aware leadConsentText is correct here.
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
    const result = await submitDentistLead(payload, honeypot);
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
          aria-label="Dental Finance Partners assistant"
          className="mb-3 flex w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl"
          style={{ height: "min(72dvh, 34rem)" }}
        >
          {/* Agent header: navy background, gold accents */}
          <div className="flex items-center gap-3 bg-[var(--navy)] px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] ring-2 ring-white/15">
              <svg className="h-5 w-5 text-[var(--navy)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-tight">Dental Finance Partners</p>
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
          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--surface-elevated)] p-4">
            {peekLine && (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-[var(--border)] bg-white px-3 py-2 text-sm leading-relaxed text-[var(--ink)] shadow-sm">
                  {peekLine}
                </div>
              </div>
            )}
            {status === "success" ? (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-[var(--gold-soft)] bg-[var(--surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--navy)] shadow-sm">
                  Thanks, a specialist has your message and will be in touch by email. Please keep an eye on your inbox, and your spam or junk folder, so our reply is not missed.
                </div>
              </div>
            ) : !composing ? (
              <div className="flex flex-wrap gap-2 pl-9">
                {calcSlug && (
                  <a
                    href={`/calculators/${calcSlug}`}
                    onClick={() => onChip("calculator")}
                    className="inline-flex items-center rounded-full border border-[var(--gold)]/30 bg-white px-3 py-3 text-sm font-medium text-[var(--navy)] hover:bg-[var(--gold-soft)]"
                  >
                    See your numbers
                  </a>
                )}
                <a
                  href="/contact"
                  onClick={() => onChip("call")}
                  className="inline-flex items-center rounded-full border border-[var(--gold)]/30 bg-white px-3 py-3 text-sm font-medium text-[var(--navy)] hover:bg-[var(--gold-soft)]"
                >
                  Book a free call
                </a>
              </div>
            ) : null}
          </div>

          {/* Footer: primary action reveals the composer */}
          {!composing && status !== "success" && (
            <div className="border-t border-[var(--border)] bg-white p-3">
              <button
                type="button"
                onClick={() => onChip("question")}
                className="w-full rounded-lg bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Ask a specialist
              </button>
            </div>
          )}

          {/* Composer */}
          {composing && status !== "success" && (
            <div className="border-t border-[var(--border)] bg-white p-3">
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
                {/* Honeypot: off-screen, hidden from humans */}
                <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />
                <input type="email" name="email" required placeholder="Your email" autoComplete="email" maxLength={100} className={inputClass} />
                <textarea name="question" required rows={2} maxLength={500} placeholder="Your message to a specialist" className={inputClass} />
                {error && <p className="text-xs font-medium text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send to a specialist"}
                </button>
                <p className="text-[11px] leading-relaxed text-[var(--muted)]">
                  {siteConfig.leadConsentText} See our{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--navy)] underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Proactive peek: clicking opens the panel. */}
      {!open && peekVisible && peekLine && (
        <div className="mb-3 flex w-[min(88vw,20rem)] items-start gap-2 rounded-2xl border border-[var(--gold)]/20 bg-white p-3 shadow-2xl">
          <button
            type="button"
            onClick={() => handleOpen(true)}
            className="flex-1 text-left text-sm font-medium leading-snug text-[var(--ink)] hover:text-[var(--navy)]"
          >
            {peekLine}
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismissPeek}
            className="-mr-1 -mt-1 flex min-h-11 min-w-11 items-center justify-center shrink-0 rounded p-1 text-[var(--muted)] hover:text-[var(--ink)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : handleOpen(false))}
        data-cta="specialist_widget"
        className="relative flex items-center gap-2 rounded-full bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:opacity-90"
      >
        {!open && unread > 0 && (
          <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none"
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
