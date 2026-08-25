/**
 * Exit and BADR timing model builder.
 *
 * Traces calcBADR for both tax years from lib/tools/compute/badr-cgt.ts.
 * Rates from uk-tax-rates.ts.
 *
 * Default: proceeds=600000, cost=100000, previousBADR=0, meetsEligibility=Yes.
 * Golden: gain=500000, cgt2025=70000 (500000*0.14), cgt2026=90000 (500000*0.18),
 *         extraTax=20000, net2025=530000, net2026=510000.
 */
import ExcelJS from "exceljs";
import { UK_TAX_RATES as T } from "../../../src/lib/uk-tax-rates";

const BADR_RATE_2025_26 = T.capitalGainsTax.badr.rate_2025_26;   // 0.14
const BADR_RATE_2026_27 = T.capitalGainsTax.badr.rate_2026_27_from; // 0.18
const STANDARD_CGT = T.capitalGainsTax.nonResidential.higherRate;  // 0.24
const BADR_LIFETIME_LIMIT = T.capitalGainsTax.badr.lifetimeLimit;  // 1000000

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
function moneyFmt(cell: ExcelJS.Cell) { cell.numFmt = "£#,##0"; }
function blueInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_50 } };
  cell.protection = { locked: false };
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Holloway Davies";
  wb.lastModifiedBy = "Holloway Davies";

  /* ---- Rates ---- */
  const rates = wb.addWorksheet("Rates", { properties: { tabColor: { argb: ORANGE } } });
  rates.columns = [{ key: "label", width: 50 }, { key: "value", width: 18 }];
  headerCell(rates.getCell("A1"), "Locked rates: do not edit");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "BADRRate2025", label: "BADR rate: to 5 April 2026", value: BADR_RATE_2025_26, pct: true },
    { name: "BADRRate2026", label: "BADR rate: from 6 April 2026", value: BADR_RATE_2026_27, pct: true },
    { name: "StandardCGT", label: "Standard CGT (non-residential higher rate)", value: STANDARD_CGT, pct: true },
    { name: "BADRLifetime", label: "BADR lifetime limit (£)", value: BADR_LIFETIME_LIMIT },
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
  const ws = wb.addWorksheet("Your figures", { properties: { tabColor: { argb: ORANGE } } });
  ws.columns = [
    { key: "a", width: 34 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 30 },
    { key: "e", width: 20 },
    { key: "f", width: 20 },
  ];

  headerCell(ws.getCell("A1"), "Your figures: edit the blue cells");
  ws.mergeCells("A1:B1");

  // Inputs
  const inputs: Array<{ row: number; label: string; value: number | string; name: string; money?: boolean; dropdown?: string[] }> = [
    { row: 3, label: "Sale proceeds", value: 600000, name: "Proceeds", money: true },
    { row: 4, label: "Original cost (base cost)", value: 100000, name: "Cost", money: true },
    { row: 5, label: "BADR already used (lifetime, £)", value: 0, name: "PreviousBADR", money: true },
    { row: 6, label: "Meets BADR conditions", value: "Yes", name: "In_BADR", dropdown: ["Yes", "No"] },
  ];

  for (const inp of inputs) {
    labelCell(ws.getCell(`A${inp.row}`), inp.label);
    const c = ws.getCell(`B${inp.row}`);
    c.value = inp.value;
    if (inp.money) moneyFmt(c);
    blueInput(c);
    wb.definedNames.add(`'Your figures'!$B$${inp.row}`, inp.name);
    if (inp.dropdown) {
      c.dataValidation = { type: "list", allowBlank: false, formulae: [`"${inp.dropdown.join(",")}"`] };
    }
  }

  // Derived
  headerCell(ws.getCell("A8"), "Sell before 6 April 2026");
  ws.mergeCells("A8:B8");
  headerCell(ws.getCell("D8"), "Sell on/after 6 April 2026");
  ws.mergeCells("D8:E8");

  // Shared derived
  labelCell(ws.getCell("A9"), "Capital gain");
  ws.getCell("B9").value = { formula: "MAX(0,Proceeds-Cost)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "Gain");

  labelCell(ws.getCell("A10"), "BADR lifetime remaining");
  ws.getCell("B10").value = { formula: "MAX(0,BADRLifetime-PreviousBADR)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "BADRAvailable");

  labelCell(ws.getCell("A11"), "BADR-eligible slice");
  ws.getCell("B11").value = {
    formula: 'IF(In_BADR="Yes",MIN(Gain,BADRAvailable),0)',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "EligibleSlice");

  labelCell(ws.getCell("A12"), "Overflow at standard rate");
  ws.getCell("B12").value = { formula: "MAX(0,Gain-EligibleSlice)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "Overflow");

  // Before 6 Apr 2026 (14%)
  labelCell(ws.getCell("A13"), "BADR rate");
  ws.getCell("B13").value = { formula: "BADRRate2025" } as ExcelJS.CellFormulaValue;
  ws.getCell("B13").numFmt = "0%";

  labelCell(ws.getCell("A14"), "Total CGT (sell before 6 Apr 2026)");
  ws.getCell("B14").value = {
    formula: "EligibleSlice*BADRRate2025+Overflow*StandardCGT",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  ws.getCell("B14").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$14", "CGT2025");

  labelCell(ws.getCell("A15"), "Net proceeds (sell before 6 Apr 2026)");
  ws.getCell("B15").value = { formula: "Proceeds-CGT2025" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "Net2025");

  // On/after 6 Apr 2026 (18%)
  labelCell(ws.getCell("D9"), "Capital gain");
  ws.getCell("E9").value = { formula: "Gain" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E9"));

  labelCell(ws.getCell("D13"), "BADR rate");
  ws.getCell("E13").value = { formula: "BADRRate2026" } as ExcelJS.CellFormulaValue;
  ws.getCell("E13").numFmt = "0%";

  labelCell(ws.getCell("D14"), "Total CGT (sell on/after 6 Apr 2026)");
  ws.getCell("E14").value = {
    formula: "EligibleSlice*BADRRate2026+Overflow*StandardCGT",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E14"));
  ws.getCell("E14").font = { bold: true };
  wb.definedNames.add("'Your figures'!$E$14", "CGT2026");

  labelCell(ws.getCell("D15"), "Net proceeds (sell on/after 6 Apr 2026)");
  ws.getCell("E15").value = { formula: "Proceeds-CGT2026" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E15"));
  wb.definedNames.add("'Your figures'!$E$15", "Net2026");

  // Extra tax by waiting
  headerCell(ws.getCell("A17"), "The cost of completing on/after 6 April 2026");
  ws.mergeCells("A17:B17");
  labelCell(ws.getCell("A18"), "Extra CGT if you miss the date");
  ws.getCell("B18").value = { formula: "CGT2026-CGT2025" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  ws.getCell("B18").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$18", "ExtraTax");

  for (let r = 9; r <= 18; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
    ws.getCell(`D${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", { properties: { tabColor: { argb: SLATE_900 } } });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Exit and BADR timing model", true],
    ["", false],
    ["Shows the Capital Gains Tax on a business sale each side of 6 April 2026, the date the", false],
    ["BADR rate rises from 14% to 18%. On a £500,000 gain that step costs £20,000 more in CGT.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the blue cells: proceeds, original cost, previous BADR used and eligibility.", false],
    ["3. Both scenarios update automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked rates. Read 'Notes' for assumptions.", false],
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
    "• BADR (Business Asset Disposal Relief): 18% from 6 April 2026 (14% in 2025/26) on qualifying gains up to a £1m lifetime",
    "  limit for disposals to 5 April 2026; 18% from 6 April 2026. Gains above the limit",
    "  are taxed at 24% (standard non-residential CGT higher rate).",
    "",
    "• CGT annual exempt amount (£3,000 in 2026/27) is NOT deducted here because most",
    "  sellers will have used it before the exit or on other gains in the same year.",
    "",
    "• This model assumes all of the gain is eligible for BADR. Whether you actually",
    "  meet the conditions (2-year ownership, officer/employee, personal company etc.)",
    "  needs a specialist review.",
    "",
    "• An asset sale and a share sale tax very differently. The model shows one CGT layer.",
    "  Asset sales can trigger corporation tax inside the company first.",
    "",
    "• Speak to a specialist well in advance of any planned completion date.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
