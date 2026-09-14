/**
 * Pure helpers for the paid workings-PDF concierge test (two weeks, flag-gated).
 *
 * Two jobs only:
 *   - buildPdfRequest: turn the live calculator state into the snapshot we store
 *     at click time, JSON round-tripped so functions/undefined never reach the DB.
 *   - parseOfferFlag: validate the site_flags row; anything odd reads as "off".
 *
 * No email, no name, no prose: the payload holds figures and enum strings only.
 */
import type {
  CalcValues,
  GridRow,
  PremiumResult,
} from "@/lib/calculators/premium/types";

export const PDF_TOOLS = new Set([
  "capital-gains-premium",
  "incorporation-premium",
  "section-24-premium",
]);
export const PDF_CTA_ID = "premium_pdf_29";
export const PDF_PAYLOAD_MAX_BYTES = 32 * 1024;
export const PDF_FLAG_KEY = "calc_pdf_offer";

export interface PdfRequestBody {
  tool_id: string;
  placement: string;
  values: CalcValues;
  rows: GridRow[];
  scenario?: string;
  result: Pick<PremiumResult, "headline" | "breakdown" | "scenarioResults">;
}

export function buildPdfRequest(input: {
  toolId: string;
  placement: string;
  values: CalcValues;
  rows: GridRow[];
  scenario?: string;
  result: PremiumResult;
}): PdfRequestBody | null {
  if (!PDF_TOOLS.has(input.toolId)) return null;
  const { headline, breakdown, scenarioResults } = input.result;
  // JSON round-trip drops functions/undefined and detaches the live state; the
  // chart payload is redraw data we never put in the document, so it is left out.
  const body = JSON.parse(
    JSON.stringify({
      tool_id: input.toolId,
      placement: input.placement,
      values: input.values,
      rows: input.rows,
      scenario: input.scenario,
      result: { headline, breakdown, scenarioResults },
    }),
  ) as PdfRequestBody;
  if (JSON.stringify(body).length > PDF_PAYLOAD_MAX_BYTES) return null;
  return body;
}

export interface OfferFlag {
  enabled: boolean;
  link: string;
  priceGbp: number;
}

export function parseOfferFlag(value: unknown): OfferFlag | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  const link = typeof v.link === "string" ? v.link : "";
  // Fail closed: only a real Stripe Payment Link can ever be rendered.
  if (!link.startsWith("https://buy.stripe.com/")) return null;
  if (typeof v.enabled !== "boolean") return null;
  const priceGbp = typeof v.price_gbp === "number" ? v.price_gbp : 0;
  if (!(priceGbp > 0)) return null;
  return { enabled: v.enabled, link, priceGbp };
}
