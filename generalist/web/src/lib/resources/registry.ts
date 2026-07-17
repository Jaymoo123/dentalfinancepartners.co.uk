/**
 * Blog resource registry — maps TopicKey to the premium tool and downloadable
 * assets for that topic.
 *
 * Data-only, string-safe, safe for the client bundle.
 * Used by PremiumUpgrade (toolId) and ResourceGate (xlsx / guide).
 *
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is ever
 * rendered/linked for an asset whose `enabled` is false (or whose underlying
 * file does not yet exist). Onboarding a category:
 *   1. author the xlsx builder + content/resources/<topic>.md,
 *   2. run `npm run resources:xlsx`,
 *   3. pass the golden test (§4.1),
 *   4. flip the single `enabled: true` here.
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a category. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/director-pay/director-pay-model.xlsx" */
  file: string;
  /** button label shown on the unlocked download */
  label: string;
  /** feature flag — never surface a disabled / missing file */
  enabled: boolean;
}

/** A gated written guide (a noindex web page) for a category. */
export interface GuideAsset {
  /** the resources/[topic] route slug (equals the TopicKey) */
  slug: string;
  /** human label for the read button */
  label: string;
  /** feature flag */
  enabled: boolean;
}

/** Everything the system knows about one category's downloadable resources. */
export interface CategoryResource {
  topic: TopicKey;
  /** premium tool id for this category (see lib/calculators/premium/registry). */
  toolId: string | null;
  /** the Excel model, or null if the category will never have one. */
  xlsx: XlsxAsset | null;
  /** the written guide, or null if the category will never have one. */
  guide: GuideAsset | null;
  /** the lead-magnet headline (per-category). */
  magnetTitle: string;
  /**
   * Blurb template for the gate. `{label}` is replaced with the page/topic label.
   */
  magnetBlurbTemplate: string;
}

export const RESOURCES: Record<TopicKey, CategoryResource> = {
  "director-pay": {
    topic: "director-pay",
    toolId: "director-pay-premium",
    xlsx: {
      file: "/resources/director-pay/director-pay-model.xlsx",
      label: "Salary and dividend model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "director-pay",
      label: "Director pay and dividends guide",
      enabled: true,
    },
    magnetTitle: "Get the salary and dividend model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  "limited-company": {
    topic: "limited-company",
    toolId: "director-pay-premium",
    // Maps to the director-pay asset (same topic for limited-company posts).
    xlsx: {
      file: "/resources/director-pay/director-pay-model.xlsx",
      label: "Salary and dividend model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "director-pay",
      label: "Director pay and dividends guide",
      enabled: true,
    },
    magnetTitle: "Get the salary and dividend model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  incorporation: {
    topic: "incorporation",
    toolId: "incorporation-premium",
    xlsx: {
      file: "/resources/incorporation/incorporation-model.xlsx",
      label: "Incorporation comparison (Excel)",
      enabled: true,
    },
    guide: {
      slug: "incorporation",
      label: "Sole trader vs limited company guide",
      enabled: true,
    },
    magnetTitle: "Get the incorporation comparison model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  "sole-trader": {
    topic: "sole-trader",
    toolId: "incorporation-premium",
    // Maps to the incorporation asset for sole-trader posts.
    xlsx: {
      file: "/resources/incorporation/incorporation-model.xlsx",
      label: "Incorporation comparison (Excel)",
      enabled: true,
    },
    guide: {
      slug: "incorporation",
      label: "Sole trader vs limited company guide",
      enabled: true,
    },
    magnetTitle: "Get the incorporation comparison model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  "vat-mtd": {
    topic: "vat-mtd",
    toolId: "vat-scheme-premium",
    xlsx: {
      file: "/resources/vat-mtd/vat-scheme-model.xlsx",
      label: "VAT scheme model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "vat-mtd",
      label: "VAT schemes and MTD guide",
      enabled: true,
    },
    magnetTitle: "Get the VAT scheme model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  payroll: {
    topic: "payroll",
    toolId: "employer-cost-premium",
    xlsx: {
      file: "/resources/payroll/employer-cost-model.xlsx",
      label: "Cost of hire model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "payroll",
      label: "Employing staff and payroll guide",
      enabled: true,
    },
    magnetTitle: "Get the cost-of-hire model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  rnd: {
    topic: "rnd",
    toolId: "rd-estimator-premium",
    xlsx: {
      file: "/resources/rnd/rd-relief-model.xlsx",
      label: "R&D relief model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "rnd",
      label: "R&D tax relief guide (merged scheme + ERIS)",
      enabled: true,
    },
    magnetTitle: "Get the R&D relief model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  "exit-cgt": {
    topic: "exit-cgt",
    toolId: "badr-exit-premium",
    xlsx: {
      file: "/resources/exit-cgt/badr-exit-model.xlsx",
      label: "Exit and BADR model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "exit-cgt",
      label: "Selling your business: CGT and BADR guide",
      enabled: true,
    },
    magnetTitle: "Get the exit and BADR timing model",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
  },
  compliance: {
    topic: "compliance",
    toolId: null,
    // TODO(resources): no gated asset yet for compliance / corporation-tax
    // posts (covers "Bookkeeping and Compliance" + "Corporation Tax"
    // categories, ~104 posts). Candidate: MTD ITSA readiness checklist xlsx
    // + guide. Until enabled, GateOrForm falls back to MiniCapture.
    xlsx: null,
    guide: null,
    magnetTitle: "Get a specialist review",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.",
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

/** Every topic key whose guide is unique (deduplicate mapped topics). */
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
