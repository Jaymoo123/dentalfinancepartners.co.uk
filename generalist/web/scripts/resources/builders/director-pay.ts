/**
 * Salary and dividend take-home model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS tracing
 * modelExtraction + findOptimalSalary from lib/tools/compute/salary-dividend.ts.
 * Imports the SAME constants from lib/uk-tax-rates.ts that the site uses.
 *
 * Hardcoded-rate note (brief §4.1): the CT marginal slice uses 0.265 (not 3/200).
 * Golden test asserts workbook default == compute lib at profit=80000, no EA.
 */
import ExcelJS from "exceljs";
import { UK_TAX_RATES as T } from "../../../src/lib/uk-tax-rates";

const ORANGE = "FFF97316";
const SLATE_900 = "FF0F172A";
const SLATE_50 = "FFF8FAFC";
const BLUE_50 = "FFDBEAFE";

function headerCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: SLATE_900 } };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0";
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

function blueInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_50 } };
  cell.protection = { locked: false };
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Holloway Davies";
  wb.lastModifiedBy = "Holloway Davies";

  /* ---- Rates (locked) ---- */
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: ORANGE } },
  });
  rates.columns = [
    { key: "label", width: 50 },
    { key: "value", width: 18 },
  ];
  headerCell(rates.getCell("A1"), "Locked rates: do not edit (2026/27)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PersonalAllowance", label: "Income tax: personal allowance (£)", value: T.incomeTax.personalAllowance },
    { name: "BasicRateLimit", label: "Income tax: basic rate upper limit (£)", value: T.incomeTax.basicRateUpperLimit },
    { name: "HigherRateLimit", label: "Income tax: higher rate upper limit (£)", value: T.incomeTax.higherRateUpperLimit },
    { name: "IncomeBasicRate", label: "Income tax: basic rate", value: T.incomeTax.basicRate, pct: true },
    { name: "IncomeHigherRate", label: "Income tax: higher rate", value: T.incomeTax.higherRate, pct: true },
    { name: "IncomeAdditionalRate", label: "Income tax: additional rate", value: T.incomeTax.additionalRate, pct: true },
    { name: "EmployeeNIPrimary", label: "Employee NIC: primary threshold (£)", value: T.nationalInsurance.employee.primaryThreshold },
    { name: "EmployeeNIUEL", label: "Employee NIC: upper earnings limit (£)", value: T.nationalInsurance.employee.upperEarningsLimit },
    { name: "EmployeeNIMain", label: "Employee NIC: main rate", value: T.nationalInsurance.employee.mainRate, pct: true },
    { name: "EmployeeNIUpper", label: "Employee NIC: upper rate", value: T.nationalInsurance.employee.upperRate, pct: true },
    { name: "SecondaryThreshold", label: "Employer NIC: secondary threshold (£)", value: T.nationalInsurance.employer.secondaryThreshold },
    { name: "EmployerNiRate", label: "Employer NIC: rate", value: T.nationalInsurance.employer.rate, pct: true },
    { name: "EmploymentAllowance", label: "Employment Allowance (£)", value: T.nationalInsurance.employer.employmentAllowance },
    { name: "DividendAllowance", label: "Dividend allowance (£)", value: T.dividendTax.allowance },
    { name: "DividendBasicRate", label: "Dividend tax: basic rate", value: T.dividendTax.basicRate, pct: true },
    { name: "DividendHigherRate", label: "Dividend tax: higher rate", value: T.dividendTax.higherRate, pct: true },
    { name: "DividendAdditionalRate", label: "Dividend tax: additional rate", value: T.dividendTax.additionalRate, pct: true },
    { name: "CTSmallRate", label: "Corporation Tax: small profits rate", value: T.corporationTax.smallProfitsRate, pct: true },
    { name: "CTMainRate", label: "Corporation Tax: main rate", value: T.corporationTax.mainRate, pct: true },
    { name: "CTSmallLimit", label: "Corporation Tax: small profits upper limit (£)", value: T.corporationTax.smallProfitsUpperLimit },
    { name: "CTMainLimit", label: "Corporation Tax: main rate lower limit (£)", value: T.corporationTax.mainRateLowerLimit },
    // Hardcoded marginal slice per brief §4.1: 0.265, not 3/200.
    { name: "CTMarginalRate", label: "Corporation Tax: marginal slice rate (hardcoded 0.265)", value: 0.265, pct: true },
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

  /* ---- Your figures ---- */
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: ORANGE } },
  });
  ws.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 36 },
    { key: "e", width: 20 },
  ];

  headerCell(ws.getCell("A1"), "Your figures: edit the blue cells");
  ws.mergeCells("A1:B1");

  // --- Inputs ---
  const inputs: Array<{ row: number; label: string; value: number | string; name: string; money?: boolean; dropdown?: string[] }> = [
    { row: 3, label: "Company profit before salary", value: 80000, name: "In_Profit", money: true },
    { row: 4, label: "Salary level", value: "Optimal (£12,570)", name: "In_SalaryMode", dropdown: ["Optimal (£12,570)", "Secondary threshold (£5,000)", "Zero salary"] },
    { row: 5, label: "Claim Employment Allowance", value: "No", name: "In_EA", dropdown: ["No", "Yes"] },
  ];

  for (const inp of inputs) {
    labelCell(ws.getCell(`A${inp.row}`), inp.label);
    const c = ws.getCell(`B${inp.row}`);
    c.value = inp.value;
    if (inp.money) moneyFmt(c);
    blueInput(c);
    wb.definedNames.add(`'Your figures'!$B$${inp.row}`, inp.name);
    if (inp.dropdown) {
      c.dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: [`"${inp.dropdown.join(",")}"`],
      };
    }
  }

  // Resolved salary from mode
  labelCell(ws.getCell("A7"), "Resolved salary (£)");
  ws.getCell("B7").value = {
    formula: 'IF(In_SalaryMode="Optimal (£12,570)",12570,IF(In_SalaryMode="Secondary threshold (£5,000)",5000,0))',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "Salary");

  // Employer NI
  labelCell(ws.getCell("A8"), "Employer NIC");
  ws.getCell("B8").value = {
    formula: 'MAX(0,(Salary-SecondaryThreshold)*EmployerNiRate - IF(In_EA="Yes",EmploymentAllowance,0))',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "EmployerNi");

  // Profit after payroll
  labelCell(ws.getCell("A9"), "Profit after payroll");
  ws.getCell("B9").value = { formula: "In_Profit-Salary-EmployerNi" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "ProfitAfterPayroll");

  // Corporation Tax (marginal 0.265 hardcoded per brief)
  labelCell(ws.getCell("A10"), "Corporation Tax");
  ws.getCell("B10").value = {
    formula:
      "IF(ProfitAfterPayroll<=0,0,IF(ProfitAfterPayroll<=CTSmallLimit,ProfitAfterPayroll*CTSmallRate,IF(ProfitAfterPayroll>=CTMainLimit,ProfitAfterPayroll*CTMainRate,CTSmallLimit*CTSmallRate+(ProfitAfterPayroll-CTSmallLimit)*CTMarginalRate)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "CorporationTax");

  // Dividend
  labelCell(ws.getCell("A11"), "Dividend paid");
  ws.getCell("B11").value = { formula: "MAX(0,ProfitAfterPayroll-CorporationTax)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "Dividend");

  // Employee NIC on salary
  labelCell(ws.getCell("A12"), "Employee NIC");
  ws.getCell("B12").value = {
    formula:
      "IF(Salary<=EmployeeNIPrimary,0,(MIN(Salary,EmployeeNIUEL)-EmployeeNIPrimary)*EmployeeNIMain+MAX(0,Salary-EmployeeNIUEL)*EmployeeNIUpper)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "EmployeeNi");

  // Income tax on salary
  labelCell(ws.getCell("A13"), "Income tax on salary");
  ws.getCell("B13").value = {
    formula:
      "MAX(0,MIN(MAX(0,Salary-PersonalAllowance),BasicRateLimit-PersonalAllowance)*IncomeBasicRate+MAX(0,MIN(MAX(0,Salary-PersonalAllowance)-(BasicRateLimit-PersonalAllowance),HigherRateLimit-BasicRateLimit))*IncomeHigherRate+MAX(0,MAX(0,Salary-PersonalAllowance)-(HigherRateLimit-PersonalAllowance))*IncomeAdditionalRate)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  wb.definedNames.add("'Your figures'!$B$13", "IncomeTax");

  // Dividend tax: basic band capacity after salary
  // Uses the banded formula matching calcDividendTaxSD
  labelCell(ws.getCell("A14"), "Dividend tax");
  ws.getCell("B14").value = {
    formula:
      "IF(Dividend<=0,0,LET(pa,PersonalAllowance,paUsedSal,MIN(Salary,pa),paLeft,MAX(0,pa-paUsedSal),taxableDiv,MAX(0,Dividend-paLeft-DividendAllowance),basicCap,BasicRateLimit-PersonalAllowance,higherCap,HigherRateLimit-BasicRateLimit,salInBasic,MIN(MAX(0,Salary-pa),basicCap),salInHigher,MIN(MAX(0,Salary-pa-salInBasic),higherCap),remBasic,MAX(0,basicCap-salInBasic),remHigher,MAX(0,higherCap-salInHigher),inBasic,MIN(taxableDiv,remBasic),inHigher,MIN(taxableDiv-inBasic,remHigher),inAdd,MAX(0,taxableDiv-inBasic-inHigher),inBasic*DividendBasicRate+inHigher*DividendHigherRate+inAdd*DividendAdditionalRate))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "DividendTax");

  // Results section
  headerCell(ws.getCell("D1"), "You (salary + dividends)");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Director salary", formula: "Salary" },
    { row: 4, label: "Dividend paid", formula: "Dividend" },
    { row: 5, label: "Employer NIC", formula: "EmployerNi" },
    { row: 6, label: "Corporation tax", formula: "CorporationTax" },
    { row: 7, label: "Dividend tax", formula: "DividendTax" },
    { row: 8, label: "Total tax and NIC", formula: "EmployerNi+CorporationTax+EmployeeNi+IncomeTax+DividendTax", strong: true },
    { row: 10, label: "Net cash in your pocket", formula: "Salary-EmployeeNi-IncomeTax+Dividend-DividendTax", strong: true },
  ];

  for (const r of results) {
    ws.getCell(`D${r.row}`).value = r.label;
    ws.getCell(`D${r.row}`).font = r.strong ? { bold: true } : {};
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) c.font = { bold: true };
    ws.getCell(`D${r.row}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  // Light bg on data rows
  for (let r = 7; r <= 14; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Salary and dividend take-home model", true],
    ["", false],
    ["This model shows, for a director/shareholder of a UK limited company, the most", false],
    ["tax-efficient way to pay yourself in 2026/27 by combining a salary and dividends.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: profit, salary level, and Employment Allowance.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 tax rates. Do not edit it.", false],
    ["Read 'Notes' for assumptions and what this model does not cover.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 16 : 12, color: { argb: SLATE_900 } };
  });

  /* ---- Notes ---- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• Rates: 2026/27. Employer NIC 15% above £5,000 secondary threshold. Dividend tax: 10.75%",
    "  basic, 35.75% higher, 39.35% additional (from 6 April 2026). Dividend allowance £500.",
    "",
    "• Employment Allowance: only available if you have at least one non-director employee.",
    "  A single-director company with no other employees on payroll cannot claim it.",
    "",
    "• The model takes the full distributable profit as dividend. In practice you may retain",
    "  some profit in the company.",
    "",
    "• Personal tax on the salary assumes no other income. Income tax and NIC bands are 2026/27.",
    "",
    "• The corporation tax formula uses the 2026/27 marginal relief fraction (0.265 per £1",
    "  above the £50,000 small-profits limit).",
    "",
    "• This is a directional model. Your actual position depends on pension contributions,",
    "  other income, prior-year losses and connected-company rules. Speak to a specialist.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
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
