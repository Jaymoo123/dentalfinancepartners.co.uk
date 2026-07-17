/**
 * Dentists tool registry.
 *
 * Single source of truth for the dental calculator fleet. Gallery, sitemap,
 * and the dynamic [slug] route all read from here — nothing is hand-listed.
 *
 * Order controls display order on the gallery page.
 */
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { associateTakeHomeTool } from "./configs/associate-take-home";
import { dentalTaxDeductionsTool } from "./configs/dental-tax-deductions";
import { equipmentCapitalAllowanceTool } from "./configs/equipment-capital-allowance";
import { locumStructureTool } from "./configs/locum-structure";
import { nhsPensionAaTaperTool } from "./configs/nhs-pension-aa-taper";
import { practiceOwnerIncomeBenchmarkTool } from "./configs/practice-owner-income-benchmark";
import { practicePurchaseTool } from "./configs/practice-purchase";
import { practiceSaleCgtTool } from "./configs/practice-sale-cgt";
import { practiceValuationTool } from "./configs/practice-valuation";
import { principalExtractionTool } from "./configs/principal-extraction";
import { sdrScotlandTool } from "./configs/sdr-scotland";
import { superannuationContributionsTool } from "./configs/superannuation-contributions";
import { udaValueTool } from "./configs/uda-value";

const tools = [
  udaValueTool,
  associateTakeHomeTool,
  practiceValuationTool,
  practicePurchaseTool,
  practiceSaleCgtTool,
  locumStructureTool,
  principalExtractionTool,
  sdrScotlandTool,
  superannuationContributionsTool,
  equipmentCapitalAllowanceTool,
  practiceOwnerIncomeBenchmarkTool,
  dentalTaxDeductionsTool,
  nhsPensionAaTaperTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
