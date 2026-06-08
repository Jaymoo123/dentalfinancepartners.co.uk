/**
 * Humanise raw web_events into plain-English lines for the admin visitor view.
 *
 * Pure + isomorphic (imports only the string-only intent labels), so it is safe
 * to use from both the server component (data prep) and a client tab switcher.
 * No PII flows through here — only behavioural props.
 *
 * Two consumers:
 *  - the ACTIVITY tab renders `humanise(e)` per event (granular), collapsing
 *    only consecutive engagement pings;
 *  - the STORY tab uses `buildStory()` to turn each session's events into a
 *    readable, milestone-only narrative.
 */
import type { VisitorEvent } from "@/lib/analytics/server/adminData";
import { ruleLabel } from "@/lib/intent/labels";

function str(v: unknown): string {
  return v == null ? "" : String(v);
}

function quote(v: unknown): string {
  const s = str(v).trim();
  return s ? `"${s}"` : "";
}

/** Round a millisecond duration into a friendly "~Ns" / "~N min" string. */
export function readingTime(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `~${Math.max(1, s)}s`;
  const m = Math.round(s / 60);
  return `~${m} min`;
}

export function clockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/**
 * One readable line for a single event. Falls back to a tidied event name so a
 * brand-new event type never renders as a raw key with no context.
 */
export function humanise(e: VisitorEvent): string {
  const p = e.props || {};
  switch (e.event_name) {
    case "page_view":
      return `Opened ${quote(str(p.page_title) || str(e.page_path) || "a page")}`;
    case "section_view":
      return `Read the ${quote(p.section_text) || "a"} section`;
    case "scroll_depth":
      return `Scrolled to ${str(p.pct)}%`;
    case "engagement_time":
      return "Engaged";
    case "cta_click":
      return `Clicked ${quote(str(p.cta_label) || str(p.cta_id)) || "a CTA"}${
        p.goal === "form" ? " (heads to the lead form)" : ""
      }`;
    case "element_click": {
      const text = str(p.nearest_text).trim();
      if (text) return `Clicked ${quote(text)}`;
      return `Clicked an element (${str(p.selector) || "?"})`;
    }
    case "custom_interaction":
      return `Interacted with ${quote(p.track_id) || "an element"}`;
    case "contact_click":
      return `Clicked a ${str(p.kind) || "contact"} link`;
    case "outbound_click":
      return `Left to ${str(p.target_host) || "another site"}`;
    case "calc_view":
      return `Opened the ${str(p.calculator_slug) || "calculator"}`;
    case "calc_input_change":
      return `Edited the ${str(p.calculator_slug) || "calculator"}${p.field_id ? ` (${str(p.field_id)})` : ""}`;
    case "calc_computed":
      return `Computed the ${str(p.calculator_slug) || "calculator"}`;
    case "calc_result_viewed":
      return `Saw results for the ${str(p.calculator_slug) || "calculator"}`;
    case "calc_copy":
      return `Copied a result from the ${str(p.calculator_slug) || "calculator"}`;
    case "calc_share":
      return `Shared the ${str(p.calculator_slug) || "calculator"}`;
    case "embed_cta_click":
      return `Clicked the embed CTA on the ${str(p.calculator_slug) || "calculator"}`;
    case "form_start":
      return `Started the ${str(p.form_id) || "form"}`;
    case "form_field_focus":
      return `Filled in ${quote(str(p.field) || str(p.field_id)) || "a field"}`;
    case "form_field_abandon":
      return `Left ${quote(str(p.field) || str(p.field_id)) || "a field"} unfinished`;
    case "form_submit":
      return `Submitted the ${str(p.form_id) || "form"}`;
    case "form_error":
      return `Hit a form error${p.field ? ` on ${str(p.field)}` : ""}${p.error_kind ? ` (${str(p.error_kind)})` : ""}`;
    case "lead_submitted":
      return `✅ Converted — submitted ${str(p.form_id) || "the form"}`;
    case "exit_intent_shown":
      return "Was shown an exit-intent offer";
    case "gate_view":
      return `Saw the ${str(p.topic) || "download"} gate`;
    case "resource_unlocked":
      return `🔓 Unlocked the ${str(p.topic) || "download"} (gave their email)`;
    case "support_opened":
      return "Opened the specialist question widget";
    case "personalization_shown":
      return `Shown a ${str(p.label) || ruleLabel(str(p.rule_id))}${p.content ? `: ${quote(p.content)}` : ""}`;
    case "personalization_clicked":
      return `Clicked the ${str(p.label) || ruleLabel(str(p.rule_id))} prompt`;
    case "personalization_dismissed":
      return `Dismissed the ${str(p.label) || ruleLabel(str(p.rule_id))} prompt`;
    case "rage_click":
      return `😠 Rage-clicked ${quote(str(p.nearest_text) || str(p.selector)) || "an element"}`;
    case "dead_click":
      return `Clicked ${quote(str(p.nearest_text) || str(p.selector)) || "something"} that did nothing`;
    case "client_error":
      return `Hit a page error${p.message ? `: ${str(p.message)}` : ""}`;
    default:
      return prettifyEventName(e.event_name);
  }
}

function prettifyEventName(name: string): string {
  const spaced = name.replace(/_/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** True for an engagement ping (collapsed in both tabs). */
function isEngagement(e: VisitorEvent): boolean {
  return e.event_name === "engagement_time";
}

function engagedMs(e: VisitorEvent): number {
  return Number(e.props?.engaged_ms_delta ?? 0) || 0;
}

function cumulativeMs(e: VisitorEvent): number {
  return Number(e.props?.cumulative_ms ?? 0) || 0;
}

/**
 * ACTIVITY tab rows: granular humanised log, but consecutive engagement pings
 * are merged into one "Engaged ~Nm" row so the log is not 100 identical lines.
 */
export type ActivityRow = { ts: string; text: string; kind: "engaged" | "event" };

export function buildActivityRows(events: VisitorEvent[]): ActivityRow[] {
  const rows: ActivityRow[] = [];
  let i = 0;
  while (i < events.length) {
    const e = events[i];
    if (isEngagement(e)) {
      // Merge the run of consecutive engagement pings.
      let ms = 0;
      let count = 0;
      const startTs = e.ts;
      while (i < events.length && isEngagement(events[i])) {
        const delta = engagedMs(events[i]);
        ms += delta > 0 ? delta : 15000; // pings are ~15s when delta is absent
        count++;
        i++;
      }
      rows.push({
        ts: startTs,
        text: `Engaged ${readingTime(ms)}${count > 1 ? ` (${count} pings)` : ""}`,
        kind: "engaged",
      });
      continue;
    }
    rows.push({ ts: e.ts, text: humanise(e), kind: "event" });
    i++;
  }
  return rows;
}

/**
 * A single line of the STORY narrative.
 *  - "open"   : the session arrival line.
 *  - "reading": a collapsed reading block ("Read for ~4 min").
 *  - "step"   : a meaningful milestone (section, click, calc, personalisation…).
 *  - "convert": the conversion line (highlighted).
 *  - "close"  : the session summary footer.
 */
export type StoryLine = {
  kind: "open" | "reading" | "step" | "convert" | "close";
  ts: string;
  text: string;
};

export type StorySession = {
  sessionId: string;
  startTs: string;
  lines: StoryLine[];
};

const NEAR_MS = 2500; // "same ~timestamp" window for dedupe

/** Is this a personalization close/dismiss element/cta click we should suppress? */
function isCloseNoise(e: VisitorEvent): boolean {
  const p = e.props || {};
  if (e.event_name === "cta_click") {
    const id = str(p.cta_id);
    if (id.endsWith("_close") || id.endsWith("-close") || /dismiss/i.test(id)) return true;
  }
  if (e.event_name === "element_click") {
    const txt = `${str(p.nearest_text)} ${str(p.selector)}`.toLowerCase();
    if (/close|dismiss|✕|×/.test(txt)) return true;
  }
  return false;
}

/**
 * Build the per-session STORY. Collapses engagement runs into reading blocks,
 * merges personalization shown→dismissed/clicked into a single line, and
 * suppresses the redundant close-button click that coincides with a dismiss.
 */
export function buildStory(events: VisitorEvent[]): StorySession[] {
  // Group by session, preserving chronological order of first appearance.
  const order: string[] = [];
  const bySession = new Map<string, VisitorEvent[]>();
  for (const e of events) {
    let g = bySession.get(e.session_id);
    if (!g) {
      g = [];
      bySession.set(e.session_id, g);
      order.push(e.session_id);
    }
    g.push(e);
  }

  return order.map((sessionId) => {
    const evts = bySession.get(sessionId)!;
    const lines: StoryLine[] = [];

    // Session-level rollups for the closing line.
    let maxScroll = 0;
    let totalEngagedMs = 0;
    for (const e of evts) {
      if (e.event_name === "scroll_depth") maxScroll = Math.max(maxScroll, Number(e.props?.pct ?? 0) || 0);
      if (isEngagement(e)) {
        const c = cumulativeMs(e);
        if (c > totalEngagedMs) totalEngagedMs = c;
      }
    }
    if (totalEngagedMs === 0) {
      for (const e of evts) if (isEngagement(e)) totalEngagedMs += engagedMs(e) || 15000;
    }

    // Opening line: first page_view (or first event) of the session, with where
    // they came from (utm source wins; else referrer host; else "direct").
    const firstView = evts.find((e) => e.event_name === "page_view") || evts[0];
    const firstName = str(firstView.props?.page_title) || str(firstView.page_path) || "the site";
    const src = str(firstView.props?.utm_source) || str(firstView.props?.referrer_host);
    const from = src ? ` from ${src}` : "";
    lines.push({
      kind: "open",
      ts: firstView.ts,
      text: `Arrived on ${quote(firstName)}${from} at ${clockTime(firstView.ts)}`,
    });

    // Walk events, collapsing engagement runs + personalisation pairs + close noise.
    let i = 0;
    let openedFirst = false;
    while (i < evts.length) {
      const e = evts[i];

      // Skip the opening page_view we already used (only the first one).
      if (!openedFirst && e === firstView && e.event_name === "page_view") {
        openedFirst = true;
        i++;
        continue;
      }

      if (isEngagement(e)) {
        let ms = 0;
        const startTs = e.ts;
        while (i < evts.length && isEngagement(evts[i])) {
          ms += engagedMs(evts[i]) || 15000;
          i++;
        }
        lines.push({ kind: "reading", ts: startTs, text: `Read for ${readingTime(ms)}` });
        continue;
      }

      // Personalisation shown → look ahead for an immediate dismiss/click to merge.
      if (e.event_name === "personalization_shown") {
        const label = str(e.props?.label) || ruleLabel(str(e.props?.rule_id));
        const content = str(e.props?.content);
        let outcome = "";
        let consumedTo = i;
        const shownTime = new Date(e.ts).getTime();
        for (let j = i + 1; j < evts.length && j <= i + 4; j++) {
          const nx = evts[j];
          if (nx.event_name === "personalization_dismissed") {
            outcome = " — dismissed";
            consumedTo = j;
            break;
          }
          if (nx.event_name === "personalization_clicked") {
            outcome = " — clicked through";
            consumedTo = j;
            break;
          }
          // Tolerate engagement pings between shown and its outcome.
          if (!isEngagement(nx) && new Date(nx.ts).getTime() - shownTime > NEAR_MS) break;
        }
        lines.push({
          kind: "step",
          ts: e.ts,
          text: `Shown a ${label}${content ? `: ${quote(content)}` : ""}${outcome}`,
        });
        i = consumedTo + 1;
        continue;
      }

      // Suppress a close-button click that coincides with a personalization_dismissed.
      if (isCloseNoise(e)) {
        const t = new Date(e.ts).getTime();
        const nearDismiss = evts.some(
          (o) =>
            o.event_name === "personalization_dismissed" &&
            Math.abs(new Date(o.ts).getTime() - t) <= NEAR_MS,
        );
        if (nearDismiss) {
          i++;
          continue;
        }
      }

      // A standalone dismiss/click (no preceding shown captured) still reads fine.
      // Conversion gets its own highlighted line.
      if (e.event_name === "lead_submitted") {
        lines.push({ kind: "convert", ts: e.ts, text: humanise(e) });
        i++;
        continue;
      }

      // Drop bare scroll pings except notable depth (keep the story uncluttered):
      // only surface 50/75/100% milestones; the session close shows max anyway.
      if (e.event_name === "scroll_depth") {
        const pct = Number(e.props?.pct ?? 0) || 0;
        if (pct < 50) {
          i++;
          continue;
        }
      }

      lines.push({ kind: "step", ts: e.ts, text: humanise(e) });
      i++;
    }

    // Closing summary.
    const closeBits: string[] = [];
    if (totalEngagedMs > 0) closeBits.push(`${readingTime(totalEngagedMs)} on the page`);
    if (maxScroll > 0) closeBits.push(`reached ${maxScroll}% scroll`);
    if (closeBits.length) {
      lines.push({
        kind: "close",
        ts: evts[evts.length - 1].ts,
        text: `Session total: ${closeBits.join(", ")}`,
      });
    }

    return { sessionId, startTs: evts[0].ts, lines };
  });
}
