/**
 * Making Tax Digital (MTD ITSA) Excel model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS:
 *   - "Start here"      : what the model is + how to use it.
 *   - "Am I in"         : user inputs (gross rent, gross sole-trade, entity) →
 *                         a live formula that returns whether MTD applies and
 *                         from which April, by comparing the gross qualifying
 *                         income to the locked thresholds (no hard-coded result).
 *   - "Quarter tracker" : the four standard quarterly-update deadlines with
 *                         live "submitted? / overdue?" status formulas the user
 *                         updates as they file each quarter.
 *   - "Records"         : a categorised digital-records log template (the SA105
 *                         categories) with a live running total per category.
 *   - "Rates"           : LOCKED sheet written from the SAME constants the site
 *                         logic uses (imported below: MTD_TIERS) so the
 *                         spreadsheet and the site can never drift. The Am-I-in
 *                         formulas reference these cells.
 *   - "Notes"           : assumptions + disclaimers mirroring the on-site notes.
 *
 * The thresholds/dates here come from lib/mtd.ts (MTD_TIERS), the same source the
 * premium checker uses, so the workbook and the website cannot disagree on who is
 * in and when.
 */
import ExcelJS from "exceljs";
import {
  MTD_TIERS,
  MTD_STANDARD_QUARTERS,
  QUARTERLY_UPDATES_PER_YEAR,
} from "../../../src/lib/mtd";

const EMERALD = "FF059669";
const SLATE_900 = "FF0F172A";
const SLATE_100 = "FFF1F5F9";
const SLATE_50 = "FFF8FAFC";
const AMBER_50 = "FFFEF3C7";

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

  // The three tiers, ordered highest threshold first (earliest mandate date),
  // matching lib/mtd.ts.
  const tiers = [...MTD_TIERS].sort((a, b) => b.threshold - a.threshold);

  /* ----------------------------- Rates (locked) ---------------------------- */
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: EMERALD } },
  });
  rates.columns = [
    { key: "label", width: 50 },
    { key: "value", width: 18 },
  ];
  headerCell(rates.getCell("A1"), "Locked MTD thresholds — do not edit");
  rates.mergeCells("A1:B1");

  // Named single cells so the Am-I-in sheet can reference them by name.
  // Thresholds (the income figure you must be OVER) and the start year for each.
  const rateRows: Array<{ name: string; label: string; value: number; money?: boolean }> = [];
  tiers.forEach((t, idx) => {
    rateRows.push({
      name: `Thr_${idx + 1}`,
      label: `Threshold ${idx + 1} — mandated from ${t.fromLabel} when income is over`,
      value: t.threshold,
      money: true,
    });
    rateRows.push({
      name: `Year_${idx + 1}`,
      label: `Start year ${idx + 1} (6 April)`,
      value: t.fromYear,
    });
  });
  rateRows.push({
    name: "Quarters",
    label: "Quarterly updates required per year",
    value: QUARTERLY_UPDATES_PER_YEAR,
  });

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    if (r.money) vc.numFmt = "£#,##0";
    else vc.numFmt = "0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  // Protect the rates sheet so the locked figures cannot be edited in Excel.
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ------------------------------- Am I in? -------------------------------- */
  const ws = wb.addWorksheet("Am I in", {
    properties: { tabColor: { argb: EMERALD } },
  });
  ws.columns = [
    { key: "a", width: 50 },
    { key: "b", width: 26 },
  ];

  headerCell(ws.getCell("A1"), "Am I in MTD? — edit the blue cells");
  ws.mergeCells("A1:B1");

  // --- Inputs (unlocked) ---
  const inputRows: Array<{ row: number; label: string; value: number | string; name: string; money?: boolean }> = [
    { row: 3, label: "Annual rental income (gross, before expenses)", value: 35000, name: "In_Rent", money: true },
    { row: 4, label: "Sole-trade / self-employment turnover (gross)", value: 20000, name: "In_Trade", money: true },
    { row: 5, label: "Are you an individual / sole trader? (Yes / No)", value: "Yes", name: "In_Individual" },
  ];
  for (const ir of inputRows) {
    labelCell(ws.getCell(`A${ir.row}`), ir.label);
    const c = ws.getCell(`B${ir.row}`);
    c.value = ir.value;
    if (ir.money) moneyFmt(c);
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
    c.protection = { locked: false };
    wb.definedNames.add(`'Am I in'!$B$${ir.row}`, ir.name);
  }
  // Dropdown for the individual Yes/No.
  ws.getCell("B5").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"Yes,No"'],
  };

  // --- Qualifying income (the gross aggregate the test is on) ---
  labelCell(ws.getCell("A7"), "Qualifying income (gross rent + gross trade)");
  ws.getCell("B7").value = { formula: "MAX(0,In_Rent)+MAX(0,In_Trade)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B7"));
  wb.definedNames.add(`'Am I in'!$B$7`, "Qualifying");

  // --- The verdict (live formula against the locked thresholds) ---
  headerCell(ws.getCell("A9"), "Does MTD for Income Tax apply to you?");
  ws.mergeCells("A9:B9");

  labelCell(ws.getCell("A10"), "Mandatory from (April)");
  // If not an individual → out of scope (0). Else pick the EARLIEST year whose
  // threshold the gross qualifying income clears (highest threshold first).
  ws.getCell("B10").value = {
    formula:
      "IF(In_Individual<>\"Yes\",0," +
      "IF(Qualifying>Thr_1,Year_1," +
      "IF(Qualifying>Thr_2,Year_2," +
      "IF(Qualifying>Thr_3,Year_3,0))))",
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B10").numFmt = "0";
  wb.definedNames.add(`'Am I in'!$B$10`, "FromYear");

  labelCell(ws.getCell("A11"), "Verdict");
  ws.getCell("B11").value = {
    formula:
      "IF(In_Individual<>\"Yes\",\"Out of scope — companies/partnerships/trusts are not in MTD ITSA\"," +
      "IF(FromYear=0,\"Not yet mandated — below £\"&TEXT(Thr_3,\"#,##0\")&\" (voluntary opt-in available)\"," +
      "\"YES — mandatory from 6 April \"&FromYear))",
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B11").font = { bold: true, color: { argb: SLATE_900 } };

  labelCell(ws.getCell("A12"), "Quarterly updates you will owe each year");
  ws.getCell("B12").value = {
    formula: "IF(AND(In_Individual=\"Yes\",FromYear>0),Quarters,0)",
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B12").numFmt = "0";

  // Light styling on the verdict block.
  for (let r = 7; r <= 12; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  ws.getCell("B11").fill = { type: "pattern", pattern: "solid", fgColor: { argb: AMBER_50 } };
  ws.getColumn("a").alignment = { wrapText: true };
  ws.getColumn("b").alignment = { wrapText: true };

  /* --------------------------- Quarter tracker ----------------------------- */
  const qt = wb.addWorksheet("Quarter tracker", {
    properties: { tabColor: { argb: EMERALD } },
  });
  qt.columns = [
    { key: "a", width: 14 },
    { key: "b", width: 20 },
    { key: "c", width: 18 },
    { key: "d", width: 18 },
    { key: "e", width: 16 },
    { key: "f", width: 22 },
  ];
  headerCell(qt.getCell("A1"), "Quarterly update tracker (standard UK-tax-year quarters)");
  qt.mergeCells("A1:F1");

  const headRow = 3;
  const heads = ["Quarter", "Period covers", "Period ends", "Update due", "Submitted?", "Status"];
  heads.forEach((h, i) => {
    const c = qt.getCell(headRow, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  });

  MTD_STANDARD_QUARTERS.forEach((q, i) => {
    const row = headRow + 1 + i;
    qt.getCell(`A${row}`).value = q.label;
    qt.getCell(`B${row}`).value = q.periodCovers;
    qt.getCell(`C${row}`).value = q.periodEnds;
    qt.getCell(`D${row}`).value = q.updateDue;
    // Submitted? column = editable Yes/No dropdown (unlocked).
    const sub = qt.getCell(`E${row}`);
    sub.value = "No";
    sub.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
    sub.protection = { locked: false };
    sub.dataValidation = { type: "list", allowBlank: false, formulae: ['"Yes,No"'] };
    // Status = live formula off the Submitted? cell.
    qt.getCell(`F${row}`).value = {
      formula: `IF(E${row}="Yes","Done","Outstanding — due "&D${row})`,
    } as ExcelJS.CellFormulaValue;
  });
  // Final declaration row.
  const finalRow = headRow + 1 + MTD_STANDARD_QUARTERS.length + 1;
  labelCell(qt.getCell(`A${finalRow}`), "Final declaration");
  qt.getCell(`B${finalRow}`).value = "Whole tax year wrap-up";
  qt.getCell(`C${finalRow}`).value = "5 April (year end)";
  qt.getCell(`D${finalRow}`).value = "31 January following";
  const fsub = qt.getCell(`E${finalRow}`);
  fsub.value = "No";
  fsub.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
  fsub.protection = { locked: false };
  fsub.dataValidation = { type: "list", allowBlank: false, formulae: ['"Yes,No"'] };
  qt.getCell(`F${finalRow}`).value = {
    formula: `IF(E${finalRow}="Yes","Done","Outstanding — due "&D${finalRow})`,
  } as ExcelJS.CellFormulaValue;

  // Count-of-outstanding helper.
  const summaryRow = finalRow + 2;
  labelCell(qt.getCell(`A${summaryRow}`), "Outstanding obligations");
  qt.getCell(`C${summaryRow}`).value = {
    formula: `COUNTIF(E${headRow + 1}:E${finalRow},"No")`,
  } as ExcelJS.CellFormulaValue;
  qt.getCell(`C${summaryRow}`).font = { bold: true, color: { argb: SLATE_900 } };
  qt.getCell(`D${summaryRow}`).value = "(quarterly updates + final declaration still to file)";
  qt.getCell(`D${summaryRow}`).font = { italic: true, color: { argb: "FF64748B" }, size: 10 };

  /* ------------------------------- Records --------------------------------- */
  const rec = wb.addWorksheet("Records", {
    properties: { tabColor: { argb: EMERALD } },
  });
  rec.columns = [
    { key: "a", width: 14 },
    { key: "b", width: 30 },
    { key: "c", width: 22 },
    { key: "d", width: 16 },
    { key: "e", width: 14 },
  ];
  headerCell(rec.getCell("A1"), "Digital records log (categorise every transaction)");
  rec.mergeCells("A1:E1");
  const recHeadRow = 3;
  const recHeads = ["Date", "Description", "Category", "Amount (£)", "Quarter"];
  recHeads.forEach((h, i) => {
    const c = rec.getCell(recHeadRow, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  });
  // Category dropdown uses the SA105 property categories.
  const categories =
    '"Gross rental income,Repairs & maintenance,Letting agent fees,Insurance,Finance costs (interest),Council tax / utilities,Other allowable cost"';
  const firstDataRow = recHeadRow + 1;
  const lastDataRow = firstDataRow + 19; // 20 blank logging rows
  for (let r = firstDataRow; r <= lastDataRow; r++) {
    for (let col = 1; col <= 5; col++) {
      const c = rec.getCell(r, col);
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: r % 2 === 0 ? SLATE_50 : "FFFFFFFF" } };
      c.protection = { locked: false };
    }
    rec.getCell(`D${r}`).numFmt = "£#,##0.00";
    rec.getCell(`C${r}`).dataValidation = { type: "list", allowBlank: true, formulae: [categories] };
    rec.getCell(`E${r}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: ['"Q1,Q2,Q3,Q4"'],
    };
  }
  // Running totals by category.
  const totRow = lastDataRow + 2;
  labelCell(rec.getCell(`A${totRow}`), "Totals by category");
  const catList = [
    "Gross rental income",
    "Repairs & maintenance",
    "Letting agent fees",
    "Insurance",
    "Finance costs (interest)",
    "Council tax / utilities",
    "Other allowable cost",
  ];
  catList.forEach((cat, i) => {
    const r = totRow + 1 + i;
    rec.getCell(`B${r}`).value = cat;
    rec.getCell(`D${r}`).value = {
      formula: `SUMIF($C$${firstDataRow}:$C$${lastDataRow},B${r},$D$${firstDataRow}:$D$${lastDataRow})`,
    } as ExcelJS.CellFormulaValue;
    rec.getCell(`D${r}`).numFmt = "£#,##0.00";
  });

  /* ------------------------------ Start here ------------------------------- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 92 }];
  const startLines: Array<[string, boolean]> = [
    ["Making Tax Digital for Income Tax — checker + deadline tracker", true],
    ["", false],
    ["This workbook tells you whether MTD for Income Tax applies to you and from which April, then", false],
    ["gives you a quarterly-deadline tracker and a digital-records log to help you get ready.", false],
    ["", false],
    ["How to use it:", true],
    ["1. 'Am I in' tab: edit only the blue cells (gross rent, gross trade, individual yes/no). The", false],
    ["   verdict and your start year update automatically from the locked thresholds.", false],
    ["2. 'Quarter tracker' tab: mark each quarterly update + the final declaration 'Yes' once filed;", false],
    ["   the status column flags what is still outstanding.", false],
    ["3. 'Records' tab: log every transaction against an SA105 category; totals update per category.", false],
    ["", false],
    ["The 'Rates' tab holds the locked MTD thresholds and is the same source the website checker uses.", false],
    ["Read the 'Notes' tab for the assumptions and what this model does NOT cover.", false],
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
  notes.columns = [{ width: 104 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• MTD for Income Tax (MTD ITSA) is phased by qualifying income: mandatory for individuals from",
    "  6 April 2026 when qualifying income is OVER £50,000, from 6 April 2027 when OVER £30,000, and",
    "  from 6 April 2028 when OVER £20,000. The thresholds are 'over', so income exactly equal to a",
    "  threshold is in the NEXT cohort, not the current one.",
    "",
    "• Qualifying income = GROSS property rental income + GROSS sole-trade / self-employment turnover,",
    "  before any expenses. The two streams are aggregated. Employment (PAYE), pensions, dividends and",
    "  savings interest do NOT count towards it. A high-rent / low-profit landlord can still be in scope.",
    "",
    "• Joint-property owners test the threshold against their SHARE of the gross rent (default 50/50",
    "  absent a Form 17 election), not the property's total. Enter only your share here.",
    "",
    "• Limited companies are OUTSIDE MTD ITSA entirely (they file a Company Tax return). Partnerships and",
    "  LLPs are deferred with no confirmed start date. Trustees are outside MTD ITSA. Answer 'No' to the",
    "  individual question for any of these and the verdict shows 'out of scope'.",
    "",
    "• Once in, you must keep digital records, file four quarterly updates (roughly one month after each",
    "  quarter end) and a final declaration by 31 January after the tax year, using HMRC-recognised",
    "  software (spreadsheet + recognised bridging software is allowed; copy-paste is not a digital link).",
    "",
    "• A calendar-quarter election (31 Mar / 30 Jun / 30 Sep / 31 Dec) is available from 6 April 2026;",
    "  this tracker uses the default UK-tax-year quarters.",
    "",
    "• This is general guidance based on the published schedule, not advice for your specific situation.",
    "  Speak to a property tax specialist before relying on it.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  // Order the tabs: Start here, Am I in?, Quarter tracker, Records, Rates, Notes.
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Am I in", "Quarter tracker", "Records", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
