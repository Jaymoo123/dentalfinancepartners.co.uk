/**
 * Resource registry for Contractor Tax Accountants (cfp) -- maps TopicKey to
 * downloadable assets (xlsx + guide) for each topic.
 *
 * Data-only, string-safe, safe for the client bundle.
 * Used by ResourceGate (xlsx / guide).
 *
 * Storage prefix: cfp (FROZEN). Every storage/session key is cfp_*.
 * Tokens: petrol-cyan (--accent #0e7490) + amber (--highlight) + neutral.
 * No var(--gold), var(--navy), var(--dark), var(--primary).
 *
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is ever
 * rendered/linked for an asset whose `enabled` is false (or whose underlying
 * file does not yet exist). Onboarding a category:
 *   1. author the xlsx builder + content/resources/<topic>.md,
 *   2. run `npm run resources:xlsx --workspace contractors-ir35/web`,
 *   3. pass the golden test,
 *   4. flip the single `enabled: true` here.
 *
 * Topics: ir35 | structure | company-tax | pay-planning | basics-expenses
 *   - 3 enabled pairs: ir35, structure, pay-planning
 *   - company-tax: no asset (CT premium tool is a single-figure calc, not a model)
 *   - basics-expenses: no asset (broad basics; free specialist review)
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a topic. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/ir35/outside-vs-inside-ir35-model.xlsx" */
  file: string;
  /** button label shown on the unlocked download */
  label: string;
  /** feature flag: never surface a disabled / missing file */
  enabled: boolean;
}

/** A gated written guide (a noindex web page) for a topic. */
export interface GuideAsset {
  /** the resources/[topic] route slug (equals the TopicKey) */
  slug: string;
  /** human label for the read button */
  label: string;
  /** feature flag */
  enabled: boolean;
}

/** Everything the system knows about one topic's downloadable resources. */
export interface CategoryResource {
  topic: TopicKey;
  /** premium tool id for this topic (R2 registry); null if no premium tool. */
  toolId: string | null;
  /** the Excel model, or null if the topic will never have one. */
  xlsx: XlsxAsset | null;
  /** the written guide, or null if the topic will never have one. */
  guide: GuideAsset | null;
  /** the lead-magnet headline (per-topic). */
  magnetTitle: string;
  /**
   * Blurb template for the gate. `{label}` is replaced with the page/topic label.
   */
  magnetBlurbTemplate: string;
}

export const RESOURCES: Record<TopicKey, CategoryResource> = {
  ir35: {
    topic: "ir35",
    toolId: "ir35-take-home-compare-premium",
    xlsx: {
      file: "/resources/ir35/outside-vs-inside-ir35-model.xlsx",
      label: "Outside vs inside IR35 model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "ir35",
      label: "Outside vs inside IR35 take-home guide",
      enabled: true,
    },
    magnetTitle: "Get the outside vs inside IR35 model",
    magnetBlurbTemplate:
      "Two-column take-home comparison on the same day rate: limited company (outside IR35) versus umbrella (inside IR35), with live 2026/27 formulas. The financial answer to whether status matters for your rate.",
  },
  structure: {
    topic: "structure",
    toolId: "umbrella-vs-limited-premium",
    xlsx: {
      file: "/resources/structure/umbrella-vs-limited-model.xlsx",
      label: "Umbrella vs limited company model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "structure",
      label: "Umbrella vs limited company guide",
      enabled: true,
    },
    magnetTitle: "Get the umbrella vs limited company model",
    magnetBlurbTemplate:
      "Side-by-side take-home on your day rate: limited company running costs and admin weighed against umbrella simplicity. Live 2026/27 formulas including the April 2026 joint-and-several-liability change.",
  },
  "company-tax": {
    topic: "company-tax",
    toolId: null,
    // No downloadable pair: CT premium tool is a single-figure calculator, not a take-home model.
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a contractor specialist",
    magnetBlurbTemplate:
      "A specialist will talk through your corporation tax, marginal relief and the most efficient extraction split. The first call is free.",
  },
  "pay-planning": {
    topic: "pay-planning",
    toolId: "salary-dividend-planner-premium",
    xlsx: {
      file: "/resources/pay-planning/salary-dividend-model.xlsx",
      label: "Salary and dividend planner (Excel)",
      enabled: true,
    },
    guide: {
      slug: "pay-planning",
      label: "Salary and dividend planning guide 2026/27",
      enabled: true,
    },
    magnetTitle: "Get the salary and dividend planner",
    magnetBlurbTemplate:
      "Personal tax breakdown on your chosen salary and dividend split, including the Employment Allowance fork and the 2026/27 dividend-rate rise. Shows the band-by-band workings.",
  },
  "basics-expenses": {
    topic: "basics-expenses",
    toolId: null,
    // No downloadable pair: broad basics topic, free specialist review is the right next step.
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a contractor specialist",
    magnetBlurbTemplate:
      "A specialist will review your contractor set-up, expenses and allowances in a free first call with no obligation.",
  },
};

/** Look up the resource entry for a topic key (or null). */
export function resourceForTopic(
  topic: TopicKey | null | undefined,
): CategoryResource | null {
  if (!topic) return null;
  return RESOURCES[topic] ?? null;
}

/** True if the topic's Excel model is authored, present and enabled. */
export function isXlsxEnabled(r: CategoryResource | null): r is CategoryResource {
  return !!r && !!r.xlsx && r.xlsx.enabled;
}

/** True if the topic's written guide is authored and enabled. */
export function isGuideEnabled(r: CategoryResource | null): r is CategoryResource {
  return !!r && !!r.guide && r.guide.enabled;
}

/**
 * True if a topic has at least one enabled+present download. The gate / island
 * wiring keys off this: when false, render exactly what the page renders today.
 */
export function hasEnabledResource(topic: TopicKey | null | undefined): boolean {
  const r = resourceForTopic(topic);
  return isXlsxEnabled(r) || isGuideEnabled(r);
}

/** Every topic key that has at least one enabled asset (for static params, etc). */
export function enabledResourceTopics(): TopicKey[] {
  return (Object.keys(RESOURCES) as TopicKey[]).filter((t) => hasEnabledResource(t));
}

/** Every topic key whose written guide is enabled (for the guide route's params). */
export function enabledGuideTopics(): TopicKey[] {
  return (Object.keys(RESOURCES) as TopicKey[]).filter((t) =>
    isGuideEnabled(resourceForTopic(t)),
  );
}

/** Every unique guide slug (deduplicates any alias entries). */
export function publishedGuideTopics(): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const t of Object.keys(RESOURCES) as TopicKey[]) {
    const r = resourceForTopic(t);
    if (isGuideEnabled(r) && r!.guide) {
      const slug = r!.guide.slug;
      if (!seen.has(slug)) {
        seen.add(slug);
        result.push(slug);
      }
    }
  }
  return result;
}
