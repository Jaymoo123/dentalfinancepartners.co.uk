/**
 * Solicitors site tool registry.
 *
 * Single source of truth for the calculator fleet. Gallery, sitemap, nav and
 * the dynamic [slug] route all read from here — nothing is hand-listed.
 *
 * Order controls display order on the gallery page.
 */
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { solicitorTakeHomeTool } from "./configs/solicitor-take-home";
import { fa2014SalariedMemberTool } from "./configs/fa2014-salaried-member";
import { llpProfitShareTool } from "./configs/llp-profit-share";
import { lawFirmValuationTool } from "./configs/law-firm-valuation";
import { sraClientAccountReserveTool } from "./configs/sra-client-account-reserve";
import { indemnityPremiumTool } from "./configs/indemnity-premium";

const tools = [
  solicitorTakeHomeTool,
  fa2014SalariedMemberTool,
  llpProfitShareTool,
  lawFirmValuationTool,
  sraClientAccountReserveTool,
  indemnityPremiumTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
