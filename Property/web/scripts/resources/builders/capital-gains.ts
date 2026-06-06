/**
 * Capital Gains Tax (residential property) Excel model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS:
 *   - "Start here"  : what the model is + how to use it.
 *   - "Your figures": user inputs (sale price, purchase price, costs,
 *                     improvements, income, PRR months) and a full CGT
 *                     calculation computed with cell formulas — itemised gain,
 *                     Private Residence Relief, the £3,000 annual exemption, the
 *                     18%/24% band split, the tax, the effective rate and the
 *                     net cash. No hard-coded results.
 *   - "Rates"       : LOCKED sheet written from the SAME constants the site math
 *                     uses (imported from src/lib/cgt.ts) so the spreadsheet and
 *                     the site can never drift. The Your-figures formulas
 *                     reference these cells by name.
 *   - "Notes"       : assumptions + disclaimers mirroring the on-site notes.
 *
 * The math here mirrors lib/cgtPlanner.ts (which delegates the rates/AEA/band
 * split to lib/cgt.ts) cell-for-cell, so the formula result equals the TS
 * compute for a sample input before the category's xlsx flag is flipped on.
 */
import ExcelJS from "exceljs";
import {
  CGT_ANNUAL_EXEMPT_AMOUNT,
  CGT_RESIDENTIAL_BASIC,
  CGT_RESIDENTIAL_HIGHER,
  PERSONAL_ALLOWANCE,
  BASIC_RATE_BAND,
} from "../../../src/lib/cgt";
import { PRR_FINAL_PERIOD_MONTHS } from "../../../src/lib/cgtPlanner";

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
    { key: "label", width: 50 },
    { key: "value", width: 16 },
  ];
  headerCell(rates.getCell("A1"), "Locked rates — do not edit");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "CGT_Basic", label: "CGT — residential basic rate", value: CGT_RESIDENTIAL_BASIC, pct: true },
    { name: "CGT_Higher", label: "CGT — residential higher rate", value: CGT_RESIDENTIAL_HIGHER, pct: true },
    { name: "AEA", label: "Annual exempt amount (£)", value: CGT_ANNUAL_EXEMPT_AMOUNT },
    { name: "PersonalAllowance", label: "Personal allowance (£)", value: PERSONAL_ALLOWANCE },
    { name: "BasicRateBand", label: "Basic-rate band (£)", value: BASIC_RATE_BAND },
    { name: "PRR_Final", label: "PRR final qualifying period (months)", value: PRR_FINAL_PERIOD_MONTHS },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0%" : "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ----------------------------- Your figures ------------------------------ */
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: EMERALD } },
  });
  ws.columns = [
    { key: "a", width: 48 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 48 },
    { key: "e", width: 18 },
  ];

  headerCell(ws.getCell("A1"), "Your figures — edit the blue cells");
  ws.mergeCells("A1:B1");

  // --- Inputs (unlocked) ---
  const inputRows: Array<{ row: number; label: string; value: number; name: string; money?: boolean; months?: boolean }> = [
    { row: 3, label: "Sale price", value: 320000, name: "In_Sale", money: true },
    { row: 4, label: "Original purchase price", value: 200000, name: "In_Purchase", money: true },
    { row: 5, label: "Buying & selling costs", value: 9000, name: "In_Costs", money: true },
    { row: 6, label: "Capital improvements", value: 8000, name: "In_Improve", money: true },
    { row: 7, label: "Your other taxable income", value: 50000, name: "In_Income", money: true },
    { row: 8, label: "AEA already used? (1 = yes, 0 = no)", value: 0, name: "In_AeaUsed" },
    { row: 9, label: "Was it ever your main home? (1 = yes, 0 = no)", value: 0, name: "In_WasHome" },
    { row: 10, label: "Total months owned", value: 180, name: "In_TotalMonths", months: true },
    { row: 11, label: "Months lived in as main home", value: 60, name: "In_HomeMonths", months: true },
  ];
  for (const ir of inputRows) {
    labelCell(ws.getCell(`A${ir.row}`), ir.label);
    const c = ws.getCell(`B${ir.row}`);
    c.value = ir.value;
    if (ir.money) moneyFmt(c);
    if (ir.months) c.numFmt = "#,##0";
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
    c.protection = { locked: false };
    wb.definedNames.add(`'Your figures'!$B$${ir.row}`, ir.name);
  }
  // 0/1 validation for the two flags.
  ws.getCell("B8").dataValidation = { type: "list", allowBlank: false, formulae: ['"0,1"'] };
  ws.getCell("B9").dataValidation = { type: "list", allowBlank: false, formulae: ['"0,1"'] };

  // --- Gain after costs (column A/B) ---
  headerCell(ws.getCell("A13"), "The gain");
  ws.mergeCells("A13:B13");

  const gainRows: Array<{ row: number; label: string; formula: string; name?: string }> = [
    { row: 14, label: "Total allowable costs", formula: "In_Purchase+In_Costs+In_Improve", name: "TotalCosts" },
    { row: 15, label: "Gain before relief", formula: "MAX(0,In_Sale-TotalCosts)", name: "GrossGain" },
    // PRR qualifying months = lived-in months + final 9 (capped at total), only if it was a home.
    { row: 16, label: "PRR qualifying months", formula: "IF(In_WasHome=1,MIN(In_TotalMonths,MIN(In_HomeMonths,In_TotalMonths)+MIN(PRR_Final,MAX(0,In_TotalMonths-MIN(In_HomeMonths,In_TotalMonths)))),0)", name: "PrrMonths" },
    { row: 17, label: "Private Residence Relief", formula: "IF(AND(In_WasHome=1,In_TotalMonths>0),GrossGain*PrrMonths/In_TotalMonths,0)", name: "PRR" },
    { row: 18, label: "Gain after PRR", formula: "MAX(0,GrossGain-PRR)", name: "GainAfterPrr" },
    { row: 19, label: "Less annual exempt amount", formula: "IF(In_AeaUsed=1,0,MIN(GainAfterPrr,AEA))", name: "AeaUsed" },
    { row: 20, label: "Taxable gain", formula: "MAX(0,GainAfterPrr-AeaUsed)", name: "TaxableGain" },
  ];
  for (const r of gainRows) {
    ws.getCell(`A${r.row}`).value = r.label;
    const c = ws.getCell(`B${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    if (r.name === "PrrMonths") c.numFmt = "#,##0";
    else moneyFmt(c);
    if (r.name) wb.definedNames.add(`'Your figures'!$B$${r.row}`, r.name);
  }

  // --- The tax (column D/E) ---
  headerCell(ws.getCell("D13"), "The tax");
  ws.mergeCells("D13:E13");

  // Unused basic-rate band = basic-rate band − (other income − personal allowance), floored at 0.
  ws.getCell("D14").value = "Unused basic-rate band";
  ws.getCell("E14").value = {
    formula: "MAX(0,BasicRateBand-MAX(0,In_Income-PersonalAllowance))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E14"));
  wb.definedNames.add(`'Your figures'!$E$14`, "UnusedBand");

  ws.getCell("D15").value = "Gain taxed at 18%";
  ws.getCell("E15").value = { formula: "MIN(TaxableGain,UnusedBand)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E15"));
  wb.definedNames.add(`'Your figures'!$E$15`, "AtBasic");

  ws.getCell("D16").value = "Gain taxed at 24%";
  ws.getCell("E16").value = { formula: "TaxableGain-AtBasic" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E16"));
  wb.definedNames.add(`'Your figures'!$E$16`, "AtHigher");

  ws.getCell("D17").value = "Tax at 18%";
  ws.getCell("E17").value = { formula: "AtBasic*CGT_Basic" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E17"));

  ws.getCell("D18").value = "Tax at 24%";
  ws.getCell("E18").value = { formula: "AtHigher*CGT_Higher" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E18"));

  labelCell(ws.getCell("D19"), "Capital Gains Tax due");
  ws.getCell("E19").value = { formula: "AtBasic*CGT_Basic+AtHigher*CGT_Higher" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E19"));
  wb.definedNames.add(`'Your figures'!$E$19`, "CGT");

  ws.getCell("D20").value = "Effective rate (% of gain)";
  ws.getCell("E20").value = { formula: "IF(GrossGain>0,CGT/GrossGain,0)" } as ExcelJS.CellFormulaValue;
  ws.getCell("E20").numFmt = "0.0%";

  labelCell(ws.getCell("D21"), "Net cash after CGT");
  ws.getCell("E21").value = { formula: "In_Sale-TotalCosts-CGT" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E21"));

  ws.getCell("D22").value = "60-day report-and-pay needed?";
  ws.getCell("E22").value = { formula: 'IF(CGT>0,"Yes","No")' } as ExcelJS.CellFormulaValue;

  // --- Joint 50/50 comparison ---
  headerCell(ws.getCell("A23"), "If owned 50/50 with a spouse / civil partner");
  ws.mergeCells("A23:B23");
  ws.getCell("A24").value = "Each owner's taxable gain (half)";
  ws.getCell("B24").value = { formula: "MAX(0,(GainAfterPrr/2)-IF(In_AeaUsed=1,0,MIN(GainAfterPrr/2,AEA)))" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B24"));
  wb.definedNames.add(`'Your figures'!$B$24`, "HalfTaxable");

  ws.getCell("A25").value = "Household CGT if held 50/50";
  // Both owners' half-gains taxed using each one's own band (assumes the same income split shown above is indicative; a simple equal-band model).
  ws.getCell("B25").value = {
    formula:
      "(MIN(HalfTaxable,UnusedBand)*CGT_Basic+MAX(0,HalfTaxable-UnusedBand)*CGT_Higher)*2",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B25"));
  ws.getCell("A26").value = "Potential CGT saved vs sole ownership";
  ws.getCell("B26").value = { formula: "MAX(0,CGT-B25)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B26"));
  ws.getCell("A27").value = "(Indicative: assumes an equal split and equal bands; a real transfer + Form 17 are needed.)";
  ws.getCell("A27").font = { italic: true, color: { argb: "FF64748B" }, size: 10 };

  // Light styling on the body.
  for (let r = 14; r <= 22; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
    ws.getCell(`D${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  ws.getColumn("a").alignment = { wrapText: true };
  ws.getColumn("d").alignment = { wrapText: true };

  /* ------------------------------ Start here ------------------------------- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 95 }];
  const startLines: Array<[string, boolean]> = [
    ["Capital Gains Tax on residential property", true],
    ["", false],
    ["This spreadsheet works out the Capital Gains Tax on selling a buy-to-let or second property:", false],
    ["the gain after your purchase price, buying/selling costs and capital improvements, any Private", false],
    ["Residence Relief if it was once your main home, the £3,000 annual exempt amount, and the 18%/24%", false],
    ["split across your unused basic-rate band. It also shows the household bill if the property were", false],
    ["held 50/50 with a spouse or civil partner.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: prices, costs, improvements, your income, and (if it was once your", false],
    ["   home) the months owned and lived in. Use 1 for yes and 0 for no on the two flags.", false],
    ["3. Everything else updates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked tax rates and is the same source the website calculator uses.", false],
    ["Read the 'Notes' tab for the assumptions and what this model does NOT cover.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 16 : 12, color: { argb: SLATE_900 } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_100 } };
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
    "• The gain is sale proceeds less the original purchase price, less buying and selling costs (legal",
    "  and agent fees, the SDLT you paid) and the cost of capital improvements. Ordinary repairs and",
    "  maintenance are NOT deductible against the gain (they are revenue costs against rental income).",
    "",
    "• Annual exempt amount: £3,000 per individual for 2026/27. Residential gains above it are taxed at",
    "  18% within your unused basic-rate band and 24% above it; your other income sets the split.",
    "",
    "• Private Residence Relief is apportioned straight-line: gain × (qualifying months ÷ total months",
    "  owned). Qualifying months = months you actually lived there as your only/main home PLUS the final",
    "  9 months of ownership, capped at total ownership. This applies only if the property was at some",
    "  point your main residence.",
    "",
    "• Letting Relief is NOT included: since 6 April 2020 it is only available where you shared the home",
    "  with your tenant. Other deemed-occupation periods (job-related, working abroad) are also not",
    "  modelled. Both can change the answer and should be checked for your facts.",
    "",
    "• The 50/50 figure is indicative. It assumes an equal beneficial split and an equal band for each",
    "  owner. In reality a spouse's own income sets their band, and you need a genuine transfer before",
    "  exchange (no-gain/no-loss under s.58 TCGA 1992), a declaration of trust, and a Form 17 election",
    "  to depart from the default 50/50 split on jointly held property.",
    "",
    "• Where CGT is due, UK residents must report and pay it within 60 days of completion through HMRC's",
    "  CGT on UK property service — separate from, and earlier than, the Self Assessment return.",
    "",
    "• Figures are rounded and use 2026/27 rates. This is general guidance, not advice for your specific",
    "  situation. Speak to a property tax specialist before acting.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  // Order the tabs: Start here, Your figures, Rates, Notes.
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
