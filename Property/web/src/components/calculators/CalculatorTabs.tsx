"use client";

/**
 * Homepage "Free tools" tab switcher. Shows ONE calculator at a time behind a
 * labelled tab bar, replacing the old 4-deep vertical stack. Deep links still
 * work: #section24 / #incorporation / #mtd / #portfolio select the matching tab
 * (the MTD countdown banner links to #mtd).
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  BarChart3,
  Briefcase,
  Building2,
  CalendarClock,
  Landmark,
  Percent,
  PiggyBank,
  Receipt,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const loading = () => (
  <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10 animate-pulse">
    <div className="h-96 bg-slate-100 rounded" />
  </div>
);

const Section24Calculator = dynamic(
  () => import("./Section24Calculator").then((m) => ({ default: m.Section24Calculator })),
  { loading },
);
const IncorporationCostCalculator = dynamic(
  () => import("./IncorporationCostCalculator").then((m) => ({ default: m.IncorporationCostCalculator })),
  { loading },
);
const MTDCheckerCalculator = dynamic(
  () => import("./MTDCheckerCalculator").then((m) => ({ default: m.MTDCheckerCalculator })),
  { loading },
);
const PortfolioProfitabilityCalculator = dynamic(
  () => import("./PortfolioProfitabilityCalculator").then((m) => ({ default: m.PortfolioProfitabilityCalculator })),
  { loading },
);
const StampDutyCalculator = dynamic(
  () => import("./StampDutyCalculator").then((m) => ({ default: m.StampDutyCalculator })),
  { loading },
);
/**
 * The five above are bespoke components. `bprapr` is the first tab backed by a
 * GENERIC registry tool instead, rendered through `CalculatorClient` by slug.
 * That is the route to follow for any future registry tool a page wants to
 * offer as a tab: add a key, a TABS row and a line in the panel switch, and do
 * not write a second copy of the calculator.
 */
const CalculatorClient = dynamic(
  () => import("./CalculatorClient").then((m) => ({ default: m.CalculatorClient })),
  { loading },
);

export type TabKey =
  | "section24"
  | "incorporation"
  | "mtd"
  | "portfolio"
  | "stampduty"
  | "bprapr"
  | "costofselling"
  | "rentalyield"
  | "rentalincome";

const TABS: { key: TabKey; label: string; sub: string; icon: LucideIcon }[] = [
  { key: "section24", label: "Section 24 Calculator", sub: "Your extra tax bill", icon: BarChart3 },
  { key: "incorporation", label: "Incorporation Calculator", sub: "Worth moving to a company?", icon: Building2 },
  { key: "mtd", label: "MTD Checker", sub: "Are you in scope?", icon: CalendarClock },
  { key: "portfolio", label: "Portfolio Calculator", sub: "Property-by-property profit", icon: Briefcase },
  { key: "stampduty", label: "Stamp Duty Calculator", sub: "Including the surcharge", icon: Receipt },
  { key: "bprapr", label: "Allowance Calculator", sub: "Your £2.5m BPR and APR position", icon: Landmark },
  { key: "costofselling", label: "Cost of Selling Calculator", sub: "Your full selling bill", icon: Wallet },
  { key: "rentalyield", label: "Rental Yield Calculator", sub: "Gross and net on a property", icon: Percent },
  { key: "rentalincome", label: "Rental Income Tax Calculator", sub: "Tax on a year of rent", icon: PiggyBank },
];

const DEFAULT_TABS: TabKey[] = ["section24", "incorporation", "mtd", "portfolio"];

/**
 * Tab bar columns, keyed to how many tabs there actually are. Written out in
 * full because Tailwind scans for literal class names — a template string like
 * `lg:grid-cols-${n}` compiles to nothing.
 *
 * The bar used to be a fixed `lg:grid-cols-4`, which left a hole in the row for
 * any page passing three, and wrapped a fifth tab on to a line of its own.
 */
const TABLIST_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 lg:grid-cols-5",
};

/**
 * `tabs` lets a page choose which calculators it offers, in its own order. It
 * defaults to the original four so the homepage and the property-accountant
 * page are untouched. Only the selected panels are mounted, so an unused
 * calculator is never even downloaded.
 */
export function CalculatorTabs({ tabs = DEFAULT_TABS }: { tabs?: TabKey[] } = {}) {
  const shown = TABS.filter((tab) => tabs.includes(tab.key)).sort(
    (a, b) => tabs.indexOf(a.key) - tabs.indexOf(b.key),
  );
  const [active, setActive] = useState<TabKey>(shown[0]?.key ?? "section24");
  const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});

  /**
   * Roving tabindex: only the selected tab is in the tab order, and the arrow
   * keys move between tabs, per the WAI-ARIA tabs pattern. Both axes are bound
   * because the tab bar wraps to a grid below `lg`, so "next" is visually to
   * the right on one row and downwards across rows.
   */
  const moveFocus = (from: TabKey, delta: number) => {
    const index = shown.findIndex((t) => t.key === from);
    if (index === -1) return;
    const next = shown[(index + delta + shown.length) % shown.length];
    setActive(next.key);
    tabRefs.current[next.key]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, key: TabKey) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        moveFocus(key, 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        moveFocus(key, -1);
        break;
      case "Home":
        event.preventDefault();
        setActive(shown[0].key);
        tabRefs.current[shown[0].key]?.focus();
        break;
      case "End": {
        event.preventDefault();
        const last = shown[shown.length - 1].key;
        setActive(last);
        tabRefs.current[last]?.focus();
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (shown.some((t) => t.key === hash)) setActive(hash as TabKey);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.join(",")]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Free property tax calculators"
        className={`grid gap-2 sm:gap-3 ${TABLIST_COLUMNS[shown.length] ?? "grid-cols-2 lg:grid-cols-4"}`}
      >
        {shown.map((tab) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              ref={(node) => {
                tabRefs.current[tab.key] = node;
              }}
              id={`calc-tab-${tab.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`calc-panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => onTabKeyDown(event, tab.key)}
              onClick={() => setActive(tab.key)}
              className={`relative flex items-center gap-3 rounded-xl border-2 p-3 sm:p-4 text-left transition-all ${
                selected
                  ? "border-emerald-600 bg-emerald-600 shadow-md"
                  : "border-slate-200 bg-white hover:border-emerald-400 hover:shadow-sm"
              }`}
            >
              <span
                className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  selected ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                }`}
              >
                <tab.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className={`block text-sm sm:text-base font-bold ${selected ? "text-white" : "text-slate-900"}`}>
                  {tab.label}
                </span>
                <span className={`block text-[0.7rem] sm:text-xs ${selected ? "text-emerald-100" : "text-slate-500"}`}>
                  {tab.sub}
                </span>
              </span>
              {selected ? (
                <span
                  aria-hidden
                  className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[2px] bg-emerald-600"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-6 sm:mt-8">
        {shown.map((tab) => (
          <div
            key={tab.key}
            id={`calc-panel-${tab.key}`}
            role="tabpanel"
            aria-labelledby={`calc-tab-${tab.key}`}
            hidden={active !== tab.key}
          >
            {tab.key === "section24" && <Section24Calculator />}
            {tab.key === "incorporation" && <IncorporationCostCalculator />}
            {tab.key === "mtd" && <MTDCheckerCalculator />}
            {tab.key === "portfolio" && <PortfolioProfitabilityCalculator />}
            {tab.key === "stampduty" && <StampDutyCalculator />}
            {tab.key === "bprapr" && (
              <CalculatorClient slug="bpr-apr-allowance-calculator" variant="page" />
            )}
            {tab.key === "costofselling" && (
              <CalculatorClient slug="cost-of-selling-calculator" variant="page" />
            )}
            {tab.key === "rentalyield" && (
              <CalculatorClient slug="rental-yield-calculator" variant="page" />
            )}
            {tab.key === "rentalincome" && (
              <CalculatorClient slug="rental-income-tax-calculator" variant="page" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
