/**
 * Per-category resource registry — the spine of the premium tools + downloads
 * system. One entry per canonical TopicKey (see lib/intent/taxonomy.ts). Each
 * entry describes the two per-CATEGORY downloads (a working Excel model + a
 * written guide) and the lead-magnet copy used to gate them.
 *
 * STRING / DATA ONLY: no heavy imports, no JSX. Safe to pull into the client
 * bundle (it is read by ResourceGate and the injection wiring). The premium
 * calculator config lives separately in lib/calculators/premium/registry.ts so
 * the indexable calculator fleet / sitemap / gallery are never touched.
 *
 * FEATURE FLAGS (the whole point of Phase A): every asset carries `enabled`.
 * Nothing is ever rendered/linked/emailed for an asset whose `enabled` is false
 * (or whose underlying file does not yet exist). In Phase A every flag is false,
 * so resourceForTopic() reports "nothing enabled" for every topic and the live
 * site renders identically to today. Onboarding a category = author the asset,
 * drop the file in public/resources, then flip the single `enabled` flag.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

/** A downloadable spreadsheet model for a category. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/section-24/section-24-model.xlsx" */
  file: string;
  /** button label shown on the unlocked download, e.g. "Section 24 model (Excel)" */
  label: string;
  /** feature flag — never surface a disabled / missing file */
  enabled: boolean;
}

/** A gated written guide (a noindex web page) for a category. */
export interface GuideAsset {
  /** the resources/[topic] route slug (equals the TopicKey today) */
  slug: string;
  /** human label for the download/read button */
  label: string;
  /** feature flag — never surface a disabled guide */
  enabled: boolean;
}

/** Everything the system knows about one category's downloadable resources. */
export interface CategoryResource {
  topic: TopicKey;
  /** premium tool id for this category (see lib/calculators/premium/registry). */
  toolId: string;
  /** the Excel model, or null if the category will never have one. */
  xlsx: XlsxAsset | null;
  /** the written guide, or null if the category will never have one. */
  guide: GuideAsset | null;
  /** the lead-magnet headline (per-category; per-page copy is templated in copy.ts). */
  magnetTitle: string;
  /**
   * Blurb template for the gate. `{label}` is replaced with the page/topic label
   * by gateCopy(); kept as a plain string here so this module stays data-only.
   */
  magnetBlurbTemplate: string;
}

/**
 * The registry. ONE append-only entry per TopicKey. All assets start
 * `enabled: false` (Phase A). Flip a flag once the asset is authored + present.
 *
 * Conventions:
 *  - xlsx.file:  /resources/<topic>/<topic>-model.xlsx
 *  - guide.slug: <topic>  (the resources/[topic] route param)
 */
export const RESOURCES: Record<TopicKey, CategoryResource> = {
  "section-24": {
    topic: "section-24",
    toolId: "section-24-premium",
    xlsx: {
      file: "/resources/section-24/section-24-model.xlsx",
      label: "Section 24 model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "section-24",
      label: "Section 24 landlord guide",
      enabled: true,
    },
    magnetTitle: "The Section 24 landlord toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  incorporation: {
    topic: "incorporation",
    toolId: "incorporation-premium",
    xlsx: {
      file: "/resources/incorporation/incorporation-model.xlsx",
      label: "Incorporation model (Excel)",
      enabled: false,
    },
    guide: {
      slug: "incorporation",
      label: "Incorporation decision guide",
      enabled: false,
    },
    magnetTitle: "The landlord incorporation toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  "capital-gains": {
    topic: "capital-gains",
    toolId: "capital-gains-premium",
    xlsx: {
      file: "/resources/capital-gains/capital-gains-model.xlsx",
      label: "Capital Gains model (Excel)",
      enabled: false,
    },
    guide: {
      slug: "capital-gains",
      label: "Capital Gains Tax guide",
      enabled: false,
    },
    magnetTitle: "The property CGT toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  "landlord-essentials": {
    topic: "landlord-essentials",
    toolId: "landlord-essentials-premium",
    xlsx: {
      file: "/resources/landlord-essentials/landlord-essentials-model.xlsx",
      label: "Landlord tax model (Excel)",
      enabled: false,
    },
    guide: {
      slug: "landlord-essentials",
      label: "Landlord tax essentials guide",
      enabled: false,
    },
    magnetTitle: "The landlord tax essentials toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  "stamp-duty": {
    topic: "stamp-duty",
    toolId: "stamp-duty-premium",
    xlsx: {
      file: "/resources/stamp-duty/stamp-duty-model.xlsx",
      label: "Stamp duty model (Excel)",
      enabled: false,
    },
    guide: {
      slug: "stamp-duty",
      label: "Stamp duty (SDLT) guide",
      enabled: false,
    },
    magnetTitle: "The property stamp duty toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  mtd: {
    topic: "mtd",
    toolId: "mtd-premium",
    xlsx: {
      file: "/resources/mtd/mtd-model.xlsx",
      label: "MTD readiness model (Excel)",
      enabled: false,
    },
    guide: {
      slug: "mtd",
      label: "Making Tax Digital guide",
      enabled: false,
    },
    magnetTitle: "The Making Tax Digital toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  // Non-flagship topics: registered for completeness so resourceForTopic() is
  // total over TopicKey, but with no assets and all flags off. Flip on / add
  // assets when these categories are onboarded.
  portfolio: {
    topic: "portfolio",
    toolId: "portfolio-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The portfolio management toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  "non-resident": {
    topic: "non-resident",
    toolId: "non-resident-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The non-resident landlord toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  "property-types": {
    topic: "property-types",
    toolId: "property-types-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The specialist property tax toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
  },
  services: {
    topic: "services",
    toolId: "services-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The property accountant toolkit",
    magnetBlurbTemplate:
      "Get the working Excel model and the written guide for {label}. Swap your email and we'll send both, plus a copy of the download links.",
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
