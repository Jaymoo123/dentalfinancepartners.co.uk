/**
 * A faithful, condensed preview of a category's downloadable Excel model.
 *
 * A spreadsheet-styled mockup of the workbook's main input sheet so a visitor
 * can SEE the real thing before giving an email. No hooks / no data fetching,
 * so it is safe in any (client or server) tree. Styled with CSS-variable tokens.
 *
 * Every figure mirrors the model's DEFAULT scenario, computed with the SAME
 * pure compute libs the workbook formulas use, so the preview and the downloaded
 * file can never disagree.
 *
 * The Solicitors brand primary is crimson (#c41e3a), argb: FFC41E3A.
 * Preview accent uses a muted crimson-tinted highlight for headline rows,
 * consistent with the site token system.
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
      className="overflow-hidden whitespace-nowrap border border-[var(--border)] bg-[var(--ink)] px-1.5 py-0.5 text-[10px] font-semibold text-white"
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

/* --- the specs (one per category, numbers from the compute libs) ----------- */

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // R-1 SRA: default 150 moderate conveyancing -> peak=1,200,000; reserve=30,000; low=21,000; high=45,000
  "sra-compliance": {
    layout: "single",
    file: "sra-compliance-model.xlsx",
    tabs: ["Start here", "Reconciliation", "Reserve sizing", "Rule 12.2 check", "Notes"],
    activeTab: "Reserve sizing",
    rows: [
      { kind: "head", text: "Reserve sizing (edit the blue cells)" },
      { kind: "data", label: "Open matters", value: { text: "150", v: "blue" } },
      { kind: "data", label: "Transaction volume", value: { text: "Moderate", v: "blueText" } },
      { kind: "data", label: "Matter type", value: { text: "Conveyancing", v: "blueText" } },
      { kind: "head", text: "Operational reserve estimate" },
      { kind: "data", label: "Peak client money (estimate)", value: { text: "£1,200,000", v: "num" } },
      { kind: "data", label: "Suggested reserve (central)", value: { text: "£30,000", v: "numStrong" } },
      { kind: "data", label: "Low scenario", value: { text: "£21,000", v: "num" } },
      { kind: "data", label: "High scenario", value: { text: "£45,000", v: "num" } },
      { kind: "headline", text: "Not SRA-mandated: sized by the firm's COFA and accountant" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // R-2 partner model: default 800,000 two-tier 3 senior / 2 junior
  // senior share = 800000/6.5*1.5 = 184,615; senior partnership.net = 109,758
  "partnership-llp": {
    layout: "paired",
    file: "partnership-llp-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)" },
      { kind: "data", left: { label: "Total distributable profit", value: { text: "£800,000", v: "blue" } } },
      { kind: "data", left: { label: "Allocation method", value: { text: "Two-tier (senior 1.5x)", v: "blueText" } } },
      { kind: "data", left: { label: "Senior partners", value: { text: "3", v: "blue" } } },
      { kind: "data", left: { label: "Junior partners", value: { text: "2", v: "blue" } } },
      { kind: "head", left: "Senior partner 1", right: "Junior partner 1" },
      {
        kind: "data",
        left: { label: "Profit share", value: { text: "£184,615", v: "num" } },
        right: { label: "Profit share", value: { text: "£123,077", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Take-home (after IT + NI)", value: { text: "£109,758", v: "numStrong" } },
        right: { label: "Take-home (after IT + NI)", value: { text: "£77,607", v: "num" } },
      },
      { kind: "headline", text: "2026/27 basis: income tax + Class 4 NI on your profit share" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // R-3 practice sale: default profit=400000 partnership-llp midlands normal
  // goodwillLow=400000*1.0=400000; goodwillHigh=400000*2.0=800000
  // total low=400000+120000+40000=560000; total high=800000+120000+40000=960000
  // CGT on goodwillHigh: gain=800000; taxable=797000; BADR 18% = 143460; net=656540
  "succession-sale": {
    layout: "paired",
    file: "succession-sale-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)" },
      { kind: "data", left: { label: "Annual profit", value: { text: "£400,000", v: "blue" } } },
      { kind: "data", left: { label: "Firm type", value: { text: "Partnership / LLP", v: "blueText" } } },
      { kind: "data", left: { label: "Region", value: { text: "Midlands", v: "blueText" } } },
      { kind: "head", left: "Valuation range", right: "Net of CGT (high)" },
      {
        kind: "data",
        left: { label: "Goodwill (indicative low)", value: { text: "£400,000", v: "num" } },
        right: { label: "Goodwill gain", value: { text: "£800,000", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Total value (high)", value: { text: "£960,000", v: "numStrong" } },
        right: { label: "CGT at 18% BADR", value: { text: "£143,460", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "", value: { text: "", v: "num" } },
        right: { label: "Net proceeds", value: { text: "£656,540", v: "numStrong" } },
      },
      { kind: "headline", text: "WIP on sale is income tax, separate from the capital gain" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // R-4 take-home: default profit=120000 pension=0
  // partnership.net=76,668; ltd.net=72,279
  "sole-practitioner": {
    layout: "paired",
    file: "sole-practitioner-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)" },
      { kind: "data", left: { label: "Annual profit / income", value: { text: "£120,000", v: "blue" } } },
      { kind: "data", left: { label: "Pension contribution", value: { text: "£0", v: "blue" } } },
      { kind: "blank" },
      { kind: "head", left: "Sole practitioner / partner", right: "Limited company" },
      {
        kind: "data",
        left: { label: "Income tax + Class 4 NI", value: { text: "£43,332", v: "num" } },
        right: { label: "Corp tax + dividend tax", value: { text: "£47,721", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Take-home", value: { text: "£76,668", v: "numStrong" } },
        right: { label: "Take-home", value: { text: "£72,279", v: "numStrong" } },
      },
      { kind: "headline", text: "2026/27: sole practitioner / partner ahead on these figures" },
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
        <Empty /><Empty /><Empty /><Empty /><Empty />
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
          className="whitespace-nowrap border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-1.5 py-1 text-center text-[10px] font-semibold text-[var(--primary-dark)]"
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
        <><Empty /><Empty /></>
      )}
      <Empty />
      {row.right ? (
        <>
          <Label>{row.right.label}</Label>
          <ValueCell value={row.right.value} />
        </>
      ) : (
        <><Empty /><Empty /></>
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
        <Empty /><Empty />
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
          className="whitespace-nowrap border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-1.5 py-1 text-center text-[10px] font-semibold text-[var(--primary-dark)]"
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
        <span className="grid h-4 w-4 place-items-center rounded bg-[var(--primary)] text-[9px] font-bold text-white">
          X
        </span>
        <span className="text-[11px] font-medium text-[var(--ink-soft)]">{spec.file}</span>
        <span className="ml-auto rounded-full bg-[var(--primary)]/5 px-2 py-0.5 text-[10px] font-medium text-[var(--primary)] ring-1 ring-[var(--primary)]/15">
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
                ? "bg-white font-semibold text-[var(--primary)] shadow-sm ring-1 ring-[var(--border)]"
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
