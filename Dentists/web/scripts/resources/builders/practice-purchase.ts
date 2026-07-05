/**
 * Practice purchase (buying) Excel model builder for Dental Finance Partners.
 *
 * Produces a workbook with live formulas tracing calcPracticeValuation() from
 * src/lib/tools/compute/practice-valuation.ts, plus a second sheet for
 * practice affordability using calcAffordability() from practice-affordability.ts.
 *
 * Golden case (brief §4.1, compute lib defaults):
 *   ebitda=200000, mix=mixed, region=midlands, demand=normal, tangibles=60000
 *   -> goodwillLow=170000, goodwillHigh=230000, totalLow=230000, totalHigh=290000
 *   midpoint=260000
 *
 * The valuation workbook uses the same MIX_BASE and regional/demand adjustments
 * as the compute lib, applied via Excel lookup tables.
 */
import ExcelJS from "exceljs";

const NAVY = "FF001b3d";
const GOLD = "FFb8975d";
const GOLD_LIGHT = "FFF5EDD8";
const WHITE = "FFFFFFFF";
const INK = "FF1A1A2E";

// Mix multiples [low, high]: matches MIX_BASE in compute lib
const MIX_OPTIONS = [
  { key: "nhs-heavy", label: "NHS-heavy", low: 0.65, high: 0.95 },
  { key: "mixed", label: "Mixed", low: 0.85, high: 1.15 },
  { key: "private-heavy", label: "Private-heavy", low: 1.05, high: 1.45 },
];

// Regional adjustments
const REGION_OPTIONS = [
  { key: "london", label: "London", adj: 0.10 },
  { key: "south", label: "South", adj: 0.05 },
  { key: "midlands", label: "Midlands", adj: 0.00 },
  { key: "north", label: "North", adj: -0.05 },
  { key: "wales", label: "Wales", adj: -0.05 },
  { key: "ni", label: "Northern Ireland", adj: -0.05 },
];

// Demand adjustments
const DEMAND_OPTIONS = [
  { key: "low", label: "Low", adj: -0.10 },
  { key: "normal", label: "Normal", adj: 0.00 },
  { key: "high", label: "High", adj: 0.10 },
];

function navyHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  cell.alignment = { vertical: "middle" };
}

function goldHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: NAVY }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function goldInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
  cell.protection = { locked: false };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0";
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Dental Finance Partners";
  wb.lastModifiedBy = "Dental Finance Partners";

  // ---- Lookup sheet (hidden lookup tables) ----
  const lookup = wb.addWorksheet("Lookup");
  lookup.state = "hidden";

  // Mix lookup: A=key, B=low, C=high
  lookup.getCell("A1").value = "mix";
  lookup.getCell("B1").value = "low";
  lookup.getCell("C1").value = "high";
  MIX_OPTIONS.forEach((m, i) => {
    lookup.getCell(`A${i + 2}`).value = m.label;
    lookup.getCell(`B${i + 2}`).value = m.low;
    lookup.getCell(`C${i + 2}`).value = m.high;
  });
  wb.definedNames.add("Lookup!$A$2:$A$4", "MixLabels");
  wb.definedNames.add("Lookup!$B$2:$B$4", "MixLow");
  wb.definedNames.add("Lookup!$C$2:$C$4", "MixHigh");

  // Region lookup: D=label, E=adj
  lookup.getCell("D1").value = "region";
  lookup.getCell("E1").value = "adj";
  REGION_OPTIONS.forEach((r, i) => {
    lookup.getCell(`D${i + 2}`).value = r.label;
    lookup.getCell(`E${i + 2}`).value = r.adj;
  });
  wb.definedNames.add("Lookup!$D$2:$D$7", "RegionLabels");
  wb.definedNames.add("Lookup!$E$2:$E$7", "RegionAdj");

  // Demand lookup: G=label, H=adj
  lookup.getCell("G1").value = "demand";
  lookup.getCell("H1").value = "adj";
  DEMAND_OPTIONS.forEach((d, i) => {
    lookup.getCell(`G${i + 2}`).value = d.label;
    lookup.getCell(`H${i + 2}`).value = d.adj;
  });
  wb.definedNames.add("Lookup!$G$2:$G$4", "DemandLabels");
  wb.definedNames.add("Lookup!$H$2:$H$4", "DemandAdj");

  // ---- Valuation sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: GOLD } },
  });
  ws.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 22 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 22 },
  ];

  navyHeader(ws.getCell("A1"), "Practice valuation inputs: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // Inputs
  labelCell(ws.getCell("A3"), "Normalised EBITDA (GBP)");
  ws.getCell("B3").value = 200000;
  moneyFmt(ws.getCell("B3"));
  goldInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_Ebitda");

  labelCell(ws.getCell("A4"), "NHS/private mix");
  ws.getCell("B4").value = "Mixed";
  ws.getCell("B4").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ["MixLabels"],
  };
  goldInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_Mix");

  labelCell(ws.getCell("A5"), "Region");
  ws.getCell("B5").value = "Midlands";
  ws.getCell("B5").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ["RegionLabels"],
  };
  goldInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_Region");

  labelCell(ws.getCell("A6"), "Market demand");
  ws.getCell("B6").value = "Normal";
  ws.getCell("B6").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ["DemandLabels"],
  };
  goldInput(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_Demand");

  labelCell(ws.getCell("A7"), "Tangible assets (equipment, fittings) (GBP)");
  ws.getCell("B7").value = 60000;
  moneyFmt(ws.getCell("B7"));
  goldInput(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "In_Tangibles");

  // Resolved multiples from lookup
  labelCell(ws.getCell("A9"), "Base multiple (low)");
  ws.getCell("B9").value = { formula: "IFERROR(VLOOKUP(In_Mix,CHOOSE({1,2},MixLabels,MixLow),2,0),0.85)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B9").numFmt = "0.00";
  wb.definedNames.add("'Your figures'!$B$9", "BaseLow");

  labelCell(ws.getCell("A10"), "Base multiple (high)");
  ws.getCell("B10").value = { formula: "IFERROR(VLOOKUP(In_Mix,CHOOSE({1,2},MixLabels,MixHigh),2,0),1.15)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B10").numFmt = "0.00";
  wb.definedNames.add("'Your figures'!$B$10", "BaseHigh");

  labelCell(ws.getCell("A11"), "Regional adjustment");
  ws.getCell("B11").value = { formula: "IFERROR(VLOOKUP(In_Region,CHOOSE({1,2},RegionLabels,RegionAdj),2,0),0)" } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "RegAdj");

  labelCell(ws.getCell("A12"), "Demand adjustment");
  ws.getCell("B12").value = { formula: "IFERROR(VLOOKUP(In_Demand,CHOOSE({1,2},DemandLabels,DemandAdj),2,0),0)" } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "DemAdj");

  // Adjusted multiples (floor of 0.4 low, 0.5 high per compute lib)
  labelCell(ws.getCell("A13"), "Adjusted multiple (low)");
  ws.getCell("B13").value = { formula: "MAX(0.4,BaseLow+RegAdj+DemAdj)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B13").numFmt = "0.00";
  wb.definedNames.add("'Your figures'!$B$13", "AdjLow");

  labelCell(ws.getCell("A14"), "Adjusted multiple (high)");
  ws.getCell("B14").value = { formula: "MAX(0.5,BaseHigh+RegAdj+DemAdj)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B14").numFmt = "0.00";
  wb.definedNames.add("'Your figures'!$B$14", "AdjHigh");

  // Results column (D/E)
  goldHeader(ws.getCell("D1"), "Indicative value range");
  ws.mergeCells("D1:E1");

  labelCell(ws.getCell("D3"), "Goodwill (low)");
  ws.getCell("E3").value = { formula: "In_Ebitda*AdjLow" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E3"));
  wb.definedNames.add("'Your figures'!$E$3", "GoodwillLow");

  labelCell(ws.getCell("D4"), "Goodwill (high)");
  ws.getCell("E4").value = { formula: "In_Ebitda*AdjHigh" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E4"));
  wb.definedNames.add("'Your figures'!$E$4", "GoodwillHigh");

  labelCell(ws.getCell("D5"), "Tangible assets");
  ws.getCell("E5").value = { formula: "In_Tangibles" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E5"));

  labelCell(ws.getCell("D6"), "Total value (low)");
  ws.getCell("E6").value = { formula: "GoodwillLow+In_Tangibles" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E6"));
  ws.getCell("E6").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("D6").font = { bold: true, color: { argb: NAVY } };
  wb.definedNames.add("'Your figures'!$E$6", "TotalLow");

  labelCell(ws.getCell("D7"), "Total value (high)");
  ws.getCell("E7").value = { formula: "GoodwillHigh+In_Tangibles" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E7"));
  ws.getCell("E7").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("D7").font = { bold: true, color: { argb: NAVY } };
  wb.definedNames.add("'Your figures'!$E$7", "TotalHigh");

  labelCell(ws.getCell("D8"), "Mid-point");
  ws.getCell("E8").value = { formula: "(TotalLow+TotalHigh)/2" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E8"));
  ws.getCell("D8").font = { bold: true };
  ws.getCell("E8").font = { bold: true };
  wb.definedNames.add("'Your figures'!$E$8", "MidPoint");

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: GOLD } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Practice purchase model", true],
    ["Dental Finance Partners", false],
    ["", false],
    ["This model gives an indicative value range for a dental practice,", false],
    ["based on EBITDA multiples adjusted for NHS/private mix, region and demand.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to 'Your figures' and edit the highlighted cells.", false],
    ["2. The indicative value range recalculates automatically.", false],
    ["3. See 'Notes' for assumptions and what this model does not cover.", false],
    ["", false],
    ["All figures are indicative. A specialist reviews the actual accounts before any offer.", false],
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
    "Multiples are indicative ranges for the UK dental market 2025/26.",
    "NHS-heavy: 0.65x to 0.95x EBITDA. Mixed: 0.85x to 1.15x. Private-heavy: 1.05x to 1.45x.",
    "",
    "Regional adjustments (added to both ends): London +0.10, South +0.05, Midlands 0,",
    "North/Wales/Northern Ireland -0.05.",
    "",
    "Demand adjustments: Low -0.10, Normal 0, High +0.10.",
    "",
    "Multiples have a floor of 0.4x (low) and 0.5x (high) to prevent negative outputs.",
    "",
    "This model does not: reflect corporate buyer premiums, account for NHS contract",
    "novation haircuts, model earn-outs, or incorporate clinical due diligence.",
    "",
    "Always commission specialist financial due diligence before exchanging contracts.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: NAVY } };
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Lookup", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}

// Suppress unused import warning
void pctFmt;
