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

const tools = [
  salaryDividendTool,
  takeHomePayTool,
  employerNiTool,
  pensionTool,
  rdCreditTool,
  badrTool,
  vatTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
