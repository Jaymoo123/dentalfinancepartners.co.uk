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
 * Headline band: navy background with gold accent strip (Dentists token idiom).
 * Numbers mirror the TS compute lib defaults from the golden test cases.
 *
 * TOKEN HARDENING: no var(--gold), no orange-*, no emerald-*.
 * Uses Dentists-defined tokens: --navy, --gold, --gold-soft, --gold-strong,
 * --surface, --surface-elevated, --border, --ink, --ink-soft, --muted.
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
      className="overflow-hidden whitespace-nowrap border border-[var(--border)] bg-[var(--navy)] px-1.5 py-0.5 text-[10px] font-semibold text-white"
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

// Figures from executed compute libs (golden cases per brief §4.1).
// gbp(n) = Math.round(n) formatted; pct(n,1) = one decimal.

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // Asset 1: Associate take-home model (topic associate)
  // calcAssociateTakeHome(120000, 50, 8, 3000, 0) -> netCash 41408, totalTax 10792
  // incomeTax 8312, class4 2300.6 -> ~2301, class2 179.4 -> total rounded
  associate: {
    layout: "single",
    file: "associate-model.xlsx",
    tabs: ["Start here", "Your figures", "Structure comparison", "Rates", "Notes"],
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Gross fees you generate a year", value: { text: "£120,000", v: "blue" } },
      { kind: "data", label: "Your fee split", value: { text: "50%", v: "blue" } },
      { kind: "data", label: "Lab fees (% of gross)", value: { text: "8%", v: "blue" } },
      { kind: "head", text: "Your take-home" },
      { kind: "data", label: "Taxable profit", value: { text: "£52,200", v: "num" } },
      { kind: "data", label: "Income tax", value: { text: "£8,312", v: "num" } },
      { kind: "data", label: "Class 4 and Class 2 NIC", value: { text: "£2,480", v: "num" } },
      { kind: "headline", text: "Estimated take-home: £41,408 (effective rate 20.7%)" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 2: Principal profit extraction model (topic principal)
  // calcPrincipalExtraction(120000, true, 0)
  // partnership.net 76732, partnership.tax 43268, ltd.net 72279
  principal: {
    layout: "paired",
    file: "principal-extraction-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Comparison" },
      {
        kind: "data",
        left: { label: "Practice profit", value: { text: "£120,000", v: "blue" } },
        right: { label: "Net cash (partnership)", value: { text: "£76,732", v: "numStrong" } },
      },
      {
        kind: "data",
        left: { label: "Active NHS Pension member", value: { text: "Yes", v: "blueText" } },
        right: { label: "Total tax (partnership)", value: { text: "£43,268", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Net cash (limited company)", value: { text: "£72,279", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Total tax and admin (Ltd)", value: { text: "£47,721", v: "num" } },
      },
      { kind: "headline", text: "Sole trader or partnership keeps £4,210 more, and preserves NHS Pension accrual" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 3: Practice purchase model (topic buying)
  // calcPracticeValuation(200000,"mixed","midlands","normal",60000)
  // goodwill 170000 to 230000, total 230000 to 290000, mid 260000
  // calcAffordability({purchasePrice:260000,depositPct:20,interestRate:8,termYears:15,ebitda:200000})
  // deposit=52000, loan=208000
  buying: {
    layout: "single",
    file: "practice-purchase-model.xlsx",
    tabs: ["Start here", "Your figures", "Affordability", "Rates", "Notes"],
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Normalised EBITDA", value: { text: "£200,000", v: "blue" } },
      { kind: "data", label: "Practice mix", value: { text: "Mixed", v: "blueText" } },
      { kind: "data", label: "Region", value: { text: "Midlands", v: "blueText" } },
      { kind: "head", text: "Indicative value" },
      { kind: "data", label: "Goodwill range", value: { text: "£170,000 to £230,000", v: "num" } },
      { kind: "data", label: "Total value range", value: { text: "£230,000 to £290,000", v: "num" } },
      { kind: "data", label: "Deposit (20%) · loan", value: { text: "£52,000 · £208,000", v: "num" } },
      { kind: "headline", text: "Indicative total value £260,000, goodwill 0.85x to 1.15x EBITDA" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 4: Practice sale model (topic selling)
  // calcPracticeValuation(200000,"mixed","midlands","normal",60000) -> total 230k to 290k
  // calcPracticeSaleCgt({gain:200000,otherIncome:50000,badrEligible:true,aeaAvailable:3000})
  // taxableGain 197000, totalCgt 35460, netProceeds 164540
  selling: {
    layout: "paired",
    file: "practice-sale-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Net of tax" },
      {
        kind: "data",
        left: { label: "EBITDA", value: { text: "£200,000", v: "blue" } },
        right: { label: "Taxable gain", value: { text: "£197,000", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Chargeable gain", value: { text: "£200,000", v: "blue" } },
        right: { label: "BADR at 18%", value: { text: "£35,460", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "BADR expected", value: { text: "Yes", v: "blueText" } },
        right: { label: "Net proceeds", value: { text: "£164,540", v: "numStrong" } },
      },
      { kind: "headline", text: "£164,540 kept after Capital Gains Tax at the 18% BADR rate" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 5: UDA value model (topic nhs and uda-calc)
  // calcUdaValue("england", 12000, 336000, 2019)
  // effectiveUda=28, yearsSince=7, cumulativeCpi ~0.18869, realValue ~23.56
  nhs: {
    layout: "single",
    file: "uda-value-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Region", value: { text: "England", v: "blueText" } },
      { kind: "data", label: "Annual UDA target", value: { text: "12,000", v: "blue" } },
      { kind: "data", label: "Annual contract value", value: { text: "£336,000", v: "blue" } },
      { kind: "head", text: "Your UDA value" },
      { kind: "data", label: "Effective UDA value", value: { text: "£28.00", v: "numStrong" } },
      { kind: "data", label: "Regional benchmark", value: { text: "£25 to £35 (within)", v: "num" } },
      { kind: "data", label: "Real value today (2026 pounds)", value: { text: "£23.56", v: "num" } },
      { kind: "headline", text: "£28.00 per UDA, within the £25 to £35 England benchmark" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  "uda-calc": {
    // Alias: same spec as nhs.
    layout: "single",
    file: "uda-value-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Region", value: { text: "England", v: "blueText" } },
      { kind: "data", label: "Annual UDA target", value: { text: "12,000", v: "blue" } },
      { kind: "data", label: "Annual contract value", value: { text: "£336,000", v: "blue" } },
      { kind: "head", text: "Your UDA value" },
      { kind: "data", label: "Effective UDA value", value: { text: "£28.00", v: "numStrong" } },
      { kind: "data", label: "Regional benchmark", value: { text: "£25 to £35 (within)", v: "num" } },
      { kind: "data", label: "Real value today (2026 pounds)", value: { text: "£23.56", v: "num" } },
      { kind: "headline", text: "£28.00 per UDA, within the £25 to £35 England benchmark" },
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
          className="whitespace-nowrap border border-[var(--gold-soft)] bg-[var(--navy)] px-1.5 py-1 text-center text-[10px] font-semibold text-[var(--gold)]"
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
          className="whitespace-nowrap border border-[var(--gold-soft)] bg-[var(--navy)] px-1.5 py-1 text-center text-[10px] font-semibold text-[var(--gold)]"
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
        <span className="grid h-4 w-4 place-items-center rounded bg-[var(--navy)] text-[9px] font-bold text-[var(--gold)]">
          X
        </span>
        <span className="text-[11px] font-medium text-[var(--ink-soft)]">{spec.file}</span>
        <span className="ml-auto rounded-full bg-[var(--gold-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--navy)] ring-1 ring-[var(--gold)]/20">
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
                ? "bg-white font-semibold text-[var(--navy)] shadow-sm ring-1 ring-[var(--border)]"
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
