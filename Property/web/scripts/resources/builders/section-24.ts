/**
 * Section 24 Excel model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS:
 *   - "Start here"  : what the model is + how to use it.
 *   - "Your figures": user inputs (rent, interest, other costs, band, year) and a
 *                     full personal-vs-company comparison computed with cell
 *                     formulas (no hard-coded results).
 *   - "Rates"       : LOCKED sheet written from the SAME constants the site math
 *                     uses (imported below) so the spreadsheet and the site can
 *                     never drift. The Your-figures formulas reference these cells.
 *   - "Notes"       : assumptions + disclaimers mirroring the on-site notes.
 *
 * The math here intentionally mirrors lib/section24.ts cell-for-cell; a golden
 * check (section-24.golden.ts) asserts the formula result equals the TS compute
 * for a sample input before the category's xlsx flag is flipped on.
 */
import ExcelJS from "exceljs";
import {
  INCOME_TAX_RATES,
  REDUCER_RATE_2026_27,
  REDUCER_RATE_2027_28,
} from "../../../src/lib/section24";
import {
  SMALL_PROFITS_RATE,
  MAIN_RATE,
  CT_LOWER_LIMIT,
  CT_UPPER_LIMIT,
  CT_MARGINAL_FRACTION,
} from "../../../src/lib/corpTax";

const EMERALD = "FF059669";
const SLATE_900 = "FF0F172A";
const SLATE_100 = "FFF1F5F9";
const SLATE_50 = "FFF8FAFC";

function headerCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: SLATE_900 } };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Property Tax Partners";
  wb.lastModifiedBy = "Property Tax Partners";

  /* ----------------------------- Rates (locked) ---------------------------- */
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: EMERALD } },
  });
  rates.columns = [
    { key: "label", width: 46 },
    { key: "value", width: 16 },
  ];
  headerCell(rates.getCell("A1"), "Locked rates — do not edit");
  rates.mergeCells("A1:B1");

  // Named single cells so the Your-figures sheet can reference them by name.
  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "Rate_Basic", label: "Income tax — basic rate", value: INCOME_TAX_RATES.basic, pct: true },
    { name: "Rate_Higher", label: "Income tax — higher rate", value: INCOME_TAX_RATES.higher, pct: true },
    { name: "Rate_Additional", label: "Income tax — additional rate", value: INCOME_TAX_RATES.additional, pct: true },
    { name: "Reducer_2026", label: "Section 24 finance-cost credit (2026/27)", value: REDUCER_RATE_2026_27, pct: true },
    { name: "Reducer_2027", label: "Section 24 finance-cost credit (2027/28)", value: REDUCER_RATE_2027_28, pct: true },
    { name: "CT_Small", label: "Corporation Tax — small profits rate", value: SMALL_PROFITS_RATE, pct: true },
    { name: "CT_Main", label: "Corporation Tax — main rate", value: MAIN_RATE, pct: true },
    { name: "CT_Lower", label: "Corporation Tax — lower limit (£)", value: CT_LOWER_LIMIT },
    { name: "CT_Upper", label: "Corporation Tax — upper limit (£)", value: CT_UPPER_LIMIT },
    { name: "CT_Fraction", label: "Corporation Tax — marginal fraction", value: CT_MARGINAL_FRACTION },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0%" : "#,##0.######";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  // Protect the rates sheet so the locked figures cannot be edited in Excel.
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ------------------------- Helper lookup sheet --------------------------- */
  // Hidden helper that maps the band/year dropdown text to the matching rate.
  const helper = wb.addWorksheet("Lookups");
  helper.state = "veryHidden";
  helper.getCell("A1").value = "Band";
  helper.getCell("B1").value = "Rate";
  const bandMap: Array<[string, string]> = [
    ["Basic rate (20%)", "Rate_Basic"],
    ["Higher rate (40%)", "Rate_Higher"],
    ["Additional rate (45%)", "Rate_Additional"],
  ];
  bandMap.forEach(([text, name], i) => {
    helper.getCell(`A${i + 2}`).value = text;
    helper.getCell(`B${i + 2}`).value = { formula: name, result: undefined } as ExcelJS.CellFormulaValue;
  });
  helper.getCell("D1").value = "Year";
  helper.getCell("E1").value = "Reducer";
  const yearMap: Array<[string, string]> = [
    ["2026/27 (20% credit)", "Reducer_2026"],
    ["2027/28 (22% credit)", "Reducer_2027"],
  ];
  yearMap.forEach(([text, name], i) => {
    helper.getCell(`D${i + 2}`).value = text;
    helper.getCell(`E${i + 2}`).value = { formula: name } as ExcelJS.CellFormulaValue;
  });

  /* ----------------------------- Your figures ------------------------------ */
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: EMERALD } },
  });
  ws.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 44 },
    { key: "e", width: 18 },
  ];

  headerCell(ws.getCell("A1"), "Your figures — edit the blue cells");
  ws.mergeCells("A1:B1");

  // --- Inputs (unlocked) ---
  const inputRows: Array<{ row: number; label: string; value: number | string; name: string; money?: boolean }> = [
    { row: 3, label: "Annual rental income", value: 50000, name: "In_Rent", money: true },
    { row: 4, label: "Annual mortgage interest", value: 20000, name: "In_Interest", money: true },
    { row: 5, label: "Other running costs", value: 8000, name: "In_Other", money: true },
    { row: 6, label: "Your income tax band", value: "Higher rate (40%)", name: "In_Band" },
    { row: 7, label: "Tax year", value: "2026/27 (20% credit)", name: "In_Year" },
  ];
  for (const ir of inputRows) {
    labelCell(ws.getCell(`A${ir.row}`), ir.label);
    const c = ws.getCell(`B${ir.row}`);
    c.value = ir.value;
    if (ir.money) moneyFmt(c);
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
    c.protection = { locked: false };
    wb.definedNames.add(`'Your figures'!$B$${ir.row}`, ir.name);
  }
  // Dropdowns for band + year.
  ws.getCell("B6").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"Basic rate (20%),Higher rate (40%),Additional rate (45%)"'],
  };
  ws.getCell("B7").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"2026/27 (20% credit),2027/28 (22% credit)"'],
  };

  // --- Resolved rates (from the band/year dropdowns) ---
  labelCell(ws.getCell("A9"), "Marginal income tax rate");
  ws.getCell("B9").value = {
    formula: "VLOOKUP(In_Band,Lookups!$A$2:$B$4,2,FALSE)",
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B9").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$B$9`, "MarginalRate");

  labelCell(ws.getCell("A10"), "Section 24 finance-cost credit rate");
  ws.getCell("B10").value = {
    formula: "VLOOKUP(In_Year,Lookups!$D$2:$E$3,2,FALSE)",
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B10").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$B$10`, "ReducerRate");

  // --- Individual under Section 24 (column A/B) ---
  headerCell(ws.getCell("A12"), "You — individual under Section 24");
  ws.mergeCells("A12:B12");

  const indiv: Array<{ row: number; label: string; formula: string; name?: string }> = [
    { row: 13, label: "Rental profit before interest", formula: "In_Rent-In_Other", name: "ProfitBeforeFinance" },
    { row: 14, label: "Taxable rental profit (interest not deducted)", formula: "MAX(0,ProfitBeforeFinance)" },
    { row: 15, label: "Tax before finance-cost credit", formula: "MAX(0,ProfitBeforeFinance)*MarginalRate", name: "S24Before" },
    { row: 16, label: "Finance-cost credit (capped)", formula: "MIN(In_Interest,MAX(0,ProfitBeforeFinance))*ReducerRate", name: "S24Credit" },
    { row: 17, label: "Income tax payable", formula: "MAX(0,S24Before-S24Credit)", name: "S24Tax" },
    { row: 18, label: "Net cash profit after tax", formula: "ProfitBeforeFinance-In_Interest-S24Tax", name: "S24Net" },
  ];
  for (const r of indiv) {
    ws.getCell(`A${r.row}`).value = r.label;
    const c = ws.getCell(`B${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.name) wb.definedNames.add(`'Your figures'!$B$${r.row}`, r.name);
  }
  // Old-system comparison.
  ws.getCell("A20").value = "Old system tax (interest fully deductible)";
  ws.getCell("B20").value = {
    formula: "MAX(0,ProfitBeforeFinance-In_Interest)*MarginalRate",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B20"));
  wb.definedNames.add(`'Your figures'!$B$20`, "OldTax");
  labelCell(ws.getCell("A21"), "Extra tax caused by Section 24");
  ws.getCell("B21").value = { formula: "S24Tax-OldTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));

  // --- Company (column D/E) ---
  headerCell(ws.getCell("D12"), "A company — outside Section 24");
  ws.mergeCells("D12:E12");
  ws.getCell("D13").value = "Profit (interest deducted in full)";
  ws.getCell("E13").value = {
    formula: "MAX(0,ProfitBeforeFinance-In_Interest)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E13"));
  wb.definedNames.add(`'Your figures'!$E$13`, "CoProfit");

  ws.getCell("D14").value = "Corporation Tax";
  // Mirrors corporationTax(): small-rate band, main rate, marginal relief between.
  ws.getCell("E14").value = {
    formula:
      "IF(CoProfit<=0,0,IF(CoProfit<=CT_Lower,CoProfit*CT_Small,IF(CoProfit>=CT_Upper,CoProfit*CT_Main,CoProfit*CT_Main-(CT_Upper-CoProfit)*CT_Fraction)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E14"));
  wb.definedNames.add(`'Your figures'!$E$14`, "CoTax");

  ws.getCell("D15").value = "Effective Corporation Tax rate";
  ws.getCell("E15").value = { formula: "IF(CoProfit>0,CoTax/CoProfit,0)" } as ExcelJS.CellFormulaValue;
  ws.getCell("E15").numFmt = "0.0%";

  ws.getCell("D16").value = "Retained in company after CT";
  ws.getCell("E16").value = {
    formula: "ProfitBeforeFinance-In_Interest-CoTax",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E16"));

  // --- The headline difference ---
  headerCell(ws.getCell("D18"), "Tax difference (company − you)");
  ws.mergeCells("D18:E18");
  ws.getCell("D19").value = "Company tax minus your income tax";
  ws.getCell("E19").value = { formula: "CoTax-S24Tax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E19"));
  ws.getCell("D20").value = "(negative = a company pays less tax here)";
  ws.getCell("D20").font = { italic: true, color: { argb: "FF64748B" }, size: 10 };

  // Light styling on the body.
  for (let r = 13; r <= 21; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
    ws.getCell(`D${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  ws.getColumn("a").alignment = { wrapText: true };
  ws.getColumn("d").alignment = { wrapText: true };

  /* ------------------------------ Start here ------------------------------- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 90 }];
  const startLines = [
    ["Section 24 personal vs company model", true],
    ["", false],
    ["This spreadsheet shows, for one property or a whole portfolio, the income tax you pay as an", false],
    ["individual under the Section 24 finance-cost restriction versus the Corporation Tax a company", false],
    ["would pay on the same lettings, plus the difference between them.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: rental income, mortgage interest, other costs, your tax band and year.", false],
    ["3. Everything else updates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked tax rates and is the same source the website calculator uses.", false],
    ["Read the 'Notes' tab for the assumptions and what this model does NOT cover.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text as string;
    if (bold) c.font = { bold: true, size: i === 0 ? 16 : 12, color: { argb: SLATE_900 } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_100 } };
  // Open the workbook on the first tab ("Start here", placed first below).
  wb.views = [
    {
      x: 0,
      y: 0,
      width: 12000,
      height: 9000,
      firstSheet: 0,
      activeTab: 0,
      visibility: "visible",
    },
  ];

  /* -------------------------------- Notes ---------------------------------- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• Section 24: individual landlords cannot deduct mortgage interest / finance costs from rental",
    "  profit. Instead a basic-rate tax credit is given — 20% for 2026/27, rising to 22% from 2027/28",
    "  (Finance Act 2026). The credit is capped at the lower of the credit rate times the finance costs",
    "  and the credit rate times the rental profit before finance costs. A third cap (a percentage of",
    "  total taxable income) is not modelled here because a single-property/portfolio model cannot see",
    "  your other income.",
    "",
    "• 'Old system' tax (interest fully deductible at your marginal rate) is shown only to quantify what",
    "  Section 24 costs you. It is not a current option for individuals.",
    "",
    "• Company: a company is outside Section 24 and deducts interest in full before Corporation Tax",
    "  (19% on profits up to £50,000, 25% on profits of £250,000 or more, with marginal relief between).",
    "  The company figure is Corporation Tax on retained profit only — taking the money out as salary or",
    "  dividends is taxed again personally and is NOT modelled here.",
    "",
    "• Moving an existing portfolio into a company can trigger Capital Gains Tax and Stamp Duty Land Tax,",
    "  which are not in this model.",
    "",
    "• Figures are rounded and use 2026/27 rates unless you pick 2027/28. This is general guidance, not",
    "  advice for your specific situation. Speak to a property tax specialist before acting.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  // Order the tabs: Start here, Your figures, Rates, Notes (Lookups hidden).
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes", "Lookups"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
