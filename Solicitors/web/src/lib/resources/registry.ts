/**
 * Per-category resource registry for Accounts for Lawyers (Solicitors).
 *
 * STRING / DATA ONLY: no heavy imports, no JSX. Safe to pull into the client
 * bundle (it is read by ResourceGate and the injection wiring). The premium
 * calculator config lives separately in lib/tools/premium/resources.ts so
 * the interactive tool fleet is never touched.
 *
 * FEATURE FLAGS: every asset carries `enabled`. Nothing is ever rendered or
 * linked for an asset whose `enabled` is false. Onboarding a category = author
 * the asset, drop the file in public/resources, then flip the single flag.
 *
 * EMAIL PATH: RESOURCE_EMAIL_ENABLED is false; on-page delivery only.
 * Re-enabling email is a one-line flip once a verified Resend from-domain exists.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

/** Set to true once a verified Resend from-domain is configured. */
export const RESOURCE_EMAIL_ENABLED = false;

/** A downloadable spreadsheet model for a category. */
export interface XlsxAsset {
  /** path under /public, e.g. "/resources/sra-compliance/sra-compliance-model.xlsx" */
  file: string;
  /** button label shown on the unlocked download */
  label: string;
  /** feature flag: never surface a disabled / missing file */
  enabled: boolean;
}

/** A gated written guide (a noindex web page) for a category. */
export interface GuideAsset {
  /** the resources/[topic] route slug (equals the TopicKey today) */
  slug: string;
  /** human label for the download/read button */
  label: string;
  /** feature flag: never surface a disabled guide */
  enabled: boolean;
}

/** Everything the system knows about one category's downloadable resources. */
export interface CategoryResource {
  topic: TopicKey;
  /** premium tool id for this category (matches lib/tools/premium/resources.ts). */
  toolId: string;
  /** the Excel model, or null if the category will never have one. */
  xlsx: XlsxAsset | null;
  /** the written guide, or null if the category will never have one. */
  guide: GuideAsset | null;
  /** the lead-magnet headline (per-category; per-page copy is templated in copy.ts). */
  magnetTitle: string;
  /**
   * Blurb template for the gate. Plain string so this module stays data-only.
   */
  magnetBlurbTemplate: string;
}

/**
 * The registry. ONE append-only entry per TopicKey. All assets start
 * enabled: true (Phase A). Flip a flag once the asset is authored + present.
 *
 * Conventions:
 *  - xlsx.file:  /resources/<topic>/<topic>-model.xlsx
 *  - guide.slug: <topic>  (the resources/[topic] route param)
 */
export const RESOURCES: Record<TopicKey, CategoryResource> = {
  "sra-compliance": {
    topic: "sra-compliance",
    toolId: "sra-client-account-premium",
    xlsx: {
      file: "/resources/sra-compliance/sra-compliance-model.xlsx",
      label: "SRA client account model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "sra-compliance",
      label: "SRA client account guide",
      enabled: true,
    },
    magnetTitle: "The SRA client account toolkit",
    magnetBlurbTemplate:
      "A working reconciliation and reserve model with live formulas, plus a plain-English guide to the SRA Accounts Rules. Enter your email to unlock both.",
  },
  "partnership-llp": {
    topic: "partnership-llp",
    toolId: "llp-profit-tax-premium",
    xlsx: {
      file: "/resources/partnership-llp/partnership-llp-model.xlsx",
      label: "Partner profit and tax model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "partnership-llp",
      label: "Partner profit and tax guide",
      enabled: true,
    },
    magnetTitle: "The partner profit and tax toolkit",
    magnetBlurbTemplate:
      "A working Excel model that splits distributable profit across the partners and shows what each keeps after income tax and Class 4 National Insurance, plus a plain-English guide. Enter your email to unlock both.",
  },
  "succession-sale": {
    topic: "succession-sale",
    toolId: "practice-sale-premium",
    xlsx: {
      file: "/resources/succession-sale/succession-sale-model.xlsx",
      label: "Practice sale model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "succession-sale",
      label: "Practice sale readiness guide",
      enabled: true,
    },
    magnetTitle: "The practice sale toolkit",
    magnetBlurbTemplate:
      "A working valuation and net-of-tax model (goodwill range, WIP, and what you keep after Capital Gains Tax and Business Asset Disposal Relief), plus a sale-readiness guide. Enter your email to unlock both.",
  },
  "sole-practitioner": {
    topic: "sole-practitioner",
    toolId: "sole-practitioner-premium",
    xlsx: {
      file: "/resources/sole-practitioner/sole-practitioner-model.xlsx",
      label: "Take-home and structure model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "sole-practitioner",
      label: "Take-home and structure guide",
      enabled: true,
    },
    magnetTitle: "The solicitor take-home toolkit",
    magnetBlurbTemplate:
      "A working Excel model comparing your take-home as a sole practitioner or partner versus through a limited company, after income tax, National Insurance, corporation tax and dividend tax, plus a guide. Enter your email to unlock both.",
  },
  "practice-finance": {
    topic: "practice-finance",
    toolId: "practice-finance-premium",
    xlsx: {
      file: "/resources/practice-finance/practice-finance-model.xlsx",
      label: "Practice cash-flow model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "practice-finance",
      label: "Practice finance and cash-flow guide",
      enabled: true,
    },
    magnetTitle: "The practice finance toolkit",
    magnetBlurbTemplate:
      "A working Excel model covering lock-up days, cash-flow forecasting and working capital, plus a plain-English guide. Enter your email to unlock both.",
  },
  vat: {
    topic: "vat",
    toolId: "vat-premium",
    xlsx: null,
    guide: {
      slug: "vat",
      label: "VAT and disbursements guide",
      enabled: true,
    },
    magnetTitle: "The VAT position toolkit",
    magnetBlurbTemplate:
      "A plain-English guide to VAT for law firms: disbursements vs rechargeable costs, counsel fees, search fees and partial exemption. Enter your email to unlock it.",
  },
  incorporation: {
    topic: "incorporation",
    toolId: "incorporation-premium",
    xlsx: {
      file: "/resources/incorporation/incorporation-model.xlsx",
      label: "Structure comparison model (Excel)",
      enabled: true,
    },
    guide: {
      slug: "incorporation",
      label: "Structure and incorporation guide",
      enabled: true,
    },
    magnetTitle: "The incorporation decision toolkit",
    magnetBlurbTemplate:
      "A working Excel model comparing your after-tax position under LLP versus limited company, plus a guide covering SRA authorisation, salaried-member rules and conversion mechanics. Enter your email to unlock both.",
  },
  "professional-indemnity": {
    topic: "professional-indemnity",
    toolId: "indemnity-premium-estimator",
    xlsx: null,
    guide: {
      slug: "professional-indemnity",
      label: "PII premium benchmarks guide",
      enabled: true,
    },
    magnetTitle: "The PII benchmarks guide",
    magnetBlurbTemplate:
      "A plain-English guide to SRA minimum terms, qualifying insurer requirements and premium benchmarks by practice area. Enter your email to unlock it.",
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
