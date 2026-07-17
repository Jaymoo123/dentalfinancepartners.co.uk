/**
 * Practice finance and cash-flow Excel model builder.
 *
 * Sheets:
 *  "Start here"    : overview and usage instructions
 *  "Cash flow"     : 12-month rolling cash-flow forecast with collection lag
 *  "Lock-up"       : WIP days + debtor days = lock-up; KPI dashboard
 *  "Rates"         : LOCKED constants (collection lag, VAT rate, NI threshold)
 *  "Notes"         : assumptions and guidance
 */
import ExcelJS from "exceljs";

const CRIMSON = "FFC41E3A";
const INK = "FF0F172A";
const SURFACE = "FFF8F9FA";
const BLUE_INPUT = "FFDBEAFE";

// 2026/27 constants
const VAT_RATE = 0.20;
const EMPLOYER_NI_THRESHOLD = 5000;
const EMPLOYER_NI_RATE = 0.15;

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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    { label: "VAT rate", value: VAT_RATE, name: "VatRate", fmt: "0%" },
    { label: "Employer NIC secondary threshold (£, 2026/27)", value: EMPLOYER_NI_THRESHOLD, name: "NiThreshold", fmt: "£#,##0" },
    { label: "Employer NIC rate (2026/27)", value: EMPLOYER_NI_RATE, name: "NiRate", fmt: "0%" },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    lbl(ratesWs.getCell(`A${row}`), r.label);
    const vc = ratesWs.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.fmt ?? "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  ratesWs.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* -------------------------------------------------------------- Cash flow - */
  const cf = wb.addWorksheet("Cash flow", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  cf.columns = [
    { key: "label", width: 38 },
    ...MONTHS.map(m => ({ key: m.toLowerCase(), width: 12 })),
  ];

  hdr(cf.getCell("A1"), "12-month rolling cash-flow forecast");
  for (let i = 0; i < 12; i++) {
    const col = String.fromCharCode(66 + i);
    hdr(cf.getCell(`${col}1`), MONTHS[i]);
  }

  // --- Input rows ---
  const rows: Array<{ label: string; row: number; defName?: string; sample?: number; money?: boolean; formula?: boolean }> = [
    { label: "Fees billed in month (excl. VAT)", row: 3, defName: "BilledRow", sample: 150000, money: true },
    { label: "Collection lag (months)", row: 4, defName: "LagRow", sample: 2 },
    { label: "Fixed costs (salaries, rent, subscriptions)", row: 6, defName: "FixedRow", sample: 70000, money: true },
    { label: "Partner / director drawings", row: 7, defName: "DrawRow", sample: 25000, money: true },
    { label: "Opening cash balance (Month 1 only)", row: 9, defName: "OpeningRow", sample: 50000, money: true },
  ];

  cf.getCell("A3").value = "Fees billed in month (excl. VAT)";
  cf.getCell("A4").value = "Collection lag (months)";
  cf.getCell("A5").value = "";
  cf.getCell("A6").value = "Fixed costs (salaries, rent, subscriptions)";
  cf.getCell("A7").value = "Partner / director drawings";
  cf.getCell("A8").value = "";
  cf.getCell("A9").value = "Opening cash balance (Month 1 only)";

  for (let col = 0; col < 12; col++) {
    const colLetter = String.fromCharCode(66 + col);
    inputCell(cf.getCell(`${colLetter}3`), 150000, true);
    inputCell(cf.getCell(`${colLetter}4`), 2);
    inputCell(cf.getCell(`${colLetter}6`), 70000, true);
    inputCell(cf.getCell(`${colLetter}7`), 25000, true);
  }
  inputCell(cf.getCell("B9"), 50000, true);

  // --- Calculated rows ---
  hdr(cf.getCell("A11"), "Calculated");
  cf.mergeCells(`A11:${String.fromCharCode(66 + 11)}11`);

  cf.getCell("A12").value = "Cash collected (lagged by collection lag months)";
  cf.getCell("A13").value = "VAT collected (on billed fees)";
  cf.getCell("A14").value = "VAT payable (quarterly: Mar, Jun, Sep, Dec)";
  cf.getCell("A15").value = "Net cash inflow";
  cf.getCell("A16").value = "Total outgoings";
  cf.getCell("A17").value = "Closing cash balance";

  for (let col = 0; col < 12; col++) {
    const colLetter = String.fromCharCode(66 + col);
    const colNum = col + 2; // 1-indexed column number in sheet
    const billedCol = col - 2; // lag of 2 months

    // Cash collected: billed from 2 months ago (if available), else 0
    if (billedCol >= 0) {
      const lagCol = String.fromCharCode(66 + billedCol);
      cf.getCell(`${colLetter}12`).value = { formula: `${lagCol}3` } as ExcelJS.CellFormulaValue;
    } else {
      cf.getCell(`${colLetter}12`).value = 0;
    }
    moneyFmt(cf.getCell(`${colLetter}12`));

    // VAT collected: 20% on fees billed
    cf.getCell(`${colLetter}13`).value = { formula: `${colLetter}3*VatRate` } as ExcelJS.CellFormulaValue;
    moneyFmt(cf.getCell(`${colLetter}13`));

    // VAT payable: quarterly (months 3, 6, 9, 12 = Mar, Jun, Sep, Dec)
    // Simplified: sum VAT collected over the quarter
    if ((col + 1) % 3 === 0) {
      const q1 = String.fromCharCode(66 + col - 2);
      const q2 = String.fromCharCode(66 + col - 1);
      cf.getCell(`${colLetter}14`).value = { formula: `${q1}13+${q2}13+${colLetter}13` } as ExcelJS.CellFormulaValue;
    } else {
      cf.getCell(`${colLetter}14`).value = 0;
    }
    moneyFmt(cf.getCell(`${colLetter}14`));

    // Net cash inflow: collected + VAT collected - VAT payable
    cf.getCell(`${colLetter}15`).value = { formula: `${colLetter}12+${colLetter}13-${colLetter}14` } as ExcelJS.CellFormulaValue;
    moneyFmt(cf.getCell(`${colLetter}15`));

    // Total outgoings: fixed costs + drawings
    cf.getCell(`${colLetter}16`).value = { formula: `${colLetter}6+${colLetter}7` } as ExcelJS.CellFormulaValue;
    moneyFmt(cf.getCell(`${colLetter}16`));

    // Closing balance
    if (col === 0) {
      cf.getCell(`${colLetter}17`).value = { formula: `B9+${colLetter}15-${colLetter}16` } as ExcelJS.CellFormulaValue;
    } else {
      const prevCol = String.fromCharCode(66 + col - 1);
      cf.getCell(`${colLetter}17`).value = { formula: `${prevCol}17+${colLetter}15-${colLetter}16` } as ExcelJS.CellFormulaValue;
    }
    moneyFmt(cf.getCell(`${colLetter}17`));
    cf.getCell(`${colLetter}17`).font = { bold: true, color: { argb: INK } };
  }

  cf.getCell("A19").value = "Blue cells are inputs. Collection lag is the number of months between billing and cash receipt. Default: 2 months.";
  cf.getCell("A19").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  cf.getColumn("label").alignment = { wrapText: true };

  /* --------------------------------------------------------------- Lock-up -- */
  const lu = wb.addWorksheet("Lock-up", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  lu.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 22 },
  ];
  hdr(lu.getCell("A1"), "Lock-up days and KPI dashboard");
  lu.mergeCells("A1:B1");

  lu.getCell("A3").value = "Annual fee income (£):";
  inputCell(lu.getCell("B3"), 1800000, true);
  wb.definedNames.add(`'Lock-up'!$B$3`, "AnnualFees");

  lu.getCell("A4").value = "Current WIP balance (£):";
  inputCell(lu.getCell("B4"), 250000, true);
  wb.definedNames.add(`'Lock-up'!$B$4`, "WipBalance");

  lu.getCell("A5").value = "Current debtor balance (£):";
  inputCell(lu.getCell("B5"), 180000, true);
  wb.definedNames.add(`'Lock-up'!$B$5`, "DebtorBalance");

  lu.getCell("A6").value = "Fees billed last 12 months (£, for realisation rate):";
  inputCell(lu.getCell("B6"), 1800000, true);
  wb.definedNames.add(`'Lock-up'!$B$6`, "FeesBilled");

  lu.getCell("A7").value = "Cash collected last 12 months (£):";
  inputCell(lu.getCell("B7"), 1620000, true);
  wb.definedNames.add(`'Lock-up'!$B$7`, "CashCollected");

  hdr(lu.getCell("A9"), "Calculated KPIs");
  lu.mergeCells("A9:B9");

  lbl(lu.getCell("A10"), "WIP days:");
  lu.getCell("B10").value = { formula: "WipBalance/AnnualFees*365" } as ExcelJS.CellFormulaValue;
  lu.getCell("B10").numFmt = "0.0";

  lbl(lu.getCell("A11"), "Debtor days:");
  lu.getCell("B11").value = { formula: "DebtorBalance/AnnualFees*365" } as ExcelJS.CellFormulaValue;
  lu.getCell("B11").numFmt = "0.0";

  lbl(lu.getCell("A12"), "Lock-up days (WIP + debtor days):");
  lu.getCell("B12").value = { formula: "WipBalance/AnnualFees*365+DebtorBalance/AnnualFees*365" } as ExcelJS.CellFormulaValue;
  lu.getCell("B12").numFmt = "0.0";
  lu.getCell("B12").font = { bold: true };

  lbl(lu.getCell("A13"), "Realisation rate:");
  lu.getCell("B13").value = { formula: "CashCollected/FeesBilled" } as ExcelJS.CellFormulaValue;
  lu.getCell("B13").numFmt = "0.0%";

  hdr(lu.getCell("A15"), "Industry benchmarks");
  lu.mergeCells("A15:B15");
  lu.getCell("A16").value = "Top performers: below 90 lock-up days";
  lu.getCell("A17").value = "High-street average: 120 to 180 lock-up days";
  lu.getCell("A18").value = "Target realisation rate: above 90%";
  lu.getCell("A19").value = "Target utilisation rate: above 65% of billable capacity";
  [16, 17, 18, 19].forEach(r => {
    lu.getCell(`A${r}`).font = { size: 10, color: { argb: "FF64748B" } };
  });
  lu.getColumn("a").alignment = { wrapText: true };

  /* ------------------------------------------------------------ Start here -- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: INK } },
  });
  start.columns = [{ width: 95 }];
  const startLines: Array<[string, boolean]> = [
    ["Practice finance and cash-flow model for law firms", true],
    ["", false],
    ["This workbook contains two working tools:", false],
    ["", false],
    ["  Cash flow: a 12-month rolling cash-flow forecast.", false],
    ["    Enter your monthly fees billed, collection lag (typically 2 months for most firms),", false],
    ["    fixed costs and partner drawings.", false],
    ["    The model calculates cash collected (based on the lag), VAT timing and closing balance.", false],
    ["    A negative closing balance in any month is a trigger for action.", false],
    ["", false],
    ["  Lock-up: a KPI dashboard showing your WIP days, debtor days, lock-up days and realisation rate.", false],
    ["    Enter your annual fee income, current WIP and debtor balances and 12-month collected cash.", false],
    ["    Compare against the industry benchmarks on the same sheet.", false],
    ["", false],
    ["The Rates tab holds locked constants (VAT rate, employer NIC threshold) matching the site calculators.", false],
    ["Do not edit cells outside the blue input cells.", false],
    ["Read the Notes tab for assumptions and guidance.", false],
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
    "Assumptions and guidance",
    "",
    "Cash flow model",
    "The model uses a fixed collection lag (default 2 months) applied uniformly to all months.",
    "In practice, collection timing varies by client, matter type and billing discipline.",
    "Update the lag to match your actual average debtor days.",
    "",
    "VAT timing",
    "Output VAT is assumed to be collected alongside fees (at the billing date).",
    "VAT payable is aggregated quarterly (Mar, Jun, Sep, Dec) under standard accounting.",
    "If you use the cash accounting scheme, adjust the VAT payable row to match receipts.",
    "",
    "Lock-up benchmarks",
    "High-street firms average 120-180 lock-up days. Top performers operate below 90 days.",
    "Every extra day of lock-up at £1.8m annual fees = £4,932 of cash tied up.",
    "Realisation rate: target above 90%. Below 85% typically indicates write-off or discount problems.",
    "",
    "General",
    "This model is for planning and orientation. It is not a substitute for management accounts or",
    "professional advice specific to your firm.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0 || text === "Cash flow model" || text === "VAT timing" || text === "Lock-up benchmarks" || text === "General") {
      c.font = { bold: true, size: i === 0 ? 14 : 11, color: { argb: INK } };
    }
  });

  // Tab order
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Cash flow", "Lock-up", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
