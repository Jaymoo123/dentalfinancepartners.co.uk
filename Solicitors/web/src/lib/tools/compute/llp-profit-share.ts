/**
 * LLP profit share allocation compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from LlpProfitShareCalculator.tsx.
 *
 * FIGURES TRACED:
 * - No time-sensitive tax rates. Profit allocation is a partnership-agreement matter.
 * - Standard multipliers (1.5x two-tier senior) are market conventions, not statutory.
 *
 * LIMITATIONS: Excludes capital interest, lock-in schedules, deferred compensation,
 * and partner-specific adjustments that real LLP agreements contain.
 */

export type AllocationMethod = "equal" | "points" | "two-tier" | "fixed-share-plus-equity";

export type LLPProfitShareInput = {
  totalProfit: number;
  method: AllocationMethod;
  seniorPartners: number;
  juniorPartners: number;
  fixedSharePartners: number;
  fixedShareEach: number;
  seniorMultiplier: number;
};

export type PartnerAllocation = {
  label: string;
  share: number;
  percentage: number;
};

export type LLPProfitShareResult = {
  partners: PartnerAllocation[];
};

export function calcLLPProfitShare(input: LLPProfitShareInput): LLPProfitShareResult {
  const {
    totalProfit,
    method,
    seniorPartners,
    juniorPartners,
    fixedSharePartners,
    fixedShareEach,
    seniorMultiplier,
  } = input;

  if (method === "equal") {
    const totalPartners = seniorPartners + juniorPartners;
    if (totalPartners === 0) return { partners: [] };
    const each = totalProfit / totalPartners;
    const partners: PartnerAllocation[] = [];
    for (let i = 0; i < totalPartners; i++) {
      partners.push({ label: `Partner ${i + 1}`, share: each, percentage: 100 / totalPartners });
    }
    return { partners };
  }

  if (method === "points") {
    const totalPoints = seniorPartners * seniorMultiplier + juniorPartners * 1;
    if (totalPoints === 0) return { partners: [] };
    const valuePerPoint = totalProfit / totalPoints;
    const seniorShare = valuePerPoint * seniorMultiplier;
    const juniorShare = valuePerPoint * 1;
    const partners: PartnerAllocation[] = [];
    for (let i = 0; i < seniorPartners; i++)
      partners.push({ label: `Senior partner ${i + 1}`, share: seniorShare, percentage: (seniorShare / totalProfit) * 100 });
    for (let i = 0; i < juniorPartners; i++)
      partners.push({ label: `Junior partner ${i + 1}`, share: juniorShare, percentage: (juniorShare / totalProfit) * 100 });
    return { partners };
  }

  if (method === "fixed-share-plus-equity") {
    const fixedShareTotal = fixedShareEach * fixedSharePartners;
    const equityProfit = Math.max(0, totalProfit - fixedShareTotal);
    const totalEquityPoints = seniorPartners * seniorMultiplier + juniorPartners * 1;
    const valuePerPoint = totalEquityPoints > 0 ? equityProfit / totalEquityPoints : 0;
    const partners: PartnerAllocation[] = [];
    for (let i = 0; i < fixedSharePartners; i++)
      partners.push({ label: `Fixed-share ${i + 1}`, share: fixedShareEach, percentage: (fixedShareEach / totalProfit) * 100 });
    for (let i = 0; i < seniorPartners; i++) {
      const share = valuePerPoint * seniorMultiplier;
      partners.push({ label: `Senior equity ${i + 1}`, share, percentage: (share / totalProfit) * 100 });
    }
    for (let i = 0; i < juniorPartners; i++) {
      const share = valuePerPoint * 1;
      partners.push({ label: `Junior equity ${i + 1}`, share, percentage: (share / totalProfit) * 100 });
    }
    return { partners };
  }

  // two-tier: senior 1.5x, junior 1x
  const totalPoints = seniorPartners * 1.5 + juniorPartners * 1;
  if (totalPoints === 0) return { partners: [] };
  const valuePerPoint = totalProfit / totalPoints;
  const partners: PartnerAllocation[] = [];
  for (let i = 0; i < seniorPartners; i++)
    partners.push({
      label: `Senior partner ${i + 1}`,
      share: valuePerPoint * 1.5,
      percentage: ((valuePerPoint * 1.5) / totalProfit) * 100,
    });
  for (let i = 0; i < juniorPartners; i++)
    partners.push({
      label: `Junior partner ${i + 1}`,
      share: valuePerPoint * 1,
      percentage: ((valuePerPoint * 1) / totalProfit) * 100,
    });
  return { partners };
}
