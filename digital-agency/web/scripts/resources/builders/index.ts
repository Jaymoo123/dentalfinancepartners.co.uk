/**
 * Registry of Excel workbook builders for Agency Founder Finance.
 * One builder per enabled category. Each produces a workbook with live formulas
 * that import the SAME constants as the site calculators so they can never drift.
 *
 * Run `npm run resources:xlsx --workspace digital-agency/web` to regenerate.
 *
 * Three builders: pay-planning (salary/dividend), exit (BADR CGT), compliance-vat (VAT).
 * Storage prefix: aff (FROZEN).
 */
import type ExcelJS from "exceljs";
import { build as buildSalaryDividend } from "./salary-dividend.js";
import { build as buildAgencyExitCgt } from "./agency-exit-cgt.js";
import { build as buildVatScheme } from "./vat-scheme.js";

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
    topic: "pay-planning",
    fileName: "salary-dividend-model.xlsx",
    build: buildSalaryDividend,
  },
  {
    topic: "exit",
    fileName: "agency-exit-cgt-model.xlsx",
    build: buildAgencyExitCgt,
  },
  {
    topic: "compliance-vat",
    fileName: "vat-scheme-model.xlsx",
    build: buildVatScheme,
  },
];
