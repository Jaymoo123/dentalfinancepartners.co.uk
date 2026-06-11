/**
 * Agency Founder Finance tool registry.
 *
 * Single source of truth for the calculator fleet. Gallery, sitemap, nav and
 * the dynamic [slug] route all read from here — nothing is hand-listed.
 *
 * Order controls display order on the gallery page.
 */
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { salaryDividendTool } from "./configs/salary-dividend-optimiser";
import { rdTaxCreditTool } from "./configs/rd-tax-credit-estimator";
import { agencyValuationTool } from "./configs/agency-valuation";
import { badrCgtTool } from "./configs/badr-cgt-calculator";
import { vatSchemeTool } from "./configs/vat-scheme-comparator";
import { pensionOptimiserTool } from "./configs/pension-contribution-optimiser";
import { takeHomePayTool } from "./configs/take-home-pay-calculator";
import { employerNiTool } from "./configs/employer-ni-calculator";

const tools = [
  salaryDividendTool,
  rdTaxCreditTool,
  agencyValuationTool,
  badrCgtTool,
  vatSchemeTool,
  pensionOptimiserTool,
  takeHomePayTool,
  employerNiTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
