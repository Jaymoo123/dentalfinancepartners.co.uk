/**
 * Registry of Excel workbook builders, one per category.
 *
 * Each builder is a function `build(): ExcelJS.Workbook` (or Promise) that
 * constructs a workbook with live formulas, importing the SAME locked constants
 * the site calculators use so the spreadsheet and the site can never drift.
 *
 * Add one entry here when a new builder is authored, then run:
 *   npm run resources:xlsx
 */
import type ExcelJS from "exceljs";
import { build as buildDirectorPay } from "./director-pay";
import { build as buildIncorporation } from "./incorporation";
import { build as buildVatScheme } from "./vat-scheme";
import { build as buildPayroll } from "./payroll";
import { build as buildRdRelief } from "./rd-relief";
import { build as buildBadrExit } from "./badr-exit";
import { build as buildCompliance } from "./compliance";

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
    topic: "director-pay",
    fileName: "director-pay-model.xlsx",
    build: buildDirectorPay,
  },
  {
    topic: "incorporation",
    fileName: "incorporation-model.xlsx",
    build: buildIncorporation,
  },
  {
    topic: "vat-mtd",
    fileName: "vat-scheme-model.xlsx",
    build: buildVatScheme,
  },
  {
    topic: "payroll",
    fileName: "employer-cost-model.xlsx",
    build: buildPayroll,
  },
  {
    topic: "rnd",
    fileName: "rd-relief-model.xlsx",
    build: buildRdRelief,
  },
  {
    topic: "exit-cgt",
    fileName: "badr-exit-model.xlsx",
    build: buildBadrExit,
  },
  {
    topic: "compliance",
    fileName: "compliance-pack.xlsx",
    build: buildCompliance,
  },
];
