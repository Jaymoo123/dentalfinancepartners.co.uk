/**
 * Resource registry for Probate Compass (wills-probate).
 *
 * Maps TopicKey to downloadable assets (xlsx + guide) for each topic.
 * Data-only, string-safe, safe for the client bundle.
 * Used by ResourceGate (xlsx / guide).
 *
 * Storage prefix: wpc (FROZEN). Tokens: --accent / --dark.
 *
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is ever
 * rendered/linked for an asset whose `enabled` is false (or whose underlying
 * file does not yet exist). PLACEHOLDER: no assets are authored yet, so every
 * topic below is a no-asset, specialist-contact-only entry. Onboarding a
 * category (Phase 2):
 *   1. author the xlsx builder + content/resources/<topic>.md,
 *   2. run `npm run resources:xlsx`,
 *   3. pass the golden test,
 *   4. flip the single `enabled: true` here.
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a topic. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/probate-cost/probate-cost-model.xlsx" */
  file: string;
  /** button label shown on the unlocked download */
  label: string;
  /** feature flag: never surface a disabled / missing file */
  enabled: boolean;
}

/** A gated written guide (a noindex web page) for a topic. */
export interface GuideAsset {
  /** the resources/[topic] route slug (equals the guide's TopicKey) */
  slug: string;
  /** human label for the read button */
  label: string;
  /** feature flag */
  enabled: boolean;
}

/** Everything the system knows about one topic's downloadable resources. */
export interface CategoryResource {
  topic: TopicKey;
  /** premium tool id for this topic (registry); null if no premium tool. */
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

function noAssetTopic(topic: TopicKey, magnetTitle: string, magnetBlurbTemplate: string): CategoryResource {
  return { topic, toolId: null, xlsx: null, guide: null, magnetTitle, magnetBlurbTemplate };
}

export const RESOURCES: Record<TopicKey, CategoryResource> = {
  "probate-cost": noAssetTopic(
    "probate-cost",
    "Speak to a probate specialist",
    "A specialist will talk through what probate is likely to cost for this estate and the quickest way through. The first call is free.",
  ),
  "do-i-need-probate": noAssetTopic(
    "do-i-need-probate",
    "Speak to a probate specialist",
    "A specialist will confirm whether probate is actually needed and what to do next. The first call is free.",
  ),
  "inheritance-tax": noAssetTopic(
    "inheritance-tax",
    "Speak to a specialist",
    "A specialist will confirm the inheritance tax position on this estate and any reliefs available. The first call is free.",
  ),
  "probate-timeline": noAssetTopic(
    "probate-timeline",
    "Speak to a probate specialist",
    "A specialist will give you a realistic timeline for this estate. The first call is free.",
  ),
  "pensions-iht-2027": noAssetTopic(
    "pensions-iht-2027",
    "Speak to a specialist",
    "A specialist will explain how the April 2027 pension changes affect this estate's inheritance tax position. The first call is free.",
  ),
  "diy-vs-solicitor": noAssetTopic(
    "diy-vs-solicitor",
    "Speak to a specialist",
    "A specialist will help you weigh up DIY probate against instructing a solicitor for this estate. The first call is free.",
  ),
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

/** The topic key that owns a given guide slug (or null). */
export function topicForGuideSlug(slug: string): TopicKey | null {
  for (const t of Object.keys(RESOURCES) as TopicKey[]) {
    const r = RESOURCES[t];
    if (isGuideEnabled(r) && r.guide?.slug === slug) return t;
  }
  return null;
}

/** Every unique guide slug. */
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
