/**
 * Stamp Duty (SDLT) Excel model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS:
 *   - "Start here"  : what the model is + how to use it.
 *   - "Your figures": one purchase price → SDLT computed four ways (standard,
 *                     additional property, non-resident, first-time buyer) with
 *                     full band-by-band cell formulas (no hard-coded results).
 *   - "Rates"       : LOCKED sheet written from the SAME constants the site math
 *                     uses (imported below) so the spreadsheet and the site can
 *                     never drift. The Your-figures formulas reference these cells.
 *   - "Notes"       : assumptions + disclaimers mirroring the on-site notes.
 *
 * The band math here intentionally mirrors lib/sdlt.ts / lib/sdltScenarios.ts; a
 * golden check (stamp-duty.golden.ts) asserts the formula result equals the TS
 * compute for a sample price before the category's xlsx flag is flipped on.
 */
import ExcelJS from "exceljs";
import {
  STANDARD_SDLT_BANDS,
  FTB_SDLT_BANDS,
  ADDITIONAL_DWELLING_SURCHARGE,
} from "../../../src/lib/sdlt";
import { NON_RESIDENT_SURCHARGE, FTB_PRICE_CAP } from "../../../src/lib/sdltScenarios";

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

// The four finite band thresholds (the £Infinity top band is the 12% rate above
// the last threshold, handled in the formula by the MAX/over-top term).
const STD_THRESHOLDS = STANDARD_SDLT_BANDS.filter((b) => Number.isFinite(b.upTo));
const TOP_STD_RATE = STANDARD_SDLT_BANDS[STANDARD_SDLT_BANDS.length - 1].rate;
const FTB_THRESHOLDS = FTB_SDLT_BANDS.filter((b) => Number.isFinite(b.upTo));

/**
 * Build a marginal-SDLT cell formula across a set of band threshold names and a
 * top rate, against a price cell name. Each slice is
 *   (MIN(price, upper) - lower, but not below 0) * rate.
 * `bandCells` are [thresholdNameOrEmpty, rateName] pairs where an empty threshold
 * means "Infinity" (the top band): the slice runs from the previous threshold to
 * the price.
 */
function marginalFormula(
  priceName: string,
  bands: Array<{ lowerName: string | null; upperName: string | null; rateName: string }>,
): string {
  const terms = bands.map(({ lowerName, upperName, rateName }) => {
    const lower = lowerName ?? "0";
    const upper = upperName ?? priceName; // top band: up to the price itself
    return `MAX(0,MIN(${priceName},${upper})-${lower})*${rateName}`;
  });
  return terms.join("+");
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

  // Named single cells so the Your-figures sheet can reference them by name.
  // Standard band thresholds + rates, FTB thresholds + rates, the two surcharges
  // and the FTB price cap — all from the locked lib constants.
  const rateRows: Array<{ name: string; label: string; value: number; money?: boolean; pct?: boolean }> = [
    { name: "Std_T1", label: "Standard band 1 upper (£)", value: STD_THRESHOLDS[0].upTo, money: true },
    { name: "Std_T2", label: "Standard band 2 upper (£)", value: STD_THRESHOLDS[1].upTo, money: true },
    { name: "Std_T3", label: "Standard band 3 upper (£)", value: STD_THRESHOLDS[2].upTo, money: true },
    { name: "Std_T4", label: "Standard band 4 upper (£)", value: STD_THRESHOLDS[3].upTo, money: true },
    { name: "Std_R1", label: "Standard band 1 rate (to T1)", value: STANDARD_SDLT_BANDS[0].rate, pct: true },
    { name: "Std_R2", label: "Standard band 2 rate (T1–T2)", value: STANDARD_SDLT_BANDS[1].rate, pct: true },
    { name: "Std_R3", label: "Standard band 3 rate (T2–T3)", value: STANDARD_SDLT_BANDS[2].rate, pct: true },
    { name: "Std_R4", label: "Standard band 4 rate (T3–T4)", value: STANDARD_SDLT_BANDS[3].rate, pct: true },
    { name: "Std_R5", label: "Standard top rate (above T4)", value: TOP_STD_RATE, pct: true },
    { name: "Ftb_T1", label: "First-time-buyer band 1 upper (£)", value: FTB_THRESHOLDS[0].upTo, money: true },
    { name: "Ftb_T2", label: "First-time-buyer band 2 upper (£)", value: FTB_THRESHOLDS[1].upTo, money: true },
    { name: "Ftb_R1", label: "First-time-buyer band 1 rate (to T1)", value: FTB_SDLT_BANDS[0].rate, pct: true },
    { name: "Ftb_R2", label: "First-time-buyer band 2 rate (T1–T2)", value: FTB_SDLT_BANDS[1].rate, pct: true },
    { name: "Ftb_Cap", label: "First-time-buyer relief price cap (£)", value: FTB_PRICE_CAP, money: true },
    { name: "Surcharge_Add", label: "Additional-dwelling surcharge", value: ADDITIONAL_DWELLING_SURCHARGE, pct: true },
    { name: "Surcharge_NonRes", label: "Non-UK-resident surcharge", value: NON_RESIDENT_SURCHARGE, pct: true },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0%" : r.money ? "£#,##0" : "#,##0.######";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  // Protect the rates sheet so the locked figures cannot be edited in Excel.
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ----------------------------- Your figures ------------------------------ */
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: EMERALD } },
  });
  ws.columns = [
    { key: "a", width: 48 },
    { key: "b", width: 18 },
  ];

  headerCell(ws.getCell("A1"), "Your figures — edit the blue cell");
  ws.mergeCells("A1:B1");

  // --- Input (unlocked) ---
  labelCell(ws.getCell("A3"), "Purchase price");
  const priceCell = ws.getCell("B3");
  priceCell.value = 350000;
  moneyFmt(priceCell);
  priceCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
  priceCell.protection = { locked: false };
  wb.definedNames.add(`'Your figures'!$B$3`, "Price");

  // --- Standard band SDLT (the base figure every scenario builds on) ---
  const stdBands = [
    { lowerName: "0", upperName: "Std_T1", rateName: "Std_R1" },
    { lowerName: "Std_T1", upperName: "Std_T2", rateName: "Std_R2" },
    { lowerName: "Std_T2", upperName: "Std_T3", rateName: "Std_R3" },
    { lowerName: "Std_T3", upperName: "Std_T4", rateName: "Std_R4" },
    { lowerName: "Std_T4", upperName: null, rateName: "Std_R5" },
  ];
  ws.getCell("A5").value = "Standard band SDLT (no surcharge)";
  ws.getCell("B5").value = { formula: marginalFormula("Price", stdBands) } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B5"));
  wb.definedNames.add(`'Your figures'!$B$5`, "StdBase");

  // --- Surcharge components ---
  ws.getCell("A6").value = "Additional-dwelling surcharge (5% of price)";
  ws.getCell("B6").value = { formula: "Price*Surcharge_Add" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B6"));
  wb.definedNames.add(`'Your figures'!$B$6`, "AddSurcharge");

  ws.getCell("A7").value = "Non-resident surcharge (2% of price)";
  ws.getCell("B7").value = { formula: "Price*Surcharge_NonRes" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B7"));
  wb.definedNames.add(`'Your figures'!$B$7`, "NonResSurcharge");

  // --- The four scenario totals ---
  headerCell(ws.getCell("A9"), "SDLT by buyer type");
  ws.mergeCells("A9:B9");

  // 1) Standard (main home): just the band SDLT.
  ws.getCell("A10").value = "Standard — replacement main home";
  ws.getCell("B10").value = { formula: "StdBase" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));

  // 2) Additional property: band SDLT + 5%.
  labelCell(ws.getCell("A11"), "Additional property (buy-to-let / second home)");
  ws.getCell("B11").value = { formula: "StdBase+AddSurcharge" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add(`'Your figures'!$B$11`, "AdditionalTotal");

  // 3) Non-resident buy-to-let: band SDLT + 5% + 2%.
  ws.getCell("A12").value = "Non-resident buy-to-let (+2% and +5%)";
  ws.getCell("B12").value = { formula: "StdBase+AddSurcharge+NonResSurcharge" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));

  // 4) First-time buyer: FTB-relief bands if price <= cap, else standard rates.
  const ftbBands = [
    { lowerName: "0", upperName: "Ftb_T1", rateName: "Ftb_R1" },
    { lowerName: "Ftb_T1", upperName: "Ftb_T2", rateName: "Ftb_R2" },
  ];
  ws.getCell("A13").value = "First-time buyer (relief, withdrawn above cap)";
  ws.getCell("B13").value = {
    formula: `IF(Price>Ftb_Cap,StdBase,${marginalFormula("Price", ftbBands)})`,
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));

  // --- The headline the page leads on: cost of the 5% surcharge ---
  headerCell(ws.getCell("A15"), "What the surcharges add");
  ws.mergeCells("A15:B15");
  labelCell(ws.getCell("A16"), "Extra cost of the 5% additional-property surcharge");
  ws.getCell("B16").value = { formula: "AdditionalTotal-StdBase" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  ws.getCell("A17").value = "Extra again as a non-UK resident (the 2%)";
  ws.getCell("B17").value = { formula: "NonResSurcharge" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  ws.getCell("A18").value = "Effective rate on an additional property";
  ws.getCell("B18").value = { formula: "IF(Price>0,AdditionalTotal/Price,0)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B18").numFmt = "0.0%";

  // Light styling on the body.
  for (let r = 5; r <= 18; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  ws.getColumn("a").alignment = { wrapText: true };

  /* ------------------------------ Start here ------------------------------- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Stamp Duty (SDLT) by buyer type", true],
    ["", false],
    ["This spreadsheet works out the Stamp Duty Land Tax on a single property purchase four different", false],
    ["ways at once: a standard main-home purchase, an additional property (buy-to-let or second home,", false],
    ["with the 5% surcharge), a non-UK-resident buy-to-let (the extra 2%), and first-time-buyer relief.", false],
    ["It also shows what each surcharge adds over a plain purchase.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the single blue cell: the purchase price.", false],
    ["3. Every scenario and the surcharge costs update automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked bands and surcharges and is the same source the website", false],
    ["calculator uses. Read the 'Notes' tab for the assumptions and what this model does NOT cover.", false],
    ["", false],
    ["England and Northern Ireland only. Scotland (LBTT) and Wales (LTT) are separate taxes.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
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
    "• Scope: residential Stamp Duty Land Tax in ENGLAND and NORTHERN IRELAND, at the rates in force",
    "  from 1 April 2025. Scotland charges Land and Buildings Transaction Tax (LBTT, with an 8% Additional",
    "  Dwelling Supplement) and Wales charges Land Transaction Tax (LTT) — different bands, not modelled here.",
    "",
    "• Standard bands are charged in slices: 0% to £125,000, 2% on £125,001–£250,000, 5% on",
    "  £250,001–£925,000, 10% on £925,001–£1,500,000 and 12% above £1,500,000. Each rate applies only to",
    "  the part of the price in its band.",
    "",
    "• Additional-dwelling surcharge: a flat 5% of the WHOLE price is added on top of standard rates for a",
    "  buy-to-let, a second home, or any purchase by a company (raised from 3% to 5% on 31 October 2024).",
    "",
    "• Non-resident surcharge: a further 2% of the whole price for a non-UK-resident purchaser. A non-resident",
    "  buying an additional property pays BOTH the 5% and the 2%.",
    "",
    "• First-time-buyer relief: 0% on the first £300,000 and 5% on £300,000–£500,000. It is withdrawn",
    "  completely once the price exceeds £500,000 (standard rates then apply), and it never applies to an",
    "  additional property.",
    "",
    "• NOT modelled: mixed-use property, deals of six or more dwellings (s.116(7) non-residential treatment),",
    "  uninhabitable property, linked transactions, leasehold premiums and net-present-value rent, and the",
    "  15% Schedule 4A rate for certain corporate purchases over £500,000. Multiple Dwellings Relief was",
    "  abolished for transactions on or after 1 June 2024 and is not available.",
    "",
    "• Figures are rounded to whole pounds and use current rates. This is general guidance, not advice for your",
    "  specific purchase. Speak to a property tax specialist before you exchange.",
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
