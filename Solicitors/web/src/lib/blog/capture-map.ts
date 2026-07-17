/**
 * Blog category → capture config for the 3-moment blog architecture.
 *
 * Keys are slugifyCategory() outputs (see lib/blog.ts).
 * Priority: premiumSlug > toolSlug > resourceId (MiniCapture fallback).
 *
 * TODO items flag email-gated resources that don't exist yet — the content
 * wave builds them. Until then the gate renders nothing (hasEnabledResource
 * guards all renders) and MiniCapture fires instead.
 *
 * NOTE: partnership-llp-structure is NOT in taxonomy.ts blogCategorySlugs.
 * Add it to the partnership-llp entry there when taxonomy is next touched.
 */

export type CaptureConfig = {
  /** Public tool slug for the early island (renders a ToolCTA). */
  toolSlug: string | null;
  /** Premium tool id for the early island (renders PremiumUpgrade). Takes precedence over toolSlug. */
  premiumSlug: string | null;
  /** Email-gated resource id (renders ResourceGate). null = asset not yet built. */
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
    resourceId: "practice-finance-guide",
    resourceTodo:
      "TODO: build practice-finance cash-flow guide + Excel model; flip hasEnabledResource when ready",
  },

  // ── VAT & compliance ────────────────────────────────────────────────────
  "vat-compliance": {
    premiumSlug: null,
    toolSlug: "vat-disbursements-classifier",
    resourceId: "vat-guide",
    resourceTodo: "TODO: build VAT & disbursements written guide for law firms",
  },

  // ── Structure & incorporation ───────────────────────────────────────────
  "structure-incorporation": {
    premiumSlug: "sole-practitioner-premium",
    toolSlug: "solicitor-hourly-rate-benchmark",
    resourceId: "incorporation-guide",
    resourceTodo:
      "TODO: build structure & incorporation decision guide + comparison model",
  },

  // ── Professional indemnity (no taxonomy topic; public tool only) ────────
  "professional-indemnity": {
    premiumSlug: null,
    toolSlug: "indemnity-premium-estimator",
    resourceId: "professional-indemnity-guide",
    resourceTodo: "TODO: build PII premium benchmarks guide for law firms",
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
