/**
 * Blog category → capture config for the 3-moment blog architecture.
 *
 * Keys are slugifyCategory() outputs (see lib/blog.ts).
 * Priority: premiumSlug > toolSlug > resourceId (MiniCapture fallback).
 *
 * All four resources are built and enabled in registry.ts. The resource slot
 * renders MiniCapture (a qualified free-review form) via ResourceGate; the email
 * gate was retired 2026-07-17, so resourceId now selects the free-review CTA.
 * partnership-llp-structure is mapped in taxonomy.ts blogCategorySlugs.
 */

export type CaptureConfig = {
  /** Public tool slug for the early island (renders a ToolCTA). */
  toolSlug: string | null;
  /** Premium tool id for the early island (renders PremiumUpgrade). Takes precedence over toolSlug. */
  premiumSlug: string | null;
  /** Resource id: renders ResourceGate (a MiniCapture free-review form; the email
   * gate was retired 2026-07-17). null = asset not yet built. */
  resourceId: string | null;
  /** Describes the asset to build when resourceId is a placeholder. */
  resourceTodo?: string;
};

export const CATEGORY_CAPTURE_MAP: Record<string, CaptureConfig> = {
  // ── SRA compliance cluster ──────────────────────────────────────────────
  "sra-compliance-trust-accounting": {
    premiumSlug: "sra-client-account-premium",
    toolSlug: "client-account-interest",
    resourceId: "sra-compliance",
  },
  "sra-accounts-rules": {
    premiumSlug: "sra-client-account-premium",
    toolSlug: "client-account-interest",
    resourceId: "sra-compliance",
  },
  "compliance-risk-colp-cofa": {
    premiumSlug: "sra-client-account-premium",
    toolSlug: "colp-cofa-checker",
    resourceId: "sra-compliance",
  },
  "conveyancing-compliance": {
    premiumSlug: "sra-client-account-premium",
    toolSlug: "client-account-interest",
    resourceId: "sra-compliance",
  },

  // ── Sole practitioner / fee-earner cluster ──────────────────────────────
  "sole-practitioner-tax": {
    premiumSlug: "sole-practitioner-premium",
    toolSlug: "solicitor-hourly-rate-benchmark",
    resourceId: "sole-practitioner",
  },
  "locum-solicitor-tax": {
    premiumSlug: "sole-practitioner-premium",
    toolSlug: "solicitor-hourly-rate-benchmark",
    resourceId: "sole-practitioner",
  },
  "fee-earner-tax-compensation": {
    premiumSlug: "sole-practitioner-premium",
    toolSlug: "solicitor-hourly-rate-benchmark",
    resourceId: "sole-practitioner",
  },
  // ponytail: trainee-paralegal-tax not in taxonomy; maps to sole-practitioner as closest fit
  "trainee-paralegal-tax": {
    premiumSlug: "sole-practitioner-premium",
    toolSlug: "solicitor-hourly-rate-benchmark",
    resourceId: "sole-practitioner",
  },

  // ── Partnership / LLP cluster ───────────────────────────────────────────
  "partnership-llp-accounting": {
    premiumSlug: "llp-profit-tax-premium",
    toolSlug: "partner-tax-reserve",
    resourceId: "partnership-llp",
  },
  // ponytail: partnership-llp-structure not in taxonomy.ts blogCategorySlugs — add it there
  "partnership-llp-structure": {
    premiumSlug: "llp-profit-tax-premium",
    toolSlug: "partner-tax-reserve",
    resourceId: "partnership-llp",
  },
  "practice-accounting": {
    premiumSlug: "llp-profit-tax-premium",
    toolSlug: "practice-cashflow-runway",
    resourceId: "partnership-llp",
  },

  // ── Practice succession / sale / acquisition ────────────────────────────
  "practice-sale-succession": {
    premiumSlug: "practice-sale-premium",
    toolSlug: "law-firm-sale-cgt",
    resourceId: "succession-sale",
  },
  "practice-succession-sale": {
    premiumSlug: "practice-sale-premium",
    toolSlug: "law-firm-sale-cgt",
    resourceId: "succession-sale",
  },
  "firm-acquisition-merger": {
    premiumSlug: "practice-sale-premium",
    toolSlug: "law-firm-sale-cgt",
    resourceId: "succession-sale",
  },

  // ── Practice finance / cash flow ────────────────────────────────────────
  // No premium tool yet; public tool covers the island; resource TODO
  "practice-finance-cash-flow": {
    premiumSlug: null,
    toolSlug: "practice-cashflow-runway",
    resourceId: "practice-finance",
  },

  // ── VAT & compliance ────────────────────────────────────────────────────
  "vat-compliance": {
    premiumSlug: null,
    toolSlug: "vat-disbursements-classifier",
    resourceId: "vat",
  },

  // ── Structure & incorporation ───────────────────────────────────────────
  "structure-incorporation": {
    premiumSlug: "sole-practitioner-premium",
    toolSlug: "solicitor-hourly-rate-benchmark",
    resourceId: "incorporation",
  },

  // ── Professional indemnity ──────────────────────────────────────────────
  "professional-indemnity": {
    premiumSlug: null,
    toolSlug: "indemnity-premium-estimator",
    resourceId: "professional-indemnity",
  },
};

/** Fallback for unmapped categories — MiniCapture inline form fires. */
export const FALLBACK_CAPTURE: CaptureConfig = {
  premiumSlug: null,
  toolSlug: null,
  resourceId: null,
};

export function captureForCategory(categorySlug: string): CaptureConfig {
  return CATEGORY_CAPTURE_MAP[categorySlug] ?? FALLBACK_CAPTURE;
}
