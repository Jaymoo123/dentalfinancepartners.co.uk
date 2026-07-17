/**
 * Registry of Excel workbook builders, one per resource topic.
 *
 * Each entry maps a topic slug to its builder function. The generate-xlsx.ts
 * script loops this registry and writes public/resources/<topic>/<topic>-model.xlsx.
 *
 * Onboarding a new builder:
 *   1. Add builders/<topic>.ts exporting a build() function.
 *   2. Import and register it here.
 *   3. Run `npm run resources:xlsx` from Solicitors/web/.
 *   4. Flip the xlsx enabled flag in src/lib/resources/registry.ts.
 */
import type ExcelJS from "exceljs";
import { build as buildSraCompliance } from "./sra-compliance.js";
import { build as buildPartnershipLlp } from "./partnership-llp.js";
import { build as buildSuccessionSale } from "./succession-sale.js";
import { build as buildSolePractitioner } from "./sole-practitioner.js";
import { build as buildPracticeFinance } from "./practice-finance.js";
import { build as buildIncorporation } from "./incorporation.js";

/** A builder function that produces one ExcelJS workbook. */
export type WorkbookBuilder = () => ExcelJS.Workbook | Promise<ExcelJS.Workbook>;

/** One output workbook entry. */
export interface BuilderEntry {
  /** Topic segment used for the output path: /resources/<topic>/<topic>-model.xlsx */
  topic: string;
  /** Output filename within the topic folder */
  fileName: string;
  build: WorkbookBuilder;
}

export const BUILDERS: BuilderEntry[] = [
  {
    topic: "sra-compliance",
    fileName: "sra-compliance-model.xlsx",
    build: buildSraCompliance,
  },
  {
    topic: "partnership-llp",
    fileName: "partnership-llp-model.xlsx",
    build: buildPartnershipLlp,
  },
  {
    topic: "succession-sale",
    fileName: "succession-sale-model.xlsx",
    build: buildSuccessionSale,
  },
  {
    topic: "sole-practitioner",
    fileName: "sole-practitioner-model.xlsx",
    build: buildSolePractitioner,
  },
  {
    topic: "practice-finance",
    fileName: "practice-finance-model.xlsx",
    build: buildPracticeFinance,
  },
  {
    topic: "incorporation",
    fileName: "incorporation-model.xlsx",
    build: buildIncorporation,
  },
];
