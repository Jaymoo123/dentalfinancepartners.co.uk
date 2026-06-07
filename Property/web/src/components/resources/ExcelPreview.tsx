/**
 * A faithful, condensed preview of a category's downloadable Excel model — a
 * spreadsheet-styled mockup of the workbook's main input sheet so a visitor can
 * SEE the real thing before giving an email. No hooks / no data fetching, so it
 * is safe in any (client or server) tree.
 *
 * It is drawn as a REAL spreadsheet grid: the data sits in the top-left, with
 * empty lettered columns (A..K) and numbered rows extending out around it, pale
 * Excel-style row/column headers, hairline gridlines and blue input cells.
 *
 * Every figure mirrors the model's DEFAULT scenario, computed with the SAME pure
 * tax libs the workbook formulas are generated from (scripts/resources/builders/*
 * import the same constants), so the preview and the downloaded file can never
 * disagree. The numbers below were taken from those libs' compute() for each
 * builder's default blue-cell inputs. Headers avoid the workbook's em-dashes to
 * match the site copy rules.
 *
 * Two layouts:
 *   - "paired": a left block and a right block side by side (e.g. "You" vs "a
 *     company", "the gain" vs "the tax"). Cols: A/B (left) · gap · D/E (right).
 *   - "single": one wide label column + a value column (e.g. SDLT by buyer type).
 * Both render at a FIXED w-[640px] (never w-full) so the same grid looks
 * identical in a narrow blog column and on the wide calculator page.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import { cn } from "@/lib/utils";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
const PAIRED_TRAIL = 6; // empty columns F..K to the right of the paired data (A..E)
const SINGLE_TRAIL = 9; // empty columns C..K to the right of the single data (A..B)

/* --- spreadsheet cells ----------------------------------------------------- */

function RowNum({ n }: { n: number }) {
  return (
    <th className="border border-slate-100 bg-slate-50 px-1 py-0.5 text-center text-[9px] font-normal text-slate-400">
      {n}
    </th>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <td className="overflow-hidden whitespace-nowrap border border-slate-200 px-1.5 py-0.5 text-slate-600">
      {children}
    </td>
  );
}
function Num({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <td
      className={cn(
        "border border-slate-200 px-1.5 py-0.5 text-right font-mono tabular-nums",
        strong ? "font-bold text-slate-900" : "text-slate-700",
      )}
    >
      {children}
    </td>
  );
}
function Blue({ children, num }: { children: React.ReactNode; num?: boolean }) {
  return (
    <td
      className={cn(
        "whitespace-nowrap border border-slate-200 bg-blue-50 px-1.5 py-0.5 font-medium text-slate-900",
        num && "text-right font-mono tabular-nums",
      )}
    >
      {children}
    </td>
  );
}
function Head({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <td
      colSpan={colSpan}
      className="overflow-hidden whitespace-nowrap border border-slate-200 bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-white"
    >
      {children}
    </td>
  );
}
function Empty() {
  return <td className="border border-slate-200 px-1.5 py-0.5" />;
}
function Trail({ count = PAIRED_TRAIL }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <td key={i} className="border border-slate-200 px-1.5 py-0.5" />
      ))}
    </>
  );
}

/* --- the row model --------------------------------------------------------- */

/** A value cell: a blue input (number or free text) or a computed output. */
type Val = { text: string; v: "blue" | "blueText" | "num" | "numStrong" };
type SideData = { label: string; value: Val };

/** Rows for the side-by-side "paired" layout. A missing side renders as blanks. */
type PairedRow =
  | { kind: "head"; left?: string; right?: string }
  | { kind: "data"; left?: SideData; right?: SideData }
  | { kind: "headline"; text: string }
  | { kind: "blank" };

/** Rows for the single-column layout. */
type SingleRow =
  | { kind: "head"; text: string }
  | { kind: "data"; label: string; value: Val }
  | { kind: "headline"; text: string }
  | { kind: "blank" };

type PreviewSpec =
  | {
      layout: "paired";
      file: string;
      tabs: string[];
      activeTab: string;
      caption?: string;
      rows: PairedRow[];
    }
  | {
      layout: "single";
      file: string;
      tabs: string[];
      activeTab: string;
      caption?: string;
      rows: SingleRow[];
    };

function ValueCell({ value }: { value: Val }) {
  switch (value.v) {
    case "blue":
      return <Blue num>{value.text}</Blue>;
    case "blueText":
      return <Blue>{value.text}</Blue>;
    case "numStrong":
      return <Num strong>{value.text}</Num>;
    default:
      return <Num>{value.text}</Num>;
  }
}

/* --- the specs (one per category, numbers from the shared tax libs) -------- */

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // Personal vs company under the Section 24 finance-cost restriction.
  "section-24": {
    layout: "paired",
    file: "section-24-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)" },
      { kind: "data", left: { label: "Annual rental income", value: { text: "£50,000", v: "blue" } } },
      { kind: "data", left: { label: "Annual mortgage interest", value: { text: "£20,000", v: "blue" } } },
      { kind: "data", left: { label: "Your income tax band", value: { text: "Higher rate (40%)", v: "blueText" } } },
      { kind: "head", left: "You (individual)", right: "A company" },
      {
        kind: "data",
        left: { label: "Income tax payable", value: { text: "£12,800", v: "numStrong" } },
        right: { label: "Corporation Tax", value: { text: "£4,180", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Net cash profit", value: { text: "£9,200", v: "num" } },
        right: { label: "Retained after CT", value: { text: "£17,820", v: "num" } },
      },
      { kind: "headline", text: "A company pays £8,620 less tax a year" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // SDLT on one purchase price, computed four ways by buyer type.
  "stamp-duty": {
    layout: "single",
    file: "stamp-duty-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cell)" },
      { kind: "data", label: "Purchase price", value: { text: "£350,000", v: "blue" } },
      { kind: "head", text: "SDLT by buyer type" },
      { kind: "data", label: "Standard (main home)", value: { text: "£7,500", v: "num" } },
      { kind: "data", label: "Additional property (+5%)", value: { text: "£25,000", v: "numStrong" } },
      { kind: "data", label: "Non-resident buy-to-let", value: { text: "£32,000", v: "num" } },
      { kind: "data", label: "First-time buyer (relief)", value: { text: "£2,500", v: "num" } },
      { kind: "headline", text: "The 5% surcharge adds £17,500" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // CGT on a residential disposal: the gain, then the tax.
  "capital-gains": {
    layout: "paired",
    file: "capital-gains-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)" },
      { kind: "data", left: { label: "Sale price", value: { text: "£320,000", v: "blue" } } },
      { kind: "data", left: { label: "Original purchase price", value: { text: "£200,000", v: "blue" } } },
      { kind: "data", left: { label: "Costs and improvements", value: { text: "£17,000", v: "blue" } } },
      { kind: "data", left: { label: "Your other income", value: { text: "£50,000", v: "blue" } } },
      { kind: "head", left: "The gain", right: "The tax" },
      {
        kind: "data",
        left: { label: "Gain before relief", value: { text: "£103,000", v: "num" } },
        right: { label: "Taxable gain", value: { text: "£100,000", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Annual exempt amount", value: { text: "£3,000", v: "num" } },
        right: { label: "Capital Gains Tax", value: { text: "£23,984", v: "numStrong" } },
      },
      { kind: "headline", text: "£23,984 to pay, due within 60 days of completion" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Rental profit and income tax for one property or a portfolio.
  "landlord-essentials": {
    layout: "single",
    file: "landlord-essentials-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Annual rent", value: { text: "£18,000", v: "blue" } },
      { kind: "data", label: "Running costs", value: { text: "£3,000", v: "blue" } },
      { kind: "data", label: "Mortgage interest", value: { text: "£6,000", v: "blue" } },
      { kind: "data", label: "Your other income", value: { text: "£40,000", v: "blue" } },
      { kind: "head", text: "Income tax on your rental profit" },
      { kind: "data", label: "Taxable rental profit", value: { text: "£15,000", v: "num" } },
      { kind: "data", label: "Section 24 credit", value: { text: "£1,200", v: "num" } },
      { kind: "data", label: "Income tax payable", value: { text: "£2,746", v: "numStrong" } },
      { kind: "headline", text: "£6,254 net cash after tax and interest" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Stay personal vs incorporate: upfront cost vs annual saving.
  incorporation: {
    layout: "paired",
    file: "incorporation-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)" },
      { kind: "data", left: { label: "Property value", value: { text: "£300,000", v: "blue" } } },
      { kind: "data", left: { label: "Original cost", value: { text: "£200,000", v: "blue" } } },
      { kind: "data", left: { label: "Annual rent", value: { text: "£24,000", v: "blue" } } },
      { kind: "data", left: { label: "Mortgage interest", value: { text: "£9,000", v: "blue" } } },
      { kind: "head", left: "Upfront to incorporate", right: "Annual tax" },
      {
        kind: "data",
        left: { label: "CGT on transfer", value: { text: "£21,018", v: "num" } },
        right: { label: "Stay personal", value: { text: "£6,600", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "SDLT (with 5%)", value: { text: "£20,000", v: "num" } },
        right: { label: "Company route", value: { text: "£2,280", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Total upfront", value: { text: "£41,018", v: "numStrong" } },
        right: { label: "Saving a year", value: { text: "£4,320", v: "numStrong" } },
      },
      { kind: "headline", text: "Break-even in 9.5 years on these figures" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Making Tax Digital: the "Am I in?" verdict + obligations.
  mtd: {
    layout: "single",
    file: "mtd-model.xlsx",
    tabs: ["Start here", "Am I in", "Quarter tracker", "Records"],
    activeTab: "Am I in",
    caption: "Preview of the actual workbook. Edit the blue cells and the verdict updates.",
    rows: [
      { kind: "head", text: "Am I in MTD? (edit the blue cells)" },
      { kind: "data", label: "Annual rental income", value: { text: "£35,000", v: "blue" } },
      { kind: "data", label: "Sole-trade turnover", value: { text: "£20,000", v: "blue" } },
      { kind: "data", label: "Individual / sole trader?", value: { text: "Yes", v: "blueText" } },
      { kind: "head", text: "Does MTD apply to you?" },
      { kind: "data", label: "Qualifying income", value: { text: "£55,000", v: "num" } },
      { kind: "data", label: "Quarterly updates a year", value: { text: "4", v: "num" } },
      { kind: "headline", text: "Yes, mandatory from 6 April 2026" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },
};

/* --- the renderers --------------------------------------------------------- */

function PairedRowView({ row, n }: { row: PairedRow; n: number }) {
  if (row.kind === "blank") {
    return (
      <tr>
        <RowNum n={n} />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Trail count={PAIRED_TRAIL} />
      </tr>
    );
  }
  if (row.kind === "headline") {
    return (
      <tr>
        <RowNum n={n} />
        <td
          colSpan={5}
          className="whitespace-nowrap border border-emerald-200 bg-emerald-50 px-1.5 py-1 text-center text-[10px] font-semibold text-emerald-800"
        >
          {row.text}
        </td>
        <Trail count={PAIRED_TRAIL} />
      </tr>
    );
  }
  if (row.kind === "head") {
    return (
      <tr>
        <RowNum n={n} />
        {row.left ? <Head colSpan={2}>{row.left}</Head> : (<><Empty /><Empty /></>)}
        <Empty />
        {row.right ? <Head colSpan={2}>{row.right}</Head> : (<><Empty /><Empty /></>)}
        <Trail count={PAIRED_TRAIL} />
      </tr>
    );
  }
  // data
  return (
    <tr>
      <RowNum n={n} />
      {row.left ? (
        <>
          <Label>{row.left.label}</Label>
          <ValueCell value={row.left.value} />
        </>
      ) : (
        <>
          <Empty />
          <Empty />
        </>
      )}
      <Empty />
      {row.right ? (
        <>
          <Label>{row.right.label}</Label>
          <ValueCell value={row.right.value} />
        </>
      ) : (
        <>
          <Empty />
          <Empty />
        </>
      )}
      <Trail count={PAIRED_TRAIL} />
    </tr>
  );
}

function SingleRowView({ row, n }: { row: SingleRow; n: number }) {
  if (row.kind === "blank") {
    return (
      <tr>
        <RowNum n={n} />
        <Empty />
        <Empty />
        <Trail count={SINGLE_TRAIL} />
      </tr>
    );
  }
  if (row.kind === "headline") {
    return (
      <tr>
        <RowNum n={n} />
        <td
          colSpan={2}
          className="whitespace-nowrap border border-emerald-200 bg-emerald-50 px-1.5 py-1 text-center text-[10px] font-semibold text-emerald-800"
        >
          {row.text}
        </td>
        <Trail count={SINGLE_TRAIL} />
      </tr>
    );
  }
  if (row.kind === "head") {
    return (
      <tr>
        <RowNum n={n} />
        <Head colSpan={2}>{row.text}</Head>
        <Trail count={SINGLE_TRAIL} />
      </tr>
    );
  }
  // data
  return (
    <tr>
      <RowNum n={n} />
      <Label>{row.label}</Label>
      <ValueCell value={row.value} />
      <Trail count={SINGLE_TRAIL} />
    </tr>
  );
}

function PairedColGroup() {
  return (
    <colgroup>
      <col style={{ width: "4%" }} />
      <col style={{ width: "17%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "2%" }} />
      <col style={{ width: "17%" }} />
      <col style={{ width: "9%" }} />
      {Array.from({ length: PAIRED_TRAIL }, (_, i) => (
        <col key={i} style={{ width: `${42 / PAIRED_TRAIL}%` }} />
      ))}
    </colgroup>
  );
}

function SingleColGroup() {
  return (
    <colgroup>
      <col style={{ width: "4%" }} />
      <col style={{ width: "40%" }} />
      <col style={{ width: "14%" }} />
      {Array.from({ length: SINGLE_TRAIL }, (_, i) => (
        <col key={i} style={{ width: `${42 / SINGLE_TRAIL}%` }} />
      ))}
    </colgroup>
  );
}

/* --- the preview ----------------------------------------------------------- */

export function ExcelPreview({ topic }: { topic: TopicKey }) {
  const spec = SPECS[topic];
  // Topics with no authored preview render nothing (the gate still works, just
  // without the visual). Today every flagship category has a spec.
  if (!spec) return null;

  return (
    <figure className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Faux app bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-1.5">
        <span className="grid h-4 w-4 place-items-center rounded bg-emerald-600 text-[9px] font-bold text-white">
          X
        </span>
        <span className="text-[11px] font-medium text-slate-600">{spec.file}</span>
        <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
          Live formulas
        </span>
      </div>

      {/* The sheet — data in the top-left of a real spreadsheet grid */}
      <div className="overflow-x-auto">
        <table className="w-[640px] table-fixed border-collapse text-[10px] leading-tight">
          {spec.layout === "paired" ? <PairedColGroup /> : <SingleColGroup />}
          <thead>
            <tr className="text-[9px] text-slate-400">
              <th className="border border-slate-100 bg-slate-50 py-0.5 font-normal" />
              {COLS.map((c) => (
                <th key={c} className="border border-slate-100 bg-slate-50 py-0.5 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.layout === "paired"
              ? spec.rows.map((row, i) => <PairedRowView key={i} row={row} n={i + 1} />)
              : spec.rows.map((row, i) => <SingleRowView key={i} row={row} n={i + 1} />)}
          </tbody>
        </table>
      </div>

      {/* Sheet tabs */}
      <div className="flex items-center gap-1 border-t border-slate-200 bg-slate-50 px-2 py-1">
        {spec.tabs.map((t) => (
          <span
            key={t}
            className={cn(
              "rounded px-2 py-0.5 text-[10px]",
              t === spec.activeTab
                ? "bg-white font-semibold text-emerald-700 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500",
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <figcaption className="border-t border-slate-200 bg-white px-3 py-1.5 text-[10px] text-slate-400">
        {spec.caption ?? DEFAULT_CAPTION}
      </figcaption>
    </figure>
  );
}
