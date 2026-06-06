/**
 * Auto-capture: turns raw DOM activity into the structured event taxonomy with
 * a small number of delegated listeners (cheap, and clean — no per-component
 * wiring). Installed once by AnalyticsProvider.
 *
 * Captures:
 *   - clicks, classified into cta_click / custom_interaction / outbound_click /
 *     contact_click / element_click (the generic click-path)
 *   - scroll-depth milestones (per page)
 *   - engagement time (only after a real human input is seen → also our
 *     human-confirmation signal)
 *   - rage clicks
 *   - JS errors (client_error)
 */
import { track, flush } from "./track";
import { LIMITS } from "./types";

// ----- helpers ---------------------------------------------------------------

function cssSelector(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls =
    typeof el.className === "string" && el.className.trim()
      ? `.${el.className.trim().split(/\s+/)[0]}`
      : "";
  return `${tag}${id}${cls}`.slice(0, 80);
}

function nearestText(el: Element): string {
  const t = (el as HTMLElement).innerText || el.textContent || "";
  return t.replace(/\s+/g, " ").trim().slice(0, 60);
}

function nearestSection(el: Element): string {
  const tagged = el.closest("[data-section]");
  if (tagged) return (tagged.getAttribute("data-section") || "").slice(0, 60);
  const section = el.closest("section, article, header, footer, main, aside");
  if (section) {
    const heading = section.querySelector("h1, h2, h3");
    if (heading) return nearestText(heading);
    if (section.id) return section.id.slice(0, 60);
    return section.tagName.toLowerCase();
  }
  return "";
}

/** Non-reversible short hash so we never store a raw tel:/mailto: value. */
function shortHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

function toUrl(href: string): URL | null {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

// ----- module state ----------------------------------------------------------

let installed = false;
let humanSeen = false;
const scrollSent = new Set<number>();
let maxScrollPct = 0;
let docHeight = 0;

// section read tracking
let sectionObserver: IntersectionObserver | null = null;
const sectionSeen = new Set<string>();
const sectionTimers = new Map<string, number>();
let rafPending = false;

// engagement accounting
let engagedMs = 0; // emitted-but-not-yet cumulative within session
let cumulativeMs = 0;
let lastActivity = 0;
let lastTick = 0;
let engagementTimer: ReturnType<typeof setInterval> | null = null;

// rage detection
let recentClicks: Array<{ x: number; y: number; t: number }> = [];

const ENGAGE_TICK_MS = 5_000;
const ENGAGE_EMIT_MS = 15_000;
const IDLE_MS = 30_000;

// ----- click handling --------------------------------------------------------

function onClick(e: MouseEvent): void {
  const target = e.target;
  if (!(target instanceof Element)) return;

  detectRage(e);

  const cta = target.closest("[data-cta]");
  if (cta) {
    track("cta_click", {
      cta_id: cta.getAttribute("data-cta") || "",
      cta_label: nearestText(cta),
      placement: cta.getAttribute("data-cta-placement") || nearestSection(cta),
    });
    return;
  }

  const custom = target.closest("[data-track]");
  if (custom) {
    track("custom_interaction", {
      track_id: custom.getAttribute("data-track") || "",
      label: nearestText(custom),
    });
    return;
  }

  const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
  if (anchor) {
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      track("contact_click", { kind: "tel", value_hash: shortHash(href) });
      return;
    }
    if (href.startsWith("mailto:")) {
      track("contact_click", { kind: "mailto", value_hash: shortHash(href) });
      return;
    }
    const url = toUrl(href);
    if (url && url.host && url.host !== window.location.host) {
      track("outbound_click", {
        href: url.href,
        target_host: url.host,
        text: nearestText(anchor),
      });
      return;
    }
    // internal link → still record the click-path
    track("element_click", {
      selector: cssSelector(anchor),
      nearest_text: nearestText(anchor),
      section: nearestSection(anchor),
      x: e.clientX,
      y: e.clientY,
    });
    return;
  }

  const interactive = target.closest(
    'button,[role="button"],input[type="submit"],input[type="button"],summary,select,label,[data-clickable]',
  );
  if (interactive) {
    track("element_click", {
      selector: cssSelector(interactive),
      nearest_text: nearestText(interactive),
      section: nearestSection(interactive),
      x: e.clientX,
      y: e.clientY,
    });
    return;
  }

  // dead_click: looks clickable (cursor:pointer within a few levels) but nothing
  // handled it (not a CTA/link/control). A UX-bug signal, not plain text noise.
  const clickable = looksClickable(target);
  if (clickable) {
    track("dead_click", {
      selector: cssSelector(clickable),
      nearest_text: nearestText(clickable),
      section: nearestSection(clickable),
      x: e.clientX,
      y: e.clientY,
    });
  }
}

function detectRage(e: MouseEvent): void {
  const now = Date.now();
  recentClicks.push({ x: e.clientX, y: e.clientY, t: now });
  recentClicks = recentClicks.filter((c) => now - c.t < 800);
  if (recentClicks.length >= 3) {
    const cluster = recentClicks.every(
      (c) =>
        Math.abs(c.x - e.clientX) < 35 && Math.abs(c.y - e.clientY) < 35,
    );
    if (cluster) {
      const target = e.target instanceof Element ? e.target : null;
      track("rage_click", {
        selector: target ? cssSelector(target) : "",
        nearest_text: target ? nearestText(target) : "",
        x: e.clientX,
        y: e.clientY,
        click_count: recentClicks.length,
      });
      recentClicks = [];
    }
  }
}

/** Walk up a few levels looking for a cursor:pointer affordance. */
function looksClickable(el: Element): Element | null {
  let node: Element | null = el;
  for (let i = 0; node && i < 3; i++) {
    try {
      if (window.getComputedStyle(node).cursor === "pointer") return node;
    } catch {
      return null;
    }
    node = node.parentElement;
  }
  return null;
}

// ----- section read tracking -------------------------------------------------

/** Emit section_view once per H2 the reader actually dwelt on (>=50% / >=2s). */
function setupSectionObserver(): void {
  if (typeof IntersectionObserver === "undefined") return;
  if (sectionObserver) sectionObserver.disconnect();
  const headings = Array.from(document.querySelectorAll("h2[id]"));
  if (headings.length === 0) {
    sectionObserver = null;
    return;
  }
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (!id || sectionSeen.has(id)) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!sectionTimers.has(id)) {
            const text = (entry.target.textContent || "").slice(0, 80);
            const timer = window.setTimeout(() => {
              sectionTimers.delete(id);
              if (sectionSeen.has(id)) return;
              sectionSeen.add(id);
              track("section_view", {
                section_id: id,
                section_text: text,
                page_path: window.location.pathname,
              });
            }, 2000);
            sectionTimers.set(id, timer);
          }
        } else {
          const t = sectionTimers.get(id);
          if (t) {
            clearTimeout(t);
            sectionTimers.delete(id);
          }
        }
      }
    },
    { threshold: [0, 0.5, 1] },
  );
  for (const h of headings) sectionObserver.observe(h);
}

// ----- scroll depth ----------------------------------------------------------

function measureScroll(): void {
  rafPending = false;
  const doc = document.documentElement;
  docHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
  const viewed = window.scrollY + window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.round((viewed / docHeight) * 100)) : 0;
  if (pct > maxScrollPct) maxScrollPct = pct;
  for (const m of LIMITS.SCROLL_MILESTONES) {
    if (pct >= m && !scrollSent.has(m)) {
      scrollSent.add(m);
      track("scroll_depth", { pct: m, page_height: docHeight });
    }
  }
}

function onScroll(): void {
  markActivity();
  if (!rafPending) {
    rafPending = true;
    window.requestAnimationFrame(measureScroll);
  }
}

// ----- engagement time -------------------------------------------------------

function markActivity(): void {
  lastActivity = Date.now();
  if (!humanSeen) {
    humanSeen = true;
    lastTick = Date.now();
    // immediate human-confirmation signal (server flips human_confirmed)
    track("engagement_time", { engaged_ms_delta: 0, cumulative_ms: 0, first_input: true });
  }
}

function engagementTick(): void {
  if (!humanSeen) return;
  const now = Date.now();
  const visible = document.visibilityState === "visible";
  const active = now - lastActivity < IDLE_MS;
  if (visible && active && lastTick) {
    engagedMs += now - lastTick;
    cumulativeMs += now - lastTick;
  }
  lastTick = now;
  if (engagedMs >= ENGAGE_EMIT_MS) {
    track("engagement_time", { engaged_ms_delta: engagedMs, cumulative_ms: cumulativeMs });
    engagedMs = 0;
  }
}

function flushEngagement(): void {
  if (engagedMs > 0) {
    track("engagement_time", { engaged_ms_delta: engagedMs, cumulative_ms: cumulativeMs });
    engagedMs = 0;
  }
  flush();
}

// ----- errors ----------------------------------------------------------------

function onError(ev: ErrorEvent): void {
  track("client_error", {
    message: String(ev.message || "").slice(0, 200),
    source: String(ev.filename || "").slice(0, 200),
    line: ev.lineno || 0,
    kind: "error",
  });
}

function onRejection(ev: PromiseRejectionEvent): void {
  const reason = ev.reason;
  const msg = reason instanceof Error ? reason.message : String(reason);
  track("client_error", { message: msg.slice(0, 200), kind: "unhandledrejection" });
}

function onVisibility(): void {
  if (document.visibilityState === "hidden") flushEngagement();
  else lastTick = Date.now();
}

// ----- public API ------------------------------------------------------------

/** Install all listeners once. Returns a destroy() and a per-navigation reset. */
export function installAutoCapture(): { destroy: () => void; resetForNavigation: () => void } {
  if (installed) {
    return { destroy: () => {}, resetForNavigation: resetForNavigation };
  }
  installed = true;
  lastActivity = Date.now();

  document.addEventListener("click", onClick, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", markActivity, { passive: true });
  window.addEventListener("keydown", markActivity, { passive: true });
  window.addEventListener("touchstart", markActivity, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", flushEngagement);
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
  engagementTimer = setInterval(engagementTick, ENGAGE_TICK_MS);

  return {
    destroy: () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", markActivity);
      window.removeEventListener("keydown", markActivity);
      window.removeEventListener("touchstart", markActivity);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flushEngagement);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      if (engagementTimer) clearInterval(engagementTimer);
      sectionObserver?.disconnect();
      sectionTimers.forEach((t) => clearTimeout(t));
      installed = false;
    },
    resetForNavigation,
  };
}

/** Reset per-page state (scroll milestones) on an SPA route change. */
export function resetForNavigation(): void {
  scrollSent.clear();
  maxScrollPct = 0;
  rafPending = false;
  // Rebuild section tracking for the new page once its content has rendered.
  sectionSeen.clear();
  sectionTimers.forEach((t) => clearTimeout(t));
  sectionTimers.clear();
  if (typeof window !== "undefined") window.setTimeout(setupSectionObserver, 400);
}

/** Live read of the current page's max scroll depth (%), for personalization. */
export function getMaxScrollPct(): number {
  return maxScrollPct;
}

/** Live read of cumulative engaged time (ms) this session, for personalization. */
export function getEngagedMs(): number {
  return cumulativeMs;
}
