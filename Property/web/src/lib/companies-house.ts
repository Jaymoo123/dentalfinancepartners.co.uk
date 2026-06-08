/**
 * Best-effort Companies House lookup (free public API) for lead enrichment.
 *
 * Leads rarely give a company number, so this is a fuzzy name search: we take a
 * company name mentioned in the enquiry and return the top match, flagged with a
 * confidence so the dashboard never overclaims. Fail-open: returns null without a
 * key (COMPANIES_HOUSE_API_KEY) or on any error. Auth is HTTP Basic with the API
 * key as the username and an empty password.
 */

const CH_BASE = "https://api.company-information.service.gov.uk";

export interface CompanyMatch {
  company_number: string;
  company_name: string;
  company_status?: string;
  address?: string;
  /** "matched" (single strong hit) | "guess" (top of several) | "none". */
  confidence: "matched" | "guess";
}

export function chConfigured(): boolean {
  return Boolean(process.env.COMPANIES_HOUSE_API_KEY);
}

type ChSearchItem = {
  company_number?: string;
  title?: string;
  company_status?: string;
  address_snippet?: string;
};
type ChSearchResponse = { items?: ChSearchItem[]; total_results?: number };

/** Search Companies House by name; returns the best match or null. */
export async function searchCompany(name: string): Promise<CompanyMatch | null> {
  const key = process.env.COMPANIES_HOUSE_API_KEY;
  const q = (name || "").trim();
  if (!key || q.length < 2) return null;
  try {
    const auth = Buffer.from(`${key}:`).toString("base64");
    const res = await fetch(`${CH_BASE}/search/companies?q=${encodeURIComponent(q)}&items_per_page=3`, {
      headers: { Authorization: `Basic ${auth}`, Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ChSearchResponse;
    const items = data.items ?? [];
    const top = items[0];
    if (!top?.company_number) return null;
    // One clear result = "matched"; otherwise the top of several = "guess".
    const confidence = (data.total_results ?? items.length) === 1 ? "matched" : "guess";
    return {
      company_number: top.company_number,
      company_name: top.title ?? q,
      company_status: top.company_status,
      address: top.address_snippet,
      confidence,
    };
  } catch (err) {
    console.error("[companies-house] search failed", err);
    return null;
  }
}
