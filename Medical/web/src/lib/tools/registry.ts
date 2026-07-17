/**
 * Medical site tool registry.
 *
 * Single source of truth for the calculator fleet. Gallery, sitemap, nav and
 * the dynamic [slug] route all read from here — nothing is hand-listed.
 *
 * Order controls display order on the gallery page.
 */
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { nhsPensionTool } from "./configs/nhs-pension-calculator";
import { locumTaxTool } from "./configs/locum-tax-calculator";
import { incorporationTool } from "./configs/incorporation-calculator";
import { salariedDoctorTakeHomeTool } from "./configs/salaried-doctor-take-home";
import { doctorExpensesTaxReliefTool } from "./configs/doctor-expenses-tax-relief";

const tools = [
  nhsPensionTool,
  locumTaxTool,
  incorporationTool,
  salariedDoctorTakeHomeTool,
  doctorExpensesTaxReliefTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
