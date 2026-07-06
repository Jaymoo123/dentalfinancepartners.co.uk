/**
 * Outside vs inside IR35 take-home comparison Excel model builder.
 * Contractor Tax Accountants (cfp). Brand: petrol-cyan #0e7490.
 *
 * Produces a workbook with live formulas tracing limitedTakeHome() and
 * umbrellaTakeHome() from src/lib/calculators/tax2026.ts. Constants are
 * mirrored literally from the compute lib with traced comments; the golden
 * test (ir35-compare.test.ts) is the drift guard.
 *
 * Golden case (brief section 2):
 *   dayRate=500, billableDays=240, salary=12570, expenses=6000, umbrellaMargin=1200
 *   -> turnover=120000
 *   -> limitedTakeHome({turnover:120000,salary:12570,expenses:6000}).netTakeHome = 71820.95
 *   -> umbrellaTakeHome({assignmentIncome:120000,umbrellaMargin:1200}).netTakeHome = 69889.87
 *   -> gap = 1931.08
 *
 * LET-free formulas: uses banded MIN/MAX/IF arithmetic (never LET() which
 * renders #NAME? in older Excel / LibreOffice). Mirrors the Medical banded pattern.
 *
 * No em-dashes in any cell text. No "DJH". Creator = "Contractor Tax Accountants".
 * 2026/27 rates (HP sections 5-7, 12).
 */
import ExcelJS from "exceljs";

// ---- Brand colours (cfp: petrol-cyan + neutral) ----
const CYAN = "FF0E7490";       // var(--accent) #0e7490
const CYAN_LIGHT = "FFECFEFF"; // var(--accent-whisper)
const WHITE = "FFFFFFFF";
const INK = "FF0A0A0A";
const NEUTRAL_100 = "FFF5F5F5";

// ---- Locked constants: traced to src/lib/calculators/tax2026.ts ----
// Personal allowance and bands (HP section 5)
const PA = 12570;               // traced: PERSONAL_ALLOWANCE
const BASIC_RATE_LIMIT = 37700; // traced: BASIC_RATE_LIMIT (taxable-income in the 20% band)
const HIGHER_RATE_LIMIT = 112570; // traced: HIGHER_RATE_LIMIT (taxable-income upper before 45%)

// Dividends 2026/27 (HP section 5, FA 2026 s.4)
const DIV_ALLOWANCE = 500;      // traced: DIVIDEND_ALLOWANCE
const DIV_BASIC = 0.1075;       // traced: DIVIDEND_RATES.ordinary
const DIV_HIGHER = 0.3575;      // traced: DIVIDEND_RATES.upper
const DIV_ADDITIONAL = 0.3935;  // traced: DIVIDEND_RATES.additional

// NI 2026/27 (HP section 6)
const EE_PT = 12570;            // traced: NI.primaryThreshold
const EE_UEL = 50270;           // traced: NI.upperEarningsLimit
const EE_MAIN = 0.08;           // traced: NI.employeeMain
const EE_UPPER = 0.02;          // traced: NI.employeeUpper
const ER_ST = 5000;             // traced: NI.secondaryThreshold
const ER_RATE = 0.15;           // traced: NI.employerRate
const LEVY = 0.005;             // traced: APPRENTICESHIP_LEVY

// Corporation tax FY2026 (HP section 7)
const CT_SMALL = 0.19;          // traced: CT.smallRate
const CT_MAIN = 0.25;           // traced: CT.mainRate
const CT_LOWER = 50000;         // traced: CT.lowerLimit
const CT_UPPER = 250000;        // traced: CT.upperLimit
const CT_FRAC = 3 / 200;        // traced: CT.marginalFraction (0.015)

// ---- Shared style helpers ----
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
    ["Outside vs inside IR35: take-home comparison model", true],
    ["Contractor Tax Accountants (2026/27 rates)", false],
    ["", false],
    ["This model compares your net take-home from the SAME day rate under two scenarios:", false],
    ["  1. Outside IR35: working through your own limited company.", false],
    ["  2. Inside IR35: engaged via an umbrella company.", false],
    ["", false],
    ["IMPORTANT: IR35 status is a legal question, not a financial one.", true],
    ["The outside figure assumes a GENUINELY outside-IR35 engagement. Using this model", false],
    ["to support a status declaration is not appropriate. IR35 status is determined by", false],
    ["the whole-picture case-law test (Ready Mixed Concrete, Atholl House, PGMOL):", false],
    ["control, personal service and substitution, and mutuality of obligation. CEST is", false],
    ["a first screen. It does not bind a tribunal and its MOO treatment is narrow.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the blue highlighted cells: day rate, billable days, salary, expenses, margin.", false],
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
    { key: "a", width: 44 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 44 },
    { key: "e", width: 18 },
  ];

  // ---- Inputs (rows 3-9) ----
  cyanHeader(ws.getCell("A1"), "Your figures: edit the blue highlighted cells");
  ws.mergeCells("A1:E1");

  const helperFill = {
    type: "pattern" as const,
    pattern: "solid" as const,
    fgColor: { argb: NEUTRAL_100 },
  };
  const inputFill = {
    type: "pattern" as const,
    pattern: "solid" as const,
    fgColor: { argb: CYAN_LIGHT },
  };

  labelCell(ws.getCell("A3"), "Day rate (GBP)");
  ws.getCell("B3").value = 500;
  ws.getCell("B3").numFmt = "#,##0";
  ws.getCell("B3").fill = inputFill;
  ws.getCell("B3").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$3", "In_DayRate");

  labelCell(ws.getCell("A4"), "Billable days per year");
  ws.getCell("B4").value = 240;
  ws.getCell("B4").numFmt = "#,##0";
  ws.getCell("B4").fill = inputFill;
  ws.getCell("B4").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$4", "In_Days");

  labelCell(ws.getCell("A5"), "Director salary (GBP/yr, outside IR35 only)");
  ws.getCell("B5").value = 12570;
  moneyFmt(ws.getCell("B5"));
  ws.getCell("B5").fill = inputFill;
  ws.getCell("B5").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$5", "In_Salary");

  labelCell(ws.getCell("A6"), "Annual expenses (GBP, outside IR35 only)");
  ws.getCell("B6").value = 6000;
  moneyFmt(ws.getCell("B6"));
  ws.getCell("B6").fill = inputFill;
  ws.getCell("B6").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$6", "In_Expenses");

  labelCell(ws.getCell("A7"), "Umbrella margin (GBP/yr, inside IR35 only)");
  ws.getCell("B7").value = 1200;
  moneyFmt(ws.getCell("B7"));
  ws.getCell("B7").fill = inputFill;
  ws.getCell("B7").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$7", "In_UmbrellaMargin");

  labelCell(ws.getCell("A9"), "Gross / assignment income (day rate x days, GBP)");
  ws.getCell("B9").value = { formula: "In_DayRate*In_Days" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "In_Turnover");

  // ---- Outside IR35: limited company (rows 11-30, A/B columns) ----
  cyanHeader(ws.getCell("A11"), "Outside IR35: limited company");
  ws.mergeCells("A11:B11");

  labelCell(ws.getCell("A12"), "Employer NIC on salary (GBP)");
  ws.getCell("B12").value = {
    formula: "MAX(In_Salary-ER_ST,0)*ER_RATE",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "Out_EmployerNI");

  labelCell(ws.getCell("A13"), "Profit before corporation tax (GBP)");
  ws.getCell("B13").value = {
    formula: "MAX(0,In_Turnover-In_Salary-Out_EmployerNI-In_Expenses)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  wb.definedNames.add("'Your figures'!$B$13", "Out_ProfitBT");

  // Corporation tax: LET-free banded IF/MIN/MAX (19% small, 25% main, marginal relief)
  labelCell(ws.getCell("A14"), "Corporation tax (GBP, marginal relief 19/25)");
  ws.getCell("B14").value = {
    formula:
      "IF(Out_ProfitBT<=CT_LOWER,Out_ProfitBT*CT_SMALL," +
      "IF(Out_ProfitBT>=CT_UPPER,Out_ProfitBT*CT_MAIN," +
      "Out_ProfitBT*CT_MAIN-CT_FRAC*(CT_UPPER-Out_ProfitBT)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "Out_CT");

  labelCell(ws.getCell("A15"), "Dividends available (GBP)");
  ws.getCell("B15").value = {
    formula: "MAX(0,Out_ProfitBT-Out_CT)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "Out_Dividends");

  // PA tapered above GBP100k
  labelCell(ws.getCell("A16"), "Personal allowance after taper (GBP)");
  ws.getCell("B16").value = {
    formula: "IF(In_Salary+Out_Dividends<=100000,PA,MAX(0,PA-(In_Salary+Out_Dividends-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  wb.definedNames.add("'Your figures'!$B$16", "Out_PA");

  labelCell(ws.getCell("A17"), "Salary taxable (GBP)");
  ws.getCell("B17").value = {
    formula: "MAX(0,In_Salary-Out_PA)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "Out_SalaryTaxable");

  // Income tax on salary: LET-free banded
  labelCell(ws.getCell("A18"), "Income tax on salary (GBP)");
  ws.getCell("B18").value = {
    formula:
      "MIN(Out_SalaryTaxable,BASIC_RATE_LIMIT)*0.2" +
      "+MIN(MAX(0,Out_SalaryTaxable-BASIC_RATE_LIMIT),HIGHER_RATE_LIMIT-BASIC_RATE_LIMIT)*0.4" +
      "+MAX(0,Out_SalaryTaxable-HIGHER_RATE_LIMIT)*0.45",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  wb.definedNames.add("'Your figures'!$B$18", "Out_IncomeTax");

  // Dividend tax: LET-free banded using 9 helper named ranges (rows 19-27).
  // The GBP500 allowance is applied from the lowest band up (matches personalTax() logic).
  // Helper rows are greyed/italic for transparency; the user may hide them.
  helperLabel(ws.getCell("A19"), "  Div taxable after PA residue (GBP)");
  ws.getCell("B19").value = {
    formula: "MAX(0,Out_Dividends-MAX(0,Out_PA-In_Salary))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B19"));
  ws.getCell("A19").fill = helperFill;
  ws.getCell("B19").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$19", "Out_DivTaxable");

  helperLabel(ws.getCell("A20"), "  Basic band headroom (GBP)");
  ws.getCell("B20").value = {
    formula: "MAX(0,BASIC_RATE_LIMIT-Out_SalaryTaxable)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B20"));
  ws.getCell("A20").fill = helperFill;
  ws.getCell("B20").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$20", "Out_BasicRoom");

  helperLabel(ws.getCell("A21"), "  Higher band headroom (GBP)");
  ws.getCell("B21").value = {
    formula: "MAX(0,HIGHER_RATE_LIMIT-MAX(Out_SalaryTaxable,BASIC_RATE_LIMIT))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));
  ws.getCell("A21").fill = helperFill;
  ws.getCell("B21").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$21", "Out_HigherRoom");

  helperLabel(ws.getCell("A22"), "  Div basic-band slice (before allowance, GBP)");
  ws.getCell("B22").value = {
    formula: "MIN(Out_DivTaxable,Out_BasicRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B22"));
  ws.getCell("A22").fill = helperFill;
  ws.getCell("B22").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$22", "Out_DivBasic");

  helperLabel(ws.getCell("A23"), "  Div higher-band slice (before allowance, GBP)");
  ws.getCell("B23").value = {
    formula: "MIN(MAX(0,Out_DivTaxable-Out_BasicRoom),Out_HigherRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  ws.getCell("A23").fill = helperFill;
  ws.getCell("B23").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$23", "Out_DivHigher");

  helperLabel(ws.getCell("A24"), "  Div additional-band slice (before allowance, GBP)");
  ws.getCell("B24").value = {
    formula: "MAX(0,Out_DivTaxable-Out_BasicRoom-Out_HigherRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B24"));
  ws.getCell("A24").fill = helperFill;
  ws.getCell("B24").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$24", "Out_DivAdd");

  helperLabel(ws.getCell("A25"), "  Allowance applied: basic (GBP)");
  ws.getCell("B25").value = {
    formula: "MIN(DIV_ALLOWANCE,Out_DivBasic)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B25"));
  ws.getCell("A25").fill = helperFill;
  ws.getCell("B25").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$25", "Out_AllowB");

  helperLabel(ws.getCell("A26"), "  Allowance applied: higher (GBP)");
  ws.getCell("B26").value = {
    formula: "MIN(MAX(0,DIV_ALLOWANCE-Out_AllowB),Out_DivHigher)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B26"));
  ws.getCell("A26").fill = helperFill;
  ws.getCell("B26").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$26", "Out_AllowH");

  helperLabel(ws.getCell("A27"), "  Allowance applied: additional (GBP)");
  ws.getCell("B27").value = {
    formula: "MIN(MAX(0,DIV_ALLOWANCE-Out_AllowB-Out_AllowH),Out_DivAdd)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B27"));
  ws.getCell("A27").fill = helperFill;
  ws.getCell("B27").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$27", "Out_AllowA");

  labelCell(ws.getCell("A28"), "Dividend tax (GBP)");
  ws.getCell("B28").value = {
    formula:
      "(Out_DivBasic-Out_AllowB)*DIV_BASIC" +
      "+(Out_DivHigher-Out_AllowH)*DIV_HIGHER" +
      "+(Out_DivAdd-Out_AllowA)*DIV_ADDITIONAL",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B28"));
  wb.definedNames.add("'Your figures'!$B$28", "Out_DivTax");

  labelCell(ws.getCell("A29"), "Employee NIC (GBP)");
  ws.getCell("B29").value = {
    formula:
      "MIN(MAX(In_Salary-EE_PT,0),EE_UEL-EE_PT)*EE_MAIN" +
      "+MAX(In_Salary-EE_UEL,0)*EE_UPPER",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B29"));
  wb.definedNames.add("'Your figures'!$B$29", "Out_EmployeeNI");

  labelCell(ws.getCell("A30"), "Net take-home: outside IR35 (GBP)");
  ws.getCell("B30").value = {
    formula: "In_Salary+Out_Dividends-Out_DivTax-Out_IncomeTax-Out_EmployeeNI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B30"));
  ws.getCell("B30").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("A30").font = { bold: true, color: { argb: CYAN } };
  wb.definedNames.add("'Your figures'!$B$30", "Out_NetTakeHome");

  // ---- Inside IR35: umbrella (rows 11-20, D/E columns) ----
  cyanHeader(ws.getCell("D11"), "Inside IR35: umbrella");
  ws.mergeCells("D11:E11");

  // pot = max(0, assignmentIncome - margin) [helper, greyed]
  helperLabel(ws.getCell("D12"), "  Pot after umbrella margin (GBP)");
  ws.getCell("E12").value = {
    formula: "MAX(0,In_Turnover-In_UmbrellaMargin)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E12"));
  ws.getCell("D12").fill = helperFill;
  ws.getCell("E12").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$12", "In_Pot");

  // grossSalary = (pot + ER_RATE * ER_ST) / (1 + ER_RATE + LEVY)
  labelCell(ws.getCell("D13"), "Gross salary (after on-costs, GBP)");
  ws.getCell("E13").value = {
    formula: "(In_Pot+ER_RATE*ER_ST)/(1+ER_RATE+LEVY)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E13"));
  wb.definedNames.add("'Your figures'!$E$13", "In_GrossSalary");

  helperLabel(ws.getCell("D14"), "  Employer NIC (from assignment rate, GBP)");
  ws.getCell("E14").value = {
    formula: "MAX(In_GrossSalary-ER_ST,0)*ER_RATE",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E14"));
  ws.getCell("D14").fill = helperFill;
  ws.getCell("E14").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$14", "In_EmployerNI");

  helperLabel(ws.getCell("D15"), "  Apprenticeship levy (GBP)");
  ws.getCell("E15").value = {
    formula: "In_GrossSalary*LEVY",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E15"));
  ws.getCell("D15").fill = helperFill;
  ws.getCell("E15").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$15", "In_Levy");

  helperLabel(ws.getCell("D16"), "  Personal allowance after taper (GBP)");
  ws.getCell("E16").value = {
    formula: "IF(In_GrossSalary<=100000,PA,MAX(0,PA-(In_GrossSalary-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E16"));
  ws.getCell("D16").fill = helperFill;
  ws.getCell("E16").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$16", "In_PA");

  helperLabel(ws.getCell("D17"), "  Salary taxable (GBP)");
  ws.getCell("E17").value = {
    formula: "MAX(0,In_GrossSalary-In_PA)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E17"));
  ws.getCell("D17").fill = helperFill;
  ws.getCell("E17").fill = helperFill;
  wb.definedNames.add("'Your figures'!$E$17", "In_SalaryTaxable");

  labelCell(ws.getCell("D18"), "Income tax PAYE (GBP)");
  ws.getCell("E18").value = {
    formula:
      "MIN(In_SalaryTaxable,BASIC_RATE_LIMIT)*0.2" +
      "+MIN(MAX(0,In_SalaryTaxable-BASIC_RATE_LIMIT),HIGHER_RATE_LIMIT-BASIC_RATE_LIMIT)*0.4" +
      "+MAX(0,In_SalaryTaxable-HIGHER_RATE_LIMIT)*0.45",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E18"));
  wb.definedNames.add("'Your figures'!$E$18", "In_IncomeTax");

  labelCell(ws.getCell("D19"), "Employee NIC (GBP)");
  ws.getCell("E19").value = {
    formula:
      "MIN(MAX(In_GrossSalary-EE_PT,0),EE_UEL-EE_PT)*EE_MAIN" +
      "+MAX(In_GrossSalary-EE_UEL,0)*EE_UPPER",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E19"));
  wb.definedNames.add("'Your figures'!$E$19", "In_EmployeeNI");

  labelCell(ws.getCell("D20"), "Net take-home: inside IR35 (GBP)");
  ws.getCell("E20").value = {
    formula: "In_GrossSalary-In_IncomeTax-In_EmployeeNI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E20"));
  ws.getCell("E20").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("D20").font = { bold: true, color: { argb: CYAN } };
  wb.definedNames.add("'Your figures'!$E$20", "In_NetTakeHome");

  // ---- Comparison (rows 32-41) ----
  cyanHeader(ws.getCell("A32"), "Comparison (2026/27)");
  ws.mergeCells("A32:E32");

  labelCell(ws.getCell("A33"), "Outside IR35 net take-home (GBP)");
  ws.getCell("B33").value = { formula: "Out_NetTakeHome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B33"));

  labelCell(ws.getCell("A34"), "Inside IR35 net take-home (GBP)");
  ws.getCell("B34").value = { formula: "In_NetTakeHome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B34"));

  labelCell(ws.getCell("A35"), "Gap: outside minus inside (GBP)");
  ws.getCell("B35").value = {
    formula: "Out_NetTakeHome-In_NetTakeHome",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B35"));
  ws.getCell("B35").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("A35").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$35", "Out_Gap");

  // Conservation check
  labelCell(ws.getCell("A37"), "Conservation check: gap = outside - inside");
  ws.getCell("B37").value = {
    formula: 'IF(ABS(Out_Gap-(Out_NetTakeHome-In_NetTakeHome))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$37", "Check_Gap");

  // IR35 status note (always present, compliance)
  ws.getCell("A39").value = "IR35 STATUS NOTE (IMPORTANT)";
  ws.getCell("A39").font = { bold: true, color: { argb: CYAN }, size: 11 };
  ws.getCell("A40").value =
    "The outside figure assumes a GENUINELY outside-IR35 engagement. Status is determined by the whole-picture";
  ws.getCell("A41").value =
    "case-law test (control, personal service, MOO), not by this model. CEST is a first screen, not a guarantee.";
  ws.getCell("A40").font = { color: { argb: CYAN }, italic: true };
  ws.getCell("A41").font = { color: { argb: CYAN }, italic: true };
  ws.getCell("A40").alignment = { wrapText: true };
  ws.getCell("A41").alignment = { wrapText: true };

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "IR35 status (IMPORTANT)",
    "The outside IR35 figure assumes a GENUINELY outside-IR35 engagement. Using this model to",
    "support a status declaration is not appropriate. IR35 status is determined by the whole-picture",
    "case-law test: Ready Mixed Concrete, Atholl House, Kickabout, PGMOL. The relevant indicators",
    "are control, personal service and substitution, and mutuality of obligation, assessed on working",
    "practices, not contract wording. CEST (HMRC Check Employment Status for Tax) is a first screen.",
    "HMRC stands behind an accurate CEST result but it does not bind a tribunal.",
    "",
    "Under Chapter 10 (public sector, large/medium private sector), the fee-payer operates PAYE",
    "on the deemed payment. There is no 5% allowance from April 2017.",
    "",
    "Umbrella deductions",
    "The umbrella margin, employer NIC (15% above GBP5,000) and apprenticeship levy (0.5%) are",
    "deducted from the assignment rate before the gross salary is derived. The April 2026 joint-and-",
    "several-liability reform means the agency or end client becomes jointly and severally liable for",
    "unpaid PAYE/NIC if the umbrella fails to pay. Use a compliant umbrella on the HMRC list.",
    "",
    "Tax rates: 2026/27",
    "Income tax: PA GBP12,570; basic 20% to GBP50,270; higher 40% to GBP125,140; additional 45%.",
    "Dividends: GBP500 allowance; 10.75% basic, 35.75% higher, 39.35% additional (FA 2026 s.4).",
    "NIC employee: 8% between GBP12,570 and GBP50,270, 2% above.",
    "NIC employer: 15% above GBP5,000. No Employment Allowance for a single-director PSC.",
    "Corporation tax: 19% up to GBP50,000; 25% above GBP250,000; marginal relief between.",
    "",
    "This model does not include company running costs or accountancy fees.",
    "",
    "This is a directional model. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: CYAN } };
    if (i === 2 || i === 13 || i === 19) c.font = { bold: true, color: { argb: CYAN } };
  });

  // Tab order: Start here, Your figures, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [
    { x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" },
  ];

  return wb;
}

// Suppress unused-variable warnings for constants used only in commented traces
void EE_MAIN; void EE_UPPER; void DIV_BASIC; void DIV_HIGHER; void DIV_ADDITIONAL;
void CT_SMALL; void CT_MAIN; void CT_LOWER; void CT_UPPER; void CT_FRAC;
void LEVY; void ER_RATE; void ER_ST; void EE_PT; void EE_UEL;
void DIV_ALLOWANCE; void PA; void BASIC_RATE_LIMIT; void HIGHER_RATE_LIMIT;
