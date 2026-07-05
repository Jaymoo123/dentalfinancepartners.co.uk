/**
 * A faithful, condensed preview of a category's downloadable Excel model.
 * Spreadsheet-styled mockup of the workbook's main input sheet so a visitor
 * can SEE the real thing before entering their email.
 *
 * Two layouts:
 *   - "paired": left and right blocks side by side.
 *   - "single": one wide label column + value column.
 *
 * Fixed w-[640px] grid (same in a narrow blog column or wide calculator page).
 * Headline band is orange (not Property's emerald).
 * Numbers mirror the TS compute lib defaults — never hand-typed figures.
 *
 * Property: emerald -> orange; TopicKey from the generalist taxonomy (9 topics).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import { cn } from "@/lib/utils";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
const PAIRED_TRAIL = 6;
const SINGLE_TRAIL = 9;

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

const DEFAULT_TABS = ["Start here", "Your figures", "Rates", "Notes"];
const DEFAULT_CAPTION =
  "Preview of the actual model. Edit the blue cells and every figure recalculates.";

const SPECS: Partial<Record<TopicKey, PreviewSpec>> = {
  // Asset 1: Salary and dividend take-home model (topic director-pay)
  // Figures from modelExtraction(12570, 80000, false) — lib produces 55889.87
  // gbp() rounds to nearest pound so £55,890; individual lines gbp()-rounded.
  "director-pay": {
    layout: "paired",
    file: "director-pay-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "You (salary + dividends)" },
      {
        kind: "data",
        left: { label: "Company profit before salary", value: { text: "£80,000", v: "blue" } },
        right: { label: "Director salary", value: { text: "£12,570", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Salary level", value: { text: "Optimal (£12,570)", v: "blueText" } },
        right: { label: "Dividend paid", value: { text: "£52,476", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Claim Employment Allowance", value: { text: "No", v: "blueText" } },
        right: { label: "Employer NIC", value: { text: "£1,136", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Corporation tax", value: { text: "£13,818", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Dividend tax", value: { text: "£9,157", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Total tax and NIC", value: { text: "£24,110", v: "numStrong" } },
      },
      { kind: "headline", text: "Net cash in your pocket: £55,890" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Limited-company topic uses the director-pay spec (same asset).
  "limited-company": {
    layout: "paired",
    file: "director-pay-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "You (salary + dividends)" },
      {
        kind: "data",
        left: { label: "Company profit before salary", value: { text: "£80,000", v: "blue" } },
        right: { label: "Director salary", value: { text: "£12,570", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Salary level", value: { text: "Optimal (£12,570)", v: "blueText" } },
        right: { label: "Dividend paid", value: { text: "£52,476", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Claim Employment Allowance", value: { text: "No", v: "blueText" } },
        right: { label: "Corporation tax", value: { text: "£13,818", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Dividend tax", value: { text: "£9,157", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Total tax and NIC", value: { text: "£24,110", v: "numStrong" } },
      },
      { kind: "headline", text: "Net cash in your pocket: £55,890" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 2: Incorporation comparison (topic incorporation and sole-trader)
  // Sole trader net = 57711.40; co net = 55889.87 (lib output); difference = -1821.53
  // gbp() rounds: ST £57,711, Co £55,890, cost of incorporating £1,822 approx
  incorporation: {
    layout: "paired",
    file: "incorporation-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Results" },
      {
        kind: "data",
        left: { label: "Annual profit", value: { text: "£80,000", v: "blue" } },
        right: { label: "Sole trader income tax", value: { text: "£19,432", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Claim Employment Allowance", value: { text: "No", v: "blueText" } },
        right: { label: "Class 4 NIC", value: { text: "£2,857", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Sole trader net cash", value: { text: "£57,711", v: "numStrong" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Company net cash", value: { text: "£55,890", v: "num" } },
      },
      { kind: "headline", text: "Staying a sole trader keeps £1,822 more a year on these figures" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Sole-trader topic uses the incorporation spec.
  "sole-trader": {
    layout: "paired",
    file: "incorporation-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Results" },
      {
        kind: "data",
        left: { label: "Annual profit", value: { text: "£80,000", v: "blue" } },
        right: { label: "Sole trader income tax", value: { text: "£19,432", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Claim Employment Allowance", value: { text: "No", v: "blueText" } },
        right: { label: "Class 4 NIC", value: { text: "£2,857", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Sole trader net cash", value: { text: "£57,711", v: "numStrong" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Company net cash", value: { text: "£55,890", v: "num" } },
      },
      { kind: "headline", text: "Staying a sole trader keeps £1,822 more a year on these figures" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 3: VAT scheme chooser (topic vat-mtd)
  // compareVATSchemes(100000, 2000, 500): standard wins, saving=1800
  "vat-mtd": {
    layout: "single",
    file: "vat-scheme-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "VAT-taxable turnover (ex VAT)", value: { text: "£100,000", v: "blue" } },
      { kind: "data", label: "VAT on purchases (reclaimable)", value: { text: "£2,000", v: "blue" } },
      { kind: "data", label: "Annual spend on goods", value: { text: "£500", v: "blue" } },
      { kind: "head", text: "Which scheme wins?" },
      { kind: "data", label: "Standard VAT: net payable", value: { text: "£18,000", v: "num" } },
      { kind: "data", label: "Flat Rate (limited cost, 16.5%)", value: { text: "£19,800", v: "num" } },
      { kind: "headline", text: "Standard VAT wins by £1,800 a year" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 4: Employer cost model (topic payroll)
  // calcEmployerNIFleet([{salary:30000}], true, true): NI=3750, pension=712.80, total=34462.80
  payroll: {
    layout: "single",
    file: "employer-cost-model.xlsx",
    tabs: ["Start here", "Your team", "Rates", "Notes"],
    activeTab: "Your team",
    rows: [
      { kind: "head", text: "Your team (edit the blue cells)" },
      { kind: "data", label: "Role", value: { text: "First hire", v: "blueText" } },
      { kind: "data", label: "Annual salary", value: { text: "£30,000", v: "blue" } },
      { kind: "head", text: "True cost build-up" },
      { kind: "data", label: "Gross salaries", value: { text: "£30,000", v: "num" } },
      { kind: "data", label: "Employer NIC (after allowance)", value: { text: "£3,750", v: "num" } },
      { kind: "data", label: "Employer pension (3%)", value: { text: "£713", v: "num" } },
      { kind: "headline", text: "True annual cost of your team: £34,463 (£2,872/month)" },
      { kind: "blank" },
      { kind: "blank" },
      { kind: "blank" },
    ],
  },

  // Asset 5: R&D estimator (topic rnd)
  // calcRDCredit(500000, 120000, 0, 10000, 5000): qualifying=135000, netBenefit=20250
  rnd: {
    layout: "single",
    file: "rd-relief-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", text: "Your figures (edit the blue cells)" },
      { kind: "data", label: "Total operating expenditure", value: { text: "£500,000", v: "blue" } },
      { kind: "data", label: "R&D staff costs", value: { text: "£120,000", v: "blue" } },
      { kind: "data", label: "R&D consumables", value: { text: "£10,000", v: "blue" } },
      { kind: "data", label: "R&D software", value: { text: "£5,000", v: "blue" } },
      { kind: "head", text: "Your R&D benefit" },
      { kind: "data", label: "Qualifying R&D spend", value: { text: "£135,000", v: "num" } },
      { kind: "data", label: "R&D intensity ratio", value: { text: "27.0%", v: "num" } },
      { kind: "data", label: "Estimated net benefit (merged RDEC 20%)", value: { text: "£20,250", v: "numStrong" } },
      { kind: "headline", text: "£20,250 estimated net R&D benefit (below the 30% ERIS threshold)" },
      { kind: "blank" },
    ],
  },

  // Asset 6: Exit and BADR timing model (topic exit-cgt)
  // calcBADR: gain=500000, cgt2025=70000, cgt2026=90000, extraTax=20000
  "exit-cgt": {
    layout: "paired",
    file: "badr-exit-model.xlsx",
    tabs: DEFAULT_TABS,
    activeTab: "Your figures",
    rows: [
      { kind: "head", left: "Your figures (edit the blue cells)", right: "Side by side" },
      {
        kind: "data",
        left: { label: "Sale proceeds", value: { text: "£600,000", v: "blue" } },
        right: { label: "BADR rate: before 6 Apr 2026", value: { text: "14%", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Original cost", value: { text: "£100,000", v: "blue" } },
        right: { label: "BADR rate: on/after 6 Apr 2026", value: { text: "18%", v: "num" } },
      },
      {
        kind: "data",
        left: { label: "Meets BADR conditions", value: { text: "Yes", v: "blueText" } },
        right: { label: "Total CGT (before)", value: { text: "£70,000", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Total CGT (on/after)", value: { text: "£90,000", v: "numStrong" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Net proceeds (before)", value: { text: "£530,000", v: "num" } },
      },
      {
        kind: "data",
        left: undefined,
        right: { label: "Net proceeds (on/after)", value: { text: "£510,000", v: "num" } },
      },
      { kind: "headline", text: "£20,000 more CGT if you complete on or after 6 April 2026" },
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
          className="whitespace-nowrap border border-orange-200 bg-orange-50 px-1.5 py-1 text-center text-[10px] font-semibold text-orange-800"
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
          className="whitespace-nowrap border border-orange-200 bg-orange-50 px-1.5 py-1 text-center text-[10px] font-semibold text-orange-800"
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
        <span className="grid h-4 w-4 place-items-center rounded bg-orange-600 text-[9px] font-bold text-white">
          X
        </span>
        <span className="text-[11px] font-medium text-slate-600">{spec.file}</span>
        <span className="ml-auto rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-700 ring-1 ring-orange-100">
          Live formulas
        </span>
      </div>

      {/* The sheet */}
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
                ? "bg-white font-semibold text-orange-700 shadow-sm ring-1 ring-slate-200"
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
