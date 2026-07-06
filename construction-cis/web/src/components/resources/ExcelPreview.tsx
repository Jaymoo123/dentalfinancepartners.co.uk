/**
 * A faithful, condensed preview of a topic's downloadable Excel model.
 * Spreadsheet-styled mockup of the workbook's main input sheet so a visitor
 * can SEE the real thing before entering their email.
 *
 * Two layouts:
 *   - "paired": left and right blocks side by side.
 *   - "single": one wide label column + value column.
 *
 * Fixed w-[640px] grid (same in a narrow blog column or wide calculator page).
 * Headline band: slate background with orange accent strip (construction-cis token idiom).
 * Numbers mirror the TS compute lib defaults from the golden test cases.
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--primary).
 * Uses orange (#f97316) and slate (#1e293b) inline where CSS vars are unavailable.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
const PAIRED_TRAIL = 6;
const SINGLE_TRAIL = 9;

/* --- spreadsheet cells ----------------------------------------------------- */

function RowNum({ n }: { n: number }) {
  return (
    <th className="border border-slate-200 bg-slate-50 px-1 py-0.5 text-center text-[9px] font-normal text-slate-400">
      {n}
    </th>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <td className="overflow-hidden whitespace-nowrap border border-slate-200 px-1.5 py-0.5 text-slate-500">
      {children}
    </td>
  );
}
function Num({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <td
      className={[
        "border border-slate-200 px-1.5 py-0.5 text-right font-mono tabular-nums",
        strong ? "font-bold text-slate-900" : "text-slate-500",
      ].join(" ")}
    >
      {children}
    </td>
  );
}
function Blue({ children, num }: { children: React.ReactNode; num?: boolean }) {
  return (
    <td
      className={[
        "whitespace-nowrap border border-slate-200 bg-blue-50 px-1.5 py-0.5 font-medium text-slate-900",
        num ? "text-right font-mono tabular-nums" : "",
      ].join(" ")}
    >
      {children}
    </td>
  );
}
function Head({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <td
      colSpan={colSpan}
      className="overflow-hidden whitespace-nowrap border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-white"
      style={{ background: "#1e293b" }}
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

type Val = { text: string; v: "blue" | "blueText" | "num" | "numStrong" };
type SideData = { label: string; value: Val };

type PairedRow =
  | { kind: "head"; left?: string; right?: string }
  | { kind: "data"; left?: SideData; right?: SideData }
  | { kind: "headline"; text: string }
  | { kind: "blank" };

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

/* --- the specs ------------------------------------------------------------- */

// Figures from executed compute libs (golden cases per brief section 2).
const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // cis-refund default: grossIncome=45000, materials=5000, registered 20%, expenses=4000
  // cisDeducted=8000, taxableProfit=36000, incomeTax=4686, class4=1405.80, refund=1908.20
  "cis-refund": {
    layout: "single",
    file: "cis-refund-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Gross CIS labour income (GBP)", value: { text: "45,000", v: "blue" } },
      { kind: "data", label: "Materials (excluded from CIS base)", value: { text: "5,000", v: "blue" } },
      { kind: "data", label: "CIS deduction rate", value: { text: "20% (registered)", v: "blueText" } },
      { kind: "data", label: "Allowable expenses (GBP)", value: { text: "4,000", v: "blue" } },
      { kind: "head", text: "Your CIS refund estimate" },
      { kind: "data", label: "Labour-only deduction base", value: { text: "40,000", v: "num" } },
      { kind: "data", label: "CIS deducted at source", value: { text: "8,000", v: "num" } },
      { kind: "data", label: "Self Assessment liability", value: { text: "6,091.80", v: "num" } },
      { kind: "headline", text: "Estimated refund: GBP 1,908.20 (refund = CIS deducted less SA liability)" },
      { kind: "blank" },
    ],
  },

  // cis-deductions is an alias to cis-refund (same resource, different entry point)
  "cis-deductions": {
    layout: "single",
    file: "cis-refund-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Gross CIS labour income (GBP)", value: { text: "45,000", v: "blue" } },
      { kind: "data", label: "Materials (excluded from CIS base)", value: { text: "5,000", v: "blue" } },
      { kind: "data", label: "CIS deduction rate", value: { text: "20% (registered)", v: "blueText" } },
      { kind: "data", label: "Allowable expenses (GBP)", value: { text: "4,000", v: "blue" } },
      { kind: "head", text: "Your CIS deduction and refund" },
      { kind: "data", label: "Labour-only deduction base", value: { text: "40,000", v: "num" } },
      { kind: "data", label: "CIS deducted at source", value: { text: "8,000", v: "num" } },
      { kind: "data", label: "Self Assessment liability", value: { text: "6,091.80", v: "num" } },
      { kind: "headline", text: "CIS deducted GBP 8,000: estimated refund GBP 1,908.20" },
      { kind: "blank" },
    ],
  },

  // cis-vs-paye default: grossEarnings=45000, cisExpenses=5000, cisRate=20%
  // CIS takeHome=32868.20, PAYE takeHome=35919.60, diff=-3051.40 (PAYE wins)
  "limited-company": {
    layout: "paired",
    file: "cis-vs-paye-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Comparison" },
      {
        kind: "data",
        left: { label: "Gross annual earnings", value: { text: "45,000", v: "blue" } },
        right: { label: "CIS take-home", value: { text: "32,868", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "CIS expenses", value: { text: "5,000", v: "blue" } },
        right: { label: "PAYE take-home", value: { text: "35,920", v: "numStrong" } },
      },
      {
        kind: "data",
        left: { label: "CIS deduction rate", value: { text: "20%", v: "blueText" } },
        right: { label: "Difference (CIS minus PAYE)", value: { text: "-3,051", v: "num" } },
      },
      { kind: "headline", text: "At GBP 45k gross and GBP 5k expenses, PAYE take-home is GBP 3,051 higher" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // gps-readiness default: sole trader, turnover=35000, heads=1, all tests pass
  "gross-payment-status": {
    layout: "single",
    file: "gps-readiness-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Business structure", value: { text: "Sole trader", v: "blueText" } },
      { kind: "data", label: "Annual net CIS turnover (GBP)", value: { text: "35,000", v: "blue" } },
      { kind: "data", label: "Partners / directors / controllers", value: { text: "1", v: "blue" } },
      { kind: "head", text: "GPS readiness scorecard" },
      { kind: "data", label: "Business test", value: { text: "Pass", v: "numStrong" } },
      { kind: "data", label: "Turnover test (threshold: GBP 30,000)", value: { text: "Pass", v: "numStrong" } },
      { kind: "data", label: "Compliance test", value: { text: "Pass", v: "numStrong" } },
      { kind: "headline", text: "Likely eligible for GPS. Estimated cash-flow gain: GBP 7,000/year at 20% rate" },
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
          className="whitespace-nowrap border border-orange-200 px-1.5 py-1 text-center text-[10px] font-semibold text-orange-700"
          style={{ background: "#fff7ed" }}
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
          className="whitespace-nowrap border border-orange-200 px-1.5 py-1 text-center text-[10px] font-semibold text-orange-700"
          style={{ background: "#fff7ed" }}
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
  if (!spec) return null;

  return (
    <figure className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Faux app bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-1.5">
        <span
          className="grid h-4 w-4 place-items-center rounded text-[9px] font-bold text-white"
          style={{ background: "#1e293b" }}
        >
          X
        </span>
        <span className="text-[11px] font-medium text-slate-500">{spec.file}</span>
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium text-orange-700 ring-1 ring-orange-200"
          style={{ background: "#fff7ed" }}
        >
          Live formulas
        </span>
      </div>

      {/* The sheet */}
      <div className="overflow-x-auto">
        <table className="w-[640px] table-fixed border-collapse text-[10px] leading-tight">
          {spec.layout === "paired" ? <PairedColGroup /> : <SingleColGroup />}
          <thead>
            <tr className="text-[9px] text-slate-400">
              <th className="border border-slate-200 bg-slate-50 py-0.5 font-normal" />
              {COLS.map((c) => (
                <th key={c} className="border border-slate-200 bg-slate-50 py-0.5 font-normal">
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
            className={[
              "rounded px-2 py-0.5 text-[10px]",
              t === spec.activeTab
                ? "bg-white font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-400",
            ].join(" ")}
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
