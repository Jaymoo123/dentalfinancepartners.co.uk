/**
 * Resource registry for Trade Tax Specialists (construction-cis).
 *
 * Maps TopicKey to downloadable assets (xlsx + guide) for each topic.
 * Data-only, string-safe, safe for the client bundle.
 * Used by ResourceGate (xlsx / guide).
 *
 * Storage prefix: bfp (FROZEN). Tokens: --accent (orange) / --dark (slate).
 * No var(--gold), no var(--navy), no --primary.
 *
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is ever
 * rendered/linked for an asset whose `enabled` is false (or whose underlying
 * file does not yet exist). Onboarding a category:
 *   1. author the xlsx builder + content/resources/<topic>.md,
 *   2. run `npm run resources:xlsx`,
 *   3. pass the golden test,
 *   4. flip the single `enabled: true` here.
 *
 * Enabled pairs (3):
 *   cis-refund    -> CIS refund and deduction workbook (FLAGSHIP)
 *   cis-deductions -> ALIAS to cis-refund (same resource, different entry point)
 *   limited-company -> CIS vs PAYE take-home workbook
 *   gross-payment-status -> GPS readiness checklist workbook
 *
 * No-asset topics (specialist-contact only):
 *   self-assessment (the refund model surfaces the SA liability)
 *   vat-reverse-charge (conditions test, no money tool)
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a topic. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/cis-refund/cis-refund-model.xlsx" */
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
  "cis-refund": {
    topic: "cis-refund",
    toolId: "cis-refund-planner-premium",
    xlsx: {
      file: "/resources/cis-refund/cis-refund-model.xlsx",
      label: "CIS refund and deduction model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "cis-refund",
      label: "CIS refund and over-deduction guide",
      enabled: true,
    },
    magnetTitle: "Get the CIS refund and deduction model",
    magnetBlurbTemplate:
      "The labour-only CIS deduction base, your Self Assessment liability, and the refund or balance. Live formulas, 2026/27 rates.",
  },
  "cis-deductions": {
    // Alias to cis-refund: the deduction figure is the front half of the refund model.
    topic: "cis-deductions",
    toolId: "cis-refund-planner-premium",
    xlsx: {
      file: "/resources/cis-refund/cis-refund-model.xlsx",
      label: "CIS refund and deduction model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "cis-refund",
      label: "CIS refund and over-deduction guide",
      enabled: true,
    },
    magnetTitle: "Get the CIS refund and deduction model",
    magnetBlurbTemplate:
      "The labour-only CIS deduction base, your Self Assessment liability, and the refund or balance. Live formulas, 2026/27 rates.",
  },
  "limited-company": {
    topic: "limited-company",
    toolId: "cis-vs-paye-premium",
    xlsx: {
      file: "/resources/cis-vs-paye/cis-vs-paye-model.xlsx",
      label: "CIS vs PAYE take-home model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "cis-vs-paye",
      label: "CIS subcontractor vs PAYE employee guide",
      enabled: true,
    },
    magnetTitle: "Get the CIS vs PAYE take-home model",
    magnetBlurbTemplate:
      "CIS self-employed and PAYE employee take-home side by side at the same gross earnings, with the expense advantage and NIC rates made explicit.",
  },
  "gross-payment-status": {
    topic: "gross-payment-status",
    toolId: "cis-gps-readiness-premium",
    xlsx: {
      file: "/resources/gross-payment-status/gps-readiness-model.xlsx",
      label: "GPS readiness checklist (Excel)",
      enabled: true,
    },
    guide: {
      slug: "gross-payment-status",
      label: "Gross payment status readiness and April 2026 guide",
      enabled: true,
    },
    magnetTitle: "Get the GPS readiness checklist",
    magnetBlurbTemplate:
      "The three-test GPS scorecard with the corrected turnover thresholds, the April 2026 anti-fraud regime summary, and the cash-flow gain at your turnover.",
  },
  "self-assessment": {
    topic: "self-assessment",
    toolId: null,
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a CIS specialist",
    magnetBlurbTemplate:
      "A specialist will talk through your CIS Self Assessment, check the refund owing, and advise on the quickest way to claim. The first call is free.",
  },
  "vat-reverse-charge": {
    topic: "vat-reverse-charge",
    toolId: null,
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a CIS specialist",
    magnetBlurbTemplate:
      "A specialist will confirm whether the VAT domestic reverse charge applies to your job and how to invoice correctly. The first call is free.",
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

/** Every unique guide slug (deduplicates cis-deductions -> cis-refund alias). */
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
