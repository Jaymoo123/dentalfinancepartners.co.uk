/**
 * A faithful, condensed preview of a topic's downloadable Excel model.
 * Spreadsheet-styled mockup of the workbook's main input sheet so a visitor
 * can SEE the real thing before entering their email.
 *
 * Two layouts:
 *   - "paired": left and right blocks side by side (incorporation).
 *   - "single": one wide label column + value column (nhs-pension, locum).
 *
 * Fixed w-[640px] grid (same in a narrow blog column or wide calculator page).
 * Headline band: navy background with copper accent strip (Medical token idiom).
 * Numbers mirror the TS compute lib defaults from the golden test cases (section 4.1).
 *
 * TOKEN HARDENING: no var(--primary), no orange-*, no emerald-*.
 * Uses Medical CSS-variable tokens: --navy, --copper, --copper-soft, --copper-strong,
 * --surface, --surface-elevated, --border, --ink, --ink-soft, --muted.
 *
 * gbp(n) = "£" + Math.round(n).toLocaleString("en-GB")
 * All figures are the WORKBOOK DEFAULT outputs executed from the compute libs.
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

// Figures from executed compute libs (golden cases per brief section 4.1).
// gbp(n) = Math.round(n) formatted en-GB; pct(n,1) = one decimal.
//
// NHS pension default: calcNHSPension({thresholdIncome:150000, pensionGrowth:40000, taxBand:"higher"})
//   adjustedIncome=190000, NOT tapered, allowance=60000, excess=0, taxCharge=0
//
// Locum default: calcLocumTax({grossIncome:80000, expenses:5000, pensionContributions:10000, studentLoanPlan:"none"})
//   netIncome=65000, incomeTax=13432, nationalInsurance=2556.6, totalDeductions=15988.6, netTakeHome=49011.4
//
// Incorporation default (INC-A): calcIncorporation({privateIncome:100000, expenses:15000, desiredSalary:12570, nhsIncome:50000})
//   soleTraderTotalTax=44881.6, corporationTax=21250, dividendTax=18118.1, limitedCompanyTotalTax=46854.1, taxSavings=-1972.5

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // Asset 1: NHS Pension annual allowance model (topic nhs-pension)
  // Default: thresholdIncome=150000, pensionGrowth=40000, higher -> charge=0
  "nhs-pension": {
    layout: "single",
    file: "nhs-pension-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Threshold income", value: { text: "£150,000", v: "blue" } },
      { kind: "data", label: "NHS pension input amount (growth this year)", value: { text: "£40,000", v: "blue" } },
      { kind: "data", label: "Marginal income tax rate", value: { text: "Higher rate 40%", v: "blueText" } },
      { kind: "head", text: "Your annual allowance position" },
      { kind: "data", label: "Annual allowance (tapered or standard)", value: { text: "£60,000 (standard)", v: "numStrong" } },
      { kind: "data", label: "Adjusted income", value: { text: "£190,000", v: "num" } },
      { kind: "data", label: "Excess over allowance", value: { text: "£0", v: "num" } },
      { kind: "headline", text: "Estimated annual allowance charge: £0 (within the standard £60,000 allowance)" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 2: Doctor take-home model (topic locum and gp-tax alias)
  // Default: grossIncome=80000, expenses=5000, pension=10000, none
  // netIncome=65000, incomeTax=13432, class4=2557 (rounded), totalDeductions=15989 (rounded), takeHome=49011
  locum: {
    layout: "single",
    file: "doctor-take-home-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Gross fees / income for the year", value: { text: "£80,000", v: "blue" } },
      { kind: "data", label: "Allowable business expenses", value: { text: "£5,000", v: "blue" } },
      { kind: "data", label: "Personal pension contributions", value: { text: "£10,000", v: "blue" } },
      { kind: "head", text: "Your take-home" },
      { kind: "data", label: "Net income after expenses and pension", value: { text: "£65,000", v: "num" } },
      { kind: "data", label: "Income tax", value: { text: "£13,432", v: "num" } },
      { kind: "data", label: "Class 4 National Insurance", value: { text: "£2,557", v: "num" } },
      { kind: "data", label: "Total deductions", value: { text: "£15,989", v: "num" } },
      { kind: "headline", text: "Estimated take-home: £49,011 (effective deduction rate 24.6%)" },
      { kind: "blank" },
    ],
  },

  // Asset 3: Private practice incorporation model (topic incorporation-private)
  // Default (INC-A): privateIncome=100000, expenses=15000, salary=12570, nhs=50000
  // soleTraderTotalTax=44882, corporationTax=21250, dividendTax=18118, limitedCompanyTotalTax=46854
  // taxSavings=-1972.5 -> incorporating costs ~1973 more
  "incorporation-private": {
    layout: "paired",
    file: "incorporation-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Comparison" },
      {
        kind: "data",
        left: { label: "Private practice income", value: { text: "£100,000", v: "blue" } },
        right: { label: "Sole trader total tax and NIC", value: { text: "£44,882", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Your NHS (PAYE) income", value: { text: "£50,000", v: "blue" } },
        right: { label: "Corporation tax", value: { text: "£21,250", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Director salary", value: { text: "£12,570", v: "blue" } },
        right: { label: "Dividend tax", value: { text: "£18,118", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Ltd co total tax", value: { text: "£46,854", v: "num" } },
      },
      { kind: "headline", text: "Incorporating costs about £1,973 more here (£164 a month), and gives up NHS pension accrual on the dividends" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // gp-tax aliases the locum spec (same resource, different entry point).
  "gp-tax": {
    layout: "single",
    file: "doctor-take-home-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Gross fees / income for the year", value: { text: "£80,000", v: "blue" } },
      { kind: "data", label: "Allowable business expenses", value: { text: "£5,000", v: "blue" } },
      { kind: "data", label: "Personal pension contributions", value: { text: "£10,000", v: "blue" } },
      { kind: "head", text: "Your take-home" },
      { kind: "data", label: "Net income after expenses and pension", value: { text: "£65,000", v: "num" } },
      { kind: "data", label: "Income tax", value: { text: "£13,432", v: "num" } },
      { kind: "data", label: "Class 4 National Insurance", value: { text: "£2,557", v: "num" } },
      { kind: "data", label: "Total deductions", value: { text: "£15,989", v: "num" } },
      { kind: "headline", text: "Estimated take-home: £49,011 (effective deduction rate 24.6%)" },
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
          className="whitespace-nowrap border border-[var(--copper-soft)] bg-[var(--navy)] px-1.5 py-1 text-center text-[10px] font-semibold text-[var(--copper)]"
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
          className="whitespace-nowrap border border-[var(--copper-soft)] bg-[var(--navy)] px-1.5 py-1 text-center text-[10px] font-semibold text-[var(--copper)]"
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
        <span className="grid h-4 w-4 place-items-center rounded bg-[var(--navy)] text-[9px] font-bold text-[var(--copper)]">
          X
        </span>
        <span className="text-[11px] font-medium text-[var(--ink-soft)]">{spec.file}</span>
        <span className="ml-auto rounded-full bg-[var(--copper-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--navy)] ring-1 ring-[var(--copper)]/20">
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
