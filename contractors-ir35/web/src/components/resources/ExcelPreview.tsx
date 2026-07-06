/**
 * A faithful, condensed preview of a topic's downloadable Excel model.
 * Spreadsheet-styled mockup of the workbook's main input sheet so a visitor
 * can SEE the real thing before entering their email.
 *
 * Two layouts:
 *   - "paired": left and right blocks side by side (outside vs inside IR35, umbrella vs limited).
 *   - "single": one wide label column + value column (salary/dividend planner).
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--dark), no var(--primary).
 * Uses cfp tokens: --accent (#0e7490), --accent-strong, --accent-whisper,
 * --surface, --surface-elevated, --border, --ink, --ink-soft, --muted.
 *
 * Numbers mirror the tax2026.ts compute lib defaults from the golden cases.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
const PAIRED_TRAIL = 6;
const SINGLE_TRAIL = 9;

/* --- spreadsheet cells ----------------------------------------------------- */

function RowNum({ n }: { n: number }) {
  return (
    <th className="border border-[var(--border)] bg-[var(--surface-elevated)] px-1 py-0.5 text-center text-[9px] font-normal text-[var(--muted)]">
      {n}
    </th>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <td className="overflow-hidden whitespace-nowrap border border-[var(--border)] px-1.5 py-0.5 text-[var(--ink-soft)]">
      {children}
    </td>
  );
}
function Num({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <td
      className={[
        "border border-[var(--border)] px-1.5 py-0.5 text-right font-mono tabular-nums",
        strong ? "font-bold text-[var(--ink)]" : "text-[var(--ink-soft)]",
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
        "whitespace-nowrap border border-[var(--border)] bg-[var(--accent-whisper)] px-1.5 py-0.5 font-medium text-[var(--ink)]",
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
      className="overflow-hidden whitespace-nowrap border border-[var(--border)] bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-semibold text-white"
    >
      {children}
    </td>
  );
}
function Empty() {
  return <td className="border border-[var(--border)] px-1.5 py-0.5" />;
}
function Trail({ count = PAIRED_TRAIL }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <td key={i} className="border border-[var(--border)] px-1.5 py-0.5" />
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

// Figures from executed compute libs (golden cases per brief).
// limitedTakeHome(120k, 12570, 6000) -> netTakeHome 71820.95
// umbrellaTakeHome(120k, 1200) -> netTakeHome 69889.87
// gap = 1931.08
// personalTax(12570, 50000) -> dividendTax 8396.25, totalPersonalTax 8396.25

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // Pair 1: outside vs inside IR35 (topic ir35)
  // dayRate=500, days=240, salary=12570, expenses=6000, margin=1200
  // outside net: 71820.95, inside net: 69889.87, gap: 1931.08
  ir35: {
    layout: "paired",
    file: "outside-vs-inside-ir35-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Outside IR35 (limited company)", right: "Inside IR35 (umbrella)" },
      {
        kind: "data",
        left: { label: "Day rate", value: { text: "500", v: "blue" } },
        right: { label: "Umbrella margin/yr", value: { text: "1,200", v: "blue" } },
      },
      {
        kind: "data",
        left: { label: "Billable days", value: { text: "240", v: "blue" } },
        right: { label: "Assignment income", value: { text: "120,000", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Gross / assignment income", value: { text: "120,000", v: "num" } },
        right: { label: "Gross salary", value: { text: "103,507", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Corporation tax", value: { text: "22,828", v: "num" } },
        right: { label: "Income tax (PAYE)", value: { text: "29,536", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Dividend tax", value: { text: "18,216", v: "num" } },
        right: { label: "Employee NIC", value: { text: "4,081", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Net take-home (outside)", value: { text: "71,821", v: "numStrong" } },
        right: { label: "Net take-home (inside)", value: { text: "69,890", v: "numStrong" } },
      },
      {
        kind: "headline",
        text: "Outside IR35 keeps approx 1,931 more per year at these inputs (2026/27 rates)",
      },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Pair 2: umbrella vs limited (topic structure) -- same inputs, same primitives
  // Same golden numbers, different framing (structure choice, not status question)
  structure: {
    layout: "paired",
    file: "umbrella-vs-limited-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Limited company", right: "Umbrella" },
      {
        kind: "data",
        left: { label: "Day rate", value: { text: "500", v: "blue" } },
        right: { label: "Umbrella margin/yr", value: { text: "1,200", v: "blue" } },
      },
      {
        kind: "data",
        left: { label: "Billable days", value: { text: "240", v: "blue" } },
        right: { label: "Assignment income", value: { text: "120,000", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Salary and expenses", value: { text: "18,570", v: "blue" } },
        right: { label: "Gross salary", value: { text: "103,507", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Corporation tax", value: { text: "22,828", v: "num" } },
        right: { label: "Income tax (PAYE)", value: { text: "29,536", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Dividend and income tax", value: { text: "18,216", v: "num" } },
        right: { label: "Employee NIC", value: { text: "4,081", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Net take-home (limited)", value: { text: "71,821", v: "numStrong" } },
        right: { label: "Net take-home (umbrella)", value: { text: "69,890", v: "numStrong" } },
      },
      {
        kind: "headline",
        text: "Limited keeps approx 1,931 more but carries running costs and IR35 exposure",
      },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Pair 3: salary/dividend planner (topic pay-planning)
  // personalTax(12570, 50000) -> dividendTax 8396.25, totalPersonalTax 8396.25
  "pay-planning": {
    layout: "single",
    file: "salary-dividend-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Director salary (GBP)", value: { text: "12,570", v: "blue" } },
      { kind: "data", label: "Dividends drawn (GBP)", value: { text: "50,000", v: "blue" } },
      { kind: "head", text: "Personal tax breakdown 2026/27" },
      { kind: "data", label: "Personal allowance used", value: { text: "12,570", v: "num" } },
      { kind: "data", label: "Income tax on salary", value: { text: "0", v: "num" } },
      { kind: "data", label: "Dividend allowance", value: { text: "500", v: "num" } },
      { kind: "data", label: "Dividend tax (basic/higher/additional)", value: { text: "8,396", v: "num" } },
      { kind: "data", label: "Employee NIC", value: { text: "0", v: "num" } },
      { kind: "headline", text: "Total personal tax: 8,396 (effective rate 13.6% of dividends)" },
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
          className="whitespace-nowrap border border-[var(--accent-whisper)] bg-[var(--accent)] px-1.5 py-1 text-center text-[10px] font-semibold text-white"
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
          className="whitespace-nowrap border border-[var(--accent-whisper)] bg-[var(--accent)] px-1.5 py-1 text-center text-[10px] font-semibold text-white"
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
    <figure className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      {/* Faux app bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5">
        <span className="grid h-4 w-4 place-items-center rounded bg-[var(--accent)] text-[9px] font-bold text-white">
          X
        </span>
        <span className="text-[11px] font-medium text-[var(--ink-soft)]">{spec.file}</span>
        <span className="ml-auto rounded-full bg-[var(--accent-whisper)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] ring-1 ring-[var(--accent)]/20">
          Live formulas
        </span>
      </div>

      {/* The sheet */}
      <div className="overflow-x-auto">
        <table className="w-[640px] table-fixed border-collapse text-[10px] leading-tight">
          {spec.layout === "paired" ? <PairedColGroup /> : <SingleColGroup />}
          <thead>
            <tr className="text-[9px] text-[var(--muted)]">
              <th className="border border-[var(--border)] bg-[var(--surface-elevated)] py-0.5 font-normal" />
              {COLS.map((c) => (
                <th key={c} className="border border-[var(--border)] bg-[var(--surface-elevated)] py-0.5 font-normal">
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
      <div className="flex items-center gap-1 border-t border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-1">
        {spec.tabs.map((t) => (
          <span
            key={t}
            className={[
              "rounded px-2 py-0.5 text-[10px]",
              t === spec.activeTab
                ? "bg-white font-semibold text-[var(--accent)] shadow-sm ring-1 ring-[var(--border)]"
                : "text-[var(--muted)]",
            ].join(" ")}
          >
            {t}
          </span>
        ))}
      </div>

      <figcaption className="border-t border-[var(--border)] bg-white px-3 py-1.5 text-[10px] text-[var(--muted)]">
        {spec.caption ?? DEFAULT_CAPTION}
      </figcaption>
    </figure>
  );
}
