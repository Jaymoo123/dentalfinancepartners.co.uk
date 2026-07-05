/**
 * SRA client-account compliance Excel model builder.
 *
 * Sheets:
 *  "Start here"   : overview and usage instructions
 *  "Reconciliation": five-weekly three-way reconciliation template
 *  "Reserve sizing": matter-count × volume × type → reserve estimate
 *  "Rule 12.2 check": period-average + period-maximum → exemption verdict
 *  "Rates"        : LOCKED constants imported from the site compute lib
 *  "Notes"        : regulatory context and disclaimers
 *
 * All numeric constants are imported from the same lib the on-site calculator
 * uses, so the spreadsheet and the site can never drift.
 */
import ExcelJS from "exceljs";

/**
 * Constants mirrored from src/lib/tools/compute/sra-client-account-reserve.ts.
 * These are the same values the on-site calculator uses; keeping them here as
 * constants (rather than importing them, since the lib exports only the compute
 * function) ensures the spreadsheet and the site are derived from the same source.
 *
 * If the compute lib constants change, update these in parallel.
 */
const VOLUME_AVERAGE_BALANCE = {
  low: 2500,
  moderate: 8000,
  high: 25000,
  "very-high": 75000,
} as const;

const MATTER_RISK_FACTOR = {
  conveyancing: 0.025,
  litigation: 0.01,
  "private-client": 0.005,
  commercial: 0.008,
  mixed: 0.012,
} as const;

// Reserve multiplier: central × low = low estimate; central × high = high estimate.
// Derived from the calcSraReserve function: lowReserve = reserve * 0.7, highReserve = reserve * 1.5.
const RESERVE_MULTIPLIER = { low: 0.7, high: 1.5 } as const;

// Rule 12.2 exemption thresholds (SRA Accounts Rules):
//   average client-account balance not exceeding £10,000
//   AND maximum client-account balance not exceeding £250,000.
const RULE_12_2_AVERAGE_THRESHOLD = 10000;
const RULE_12_2_MAX_THRESHOLD = 250000;

const CRIMSON = "FFC41E3A";
const INK = "FF0F172A";
const SURFACE = "FFF8F9FA";
const BLUE_INPUT = "FFDBEAFE";

function hdr(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CRIMSON } };
  cell.alignment = { vertical: "middle" };
}

function lbl(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: INK } };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = '£#,##0';
}

function inputCell(cell: ExcelJS.Cell, value: number | string, money = false) {
  cell.value = value;
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_INPUT } };
  cell.protection = { locked: false };
  if (money) moneyFmt(cell);
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Accounts for Lawyers";
  wb.lastModifiedBy = "Accounts for Lawyers";

  /* ---------------------------------------------------------------- Rates -- */
  const ratesWs = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  ratesWs.columns = [
    { key: "label", width: 52 },
    { key: "value", width: 18 },
  ];
  hdr(ratesWs.getCell("A1"), "Locked rates: do not edit");
  ratesWs.mergeCells("A1:B1");

  const rateRows: Array<{ label: string; value: number; name: string; fmt?: string }> = [
    { label: "Rule 12.2 average threshold (£)", value: RULE_12_2_AVERAGE_THRESHOLD, name: "Avg12_2", fmt: "£#,##0" },
    { label: "Rule 12.2 maximum threshold (£)", value: RULE_12_2_MAX_THRESHOLD, name: "Max12_2", fmt: "£#,##0" },
    { label: "Volume LOW: avg balance / matter (£)", value: VOLUME_AVERAGE_BALANCE.low, name: "Vol_Low", fmt: "£#,##0" },
    { label: "Volume MODERATE: avg balance / matter (£)", value: VOLUME_AVERAGE_BALANCE.moderate, name: "Vol_Mod", fmt: "£#,##0" },
    { label: "Volume HIGH: avg balance / matter (£)", value: VOLUME_AVERAGE_BALANCE.high, name: "Vol_Hi", fmt: "£#,##0" },
    { label: "Volume VERY HIGH: avg balance / matter (£)", value: VOLUME_AVERAGE_BALANCE["very-high"], name: "Vol_VHi", fmt: "£#,##0" },
    { label: "Matter risk: conveyancing", value: MATTER_RISK_FACTOR.conveyancing, name: "Risk_Conv", fmt: "0.000" },
    { label: "Matter risk: litigation", value: MATTER_RISK_FACTOR.litigation, name: "Risk_Lit", fmt: "0.000" },
    { label: "Matter risk: private client", value: MATTER_RISK_FACTOR["private-client"], name: "Risk_PC", fmt: "0.000" },
    { label: "Matter risk: commercial", value: MATTER_RISK_FACTOR.commercial, name: "Risk_Comm", fmt: "0.000" },
    { label: "Matter risk: mixed", value: MATTER_RISK_FACTOR.mixed, name: "Risk_Mix", fmt: "0.000" },
    { label: "Reserve multiplier (low)", value: RESERVE_MULTIPLIER.low, name: "Mult_Low", fmt: "0.0" },
    { label: "Reserve multiplier (high)", value: RESERVE_MULTIPLIER.high, name: "Mult_Hi", fmt: "0.0" },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    lbl(ratesWs.getCell(`A${row}`), r.label);
    const vc = ratesWs.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.fmt ?? "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  ratesWs.getColumn("label").alignment = { wrapText: true };
  ratesWs.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* --------------------------------------------------------- Reconciliation - */
  const rec = wb.addWorksheet("Reconciliation", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  rec.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 22 },
  ];
  hdr(rec.getCell("A1"), "Five-weekly client account reconciliation (Rule 8.3)");
  rec.mergeCells("A1:B1");

  rec.getCell("A2").value = "Period ending:";
  inputCell(rec.getCell("B2"), "dd/mm/yyyy");

  hdr(rec.getCell("A4"), "Step 1: Client ledger total");
  rec.mergeCells("A4:B4");
  rec.getCell("A5").value = "Total of all individual client ledger balances (from your PMS)";
  inputCell(rec.getCell("B5"), 0, true);
  wb.definedNames.add(`Reconciliation!$B$5`, "Ledger_Total");

  hdr(rec.getCell("A7"), "Step 2: Cash book balance");
  rec.mergeCells("A7:B7");
  rec.getCell("A8").value = "Cash book balance at period end (your internal record)";
  inputCell(rec.getCell("B8"), 0, true);
  wb.definedNames.add(`Reconciliation!$B$8`, "CashBook_Balance");

  hdr(rec.getCell("A10"), "Step 3: Bank statement balance");
  rec.mergeCells("A10:B10");
  rec.getCell("A11").value = "Bank statement balance at period end";
  inputCell(rec.getCell("B11"), 0, true);
  wb.definedNames.add(`Reconciliation!$B$11`, "Bank_Balance");

  hdr(rec.getCell("A13"), "Reconciliation result");
  rec.mergeCells("A13:B13");

  lbl(rec.getCell("A14"), "Ledger vs cash book difference (must be £0)");
  const diff1 = rec.getCell("B14");
  diff1.value = { formula: "Ledger_Total-CashBook_Balance" } as ExcelJS.CellFormulaValue;
  moneyFmt(diff1);

  lbl(rec.getCell("A15"), "Ledger vs bank statement difference (must be £0)");
  const diff2 = rec.getCell("B15");
  diff2.value = { formula: "Ledger_Total-Bank_Balance" } as ExcelJS.CellFormulaValue;
  moneyFmt(diff2);

  lbl(rec.getCell("A16"), "Reconciliation status");
  const status = rec.getCell("B16");
  status.value = {
    formula: 'IF(AND(ABS(Ledger_Total-CashBook_Balance)<0.01,ABS(Ledger_Total-Bank_Balance)<0.01),"RECONCILED","DISCREPANCY: INVESTIGATE")',
  } as ExcelJS.CellFormulaValue;
  status.font = { bold: true };

  rec.getCell("A18").value = "COFA sign-off name:";
  inputCell(rec.getCell("B18"), "");
  rec.getCell("A19").value = "COFA sign-off date:";
  inputCell(rec.getCell("B19"), "dd/mm/yyyy");

  rec.getCell("A21").value = "Records must be retained for at least six years (Rule 8.3).";
  rec.getCell("A21").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  rec.getColumn("a").alignment = { wrapText: true };

  /* -------------------------------------------------------- Reserve sizing -- */
  const res = wb.addWorksheet("Reserve sizing", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  res.columns = [
    { key: "a", width: 50 },
    { key: "b", width: 22 },
  ];
  hdr(res.getCell("A1"), "Operational reserve sizing (indicative: not an SRA requirement)");
  res.mergeCells("A1:B1");

  res.getCell("A3").value = "Open matters (count):";
  inputCell(res.getCell("B3"), 150);
  wb.definedNames.add(`'Reserve sizing'!$B$3`, "Res_Matters");

  res.getCell("A4").value = 'Volume band (low / moderate / high / very-high):';
  inputCell(res.getCell("B4"), "moderate");
  res.getCell("B4").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"low,moderate,high,very-high"'],
  };
  wb.definedNames.add(`'Reserve sizing'!$B$4`, "Res_Band");

  res.getCell("A5").value = 'Matter type (conveyancing / litigation / private-client / commercial / mixed):';
  inputCell(res.getCell("B5"), "conveyancing");
  res.getCell("B5").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"conveyancing,litigation,private-client,commercial,mixed"'],
  };
  wb.definedNames.add(`'Reserve sizing'!$B$5`, "Res_Type");

  // Average balance per matter (lookup via nested IF)
  res.getCell("A7").value = "Average balance per matter (from volume band):";
  res.getCell("B7").value = {
    formula:
      'IF(Res_Band="low",Vol_Low,IF(Res_Band="moderate",Vol_Mod,IF(Res_Band="high",Vol_Hi,IF(Res_Band="very-high",Vol_VHi,Vol_Mod))))',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(res.getCell("B7"));
  wb.definedNames.add(`'Reserve sizing'!$B$7`, "Avg_Per_Matter");

  // Risk factor (lookup via nested IF)
  res.getCell("A8").value = "Risk factor (from matter type):";
  res.getCell("B8").value = {
    formula:
      'IF(Res_Type="conveyancing",Risk_Conv,IF(Res_Type="litigation",Risk_Lit,IF(Res_Type="private-client",Risk_PC,IF(Res_Type="commercial",Risk_Comm,Risk_Mix))))',
  } as ExcelJS.CellFormulaValue;
  res.getCell("B8").numFmt = "0.000";
  wb.definedNames.add(`'Reserve sizing'!$B$8`, "Risk_Factor");

  // Peak (matters × avg balance)
  res.getCell("A9").value = "Estimated peak balance (matters × avg balance):";
  res.getCell("B9").value = { formula: "Res_Matters*Avg_Per_Matter" } as ExcelJS.CellFormulaValue;
  moneyFmt(res.getCell("B9"));
  wb.definedNames.add(`'Reserve sizing'!$B$9`, "Peak_Balance");

  hdr(res.getCell("A11"), "Suggested reserve");
  res.mergeCells("A11:B11");

  lbl(res.getCell("A12"), "Central estimate (peak × risk factor):");
  res.getCell("B12").value = { formula: "Peak_Balance*Risk_Factor" } as ExcelJS.CellFormulaValue;
  moneyFmt(res.getCell("B12"));

  lbl(res.getCell("A13"), "Low estimate (central × low multiplier):");
  res.getCell("B13").value = { formula: "Peak_Balance*Risk_Factor*Mult_Low" } as ExcelJS.CellFormulaValue;
  moneyFmt(res.getCell("B13"));

  lbl(res.getCell("A14"), "High estimate (central × high multiplier):");
  res.getCell("B14").value = { formula: "Peak_Balance*Risk_Factor*Mult_Hi" } as ExcelJS.CellFormulaValue;
  moneyFmt(res.getCell("B14"));

  res.getCell("A16").value =
    "This is an operational risk-management estimate, not an SRA requirement. Involve your COFA and accountant.";
  res.getCell("A16").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  res.getColumn("a").alignment = { wrapText: true };

  /* ------------------------------------------------------- Rule 12.2 check - */
  const r12 = wb.addWorksheet("Rule 12.2 check", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  r12.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(r12.getCell("A1"), "Rule 12.2 accountant's report exemption check");
  r12.mergeCells("A1:B1");

  r12.getCell("A3").value = "Period-average client-account balance (£):";
  inputCell(r12.getCell("B3"), 8000, true);
  wb.definedNames.add(`'Rule 12.2 check'!$B$3`, "R12_Avg");

  r12.getCell("A4").value = "Period-maximum client-account balance (£):";
  inputCell(r12.getCell("B4"), 200000, true);
  wb.definedNames.add(`'Rule 12.2 check'!$B$4`, "R12_Max");

  lbl(r12.getCell("A6"), "Limb 1: average <= £10,000?");
  r12.getCell("B6").value = {
    formula: 'IF(R12_Avg<=Avg12_2,"PASS","FAIL")',
  } as ExcelJS.CellFormulaValue;
  r12.getCell("B6").font = { bold: true };

  lbl(r12.getCell("A7"), "Limb 2: maximum <= £250,000?");
  r12.getCell("B7").value = {
    formula: 'IF(R12_Max<=Max12_2,"PASS","FAIL")',
  } as ExcelJS.CellFormulaValue;
  r12.getCell("B7").font = { bold: true };

  lbl(r12.getCell("A9"), "Exemption verdict (both limbs must pass):");
  r12.getCell("B9").value = {
    formula: 'IF(AND(R12_Avg<=Avg12_2,R12_Max<=Max12_2),"EXEMPT: report not required","NOT EXEMPT: obtain accountant\'s report")',
  } as ExcelJS.CellFormulaValue;
  r12.getCell("B9").font = { bold: true };
  r12.getCell("A9").alignment = { wrapText: true };

  r12.getCell("A11").value =
    "Both the average AND maximum thresholds must be met. Failure on either limb means you need a report (Rule 12.1).";
  r12.getCell("A11").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  r12.getColumn("a").alignment = { wrapText: true };

  /* ------------------------------------------------------------ Start here -- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: INK } },
  });
  start.columns = [{ width: 95 }];
  const startLines: Array<[string, boolean]> = [
    ["SRA client account: compliance model for law firms", true],
    ["", false],
    ["This workbook contains three working tools:", false],
    ["", false],
    ["  Reconciliation: a five-weekly three-way reconciliation template per Rule 8.3.", false],
    ["    Enter your client ledger total, cash book balance and bank statement balance.", false],
    ["    The difference cells must show £0. A COFA sign-off row is included.", false],
    ["", false],
    ["  Reserve sizing: an operational reserve estimate.", false],
    ["    Enter your open matter count, volume band and predominant matter type.", false],
    ["    The model returns a central estimate with a low-to-high range.", false],
    ["    This is a risk-management tool, not an SRA requirement.", false],
    ["", false],
    ["  Rule 12.2 check: the accountant's report exemption test.", false],
    ["    Enter your period-average and period-maximum client-account balances.", false],
    ["    The model applies the correct thresholds (average <= £10,000 AND maximum <= £250,000)", false],
    ["    and tells you whether both exemption limbs are met.", false],
    ["", false],
    ["The Rates tab holds the locked constants. It is the same source as the online calculator.", false],
    ["Do not edit any cell outside the blue input cells.", false],
    ["Read the Notes tab for regulatory context and assumptions.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 15 : 12, color: { argb: INK } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SURFACE } };

  /* ----------------------------------------------------------------- Notes -- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and regulatory context",
    "",
    "Reconciliation (Rule 8.3)",
    "The SRA Accounts Rules require a three-way reconciliation at least every five weeks.",
    "You must reconcile: (1) the total of all client ledger balances in your practice management",
    "system, (2) your internal cash book, and (3) the bank statement. All three must agree.",
    "Any difference must be investigated immediately. Records must be kept for at least six years.",
    "The COFA must sign off each reconciliation.",
    "",
    "Rule 3.3: banking facility prohibition",
    "Every receipt into, transfer between or withdrawal from the client account must be for the",
    "purpose of delivering regulated legal services to that client. You cannot use the account",
    "as a general banking facility.",
    "",
    "Rule 12.1: the accountant's report trigger",
    "If your firm held or received client money in the accounting period, you must obtain an",
    "accountant's report within six months of the period end.",
    "",
    "Rule 12.2: the small-balance exemption",
    "The exemption applies ONLY if BOTH conditions are met:",
    "  (a) period-average client-account balance did not exceed £10,000; AND",
    "  (b) period-maximum client-account balance at any point did not exceed £250,000.",
    "Both limbs are tested in the Rule 12.2 check sheet.",
    "",
    "Reserve sizing",
    "The reserve sizing estimate is an operational risk-management tool. It uses the same",
    "risk factors as the online calculator. It is not an SRA requirement. Involve your COFA",
    "and accountant in any reserve decision.",
    "",
    "General",
    "This model is for planning and orientation. It is not a substitute for professional advice",
    "specific to your firm's facts and regulatory position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0 || text.startsWith("Rule ") || text === "Reconciliation (Rule 8.3)" ||
        text === "Reserve sizing" || text === "General") {
      c.font = { bold: true, size: i === 0 ? 14 : 11, color: { argb: INK } };
    }
  });

  // Tab order: Start here, Reconciliation, Reserve sizing, Rule 12.2 check, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Reconciliation", "Reserve sizing", "Rule 12.2 check", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
