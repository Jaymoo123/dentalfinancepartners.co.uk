"use client";

/**
 * Deep-scroll topic offer. When a not-yet-converted reader gets deep into a page
 * with a clear topic, surface that topic's calculator, or a review when the
 * topic has no calculator. Modal overlay = no layout shift.
 *
 * Suppression rules, copied AS DATA from Property (read-only ground truth,
 * Property/web/src/components/intent/DeepScrollModal.tsx):
 *  - ONE offer per page-load session, across topics: module-level flag
 *    (`shownThisSession`, Property :32).
 *  - 30-day per-topic suppress in localStorage (Property :13-29), key
 *    `pfp_deepscroll_<topic>` (Property's is `ptp_deepscroll_<topic>`).
 * Nothing under Property/ was edited (T12).
 *
 * MUTUAL EXCLUSION (R2 B2). Property mounts its three surfaces side by side
 * (Property/web/src/app/layout.tsx:144-146) and relies on the engine giving one
 * surface at a time (`evaluate(surface, ctx)`, packages/web-shared/support/
 * engine.ts:96-138) plus the module session flag at Property's
 * DeepScrollModal.tsx:33 and the sticky bar's own z-50/z-40/z-50 stack
 * (Property StickyCTA.tsx:80, ReturningBar.tsx:39) -- which is exactly what let
 * three surfaces publish the same offer here at 1440. So the gate is explicit:
 *  - while this modal is open, `data-surface-open` on <html> hides the sticky
 *    bar and the widget mount (one CSS rule, layout.tsx capture region);
 *  - this modal never opens while the kit widget PANEL is OPEN (`widgetPanelOpen()`
 *    below; W7C corrected this from a presence check to an open-state check, and
 *    made it retry when the panel closes rather than giving up for the page load),
 *    so the modal never lands on top of a panel that is painting -- whether the
 *    visitor opened it or the kit auto-opened it;
 *  - the sticky bar and the returning bar never both show (StickyCTA's
 *    `returning` gate);
 *  - ONE modal per page-load session stays (`shownThisSession`).
 * The focus trap below still runs, so the modal remains the only keyboard
 * surface while it is up.
 *
 * Added here, beyond both source copies: a focus trap, Escape-to-close and
 * focus RETURN to whatever was focused when the modal opened. Neither the
 * Property nor the construction-cis copy has any of the three, and a dialog
 * that opens by itself and eats the keyboard is the T-H8 blocker.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntent, trackPersonalization } from "@accounting-network/web-shared/support/IntentProvider";
import { btnPrimary, focusRing } from "@/components/ui/layout-utils";
import { ruleLabel } from "@/lib/intent/labels";

const SUPPRESS_DAYS = 30;
const suppressKey = (topic: string) => `pfp_deepscroll_${topic}`;

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

// One modal per page-load session, across topics (Property's module flag).
let shownThisSession = false;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Is the kit widget's panel OPEN right now? (W7C, V2 blocker B1.)
 *
 * W7B gated on `document.querySelector('.capture-widget [role="dialog"]')` --
 * the panel's PRESENCE. The kit auto-opens that panel on a timer on every
 * desktop pageview >= 768 (packages/web-shared/support/SpecialistWidget.tsx:
 * 416-478), so the gate was true before a reader could ever reach 70% and the
 * deep-scroll offer was dead on desktop in normal use.
 *
 * The kit exposes NO explicit open-state attribute: the launcher carries no
 * `aria-expanded` (SpecialistWidget.tsx:852-857) and the panel no `data-state`
 * or `hidden` (:641-652). Its one real signal is that the panel is MOUNTED
 * only while open (`{open && (<div role="dialog" ...>)}`, :641). So this reads
 * mount-AND-paint, and prefers `aria-expanded` the moment the kit grows one --
 * the one-line kit diff is handed off in docs/pharmacies/_port/W7C_RECEIPT.md
 * section 2, and this function needs no change when it lands.
 *
 * An auto-opened panel the reader has never touched COUNTS AS OPEN, deliberately:
 * the auto-open is the kit's behaviour across the estate and this modal must
 * never land on top of a panel that is painting. What changes is that one
 * auto-open no longer kills the offer for the page load -- see the retry in the
 * open effect below.
 */
function widgetPanelOpen(): boolean {
  const launcher = document.querySelector(".capture-widget button[aria-expanded]");
  if (launcher) return launcher.getAttribute("aria-expanded") === "true";
  const panel = document.querySelector('.capture-widget [role="dialog"]');
  return !!panel && panel.getClientRects().length > 0;
}

export function DeepScrollModal() {
  const action = useIntent("deep_scroll_modal");
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  // W7C: bumped when the widget panel closes, to re-run the gate below.
  const [panelClosed, setPanelClosed] = useState(0);

  useEffect(() => {
    if (!action || open || shownThisSession) return;
    if (isSuppressed(action.topic)) return;
    // Never open over an OPEN widget panel (B2 + W7C). A one-shot `return` here
    // was the V2 blocker: the kit's desktop auto-open held the gate shut for the
    // whole page load. Instead, watch the widget mount and retry once the panel
    // closes, so the offer still fires exactly once, just later. The session
    // flag, the 30-day per-topic suppress and the one-offer rule are untouched.
    if (widgetPanelOpen()) {
      const mount = document.querySelector(".capture-widget");
      if (!mount) return;
      const obs = new MutationObserver(() => {
        if (!widgetPanelOpen()) setPanelClosed((n) => n + 1);
      });
      obs.observe(mount, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-expanded"],
      });
      return () => obs.disconnect();
    }
    // Focus RETURN target, captured BEFORE the panel renders and takes focus.
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
    shownThisSession = true;
    suppress(action.topic);
    if (!shownRef.current) {
      shownRef.current = true;
      trackPersonalization("shown", action, ruleLabel);
    }
  }, [action, open, panelClosed]);

  const close = useCallback(
    (dismiss: boolean) => {
      setOpen(false);
      if (dismiss && action) trackPersonalization("dismissed", action, ruleLabel);
      // Focus RETURN: back to whatever the reader was on when this opened.
      returnFocusRef.current?.focus?.();
    },
    [action],
  );

  // B2: flag the open surface so the sticky bar and the widget mount stand down.
  useEffect(() => {
    if (!open) return;
    document.documentElement.setAttribute("data-surface-open", "1");
    return () => document.documentElement.removeAttribute("data-surface-open");
  }, [open]);

  // Focus entry + trap + Escape. Mounted only while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    nodes()[0]?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const items = nodes();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === first || !panel.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (activeEl === last || !panel.contains(activeEl))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  if (!open || !action) return null;
  const offer = action.offer;
  // Secondary action: always a route to a specialist, unless the primary offer
  // already IS the specialist (then the secondary is the topic's calculator).
  const secondaryHref =
    offer.kind === "specialist" && action.calculatorSlug
      ? `/calculators/${action.calculatorSlug}`
      : "/contact";
  const secondaryLabel =
    offer.kind === "specialist" && action.calculatorSlug
      ? "Open the calculator instead"
      : "Speak to a pharmacy accountant";

  const primaryLabel =
    offer.kind === "tool"
      ? "Open the calculator"
      : offer.kind === "guide"
        ? "Get the free guide"
        : "Speak to a pharmacy accountant";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={() => close(true)}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="deep-scroll-title"
        className="w-full max-w-md rounded-xl border-t-4 border-primary-600 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="deep-scroll-title" className="text-lg font-bold text-slate-900">
            {offer.title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            data-cta="deep_scroll_close"
            data-cta-placement="deep_scroll_modal"
            onClick={() => close(true)}
            className={`flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 ${focusRing}`}
          >
            &times;
          </button>
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-800">
          {offer.reason}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{offer.blurb}</p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={offer.href}
            data-cta="deep_scroll_modal"
            data-cta-placement="deep_scroll_modal"
            data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
            onClick={() => {
              trackPersonalization("clicked", action, ruleLabel);
              setOpen(false);
            }}
            className={`${btnPrimary} w-full`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            data-cta="deep_scroll_secondary"
            data-cta-placement="deep_scroll_modal"
            data-cta-goal={secondaryHref.startsWith("/contact") ? "form" : undefined}
            onClick={() => {
              trackPersonalization("clicked", action, ruleLabel);
              setOpen(false);
            }}
            className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-slate-200 px-4 py-2.5 text-center font-semibold text-slate-900 transition-colors duration-150 hover:bg-slate-50 ${focusRing}`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
