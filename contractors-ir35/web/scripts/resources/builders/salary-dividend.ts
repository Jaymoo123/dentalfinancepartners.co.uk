/**
 * Salary and dividend planner Excel model builder.
 * Contractor Tax Accountants (cfp). Brand: petrol-cyan #0e7490.
 *
 * Models the personal tax position for a limited-company director choosing a
 * salary/dividend split from available company profit. Uses personalTax() and
 * corporationTax() from tax2026.ts. Shows the band-by-band dividend tax workings.
 *
 * Golden case (brief section 2):
 *   salary=12570, dividends=50000
 *   -> personalTax(12570, 50000).dividendTax = 8396.25
 *   -> personalTax(12570, 50000).totalPersonalTax = 8396.25
 *      (incomeTaxOnSalary=0, employeeNI=0 at PA level)
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
    ["Salary and dividend planner: personal tax model", true],
    ["Contractor Tax Accountants (2026/27 rates)", false],
    ["", false],
    ["This model shows your personal tax position for a chosen salary and dividend split,", false],
    ["working through your own limited company (outside IR35). It does not model IR35.", false],
    ["", false],
    ["It shows:", false],
    ["  - How the salary uses your personal allowance and basic-rate band.", false],
    ["  - How dividends are taxed in the bands above the salary.", false],
    ["  - The GBP500 dividend allowance, applied from the lowest band up.", false],
    ["  - Your employer NIC cost on the chosen salary.", false],
    ["  - The company-level corporation tax on the declared profit.", false],
    ["", false],
    ["2026/27 dividend-rate change (FA 2026 s.4):", true],
    ["Rates rise from 8.75%/33.75%/39.35% to 10.75%/35.75%/39.35% from 6 April 2026.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the blue highlighted cells: company profit, your salary, dividends you take.", false],
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
  ];

  cyanHeader(ws.getCell("A1"), "Your figures: edit the blue highlighted cells");
  ws.mergeCells("A1:B1");

  const helperFill = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: NEUTRAL_100 } };
  const inputFill  = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: CYAN_LIGHT } };

  // ---- Inputs (rows 3-7) ----
  labelCell(ws.getCell("A3"), "Company profit before CT and salary (GBP)");
  ws.getCell("B3").value = 100000;
  moneyFmt(ws.getCell("B3"));
  ws.getCell("B3").fill = inputFill;
  ws.getCell("B3").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$3", "P_CompanyProfit");

  labelCell(ws.getCell("A4"), "Director salary for the year (GBP)");
  ws.getCell("B4").value = 12570;
  moneyFmt(ws.getCell("B4"));
  ws.getCell("B4").fill = inputFill;
  ws.getCell("B4").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$4", "P_Salary");

  labelCell(ws.getCell("A5"), "Dividends declared for the year (GBP)");
  ws.getCell("B5").value = 50000;
  moneyFmt(ws.getCell("B5"));
  ws.getCell("B5").fill = inputFill;
  ws.getCell("B5").protection = { locked: false };
  wb.definedNames.add("'Your figures'!$B$5", "P_Dividends");

  // ---- Company-level calculations (rows 7-12) ----
  cyanHeader(ws.getCell("A7"), "Company (corporation tax)");
  ws.mergeCells("A7:B7");

  labelCell(ws.getCell("A8"), "Employer NIC on salary (GBP)");
  ws.getCell("B8").value = {
    formula: "MAX(P_Salary-ER_ST,0)*ER_RATE",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "P_EmployerNI");

  labelCell(ws.getCell("A9"), "Taxable profit (after salary and ER NIC, GBP)");
  ws.getCell("B9").value = {
    formula: "MAX(0,P_CompanyProfit-P_Salary-P_EmployerNI)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "P_TaxableProfit");

  labelCell(ws.getCell("A10"), "Corporation tax (GBP, marginal relief 19/25)");
  ws.getCell("B10").value = {
    formula:
      "IF(P_TaxableProfit<=CT_LOWER,P_TaxableProfit*CT_SMALL," +
      "IF(P_TaxableProfit>=CT_UPPER,P_TaxableProfit*CT_MAIN," +
      "P_TaxableProfit*CT_MAIN-CT_FRAC*(CT_UPPER-P_TaxableProfit)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "P_CT");

  labelCell(ws.getCell("A11"), "Profit after CT available for dividends (GBP)");
  ws.getCell("B11").value = {
    formula: "MAX(0,P_TaxableProfit-P_CT)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "P_ProfitAfterCT");

  labelCell(ws.getCell("A12"), "Check: dividends declared within available profit?");
  ws.getCell("B12").value = {
    formula: 'IF(P_Dividends<=P_ProfitAfterCT,"Yes","Warning: dividends exceed distributable profit")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$12", "P_DivCheck");

  // ---- Personal tax calculations (rows 14-37) ----
  cyanHeader(ws.getCell("A14"), "Personal tax (2026/27)");
  ws.mergeCells("A14:B14");

  // ANI and PA
  labelCell(ws.getCell("A15"), "Adjusted net income (salary + dividends, GBP)");
  ws.getCell("B15").value = {
    formula: "P_Salary+P_Dividends",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "P_ANI");

  labelCell(ws.getCell("A16"), "Personal allowance after taper (GBP)");
  ws.getCell("B16").value = {
    formula: "IF(P_ANI<=100000,PA,MAX(0,PA-(P_ANI-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  wb.definedNames.add("'Your figures'!$B$16", "P_PA");

  // Salary income tax
  labelCell(ws.getCell("A17"), "Salary taxable (after PA, GBP)");
  ws.getCell("B17").value = {
    formula: "MAX(0,P_Salary-MIN(P_Salary,P_PA))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "P_SalaryTaxable");

  labelCell(ws.getCell("A18"), "Income tax on salary (GBP)");
  ws.getCell("B18").value = {
    formula:
      "MIN(P_SalaryTaxable,BASIC_RATE_LIMIT)*0.2" +
      "+MIN(MAX(0,P_SalaryTaxable-BASIC_RATE_LIMIT),HIGHER_RATE_LIMIT-BASIC_RATE_LIMIT)*0.4" +
      "+MAX(0,P_SalaryTaxable-HIGHER_RATE_LIMIT)*0.45",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  wb.definedNames.add("'Your figures'!$B$18", "P_IncomeTax");

  // Employee NIC on salary
  labelCell(ws.getCell("A19"), "Employee NIC (GBP)");
  ws.getCell("B19").value = {
    formula:
      "MIN(MAX(P_Salary-EE_PT,0),EE_UEL-EE_PT)*EE_MAIN" +
      "+MAX(P_Salary-EE_UEL,0)*EE_UPPER",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B19"));
  wb.definedNames.add("'Your figures'!$B$19", "P_EmployeeNI");

  // Dividend tax: LET-free banded with helper rows (rows 20-29)
  helperLabel(ws.getCell("A20"), "  PA residue applied to dividends (GBP)");
  ws.getCell("B20").value = {
    formula: "MIN(MAX(P_PA-P_Salary,0),P_Dividends)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B20"));
  ws.getCell("A20").fill = helperFill; ws.getCell("B20").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$20", "P_PAToDividends");

  helperLabel(ws.getCell("A21"), "  Div taxable (after PA residue, GBP)");
  ws.getCell("B21").value = {
    formula: "MAX(0,P_Dividends-P_PAToDividends)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));
  ws.getCell("A21").fill = helperFill; ws.getCell("B21").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$21", "P_DivTaxable");

  helperLabel(ws.getCell("A22"), "  Basic band headroom (GBP)");
  ws.getCell("B22").value = {
    formula: "MAX(0,BASIC_RATE_LIMIT-P_SalaryTaxable)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B22"));
  ws.getCell("A22").fill = helperFill; ws.getCell("B22").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$22", "P_BasicRoom");

  helperLabel(ws.getCell("A23"), "  Higher band headroom (GBP)");
  ws.getCell("B23").value = {
    formula: "MAX(0,HIGHER_RATE_LIMIT-MAX(P_SalaryTaxable,BASIC_RATE_LIMIT))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  ws.getCell("A23").fill = helperFill; ws.getCell("B23").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$23", "P_HigherRoom");

  helperLabel(ws.getCell("A24"), "  Div basic slice (before allowance, GBP)");
  ws.getCell("B24").value = {
    formula: "MIN(P_DivTaxable,P_BasicRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B24"));
  ws.getCell("A24").fill = helperFill; ws.getCell("B24").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$24", "P_DivBasic");

  helperLabel(ws.getCell("A25"), "  Div higher slice (before allowance, GBP)");
  ws.getCell("B25").value = {
    formula: "MIN(MAX(0,P_DivTaxable-P_BasicRoom),P_HigherRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B25"));
  ws.getCell("A25").fill = helperFill; ws.getCell("B25").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$25", "P_DivHigher");

  helperLabel(ws.getCell("A26"), "  Div additional slice (before allowance, GBP)");
  ws.getCell("B26").value = {
    formula: "MAX(0,P_DivTaxable-P_BasicRoom-P_HigherRoom)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B26"));
  ws.getCell("A26").fill = helperFill; ws.getCell("B26").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$26", "P_DivAdd");

  helperLabel(ws.getCell("A27"), "  Allowance basic (GBP)");
  ws.getCell("B27").value = {
    formula: "MIN(DIV_ALLOWANCE,P_DivBasic)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B27"));
  ws.getCell("A27").fill = helperFill; ws.getCell("B27").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$27", "P_AllowB");

  helperLabel(ws.getCell("A28"), "  Allowance higher (GBP)");
  ws.getCell("B28").value = {
    formula: "MIN(MAX(0,DIV_ALLOWANCE-P_AllowB),P_DivHigher)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B28"));
  ws.getCell("A28").fill = helperFill; ws.getCell("B28").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$28", "P_AllowH");

  helperLabel(ws.getCell("A29"), "  Allowance additional (GBP)");
  ws.getCell("B29").value = {
    formula: "MIN(MAX(0,DIV_ALLOWANCE-P_AllowB-P_AllowH),P_DivAdd)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B29"));
  ws.getCell("A29").fill = helperFill; ws.getCell("B29").fill = helperFill;
  wb.definedNames.add("'Your figures'!$B$29", "P_AllowA");

  labelCell(ws.getCell("A30"), "Dividend tax (GBP)");
  ws.getCell("B30").value = {
    formula:
      "(P_DivBasic-P_AllowB)*DIV_BASIC" +
      "+(P_DivHigher-P_AllowH)*DIV_HIGHER" +
      "+(P_DivAdd-P_AllowA)*DIV_ADDITIONAL",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B30"));
  wb.definedNames.add("'Your figures'!$B$30", "P_DividendTax");

  // Summary
  labelCell(ws.getCell("A32"), "Total personal tax (income tax + div tax + employee NIC, GBP)");
  ws.getCell("B32").value = {
    formula: "P_IncomeTax+P_DividendTax+P_EmployeeNI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B32"));
  ws.getCell("B32").font = { bold: true, color: { argb: CYAN } };
  ws.getCell("A32").font = { bold: true, color: { argb: CYAN } };
  wb.definedNames.add("'Your figures'!$B$32", "P_TotalPersonalTax");

  labelCell(ws.getCell("A33"), "Net personal income after tax and NIC (GBP)");
  ws.getCell("B33").value = {
    formula: "P_Salary+P_Dividends-P_TotalPersonalTax",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B33"));
  ws.getCell("B33").font = { bold: true };
  ws.getCell("A33").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$33", "P_NetPersonal");

  // Conservation check
  labelCell(ws.getCell("A35"), "Conservation check: total = income tax + div tax + NI");
  ws.getCell("B35").value = {
    formula: 'IF(ABS(P_TotalPersonalTax-(P_IncomeTax+P_DividendTax+P_EmployeeNI))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$35", "Check_PersonalTax");

  // Dividend allowance note (always present)
  ws.getCell("A37").value = "DIVIDEND ALLOWANCE 2026/27 (FA 2026 s.4)";
  ws.getCell("A37").font = { bold: true, color: { argb: CYAN }, size: 11 };
  ws.getCell("A38").value =
    "The GBP500 allowance is zero-rated (not exempt) and is applied from the lowest band up.";
  ws.getCell("A39").value =
    "Rates: 10.75% basic, 35.75% higher, 39.35% additional (from 6 April 2026).";
  ws.getCell("A38").font = { color: { argb: CYAN }, italic: true };
  ws.getCell("A39").font = { color: { argb: CYAN }, italic: true };

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "Scope",
    "This model covers the personal tax position of a UK director taking a salary and dividends",
    "from their own limited company, for 2026/27. It does not model IR35. If your engagement is",
    "inside IR35, speak to a specialist.",
    "",
    "Dividend allowance (2026/27, FA 2026 s.4)",
    "The GBP500 allowance is zero-rated (not exempt from tax) and still occupies band space.",
    "It is applied from the lowest dividend band upward. Rates from 6 April 2026:",
    "  Basic rate: 10.75% (was 8.75%)",
    "  Higher rate: 35.75% (was 33.75%)",
    "  Additional rate: 39.35% (unchanged)",
    "",
    "Employer NIC",
    "Employer NIC of 15% applies above the GBP5,000 secondary threshold (from April 2025).",
    "A single-director PSC cannot claim the Employment Allowance.",
    "",
    "Corporation tax: FY2026",
    "19% on profits up to GBP50,000. 25% above GBP250,000. Marginal relief between.",
    "The marginal relief fraction is 3/200 (= 0.015). Profit limits are halved per associated company.",
    "",
    "Personal allowance taper",
    "The allowance tapers at GBP1 per GBP2 of adjusted net income over GBP100,000.",
    "It is nil at GBP125,140. This creates an effective 60% marginal rate band between GBP100k and GBP125.14k.",
    "",
    "This is a directional model. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: CYAN } };
    if (i === 2 || i === 7 || i === 14 || i === 17 || i === 21) {
      c.font = { bold: true, color: { argb: CYAN } };
    }
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
void ER_RATE; void ER_ST; void EE_PT; void EE_UEL;
void DIV_ALLOWANCE; void PA; void BASIC_RATE_LIMIT; void HIGHER_RATE_LIMIT;
