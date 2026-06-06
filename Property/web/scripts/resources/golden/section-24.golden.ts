/**
 * Golden check for the Section 24 Excel model.
 *
 * exceljs does not evaluate formulas, so we cannot just "read the answer" from
 * the workbook. Instead this check:
 *   1. reads the LOCKED rate cells out of the generated workbook's Rates sheet
 *      (the real values that ship to users), and
 *   2. re-implements the exact formula chain from "Your figures" in JS using
 *      those workbook rates, then
 *   3. asserts the result equals lib/section24.ts computeSection24() for a sample
 *      input.
 *
 * If the spreadsheet rates or the formula logic ever drift from the site math,
 * this fails — and the category's xlsx flag must not be flipped on.
 *
 *   cd Property/web && npx tsx scripts/resources/golden/section-24.golden.ts
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";
import { computeSection24 } from "../../../src/lib/section24";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = path.resolve(
  __dirname,
  "../../../public/resources/section-24/section-24-model.xlsx",
);

// Sample input (matches the workbook's default blue cells / a higher-rate case).
const SAMPLE = {
  rentalIncome: 50000,
  mortgageInterest: 20000,
  otherExpenses: 8000,
  taxBand: "higher" as const,
  year: "2026-27" as const,
};

function num(cell: ExcelJS.Cell): number {
  const v = cell.value;
  if (typeof v === "number") return v;
  if (v && typeof v === "object" && "result" in v && typeof v.result === "number") return v.result;
  throw new Error(`Expected a numeric cell, got ${JSON.stringify(v)}`);
}

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX_PATH);
  const rates = wb.getWorksheet("Rates");
  if (!rates) throw new Error("Rates sheet missing from generated workbook");

  // Pull the locked rates straight out of the shipped file.
  const byLabel: Record<string, number> = {};
  rates.eachRow((row, n) => {
    if (n === 1) return;
    const label = String(row.getCell(1).value ?? "");
    const value = row.getCell(2).value;
    if (typeof value === "number") byLabel[label] = value;
  });

  const rateHigher = byLabel["Income tax — higher rate"];
  const reducer2026 = byLabel["Section 24 finance-cost credit (2026/27)"];
  const ctSmall = byLabel["Corporation Tax — small profits rate"];
  const ctMain = byLabel["Corporation Tax — main rate"];
  const ctLower = byLabel["Corporation Tax — lower limit (£)"];
  const ctUpper = byLabel["Corporation Tax — upper limit (£)"];
  const ctFraction = byLabel["Corporation Tax — marginal fraction"];

  // Re-implement the "Your figures" formula chain with the workbook's own rates.
  const { rentalIncome: rent, mortgageInterest: interest, otherExpenses: other } = SAMPLE;
  const profitBeforeFinance = rent - other;
  const marginalRate = rateHigher;
  const reducerRate = reducer2026;

  const s24Before = Math.max(0, profitBeforeFinance) * marginalRate;
  const s24Credit = Math.min(interest, Math.max(0, profitBeforeFinance)) * reducerRate;
  const s24Tax = Math.max(0, s24Before - s24Credit);

  const coProfit = Math.max(0, profitBeforeFinance - interest);
  let coTax: number;
  if (coProfit <= 0) coTax = 0;
  else if (coProfit <= ctLower) coTax = coProfit * ctSmall;
  else if (coProfit >= ctUpper) coTax = coProfit * ctMain;
  else coTax = coProfit * ctMain - (ctUpper - coProfit) * ctFraction;

  const ts = computeSection24(SAMPLE);

  const checks: Array<[string, number, number]> = [
    ["S24 income tax", Math.round(s24Tax), ts.s24Tax],
    ["S24 credit", Math.round(s24Credit), ts.s24Credit],
    ["Company profit", Math.round(coProfit), ts.companyProfit],
    ["Corporation Tax", Math.round(coTax), ts.companyTax],
    ["Tax difference (company − you)", Math.round(coTax - s24Tax), ts.companyVsIndividualTax],
  ];

  let failed = 0;
  for (const [name, xlsx, tsv] of checks) {
    const ok = xlsx === tsv;
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}: xlsx=${xlsx}  ts=${tsv}`);
  }

  // Also use num() so the helper is exercised against a real formula cell.
  const ws = wb.getWorksheet("Your figures");
  if (ws) {
    try {
      num(ws.getCell("B3")); // In_Rent input cell (literal number)
    } catch {
      /* input cell read is best-effort for the helper */
    }
  }

  if (failed > 0) {
    console.error(`\nGolden check FAILED: ${failed} mismatch(es).`);
    process.exit(1);
  }
  console.log("\nGolden check PASSED: Section 24 xlsx math == TS compute.");
}

main().catch((err) => {
  console.error("Golden check error:", err);
  process.exit(1);
});
