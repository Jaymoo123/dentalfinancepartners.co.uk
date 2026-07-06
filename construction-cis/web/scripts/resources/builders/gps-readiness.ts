/**
 * GPS (Gross Payment Status) readiness Excel model builder for Trade Tax Specialists.
 *
 * Implements the CORRECTED HP §2 two-route rule for partnerships and limited companies:
 *   turnover >= (GPS_PER_HEAD * heads)   [per-head route]
 *   OR
 *   turnover >= GPS_WHOLE_BUSINESS_CAP   [£100,000 whole-business route]
 *
 * Either route passes. Sole traders / closely-controlled companies use only the
 * per-head route with no whole-business alternative.
 *
 * CRITICAL golden case (the single most important correctness point, per brief §4):
 *   entity = partnership, heads = 3, turnover = 95,000
 *   -> per-head threshold = 3 * 30,000 = 90,000
 *   -> 95,000 >= 90,000 = PASS (per-head route; whole-biz route does NOT apply)
 *   -> annual gain = 95,000 * 0.20 = 19,000
 *
 * GPS maths sourced EXCLUSIVELY from gpsThreshold() / gpsQualifiesOnTurnover()
 * in src/lib/calculators/cis-tax.ts. Constants are mirrored here with traced comments.
 * The golden test (gps-readiness.test.ts) is the drift guard.
 *
 * Entity code mapping (for workbook dropdown + formula branching):
 *   1 = Sole trader
 *   2 = Partnership
 *   3 = Limited company
 *   4 = Closely controlled company
 *
 * LET-FREE formulas throughout (Medical incorporation.ts pattern, no LET()).
 *
 * Brand: Trade Tax Specialists (orange #f97316, slate #1e293b).
 * No em-dashes in any cell text. No "DJH". Creator = "Trade Tax Specialists".
 */
import ExcelJS from "exceljs";

// ---- Colours (Trade Tax Specialists brand) ----
const ORANGE = "FFf97316";
const ORANGE_LIGHT = "FFfff7ed";
const SLATE = "FF1e293b";
const WHITE = "FFFFFFFF";
const GREEN_LIGHT = "FFdcfce7"; // pass highlight
const RED_LIGHT = "FFfee2e2"; // fail highlight

// ---- Locked constants: traced to src/lib/calculators/cis-tax.ts ----
// GPS_PER_HEAD = 30000   traced: GPS_PER_HEAD
// GPS_WHOLE_BUSINESS_CAP = 100000  traced: GPS_WHOLE_BUSINESS_CAP
const GPS_PER_HEAD_CONST = 30000;
const GPS_WHOLE_BIZ_CONST = 100000;

// ---- Shared style helpers ----
function orangeHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ORANGE } };
  cell.alignment = { vertical: "middle" };
}

function slateHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: SLATE } };
}

function inputCell(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ORANGE_LIGHT } };
  cell.protection = { locked: false };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "#,##0.00";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Trade Tax Specialists";
  wb.lastModifiedBy = "Trade Tax Specialists";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: SLATE } },
  });
  rates.columns = [
    { key: "label", width: 80 },
    { key: "value", width: 18 },
  ];
  slateHeader(rates.getCell("A1"), "Locked rates: do not edit (HP section 2, Finance Act 2026 anti-fraud regime)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number }> = [
    { name: "GPS_PER_HEAD", label: "GPS turnover threshold per head (GBP, HP section 2)", value: GPS_PER_HEAD_CONST },
    { name: "GPS_WHOLE_BIZ", label: "GPS whole-business qualifying route (GBP, HP section 2 - partnerships and limited companies only)", value: GPS_WHOLE_BIZ_CONST },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  // ---- Entity lookup sheet (hidden) ----
  const lookup = wb.addWorksheet("EntityLookup", {
    state: "veryHidden",
  });
  lookup.columns = [{ width: 32 }];
  [
    "Sole trader",
    "Partnership",
    "Limited company",
    "Closely controlled company",
  ].forEach((name, i) => {
    lookup.getCell(`A${i + 1}`).value = name;
  });
  wb.definedNames.add("EntityLookup!$A$1:$A$4", "EntityNameList");

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: ORANGE } },
  });
  ws.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
    { key: "c", width: 4 },
    { key: "d", width: 34 },
    { key: "e", width: 22 },
  ];

  slateHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs ----
  labelCell(ws.getCell("A3"), "Business structure (1=Sole trader, 2=Partnership, 3=Limited company, 4=Closely controlled)");
  ws.getCell("B3").value = 2; // default: partnership
  ws.getCell("B3").numFmt = "0";
  inputCell(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_EntityCode");

  // Data validation for entity dropdown
  ws.getCell("B3").dataValidation = {
    type: "whole",
    operator: "between",
    formulae: [1, 4],
    showErrorMessage: true,
    errorTitle: "Invalid code",
    error: "Enter 1 (Sole trader), 2 (Partnership), 3 (Limited), or 4 (Closely controlled).",
  };

  // Display entity name (read-only helper)
  labelCell(ws.getCell("A4"), "Entity name (auto-filled)");
  ws.getCell("B4").value = {
    formula:
      "INDEX(EntityNameList,In_EntityCode)",
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$4", "In_EntityName");

  labelCell(ws.getCell("A5"), "Number of partners / directors / controllers (enter 1 for sole traders)");
  ws.getCell("B5").value = 3; // default: 3 partners
  ws.getCell("B5").numFmt = "0";
  inputCell(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_Heads");

  labelCell(ws.getCell("A6"), "Annual CIS turnover (net contract payments received, GBP)");
  ws.getCell("B6").value = 95000;
  moneyFmt(ws.getCell("B6"));
  inputCell(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_Turnover");

  labelCell(ws.getCell("A7"), "CIS deduction rate currently applied (0.20 for registered, 0.30 for unregistered)");
  ws.getCell("B7").value = 0.20;
  ws.getCell("B7").numFmt = "0%";
  inputCell(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "In_CisRate");

  // ---- GPS readiness calculations ----
  slateHeader(ws.getCell("A9"), "GPS readiness assessment");
  ws.mergeCells("A9:B9");

  // Per-head threshold:
  // Sole trader (1): GPS_PER_HEAD (fixed, no partner multiplier)
  // Partnership (2): GPS_PER_HEAD * heads
  // Limited (3): GPS_PER_HEAD * heads
  // Closely controlled (4): GPS_PER_HEAD * heads (no whole-biz route)
  // All use GPS_PER_HEAD * MAX(1, heads), sole trader cap at GPS_PER_HEAD
  labelCell(ws.getCell("A10"), "Per-head qualifying threshold (GBP)");
  ws.getCell("B10").value = {
    formula: "IF(In_EntityCode=1,GPS_PER_HEAD,GPS_PER_HEAD*MAX(1,In_Heads))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "GPS_PerHeadThreshold");

  // Whole-business route applies? Only partnership (2) and limited (3)
  // (In_EntityCode=2)+(In_EntityCode=3) gives 1 if either matches, else 0
  labelCell(ws.getCell("A11"), "Whole-business route applies (partnerships and limited companies only)");
  ws.getCell("B11").value = {
    formula: 'IF((In_EntityCode=2)+(In_EntityCode=3)>0,"Yes","No")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$11", "GPS_WholeBizApplies");

  // Passes per-head route?
  labelCell(ws.getCell("A12"), "Passes per-head route? (turnover >= per-head threshold)");
  ws.getCell("B12").value = {
    formula: 'IF(In_Turnover>=GPS_PerHeadThreshold,"Yes","No")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$12", "GPS_PassesPerHead");

  // Passes whole-business route?
  labelCell(ws.getCell("A13"), "Passes whole-business route? (turnover >= GBP 100,000, where applicable)");
  ws.getCell("B13").value = {
    formula:
      'IF((In_EntityCode=2)+(In_EntityCode=3)>0,' +
      'IF(In_Turnover>=GPS_WHOLE_BIZ,"Yes","No"),' +
      '"N/A")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$13", "GPS_PassesWholeBiz");

  // Overall result: PASS if per-head OR (applicable AND whole-biz)
  // LET-free: compute as integer check
  // passInt = (In_Turnover>=GPS_PerHeadThreshold) + ((In_EntityCode=2)+(In_EntityCode=3)>0)*(In_Turnover>=GPS_WHOLE_BIZ)
  // IF(passInt>0,"PASS","FAIL")
  labelCell(ws.getCell("A14"), "Overall GPS turnover test result");
  ws.getCell("B14").value = {
    formula:
      'IF((In_Turnover>=GPS_PerHeadThreshold)+(((In_EntityCode=2)+(In_EntityCode=3)>0)*(In_Turnover>=GPS_WHOLE_BIZ))>0,"PASS","FAIL")',
  } as ExcelJS.CellFormulaValue;
  ws.getCell("A14").font = { bold: true, color: { argb: SLATE } };
  ws.getCell("B14").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$14", "GPS_Result");

  // Route used (for information)
  labelCell(ws.getCell("A15"), "Route used (for information)");
  ws.getCell("B15").value = {
    formula:
      'IF(GPS_Result="FAIL","N/A",' +
      'IF(In_Turnover>=GPS_PerHeadThreshold,"Per-head route","Whole-business route (GBP 100,000)"))',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$15", "GPS_RouteUsed");

  // Annual gain: cash retained by not having CIS deducted at source
  labelCell(ws.getCell("A16"), "Annual cash-flow gain if GPS granted (deductions saved at current CIS rate, GBP)");
  ws.getCell("B16").value = {
    formula: "In_Turnover*In_CisRate",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  ws.getCell("A16").font = { bold: true, color: { argb: SLATE } };
  ws.getCell("B16").font = { bold: true, color: { argb: SLATE } };
  wb.definedNames.add("'Your figures'!$B$16", "GPS_AnnualGain");

  // Integrity check
  labelCell(ws.getCell("A17"), "Integrity check: heads >= 1");
  ws.getCell("B17").value = {
    formula: 'IF(In_Heads>=1,"OK","ERROR: enter at least 1")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$17", "GPS_IntegrityCheck");

  // ---- Results panel (right side D-E) ----
  orangeHeader(ws.getCell("D1"), "GPS readiness at a glance");
  ws.mergeCells("D1:E1");

  const resultRows: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 2, label: "Structure", formula: "In_EntityName" },
    { row: 3, label: "Heads", formula: "In_Heads" },
    { row: 4, label: "Annual turnover (GBP)", formula: "In_Turnover" },
    { row: 5, label: "Per-head threshold (GBP)", formula: "GPS_PerHeadThreshold" },
    { row: 6, label: "Whole-business route", formula: "GPS_WholeBizApplies" },
    { row: 7, label: "Passes per-head", formula: "GPS_PassesPerHead" },
    { row: 8, label: "Passes whole-business", formula: "GPS_PassesWholeBiz" },
    { row: 9, label: "Turnover test result", formula: "GPS_Result", strong: true },
    { row: 10, label: "Route used", formula: "GPS_RouteUsed" },
    { row: 11, label: "Annual gain if GPS granted (GBP)", formula: "GPS_AnnualGain", strong: true },
  ];

  for (const r of resultRows) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: SLATE } };
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    if (r.strong) c.font = { bold: true, color: { argb: ORANGE } };
    if (r.label.includes("GBP") && !r.label.includes("threshold (GBP)") && r.row > 5) {
      c.numFmt = "#,##0.00";
    }
  }

  // Threshold money format
  (ws.getCell("E4") as ExcelJS.Cell).numFmt = "#,##0.00";
  (ws.getCell("E5") as ExcelJS.Cell).numFmt = "#,##0.00";

  // Conditional formatting hint on result cell (PASS = green, FAIL = red)
  ws.addConditionalFormatting({
    ref: "B14",
    rules: [
      {
        type: "containsText",
        operator: "containsText",
        text: "PASS",
        priority: 1,
        style: {
          fill: { type: "pattern", pattern: "solid", fgColor: { argb: GREEN_LIGHT } },
          font: { bold: true, color: { argb: "FF166534" } },
        },
      },
      {
        type: "containsText",
        operator: "containsText",
        text: "FAIL",
        priority: 2,
        style: {
          fill: { type: "pattern", pattern: "solid", fgColor: { argb: RED_LIGHT } },
          font: { bold: true, color: { argb: "FFb91c1c" } },
        },
      },
    ],
  });

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: ORANGE } },
  });
  start.columns = [{ width: 92 }];
  const startLines: Array<[string, boolean, number?]> = [
    ["GPS readiness model: do you qualify for Gross Payment Status?", true, 14],
    ["Trade Tax Specialists", false],
    ["", false],
    ["Gross Payment Status (GPS) lets CIS subcontractors receive the full", false],
    ["contract payment without any CIS deduction at source.", false],
    ["", false],
    ["GPS was tightened under the Finance Act 2026 anti-fraud regime.", false],
    ["HMRC can revoke GPS with 5 years disqualification for non-compliance.", false],
    ["Check your position with a specialist before applying.", false],
    ["", false],
    ["The turnover test (one of several GPS conditions):", true, 12],
    ["Sole trader: annual turnover >= GBP 30,000.", false],
    ["Partnership: annual turnover >= GBP 30,000 per partner", false],
    ["   OR >= GBP 100,000 whole-business (either route passes).", false],
    ["Limited company: annual turnover >= GBP 30,000 per director", false],
    ["   OR >= GBP 100,000 whole-business (either route passes).", false],
    ["Closely controlled company: >= GBP 30,000 per controller.", false],
    ["", false],
    ["How to use:", true, 12],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Select your entity code (1-4) and enter heads and turnover.", false],
    ["3. The assessment updates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked GPS thresholds. Do not edit it.", false],
    ["", false],
    ["This model covers the turnover test only. GPS also requires compliance,", false],
    ["tax payment and business-activity conditions. Take specialist advice.", false],
  ];
  startLines.forEach(([text, bold, sz], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: sz ?? 12, color: { argb: SLATE } };
  });

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "Scope",
    "This model covers the GPS turnover test only, applying the HP section 2 two-route rule",
    "for partnerships and limited companies (either the per-head route or the GBP 100,000",
    "whole-business route passes the test).",
    "",
    "GPS also requires compliance history, tax payment record and HMRC business activity",
    "conditions. This model does not assess those criteria.",
    "",
    "Finance Act 2026 anti-fraud regime",
    "GPS rules were tightened under Finance Act 2026. HMRC can impose a 5-year GPS ban",
    "where fraud or criminal activity is proven. Businesses must conduct due diligence on",
    "their supply chains. Take specialist advice before applying or relying on GPS status.",
    "",
    "Annual gain figure",
    "The 'annual gain' is the cash that would no longer be deducted at source each year.",
    "It is a cash-flow timing benefit, not a permanent tax saving. CIS-registered contractors",
    "reconcile via Self Assessment; the gain is the interest-free use of that cash.",
    "",
    "This is a directional estimate only. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE } };
    if (i === 2 || i === 10 || i === 15) c.font = { bold: true, color: { argb: SLATE } };
  });

  // Tab order: Start here, Your figures, Rates, Notes (EntityLookup stays veryHidden)
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes", "EntityLookup"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
