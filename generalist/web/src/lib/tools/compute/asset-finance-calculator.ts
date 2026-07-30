/**
 * Asset Finance Calculator — pure compute module. No React / DOM / fetch.
 *
 * Amortises (cost − deposit − PV of balloon) over the term at the monthly
 * rate; the balloon/residual is a final lump sum, discounted back to
 * present value to size the regular rental. Deposit is paid upfront.
 */

export type AssetFinanceProduct = "hp" | "lease";

export type AssetFinanceResult = {
  amountFinanced: number;
  monthlyRental: number;
  totalRentals: number;
  /** deposit + rentals + balloon */
  totalPayable: number;
  /** totalPayable − asset cost */
  totalFinanceCost: number;
};

export function calcAssetFinance(
  cost: number,
  deposit: number,
  annualRatePct: number,
  termMonths: number,
  balloon: number,
): AssetFinanceResult {
  const assetCost = Math.max(0, cost);
  const dep = Math.min(Math.max(0, deposit), assetCost);
  const n = Math.max(1, Math.round(termMonths));
  const r = Math.max(0, annualRatePct) / 100 / 12;
  const residual = Math.max(0, balloon);

  const pvBalloon = r === 0 ? residual : residual / Math.pow(1 + r, n);
  const amountFinanced = Math.max(0, assetCost - dep - pvBalloon);

  const monthlyRental =
    r === 0 ? amountFinanced / n : (amountFinanced * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalRentals = monthlyRental * n;
  const totalPayable = dep + totalRentals + residual;
  const totalFinanceCost = totalPayable - assetCost;

  return { amountFinanced, monthlyRental, totalRentals, totalPayable, totalFinanceCost };
}
