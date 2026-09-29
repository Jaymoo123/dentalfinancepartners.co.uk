"use client";

/**
 * Founder Tax Partners floating help widget (deterministic, no LLM).
 *
 * Port of the generalist SpecialistWidget with these startups-tech deltas:
 * - Brand ramp classes and the site's own `focusRing` from
 *   components/ui/layout-utils (the kit's `outline-primary-*` literals are
 *   banned here by src/tests/focus-ring.test.ts). Buttons sit on the 700 step,
 *   the locked button ground for this site.
 * - Storage keys use the `ffp` prefix, matching AnalyticsProvider's
 *   storagePrefix in app/layout.tsx: ffp_assistant_autoopened,
 *   ffp_assistant_active, ffp_journey.
 * - Submit uses submitSiteLead (the site's own client helper) with
 *   captureMode: "email_only" and extras: { capture_channel: "assistant", trigger }.
 * - `source` is niche.content_strategy.source_identifier, the same value
 *   components/forms/LeadForm.tsx sends. No rival source key is introduced.
 * - Neutral ramp is `slate-*`, matching the site's `slate-*` estate default
 *   (R7 N1 fix: was `neutral-*`, one-for-one renamed).
 * - Bottom offset is bottom-4, not the generalist bottom-24. That alone would
 *   sit the launcher on top of the footer's only consent control (R7 B3), so
 *   an IntersectionObserver on `document.querySelector("footer")` starts a
 *   scroll/resize listener that lifts the fixed container with
 *   `transform: translateY()` while the footer is in view (GF7 NB-1/NB-2:
 *   never hides the widget, so it stays keyboard-reachable and still renders
 *   on short pages).
 * - Opener copy comes from lib/assistant/opener.ts, written for this site: no
 *   "free call" (the site offers none) and no turnaround promise beyond the
 *   site's own "reply within 24 hours".
 *
 * `formId` is "specialist_widget" and the launcher carries
 * data-cta="specialist_widget" with no placement/goal attributes, byte-identical
 * to Property and generalist, because the estate analytics views key on it.
 * autoCapture resolves placement from nearestSection() when the attribute is
 * absent, which is what the other two sites already record.
 *
 * Sets ffp_assistant_active in sessionStorage on mount so any other exit
 * surface would stand down. There is no other exit surface on this site today.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { focusRing } from "@/components/ui/layout-utils";
import { submitSiteLead } from "@/lib/leads/submit-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { track } from "@accounting-network/web-shared/analytics/track";
import { onAnalyticsEvent } from "@accounting-network/web-shared/analytics/bus";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { useIntentContext } from "@/components/intent/IntentProvider";
import { getTopic } from "@/lib/intent/taxonomy";
import { initJourneyModel, recordPath, getJourneyProfile } from "@/lib/intent/journeyModel";
import { pickOpener, exitOpener, frictionOpener } from "@/lib/assistant/opener";

type Status = "idle" | "loading" | "success" | "error";
type Trigger = "cadence" | "exit" | "friction";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// R7 G1: placeholder:text-slate-400 measured 2.58:1 on white (need 4.5). slate-500
// measures 4.76 (instrument self-test on the equivalent step), so the placeholder
// step is raised one notch from the rest of the field recipe.
const inputClass =
  `mt-1 w-full min-h-12 touch-manipulation rounded-md border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 placeholder:text-slate-500 transition-colors focus:border-primary-600 ${focusRing}`;
// R7 G2: border-primary-300 measured 1.91:1 on white (graphics need 3:1); primary-400
// measures ~2.98 (still short), primary-500 measures ~4.47. Chip border raised to 500.
const chipClass =
  `inline-flex items-center rounded-full border border-primary-500 bg-white px-3 py-3 text-sm font-medium text-primary-800 hover:bg-primary-50 ${focusRing}`;

// Cadence thresholds (ms of visible page time): 30s, 70s, 120s, 180s.
const CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000];
const AUTO_OPEN_KEY = "ffp_assistant_autoopened";
const AUTO_OPEN_DELAY_MS = 600;

export const SPECIALIST_WIDGET_FORM_ID = "specialist_widget";

export function SpecialistWidget() {
  const ctx = useIntentContext();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; question?: string }>({});
  const [unread, setUnread] = useState(0);
  const [peekLine, setPeekLine] = useState<string | null>(null);
  const [peekVisible, setPeekVisible] = useState(false);
  const [composing, setComposing] = useState(false);
  const [liftPx, setLiftPx] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const openedRef = useRef(false);
  const engagedRef = useRef(false);
  const openRef = useRef(false);
  const pingCountRef = useRef(0);
  const visibleMsRef = useRef(0);
  const lastLineRef = useRef<string | null>(null);
  const lastPropsRef = useRef<Record<string, string | number> | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const returnFocusRef = useRef(true);
  const ft = useFormTracking(SPECIALIST_WIDGET_FORM_ID);

  const active = !!ctx;

  // Suppress for visitors who already converted. State, not a one-shot memo
  // (R7 G5): a visitor who converts mid-session (lead_submitted on the bus,
  // fired by this widget's own submit or any other lead form) re-suppresses
  // immediately instead of waiting for the next full page load.
  const [suppressed, setSuppressed] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return isConverted();
    } catch {
      return false;
    }
  });

  useEffect(() => {
    return onAnalyticsEvent((name: string) => {
      if (name === "lead_submitted") setSuppressed(true);
    });
  }, []);

  // GF7 NB-1/NB-2: the launcher/panel sit on top of the footer's only consent
  // control ("Do not track me", plus "Cookie policy" at desktop) at bottom-4.
  // GF6 hid the whole widget while the footer was in view, which made the
  // launcher unreachable by keyboard (tabbing to it scrolls the footer into
  // view, which then hides it) and made it never render at all on short pages
  // where the footer is always in view. Fix: never hide. Instead lift the
  // fixed container with `transform: translateY()` (excluded from layout
  // shift, cheap to paint) so the launcher's bottom edge stays 16px above the
  // footer's top edge. The IntersectionObserver only starts/stops the
  // scroll/resize listeners that recompute the lift; it never sets visibility.
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    let rafId: number | null = null;
    const LAUNCHER_H = 52;
    const BOTTOM_OFFSET = 16;
    const compute = () => {
      rafId = null;
      const footerRect = footer.getBoundingClientRect();
      const vh = window.innerHeight;
      if (footerRect.top >= vh) {
        setLiftPx(0);
        return;
      }
      let lift = vh - footerRect.top;
      // Clamp: launcher must stay at least 16px below the header's bottom
      // edge. On a very short page (footer starts near the top) the naive
      // lift would push the launcher above the viewport/header; in that
      // clamped case the launcher overlaps the footer, acceptable only
      // because the consent toggle stays hit-testable below the launcher.
      const header = document.querySelector("header");
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      const launcherTopUnlifted = vh - BOTTOM_OFFSET - LAUNCHER_H;
      const minTop = headerBottom + BOTTOM_OFFSET;
      if (launcherTopUnlifted - lift < minTop) {
        lift = Math.max(0, launcherTopUnlifted - minTop);
      }
      setLiftPx(lift);
    };
    const onScrollResize = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(compute);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          compute();
          window.addEventListener("scroll", onScrollResize, { passive: true });
          window.addEventListener("resize", onScrollResize, { passive: true });
        } else {
          window.removeEventListener("scroll", onScrollResize);
          window.removeEventListener("resize", onScrollResize);
          setLiftPx(0);
        }
      },
      { threshold: 0 },
    );
    io.observe(footer);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
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
      line = pickOpener(profile, idx);
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

  // The visitor engaged: stop this session's proactive cadence, clear the badge.
  const engage = useCallback(() => {
    engagedRef.current = true;
    setPeekVisible(false);
    setUnread(0);
  }, []);

  // Init journey model and flag the assistant active.
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    initJourneyModel();
    try {
      window.sessionStorage.setItem("ffp_assistant_active", "1");
    } catch {
      /* ignore */
    }
  }, [active]);

  // Record each page in the journey trail.
  useEffect(() => {
    if (active) recordPath(pathname || "/");
  }, [active, pathname]);

  // Mirror `open` into a ref so the cadence tick reads it without re-subscribing.
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // R7 B1 + GF7 NB-3: the trap and the initial focus move happen ONLY on a
  // user-initiated open (isModal, set by handleOpen or by the visitor
  // focusing into an auto-opened panel themselves). An auto-open renders the
  // panel without moving focus and without aria-modal; Tab is not cycled
  // until the user clicks or tabs into it. Re-runs when the composer/status
  // changes because those swap which elements are focusable inside the
  // dialog. Focus returns to the launcher on close only if focus was inside
  // the panel (returnFocusRef, set by closePanel).
  useEffect(() => {
    if (open) wasOpenRef.current = true;
    else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (returnFocusRef.current) launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isModal) return;
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;
    const getFocusable = () =>
      Array.from(
        dialogEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
    const first = getFocusable()[0] ?? dialogEl;
    first.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey) {
        if (currentIndex <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        }
      } else if (currentIndex === -1 || currentIndex === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    dialogEl.addEventListener("keydown", onKeyDown);
    return () => dialogEl.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isModal, composing, status]);

  // GF7 NB-3: Escape must close a non-modal (auto-opened) panel too, since
  // the trap effect above only attaches once isModal is true.
  useEffect(() => {
    if (!open || isModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isModal]);

  // Escalating dwell cadence, keyed to visible page time.
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

  // Exit-intent: one instant ping (the only exit surface on the site).
  useEffect(() => {
    if (!active || suppressed || typeof window === "undefined") return;
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    let armed = false;
    let fired = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, desktop ? 10_000 : 8_000);
    let cleanup = () => {};
    const fire = () => {
      if (!armed || fired || engagedRef.current) return;
      fired = true;
      runPing("exit");
      cleanup();
    };
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
  }, [active, suppressed, runPing]);

  // Friction: instant ping on form_error from the bus.
  useEffect(() => {
    if (!active) return;
    return onAnalyticsEvent((name: string) => {
      if (name === "form_error" && !engagedRef.current) runPing("friction");
    });
  }, [active, runPing]);

  // Auto-open once per session (desktop: open the panel; mobile: peek).
  // Behaviour unchanged from Property and generalist (standing ruling 2026-09-27).
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
      const line = pickOpener(profile, 0);
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
        // R7 G4: desktop auto-open recorded support_opened but never
        // personalization_shown, so the dominant surface (opens on every
        // desktop view) had zero measured impressions. Same payload shape as
        // the mobile peek branch above, variant "panel" instead of "peek".
        const props = {
          surface: "assistant_nudge",
          trigger: "auto",
          variant: "panel",
          rule_id: `assistant_${profile.stage}`,
          topic: profile.primaryTopic ?? "",
          content: line.slice(0, 120),
        };
        lastPropsRef.current = props;
        setPeekLine((prev) => prev ?? line);
        // GF7 NB-3: auto-open renders the panel but does not move focus and
        // is not modal (isModal stays false) until the visitor focuses into
        // it themselves, matching Property/generalist.
        setOpen(true);
        track("personalization_shown", props);
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
  const rawCalcSlug = journeyTopic?.primaryCalculator ?? topic?.primaryCalculator ?? null;
  // R7 G7: suppress the chip when it would link to the page the visitor is already on.
  const calcSlug = rawCalcSlug && `/calculators/${rawCalcSlug}` === pathname ? null : rawCalcSlug;

  function trackNudge(kind: "clicked" | "dismissed") {
    track(`personalization_${kind}`, lastPropsRef.current ?? { surface: "assistant_nudge" });
  }

  function handleOpen(fromPeek: boolean) {
    if (!peekLine) setPeekLine(pickOpener(getJourneyProfile(), 0));
    setComposing(false);
    setOpen(true);
    setIsModal(true); // user-initiated: trap + initial focus move apply
    if (!openedRef.current) {
      openedRef.current = true;
      track("support_opened", { topic: topic?.key ?? "", via: fromPeek ? "nudge" : "button" });
    }
    if (fromPeek) trackNudge("clicked");
    engage();
  }

  function closePanel() {
    returnFocusRef.current = !!dialogRef.current?.contains(document.activeElement);
    setOpen(false);
    setComposing(false);
    setIsModal(false);
  }

  // GF7 NB-3: once the visitor focuses anything inside an auto-opened
  // (non-modal) panel, upgrade it to modal (aria-modal + Tab trap).
  function handleDialogFocusCapture() {
    if (!isModal) setIsModal(true);
  }

  function onChip(goal: "calculator" | "question" | "call") {
    track("cta_click", {
      cta_id: `assistant_${goal}`,
      placement: "assistant_card",
      topic: topic?.key ?? "",
    });
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
    // Honeypot: non-semantic name so autofill and password managers never target
    // it. Passed through rather than silently dropped, so a real human caught by
    // autofill is never lost. Tag-only, so no friction ping.
    const honeypot = String(data.get("enquiry_ref") || "").trim();
    const email = String(data.get("email") || "").trim();
    const question = String(data.get("question") || "").trim();
    // R7 N2: report both missing/invalid fields on an empty submit, not just email.
    const errs: { email?: string; question?: string } = {};
    if (!emailRe.test(email)) errs.email = "Enter a valid email address.";
    if (!question) errs.question = "Add a short message so the accountant knows how to help.";
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      if (errs.email) ft.onError("email", "validation");
      if (errs.question) ft.onError("question", "validation");
      return;
    }
    setFieldErrors({});
    ft.onSubmit(2);
    setStatus("loading");
    const topicTag = topic ? ` (${topic.key})` : "";
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    const result = await submitSiteLead(
      {
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
          form_id: SPECIALIST_WIDGET_FORM_ID,
        },
        captureMode: "email_only",
      },
      honeypot,
    );
    if (!result.success) {
      setStatus("error");
      setError(result.error || "Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }
    ft.onLead({
      source: niche.content_strategy.source_identifier,
      role: SPECIALIST_WIDGET_FORM_ID,
    });
    setStatus("success");
  }

  return (
    // R7 B4: fixed bottom-4 wrapper. Fixed h-/w- launcher below plus the panel/peek
    // being taken OUT of flow (absolute, anchored off the launcher) means mounting
    // or unmounting the panel never changes this wrapper's own box, so the launcher
    // never moves (was CLS 0.111 at 1280: the panel mounting above the launcher in
    // a flex-col pushed the launcher up). `contain: layout` isolates any remaining
    // internal reflow from the rest of the page; only opacity/transform animate.
    <div
      className="fixed bottom-4 right-4 z-[55] print:hidden"
      style={{
        contain: "layout",
        transform: liftPx > 0 ? `translateY(-${liftPx}px)` : undefined,
      }}
    >
      <div className="relative">
        {open && (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal={isModal ? "true" : undefined}
            aria-label="Ask an accountant"
            tabIndex={-1}
            onFocusCapture={handleDialogFocusCapture}
            className="absolute bottom-full right-0 mb-3 flex w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            style={{ height: "min(72dvh, 34rem)" }}
          >
            {/* Header. .ground-dark rebinds --focus-ring to white (R7 B2: the
                brand ring measured 2.54:1 on this bg-primary-950 ground; white
                measures ~17:1). No focusable light-ground child sits inside it. */}
            <div className="ground-dark flex items-center gap-3 bg-primary-950 px-4 py-3 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 ring-2 ring-white/15">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold leading-tight">{siteConfig.name}</p>
                <p className="truncate text-[11px] text-slate-300">We reply within 24 hours</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={closePanel}
                className={`flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-2xl leading-none text-slate-300 hover:text-white ${focusRing}`}
              >
                &times;
              </button>
            </div>

          {/* Conversation */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {peekLine && (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
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
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-medium text-primary-900 shadow-sm">
                  Thanks, we have your message. One of our accountants will reply by email within 24 hours. Please keep an eye on your inbox, and your spam or junk folder, so the reply is not missed.
                </div>
              </div>
            ) : !composing ? (
              <div className="flex flex-wrap gap-2 pl-9">
                {calcSlug && (
                  <a
                    href={`/calculators/${calcSlug}`}
                    onClick={() => onChip("calculator")}
                    className={chipClass}
                  >
                    See your numbers
                  </a>
                )}
                <a href="/contact" onClick={() => onChip("call")} className={chipClass}>
                  {niche.cta.sticky_button}
                </a>
              </div>
            ) : null}
          </div>

          {/* Footer: primary CTA reveals the composer */}
          {!composing && status !== "success" && (
            <div className="border-t border-slate-200 bg-white p-3">
              <button
                type="button"
                onClick={() => onChip("question")}
                className={`w-full rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800 ${focusRing}`}
              >
                Ask an accountant
              </button>
            </div>
          )}

          {/* Composer: revealed when they choose "Ask an accountant" */}
          {composing && status !== "success" && (
            <div className="border-t border-slate-200 bg-white p-3">
              <form
                onSubmit={onSubmit}
                className="space-y-2"
                noValidate
                onFocusCapture={(e) => {
                  const t = e.target;
                  if ((t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.name)
                    ft.onFieldFocus(t.name);
                }}
                onBlurCapture={(e) => {
                  const t = e.target;
                  if ((t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.name)
                    ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
                }}
              >
                {/* Honeypot: non-semantic name so autofill never targets it */}
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
                  aria-label="Your email"
                  placeholder={niche.lead_form.placeholders.email}
                  autoComplete="email"
                  maxLength={100}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "sw-email-error" : undefined}
                  className={inputClass}
                />
                {fieldErrors.email && (
                  <p id="sw-email-error" role="alert" className="text-xs font-medium text-red-600">
                    {fieldErrors.email}
                  </p>
                )}
                <textarea
                  name="question"
                  required
                  rows={2}
                  maxLength={500}
                  aria-label="Your question"
                  placeholder="Your question for an accountant"
                  aria-invalid={!!fieldErrors.question}
                  aria-describedby={fieldErrors.question ? "sw-question-error" : undefined}
                  className={inputClass}
                />
                {fieldErrors.question && (
                  <p id="sw-question-error" role="alert" className="text-xs font-medium text-red-600">
                    {fieldErrors.question}
                  </p>
                )}
                {error && (
                  <p role="alert" className="text-xs font-medium text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-60 ${focusRing}`}
                >
                  {status === "loading" ? "Sending..." : "Send to an accountant"}
                </button>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  {siteConfig.leadConsentText} See our{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded font-semibold text-primary-700 underline ${focusRing}`}
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

        {/* Proactive peek: clicking opens the panel. Absolute + anchored off the
            launcher (see B4 note above) so it never moves the launcher. */}
        {!open && peekVisible && peekLine && (
          <div className="absolute bottom-full right-0 mb-3 flex w-[min(88vw,20rem)] items-start gap-2 rounded-2xl border border-primary-200 bg-white p-3 shadow-2xl">
            <button
              type="button"
              onClick={() => handleOpen(true)}
              className={`flex-1 rounded text-left text-sm font-medium leading-snug text-slate-800 hover:text-primary-700 ${focusRing}`}
            >
              {peekLine}
            </button>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismissPeek}
              className={`-mr-1 -mt-1 flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded p-1 text-slate-400 hover:text-slate-700 ${focusRing}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Fixed size (h-[52px] w-[12.5rem]) so the "Ask an accountant" / "Close"
            label swap and the unread badge can never resize the launcher and
            shift anything around it (R7 B4). */}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => (open ? closePanel() : handleOpen(false))}
          data-cta="specialist_widget"
          className={`relative flex h-[52px] w-[12.5rem] shrink-0 items-center justify-center gap-2 rounded-full bg-primary-700 px-4 text-sm font-semibold text-white shadow-2xl hover:bg-primary-800 ${focusRing}`}
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
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {open ? "Close" : "Ask an accountant"}
        </button>
      </div>
    </div>
  );
}
