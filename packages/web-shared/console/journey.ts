/**
 * Humanise raw web_events into plain-English lines for the admin visitor view.
 *
 * Pure + isomorphic. No PII flows through here — only behavioural props.
 * This is the site-agnostic version: personalisation rule labels fall back to
 * the raw rule_id rather than importing from a site-specific intent/labels
 * module (which carries Property-specific rules). Sites that do run
 * personalisation can pass a custom ruleLabel via the optional parameter.
 *
 * Two consumers:
 *  - the ACTIVITY tab renders buildActivityRows() (granular, engagement merged)
 *  - the STORY tab uses buildStory() (milestone-only narrative)
 *
 * GAP-3: lifted from Property/web/src/lib/analytics/journey.ts and de-coupled
 * from Property-specific imports. Property keeps its own copy until adoption.
 */
import type { VisitorEvent } from "./adminData";

type RuleLabelFn = (ruleId: string) => string;

function defaultRuleLabel(id: string): string {
  return id ? id.replace(/_/g, " ").trim() : "an offer";
}

function str(v: unknown): string {
  return v == null ? "" : String(v);
}

function quote(v: unknown): string {
  const s = str(v).trim();
  return s ? `"${s}"` : "";
}

export function readingTime(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `~${Math.max(1, s)}s`;
  const m = Math.round(s / 60);
  return `~${m} min`;
}

export function clockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

// ── Core Web Vitals ────────────────────────────────────────────────────────

const VITAL_META: Record<string, { label: string }> = {
  LCP: { label: "Main content load (LCP)" },
  INP: { label: "Responsiveness (INP)" },
  CLS: { label: "Visual stability (CLS)" },
  FCP: { label: "First paint (FCP)" },
  TTFB: { label: "Server response (TTFB)" },
};

const RATING_ORDER: Record<string, number> = { good: 0, "needs-improvement": 1, poor: 2 };

export function formatVital(metric: string, value: number): string {
  if (metric === "CLS") return (value / 1000).toFixed(2);
  if (value >= 1000) return `${(value / 1000).toFixed(1)}s`;
  return `${Math.round(value)}ms`;
}

export type VitalRow = { metric: string; label: string; display: string; rating: string };
export type VitalsSummary = {
  verdict: "Fast" | "OK" | "Slow" | null;
  rows: VitalRow[];
  pageLoads: number;
};

export function summariseVitals(events: VisitorEvent[]): VitalsSummary {
  const worst = new Map<string, { value: number; rating: string }>();
  const pages = new Set<string>();
  for (const e of events) {
    if (e.event_name !== "web_vital") continue;
    const metric = str(e.props?.metric);
    if (!metric) continue;
    if (e.page_path) pages.add(e.page_path);
    const value = Number(e.props?.value ?? 0) || 0;
    const rating = str(e.props?.rating) || "good";
    const cur = worst.get(metric);
    const rank = RATING_ORDER[rating] ?? 0;
    const curRank = cur ? RATING_ORDER[cur.rating] ?? 0 : -1;
    if (!cur || rank > curRank || (rank === curRank && value > cur.value)) {
      worst.set(metric, { value, rating });
    }
  }
  if (worst.size === 0) return { verdict: null, rows: [], pageLoads: 0 };

  let worstRank = 0;
  const rows: VitalRow[] = [];
  for (const metric of ["LCP", "INP", "CLS", "FCP", "TTFB"]) {
    const s = worst.get(metric);
    if (!s) continue;
    worstRank = Math.max(worstRank, RATING_ORDER[s.rating] ?? 0);
    rows.push({
      metric,
      label: VITAL_META[metric]?.label || metric,
      display: formatVital(metric, s.value),
      rating: s.rating,
    });
  }
  const verdict = worstRank === 0 ? "Fast" : worstRank === 1 ? "OK" : "Slow";
  return { verdict, rows, pageLoads: Math.max(1, pages.size) };
}

// ── Humanise ───────────────────────────────────────────────────────────────

export function humanise(e: VisitorEvent, ruleLabel: RuleLabelFn = defaultRuleLabel): string {
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
      return `Converted (submitted ${str(p.form_id) || "the form"})`;
    case "exit_intent_shown":
      return "Was shown an exit-intent offer";
    case "gate_view":
      return `Saw the ${str(p.topic) || "download"} gate`;
    case "resource_unlocked":
      return `Unlocked the ${str(p.topic) || "download"} (gave their email)`;
    case "support_opened":
      return "Opened the specialist question widget";
    case "personalization_shown":
      return `Shown a ${str(p.label) || ruleLabel(str(p.rule_id))}${p.content ? `: ${quote(p.content)}` : ""}`;
    case "personalization_clicked":
      return `Clicked the ${str(p.label) || ruleLabel(str(p.rule_id))} prompt`;
    case "personalization_dismissed":
      return `Dismissed the ${str(p.label) || ruleLabel(str(p.rule_id))} prompt`;
    case "rage_click":
      return `Rage-clicked ${quote(str(p.nearest_text) || str(p.selector)) || "an element"}`;
    case "dead_click":
      return `Clicked ${quote(str(p.nearest_text) || str(p.selector)) || "something"} that did nothing`;
    case "client_error":
      return `Hit a page error${p.message ? `: ${str(p.message)}` : ""}`;
    case "subscribe_view":
      return "Saw the newsletter sign-up";
    case "subscribe_submitted":
      return "Subscribed to the newsletter (opted in)";
    case "web_vital":
      return `Performance: ${str(p.metric)} ${formatVital(str(p.metric), Number(p.value ?? 0) || 0)} (${str(p.rating) || "good"})`;
    default:
      return prettifyEventName(e.event_name);
  }
}

function prettifyEventName(name: string): string {
  const spaced = name.replace(/_/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isEngagement(e: VisitorEvent): boolean {
  return e.event_name === "engagement_time";
}

function engagedMs(e: VisitorEvent): number {
  return Number(e.props?.engaged_ms_delta ?? 0) || 0;
}

function cumulativeMs(e: VisitorEvent): number {
  return Number(e.props?.cumulative_ms ?? 0) || 0;
}

// ── Activity rows ──────────────────────────────────────────────────────────

export type ActivityRow = { ts: string; text: string; kind: "engaged" | "event" };

export function buildActivityRows(events: VisitorEvent[], ruleLabel?: RuleLabelFn): ActivityRow[] {
  const rows: ActivityRow[] = [];
  let i = 0;
  while (i < events.length) {
    const e = events[i];
    if (e.event_name === "web_vital") { i++; continue; }
    if (isEngagement(e)) {
      let ms = 0;
      let count = 0;
      const startTs = e.ts;
      while (i < events.length && isEngagement(events[i])) {
        const delta = engagedMs(events[i]);
        ms += delta > 0 ? delta : 15000;
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
    rows.push({ ts: e.ts, text: humanise(e, ruleLabel), kind: "event" });
    i++;
  }
  return rows;
}

// ── Story ──────────────────────────────────────────────────────────────────

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

const NEAR_MS = 2500;

function isCloseNoise(e: VisitorEvent): boolean {
  const p = e.props || {};
  if (e.event_name === "cta_click") {
    const id = str(p.cta_id);
    if (id.endsWith("_close") || id.endsWith("-close") || /dismiss/i.test(id)) return true;
  }
  if (e.event_name === "element_click") {
    const txt = `${str(p.nearest_text)} ${str(p.selector)}`.toLowerCase();
    if (/close|dismiss/.test(txt)) return true;
  }
  return false;
}

export function buildStory(events: VisitorEvent[], ruleLabel: RuleLabelFn = defaultRuleLabel): StorySession[] {
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

    const firstView = evts.find((e) => e.event_name === "page_view") || evts[0];
    const firstName = str(firstView.props?.page_title) || str(firstView.page_path) || "the site";
    const src = str(firstView.props?.utm_source) || str(firstView.props?.referrer_host);
    const from = src ? ` from ${src}` : "";
    lines.push({
      kind: "open",
      ts: firstView.ts,
      text: `Arrived on ${quote(firstName)}${from} at ${clockTime(firstView.ts)}`,
    });

    let i = 0;
    let openedFirst = false;
    while (i < evts.length) {
      const e = evts[i];
      if (e.event_name === "web_vital") { i++; continue; }

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

      if (e.event_name === "personalization_shown") {
        const label = str(e.props?.label) || ruleLabel(str(e.props?.rule_id));
        const content = str(e.props?.content);
        let outcome = "";
        let consumedTo = i;
        const shownTime = new Date(e.ts).getTime();
        for (let j = i + 1; j < evts.length && j <= i + 4; j++) {
          const nx = evts[j];
          if (nx.event_name === "personalization_dismissed") { outcome = " - dismissed"; consumedTo = j; break; }
          if (nx.event_name === "personalization_clicked") { outcome = " - clicked through"; consumedTo = j; break; }
          if (!isEngagement(nx) && new Date(nx.ts).getTime() - shownTime > NEAR_MS) break;
        }
        lines.push({ kind: "step", ts: e.ts, text: `Shown a ${label}${content ? `: ${quote(content)}` : ""}${outcome}` });
        i = consumedTo + 1;
        continue;
      }

      if (isCloseNoise(e)) {
        const t = new Date(e.ts).getTime();
        const nearDismiss = evts.some(
          (o) => o.event_name === "personalization_dismissed" && Math.abs(new Date(o.ts).getTime() - t) <= NEAR_MS,
        );
        if (nearDismiss) { i++; continue; }
      }

      if (e.event_name === "lead_submitted") {
        lines.push({ kind: "convert", ts: e.ts, text: humanise(e, ruleLabel) });
        i++;
        continue;
      }

      if (e.event_name === "scroll_depth") {
        const pct = Number(e.props?.pct ?? 0) || 0;
        if (pct < 50) { i++; continue; }
      }

      lines.push({ kind: "step", ts: e.ts, text: humanise(e, ruleLabel) });
      i++;
    }

    const closeBits: string[] = [];
    if (totalEngagedMs > 0) closeBits.push(`${readingTime(totalEngagedMs)} on the page`);
    if (maxScroll > 0) closeBits.push(`reached ${maxScroll}% scroll`);
    if (closeBits.length) {
      lines.push({ kind: "close", ts: evts[evts.length - 1].ts, text: `Session total: ${closeBits.join(", ")}` });
    }

    return { sessionId, startTs: evts[0].ts, lines };
  });
}
