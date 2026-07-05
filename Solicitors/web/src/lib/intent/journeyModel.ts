/**
 * Journey model for Accounts for Lawyers (Solicitors).
 *
 * Deterministic, client-side, instant. Reads the in-app analytics bus + route
 * changes and accumulates THIS session's trail (pages + topic, sections read,
 * scroll depth, special-page visits, calculator use, friction). From the trail
 * it derives an intent PROFILE that the proactive assistant's opener uses to
 * pick a tailored message.
 *
 * No model, no server round-trip: pure pattern-rules over signals autoCapture
 * already emits (section_view, scroll_depth, calc_*, form_error).
 *
 * Storage key: "afl_journey" (frozen Solicitors prefix "afl").
 */
import { onAnalyticsEvent } from "@accounting-network/web-shared/analytics/bus";
import { isReturning } from "@accounting-network/web-shared/analytics/visitMemory";
import type { EventName, EventProps } from "@accounting-network/web-shared/analytics/types";
import { deriveTopic } from "./deriveTopic";
import type { TopicKey } from "./taxonomy";

const STORAGE_KEY = "afl_journey";

type PageNode = {
  path: string;
  topic: TopicKey | null;
  firstTs: number;
  lastTs: number;
  maxScrollPct: number;
  sections: number;
  computed: boolean;
};

type Trail = {
  pages: PageNode[];
  usedCalculator: boolean;
  visitedAbout: boolean;
  visitedServices: boolean;
  visitedContact: boolean;
  friction: boolean;
};

export type JourneyStage = "researching" | "comparing" | "evaluating-us" | "ready";

export type JourneyProfile = {
  primaryTopic: TopicKey | null;
  secondaryTopic: TopicKey | null;
  stage: JourneyStage;
  /** rough 0..1 engagement depth, for tie-breaks + escalation. */
  depth: number;
  /** combination flags: multi-topic, visited-about, used-calculator, returning, deep-read, friction, ... */
  signals: string[];
  pageCount: number;
};

let trail: Trail | null = null;
let installed = false;

function emptyTrail(): Trail {
  return {
    pages: [],
    usedCalculator: false,
    visitedAbout: false,
    visitedServices: false,
    visitedContact: false,
    friction: false,
  };
}

function load(): Trail {
  if (trail) return trail;
  if (typeof window === "undefined") return emptyTrail();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      trail = JSON.parse(raw) as Trail;
      return trail;
    }
  } catch {
    /* storage blocked / bad JSON */
  }
  trail = emptyTrail();
  return trail;
}

function save(): void {
  if (typeof window === "undefined" || !trail) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trail));
  } catch {
    /* ignore */
  }
}

function cleanPath(p: string): string {
  return (p || "").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
}

function currentPath(): string {
  return typeof window !== "undefined" ? cleanPath(window.location.pathname) : "/";
}

function nodeFor(t: Trail, path: string): PageNode {
  let n = t.pages.find((p) => p.path === path);
  if (!n) {
    n = {
      path,
      topic: deriveTopic(path),
      firstTs: Date.now(),
      lastTs: Date.now(),
      maxScrollPct: 0,
      sections: 0,
      computed: false,
    };
    t.pages.push(n);
  }
  return n;
}

/** Upsert the current page node + special-page flags. Call on each route change. */
export function recordPath(pathname: string): void {
  const t = load();
  const path = cleanPath(pathname || currentPath());
  const n = nodeFor(t, path);
  n.lastTs = Date.now();
  if (path.startsWith("/about")) t.visitedAbout = true;
  else if (path.startsWith("/services")) t.visitedServices = true;
  else if (path.startsWith("/contact")) t.visitedContact = true;
  save();
}

function onEvent(name: EventName, props: EventProps): void {
  const t = load();
  const rawPath = typeof props.page_path === "string" && props.page_path ? props.page_path : currentPath();
  const n = nodeFor(t, cleanPath(rawPath));
  n.lastTs = Date.now();
  switch (name) {
    case "section_view":
      n.sections += 1;
      break;
    case "scroll_depth": {
      const pct = typeof props.pct === "number" ? props.pct : 0;
      if (pct > n.maxScrollPct) n.maxScrollPct = pct;
      break;
    }
    case "calc_computed":
      n.computed = true;
      t.usedCalculator = true;
      break;
    case "form_error":
      t.friction = true;
      break;
    default:
      break;
  }
  save();
}

/** Install the bus subscription once + record the entry page. Idempotent. */
export function initJourneyModel(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;
  load();
  recordPath(currentPath());
  onAnalyticsEvent(onEvent);
}

/** Derive the current intent profile from the accumulated trail. */
export function getJourneyProfile(): JourneyProfile {
  const t = load();

  const weights = new Map<TopicKey, number>();
  for (const p of t.pages) {
    if (!p.topic) continue;
    // sections read dominate, then scroll depth, then a big bump for computing a calc,
    // plus a base point for having visited the topic at all.
    const w = p.sections * 2 + p.maxScrollPct / 25 + (p.computed ? 4 : 0) + 1;
    weights.set(p.topic, (weights.get(p.topic) ?? 0) + w);
  }
  const ranked = [...weights.entries()].sort((a, b) => b[1] - a[1]);
  const primaryTopic = ranked[0]?.[0] ?? null;
  const secondaryTopic = ranked[1]?.[0] ?? null;
  const distinctTopics = ranked.length;
  const pageCount = t.pages.length;

  let returning = false;
  try {
    returning = isReturning();
  } catch {
    /* ignore */
  }

  const signals: string[] = [];
  if (distinctTopics >= 2) signals.push("multi-topic");
  if (t.visitedAbout) signals.push("visited-about");
  if (t.visitedServices) signals.push("visited-services");
  if (t.visitedContact) signals.push("visited-contact");
  if (t.usedCalculator) signals.push("used-calculator");
  if (returning) signals.push("returning");
  if (t.friction) signals.push("friction");
  const deepRead = t.pages.some((p) => p.maxScrollPct >= 70 || p.sections >= 4);
  if (deepRead) signals.push("deep-read");

  // Stage = most-advanced point reached.
  let stage: JourneyStage = "researching";
  if (distinctTopics >= 2 || pageCount >= 3) stage = "comparing";
  if (t.visitedAbout || t.visitedServices) stage = "evaluating-us";
  if (t.usedCalculator || t.visitedContact || returning) stage = "ready";

  const totalSections = t.pages.reduce((s, p) => s + p.sections, 0);
  const maxScroll = t.pages.reduce((m, p) => Math.max(m, p.maxScrollPct), 0);
  const depth = Math.min(
    1,
    (totalSections / 8) * 0.4 + (maxScroll / 100) * 0.3 + (Math.min(pageCount, 4) / 4) * 0.2 + (t.usedCalculator ? 0.1 : 0),
  );

  return { primaryTopic, secondaryTopic, stage, depth, signals, pageCount };
}

/** Stable key for "has the profile meaningfully advanced?" comparisons. */
export function profileKey(p: JourneyProfile): string {
  return [p.primaryTopic ?? "-", p.secondaryTopic ?? "-", p.stage, [...p.signals].sort().join("+")].join("|");
}

/** Test-only reset. */
export function _resetJourneyModel(): void {
  trail = null;
  installed = false;
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}
