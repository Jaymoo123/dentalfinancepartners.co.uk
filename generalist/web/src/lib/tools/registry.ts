/**
 * Generalist tool registry.
 *
 * Single source of truth for the calculator fleet. Gallery, sitemap, nav,
 * and the dynamic [slug] route all read from here — nothing is hand-listed.
 *
 * Order controls display order on the gallery page.
 */
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { salaryDividendTool } from "./configs/salary-dividend-optimiser";
import { takeHomePayTool } from "./configs/take-home-pay-calculator";
import { employerNiTool } from "./configs/employer-ni-calculator";
import { pensionTool } from "./configs/pension-contribution-optimiser";
import { rdCreditTool } from "./configs/rd-tax-credit-estimator";
import { badrTool } from "./configs/badr-cgt-calculator";
import { vatTool } from "./configs/vat-scheme-comparator";
// New tools (expansion/phase-0)
import { associatedCompaniesCTTool } from "./configs/associated-companies-ct";
import { dividendTaxTool } from "./configs/dividend-tax-2026-27";
import { cgt60DayTool } from "./configs/cgt-60-day-reporter";
import { capitalAllowancesVehicleTool } from "./configs/capital-allowances-vehicle";
import { soleTraderVsLtdTool } from "./configs/sole-trader-vs-ltd";
import { vatThresholdTool } from "./configs/vat-threshold-checker";
import { p11dBikTool } from "./configs/p11d-bik-calculator";
import { mileageClaimTool } from "./configs/mileage-claim";
import { mtdItsaTool } from "./configs/mtd-itsa-readiness";
import { cisSubcontractorTool } from "./configs/cis-subcontractor-deduction";

const tools = [
  // Income Tax & Salary
  salaryDividendTool,
  takeHomePayTool,
  dividendTaxTool,
  pensionTool,
  mileageClaimTool,
  // Corporation Tax
  employerNiTool,
  associatedCompaniesCTTool,
  rdCreditTool,
  capitalAllowancesVehicleTool,
  // VAT
  vatTool,
  vatThresholdTool,
  // Capital Gains
  badrTool,
  cgt60DayTool,
  // Business Structure & Self-Employed
  soleTraderVsLtdTool,
  cisSubcontractorTool,
  // Employment Taxes & Compliance
  p11dBikTool,
  mtdItsaTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
