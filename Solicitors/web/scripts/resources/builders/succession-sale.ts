/**
 * Practice sale: law firm valuation and CGT net-proceeds Excel model builder.
 *
 * Sheets:
 *  "Start here"    : overview and usage
 *  "Valuation"     : recurring revenue × multiple → estimated value range
 *  "CGT net"       : sale price → BADR + standard CGT → net proceeds
 *  "Rates"         : LOCKED constants mirrored from practice-sale-cgt.ts
 *  "Notes"         : methodology and disclaimers
 *
 * Constants mirrored from:
 *   src/lib/tools/compute/practice-sale-cgt.ts
 *   src/lib/tools/compute/law-firm-valuation.ts
 */
import ExcelJS from "exceljs";

const CRIMSON = "FFC41E3A";
const INK = "FF0F172A";
const SURFACE = "FFF8F9FA";
const BLUE_INPUT = "FFDBEAFE";

// ── CGT constants (mirrored from practice-sale-cgt.ts) ─────────────────────
const DEFAULT_AEA = 3000;
const DEFAULT_BADR_LIFETIME = 1_000_000;
const BADR_RATE = 0.18;          // from 6 April 2026 (HP verification log)
const CGT_BASIC_RATE = 0.18;     // from 30 Oct 2024 (HP §9)
const CGT_HIGHER_RATE = 0.24;    // from 30 Oct 2024 (HP §9)
const BASIC_RATE_LIMIT = 50270;
const PERSONAL_ALLOWANCE = 12570;

// ── Valuation multiples (mirrored from law-firm-valuation.ts) ──────────────
// FIRM_TYPE_MULTIPLES["partnership-llp"] = [1.0, 2.0] (low, high range)
const FIRM_MULTIPLE_LOW = 1.0;
const FIRM_MULTIPLE_HIGH = 2.0;

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
  cell.numFmt = "£#,##0";
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
    { key: "label", width: 55 },
    { key: "value", width: 18 },
  ];
  hdr(ratesWs.getCell("A1"), "Locked rates: do not edit");
  ratesWs.mergeCells("A1:B1");

  const rateRows: Array<{ label: string; value: number; name: string; fmt: string }> = [
    { label: "Annual exempt amount / AEA (£)", value: DEFAULT_AEA, name: "AEA", fmt: "£#,##0" },
    { label: "BADR lifetime limit (£)", value: DEFAULT_BADR_LIFETIME, name: "BADR_Limit", fmt: "£#,##0" },
    { label: "BADR rate (from 6 April 2026)", value: BADR_RATE, name: "BADR_Rate", fmt: "0%" },
    { label: "CGT basic rate (from 30 Oct 2024)", value: CGT_BASIC_RATE, name: "CGT_Basic", fmt: "0%" },
    { label: "CGT higher rate (from 30 Oct 2024)", value: CGT_HIGHER_RATE, name: "CGT_Higher", fmt: "0%" },
    { label: "Basic rate limit (£)", value: BASIC_RATE_LIMIT, name: "BRL", fmt: "£#,##0" },
    { label: "Personal allowance (£)", value: PERSONAL_ALLOWANCE, name: "PA", fmt: "£#,##0" },
    { label: "Firm multiple: low (partnership/LLP)", value: FIRM_MULTIPLE_LOW, name: "Mult_Low", fmt: "0.0" },
    { label: "Firm multiple: high (partnership/LLP)", value: FIRM_MULTIPLE_HIGH, name: "Mult_Hi", fmt: "0.0" },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    lbl(ratesWs.getCell(`A${row}`), r.label);
    const vc = ratesWs.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.fmt;
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  ratesWs.getColumn("label").alignment = { wrapText: true };
  ratesWs.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* --------------------------------------------------------- Valuation -- */
  const val = wb.addWorksheet("Valuation", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  val.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(val.getCell("A1"), "Law firm indicative valuation (recurring revenue method)");
  val.mergeCells("A1:B1");

  val.getCell("A3").value = "Recurring annual revenue (£):";
  inputCell(val.getCell("B3"), 600000, true);
  wb.definedNames.add(`Valuation!$B$3`, "V_Revenue");

  val.getCell("A4").value = 'Practice type (partnership-llp / sole-practitioner):';
  inputCell(val.getCell("B4"), "partnership-llp");
  val.getCell("B4").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"partnership-llp,sole-practitioner"'],
  };

  val.getCell("A5").value = "Low multiple (from Rates):";
  val.getCell("B5").value = { formula: "Mult_Low" } as ExcelJS.CellFormulaValue;
  val.getCell("B5").numFmt = "0.0";

  val.getCell("A6").value = "High multiple (from Rates):";
  val.getCell("B6").value = { formula: "Mult_Hi" } as ExcelJS.CellFormulaValue;
  val.getCell("B6").numFmt = "0.0";

  hdr(val.getCell("A8"), "Estimated value range");
  val.mergeCells("A8:B8");

  lbl(val.getCell("A9"), "Low estimate (£):");
  val.getCell("B9").value = { formula: "V_Revenue*Mult_Low" } as ExcelJS.CellFormulaValue;
  moneyFmt(val.getCell("B9"));
  wb.definedNames.add(`Valuation!$B$9`, "V_Low");

  lbl(val.getCell("A10"), "High estimate (£):");
  val.getCell("B10").value = { formula: "V_Revenue*Mult_Hi" } as ExcelJS.CellFormulaValue;
  moneyFmt(val.getCell("B10"));
  wb.definedNames.add(`Valuation!$B$10`, "V_High");

  lbl(val.getCell("A11"), "Central estimate (£):");
  val.getCell("B11").value = { formula: "(V_Low+V_High)/2" } as ExcelJS.CellFormulaValue;
  moneyFmt(val.getCell("B11"));

  val.getCell("A13").value =
    "This is a market-range estimate for orientation. A professional valuation (RICS/M&A adviser) is needed before heads of terms.";
  val.getCell("A13").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  val.getColumn("a").alignment = { wrapText: true };

  /* ----------------------------------------------------------- CGT net -- */
  const cgt = wb.addWorksheet("CGT net", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  cgt.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(cgt.getCell("A1"), "Practice sale: CGT and net proceeds (2026/27)");
  cgt.mergeCells("A1:B1");

  cgt.getCell("A3").value = "Sale price / proceeds (£):";
  inputCell(cgt.getCell("B3"), 900000, true);
  wb.definedNames.add(`'CGT net'!$B$3`, "C_Price");

  cgt.getCell("A4").value = "Base cost (original cost of goodwill, or 0 if built from scratch) (£):";
  inputCell(cgt.getCell("B4"), 0, true);
  wb.definedNames.add(`'CGT net'!$B$4`, "C_Base");

  cgt.getCell("A5").value = "Other income this year (salary, partner share, etc.) (£):";
  inputCell(cgt.getCell("B5"), 50000, true);
  wb.definedNames.add(`'CGT net'!$B$5`, "C_Income");

  cgt.getCell("A6").value = "BADR eligible? (1 = yes, 0 = no):";
  inputCell(cgt.getCell("B6"), 1);
  cgt.getCell("B6").dataValidation = { type: "list", allowBlank: false, formulae: ['"0,1"'] };
  wb.definedNames.add(`'CGT net'!$B$6`, "C_BADR");

  cgt.getCell("A7").value = "BADR lifetime remaining (£: default £1,000,000):";
  inputCell(cgt.getCell("B7"), DEFAULT_BADR_LIFETIME, true);
  wb.definedNames.add(`'CGT net'!$B$7`, "C_BADR_Rem");

  cgt.getCell("A8").value = "AEA available (£: default £3,000):";
  inputCell(cgt.getCell("B8"), DEFAULT_AEA, true);
  wb.definedNames.add(`'CGT net'!$B$8`, "C_AEA");

  hdr(cgt.getCell("A10"), "CGT calculation");
  cgt.mergeCells("A10:B10");

  cgt.getCell("A11").value = "Gross gain (price minus base cost):";
  cgt.getCell("B11").value = { formula: "MAX(0,C_Price-C_Base)" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B11"));
  wb.definedNames.add(`'CGT net'!$B$11`, "C_Gain");

  lbl(cgt.getCell("A12"), "Taxable gain (after AEA):");
  cgt.getCell("B12").value = { formula: "MAX(0,C_Gain-C_AEA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B12"));
  wb.definedNames.add(`'CGT net'!$B$12`, "C_TaxGain");

  // Basic band remaining after other income
  cgt.getCell("A13").value = "Basic-rate band remaining after other income:";
  cgt.getCell("B13").value = {
    formula: "MAX(0,(BRL-PA)-MIN(MAX(0,C_Income-PA),BRL-PA))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B13"));
  wb.definedNames.add(`'CGT net'!$B$13`, "C_BasicRem");

  // Gain at BADR (if eligible, capped at BADR lifetime remaining)
  cgt.getCell("A14").value = "Gain taxed at BADR (18%):";
  cgt.getCell("B14").value = {
    formula: "IF(C_BADR=1,MIN(C_TaxGain,C_BADR_Rem),0)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B14"));
  wb.definedNames.add(`'CGT net'!$B$14`, "C_AtBadr");

  // Basic-rate band after BADR gain
  cgt.getCell("A15").value = "Basic band remaining after BADR gain:";
  cgt.getCell("B15").value = { formula: "MAX(0,C_BasicRem-C_AtBadr)" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B15"));
  wb.definedNames.add(`'CGT net'!$B$15`, "C_BasicAfterBadr");

  cgt.getCell("A16").value = "Remaining gain (after BADR):";
  cgt.getCell("B16").value = { formula: "MAX(0,C_TaxGain-C_AtBadr)" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B16"));
  wb.definedNames.add(`'CGT net'!$B$16`, "C_RemGain");

  cgt.getCell("A17").value = "Gain taxed at 18% (basic rate):";
  cgt.getCell("B17").value = { formula: "MIN(C_RemGain,C_BasicAfterBadr)" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B17"));
  wb.definedNames.add(`'CGT net'!$B$17`, "C_AtBasic");

  cgt.getCell("A18").value = "Gain taxed at 24% (higher rate):";
  cgt.getCell("B18").value = { formula: "MAX(0,C_RemGain-C_AtBasic)" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B18"));
  wb.definedNames.add(`'CGT net'!$B$18`, "C_AtHigher");

  lbl(cgt.getCell("A20"), "Total CGT:");
  cgt.getCell("B20").value = {
    formula: "C_AtBadr*BADR_Rate+C_AtBasic*CGT_Basic+C_AtHigher*CGT_Higher",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B20"));
  wb.definedNames.add(`'CGT net'!$B$20`, "C_CGT");

  lbl(cgt.getCell("A21"), "Net proceeds after CGT:");
  cgt.getCell("B21").value = { formula: "C_Price-C_CGT" } as ExcelJS.CellFormulaValue;
  moneyFmt(cgt.getCell("B21"));
  cgt.getCell("B21").font = { bold: true, size: 13 };

  cgt.getCell("A23").value =
    "WIP realised on sale is income, not capital. Feed only goodwill/capital proceeds into C_Price.";
  cgt.getCell("A23").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  cgt.getColumn("a").alignment = { wrapText: true };

  /* -------------------------------------------------------- Start here -- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: INK } },
  });
  start.columns = [{ width: 95 }];
  const startLines: Array<[string, boolean]> = [
    ["Practice sale: valuation and CGT net-proceeds model", true],
    ["", false],
    ["This workbook contains two working tools:", false],
    ["", false],
    ["  Valuation: enter your recurring annual revenue. The model applies the standard", false],
    ["    market multiple range for a partnership or LLP and shows you a low, central", false],
    ["    and high estimated value. This is a market-range estimate, not a professional", false],
    ["    valuation.", false],
    ["", false],
    ["  CGT net: enter the anticipated sale price, your base cost, your other income", false],
    ["    this year, whether BADR applies, your remaining BADR lifetime allowance and", false],
    ["    the AEA available. The model calculates taxable gain, the BADR / standard CGT", false],
    ["    split, the total CGT liability and your net proceeds after tax.", false],
    ["", false],
    ["  The Rates tab holds locked constants. It is the same source as the online calculator.", false],
    ["  Read the Notes tab for methodology and disclaimers.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 15 : 12, color: { argb: INK } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SURFACE } };

  /* -------------------------------------------------------------- Notes -- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Methodology, assumptions and disclaimers",
    "",
    "CGT rates (2026/27)",
    "BADR rate: 18% from 6 April 2026 (Finance Act 2026; was 14% 6 April 2025 to 5 April 2026).",
    "Standard CGT: 18% (basic-rate band) / 24% (higher rate). Annual exempt amount: £3,000.",
    "BADR lifetime limit: £1,000,000 (cumulative across all qualifying disposals).",
    "",
    "BADR qualification",
    "BADR requires a two-year qualifying period as a genuine trading business interest.",
    "This model assumes the caller has assessed eligibility correctly; it does not model",
    "the qualification tests. Partial BADR (where only some of the gain qualifies) is not",
    "modelled: when BADR = yes, the entire gain up to the lifetime limit is at 18%.",
    "",
    "WIP",
    "Unbilled WIP realised on a firm sale is an income receipt (ITTOIA 2005 ss.182-185),",
    "NOT a capital gain. Do not include WIP in the sale proceeds entered in this model.",
    "",
    "Valuation",
    "The recurring-revenue multiple is a market orientation range for partnership/LLP firms.",
    "Actual prices depend on practice mix, client concentration, partner dependency, staff",
    "retention and buyer demand. This is not a RICS or M&A professional valuation.",
    "",
    "General",
    "Earnouts, deferred consideration and staged payments have complex CGT timing rules.",
    "Take specialist advice before heads of terms are agreed. The first call is free.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0 || text === "CGT rates (2026/27)" || text === "BADR qualification" ||
        text === "WIP" || text === "Valuation" || text === "General") {
      c.font = { bold: true, size: i === 0 ? 14 : 11, color: { argb: INK } };
    }
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Valuation", "CGT net", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
