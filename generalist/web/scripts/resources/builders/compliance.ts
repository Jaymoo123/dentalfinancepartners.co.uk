/**
 * Compliance pack builder: MTD ITSA readiness checklist + Corporation Tax planner.
 *
 * Covers the "Bookkeeping and Compliance" and "Corporation Tax" blog categories
 * (both map to the `compliance` TopicKey). Two working tabs:
 *  - "MTD checklist": qualifying-income mandation lookup + readiness checklist score
 *  - "CT planner": CT with marginal relief, associated-company divided limits, and
 *    the CT saving from planned deductible capital spend
 *
 * Imports the SAME constants from lib/uk-tax-rates.ts that the site uses.
 * Hardcoded-rate note (brief §4.1): the CT marginal slice uses 0.265 (not 3/200).
 * MTD ITSA thresholds (£50,000 from Apr 2026, £30,000 from Apr 2027) and
 * AIA £1,000,000 are not in uk-tax-rates.ts, so they are hardcoded here.
 * Golden test asserts CT planner default (profit=100000, 1 company, spend=20000).
 */
import ExcelJS from "exceljs";
import { UK_TAX_RATES as T } from "../../../src/lib/uk-tax-rates";

const ORANGE = "FFF97316";
const SLATE_900 = "FF0F172A";
const SLATE_50 = "FFF8FAFC";
const BLUE_50 = "FFDBEAFE";

// ponytail: not in uk-tax-rates.ts; move there if a site calculator ever needs them
const MTD_THRESHOLD_2026 = 50000;
const MTD_THRESHOLD_2027 = 30000;
const MTD_THRESHOLD_2028 = 20000;
const AIA_LIMIT = 1000000;

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
    { key: "label", width: 55 },
    { key: "value", width: 18 },
  ];
  headerCell(rates.getCell("A1"), "Locked rates: do not edit (2026/27)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "CTSmallRate", label: "Corporation Tax: small profits rate", value: T.corporationTax.smallProfitsRate, pct: true },
    { name: "CTMainRate", label: "Corporation Tax: main rate", value: T.corporationTax.mainRate, pct: true },
    { name: "CTSmallLimit", label: "Corporation Tax: small profits upper limit (£)", value: T.corporationTax.smallProfitsUpperLimit },
    { name: "CTMainLimit", label: "Corporation Tax: main rate lower limit (£)", value: T.corporationTax.mainRateLowerLimit },
    // Hardcoded marginal slice per brief §4.1: 0.265, not 3/200.
    { name: "CTMarginalRate", label: "Corporation Tax: marginal slice rate (hardcoded 0.265)", value: 0.265, pct: true },
    { name: "MtdThreshold2026", label: "MTD ITSA: qualifying income threshold from April 2026 (£)", value: MTD_THRESHOLD_2026 },
    { name: "MtdThreshold2027", label: "MTD ITSA: qualifying income threshold from April 2027 (£)", value: MTD_THRESHOLD_2027 },
    { name: "MtdThreshold2028", label: "MTD ITSA: qualifying income threshold from April 2028 (£)", value: MTD_THRESHOLD_2028 },
    { name: "AiaLimit", label: "Annual Investment Allowance limit (£)", value: AIA_LIMIT },
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

  /* ---- MTD checklist ---- */
  const mtd = wb.addWorksheet("MTD checklist", {
    properties: { tabColor: { argb: ORANGE } },
  });
  mtd.columns = [
    { key: "a", width: 62 },
    { key: "b", width: 22 },
  ];
  headerCell(mtd.getCell("A1"), "MTD ITSA readiness: edit the blue cells");
  mtd.mergeCells("A1:B1");

  labelCell(mtd.getCell("A3"), "Your qualifying income (gross self-employment + property income, £)");
  const inc = mtd.getCell("B3");
  inc.value = 60000;
  moneyFmt(inc);
  blueInput(inc);
  wb.definedNames.add("'MTD checklist'!$B$3", "MtdIncome");

  labelCell(mtd.getCell("A5"), "When MTD ITSA applies to you");
  mtd.getCell("B5").value = {
    formula:
      'IF(MtdIncome>MtdThreshold2026,"From 6 April 2026",IF(MtdIncome>MtdThreshold2027,"From April 2027",IF(MtdIncome>MtdThreshold2028,"From April 2028 (subject to legislation)","Not yet mandated")))',
  } as ExcelJS.CellFormulaValue;
  mtd.getCell("B5").font = { bold: true };
  mtd.getCell("A5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };

  headerCell(mtd.getCell("A7"), "Readiness checklist: set each item to Yes or No");
  mtd.mergeCells("A7:B7");

  const checklist = [
    "I know my qualifying income (gross income before expenses, all sole-trade and property sources combined)",
    "I keep digital records of income and expenses (not paper or ad-hoc spreadsheets)",
    "I use (or have chosen) MTD-compatible software (e.g. Xero, QuickBooks, Sage, FreeAgent)",
    "My bank feeds are connected and reconciled at least monthly",
    "Business and personal transactions run through separate bank accounts",
    "I understand the quarterly update cycle (four updates per year plus a final declaration)",
    "I know my quarterly deadlines (7 August, 7 November, 7 February, 7 May for standard quarters)",
    "My bookkeeping is no more than one month behind",
    "I have mapped my expense categories to the HMRC self-employment categories",
    "I have agreed with my accountant who submits the quarterly updates",
  ];
  const firstCheck = 8;
  checklist.forEach((item, i) => {
    const row = firstCheck + i;
    labelCell(mtd.getCell(`A${row}`), item);
    mtd.getCell(`A${row}`).alignment = { wrapText: true, vertical: "top" };
    const c = mtd.getCell(`B${row}`);
    c.value = "No";
    blueInput(c);
    c.dataValidation = { type: "list", allowBlank: false, formulae: ['"Yes,No"'] };
  });
  const lastCheck = firstCheck + checklist.length - 1;

  labelCell(mtd.getCell(`A${lastCheck + 2}`), "Readiness score");
  mtd.getCell(`B${lastCheck + 2}`).value = {
    formula: `COUNTIF(B${firstCheck}:B${lastCheck},"Yes")&" / ${checklist.length}"`,
  } as ExcelJS.CellFormulaValue;
  mtd.getCell(`B${lastCheck + 2}`).font = { bold: true };
  mtd.getCell(`A${lastCheck + 2}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };

  /* ---- CT planner ---- */
  const ct = wb.addWorksheet("CT planner", {
    properties: { tabColor: { argb: ORANGE } },
  });
  ct.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 20 },
  ];
  headerCell(ct.getCell("A1"), "Corporation Tax planner: edit the blue cells");
  ct.mergeCells("A1:B1");

  const inputs: Array<{ row: number; label: string; value: number; name: string; money?: boolean }> = [
    { row: 3, label: "Taxable profit for the year", value: 100000, name: "CtProfit", money: true },
    { row: 4, label: "Number of associated companies (including this one)", value: 1, name: "CtCompanies" },
    { row: 5, label: "Planned deductible capital spend (AIA / 40% FYA qualifying)", value: 20000, name: "CtSpend", money: true },
  ];
  for (const inp of inputs) {
    labelCell(ct.getCell(`A${inp.row}`), inp.label);
    const c = ct.getCell(`B${inp.row}`);
    c.value = inp.value;
    if (inp.money) moneyFmt(c);
    blueInput(c);
    wb.definedNames.add(`'CT planner'!$B$${inp.row}`, inp.name);
  }
  ct.getCell("B4").dataValidation = {
    type: "whole",
    operator: "greaterThanOrEqual",
    formulae: [1],
    allowBlank: false,
  };

  // Divided limits (associated companies divide the thresholds)
  labelCell(ct.getCell("A7"), "Your small profits limit (£50,000 ÷ companies)");
  ct.getCell("B7").value = { formula: "CTSmallLimit/CtCompanies" } as ExcelJS.CellFormulaValue;
  moneyFmt(ct.getCell("B7"));
  wb.definedNames.add("'CT planner'!$B$7", "CtLowerDiv");

  labelCell(ct.getCell("A8"), "Your main rate limit (£250,000 ÷ companies)");
  ct.getCell("B8").value = { formula: "CTMainLimit/CtCompanies" } as ExcelJS.CellFormulaValue;
  moneyFmt(ct.getCell("B8"));
  wb.definedNames.add("'CT planner'!$B$8", "CtUpperDiv");

  // CT function of profit, applied twice (before / after spend).
  const ctFormula = (p: string) =>
    `IF(${p}<=0,0,IF(${p}<=CtLowerDiv,${p}*CTSmallRate,IF(${p}>=CtUpperDiv,${p}*CTMainRate,CtLowerDiv*CTSmallRate+(${p}-CtLowerDiv)*CTMarginalRate)))`;

  labelCell(ct.getCell("A10"), "Corporation Tax before capital spend");
  ct.getCell("B10").value = { formula: ctFormula("CtProfit") } as ExcelJS.CellFormulaValue;
  moneyFmt(ct.getCell("B10"));
  wb.definedNames.add("'CT planner'!$B$10", "CtBefore");

  labelCell(ct.getCell("A11"), "Profit after capital spend (100% relief up to AIA limit)");
  ct.getCell("B11").value = {
    formula: "MAX(0,CtProfit-MIN(CtSpend,AiaLimit))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ct.getCell("B11"));
  wb.definedNames.add("'CT planner'!$B$11", "CtProfitAfter");

  labelCell(ct.getCell("A12"), "Corporation Tax after capital spend");
  ct.getCell("B12").value = { formula: ctFormula("CtProfitAfter") } as ExcelJS.CellFormulaValue;
  moneyFmt(ct.getCell("B12"));
  wb.definedNames.add("'CT planner'!$B$12", "CtAfter");

  labelCell(ct.getCell("A14"), "CT saving from the capital spend");
  ct.getCell("B14").value = { formula: "CtBefore-CtAfter" } as ExcelJS.CellFormulaValue;
  moneyFmt(ct.getCell("B14"));
  ct.getCell("B14").font = { bold: true };

  labelCell(ct.getCell("A15"), "Effective CT rate (after spend)");
  ct.getCell("B15").value = {
    formula: "IF(CtProfitAfter<=0,0,CtAfter/CtProfitAfter)",
  } as ExcelJS.CellFormulaValue;
  ct.getCell("B15").numFmt = "0.00%";

  labelCell(ct.getCell("A16"), "In the marginal band? (26.5% on the next £1)");
  ct.getCell("B16").value = {
    formula: 'IF(AND(CtProfitAfter>CtLowerDiv,CtProfitAfter<CtUpperDiv),"Yes","No")',
  } as ExcelJS.CellFormulaValue;

  for (const r of [7, 8, 10, 11, 12, 14, 15, 16]) {
    ct.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Compliance pack: MTD ITSA checklist and Corporation Tax planner", true],
    ["", false],
    ["Two working tools for 2026/27 in one workbook:", false],
    ["", false],
    ["1. 'MTD checklist': enter your qualifying income to see when Making Tax Digital", false],
    ["   for Income Tax applies to you, then score your readiness against ten checks.", false],
    ["2. 'CT planner': enter profit, associated companies and planned capital spend to", false],
    ["   see your Corporation Tax, your marginal band position and the CT saving.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Edit only the blue cells on each tab.", false],
    ["2. Every figure recalculates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 rates and thresholds. Do not edit it.", false],
    ["Read 'Notes' for assumptions and what this workbook does not cover.", false],
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
    "• MTD ITSA: mandation is by qualifying income (gross income before expenses, all",
    "  sole-trade and property sources combined). Over £50,000: mandated from 6 April 2026.",
    "  Over £30,000: mandated from April 2027. Over £20,000: confirmed from April 2028",
    "  (announced at Spring Statement 2025; the enacting legislation is still to be introduced).",
    "",
    "• Corporation Tax 2026/27: 19% small profits rate to £50,000, 25% main rate from",
    "  £250,000, marginal relief between (26.5% effective on the slice). Both limits are",
    "  divided by the number of associated companies and pro-rated for short periods",
    "  (short periods are not modelled here).",
    "",
    "• Capital spend: the planner assumes 100% relief in year one, which holds for",
    "  qualifying plant and machinery within the £1m Annual Investment Allowance. The",
    "  40% first-year allowance (FA 2026) and 14% writing down allowance give less than",
    "  100% in year one; treat the saving as the best case.",
    "",
    "• The planner ignores losses brought forward, group relief, R&D claims and",
    "  non-trading income streams that change the effective rate.",
    "",
    "• This is a directional model. Speak to a specialist before acting on it.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  // Tab order
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "MTD checklist", "CT planner", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
