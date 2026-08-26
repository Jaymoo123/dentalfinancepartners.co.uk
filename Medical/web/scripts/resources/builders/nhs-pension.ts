/**
 * NHS Pension annual allowance Excel model builder for Medical Accountants UK.
 *
 * Produces a workbook with live formulas tracing calcNHSPension() from
 * src/lib/tools/compute/nhs-pension.ts. Constants are mirrored literally
 * from the compute lib (option 2 per section 0.E) with traced comments;
 * the golden test (nhs-pension.test.ts) is the drift guard.
 *
 * Golden cases (brief section 4.1):
 *   DEFAULT: thresholdIncome=150000, pensionGrowth=40000, higher
 *     -> adjustedIncome=190000, NOT tapered, allowance=60000, excess=0, taxCharge=0
 *   STRESS (NHS-A): thresholdIncome=210000, pensionGrowth=70000, higher
 *     -> adjustedIncome=280000, reduction=10000, allowance=50000, excess=20000, taxCharge=8000
 *   FLOOR (NHS-C): thresholdIncome=300000, pensionGrowth=200000, basic
 *     -> reduction=120000, allowance=10000 (floor), excess=190000, taxCharge=38000
 *
 * Brand: Medical Accountants UK (navy #001b3d, copper #b87333).
 * No em-dashes in any cell text. No "DJH". Creator = "Medical Accountants UK".
 */
import ExcelJS from "exceljs";
import {
  CARRY_FORWARD_NOT_ENTERED,
  CARRY_FORWARD_ENTERED,
  NHS_ONLY_ASSUMED,
  ALL_SCHEMES_ENTERED,
} from "../../../src/lib/tools/compute/nhs-pension.js";

// ---- Colours (Medical Accountants UK brand) ----
const NAVY = "FF001b3d";   // #001b3d
const COPPER = "FFb87333"; // #b87333
const COPPER_LIGHT = "FFF5EDE0"; // light copper tint for input cells
const WHITE = "FFFFFFFF";
const INK = "FF001b3d";    // same as navy for headings

// ---- Locked constants: traced to src/lib/tools/compute/nhs-pension.ts ----
// Standard allowance (2025/26)
const STANDARD_ALLOWANCE = 60000;      // traced to nhs-pension.ts: STANDARD_ALLOWANCE
const MIN_ALLOWANCE = 10000;           // traced to nhs-pension.ts: MIN_ALLOWANCE
const THRESHOLD_LIMIT = 200000;        // traced to nhs-pension.ts: THRESHOLD_LIMIT
const ADJUSTED_LIMIT = 260000;         // traced to nhs-pension.ts: ADJUSTED_LIMIT
// Tax rates for the three bands
const RATE_BASIC = 0.20;               // traced to nhs-pension.ts: TAX_RATES.basic
const RATE_HIGHER = 0.40;              // traced to nhs-pension.ts: TAX_RATES.higher
const RATE_ADDITIONAL = 0.45;          // traced to nhs-pension.ts: TAX_RATES.additional

// ---- Shared style helpers ----
function navyHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  cell.alignment = { vertical: "middle" };
}

function copperHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COPPER } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function copperInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COPPER_LIGHT } };
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
  wb.creator = "Medical Accountants UK";
  wb.lastModifiedBy = "Medical Accountants UK";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: NAVY } },
  });
  rates.columns = [
    { key: "label", width: 60 },
    { key: "value", width: 18 },
  ];
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit (2026/27 basis, verified 26 August 2026)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "STANDARD_ALLOWANCE", label: "Standard annual allowance (GBP): 2026/27 (unchanged from 2025/26)", value: STANDARD_ALLOWANCE },
    { name: "MIN_ALLOWANCE", label: "Minimum tapered allowance (GBP): 2026/27 (unchanged from 2025/26)", value: MIN_ALLOWANCE },
    { name: "THRESHOLD_LIMIT", label: "Threshold income taper trigger (GBP): 2026/27 (unchanged from 2025/26)", value: THRESHOLD_LIMIT },
    { name: "ADJUSTED_LIMIT", label: "Adjusted income taper trigger (GBP): 2026/27 (unchanged from 2025/26)", value: ADJUSTED_LIMIT },
    { name: "RATE_BASIC", label: "Income tax: basic rate (for AA charge)", value: RATE_BASIC, pct: true },
    { name: "RATE_HIGHER", label: "Income tax: higher rate (for AA charge)", value: RATE_HIGHER, pct: true },
    { name: "RATE_ADDITIONAL", label: "Income tax: additional rate (for AA charge)", value: RATE_ADDITIONAL, pct: true },
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

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: COPPER } },
  });
  ws.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 20 },
  ];

  navyHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs (blue input cells) ----
  // Row 3: Threshold income (default 150000: R2 Tool 1 config)
  labelCell(ws.getCell("A3"), "Threshold income for the year (GBP)");
  ws.getCell("B3").value = 150000;
  moneyFmt(ws.getCell("B3"));
  copperInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_ThresholdIncome");

  // Row 4: NHS pension input amount / growth (default 40000)
  labelCell(ws.getCell("A4"), "NHS pension input amount (growth this year, GBP)");
  ws.getCell("B4").value = 40000;
  moneyFmt(ws.getCell("B4"));
  copperInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_PensionGrowth");

  // Row 5: pension input amounts to every OTHER registered scheme.
  // The annual allowance is measured across all registered schemes together, and
  // adjusted income adds back the total pension input amount, not just the NHS
  // one. Leaving this out was the reason the old adjusted income was understated
  // for anyone with a second pension.
  labelCell(ws.getCell("A5"), "Pension input to ALL other registered schemes (SIPP, AVCs, other employer, GBP)");
  ws.getCell("B5").value = 0;
  moneyFmt(ws.getCell("B5"));
  copperInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_OtherPensionInput");

  // Row 6: Tax band as a rate the user edits: 0.20, 0.40 or 0.45
  labelCell(ws.getCell("A6"), "Marginal income tax rate (use: 0.20 / 0.40 / 0.45)");
  ws.getCell("B6").value = 0.40; // default: higher rate
  pctFmt(ws.getCell("B6"));
  copperInput(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_TaxRate");

  // Rows 8 to 10: carry-forward, one input per year. Unused allowance is used
  // earliest year first once the current year's allowance is exhausted
  // (HMRC PTM055100, read 2026-08-26).
  navyHeader(ws.getCell("A7"), "Unused annual allowance carried forward (enter one figure per year)");
  ws.mergeCells("A7:B7");

  labelCell(ws.getCell("A8"), "Unused allowance from 3 tax years ago (used first)");
  ws.getCell("B8").value = 0;
  moneyFmt(ws.getCell("B8"));
  copperInput(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "In_CF_Year3");

  labelCell(ws.getCell("A9"), "Unused allowance from 2 tax years ago");
  ws.getCell("B9").value = 0;
  moneyFmt(ws.getCell("B9"));
  copperInput(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "In_CF_Year2");

  labelCell(ws.getCell("A10"), "Unused allowance from last tax year (used last)");
  ws.getCell("B10").value = 0;
  moneyFmt(ws.getCell("B10"));
  copperInput(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "In_CF_Year1");

  // ---- Intermediate calculations ----

  // Row 12: total pension input amount across every registered scheme
  labelCell(ws.getCell("A12"), "Total pension input amount, all schemes (GBP)");
  ws.getCell("B12").value = { formula: "In_PensionGrowth+In_OtherPensionInput" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "TotalPensionInput");

  // Row 13: adjusted income (FA 2004 s.228ZA; HMRC PTM057100)
  // Adjusted income = net income, plus contributions relieved under net pay or
  // FA 2004 s.194(1), plus the total pension input amount less the member's own
  // contributions. Starting from threshold income (which is net income with
  // relief-at-source contributions already deducted), that build-up collapses to
  // threshold income plus the TOTAL pension input amount across all schemes.
  labelCell(ws.getCell("A13"), "Adjusted income (threshold income + total pension input, all schemes)");
  ws.getCell("B13").value = { formula: "In_ThresholdIncome+TotalPensionInput" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  wb.definedNames.add("'Your figures'!$B$13", "AdjustedIncome");

  // Row 14: Is tapered? (threshold > 200000 AND adjusted > 260000)
  labelCell(ws.getCell("A14"), "Taper applies?");
  ws.getCell("B14").value = {
    formula: 'IF(AND(In_ThresholdIncome>THRESHOLD_LIMIT,AdjustedIncome>ADJUSTED_LIMIT),"Yes","No")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$14", "IsTapered");

  // Row 15: Reduction = (adjustedIncome - ADJUSTED_LIMIT) / 2 (only if tapered)
  labelCell(ws.getCell("A15"), "Taper reduction (GBP, 0 if not tapered)");
  ws.getCell("B15").value = {
    formula: "IF(AND(In_ThresholdIncome>THRESHOLD_LIMIT,AdjustedIncome>ADJUSTED_LIMIT),(AdjustedIncome-ADJUSTED_LIMIT)/2,0)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "TaperReduction");

  // Row 16: Annual allowance = MAX(MIN_ALLOWANCE, STANDARD_ALLOWANCE - reduction)
  labelCell(ws.getCell("A16"), "Your annual allowance this year (GBP)");
  ws.getCell("B16").value = {
    formula: "MAX(MIN_ALLOWANCE,STANDARD_ALLOWANCE-TaperReduction)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  ws.getCell("B16").font = { bold: true };
  ws.getCell("A16").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$16", "AnnualAllowance");

  // Row 17: Excess = MAX(0, total pension input - annual allowance)
  labelCell(ws.getCell("A17"), "Excess over this year's allowance, before carry-forward (GBP)");
  ws.getCell("B17").value = {
    formula: "MAX(0,TotalPensionInput-AnnualAllowance)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "Excess");

  // Rows 18 to 20: carry-forward used, earliest year first.
  labelCell(ws.getCell("A18"), "Carry-forward used from 3 tax years ago (GBP)");
  ws.getCell("B18").value = { formula: "MIN(In_CF_Year3,Excess)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  wb.definedNames.add("'Your figures'!$B$18", "CFUsed3");

  labelCell(ws.getCell("A19"), "Carry-forward used from 2 tax years ago (GBP)");
  ws.getCell("B19").value = { formula: "MIN(In_CF_Year2,MAX(0,Excess-CFUsed3))" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B19"));
  wb.definedNames.add("'Your figures'!$B$19", "CFUsed2");

  labelCell(ws.getCell("A20"), "Carry-forward used from last tax year (GBP)");
  ws.getCell("B20").value = { formula: "MIN(In_CF_Year1,MAX(0,Excess-CFUsed3-CFUsed2))" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B20"));
  wb.definedNames.add("'Your figures'!$B$20", "CFUsed1");

  labelCell(ws.getCell("A21"), "Total carry-forward used (GBP)");
  ws.getCell("B21").value = { formula: "CFUsed3+CFUsed2+CFUsed1" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));
  wb.definedNames.add("'Your figures'!$B$21", "CFUsed");

  // Row 22: chargeable excess after carry-forward
  labelCell(ws.getCell("A22"), "Chargeable excess after carry-forward (GBP)");
  ws.getCell("B22").value = { formula: "MAX(0,Excess-CFUsed)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B22"));
  ws.getCell("A22").font = { bold: true };
  ws.getCell("B22").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$22", "ChargeableExcess");

  // Row 23: Tax charge = chargeable excess * tax rate
  labelCell(ws.getCell("A23"), "Estimated annual allowance tax charge (GBP)");
  ws.getCell("B23").value = {
    formula: "ChargeableExcess*In_TaxRate",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  ws.getCell("B23").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("A23").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$23", "TaxCharge");

  // Row 24: Effective cost as % of total pension input (only when both > 0)
  labelCell(ws.getCell("A24"), "Effective cost as % of total pension input (when charge > 0)");
  ws.getCell("B24").value = {
    formula: "IF(AND(TotalPensionInput>0,TaxCharge>0),TaxCharge/TotalPensionInput,0)",
  } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B24"));

  // Rows 25 and 26: status lines. Wording is imported from the compute lib so
  // the workbook and the browser calculator cannot drift apart.
  labelCell(ws.getCell("A25"), "Carry-forward status");
  ws.getCell("B25").value = {
    formula:
      "IF(In_CF_Year1+In_CF_Year2+In_CF_Year3=0," +
      `"${CARRY_FORWARD_NOT_ENTERED}","${CARRY_FORWARD_ENTERED}")`,
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B25").font = { bold: true, color: { argb: COPPER } };

  labelCell(ws.getCell("A26"), "Scheme coverage status");
  ws.getCell("B26").value = {
    formula: `IF(In_OtherPensionInput=0,"${NHS_ONLY_ASSUMED}","${ALL_SCHEMES_ENTERED}")`,
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B26").font = { bold: true, color: { argb: COPPER } };

  // Row 27: Conservation check
  labelCell(ws.getCell("A27"), "Check: excess + allowance = total pension input");
  ws.getCell("B27").value = {
    formula: 'IF(ABS(Excess+AnnualAllowance-MAX(TotalPensionInput,AnnualAllowance))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;

  // ---- Results panel (right side D/E columns) ----
  copperHeader(ws.getCell("D1"), "Summary");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Threshold income", formula: "In_ThresholdIncome" },
    { row: 4, label: "NHS pension input amount", formula: "In_PensionGrowth" },
    { row: 5, label: "Other schemes pension input", formula: "In_OtherPensionInput" },
    { row: 6, label: "Total pension input amount", formula: "TotalPensionInput", strong: true },
    { row: 7, label: "Adjusted income", formula: "AdjustedIncome" },
    { row: 8, label: "Taper applies?", formula: "IsTapered" },
    { row: 9, label: "Annual allowance", formula: "AnnualAllowance", strong: true },
    { row: 10, label: "Excess before carry-forward", formula: "Excess" },
    { row: 11, label: "Carry-forward used", formula: "CFUsed" },
    { row: 12, label: "Chargeable excess", formula: "ChargeableExcess" },
    { row: 14, label: "Annual allowance charge", formula: "TaxCharge", strong: true },
    { row: 15, label: "Effective cost %", formula: "TaxCharge/MAX(TotalPensionInput,1)*100" },
  ];

  for (const r of results) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) {
      ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: NAVY } };
    }
    const c = ws.getCell(`E${r.row}`);
    if (r.label === "Taper applies?") {
      c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    } else if (r.label.includes("%")) {
      c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
      c.numFmt = "0.00";
    } else {
      c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
      moneyFmt(c);
    }
    if (r.strong) {
      c.font = { bold: true, color: { argb: NAVY } };
    }
  }

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: COPPER } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["NHS Pension annual allowance and taper model", true],
    ["Medical Accountants UK", false],
    ["", false],
    ["This model estimates your NHS pension annual allowance position and any annual", false],
    ["allowance charge, including the taper and three years of carry-forward, for 2026/27.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells: threshold income, NHS pension input amount, pension", false],
    ["   input to any other scheme, your tax rate, and unused allowance for each of the", false],
    ["   previous three tax years.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["Tax rate options: 0.20 (basic 20%), 0.40 (higher 40%), 0.45 (additional 45%).", false],
    ["", false],
    ["Carry-forward matters more than anything else on the sheet.", true],
    ["If you leave the three carry-forward cells at zero, the charge shown is the charge", false],
    ["BEFORE carry-forward. Unused allowance from the previous three tax years can remove", false],
    ["it entirely. The 'Carry-forward status' row says so while those cells are empty.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 rates. Do not edit it.", false],
    ["See 'Notes' for assumptions and limitations.", false],
    ["", false],
    ["The taper applies only when threshold income is over 200,000 AND adjusted income", false],
    ["is over 260,000. The minimum tapered allowance is 10,000.", false],
    ["", false],
    ["Scheme Pays is available where the charge is over 2,000 and NHS scheme growth alone", false],
    ["exceeds 60,000. Speak to a specialist.", false],
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
    "2026/27 figures, verified 26 August 2026 at gov.uk pension schemes rates and allowances,",
    "which lists identical values under 2026 to 2027 and 2025 to 2026: standard annual",
    "allowance GBP60,000; minimum tapered allowance GBP10,000; threshold income trigger",
    "GBP200,000; adjusted income trigger GBP260,000.",
    "",
    "Taper: where threshold income is over GBP200,000 AND adjusted income is over GBP260,000,",
    "the allowance reduces by GBP1 for every GBP2 of excess adjusted income, down to GBP10,000.",
    "",
    "Pension input amount: this model uses the GROWTH in your pension benefits (the pension",
    "input amount), not the contributions you paid. These differ for defined-benefit schemes.",
    "",
    "Adjusted income: built as threshold income plus the TOTAL pension input amount across",
    "every registered scheme you are in, not just the NHS one. That follows the statutory",
    "definition in Finance Act 2004 s.228ZA and HMRC PTM057100: adjusted income starts from",
    "net income, adds back contributions relieved under a net pay arrangement, and adds the",
    "pension input amount less your own contributions. Starting from threshold income, which",
    "already has relief-at-source contributions deducted, that build-up comes to threshold",
    "income plus total pension input. Enter every scheme in the 'other schemes' cell or the",
    "taper will read lower than it should.",
    "",
    "One case this does not catch: salary sacrifice arrangements entered into on or after",
    "9 July 2015 are added back to threshold income and are also inside the pension input",
    "amount, so adjusted income here reads high for them. Erring high means the model may",
    "show more taper than applies, not less.",
    "",
    "Carry-forward: unused annual allowance from the previous three tax years is modelled,",
    "one input cell per year. The current year's allowance is used first, then the earliest",
    "of the three carry-forward years (HMRC PTM055100). You must have been a member of a",
    "registered pension scheme in each year you carry forward from. Take the unused figures",
    "from your NHSBSA pension savings statements rather than estimating them.",
    "",
    "Scheme Pays: where the annual allowance charge exceeds GBP2,000 and NHS scheme growth",
    "alone exceeds GBP60,000, Mandatory Scheme Pays lets the scheme settle the charge",
    "in exchange for a permanent pension reduction. Election deadline: 31 July in the",
    "second tax year after the charge (2026/27 charge: 31 July 2028). The Scheme Pays test",
    "looks at the NHS scheme's own input amount, which is why it stays on the NHS cell.",
    "",
    "This is a directional model. Your actual position still depends on the accuracy of the",
    "figures you enter, Scheme Pays eligibility, the money purchase annual allowance if you",
    "have flexibly accessed a defined contribution pot, and revised savings statements under",
    "the McCloud remedy. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: NAVY } };
  });

  // Tab order: Start here, Your figures, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}

// Suppress unused import
void pctFmt;
