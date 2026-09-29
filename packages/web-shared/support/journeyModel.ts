/**
 * Journey model: deterministic, client-side, instant.
 *
 * Reads the in-app analytics bus plus route changes and accumulates THIS
 * session's trail (pages plus topic, sections read, scroll depth, special-page
 * visits, calculator use, friction). From the trail it derives an intent
 * PROFILE that the help widget's opener uses to pick a tailored message.
 *
 * No model, no server round-trip, pure pattern-rules over signals autoCapture
 * already emits (section_view, scroll_depth, calc_computed, form_error).
 *
 * One instance per site, created in the site's widget config:
 * `createJourneyModel({ storageKey: "<prefix>_journey", deriveTopic })`.
 */
import { onAnalyticsEvent } from "../analytics/bus";
import { isReturning } from "../analytics/visitMemory";
import type { EventName, EventProps } from "../analytics/types";
import type {
  JourneyModel,
  JourneyModelOptions,
  JourneyProfile,
  JourneyStage,
} from "./types";

type PageNode = {
  path: string;
  topic: string | null;
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

const DEFAULT_SPECIAL_PATHS = {
  about: "/about",
  services: "/services",
  contact: "/contact",
};

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

function cleanPath(p: string): string {
  return (p || "").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
}

function currentPath(): string {
  return typeof window !== "undefined" ? cleanPath(window.location.pathname) : "/";
}

/** Stable key for "has the profile meaningfully advanced?" comparisons. */
export function profileKey(p: JourneyProfile): string {
  return [
    p.primaryTopic ?? "-",
    p.secondaryTopic ?? "-",
    p.stage,
    [...p.signals].sort().join("+"),
  ].join("|");
}

export function createJourneyModel(options: JourneyModelOptions): JourneyModel {
  const { storageKey, deriveTopic } = options;
  const special = options.specialPathPrefixes ?? DEFAULT_SPECIAL_PATHS;

  let trail: Trail | null = null;
  let installed = false;

  function load(): Trail {
    if (trail) return trail;
    if (typeof window === "undefined") return emptyTrail();
    try {
      const raw = window.sessionStorage.getItem(storageKey);
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
      window.sessionStorage.setItem(storageKey, JSON.stringify(trail));
    } catch {
      /* ignore */
    }
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

  function recordPath(pathname: string): void {
    const t = load();
    const path = cleanPath(pathname || currentPath());
    const n = nodeFor(t, path);
    n.lastTs = Date.now();
    if (path.startsWith(special.about)) t.visitedAbout = true;
    else if (path.startsWith(special.services)) t.visitedServices = true;
    else if (path.startsWith(special.contact)) t.visitedContact = true;
    save();
  }

  function onEvent(name: EventName, props: EventProps): void {
    const t = load();
    const rawPath =
      typeof props.page_path === "string" && props.page_path ? props.page_path : currentPath();
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

  function init(): void {
    if (installed || typeof window === "undefined") return;
    installed = true;
    load();
    recordPath(currentPath());
    onAnalyticsEvent(onEvent);
  }

  function getProfile(): JourneyProfile {
    const t = load();

    const weights = new Map<string, number>();
    for (const p of t.pages) {
      if (!p.topic) continue;
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

    // Stage ladder (unchanged across the estate):
    // researching -> comparing (>=2 topics or >=3 pages) ->
    // evaluating-us (visited /about or /services) ->
    // ready (used a calc, visited /contact, or returning)
    let stage: JourneyStage = "researching";
    if (distinctTopics >= 2 || pageCount >= 3) stage = "comparing";
    if (t.visitedAbout || t.visitedServices) stage = "evaluating-us";
    if (t.usedCalculator || t.visitedContact || returning) stage = "ready";

    const totalSections = t.pages.reduce((s, p) => s + p.sections, 0);
    const maxScroll = t.pages.reduce((m, p) => Math.max(m, p.maxScrollPct), 0);
    const depth = Math.min(
      1,
      (totalSections / 8) * 0.4 +
        (maxScroll / 100) * 0.3 +
        (Math.min(pageCount, 4) / 4) * 0.2 +
        (t.usedCalculator ? 0.1 : 0),
    );

    return { primaryTopic, secondaryTopic, stage, depth, signals, pageCount };
  }

  function _reset(): void {
    trail = null;
    installed = false;
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }
  }

  return { init, recordPath, getProfile, _reset };
}
