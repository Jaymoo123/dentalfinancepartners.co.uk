/**
 * Resource registry for Medical Accountants UK -- maps TopicKey to
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
 * Topics: gp-practice | gp-tax | nhs-pension | locum | incorporation-private
 *   - 3 enabled: nhs-pension, locum, incorporation-private
 *   - gp-practice: no asset (specialist-contact topic)
 *   - gp-tax: aliases the locum asset (same resource, different entry point)
 *
 * No practice sale/CGT workbook: NHS GP goodwill cannot be sold (HP section 4).
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a topic. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/nhs-pension/nhs-pension-model.xlsx" */
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
  "nhs-pension": {
    topic: "nhs-pension",
    toolId: "nhs-pension-premium",
    xlsx: {
      file: "/resources/nhs-pension/nhs-pension-model.xlsx",
      label: "NHS Pension annual allowance model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "nhs-pension",
      label: "NHS Pension annual allowance and Scheme Pays guide",
      enabled: true,
    },
    magnetTitle: "Get the NHS Pension annual allowance model",
    magnetBlurbTemplate:
      "Whether your NHS pension growth breaches the annual allowance once the taper is applied, with the estimated tax charge, on live formulas. The taper made explicit: threshold income over £200,000 AND adjusted income over £260,000, reducing the allowance to a £10,000 floor.",
  },
  locum: {
    topic: "locum",
    toolId: "locum-take-home-premium",
    xlsx: {
      file: "/resources/locum/doctor-take-home-model.xlsx",
      label: "Doctor take-home model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "locum",
      label: "Locum and self-employed doctor take-home guide",
      enabled: true,
    },
    magnetTitle: "Get the doctor take-home model",
    magnetBlurbTemplate:
      "Your take-home as a locum or self-employed doctor after income tax, Class 4 National Insurance and any student loan, with live formulas. Class 4 is 6% between £12,570 and £50,270 then 2%.",
  },
  "incorporation-private": {
    topic: "incorporation-private",
    toolId: "incorporation-premium",
    xlsx: {
      file: "/resources/incorporation-private/incorporation-model.xlsx",
      label: "Private practice incorporation model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "incorporation-private",
      label: "Private practice incorporation and the NHS Pension trade-off guide",
      enabled: true,
    },
    magnetTitle: "Get the incorporation comparison model",
    magnetBlurbTemplate:
      "Taking your private practice profit as a sole trader against extracting it through a limited company, on the same income, after income tax, Class 4 NIC, corporation tax and dividend tax. The NHS Pension trap made explicit.",
  },
  "gp-tax": {
    // Alias to the locum asset: same resource, different entry point.
    topic: "gp-tax",
    toolId: "locum-take-home-premium",
    xlsx: {
      file: "/resources/locum/doctor-take-home-model.xlsx",
      label: "Doctor take-home model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "locum",
      label: "Locum and self-employed doctor take-home guide",
      enabled: true,
    },
    magnetTitle: "Get the doctor take-home model",
    magnetBlurbTemplate:
      "Your take-home as a locum or self-employed doctor after income tax, Class 4 National Insurance and any student loan, with live formulas. Models self-employed and locum income.",
  },
  "gp-practice": {
    topic: "gp-practice",
    // Wired 2026-07-18 QA pass: partner drawings premium island now exists,
    // so gp-practice-management / gp-accountant-services posts get a tool.
    toolId: "gp-partner-drawings-planner",
    xlsx: null,
    guide: null,
    magnetTitle: "Speak to a specialist medical accountant",
    magnetBlurbTemplate:
      "A specialist will talk through your practice accounts, partnership drawings and deadlines. The first call is free.",
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

/** Every unique guide slug (deduplicates gp-tax -> locum alias). */
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
