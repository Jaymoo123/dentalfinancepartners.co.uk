/**
 * UDA value Excel model builder for Dental Finance Partners.
 *
 * Produces a workbook with live formulas tracing calcUdaValue() from
 * src/lib/tools/compute/uda-value.ts.
 *
 * Golden case (brief §4.1, compute lib defaults):
 *   region=england, udas=12000, contractValue=336000, yearSigned=2019
 *   -> effectiveUda=28, yearsSinceSigned=7, realValuePerUda~=23.5554, position="within"
 *
 * Constants from uda-value.ts:
 *   CURRENT_YEAR = 2026, CPI_PROXY = 0.025
 *   england: [25, 35], wales: [25, 38], ni: [21, 32]
 */
import ExcelJS from "exceljs";

const NAVY = "FF001b3d";
const GOLD = "FFb8975d";
const GOLD_LIGHT = "FFF5EDD8";
const WHITE = "FFFFFFFF";
const INK = "FF1A1A2E";

// Constants from uda-value.ts
const CURRENT_YEAR = 2026;
const CPI_PROXY = 0.025;

const REGION_OPTIONS = [
  { label: "England", low: 25, high: 35 },
  { label: "Wales", low: 25, high: 38 },
  { label: "Northern Ireland", low: 21, high: 32 },
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
  cell.numFmt = "£#,##0.00";
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Dental Finance Partners";
  wb.lastModifiedBy = "Dental Finance Partners";

  // ---- Lookup sheet (hidden) ----
  const lookup = wb.addWorksheet("Lookup");
  lookup.state = "hidden";

  lookup.getCell("A1").value = "region";
  lookup.getCell("B1").value = "low";
  lookup.getCell("C1").value = "high";
  REGION_OPTIONS.forEach((r, i) => {
    lookup.getCell(`A${i + 2}`).value = r.label;
    lookup.getCell(`B${i + 2}`).value = r.low;
    lookup.getCell(`C${i + 2}`).value = r.high;
  });
  wb.definedNames.add("Lookup!$A$2:$A$4", "RegionLabels");
  wb.definedNames.add("Lookup!$B$2:$B$4", "BenchLow");
  wb.definedNames.add("Lookup!$C$2:$C$4", "BenchHigh");

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: NAVY } },
  });
  rates.columns = [
    { key: "label", width: 54 },
    { key: "value", width: 18 },
  ];
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "CurrentYear", label: "Current year (for CPI calculation)", value: CURRENT_YEAR },
    { name: "CpiProxy", label: "CPI proxy per year (simplified 2.5%)", value: CPI_PROXY, pct: true },
  ];
  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0.00%" : "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: GOLD } },
  });
  ws.columns = [
    { key: "a", width: 46 },
    { key: "b", width: 22 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 22 },
  ];

  navyHeader(ws.getCell("A1"), "Your contract: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // Inputs
  labelCell(ws.getCell("A3"), "Region");
  ws.getCell("B3").value = "England";
  ws.getCell("B3").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ["RegionLabels"],
  };
  goldInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_Region");

  labelCell(ws.getCell("A4"), "Annual UDAs contracted");
  ws.getCell("B4").value = 12000;
  ws.getCell("B4").numFmt = "#,##0";
  goldInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_Udas");

  labelCell(ws.getCell("A5"), "Annual contract value (GBP)");
  ws.getCell("B5").value = 336000;
  ws.getCell("B5").numFmt = "£#,##0";
  goldInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_ContractValue");

  labelCell(ws.getCell("A6"), "Year contract was signed");
  ws.getCell("B6").value = 2019;
  ws.getCell("B6").numFmt = "0";
  goldInput(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_YearSigned");

  // ---- Calculations ----
  // effectiveUda = contractValue / udas (if udas > 0)
  labelCell(ws.getCell("A8"), "Effective value per UDA (GBP)");
  ws.getCell("B8").value = { formula: "IF(In_Udas>0,In_ContractValue/In_Udas,0)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "EffectiveUda");

  // yearsSinceSigned
  labelCell(ws.getCell("A9"), "Years since contract signed");
  ws.getCell("B9").value = { formula: "MAX(0,CurrentYear-In_YearSigned)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B9").numFmt = "0";
  wb.definedNames.add("'Your figures'!$B$9", "YearsSinceSigned");

  // cumulativeCpi = (1+CpiProxy)^years - 1
  labelCell(ws.getCell("A10"), "Cumulative CPI erosion");
  ws.getCell("B10").value = { formula: "POWER(1+CpiProxy,YearsSinceSigned)-1" } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "CumulativeCpi");

  // realValuePerUda = effectiveUda / (1+cumulativeCpi)
  labelCell(ws.getCell("A11"), "Real value per UDA in today's money (GBP)");
  ws.getCell("B11").value = { formula: "EffectiveUda/(1+CumulativeCpi)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  ws.getCell("A11").font = { bold: true };
  ws.getCell("B11").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$11", "RealValuePerUda");

  // Benchmark low and high from lookup
  labelCell(ws.getCell("A12"), "Regional benchmark (low) (GBP)");
  ws.getCell("B12").value = { formula: "IFERROR(VLOOKUP(In_Region,CHOOSE({1,2},RegionLabels,BenchLow),2,0),25)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B12").numFmt = "£#,##0.00";
  wb.definedNames.add("'Your figures'!$B$12", "BenchmarkLow");

  labelCell(ws.getCell("A13"), "Regional benchmark (high) (GBP)");
  ws.getCell("B13").value = { formula: "IFERROR(VLOOKUP(In_Region,CHOOSE({1,2},RegionLabels,BenchHigh),2,0),35)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B13").numFmt = "£#,##0.00";
  wb.definedNames.add("'Your figures'!$B$13", "BenchmarkHigh");

  // Position vs benchmark
  labelCell(ws.getCell("A14"), "Position vs regional benchmark");
  ws.getCell("B14").value = {
    formula: 'IF(EffectiveUda<BenchmarkLow,"Below benchmark",IF(EffectiveUda>BenchmarkHigh,"Above benchmark","Within benchmark"))',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$14", "BenchmarkPosition");

  // ---- Summary panel (D/E) ----
  goldHeader(ws.getCell("D1"), "Summary");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean; fmt?: string }> = [
    { row: 3, label: "UDAs contracted", formula: "In_Udas", fmt: "#,##0" },
    { row: 4, label: "Contract value", formula: "In_ContractValue", fmt: "£#,##0" },
    { row: 5, label: "Effective UDA value", formula: "EffectiveUda", strong: true, fmt: "£#,##0.00" },
    { row: 7, label: "Years since signed", formula: "YearsSinceSigned", fmt: "0" },
    { row: 8, label: "Cumulative CPI erosion", formula: "CumulativeCpi", fmt: "0.00%" },
    { row: 9, label: "Real value per UDA", formula: "RealValuePerUda", strong: true, fmt: "£#,##0.00" },
    { row: 11, label: "Benchmark low", formula: "BenchmarkLow", fmt: "£#,##0.00" },
    { row: 12, label: "Benchmark high", formula: "BenchmarkHigh", fmt: "£#,##0.00" },
    { row: 13, label: "Position", formula: "BenchmarkPosition", fmt: "@" },
  ];

  for (const r of results) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: NAVY } };
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    if (r.fmt) c.numFmt = r.fmt;
    if (r.strong) c.font = { bold: true, color: { argb: NAVY } };
  }

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: GOLD } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["UDA contract value model", true],
    ["Dental Finance Partners", false],
    ["", false],
    ["This model shows your effective value per UDA, how it compares to the regional", false],
    ["benchmark, and how its real-terms value has eroded since your contract was signed.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to 'Your figures' and edit the highlighted cells.", false],
    ["2. Enter your region, UDA count, contract value and year signed.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["Benchmark ranges are indicative. Your commissioner sets the actual per-UDA rate.", false],
    ["See 'Notes' for assumptions.", false],
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
    "Current year: 2026. CPI proxy: 2.5% per year (simplified constant; actual UK CPI",
    "since 2006 has averaged higher).",
    "",
    "England benchmark: GBP25 to GBP35. Wales: GBP25 to GBP38. Northern Ireland: GBP21 to GBP32.",
    "These are indicative ranges. Your commissioner sets the actual rate.",
    "",
    "Effective UDA = contract value divided by UDA count. This is the rate before patient charges.",
    "Patient charges count towards the contract value, not in addition to it.",
    "",
    "Real value per UDA = effective UDA value divided by (1 + cumulative CPI). This shows",
    "roughly what the rate is worth in today's money if inflation has been 2.5% per year.",
    "",
    "Under-delivery: below 96% triggers a clawback. Shortfall of up to 4% carries forward.",
    "Track UDAs against target monthly to avoid year-end surprises.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: NAVY } };
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Lookup", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}

// Suppress unused import warning
void pctFmt;
