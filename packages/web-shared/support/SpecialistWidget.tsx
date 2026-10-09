"use client";

/**
 * The estate's floating help widget (deterministic, no LLM).
 *
 * ONE implementation. Lifted from startups-tech/web after its adversarial
 * review (docs/startups-tech/_port/R7_WIDGET_REVIEW.md, fixes in 7dc3c7fe and
 * 878d56ce), so the accessibility work travels with the component rather than
 * being re-derived per site. Everything site-specific arrives through the
 * `WidgetConfig` injected at `<IntentProvider config={...}>`: taxonomy, openers,
 * every visitor-facing string, every class recipe, the storage prefix, the lead
 * source, the form id and the submit client.
 *
 * `formId` and the launcher's `data-cta` come from config and are
 * "specialist_widget" across the estate, because the estate analytics views key
 * on it. autoCapture resolves placement from nearestSection() when no placement
 * attribute is present, which is what the sites already record.
 *
 * Sets `<prefix>_assistant_active` in sessionStorage on mount so any other exit
 * surface stands down.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useFormTracking } from "../analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "../analytics/ids";
import { track } from "../analytics/track";
import { onAnalyticsEvent } from "../analytics/bus";
import { isConverted } from "../analytics/visitMemory";
import { useIntentContext, useWidgetConfig } from "./IntentProvider";

type Status = "idle" | "loading" | "success" | "error";
type Trigger = "cadence" | "exit" | "friction";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cadence thresholds (ms of visible page time): 30s, 70s, 120s, 180s.
const CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000];
const AUTO_OPEN_DELAY_MS = 600;
const DEFAULT_LAUNCHER_H = 52;

/**
 * Which event may upgrade an auto-opened (non-modal) panel into a trapped
 * modal dialog.
 *
 * GF8, from R4 W-B1 on hospitality: the previous rule upgraded on ANY focus
 * arriving in the panel, so a visitor tabbing forward through the page hit the
 * auto-opened panel (press 80 on `/`, 40 on a calculator), `aria-modal`
 * flipped, the Tab trap armed and the launcher became unreachable in 420
 * presses. WCAG 2.1.2 and 2.4.3, on a surface nobody asked for.
 *
 * The rule now: only a DELIBERATE open traps. A pointer press inside the
 * panel, Enter/Space on one of its controls, or the launcher itself all count
 * as deliberate. A focus event counts only when it came from another control
 * already inside the panel AND the visitor did not simply tab in from the page
 * (`tabbedInFromPage`), because tabbing THROUGH the panel's controls on the way
 * to the launcher must stay possible.
 */
export type ModalUpgradeCause = "launcher" | "pointer" | "key" | "focus";

export function shouldUpgradeToModal(
  cause: ModalUpgradeCause,
  opts: {
    alreadyModal: boolean;
    relatedTargetInsidePanel?: boolean;
    tabbedInFromPage?: boolean;
  },
): boolean {
  if (opts.alreadyModal) return false;
  if (cause === "focus") {
    return opts.relatedTargetInsidePanel === true && opts.tabbedInFromPage !== true;
  }
  return true;
}

export function SpecialistWidget() {
  const config = useWidgetConfig();
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
  // GF8: set when focus arrives in the panel from OUTSIDE it (a forward Tab
  // through the page). While it is true, moving between the panel's own
  // controls must not arm the trap; cleared when focus leaves the panel again.
  const tabbedInRef = useRef(false);
  const ft = useFormTracking(config?.formId ?? "specialist_widget");

  const active = !!ctx && !!config;
  const journey = config?.journey;
  const openers = config?.openers;
  const autoOpenKey = `${config?.storagePrefix ?? ""}_assistant_autoopened`;
  const launcherHeight = config?.launcherHeightPx ?? DEFAULT_LAUNCHER_H;

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

  // GF7 NB-1/NB-2: at a small bottom offset the launcher/panel sit on top of
  // the footer's only consent control. GF6 hid the whole widget while the
  // footer was in view, which made the launcher unreachable by keyboard
  // (tabbing to it scrolls the footer into view, which then hides it) and made
  // it never render at all on short pages where the footer is always in view.
  // Fix: never hide. Instead lift the fixed container with
  // `transform: translateY()` (excluded from layout shift, cheap to paint) so
  // the launcher's bottom edge stays 16px above the footer's top edge. The
  // IntersectionObserver only starts/stops the scroll/resize listeners that
  // recompute the lift; it never sets visibility.
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    let rafId: number | null = null;
    const LAUNCHER_H = launcherHeight;
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
  }, [launcherHeight]);

  // Show a tailored ping. Re-derives the journey each time; never repeats a line.
  const runPing = useCallback(
    (trigger: Trigger) => {
      if (engagedRef.current || typeof window === "undefined") return;
      if (!journey || !openers) return;
      const profile = journey.getProfile();
      let line: string;
      let variant: string;
      if (trigger === "friction") {
        line = openers.friction(profile);
        variant = "friction";
      } else if (trigger === "exit") {
        line = openers.exit(profile);
        variant = "exit";
      } else {
        const idx = pingCountRef.current;
        line = openers.pick(profile, idx);
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
    },
    [journey, openers],
  );

  // The visitor engaged: stop this session's proactive cadence, clear the badge.
  const engage = useCallback(() => {
    engagedRef.current = true;
    setPeekVisible(false);
    setUnread(0);
  }, []);

  // Init journey model and flag the assistant active.
  useEffect(() => {
    if (!active || typeof window === "undefined" || !journey || !config) return;
    journey.init();
    try {
      window.sessionStorage.setItem(`${config.storagePrefix}_assistant_active`, "1");
    } catch {
      /* ignore */
    }
  }, [active, journey, config]);

  // Record each page in the journey trail.
  useEffect(() => {
    if (active && journey) journey.recordPath(pathname || "/");
  }, [active, journey, pathname]);

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
    // GF8: only pull focus in when it is not already inside. A pointer or
    // keyboard upgrade happens with focus already on a panel control, and
    // yanking it back to the first one would fight the visitor.
    if (!dialogEl.contains(document.activeElement)) {
      const first = getFocusable()[0] ?? dialogEl;
      first.focus();
    }
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
      if (name !== "form_error" || engagedRef.current) return;
      // Never while focus is inside a form: pinging mid-correction covers
      // the very form we want them to finish (mobile mini-form Continue).
      const ae = document.activeElement;
      if (ae && ae.closest("form")) return;
      runPing("friction");
    });
  }, [active, runPing]);

  // Auto-open once per session (desktop: open the panel; narrow viewports: never
  // auto-open at all, badge/cadence-ping still allowed after the first scroll via
  // the existing cadence effect). Estate ruling 2026-09-30 (items 2/5 of the
  // render-batch-4 review): the pre-existing <640 "peek" auto-open rendered a
  // tooltip/balloon over the hero CTA on first paint on Property, Medical,
  // contractors-ir35 and startups-tech, and Medical's panel classes go full-screen
  // under 768px, so this is gated at 768 rather than repeating the old 640 cutoff.
  useEffect(() => {
    if (!active || suppressed || typeof window === "undefined") return;
    if (!journey || !openers) return;
    if (window.innerWidth < 768) return;
    if (process.env.NODE_ENV === "production") {
      try {
        if (window.sessionStorage.getItem(autoOpenKey) === "1") return;
      } catch {
        /* ignore */
      }
    }
    const t = window.setTimeout(() => {
      if (engagedRef.current || openRef.current) return;
      try {
        window.sessionStorage.setItem(autoOpenKey, "1");
      } catch {
        /* ignore */
      }
      const profile = journey.getProfile();
      const line = openers.pick(profile, 0);
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
  }, [active, suppressed, journey, openers, autoOpenKey]);

  // ctx is null on the config's hidden paths, or when the visitor opted out.
  if (!ctx || !config) return null;

  const { classes: c, copy } = config;
  const topic = config.getTopic(ctx.pageTopic ?? ctx.entryTopic);
  const journeyTopic = open ? config.getTopic(config.journey.getProfile().primaryTopic) : null;
  const rawCalcSlug = journeyTopic?.primaryCalculator ?? topic?.primaryCalculator ?? null;
  // R7 G7: suppress the chip when it would link to the page the visitor is already on.
  const calcSlug =
    rawCalcSlug && `${config.calculatorHrefPrefix}${rawCalcSlug}` === pathname ? null : rawCalcSlug;

  function trackNudge(kind: "clicked" | "dismissed") {
    track(`personalization_${kind}`, lastPropsRef.current ?? { surface: "assistant_nudge" });
  }

  function handleOpen(fromPeek: boolean) {
    if (!peekLine) setPeekLine(config!.openers.pick(config!.journey.getProfile(), 0));
    setComposing(false);
    setOpen(true);
    tabbedInRef.current = false;
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
    tabbedInRef.current = false;
  }

  // GF7 NB-3 as re-cut by GF8 (R4 W-B1): an auto-opened panel upgrades to a
  // modal with a Tab trap only on a DELIBERATE open, never on a Tab that is
  // merely passing through it. See shouldUpgradeToModal above.
  function handleDialogFocusCapture(e: React.FocusEvent<HTMLDivElement>) {
    const related = e.relatedTarget as Node | null;
    const inside = !!related && !!dialogRef.current?.contains(related);
    if (!inside) tabbedInRef.current = true;
    if (
      shouldUpgradeToModal("focus", {
        alreadyModal: isModal,
        relatedTargetInsidePanel: inside,
        tabbedInFromPage: tabbedInRef.current,
      })
    ) {
      setIsModal(true);
    }
  }

  function handleDialogBlurCapture(e: React.FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget as Node | null;
    if (!next || !dialogRef.current?.contains(next)) tabbedInRef.current = false;
  }

  function handleDialogPointerDown() {
    tabbedInRef.current = false;
    if (shouldUpgradeToModal("pointer", { alreadyModal: isModal })) setIsModal(true);
  }

  function handleDialogKeyDownCapture(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
    tabbedInRef.current = false;
    if (shouldUpgradeToModal("key", { alreadyModal: isModal })) setIsModal(true);
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
    const cfg = config!;
    const data = new FormData(e.currentTarget);
    // Honeypot: non-semantic name so autofill and password managers never target
    // it. Passed through rather than silently dropped, so a real human caught by
    // autofill is never lost. Tag-only, so no friction ping.
    const honeypot = String(data.get("enquiry_ref") || "").trim();
    const email = String(data.get("email") || "").trim();
    const question = String(data.get("question") || "").trim();
    // R7 N2: report both missing/invalid fields on an empty submit, not just email.
    const errs: { email?: string; question?: string } = {};
    if (!emailRe.test(email)) errs.email = cfg.copy.emailError;
    if (!question) errs.question = cfg.copy.questionError;
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
    const consentText = `${cfg.copy.consentPrefix} See our Privacy Policy.`;
    const result = await cfg.submitLead(
      {
        full_name: "",
        email,
        phone: "",
        role: "Other",
        message: `[Specialist question${topicTag}] ${question}`,
        source: cfg.leadSource,
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
          form_id: cfg.formId,
        },
        captureMode: "email_only",
      },
      honeypot,
    );
    if (!result.success) {
      setStatus("error");
      setError(result.error || cfg.copy.genericError);
      ft.onError("form", "server");
      return;
    }
    ft.onLead({ source: cfg.leadSource, role: cfg.formId });
    setStatus("success");
  }

  return (
    // R7 B4: fixed wrapper. Fixed h-/w- launcher below plus the panel/peek
    // being taken OUT of flow (absolute, anchored off the launcher) means mounting
    // or unmounting the panel never changes this wrapper's own box, so the launcher
    // never moves (was CLS 0.111 at 1280: the panel mounting above the launcher in
    // a flex-col pushed the launcher up). `contain: layout` isolates any remaining
    // internal reflow from the rest of the page; only opacity/transform animate.
    <div
      className={c.container}
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
            aria-label={copy.launcherLabel}
            tabIndex={-1}
            onFocusCapture={handleDialogFocusCapture}
            onBlurCapture={handleDialogBlurCapture}
            onPointerDownCapture={handleDialogPointerDown}
            onKeyDownCapture={handleDialogKeyDownCapture}
            className={c.panel}
            style={{ height: "min(72dvh, 34rem)" }}
          >
            {/* Header. A site whose header ground is dark rebinds its focus ring
                there (R7 B2: startups-tech's brand ring measured 2.54:1 on its
                primary-950 ground; white measures ~17:1). No focusable
                light-ground child sits inside it. */}
            <div className={c.header}>
              <span className={c.headerAvatar}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className={c.headerTitle}>{copy.headerTitle}</p>
                <p className={c.headerSubtitle}>{copy.headerSubtitle}</p>
              </div>
              <button
                type="button"
                aria-label={copy.closeAriaLabel}
                onClick={closePanel}
                className={c.closeButton}
              >
                &times;
              </button>
            </div>

          {/* Conversation */}
          <div className={c.conversation}>
            {peekLine && (
              <div className="flex items-start gap-2">
                <span className={c.messageAvatar}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className={c.messageBubble}>
                  {peekLine}
                </div>
              </div>
            )}
            {status === "success" ? (
              <div className="flex items-start gap-2">
                <span className={c.messageAvatar}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className={c.successBubble}>
                  {copy.successMessage}
                </div>
              </div>
            ) : !composing ? (
              <div className={c.chipRow}>
                {calcSlug && (
                  <a
                    href={`${config.calculatorHrefPrefix}${calcSlug}`}
                    onClick={() => onChip("calculator")}
                    className={c.chip}
                  >
                    {copy.calculatorChip}
                  </a>
                )}
                <a href={config.contactHref} onClick={() => onChip("call")} className={c.chip}>
                  {copy.contactChip}
                </a>
              </div>
            ) : null}
          </div>

          {/* Footer: primary CTA reveals the composer */}
          {!composing && status !== "success" && (
            <div className={c.footer}>
              <button
                type="button"
                onClick={() => onChip("question")}
                className={c.primaryButton}
              >
                {copy.askButton}
              </button>
            </div>
          )}

          {/* Composer: revealed when they choose the ask button */}
          {composing && status !== "success" && (
            <div className={c.footer}>
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
                  className={c.honeypot}
                />
                <input
                  type="email"
                  name="email"
                  required
                  aria-label={copy.emailAriaLabel}
                  placeholder={copy.emailPlaceholder}
                  autoComplete="email"
                  maxLength={100}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "sw-email-error" : undefined}
                  className={c.input}
                />
                {fieldErrors.email && (
                  <p id="sw-email-error" role="alert" className={c.errorText}>
                    {fieldErrors.email}
                  </p>
                )}
                <textarea
                  name="question"
                  required
                  rows={2}
                  maxLength={500}
                  aria-label={copy.questionAriaLabel}
                  placeholder={copy.questionPlaceholder}
                  aria-invalid={!!fieldErrors.question}
                  aria-describedby={fieldErrors.question ? "sw-question-error" : undefined}
                  className={c.input}
                />
                {fieldErrors.question && (
                  <p id="sw-question-error" role="alert" className={c.errorText}>
                    {fieldErrors.question}
                  </p>
                )}
                {error && (
                  <p role="alert" className={c.errorText}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={c.submitButton}
                >
                  {status === "loading" ? copy.submitButtonLoading : copy.submitButton}
                </button>
                <p className={c.consentText}>
                  {copy.consentPrefix} See our{" "}
                  <a
                    href={config.privacyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={c.privacyLink}
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
          <div className={c.peekCard}>
            <button
              type="button"
              onClick={() => handleOpen(true)}
              className={c.peekButton}
            >
              {peekLine}
            </button>
            <button
              type="button"
              aria-label={copy.dismissAriaLabel}
              onClick={dismissPeek}
              className={c.peekDismiss}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Fixed size (h-/w- in classes.launcher) so the open/close label swap and
            the unread badge can never resize the launcher and shift anything
            around it (R7 B4). */}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => (open ? closePanel() : handleOpen(false))}
          data-cta={config.ctaId}
          className={c.launcher}
        >
          {!open && unread > 0 && (
            <span className={c.badgeWrap}>
              <span
                aria-hidden="true"
                className={c.badgePing}
              />
              <span className={c.badge}>
                {unread}
              </span>
            </span>
          )}
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {open ? copy.closeLabel : copy.launcherLabel}
        </button>
      </div>
    </div>
  );
}
