/**
 * Registry of Excel workbook builders for Dental Finance Partners.
 * One builder per category. Each produces a workbook with live formulas that
 * import the SAME constants as the site calculators so they can never drift.
 *
 * Run `npm run resources:xlsx --workspace Dentists/web` to regenerate all files.
 */
import type ExcelJS from "exceljs";
import { build as buildAssociate } from "./associate.js";
import { build as buildPrincipal } from "./principal.js";
import { build as buildPracticePurchase } from "./practice-purchase.js";
import { build as buildPracticeSale } from "./practice-sale.js";
import { build as buildUdaValue } from "./uda-value.js";

/** A builder produces one workbook for one category. */
export type WorkbookBuilder = () => ExcelJS.Workbook | Promise<ExcelJS.Workbook>;

/** One output workbook: the topic segment + its builder. */
export interface BuilderEntry {
  /** topic segment, used for the output path /resources/<topic>/<filename> */
  topic: string;
  /** output filename within the topic folder */
  fileName: string;
  build: WorkbookBuilder;
}

export const BUILDERS: BuilderEntry[] = [
  {
    topic: "associate",
    fileName: "associate-model.xlsx",
    build: buildAssociate,
  },
  {
    topic: "principal",
    fileName: "principal-extraction-model.xlsx",
    build: buildPrincipal,
  },
  {
    topic: "buying",
    fileName: "practice-purchase-model.xlsx",
    build: buildPracticePurchase,
  },
  {
    topic: "selling",
    fileName: "practice-sale-model.xlsx",
    build: buildPracticeSale,
  },
  {
    topic: "nhs",
    fileName: "uda-value-model.xlsx",
    build: buildUdaValue,
  },
];
