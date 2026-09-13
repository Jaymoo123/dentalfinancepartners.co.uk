"use client";

/**
 * Tab switcher for the calculator fleet: one tool at a time behind a labelled
 * tab bar, so /calculators can offer "run one now" without stacking three
 * calculators down the page. WAI-ARIA tabs pattern (roving tabindex, arrow /
 * Home / End keys), with the tool slug as a deep-link hash.
 *
 * Driven straight off the registry, so adding a fourth tool adds a fourth tab
 * with no edit here.
 *
 * ponytail: every panel mounts (three tools, three small configs), so there is
 * no dynamic import and no loading skeleton. If the fleet grows past ~6 tools,
 * swap CalculatorClient for a next/dynamic import the way generalist does.
 *
 * Tabs render BUTTONS, not links, so the page using this component must also
 * carry literal /calculators/<slug> anchors as the crawl path. The card grid
 * on /calculators is that path.
 */
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { CalculatorClient } from "./CalculatorClient";

export type CalculatorTab = { slug: string; label: string; sub: string };

/** Literal column classes: Tailwind scans for literals, `lg:grid-cols-${n}` compiles to nothing. */
const TABLIST_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function CalculatorTabs({ tabs }: { tabs: CalculatorTab[] }) {
  const [active, setActive] = useState<string>(tabs[0]?.slug ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const moveFocus = (from: string, delta: number) => {
    const i = tabs.findIndex((t) => t.slug === from);
    if (i === -1) return;
    const next = tabs[(i + delta + tabs.length) % tabs.length];
    setActive(next.slug);
    tabRefs.current[next.slug]?.focus();
  };

  const focusAt = (index: number) => {
    const t = tabs[index];
    if (!t) return;
    setActive(t.slug);
    tabRefs.current[t.slug]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, slug: string) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        moveFocus(slug, 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        moveFocus(slug, -1);
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        break;
      case "End":
        event.preventDefault();
        focusAt(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  const slugKey = tabs.map((t) => t.slug).join(",");
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && slugKey.split(",").includes(hash)) setActive(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [slugKey]);

  if (tabs.length === 0) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Charity finance calculators"
        className={`grid gap-2 sm:gap-3 ${TABLIST_COLUMNS[tabs.length] ?? "grid-cols-1 sm:grid-cols-3"}`}
      >
        {tabs.map((tab) => {
          const selected = tab.slug === active;
          return (
            <button
              key={tab.slug}
              ref={(node) => {
                tabRefs.current[tab.slug] = node;
              }}
              id={`calc-tab-${tab.slug}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`calc-panel-${tab.slug}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => onKeyDown(event, tab.slug)}
              onClick={() => setActive(tab.slug)}
              className={`flex min-h-12 flex-col justify-center border-2 p-3 text-left transition-colors sm:p-4 ${
                selected
                  ? "border-primary-600 bg-primary-600"
                  : "border-slate-200 bg-white hover:border-primary-600"
              }`}
            >
              <span
                className={`block text-sm font-bold sm:text-base ${
                  selected ? "text-white" : "text-slate-900"
                }`}
              >
                {tab.label}
              </span>
              {/* primary-50 on primary-600 measures 7.45, slate-600 on white 7.58. */}
              <span
                className={`mt-0.5 block text-xs ${selected ? "text-primary-50" : "text-slate-600"}`}
              >
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 sm:mt-8">
        {tabs.map((tab) => (
          <div
            key={tab.slug}
            id={`calc-panel-${tab.slug}`}
            role="tabpanel"
            aria-labelledby={`calc-tab-${tab.slug}`}
            hidden={tab.slug !== active}
          >
            <CalculatorClient slug={tab.slug} variant="page" />
          </div>
        ))}
      </div>
    </div>
  );
}
