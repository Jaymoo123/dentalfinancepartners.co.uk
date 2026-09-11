"use client";

/**
 * Tab switcher for the calculator fleet. Shows ONE calculator at a time behind
 * a labelled tab bar, so a page can offer several tools without stacking them.
 * Ported from `Property/web/src/components/calculators/CalculatorTabs.tsx`
 * (WAI-ARIA tablist, roving tabindex, Arrow/Home/End, hash deep link, literal
 * column map) via `generalist/web/src/components/tools/CalculatorTabs.tsx`,
 * with this site's brand ramp and its own tab set.
 *
 * Deep links work: `#clientreserve`, `#takehome` etc. select the tab.
 *
 * Every tab renders the registry tool through `CalculatorClient` by slug, so
 * there is never a second copy of a calculator, and the page gate comes with
 * `variant="page"` for free. Generalist's bespoke `employerni` exception has no
 * equivalent here.
 *
 * Tab LABELS are the registry `name`, not authored copy: the hard rule of
 * 2026-09-11 forbids writing new visible strings, so no `sub` line is carried.
 *
 * Tabs render buttons, not anchors, so a page using this component must ALSO
 * carry a literal in-body link to a specific /calculators/<slug> page. That is
 * the `calculator-tabs-crawl-path` guard, and it is a source scan.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Banknote, Building2, Landmark, PieChart, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getGenericTool } from "@/lib/tools/registry";

const loading = () => (
  <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10 animate-pulse">
    <div className="h-96 rounded bg-slate-100" />
  </div>
);

const CalculatorClient = dynamic(
  () => import("./CalculatorClient").then((m) => ({ default: m.CalculatorClient })),
  { loading },
);

export type TabKey =
  | "clientreserve"
  | "salariedmember"
  | "takehome"
  | "valuation"
  | "profitshare";

/** Tab key -> registry slug. Every slug verified against its config file. */
export const TAB_SLUGS: Record<TabKey, string> = {
  clientreserve: "sra-client-account-reserve",
  salariedmember: "fa-2014-salaried-member",
  takehome: "partnership-vs-llp-take-home",
  valuation: "law-firm-valuation",
  profitshare: "llp-profit-share-allocation",
};

const TAB_ICONS: Record<TabKey, LucideIcon> = {
  clientreserve: ShieldCheck,
  salariedmember: Landmark,
  takehome: Banknote,
  valuation: Building2,
  profitshare: PieChart,
};

/**
 * The five the /calculators index leads with. Every listed panel mounts and
 * downloads its calculator, so five is the ceiling: do not pad this list.
 */
export const INDEX_HEADLINE_TABS: TabKey[] = [
  "clientreserve",
  "salariedmember",
  "takehome",
  "valuation",
  "profitshare",
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

export function CalculatorTabs({ tabs = INDEX_HEADLINE_TABS }: { tabs?: TabKey[] } = {}) {
  const shown = tabs
    .filter((key) => Boolean(getGenericTool(TAB_SLUGS[key])))
    .map((key) => ({
      key,
      icon: TAB_ICONS[key],
      label: getGenericTool(TAB_SLUGS[key])!.name,
    }));
  const [active, setActive] = useState<TabKey>(shown[0]?.key ?? "clientreserve");
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
      if (tabs.some((key) => key === hash)) setActive(hash as TabKey);
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
        aria-label="Law firm calculators"
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
              className={`relative flex min-h-12 items-center gap-3 rounded-xl border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:p-4 ${
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
              <span
                className={`min-w-0 text-sm font-bold sm:text-base ${
                  selected ? "text-white" : "text-slate-900"
                }`}
              >
                {tab.label}
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
            <CalculatorClient slug={TAB_SLUGS[tab.key]} variant="page" />
          </div>
        ))}
      </div>
    </div>
  );
}
