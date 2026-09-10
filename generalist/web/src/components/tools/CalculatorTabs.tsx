"use client";

/**
 * Tab switcher for the calculator fleet. Shows ONE calculator at a time behind
 * a labelled tab bar, so a page can offer several tools without stacking them.
 * Ported from Property's `components/calculators/CalculatorTabs.tsx`
 * (WAI-ARIA tablist, roving tabindex, hash deep link, literal column map),
 * with generalist's brand ramp and its own tab set.
 *
 * Deep links work: `#salarydividend`, `#employerni` etc. select the tab.
 *
 * Tabs render buttons, not anchors, so a page using this component must ALSO
 * carry a literal in-body link to a specific /calculators/<slug> page. That is
 * the `calculator-tabs-crawl-path` guard, and it is a source scan.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  Banknote,
  Building2,
  Coins,
  FlaskConical,
  PiggyBank,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const loading = () => (
  <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10 animate-pulse">
    <div className="h-96 rounded bg-slate-100" />
  </div>
);

/**
 * Every generic tab renders the registry tool through `CalculatorClient` by
 * slug — never a second copy of a calculator. To add a tab: add a key, a TABS
 * row and a `TAB_SLUGS` entry, and nothing else.
 */
const CalculatorClient = dynamic(
  () => import("./CalculatorClient").then((m) => ({ default: m.CalculatorClient })),
  { loading },
);

/**
 * `employerni` is the one exception. Per the G1 decision the BESPOKE
 * multi-employee component is canonical (the registry config exists only to
 * keep /embed/employer-ni-calculator alive), so the tab mounts it rather than
 * the generic copy.
 */
const EmployerNICalculator = dynamic(
  () =>
    import("@/components/calculators/EmployerNICalculator").then((m) => ({
      default: m.EmployerNICalculator,
    })),
  { loading },
);

export type TabKey =
  | "salarydividend"
  | "takehome"
  | "employerni"
  | "soletradervsltd"
  | "vatthreshold"
  | "rdcredit"
  | "dividendtax"
  | "pension"
  | "badr";

/** Tab key -> registry slug. `employerni` is rendered bespoke, see above. */
export const TAB_SLUGS: Record<TabKey, string> = {
  salarydividend: "salary-dividend-optimiser",
  takehome: "take-home-pay-calculator",
  employerni: "employer-ni-calculator",
  soletradervsltd: "sole-trader-vs-ltd",
  vatthreshold: "vat-threshold-checker",
  rdcredit: "rd-tax-credit-estimator",
  dividendtax: "dividend-tax-2026-27",
  pension: "pension-contribution-optimiser",
  badr: "badr-cgt-calculator",
};

const TABS: { key: TabKey; label: string; sub: string; icon: LucideIcon }[] = [
  { key: "salarydividend", label: "Salary & Dividend", sub: "The efficient mix", icon: Coins },
  { key: "takehome", label: "Take-Home Pay", sub: "Gross in, net out", icon: Wallet },
  { key: "employerni", label: "Employer NI", sub: "What a hire really costs", icon: Users },
  { key: "soletradervsltd", label: "Sole Trader vs Ltd", sub: "Worth incorporating?", icon: Building2 },
  { key: "vatthreshold", label: "VAT Threshold", sub: "Do you have to register?", icon: Receipt },
  { key: "rdcredit", label: "R&D Tax Credit", sub: "Indicative claim value", icon: FlaskConical },
  { key: "dividendtax", label: "Dividend Tax", sub: "Tax on a year of dividends", icon: Banknote },
  { key: "pension", label: "Pension Optimiser", sub: "Real cost to the company", icon: PiggyBank },
  { key: "badr", label: "BADR CGT", sub: "Tax on the exit", icon: TrendingUp },
];

/** The five the /calculators index leads with. Every panel mounts, so 5 is the ceiling. */
export const INDEX_HEADLINE_TABS: TabKey[] = [
  "soletradervsltd",
  "salarydividend",
  "employerni",
  "vatthreshold",
  "badr",
];

/** The four the homepage leads with. */
export const HOME_TABS: TabKey[] = [
  "salarydividend",
  "takehome",
  "employerni",
  "soletradervsltd",
];

/**
 * Tab bar columns, written out in full because Tailwind scans for literal
 * class names: a template string like `lg:grid-cols-${n}` compiles to nothing.
 */
const TABLIST_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 lg:grid-cols-5",
};

export function CalculatorTabs({ tabs = HOME_TABS }: { tabs?: TabKey[] } = {}) {
  const shown = TABS.filter((tab) => tabs.includes(tab.key)).sort(
    (a, b) => tabs.indexOf(a.key) - tabs.indexOf(b.key),
  );
  const [active, setActive] = useState<TabKey>(shown[0]?.key ?? "salarydividend");
  const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});

  /**
   * Roving tabindex: only the selected tab is in the tab order and the arrow
   * keys move between tabs, per the WAI-ARIA tabs pattern. Both axes are bound
   * because the bar wraps to a grid below `lg`.
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
        aria-label="Free UK business tax calculators"
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
              className={`relative flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all sm:p-4 ${
                selected
                  ? "border-primary-600 bg-primary-600 shadow-md"
                  : "border-slate-200 bg-white hover:border-primary-400 hover:shadow-sm"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${
                  selected
                    ? "bg-white/20 text-white"
                    : "bg-primary-50 text-primary-700 ring-1 ring-primary-100"
                }`}
              >
                <tab.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-sm font-bold sm:text-base ${selected ? "text-white" : "text-slate-900"}`}
                >
                  {tab.label}
                </span>
                <span
                  className={`block text-[0.7rem] sm:text-xs ${selected ? "text-primary-50" : "text-slate-500"}`}
                >
                  {tab.sub}
                </span>
              </span>
              {selected ? (
                <span
                  aria-hidden
                  className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[2px] bg-primary-600"
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
            {tab.key === "employerni" ? (
              <EmployerNICalculator gateCampaign="employer-ni-calculator" />
            ) : (
              <CalculatorClient slug={TAB_SLUGS[tab.key]} variant="page" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
