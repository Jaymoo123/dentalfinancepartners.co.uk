/**
 * Private practice incorporation comparison Excel model builder for Medical Accountants UK.
 *
 * Produces a workbook with live formulas tracing calcIncorporation() from
 * src/lib/tools/compute/incorporation.ts. Constants are mirrored literally
 * from the compute lib (option 2 per section 0.E) with traced comments;
 * the golden test (incorporation.test.ts) is the drift guard.
 *
 * CORRECTED 2026-09-01 to match the compute lib fix (wave C defects A, B, C):
 * director salary AND employer NIC are deducted from company profit BEFORE
 * corporation tax; CT charges the real CTA 2010 Part 3 bands (19% to £50,000,
 * 25% at £250,000+, marginal relief fraction 3/200 between); employer NIC is
 * 15% of salary above the £5,000 secondary threshold. The workbook and the
 * live calculator now agree (see incorporation.test.ts).
 *
 * Golden cases (recomputed against the corrected compute lib):
 *   DEFAULT (INC-A): privateIncome=100000, expenses=15000, salary=12570, nhs=50000
 *     -> stProfit=85000, employerNIC=1135.50, chargeableProfit=71294.50 (marginal band)
 *        CT=15143.0425, dividendAmount=56151.4575, dividendTax=19895.396056
 *        payeIncomeTax=12460, limitedCompanyTotalTax=48633.938556
 *        soleTraderTotalTax=49909.6, taxSavings=1275.661444
 *   WORKED EXAMPLE (matches medical-tools.test.ts): private=120000, expenses=20000,
 *   salary=20000, nhs=30000
 *     -> employerNIC=2250, chargeableProfit=77750, CT=16853.75, dividendAmount=60896.25,
 *        dividendTax=21524.159375, payeIncomeTax=7486, limitedCompanyTotalTax=48113.909375,
 *        soleTraderTotalTax=47959.6, taxSavings=-154.309375
 *
 * NHS Pension impact row is ALWAYS present (compliance non-negotiable, HP section 2.C).
 * Company dividends are not NHS pensionable.
 *
 * Brand: Medical Accountants UK (navy #001b3d, copper #b87333).
 * No em-dashes in any cell text. No "DJH". Creator = "Medical Accountants UK".
 * Dividend rates: 2026/27 (from 6 April 2026, FA 2026 s.4).
 */
import ExcelJS from "exceljs";

// ---- Colours (Medical Accountants UK brand) ----
const NAVY = "FF001b3d";
const COPPER = "FFb87333";
const COPPER_LIGHT = "FFF5EDE0";
const WHITE = "FFFFFFFF";
const INK = "FF001b3d";

// ---- Locked constants: traced to src/lib/tools/compute/incorporation.ts ----
// Income tax 2026/27 (unchanged from 2025/26; gov.uk/income-tax-rates, verified 2026-08-26)
const PA = 12570;                  // traced: PERSONAL_ALLOWANCE
const BRL = 50270;                 // traced: BASIC_RATE_LIMIT
const HRL = 125140;                // traced: HIGHER_RATE_LIMIT
// Class 4 NIC (on sole-trader private profit)
const NI_LOWER = 12570;            // traced: NI_LOWER_LIMIT
const NI_UPPER = 50270;            // traced: NI_UPPER_LIMIT
const C4_MAIN = 0.06;              // traced: 0.06 (6%: NOT the abolished 9%)
const C4_UPPER = 0.02;             // traced: 0.02
// Corporation tax, CTA 2010 Part 3 ss.18-19 (traced: calcCorporationTax)
const CT_SMALL = 0.19;             // traced: CT_SMALL_PROFITS_RATE
const CT_MAIN = 0.25;              // traced: CT_MAIN_RATE
const CT_LOWER = 50000;            // traced: CT_LOWER_LIMIT
const CT_UPPER = 250000;           // traced: CT_UPPER_LIMIT
const CT_MARGIN = 3 / 200;         // traced: CT_MARGINAL_RELIEF_FRACTION
// Employer secondary Class 1 NIC, from 6 April 2025 (traced: EMPLOYER_NIC_RATE / _THRESHOLD)
const EMP_NIC_RATE = 0.15;
const EMP_NIC_THRESHOLD = 5000;
// Dividend allowance and rates 2026/27 (FA 2026 s.4, from 6 April 2026)
const DIV_ALLOWANCE = 500;         // traced: DIVIDEND_ALLOWANCE
const DIV_BASIC = 0.1075;          // traced: DIVIDEND_BASIC_RATE
const DIV_HIGHER = 0.3575;         // traced: DIVIDEND_HIGHER_RATE
const DIV_ADDITIONAL = 0.3935;     // traced: DIVIDEND_ADDITIONAL_RATE

// ---- Shared style helpers ----
function navyHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  cell.alignment = { vertical: "middle" };
}

function copperHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COPPER } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function copperInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COPPER_LIGHT } };
  cell.protection = { locked: false };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0";
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

// Income tax helper formula string (replicates calcIncomeTax in incorporation.ts)
// taxableAfterPA = MAX(0, income - PA)
// basic = MIN(taxableAfterPA, BRL-PA); higher = MIN(MAX(0, ...), HRL-BRL); additional = MAX(0, ...)
function incomeTaxFormula(incomeCell: string): string {
  return (
    `LET(t,MAX(0,${incomeCell}-PA),` +
    `basic,MIN(t,BRL-PA),` +
    `higher,IF(t>BRL-PA,MIN(t-(BRL-PA),HRL-BRL),0),` +
    `additional,IF(t>HRL-PA,t-(HRL-PA),0),` +
    `basic*0.2+higher*0.4+additional*0.45)`
  );
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Medical Accountants UK";
  wb.lastModifiedBy = "Medical Accountants UK";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: NAVY } },
  });
  rates.columns = [
    { key: "label", width: 72 },
    { key: "value", width: 18 },
  ];
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit (2026/27 basis, verified 1 September 2026)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PA", label: "Income tax: personal allowance (GBP): 2026/27", value: PA },
    { name: "BRL", label: "Income tax: basic rate upper limit (GBP): 2026/27", value: BRL },
    { name: "HRL", label: "Income tax: higher rate upper limit (GBP): 2026/27", value: HRL },
    { name: "NI_LOWER", label: "Class 4 NIC: lower profits limit (GBP): 2026/27", value: NI_LOWER },
    { name: "NI_UPPER", label: "Class 4 NIC: upper profits limit (GBP): 2026/27", value: NI_UPPER },
    { name: "C4_MAIN", label: "Class 4 NIC: main rate 6% (NOT the abolished 9%): 2026/27", value: C4_MAIN, pct: true },
    { name: "C4_UPPER_RATE", label: "Class 4 NIC: upper rate 2%: 2026/27", value: C4_UPPER, pct: true },
    { name: "CT_SMALL", label: "Corporation tax: small profits rate 19%, profits up to GBP50,000 (CTA 2010 Part 3)", value: CT_SMALL, pct: true },
    { name: "CT_MAIN", label: "Corporation tax: main rate 25%, profits GBP250,000 and above (CTA 2010 Part 3)", value: CT_MAIN, pct: true },
    { name: "CT_LOWER", label: "Corporation tax: small profits limit (GBP)", value: CT_LOWER },
    { name: "CT_UPPER", label: "Corporation tax: main rate threshold (GBP)", value: CT_UPPER },
    { name: "CT_MARGIN", label: "Corporation tax: marginal relief fraction 3/200, between the two limits", value: CT_MARGIN, pct: true },
    { name: "EMP_NIC_RATE", label: "Employer secondary Class 1 NIC: 15%, from 6 April 2025", value: EMP_NIC_RATE, pct: true },
    { name: "EMP_NIC_THRESHOLD", label: "Employer secondary Class 1 NIC: secondary threshold (GBP)", value: EMP_NIC_THRESHOLD },
    { name: "DIV_ALLOWANCE", label: "Dividend allowance (GBP): from 6 April 2026 (FA 2026 s.4)", value: DIV_ALLOWANCE },
    { name: "DIV_BASIC", label: "Dividend tax: basic rate 10.75%: from 6 April 2026 (FA 2026 s.4)", value: DIV_BASIC, pct: true },
    { name: "DIV_HIGHER", label: "Dividend tax: higher rate 35.75%: from 6 April 2026 (FA 2026 s.4)", value: DIV_HIGHER, pct: true },
    { name: "DIV_ADDITIONAL", label: "Dividend tax: additional rate 39.35%: from 6 April 2026 (FA 2026 s.4)", value: DIV_ADDITIONAL, pct: true },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0.00%" : "#,##0.######";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: COPPER } },
  });
  ws.columns = [
    { key: "a", width: 46 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 40 },
    { key: "e", width: 18 },
    { key: "f", width: 4 },
    { key: "g", width: 40 },
    { key: "h", width: 18 },
  ];

  navyHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs ----
  labelCell(ws.getCell("A3"), "Private practice income for the year (GBP)");
  ws.getCell("B3").value = 100000;
  moneyFmt(ws.getCell("B3"));
  copperInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_PrivateIncome");

  labelCell(ws.getCell("A4"), "Practice expenses (GBP)");
  ws.getCell("B4").value = 15000;
  moneyFmt(ws.getCell("B4"));
  copperInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_Expenses");

  labelCell(ws.getCell("A5"), "Your NHS (PAYE) income for the year (GBP)");
  ws.getCell("B5").value = 50000;
  moneyFmt(ws.getCell("B5"));
  copperInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_NhsIncome");

  labelCell(ws.getCell("A6"), "Director salary from the company (GBP)");
  ws.getCell("B6").value = 12570;
  moneyFmt(ws.getCell("B6"));
  copperInput(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_Salary");

  // ---- Sole trader calculations ----
  navyHeader(ws.getCell("A8"), "Sole trader");
  ws.mergeCells("A8:B8");

  // stProfit = privateIncome - expenses
  labelCell(ws.getCell("A9"), "Private practice profit (GBP)");
  ws.getCell("B9").value = { formula: "In_PrivateIncome-In_Expenses" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "ST_Profit");

  // stTaxableIncome = stProfit + nhsIncome
  labelCell(ws.getCell("A10"), "Total taxable income (GBP)");
  ws.getCell("B10").value = { formula: "ST_Profit+In_NhsIncome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "ST_TaxableIncome");

  // Income tax on (stTaxableIncome - PA)
  labelCell(ws.getCell("A11"), "Income tax (GBP)");
  ws.getCell("B11").value = { formula: incomeTaxFormula("ST_TaxableIncome") } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "ST_IncomeTax");

  // Class 4 NIC on stProfit only (private practice profit, NOT nhsIncome)
  labelCell(ws.getCell("A12"), "Class 4 NIC on practice profit (GBP)");
  ws.getCell("B12").value = {
    formula:
      "IF(ST_Profit<=NI_LOWER,0," +
      "(MIN(ST_Profit,NI_UPPER)-NI_LOWER)*C4_MAIN+" +
      "MAX(0,ST_Profit-NI_UPPER)*C4_UPPER_RATE)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "ST_Class4");

  // Total tax sole trader
  labelCell(ws.getCell("A13"), "Total tax and NIC (GBP)");
  ws.getCell("B13").value = { formula: "ST_IncomeTax+ST_Class4" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  ws.getCell("B13").font = { bold: true };
  ws.getCell("A13").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$13", "ST_TotalTax");

  // Net income: cash in hand after all tax and NIC. Same definition as LTD_NetIncome.
  labelCell(ws.getCell("A14"), "Net income after tax (GBP)");
  ws.getCell("B14").value = { formula: "ST_TaxableIncome-ST_TotalTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  ws.getCell("B14").font = { bold: true };
  ws.getCell("A14").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$14", "ST_NetIncome");

  // ---- Limited company calculations ----
  navyHeader(ws.getCell("A16"), "Limited company");
  ws.mergeCells("A16:B16");

  // companyProfit = privateIncome - expenses
  labelCell(ws.getCell("A17"), "Company profit before salary and tax (GBP)");
  ws.getCell("B17").value = { formula: "In_PrivateIncome-In_Expenses" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "LTD_CompanyProfit");

  // employerNIC = MAX(0, (salary - threshold)) * rate, deductible before CT
  labelCell(ws.getCell("A18"), "Employer NIC on director salary (GBP)");
  ws.getCell("B18").value = {
    formula: "MAX(0,(In_Salary-EMP_NIC_THRESHOLD)*EMP_NIC_RATE)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  wb.definedNames.add("'Your figures'!$B$18", "LTD_EmployerNIC");

  // chargeableProfit = companyProfit - salary - employerNIC (both deductible before CT)
  labelCell(ws.getCell("A19"), "Profit chargeable to corporation tax (GBP)");
  ws.getCell("B19").value = {
    formula: "MAX(0,LTD_CompanyProfit-In_Salary-LTD_EmployerNIC)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B19"));
  wb.definedNames.add("'Your figures'!$B$19", "LTD_ChargeableProfit");

  // Corporation tax: CTA 2010 Part 3 bands with marginal relief between the limits.
  labelCell(ws.getCell("A20"), "Corporation tax (GBP, 19% to 25% with marginal relief)");
  ws.getCell("B20").value = {
    formula:
      "IF(LTD_ChargeableProfit<=CT_LOWER,LTD_ChargeableProfit*CT_SMALL," +
      "IF(LTD_ChargeableProfit>=CT_UPPER,LTD_ChargeableProfit*CT_MAIN," +
      "LTD_ChargeableProfit*CT_MAIN-CT_MARGIN*(CT_UPPER-LTD_ChargeableProfit)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B20"));
  wb.definedNames.add("'Your figures'!$B$20", "LTD_CT");

  // dividendAmount = chargeableProfit - CT (salary is already out, so nothing further to deduct)
  labelCell(ws.getCell("A21"), "Available dividends (GBP)");
  ws.getCell("B21").value = { formula: "LTD_ChargeableProfit-LTD_CT" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));
  wb.definedNames.add("'Your figures'!$B$21", "LTD_DividendAmount");

  // taxableDividends = MAX(0, dividendAmount - DIV_ALLOWANCE)
  labelCell(ws.getCell("A22"), "Taxable dividends after allowance (GBP)");
  ws.getCell("B22").value = { formula: "MAX(0,LTD_DividendAmount-DIV_ALLOWANCE)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B22"));
  wb.definedNames.add("'Your figures'!$B$22", "LTD_TaxableDividends");

  // totalIncomeBeforeDividends = nhsIncome + salary
  labelCell(ws.getCell("A23"), "Income before dividends (NHS + salary, GBP)");
  ws.getCell("B23").value = { formula: "In_NhsIncome+In_Salary" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  wb.definedNames.add("'Your figures'!$B$23", "LTD_IncomeBeforeDiv");

  // Dividend tax: mirror calcIncorporation branch logic
  // basicRateRemaining = MAX(0, BRL - totalIncomeBeforeDividends)
  // LET-free (LET is Excel-365-only; older Excel/LibreOffice show #NAME?).
  // Banded: basic slice to BRL headroom, higher slice to HRL headroom, rest additional.
  labelCell(ws.getCell("A24"), "Dividend tax (GBP)");
  ws.getCell("B24").value = {
    formula:
      "IF(LTD_TaxableDividends<=0,0," +
      "MIN(LTD_TaxableDividends,MAX(0,BRL-LTD_IncomeBeforeDiv))*DIV_BASIC" +
      "+MIN(MAX(0,LTD_TaxableDividends-MAX(0,BRL-LTD_IncomeBeforeDiv)),MAX(0,HRL-MAX(LTD_IncomeBeforeDiv,BRL)))*DIV_HIGHER" +
      "+MAX(0,LTD_TaxableDividends-MAX(0,BRL-LTD_IncomeBeforeDiv)-MAX(0,HRL-MAX(LTD_IncomeBeforeDiv,BRL)))*DIV_ADDITIONAL)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B24"));
  wb.definedNames.add("'Your figures'!$B$24", "LTD_DividendTax");

  // PAYE income tax on the NHS salary AND the director salary together (they are
  // the same income for income-tax purposes; taxed jointly, not the NHS side alone).
  labelCell(ws.getCell("A25"), "PAYE income tax on NHS + salary (GBP)");
  ws.getCell("B25").value = { formula: incomeTaxFormula("LTD_IncomeBeforeDiv") } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B25"));
  wb.definedNames.add("'Your figures'!$B$25", "LTD_PayeIncomeTax");

  // limitedCompanyTotalTax = CT + employerNIC + divTax + payeIncomeTax
  labelCell(ws.getCell("A26"), "Limited company total tax (GBP)");
  ws.getCell("B26").value = {
    formula: "LTD_CT+LTD_EmployerNIC+LTD_DividendTax+LTD_PayeIncomeTax",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B26"));
  ws.getCell("B26").font = { bold: true };
  ws.getCell("A26").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$26", "LTD_TotalTax");

  // Net income: cash in hand after all tax and NIC. CT and employer NIC are
  // already out of dividendAmount; this also strips dividend tax and PAYE
  // income tax. Same definition as ST_NetIncome.
  labelCell(ws.getCell("A27"), "Net income after tax (GBP)");
  ws.getCell("B27").value = {
    formula: "In_NhsIncome+In_Salary+LTD_DividendAmount-LTD_DividendTax-LTD_PayeIncomeTax",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B27"));
  ws.getCell("B27").font = { bold: true };
  ws.getCell("A27").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$27", "LTD_NetIncome");

  // ---- Comparison ----
  navyHeader(ws.getCell("A29"), "Comparison");
  ws.mergeCells("A29:B29");

  // taxSavings = soleTraderTotalTax - limitedCompanyTotalTax (NEGATIVE means incorporating costs more)
  labelCell(ws.getCell("A30"), "Tax savings from incorporating (GBP, negative = costs more)");
  ws.getCell("B30").value = { formula: "ST_TotalTax-LTD_TotalTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B30"));
  ws.getCell("B30").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("A30").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$30", "TaxSavings");

  // savingsPerMonth
  labelCell(ws.getCell("A31"), "Saving per month (GBP, negative = costs more per month)");
  ws.getCell("B31").value = { formula: "TaxSavings/12" } as ExcelJS.CellFormulaValue;
  ws.getCell("B31").numFmt = "£#,##0.00";
  wb.definedNames.add("'Your figures'!$B$31", "SavingsPerMonth");

  // Conservation check
  labelCell(ws.getCell("A33"), "Check: taxSavings = ST_TotalTax - LTD_TotalTax");
  ws.getCell("B33").value = {
    formula: 'IF(ABS(TaxSavings-(ST_TotalTax-LTD_TotalTax))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;

  // ---- NHS PENSION IMPACT ROW (MANDATORY, HP section 2.C) ----
  // Always present: compliance non-negotiable. Company dividends are not NHS pensionable.
  ws.getCell("A35").value = "NHS PENSION IMPACT (IMPORTANT)";
  ws.getCell("A35").font = { bold: true, color: { argb: NAVY }, size: 11 };
  ws.getCell("B35").value = "See Notes";
  ws.getCell("A36").value =
    "Company dividends are not NHS pensionable, so incorporated private income loses NHS accrual.";
  ws.getCell("A36").font = { color: { argb: NAVY }, italic: true };
  ws.getCell("A36").alignment = { wrapText: true };
  ws.getRow(36).height = 28;

  // ---- Results panel (right side D-H columns) ----
  copperHeader(ws.getCell("D1"), "Sole trader");
  ws.mergeCells("D1:E1");
  copperHeader(ws.getCell("G1"), "Limited company");
  ws.mergeCells("G1:H1");

  const stResults: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Private income", formula: "In_PrivateIncome" },
    { row: 4, label: "Expenses", formula: "In_Expenses" },
    { row: 5, label: "NHS income", formula: "In_NhsIncome" },
    { row: 6, label: "Practice profit", formula: "ST_Profit", strong: true },
    { row: 8, label: "Income tax", formula: "ST_IncomeTax" },
    { row: 9, label: "Class 4 NIC", formula: "ST_Class4" },
    { row: 10, label: "Total tax and NIC", formula: "ST_TotalTax", strong: true },
    { row: 11, label: "Net income", formula: "ST_NetIncome", strong: true },
  ];
  for (const r of stResults) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: NAVY } };
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) c.font = { bold: true, color: { argb: NAVY } };
  }

  const ltdResults: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Company profit", formula: "LTD_CompanyProfit" },
    { row: 4, label: "Employer NIC", formula: "LTD_EmployerNIC" },
    { row: 5, label: "Chargeable profit (after salary and employer NIC)", formula: "LTD_ChargeableProfit" },
    { row: 6, label: "Corporation tax (19% to 25%)", formula: "LTD_CT" },
    { row: 7, label: "Director salary", formula: "In_Salary" },
    { row: 8, label: "Dividend amount", formula: "LTD_DividendAmount" },
    { row: 9, label: "Dividend tax", formula: "LTD_DividendTax" },
    { row: 10, label: "PAYE income tax (NHS + salary)", formula: "LTD_PayeIncomeTax" },
    { row: 11, label: "Total tax", formula: "LTD_TotalTax", strong: true },
    { row: 12, label: "Net income", formula: "LTD_NetIncome", strong: true },
  ];
  for (const r of ltdResults) {
    labelCell(ws.getCell(`G${r.row}`), r.label);
    if (r.strong) ws.getCell(`G${r.row}`).font = { bold: true, color: { argb: NAVY } };
    const c = ws.getCell(`H${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) c.font = { bold: true, color: { argb: NAVY } };
  }

  // Tax savings row
  labelCell(ws.getCell("D14"), "Tax saving (negative = incorporating costs more)");
  ws.getCell("D14").font = { bold: true, color: { argb: NAVY } };
  const savCell = ws.getCell("E14");
  savCell.value = { formula: "TaxSavings" } as ExcelJS.CellFormulaValue;
  savCell.numFmt = "£#,##0.00";
  savCell.font = { bold: true, color: { argb: NAVY } };
  ws.mergeCells("D14:H14");

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: COPPER } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Private practice incorporation comparison model", true],
    ["Medical Accountants UK", false],
    ["", false],
    ["This model compares the tax position of taking private practice income as a sole", false],
    ["trader versus through a limited company, on the same income, using 2026/27 income", false],
    ["tax, Class 4 NIC, employer NIC, corporation tax and dividend tax rates.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells: private income, expenses, NHS income, director salary.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["NHS PENSION WARNING:", true],
    ["Company dividends are NOT NHS pensionable. A limited company cannot hold a GMS", false],
    ["or PMS contract. Incorporating your private income means you lose NHS pension", false],
    ["accrual on those dividends. This is mandatory context for any decision.", false],
    ["", false],
    ["The 'Rates' tab holds the locked rates. Do not edit it.", false],
    ["See 'Notes' for assumptions and limitations.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 14 : 12, color: { argb: NAVY } };
  });

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "IMPORTANT: NHS Pension",
    "Company dividends are NOT NHS pensionable. A limited company cannot hold a GMS or PMS",
    "contract and company income is not NHS pensionable. Incorporated private income loses",
    "NHS accrual on dividends. This cost can exceed the tax saving over a career. Always",
    "model both sides before deciding.",
    "",
    "Corporation tax",
    "This model charges the real CTA 2010 Part 3 bands: 19% on profits up to GBP50,000,",
    "25% on profits at GBP250,000 and above, and marginal relief in between (fraction 3/200).",
    "Director salary and employer NIC are deducted from company profit before corporation",
    "tax, because both are deductible expenses of the company.",
    "",
    "Employer National Insurance",
    "Employer secondary Class 1 NIC is charged at 15% on director salary above the GBP5,000",
    "secondary threshold, from 6 April 2025. No Employment Allowance is applied: a company",
    "whose only employee is a single director cannot claim it.",
    "",
    "Not modelled",
    "  - Associated companies. The GBP50,000 and GBP250,000 corporation tax limits are not",
    "    divided between associated companies.",
    "  - Employment Allowance is not applied (see above).",
    "  - Employee primary Class 1 NIC on the director salary is not modelled.",
    "  - Company running costs, accountancy fees and year-1 incorporation costs.",
    "These reduce the advantage of incorporating further.",
    "",
    "Income tax: 2026/27 rates, verified 1 September 2026 and unchanged from 2025/26.",
    "PA GBP12,570; basic 20% to GBP50,270; higher 40% to GBP125,140; 45% above.",
    "",
    "Class 4 NIC: 6% on sole-trader private practice profit between GBP12,570 and GBP50,270,",
    "2% above. Class 2 removed from 6 April 2024.",
    "",
    "Dividend rates: 2026/27 (FA 2026 s.4, from 6 April 2026).",
    "GBP500 allowance. Basic 10.75%, higher 35.75%, additional 39.35%.",
    "s.455 charge: overdrawn director's loan account still outstanding 9 months and 1 day",
    "after the year end is charged at 35.75% (from 6 April 2026). Repayable under s.458.",
    "",
    "This is a directional model. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: NAVY } };
    if (i === 2 || i === 8 || i === 14 || i === 19) c.font = { bold: true, color: { argb: NAVY } };
  });

  // Tab order: Start here, Your figures, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}

// Suppress unused import warning
void pctFmt;
