"use client";

/**
 * Curated specialist widget — a topic-aware FAQ plus an honest "ask a specialist"
 * lead capture. Not a chatbot pretending to be a person: it answers common
 * questions and routes the rest to a real specialist (lead). Consent/SSR-safe,
 * no-op in /embed and /admin (gated via the intent context).
 *
 * Proactive layer (MVP, deterministic, no LLM): presents as a prominent chat-style
 * card (Yell-inspired feel). It auto-opens ONCE per session shortly after landing
 * for immediacy, and otherwise surfaces a red-badge "peek" with a journey-tailored
 * one-liner that escalates over the session (at 30/70/120/180s of VISIBLE page
 * time), re-tailors each time, and fires instantly on exit-intent or form friction.
 * It stops the moment the visitor opens it (or has converted / opted out). It is an
 * honest async enquiry (a specialist replies within a working day), NOT a live human
 * chat and NOT a model. The conversational LLM is Phase 1+, gated and deferred.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
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
const inputClass =
  "mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25";

// Cadence thresholds (ms of time spent on the page with the tab VISIBLE): first
// ping at 30s, then +40s, +50s, +60s. Visible-time (not strict engaged-active)
// so a quiet reader still gets re-pinged as they spend time; pauses only when
// the tab is backgrounded.
const CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000];
// Yell-style immediacy: present the card ONCE per session shortly after landing
// so its availability is unmissable. Presentation only (no 30d suppress).
const AUTO_OPEN_KEY = "ptp_assistant_autoopened";
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

  // Suppress the proactive layer only for visitors who've already converted.
  // (Within a session, an actual engagement also stops it via engagedRef — no
  // cross-session lock, so a non-converting visitor can be helped again next time.)
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
      line = frictionOpener();
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
      window.sessionStorage.setItem("ptp_assistant_active", "1");
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

  // Escalating dwell cadence, keyed to time spent on the page with the tab
  // visible (accrues while reading; pauses only when backgrounded).
  useEffect(() => {
    if (!active || suppressed) return;
    let lastTick = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      const dt = now - lastTick;
      lastTick = now;
      if (document.visibilityState === "visible") visibleMsRef.current += dt;
      // Keep accruing time, but don't surface a ping while the panel is open or after engagement.
      if (engagedRef.current || openRef.current) return;
      const next = CADENCE_THRESHOLDS_MS[pingCountRef.current];
      if (next != null && visibleMsRef.current >= next) runPing("cadence");
    }, 1000);
    return () => window.clearInterval(id);
  }, [active, suppressed, runPing]);

  // Exit-intent: a single instant tailored ping (supersedes ExitIntentModal here).
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

  // Yell-style immediacy: auto-present the card ONCE per session shortly after
  // landing (consent-gated; never for converted/suppressed visitors). Presentation
  // only -> does NOT set the 30-day engaged-suppress (reserved for an actual click).
  useEffect(() => {
    if (!active || suppressed || typeof window === "undefined") return;
    // Once per session in production; in dev always auto-open so it's easy to test.
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
      setPeekLine((prev) => prev ?? openerFor(profile, 0));
      setOpen(true);
      if (!openedRef.current) {
        openedRef.current = true;
        track("support_opened", { topic: profile.primaryTopic ?? "", via: "auto" });
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [active, suppressed]);

  // ctx is null in /embed, /admin, or when the visitor opted out.
  if (!ctx) return null;

  const topic = getTopic(ctx.pageTopic ?? ctx.entryTopic);
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  // Journey-primary topic drives the welcome line + the "see your numbers" shortcut.
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

  // Low-friction choices in the open card. calculator/call are links; question
  // reveals the message composer. Any choice counts as genuine engagement.
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
    // Honeypot named `enquiry_ref` (non-semantic) so autofill/password managers don't target
    // it — old name `company_url` silently dropped real humans. [[property_leadform_honeypot_silent_drop]]
    if (String(data.get("enquiry_ref") || "").trim() !== "") {
      ft.onError("enquiry_ref", "honeypot"); // value-free diagnostic; behaviour unchanged (still blocks)
      return;
    }
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
    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setError("Form not connected. Email us directly, we reply same day.");
      return;
    }
    setStatus("loading");
    const topicTag = topic ? ` (${topic.key})` : "";
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
      // Legitimate-interests acknowledgement: submitting IS the affirmative act, so
      // this is always true; consent_text records the exact wording shown (Annex B.1).
      consent_given: true,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
      // Attribution: this panel is the proactive assistant surface. `source` stays the
      // niche; the capture channel + last nudge trigger live in extras (JSONB).
      extras: {
        capture_channel: "assistant",
        trigger: (lastPropsRef.current?.trigger as string) ?? "widget",
      },
    };
    const result = await submitLead(payload, supabaseUrl, supabaseKey);
    if (!result.success) {
      setStatus("error");
      setError(result.error || "Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }
    ft.onLead({ source: payload.source, role: "specialist_widget" });
    setStatus("success");
  }

  return (
    <div className="fixed bottom-24 right-4 z-[55] flex flex-col items-end print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Property Tax Partners assistant"
          className="mb-3 flex w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          style={{ height: "min(72vh, 34rem)" }}
        >
          {/* Agent header */}
          <div className="flex items-center gap-3 bg-slate-900 px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 ring-2 ring-white/15">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-tight">Property Tax Partners</p>
              <p className="truncate text-[11px] text-slate-300">Specialist replies within one working day</p>
            </div>
            <button type="button" aria-label="Close" onClick={closePanel} className="shrink-0 text-2xl leading-none text-slate-300 hover:text-white">
              &times;
            </button>
          </div>

          {/* Conversation */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {peekLine && (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-800 shadow-sm">
                  {peekLine}
                </div>
              </div>
            )}
            {status === "success" ? (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900 shadow-sm">
                  Thanks, that's with a specialist now. You'll hear back within one working day.
                </div>
              </div>
            ) : !composing ? (
              <div className="flex flex-wrap gap-2 pl-9">
                {calcSlug && (
                  <a
                    href={`/calculators/${calcSlug}`}
                    onClick={() => onChip("calculator")}
                    className="inline-flex items-center rounded-full border border-emerald-300 bg-white px-3 py-1.5 text-sm font-medium leading-none text-emerald-800 hover:bg-emerald-50"
                  >
                    See your numbers
                  </a>
                )}
                <a
                  href="/contact"
                  onClick={() => onChip("call")}
                  className="inline-flex items-center rounded-full border border-emerald-300 bg-white px-3 py-1.5 text-sm font-medium leading-none text-emerald-800 hover:bg-emerald-50"
                >
                  Book a free call
                </a>
              </div>
            ) : null}
          </div>

          {/* Footer: the prominent primary action (menu) -> reveals the composer */}
          {!composing && status !== "success" && (
            <div className="border-t border-slate-200 bg-white p-3">
              <button
                type="button"
                onClick={() => onChip("question")}
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ask a specialist
              </button>
            </div>
          )}

          {/* Composer — revealed when they choose "Ask a specialist" */}
          {composing && status !== "success" && (
            <div className="border-t border-slate-200 bg-white p-3">
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
                {/* Honeypot — non-semantic name so autofill/password managers don't target it (was company_url) */}
                <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />
                <input type="email" name="email" required placeholder="Your email" autoComplete="email" maxLength={100} className={inputClass} />
                <textarea name="question" required rows={2} maxLength={500} placeholder="Your message to a specialist" className={inputClass} />
                {error && <p className="text-xs font-medium text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send to a specialist"}
                </button>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  {siteConfig.leadConsentText} See our{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Proactive peek (deterministic, journey-tailored). Clicking opens the panel above. */}
      {!open && peekVisible && peekLine && (
        <div className="mb-3 flex w-[min(88vw,20rem)] items-start gap-2 rounded-2xl border border-emerald-200 bg-white p-3 shadow-2xl">
          <button
            type="button"
            onClick={() => handleOpen(true)}
            className="flex-1 text-left text-sm font-medium leading-snug text-slate-800 hover:text-emerald-700"
          >
            {peekLine}
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismissPeek}
            className="-mr-1 -mt-1 shrink-0 rounded p-1 text-slate-400 hover:text-slate-700"
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
        className="relative flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-emerald-700"
      >
        {!open && unread > 0 && (
          <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center">
            {/* Soft pulsing halo — gentle "I'm here"; honours reduced-motion. */}
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
