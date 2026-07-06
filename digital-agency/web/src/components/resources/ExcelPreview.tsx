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
 * Headline band: indigo background with white text (aff token idiom).
 * Numbers mirror the TS compute lib defaults from the golden test cases.
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--dark), no var(--primary).
 * Uses indigo/slate tokens: --accent, --ink, --ink-soft, --surface-elevated, --border, --muted.
 * Header background uses var(--accent) (#4f46e5 indigo).
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
        "whitespace-nowrap border border-[var(--border)] bg-blue-50 px-1.5 py-0.5 font-medium text-[var(--ink)]",
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

// Figures from executed compute libs (golden cases per brief section 2).
// Defaults: profitBeforeDirector 120000, salary 12570, no EA.
// calcSalaryDividend: netCash 74779.37, dividend 81876.46, corporationTax 24418.04
// calcBadrCgt: 2026/27 BADR totalTax 126000, net proceeds 624000
// calcVatScheme: standardNet 28000, LCT 16.5%, bestScheme Standard, saving 7640

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // Pair 1: Salary and dividend planner (topic pay-planning)
  // Default: profitBeforeDirector 120000, salary 12570, no EA
  // => netCash 74779.37, dividend 81876.46, corporationTax 24418.04, dividendTax 19667.08
  "pay-planning": {
    layout: "single",
    file: "salary-dividend-model.xlsx",
    tabs: ["Start here", "Your figures", "Rates", "Notes"],
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Profit before director cost", value: { text: "£120,000", v: "blue" } },
      { kind: "data", label: "Director salary", value: { text: "£12,570", v: "blue" } },
      { kind: "data", label: "Use Employment Allowance?", value: { text: "No", v: "blueText" } },
      { kind: "head", text: "Your extraction breakdown (2026/27)" },
      { kind: "data", label: "Employer NI", value: { text: "£1,136", v: "num" } },
      { kind: "data", label: "Corporation tax", value: { text: "£24,418", v: "num" } },
      { kind: "data", label: "Dividend tax", value: { text: "£19,667", v: "num" } },
      { kind: "headline", text: "Net cash: £74,779 (total tax £45,221)" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Pair 2: Agency exit and BADR model (topic exit)
  // Default: saleProceeds 750000, originalCost 50000, 2026/27, BADR eligible
  // => BADR totalTax 126000, netProceeds 624000; standard totalTax 168000, net 582000
  "exit": {
    layout: "paired",
    file: "agency-exit-cgt-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Tax comparison" },
      {
        kind: "data",
        left: { label: "Sale proceeds", value: { text: "£750,000", v: "blue" } },
        right: { label: "Net proceeds (with BADR)", value: { text: "£624,000", v: "numStrong" } },
      },
      {
        kind: "data",
        left: { label: "Original cost", value: { text: "£50,000", v: "blue" } },
        right: { label: "CGT at 18% BADR rate", value: { text: "£126,000", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Year", value: { text: "2026/27", v: "blueText" } },
        right: { label: "Net proceeds (standard CGT)", value: { text: "£582,000", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Standard CGT at 24%", value: { text: "£168,000", v: "num" } },
      },
      { kind: "headline", text: "BADR saves £42,000 on this gain (18% vs 24%)" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Pair 3: VAT scheme comparison model (topic compliance-vat)
  // Default: turnover 180000, vatInputs 8000, goodsSpend 500
  // => standardNet 28000, LCT 16.5%, flatPayment 35640, bestScheme Standard, saving 7640
  "compliance-vat": {
    layout: "single",
    file: "vat-scheme-model.xlsx",
    tabs: ["Start here", "Your figures", "Rates", "Notes"],
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Turnover (ex-VAT)", value: { text: "£180,000", v: "blue" } },
      { kind: "data", label: "Input VAT claimable", value: { text: "£8,000", v: "blue" } },
      { kind: "data", label: "Annual goods spend", value: { text: "£500", v: "blue" } },
      { kind: "head", text: "VAT comparison" },
      { kind: "data", label: "Standard scheme net to HMRC", value: { text: "£28,000", v: "numStrong" } },
      { kind: "data", label: "Limited-cost trader?", value: { text: "Yes (16.5% rate)", v: "num" } },
      { kind: "data", label: "Flat Rate payment", value: { text: "£35,640", v: "num" } },
      { kind: "headline", text: "Best scheme: Standard (saves £7,640 vs Flat Rate)" },
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
          className="whitespace-nowrap border border-indigo-100 bg-[var(--accent)] px-1.5 py-1 text-center text-[10px] font-semibold text-white"
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
          className="whitespace-nowrap border border-indigo-100 bg-[var(--accent)] px-1.5 py-1 text-center text-[10px] font-semibold text-white"
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
        <span className="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] ring-1 ring-[var(--accent)]/20">
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
