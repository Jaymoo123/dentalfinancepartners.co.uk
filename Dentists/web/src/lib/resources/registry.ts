/**
 * Resource registry for Dental Finance Partners — maps TopicKey to
 * downloadable assets (xlsx + guide) for each topic.
 *
 * Data-only, string-safe, safe for the client bundle.
 * Used by ResourceGate (xlsx / guide).
 *
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is ever
 * rendered/linked for an asset whose `enabled` is false (or whose underlying
 * file does not yet exist). Onboarding a category:
 *   1. author the xlsx builder + content/resources/<topic>.md,
 *   2. run `npm run resources:xlsx`,
 *   3. pass the golden test,
 *   4. flip the single `enabled: true` here.
 *
 * Topics: associate | principal | buying | selling | nhs | uda-calc | compliance
 *   - 5 enabled: associate, principal, buying, selling, nhs
 *   - compliance: no asset (specialist-contact topic)
 *   - uda-calc: alias to nhs asset (same resource, different entry point)
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a topic. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/associate/associate-model.xlsx" */
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
  "associate-incorporation": {
    topic: "associate-incorporation",
    toolId: "associate-incorporation-premium",
    xlsx: null,
    guide: {
      slug: "associate-incorporation",
      label: "Associate incorporation decision guide: sole trader vs Ltd with the NHS Pension cost",
      enabled: true,
    },
    magnetTitle: "Get the associate incorporation decision guide",
    magnetBlurbTemplate:
      "Sole trader vs limited company for dental associates at 2026/27 rates, with the NHS Pension employer value priced in. The figure generic incorporation calculators leave out.",
  },
  associate: {
    topic: "associate",
    toolId: "associate-take-home-premium",
    xlsx: {
      file: "/resources/associate/associate-model.xlsx",
      label: "Associate take-home model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "associate",
      label: "Associate and locum tax guide",
      enabled: true,
    },
    magnetTitle: "Get the associate take-home model",
    magnetBlurbTemplate:
      "What you keep from your fees after income tax, Class 4 and Class 2 NIC, with live formulas. A locum structure sheet: sole trader vs limited company vs umbrella side by side.",
  },
  principal: {
    topic: "principal",
    toolId: "principal-extraction-premium",
    xlsx: {
      file: "/resources/principal/principal-extraction-model.xlsx",
      label: "Profit extraction model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "principal",
      label: "Practice profit extraction guide",
      enabled: true,
    },
    magnetTitle: "Get the profit extraction model",
    magnetBlurbTemplate:
      "Sole trader or partnership vs limited company on the same profit, after income tax, NIC, corporation tax and dividend tax. The NHS Pension trap made explicit.",
  },
  buying: {
    topic: "buying",
    toolId: "practice-purchase-premium",
    xlsx: {
      file: "/resources/buying/practice-purchase-model.xlsx",
      label: "Practice purchase model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "buying",
      label: "Buying a dental practice: due diligence and affordability guide",
      enabled: true,
    },
    magnetTitle: "Get the practice purchase model",
    magnetBlurbTemplate:
      "An indicative value range from EBITDA, then a deposit, borrowing and profit-cover sense-check. Can the practice pay for itself?",
  },
  selling: {
    topic: "selling",
    toolId: "practice-sale-premium",
    xlsx: {
      file: "/resources/selling/practice-sale-model.xlsx",
      label: "Practice sale model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "selling",
      label: "Selling your dental practice: goodwill, CGT and BADR guide",
      enabled: true,
    },
    magnetTitle: "Get the practice sale model",
    magnetBlurbTemplate:
      "Indicative value, then roughly what you keep after Capital Gains Tax and Business Asset Disposal Relief. BADR at 18% within the £1m lifetime limit.",
  },
  nhs: {
    topic: "nhs",
    toolId: "uda-nhs-premium",
    xlsx: {
      file: "/resources/nhs/uda-value-model.xlsx",
      label: "UDA value model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "nhs",
      label: "NHS UDA contract value and pensions guide",
      enabled: true,
    },
    magnetTitle: "Get the UDA value model",
    magnetBlurbTemplate:
      "Your effective value per UDA, against the regional benchmark, with the real-terms erosion since your contract was signed.",
  },
  "uda-calc": {
    // Alias to the nhs asset: same resource, different entry point.
    topic: "uda-calc",
    toolId: "uda-nhs-premium",
    xlsx: {
      file: "/resources/nhs/uda-value-model.xlsx",
      label: "UDA value model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "nhs",
      label: "NHS UDA contract value and pensions guide",
      enabled: true,
    },
    magnetTitle: "Get the UDA value model",
    magnetBlurbTemplate:
      "Your effective value per UDA, against the regional benchmark, with the real-terms erosion since your contract was signed.",
  },
  compliance: {
    topic: "compliance",
    toolId: null,
    // No asset for compliance: the topic has no flagship calculator.
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a specialist dental accountant",
    magnetBlurbTemplate:
      "A specialist will talk through your practice accounts, VAT and deadlines. The first call is free.",
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

/** Every unique guide slug (deduplicates uda-calc -> nhs alias). */
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
