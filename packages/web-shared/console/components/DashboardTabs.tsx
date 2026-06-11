"use client";

/**
 * Client tab switcher for the analytics console. Receives fully
 * server-rendered section nodes and just toggles which one is visible, so
 * no data or PII crosses into the client bundle.
 *
 * The tab bar scrolls horizontally on narrow screens.
 *
 * Shared across all operator consoles. Lifted from Property with no
 * behavioural changes (Property keeps its own copy until adoption).
 */
import { useState } from "react";
import type { ReactNode } from "react";

type TabKey = "overview" | "visitors" | "experiments" | "behaviour" | "conversion";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "visitors", label: "Visitors" },
  { key: "experiments", label: "Experiments" },
  { key: "behaviour", label: "Behaviour" },
  { key: "conversion", label: "Conversion" },
];

export default function DashboardTabs({
  overview,
  visitors,
  experiments,
  behaviour,
  conversion,
}: {
  overview: ReactNode;
  visitors: ReactNode;
  experiments: ReactNode;
  behaviour: ReactNode;
  conversion: ReactNode;
}) {
  const [tab, setTab] = useState<TabKey>("overview");
  const panels: Record<TabKey, ReactNode> = {
    overview,
    visitors,
    experiments,
    behaviour,
    conversion,
  };

  return (
    <div className="mt-6">
      <div className="flex flex-nowrap items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <TabButton key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>
            {t.label}
          </TabButton>
        ))}
      </div>
      <div className="mt-6">{panels[tab]}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base = "shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 font-semibold transition-colors sm:px-4";
  const cls = active
    ? `${base} bg-white text-slate-900 shadow-sm`
    : `${base} text-slate-500 hover:text-slate-800`;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
