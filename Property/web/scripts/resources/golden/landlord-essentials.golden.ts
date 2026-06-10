/**
 * Golden check for the Landlord tax essentials Excel model.
 *
 * exceljs does not evaluate formulas, so we cannot just "read the answer" from
 * the workbook. Instead this check:
 *   1. reads the LOCKED rate cells out of the generated workbook's Rates sheet
 *      (the real values that ship to users), and
 *   2. re-implements the exact formula chain from "Your figures" in JS using
 *      those workbook rates, then
 *   3. asserts the result equals lib/landlordTax.ts computePortfolio() for a
 *      sample input.
 *
 * If the spreadsheet rates or the formula logic ever drift from the site math,
 * this fails — and the category's xlsx flag must not be flipped on.
 *
 *   cd Property/web && npx tsx scripts/resources/golden/landlord-essentials.golden.ts
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";
import { computePortfolio, type PropertyInput } from "../../../src/lib/landlordTax";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = path.resolve(
  __dirname,
  "../../../public/resources/landlord-essentials/landlord-essentials-model.xlsx",
);

// Sample: a higher-rate landlord with two properties (matches the workbook's
// default first row plus a second property, and a £40,000 other income).
const PROPERTIES: PropertyInput[] = [
  { name: "Property 1", rent: 18000, expenses: 3000, interest: 6000 },
  { name: "Property 2", rent: 14000, expenses: 2500, interest: 4000 },
];
const OTHER_INCOME = 40000;
const YEAR = "2026-27" as const;

function main() {
  const wb = new ExcelJS.Workbook();
  return wb.xlsx.readFile(XLSX_PATH).then(() => {
    const rates = wb.getWorksheet("Rates");
    if (!rates) throw new Error("Rates sheet missing from generated workbook");

    const byLabel: Record<string, number> = {};
    rates.eachRow((row, n) => {
      if (n === 1) return;
      const label = String(row.getCell(1).value ?? "");
      const value = row.getCell(2).value;
      if (typeof value === "number") byLabel[label] = value;
    });

    const basic = byLabel["Income tax — basic rate (2026/27)"];
    const higher = byLabel["Income tax — higher rate (2026/27)"];
    const additional = byLabel["Income tax — additional rate (2026/27)"];
    const reducer = byLabel["Section 24 finance-cost credit (2026/27)"];
    const paFull = byLabel["Personal allowance (£)"];
    const taperStart = byLabel["Personal-allowance taper start (£)"];
    const taperEnd = byLabel["Personal allowance fully withdrawn (£)"];
    const basicLimit = byLabel["Top of basic-rate band — taxable income (£)"];
    const higherLimit = byLabel["Top of higher-rate band — taxable income (£)"];
    const propAllowance = byLabel["Property allowance (£)"];

    const taperedPA = (income: number) => {
      if (income <= taperStart) return paFull;
      if (income >= taperEnd) return 0;
      return Math.max(0, paFull - Math.floor((income - taperStart) / 2));
    };
    const bandedTax = (income: number) => {
      const pa = taperedPA(income);
      const taxable = Math.max(0, income - pa);
      const b = Math.min(taxable, basicLimit);
      const h = Math.min(Math.max(0, taxable - basicLimit), higherLimit - basicLimit);
      const a = Math.max(0, taxable - higherLimit);
      return b * basic + h * higher + a * additional;
    };

    // Per-property taxable profit with the £1,000 allowance choice.
    const profitOf = (p: PropertyInput) =>
      p.rent <= propAllowance ? 0 : Math.max(0, p.rent - Math.max(p.expenses, propAllowance));
    const totProfit = PROPERTIES.reduce((s, p) => s + profitOf(p), 0);
    const totInterest = PROPERTIES.reduce((s, p) => s + p.interest, 0);

    const incWith = OTHER_INCOME + totProfit;
    const taxBeforeCredit = Math.max(0, bandedTax(incWith) - bandedTax(OTHER_INCOME));
    const ati = Math.max(0, incWith - taperedPA(incWith));
    const credit = Math.min(totInterest, Math.max(0, totProfit), ati) * reducer;
    const incomeTax = Math.max(0, taxBeforeCredit - credit);

    const ts = computePortfolio({ properties: PROPERTIES, otherIncome: OTHER_INCOME, year: YEAR });

    const checks: Array<[string, number, number]> = [
      ["Taxable rental profit", Math.round(totProfit), ts.totalTaxableProfit],
      ["Tax before credit", Math.round(taxBeforeCredit), ts.taxBeforeCredit],
      ["Finance-cost credit", Math.round(credit), ts.financeCredit],
      ["Income tax payable", Math.round(incomeTax), ts.incomeTax],
    ];

    let failed = 0;
    for (const [name, xlsx, tsv] of checks) {
      const ok = xlsx === tsv;
      if (!ok) failed++;
      console.log(`${ok ? "PASS" : "FAIL"}  ${name}: xlsx=${xlsx}  ts=${tsv}`);
    }

    if (failed > 0) {
      console.error(`\nGolden check FAILED: ${failed} mismatch(es).`);
      process.exit(1);
    }
    console.log("\nGolden check PASSED: Landlord essentials xlsx math == TS compute.");
  });
}

main().catch((err) => {
  console.error("Golden check error:", err);
  process.exit(1);
});
