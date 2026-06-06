/**
 * Incorporation cost/benefit — the pure math, shared by the IncorporationCostCalculator
 * component, the premium "stay personal vs incorporate" tool and the Excel model
 * builder so the three can never disagree.
 *
 * The question this models: should a landlord keep a rental property (or portfolio)
 * in their own name, or transfer it into a limited company?
 *
 * UPFRONT COST of incorporating an existing property:
 *  - Capital Gains Tax. Transferring a property into a company is a disposal at
 *    market value (connected persons, TCGA 1992 s.17/s.18). Residential CGT rates
 *    18% within the unused basic-rate band, 24% above (from 30 Oct 2024), after the
 *    £3,000 annual exempt amount. Computed here with the SAME computeCgt() the CGT
 *    calculator uses. (s.162 incorporation relief can DEFER this where the lettings
 *    are a genuine business and ALL assets transfer for shares — it must now be
 *    CLAIMED for transfers on/after 6 Apr 2026, FA 2026; modelled as an on/off
 *    toggle that zeroes the CGT when relief applies.)
 *  - Stamp Duty Land Tax. The company's "purchase" is an additional-dwelling
 *    acquisition: standard SDLT bands PLUS the 5% surcharge on the whole price.
 *    Computed with the SAME additionalDwellingSdlt() the SDLT calculator uses.
 *
 * ANNUAL SAVING (per year, going forward):
 *  - Personally: income tax on the lettings under the Section 24 restriction
 *    (interest not deductible; a 20%/22% finance-cost credit). Reuses computeSection24().
 *  - In a company: Corporation Tax on the (interest-deductible) profit, PLUS the
 *    personal tax on extracting that profit as dividends (the company's money is not
 *    your money). Reuses corporationTax() + computeDividendTax(). A "retain and
 *    reinvest" toggle drops the dividend layer for landlords who leave profit in.
 *
 * BREAK-EVEN: upfront cost ÷ annual saving (years to recover the cost).
 *
 * Locked from docs/property/house_positions.md §1 (SDLT), §4 (Section 24), §5 (CGT),
 * §21 (LtdCo). Every rate comes from the shared lib constants below, never hard-coded.
 */
import { additionalDwellingSdlt } from "./sdlt";
import {
  computeCgt,
  CGT_ANNUAL_EXEMPT_AMOUNT,
  CGT_RESIDENTIAL_BASIC,
  CGT_RESIDENTIAL_HIGHER,
} from "./cgt";
import { computeSection24, type TaxBand, type TaxYear } from "./section24";
import { corporationTax, corporationTaxEffectiveRate } from "./corpTax";
import {
  computeDividendTax,
  DIV_BASIC,
  DIV_HIGHER,
  DIV_ADDITIONAL,
} from "./dividendTax";

export type { TaxBand, TaxYear };

export interface IncorporationInputs {
  /** current market value of the property/portfolio being transferred in. */
  propertyValue: number;
  /** original purchase price (base cost) of that property/portfolio. */
  purchasePrice: number;
  /** allowable buying/selling/improvement costs that reduce the chargeable gain. */
  acquisitionCosts?: number;
  /** annual gross rental income. */
  annualRentalIncome: number;
  /** annual mortgage interest + other finance costs. */
  mortgageInterest: number;
  /** annual non-finance running costs (repairs, agent fees, insurance, etc). */
  otherExpenses?: number;
  /** the landlord's marginal income tax band (drives personal + dividend rates). */
  taxBand: TaxBand;
  /** other taxable income for the year (used to place the CGT gain in the bands). */
  otherIncome?: number;
  /**
   * Section 24 / property-income year (reducer 20% for 2026/27, 22% from 2027/28).
   * Defaults to 2026/27.
   */
  year?: TaxYear;
  /**
   * Whether s.162 incorporation relief is claimed (genuine business, all assets for
   * shares). When true the CGT on transfer is DEFERRED (modelled as £0 upfront here).
   */
  s162Relief?: boolean;
  /**
   * "Retain and reinvest": if true, profit stays in the company and no dividend is
   * drawn, so the annual company cost is Corporation Tax only (no extraction tax).
   * If false, all post-CT profit is extracted as a dividend and taxed personally.
   */
  retainInCompany?: boolean;
}

export interface IncorporationResult {
  /* --- Upfront cost of transferring the property into the company --- */
  /** chargeable gain on the deemed market-value disposal. */
  capitalGain: number;
  /** CGT on that gain (after AEA + band split), or £0 if s.162 relief is claimed. */
  cgtCost: number;
  /** whether s.162 relief was applied (CGT deferred). */
  s162Applied: boolean;
  /** SDLT the company pays: standard bands + 5% additional-dwelling surcharge. */
  sdltCost: number;
  /** total one-off cost of incorporating (CGT + SDLT). */
  totalUpfrontCost: number;

  /* --- Personal (stay-as-you-are) annual position under Section 24 --- */
  /** income tax on the lettings personally, under the Section 24 restriction. */
  personalTax: number;
  /** cash kept personally after that tax. */
  personalNetProfit: number;

  /* --- Company annual position --- */
  /** company taxable profit (interest deducted in full). */
  companyProfit: number;
  /** Corporation Tax on that profit. */
  corporationTax: number;
  /** effective Corporation Tax rate (%) on the company profit. */
  corporationTaxEffectiveRate: number;
  /** dividend drawn (post-CT profit), or 0 if retained. */
  dividendDrawn: number;
  /** personal tax on extracting that dividend (0 if retained). */
  dividendTax: number;
  /** total company-route tax for the year (CT + dividend tax). */
  totalCompanyTax: number;
  /** cash in your hands after the company route (retained-in-company if reinvesting). */
  companyNetProfit: number;

  /* --- The decision --- */
  /** annual saving from the company route (personalTax − totalCompanyTax). */
  annualSaving: number;
  /** years to recover the upfront cost (Infinity-capped sentinel if saving ≤ 0). */
  breakEvenYears: number;
  /** true if the company route saves tax each year. */
  worthwhile: boolean;
}

/** Sentinel used when the annual saving is zero/negative (never breaks even). */
export const NEVER_BREAKS_EVEN = 999;

function round(n: number): number {
  return Math.round(n);
}

/**
 * Compute the full incorporation picture: the upfront CGT + SDLT cost of moving a
 * property into a company versus the annual tax saving the company structure gives,
 * and the break-even point. Amounts are rounded to whole pounds.
 */
export function computeIncorporation(i: IncorporationInputs): IncorporationResult {
  const value = Math.max(0, i.propertyValue);
  const base = Math.max(0, i.purchasePrice);
  const costs = Math.max(0, i.acquisitionCosts ?? 0);
  const rent = Math.max(0, i.annualRentalIncome);
  const interest = Math.max(0, i.mortgageInterest);
  const other = Math.max(0, i.otherExpenses ?? 0);
  const otherIncome = Math.max(0, i.otherIncome ?? 0);
  const year = i.year ?? "2026-27";
  const s162 = i.s162Relief ?? false;
  const retain = i.retainInCompany ?? false;

  /* --- Upfront cost: CGT on the deemed disposal + SDLT on the company purchase --- */
  // CGT via the shared CGT engine: applies the £3,000 AEA and the 18%/24% band split
  // using the landlord's other income to fill the basic-rate band.
  const cgt = computeCgt({
    salePrice: value,
    purchasePrice: base,
    costs,
    otherIncome,
    aeaUsed: false,
  });
  const capitalGain = cgt.gain;
  const cgtCost = s162 ? 0 : cgt.tax;

  // SDLT: an additional-dwelling acquisition (standard bands + 5% surcharge).
  const sdltCost = additionalDwellingSdlt(value);
  const totalUpfrontCost = cgtCost + sdltCost;

  /* --- Personal annual position under Section 24 (shared engine) --- */
  const s24 = computeSection24({
    rentalIncome: rent,
    mortgageInterest: interest,
    otherExpenses: other,
    taxBand: i.taxBand,
    year,
  });
  const personalTax = s24.s24Tax;
  const personalNetProfit = s24.s24NetProfit;

  /* --- Company annual position --- */
  const companyProfit = Math.max(0, rent - other - interest);
  const ct = corporationTax(companyProfit);
  const ctEffective = corporationTaxEffectiveRate(companyProfit);
  const postCt = Math.max(0, companyProfit - ct);

  // Extraction: if not retaining, draw the post-CT profit as a dividend and tax it
  // personally (top slice of income). Reuses the dividend-tax engine.
  const dividendDrawn = retain ? 0 : postCt;
  const div = retain
    ? { tax: 0 }
    : computeDividendTax({ otherIncome, dividends: dividendDrawn });
  const dividendTaxAmt = div.tax;
  const totalCompanyTax = ct + dividendTaxAmt;
  // Cash in your hands: if retaining, the post-CT profit sits in the company (still
  // your asset, just not extracted); if extracting, it is the post-CT profit less
  // the dividend tax.
  const companyNetProfit = retain ? postCt : postCt - dividendTaxAmt;

  /* --- The decision --- */
  const annualSaving = personalTax - totalCompanyTax;
  const breakEvenYears =
    annualSaving > 0 ? totalUpfrontCost / annualSaving : NEVER_BREAKS_EVEN;
  const worthwhile = annualSaving > 0;

  return {
    capitalGain: round(capitalGain),
    cgtCost: round(cgtCost),
    s162Applied: s162,
    sdltCost: round(sdltCost),
    totalUpfrontCost: round(totalUpfrontCost),

    personalTax: round(personalTax),
    personalNetProfit: round(personalNetProfit),

    companyProfit: round(companyProfit),
    corporationTax: round(ct),
    corporationTaxEffectiveRate: ctEffective,
    dividendDrawn: round(dividendDrawn),
    dividendTax: round(dividendTaxAmt),
    totalCompanyTax: round(totalCompanyTax),
    companyNetProfit: round(companyNetProfit),

    annualSaving: round(annualSaving),
    // keep break-even as a real (possibly fractional) number of years
    breakEvenYears,
    worthwhile,
  };
}

/** Format a whole-pound figure as GBP, e.g. 12345 → "£12,345". */
export function gbp(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}£${Math.abs(rounded).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}

/** Re-export the locked constants the Excel builder writes into its Rates sheet. */
export {
  CGT_ANNUAL_EXEMPT_AMOUNT,
  CGT_RESIDENTIAL_BASIC,
  CGT_RESIDENTIAL_HIGHER,
  DIV_BASIC,
  DIV_HIGHER,
  DIV_ADDITIONAL,
};
