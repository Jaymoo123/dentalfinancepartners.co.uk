/**
 * Resource registry for Agency Founder Finance -- maps TopicKey to
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
 * Topics (all 6 TopicKeys, exhaustive):
 *   pay-planning   : 3 enabled pairs (flagship salary/dividend workbook)
 *   exit           : 3 enabled pairs (agency exit and BADR workbook)
 *   compliance-vat : 3 enabled pairs (VAT scheme comparison workbook)
 *   structure      : no asset (employer-cost tool; no take-home workbook)
 *   rnd            : no asset (HP honesty boundary; no downloadable claim model)
 *   international  : no asset (UAE open-items; UK-primary only)
 *
 * Storage prefix: aff (FROZEN). No ptp_/dfp_/cfp_/bfp_ keys.
 *
 * Token hardening: no var(--gold), no var(--navy), no var(--dark).
 * Colours are indigo/slate (--accent, --ink).
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a topic. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/pay-planning/salary-dividend-model.xlsx" */
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
  /** premium tool id for this topic (R2 registry spine); null if no premium tool. */
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
  "pay-planning": {
    topic: "pay-planning",
    toolId: "salary-dividend-optimiser-premium",
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
      "A full extraction breakdown at your chosen salary and dividend split, with 2026/27 rates. Shows employer NI, corporation tax, income tax on salary and dividend tax side by side, so you can see the real cost of each extraction decision.",
  },

  "exit": {
    topic: "exit",
    toolId: "agency-exit-cgt-premium",
    xlsx: {
      file: "/resources/exit/agency-exit-cgt-model.xlsx",
      label: "Agency exit and BADR model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "exit",
      label: "Agency exit, CGT and BADR guide",
      enabled: true,
    },
    magnetTitle: "Get the agency exit and BADR model",
    magnetBlurbTemplate:
      "Two scenario columns on the same gain: with Business Asset Disposal Relief and at the standard CGT rate. Shows the BADR saving at 18% (2026/27) or 14% (to 5 April 2026), the lifetime cap and the effective rate.",
  },

  "compliance-vat": {
    topic: "compliance-vat",
    toolId: "vat-scheme-comparator-premium",
    xlsx: {
      file: "/resources/compliance-vat/vat-scheme-model.xlsx",
      label: "VAT scheme comparison model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "compliance-vat",
      label: "Agency VAT scheme guide",
      enabled: true,
    },
    magnetTitle: "Get the VAT scheme comparison model",
    magnetBlurbTemplate:
      "Standard versus Flat Rate side by side, with the limited-cost-trader test built in. Agencies are nearly always limited-cost traders (16.5% rate on gross turnover), so the standard scheme usually wins after reclaiming input VAT.",
  },

  "structure": {
    topic: "structure",
    toolId: null,
    // No gated asset: the employer-cost-to-hire tool is a single-figure cost
    // calculator, not a take-home workbook. Resolves to the specialist call.
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a specialist agency accountant",
    magnetBlurbTemplate:
      "A specialist will talk through your agency structure, incorporation decision and employer cost position. The first call is free.",
  },

  "rnd": {
    topic: "rnd",
    toolId: null,
    // No gated asset: a downloadable R&D benefit model would encourage over-claiming
    // (HP section 4 honesty boundary). Most agency work does not qualify.
    // rnd also has no blog category (blogCategorySlugs: []) so a gate would never
    // surface in-blog. Resolves to the specialist call.
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a specialist agency accountant",
    magnetBlurbTemplate:
      "Most agency work does not qualify for R&D tax relief. A specialist will tell you honestly whether you have a genuine claim before you file anything.",
  },

  "international": {
    topic: "international",
    toolId: null,
    // No gated asset: UAE and relocation figures are content-derived with 6 open
    // items and a mandatory local-specialist hedge (HP section 8). No UK-primary
    // relocation compute lib exists. Resolves to the specialist call.
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a specialist agency accountant",
    magnetBlurbTemplate:
      "The UK-side of any relocation involves CGT timing, the temporary non-residence rule and BADR eligibility. A free call covers the UK picture and flags where you will need a local specialist.",
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

/** Every unique guide slug (no aliases on aff so this equals enabledGuideTopics). */
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
