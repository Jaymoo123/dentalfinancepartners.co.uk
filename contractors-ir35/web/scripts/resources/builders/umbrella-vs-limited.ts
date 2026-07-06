/**
 * Umbrella vs limited company structure-choice Excel model builder.
 * Contractor Tax Accountants (cfp). Brand: petrol-cyan #0e7490.
 *
 * Same take-home primitives as the IR35 comparison but framed as a structure-choice
 * decision for a contractor who is, or expects to be, outside IR35. Includes an
 * accountancy fee row so the net benefit of limited (after running costs) is visible.
 *
 * Traced to: limitedTakeHome() and umbrellaTakeHome() in tax2026.ts.
 *
 * Golden case (brief section 2):
 *   dayRate=500, billableDays=240, salary=12570, expenses=6000,
 *   umbrellaMargin=1200, accountFees=2000
 *   -> limitedNet = limitedTakeHome({turnover:120000,salary:12570,expenses:6000}).netTakeHome
 *                 = 71820.95
 *   -> umbrellaNet = umbrellaTakeHome({assignmentIncome:120000,umbrellaMargin:1200}).netTakeHome
 *                  = 69889.87
 *   -> rawGap = 1931.08
 *   -> netBenefit (after GBP2k fees) = 1931.08 - 2000 = -68.92
 *      (default scenario: umbrella marginally ahead after fees; changes with a higher day rate)
 *
 * LET-free formulas: banded MIN/MAX/IF (never LET()).
 * No em-dashes. No "DJH". Creator = "Contractor Tax Accountants". 2026/27 rates.
 */
import ExcelJS from "exceljs";

// ---- Brand colours (cfp: petrol-cyan + neutral) ----
const CYAN = "FF0E7490";
const CYAN_LIGHT = "FFECFEFF";
const WHITE = "FFFFFFFF";
const INK = "FF0A0A0A";
const NEUTRAL_100 = "FFF5F5F5";

// ---- Locked constants: traced to src/lib/calculators/tax2026.ts ----
const PA = 12570;
const BASIC_RATE_LIMIT = 37700;
const HIGHER_RATE_LIMIT = 112570;
const DIV_ALLOWANCE = 500;
const DIV_BASIC = 0.1075;
const DIV_HIGHER = 0.3575;
const DIV_ADDITIONAL = 0.3935;
const EE_PT = 12570;
const EE_UEL = 50270;
const EE_MAIN = 0.08;
const EE_UPPER = 0.02;
const ER_ST = 5000;
const ER_RATE = 0.15;
const LEVY = 0.005;
const CT_SMALL = 0.19;
const CT_MAIN = 0.25;
const CT_LOWER = 50000;
const CT_UPPER = 250000;
const CT_FRAC = 3 / 200;

// ---- Style helpers ----
function cyanHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CYAN } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function helperLabel(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: "FF737373" }, italic: true, size: 10 };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0.00";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Contractor Tax Accountants";
  wb.lastModifiedBy = "Contractor Tax Accountants";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: CYAN } },
  });
  rates.columns = [
    { key: "label", width: 80 },
    { key: "value", width: 18 },
  ];
  cyanHeader(rates.getCell("A1"), "Locked rates: do not edit (2026/27, traced to tax2026.ts)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PA",               label: "Personal allowance (GBP): 2026/27", value: PA },
    { name: "BASIC_RATE_LIMIT", label: "Basic rate band taxable-income limit (GBP): 2026/27", value: BASIC_RATE_LIMIT },
    { name: "HIGHER_RATE_LIMIT", label: "Higher rate taxable-income upper (GBP): 2026/27", value: HIGHER_RATE_LIMIT },
    { name: "DIV_ALLOWANCE",    label: "Dividend allowance (GBP): from 6 April 2026 (FA 2026 s.4)", value: DIV_ALLOWANCE },
    { name: "DIV_BASIC",        label: "Dividend tax: basic rate 10.75%: from 6 April 2026 (FA 2026 s.4)", value: DIV_BASIC, pct: true },
    { name: "DIV_HIGHER",       label: "Dividend tax: higher rate 35.75%: from 6 April 2026 (FA 2026 s.4)", value: DIV_HIGHER, pct: true },
    { name: "DIV_ADDITIONAL",   label: "Dividend tax: additional rate 39.35%: from 6 April 2026 (FA 2026 s.4)", value: DIV_ADDITIONAL, pct: true },
    { name: "EE_PT",            label: "Employee NIC: primary threshold (GBP): 2026/27", value: EE_PT },
    { name: "EE_UEL",           label: "Employee NIC: upper earnings limit (GBP): 2026/27", value: EE_UEL },
    { name: "EE_MAIN",          label: "Employee NIC: main rate 8%: 2026/27", value: EE_MAIN, pct: true },
    { name: "EE_UPPER",         label: "Employee NIC: upper rate 2%: 2026/27", value: EE_UPPER, pct: true },
    { name: "ER_ST",            label: "Employer NIC: secondary threshold (GBP): 2026/27", value: ER_ST },
    { name: "ER_RATE",          label: "Employer NIC: rate 15%: 2026/27", value: ER_RATE, pct: true },
    { name: "LEVY",             label: "Apprenticeship levy: 0.5% (deducted from umbrella assignment rate)", value: LEVY, pct: true },
    { name: "CT_SMALL",         label: "Corporation tax: small profits rate 19% (up to GBP50,000): FY2026", value: CT_SMALL, pct: true },
    { name: "CT_MAIN",          label: "Corporation tax: main rate 25% (above GBP250,000): FY2026", value: CT_MAIN, pct: true },
    { name: "CT_LOWER",         label: "Corporation tax: lower limit (GBP): FY2026", value: CT_LOWER },
    { name: "CT_UPPER",         label: "Corporation tax: upper limit (GBP): FY2026", value: CT_UPPER },
    { name: "CT_FRAC",          label: "Corporation tax: marginal fraction 3/200 = 0.015: FY2026", value: CT_FRAC },
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

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: CYAN } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Umbrella vs limited company: structure-choice model", true],
    ["Contractor Tax Accountants (2026/27 rates)", false],
    ["", false],
    ["This model compares your net take-home from the same day rate under two structures:", false],
    ["  1. Limited company: you own and direct a UK PSC (assumed outside IR35).", false],
    ["  2. Umbrella company: you are engaged via a compliant umbrella (PAYE).", false],
    ["", false],
    ["The 'Net benefit' row shows the limited company advantage AFTER estimated annual", false],
    ["running costs (accountancy, filing fees). At lower day rates the umbrella can be", false],
    ["more efficient once costs are included. At higher day rates limited wins clearly.", false],
    ["", false],
    ["April 2026 change:", true],
    ["Joint-and-several liability for unpaid umbrella PAYE/NIC now extends to the agency", false],
    ["and end client. Always use an umbrella on the HMRC-supervised compliant list.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the blue highlighted cells.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 rates. Do not edit it.", false],
    ["See 'Notes' for assumptions and limitations.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 14 : 12, color: { argb: CYAN } };
  });

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: CYAN } },
  });
  ws.columns = [
    { key: "a", width: 46 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 46 },
    { key: "e", width: 18 },
  ];

  cyanHeader(ws.getCell("A1"), "Your figures: edit the blue highlighted cells");
  ws.mergeCells("A1:E1");

  const helperFill = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: NEUTRAL_100 } };
  const inputFill  = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: CYAN_LIGHT } };

  // ---- Inputs (rows 3-10) ----
  labelCell(ws.getCell("A3"), "Day rate (GBP)");
  ws.getCell("B3").value = 500;
  ws.getCell("B3").numFmt = "#,##0";
  ws.getCell("B3").fill = inputFill;
  ws.getCell("B3").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$3", "S_DayRate");

  labelCell(ws.getCell("A4"), "Billable days per year");
  ws.getCell("B4").value = 240;
  ws.getCell("B4").numFmt = "#,##0";
  ws.getCell("B4").fill = inputFill;
  ws.getCell("B4").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$4", "S_Days");

  labelCell(ws.getCell("A5"), "Director salary (GBP/yr, limited company only)");
  ws.getCell("B5").value = 12570;
  moneyFmt(ws.getCell("B5"));
  ws.getCell("B5").fill = inputFill;
  ws.getCell("B5").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$5", "S_Salary");

  labelCell(ws.getCell("A6"), "Annual expenses (GBP, limited company only)");
  ws.getCell("B6").value = 6000;
  moneyFmt(ws.getCell("B6"));
  ws.getCell("B6").fill = inputFill;
  ws.getCell("B6").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$6", "S_Expenses");

  labelCell(ws.getCell("A7"), "Umbrella margin (GBP/yr, umbrella only)");
  ws.getCell("B7").value = 1200;
  moneyFmt(ws.getCell("B7"));
  ws.getCell("B7").fill = inputFill;
  ws.getCell("B7").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$7", "S_UmbrellaMargin");

  labelCell(ws.getCell("A8"), "Estimated annual running costs: limited company (GBP)");
  ws.getCell("B8").value = 2000;
  moneyFmt(ws.getCell("B8"));
  ws.getCell("B8").fill = inputFill;
  ws.getCell("B8").protection = { locked: false };
  ws.getCell("A8").font = { color: { argb: INK } };
  wb.definedNames.add("'Your figures'!$B$8", "S_AccountFees");

  labelCell(ws.getCell("A10"), "Gross / assignment income (day rate x days, GBP)");
  ws.getCell("B10").value = { formula: "S_DayRate*S_Days" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "S_Turnover");

  // ---- Limited company calculations (rows 12-33, A/B columns) ----
  cyanHeader(ws.getCell("A12"), "Limited company (outside IR35, PSC)");
  ws.mergeCells("A12:B12");

  labelCell(ws.getCell("A13"), "Employer NIC on salary (GBP)");
  ws.getCell("B13").value = {
    formula: "MAX(S_Salary-ER_ST,0)*ER_RATE",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  wb.definedNames.add("'Your figures'!$B$13", "L_EmployerNI");

  labelCell(ws.getCell("A14"), "Profit before corporation tax (GBP)");
  ws.getCell("B14").value = {
    formula: "MAX(0,S_Turnover-S_Salary-L_EmployerNI-S_Expenses)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "L_ProfitBT");

  labelCell(ws.getCell("A15"), "Corporation tax (GBP, marginal relief 19/25)");
  ws.getCell("B15").value = {
    formula:
      "IF(L_ProfitBT<=CT_LOWER,L_ProfitBT*CT_SMALL," +
      "IF(L_ProfitBT>=CT_UPPER,L_ProfitBT*CT_MAIN," +
      "L_ProfitBT*CT_MAIN-CT_FRAC*(CT_UPPER-L_ProfitBT)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "L_CT");

  labelCell(ws.getCell("A16"), "Dividends available (GBP)");
  ws.getCell("B16").value = {
    formula: "MAX(0,L_ProfitBT-L_CT)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  wb.definedNames.add("'Your figures'!$B$16", "L_Dividends");

  labelCell(ws.getCell("A17"), "Personal allowance after taper (GBP)");
  ws.getCell("B17").value = {
    formula: "IF(S_Salary+L_Dividends<=100000,PA,MAX(0,PA-(S_Salary+L_Dividends-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "L_PA");

  labelCell(ws.getCell("A18"), "Salary taxable (GBP)");
  ws.getCell("B18").value = {
    formula: "MAX(0,S_Salary-L_PA)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  wb.definedNames.add("'Your figures'!$B$18", "L_SalaryTaxable");

  labelCell(ws.getCell("A19"), "Income tax on salary (GBP)");
  ws.getCell("B19").value = {
    formula:
      "MIN(L_SalaryTaxable,BASIC_RATE_LIMIT)*0.2" +
      "+MIN(MAX(0,L_SalaryTaxable-BASIC_RATE_LIMIT),HIGHER_RATE_LIMIT-BASIC_RATE_LIMIT)*0.4" +
      "+MAX(0,L_SalaryTaxable-HIGHER_RATE_LIMIT)*0.45",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B19"));
  wb.definedNames.add("'Your figures'!$B$19", "L_IncomeTax");

  // Dividend tax helpers (rows 20-28, greyed)
  helperLabel(ws.getCell("A20"), "  Div taxable after PA residue (GBP)");
  ws.getCell("B20").value = {
    formula: "MAX(0,L_Dividends-MAX(0,L_PA-S_Salary))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B20"));
  ws.getCell("A20").fill = helperFill; ws.getCell("B20").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$20", "L_DivTaxable");

  helperLabel(ws.getCell("A21"), "  Basic band headroom (GBP)");
  ws.getCell("B21").value = {
    formula: "MAX(0,BASIC_RATE_LIMIT-L_SalaryTaxable)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));
  ws.getCell("A21").fill = helperFill; ws.getCell("B21").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$21", "L_BasicRoom");

  helperLabel(ws.getCell("A22"), "  Higher band headroom (GBP)");
  ws.getCell("B22").value = {
    formula: "MAX(0,HIGHER_RATE_LIMIT-MAX(L_SalaryTaxable,BASIC_RATE_LIMIT))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B22"));
  ws.getCell("A22").fill = helperFill; ws.getCell("B22").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$22", "L_HigherRoom");

  helperLabel(ws.getCell("A23"), "  Div basic slice (before allowance, GBP)");
  ws.getCell("B23").value = {
    formula: "MIN(L_DivTaxable,L_BasicRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  ws.getCell("A23").fill = helperFill; ws.getCell("B23").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$23", "L_DivBasic");

  helperLabel(ws.getCell("A24"), "  Div higher slice (before allowance, GBP)");
  ws.getCell("B24").value = {
    formula: "MIN(MAX(0,L_DivTaxable-L_BasicRoom),L_HigherRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B24"));
  ws.getCell("A24").fill = helperFill; ws.getCell("B24").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$24", "L_DivHigher");

  helperLabel(ws.getCell("A25"), "  Div additional slice (before allowance, GBP)");
  ws.getCell("B25").value = {
    formula: "MAX(0,L_DivTaxable-L_BasicRoom-L_HigherRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B25"));
  ws.getCell("A25").fill = helperFill; ws.getCell("B25").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$25", "L_DivAdd");

  helperLabel(ws.getCell("A26"), "  Allowance basic (GBP)");
  ws.getCell("B26").value = {
    formula: "MIN(DIV_ALLOWANCE,L_DivBasic)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B26"));
  ws.getCell("A26").fill = helperFill; ws.getCell("B26").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$26", "L_AllowB");

  helperLabel(ws.getCell("A27"), "  Allowance higher (GBP)");
  ws.getCell("B27").value = {
    formula: "MIN(MAX(0,DIV_ALLOWANCE-L_AllowB),L_DivHigher)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B27"));
  ws.getCell("A27").fill = helperFill; ws.getCell("B27").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$27", "L_AllowH");

  helperLabel(ws.getCell("A28"), "  Allowance additional (GBP)");
  ws.getCell("B28").value = {
    formula: "MIN(MAX(0,DIV_ALLOWANCE-L_AllowB-L_AllowH),L_DivAdd)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B28"));
  ws.getCell("A28").fill = helperFill; ws.getCell("B28").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$28", "L_AllowA");

  labelCell(ws.getCell("A29"), "Dividend tax (GBP)");
  ws.getCell("B29").value = {
    formula:
      "(L_DivBasic-L_AllowB)*DIV_BASIC" +
      "+(L_DivHigher-L_AllowH)*DIV_HIGHER" +
      "+(L_DivAdd-L_AllowA)*DIV_ADDITIONAL",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B29"));
  wb.definedNames.add("'Your figures'!$B$29", "L_DivTax");

  labelCell(ws.getCell("A30"), "Employee NIC (GBP)");
  ws.getCell("B30").value = {
    formula:
      "MIN(MAX(S_Salary-EE_PT,0),EE_UEL-EE_PT)*EE_MAIN" +
      "+MAX(S_Salary-EE_UEL,0)*EE_UPPER",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B30"));
  wb.definedNames.add("'Your figures'!$B$30", "L_EmployeeNI");

  labelCell(ws.getCell("A31"), "Net take-home: limited (before running costs, GBP)");
  ws.getCell("B31").value = {
    formula: "S_Salary+L_Dividends-L_DivTax-L_IncomeTax-L_EmployeeNI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B31"));
  ws.getCell("B31").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("A31").font = { bold: true, color: { argb: CYAN } };
  wb.definedNames.add("'Your figures'!$B$31", "L_NetTakeHome");

  labelCell(ws.getCell("A32"), "Running costs: accountancy and filing (GBP)");
  ws.getCell("B32").value = { formula: "S_AccountFees" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B32"));

  labelCell(ws.getCell("A33"), "Net take-home: limited AFTER running costs (GBP)");
  ws.getCell("B33").value = {
    formula: "L_NetTakeHome-S_AccountFees",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B33"));
  ws.getCell("B33").font = { bold: true };
  ws.getCell("A33").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$33", "L_NetAfterFees");

  // ---- Umbrella calculations (rows 12-22, D/E columns) ----
  cyanHeader(ws.getCell("D12"), "Umbrella (PAYE)");
  ws.mergeCells("D12:E12");

  helperLabel(ws.getCell("D13"), "  Pot after umbrella margin (GBP)");
  ws.getCell("E13").value = {
    formula: "MAX(0,S_Turnover-S_UmbrellaMargin)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E13"));
  ws.getCell("D13").fill = helperFill; ws.getCell("E13").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$13", "U_Pot");

  labelCell(ws.getCell("D14"), "Gross salary (after on-costs, GBP)");
  ws.getCell("E14").value = {
    formula: "(U_Pot+ER_RATE*ER_ST)/(1+ER_RATE+LEVY)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E14"));
  wb.definedNames.add("'Your figures'!$E$14", "U_GrossSalary");

  helperLabel(ws.getCell("D15"), "  Employer NIC (from assignment rate, GBP)");
  ws.getCell("E15").value = {
    formula: "MAX(U_GrossSalary-ER_ST,0)*ER_RATE",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E15"));
  ws.getCell("D15").fill = helperFill; ws.getCell("E15").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$15", "U_EmployerNI");

  helperLabel(ws.getCell("D16"), "  Apprenticeship levy (GBP)");
  ws.getCell("E16").value = {
    formula: "U_GrossSalary*LEVY",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E16"));
  ws.getCell("D16").fill = helperFill; ws.getCell("E16").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$16", "U_Levy");

  helperLabel(ws.getCell("D17"), "  Personal allowance after taper (GBP)");
  ws.getCell("E17").value = {
    formula: "IF(U_GrossSalary<=100000,PA,MAX(0,PA-(U_GrossSalary-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E17"));
  ws.getCell("D17").fill = helperFill; ws.getCell("E17").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$17", "U_PA");

  helperLabel(ws.getCell("D18"), "  Salary taxable (GBP)");
  ws.getCell("E18").value = {
    formula: "MAX(0,U_GrossSalary-U_PA)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E18"));
  ws.getCell("D18").fill = helperFill; ws.getCell("E18").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$18", "U_SalaryTaxable");

  labelCell(ws.getCell("D19"), "Income tax PAYE (GBP)");
  ws.getCell("E19").value = {
    formula:
      "MIN(U_SalaryTaxable,BASIC_RATE_LIMIT)*0.2" +
      "+MIN(MAX(0,U_SalaryTaxable-BASIC_RATE_LIMIT),HIGHER_RATE_LIMIT-BASIC_RATE_LIMIT)*0.4" +
      "+MAX(0,U_SalaryTaxable-HIGHER_RATE_LIMIT)*0.45",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E19"));
  wb.definedNames.add("'Your figures'!$E$19", "U_IncomeTax");

  labelCell(ws.getCell("D20"), "Employee NIC (GBP)");
  ws.getCell("E20").value = {
    formula:
      "MIN(MAX(U_GrossSalary-EE_PT,0),EE_UEL-EE_PT)*EE_MAIN" +
      "+MAX(U_GrossSalary-EE_UEL,0)*EE_UPPER",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E20"));
  wb.definedNames.add("'Your figures'!$E$20", "U_EmployeeNI");

  labelCell(ws.getCell("D21"), "Net take-home: umbrella (GBP)");
  ws.getCell("E21").value = {
    formula: "U_GrossSalary-U_IncomeTax-U_EmployeeNI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E21"));
  ws.getCell("E21").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("D21").font = { bold: true, color: { argb: CYAN } };
  wb.definedNames.add("'Your figures'!$E$21", "U_NetTakeHome");

  // ---- Comparison (rows 35-44) ----
  cyanHeader(ws.getCell("A35"), "Comparison (2026/27)");
  ws.mergeCells("A35:E35");

  labelCell(ws.getCell("A36"), "Limited company: net take-home before running costs (GBP)");
  ws.getCell("B36").value = { formula: "L_NetTakeHome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B36"));

  labelCell(ws.getCell("A37"), "Umbrella: net take-home (GBP)");
  ws.getCell("B37").value = { formula: "U_NetTakeHome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B37"));

  labelCell(ws.getCell("A38"), "Raw gap: limited minus umbrella (before costs, GBP)");
  ws.getCell("B38").value = {
    formula: "L_NetTakeHome-U_NetTakeHome",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B38"));
  wb.definedNames.add("'Your figures'!$B$38", "S_RawGap");

  labelCell(ws.getCell("A39"), "Running costs: limited company (GBP)");
  ws.getCell("B39").value = { formula: "S_AccountFees" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B39"));

  labelCell(ws.getCell("A40"), "Net benefit of limited vs umbrella (after costs, GBP)");
  ws.getCell("B40").value = {
    formula: "S_RawGap-S_AccountFees",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B40"));
  ws.getCell("B40").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("A40").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$40", "S_NetBenefit");

  // Conservation check
  labelCell(ws.getCell("A42"), "Conservation check: net benefit = raw gap - fees");
  ws.getCell("B42").value = {
    formula: 'IF(ABS(S_NetBenefit-(S_RawGap-S_AccountFees))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$42", "Check_NetBenefit");

  // April 2026 liability note (always present)
  ws.getCell("A44").value = "APRIL 2026: JOINT-AND-SEVERAL LIABILITY (IMPORTANT)";
  ws.getCell("A44").font = { bold: true, color: { argb: CYAN }, size: 11 };
  ws.getCell("A45").value =
    "Since April 2026, agencies and end clients are jointly and severally liable for unpaid umbrella PAYE/NIC.";
  ws.getCell("A46").value =
    "Always use a compliant umbrella on the HMRC-supervised list. Non-compliant schemes carry large personal risk.";
  ws.getCell("A45").font = { color: { argb: CYAN }, italic: true };
  ws.getCell("A46").font = { color: { argb: CYAN }, italic: true };
  ws.getCell("A45").alignment = { wrapText: true };
  ws.getCell("A46").alignment = { wrapText: true };

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "Structure choice context",
    "This model compares take-home under two engagement structures. It does NOT determine IR35 status.",
    "If your engagement is caught by Chapter 10 (public sector or large/medium private sector client),",
    "the fee-payer must operate PAYE regardless of your structure. In that case only the umbrella",
    "option applies. Speak to a specialist about your specific engagement.",
    "",
    "Running costs",
    "The default GBP2,000 running costs figure covers typical annual accountancy and Companies House",
    "filing fees for a single-director PSC. Your actual costs may be higher or lower. VAT registration,",
    "IR35 insurance and professional indemnity are extra. Umbrella fees are captured in the margin.",
    "",
    "April 2026: joint-and-several liability",
    "Since April 2026, agencies and end clients are jointly and severally liable for unpaid PAYE/NIC",
    "if the umbrella company fails to account for it. Always use an umbrella on the HMRC-supervised",
    "compliant list. Non-compliant tax avoidance schemes carry personal liability under the Loan Charge.",
    "",
    "Tax rates: 2026/27",
    "Income tax: PA GBP12,570; basic 20% to GBP50,270; higher 40% to GBP125,140; additional 45%.",
    "Dividends: GBP500 allowance; 10.75% basic, 35.75% higher, 39.35% additional (FA 2026 s.4).",
    "NIC employee: 8% between GBP12,570 and GBP50,270, 2% above.",
    "NIC employer: 15% above GBP5,000. No Employment Allowance for a single-director PSC.",
    "Corporation tax: 19% up to GBP50,000; 25% above GBP250,000; marginal relief between.",
    "",
    "This is a directional model. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: CYAN } };
    if (i === 2 || i === 8 || i === 13 || i === 18) c.font = { bold: true, color: { argb: CYAN } };
  });

  // Tab order
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [
    { x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" },
  ];

  return wb;
}

// Suppress unused-variable warnings (constants all used in rateRows)
void EE_MAIN; void EE_UPPER; void DIV_BASIC; void DIV_HIGHER; void DIV_ADDITIONAL;
void CT_SMALL; void CT_MAIN; void CT_LOWER; void CT_UPPER; void CT_FRAC;
void LEVY; void ER_RATE; void ER_ST; void EE_PT; void EE_UEL;
void DIV_ALLOWANCE; void PA; void BASIC_RATE_LIMIT; void HIGHER_RATE_LIMIT;
