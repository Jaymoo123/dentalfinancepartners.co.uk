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
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is rendered or linked
 * for an asset whose `enabled` is false (or whose underlying file does not yet
 * exist). Onboarding a category = author the asset, drop the file in
 * public/resources, then flip the single `enabled` flag.
 *
 * NOT Phase A any more, whatever an older copy of this comment said: twelve
 * assets are enabled and their .xlsx files are served publicly from
 * /resources/<topic>, with no email gate in front of them since ResourceGate
 * lost its A/B on 2026-06-16. Capture happens through the qualified
 * GateOrForm/MiniCapture block instead. Whether an ungated download is the
 * intended end state is an open product question, not a bug.
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
    magnetTitle: "Get the Section 24 Excel toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Drop your email below and we'll send you the template.",
  },
  incorporation: {
    topic: "incorporation",
    toolId: "incorporation-premium",
    xlsx: {
      file: "/resources/incorporation/incorporation-model.xlsx",
      label: "Incorporation model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "incorporation",
      label: "Incorporation decision guide",
      enabled: true,
    },
    magnetTitle: "The landlord incorporation toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  "capital-gains": {
    topic: "capital-gains",
    toolId: "capital-gains-premium",
    xlsx: {
      file: "/resources/capital-gains/capital-gains-model.xlsx",
      label: "Capital Gains model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "capital-gains",
      label: "Capital Gains Tax guide",
      enabled: true,
    },
    magnetTitle: "The property CGT toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  "landlord-essentials": {
    topic: "landlord-essentials",
    toolId: "landlord-essentials-premium",
    xlsx: {
      file: "/resources/landlord-essentials/landlord-essentials-model.xlsx",
      label: "Landlord tax model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "landlord-essentials",
      label: "Landlord tax essentials guide",
      enabled: true,
    },
    magnetTitle: "The landlord tax essentials toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  "landlord-compliance": {
    topic: "landlord-compliance",
    toolId: "landlord-compliance-premium",
    // ponytail: guide only. No spreadsheet exists for this topic and the duty
    // map does not need one; add an xlsx entry if a model is ever authored.
    xlsx: null,
    guide: {
      slug: "landlord-compliance",
      label: "Landlord compliance guide",
      enabled: true,
    },
    magnetTitle: "The landlord compliance duty map",
    magnetBlurbTemplate:
      "Every safety, energy and licensing duty in one place, with the source law and the tax treatment. Enter your email and we'll send it over.",
  },
  "stamp-duty": {
    topic: "stamp-duty",
    toolId: "stamp-duty-premium",
    xlsx: {
      file: "/resources/stamp-duty/stamp-duty-model.xlsx",
      label: "Stamp duty model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "stamp-duty",
      label: "Stamp duty (SDLT) guide",
      enabled: true,
    },
    magnetTitle: "The property stamp duty toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  mtd: {
    topic: "mtd",
    toolId: "mtd-premium",
    xlsx: {
      file: "/resources/mtd/mtd-model.xlsx",
      label: "MTD readiness model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "mtd",
      label: "Making Tax Digital guide",
      enabled: true,
    },
    magnetTitle: "The Making Tax Digital toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
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
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  "non-resident": {
    topic: "non-resident",
    toolId: "non-resident-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The non-resident landlord toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  "property-types": {
    topic: "property-types",
    toolId: "property-types-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The specialist property tax toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
  },
  // Guide-only topic: the written hub exists, there is no Excel model and there
  // is unlikely ever to be one (leasehold premiums are a surveyor's valuation,
  // not a spreadsheet). Linked directly from the /leasehold pillar.
  leasehold: {
    topic: "leasehold",
    toolId: "leasehold-premium",
    xlsx: null,
    guide: {
      slug: "leasehold",
      label: "Leasehold resource hub",
      enabled: true,
    },
    magnetTitle: "The leasehold resource hub",
    magnetBlurbTemplate:
      "Every statute, commencement instrument and HMRC reference a leaseholder needs, with what each one settles.",
  },
  services: {
    topic: "services",
    toolId: "services-premium",
    xlsx: null,
    guide: null,
    magnetTitle: "The property accountant toolkit",
    magnetBlurbTemplate:
      "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and we'll send you both.",
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
