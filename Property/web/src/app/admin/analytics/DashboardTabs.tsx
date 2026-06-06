"use client";

/**
 * Client tab switcher for the analytics overview. Mirrors VisitorTabs: receives
 * fully server-rendered section nodes and just toggles which one is visible, so
 * no data/PII crosses into the client bundle — only React element trees.
 */
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabKey = "overview" | "acquisition" | "behaviour" | "conversion";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "acquisition", label: "Acquisition" },
  { key: "behaviour", label: "Behaviour" },
  { key: "conversion", label: "Conversion" },
];

export default function DashboardTabs({
  overview,
  acquisition,
  behaviour,
  conversion,
}: {
  overview: ReactNode;
  acquisition: ReactNode;
  behaviour: ReactNode;
  conversion: ReactNode;
}) {
  const [tab, setTab] = useState<TabKey>("overview");
  const panels: Record<TabKey, ReactNode> = {
    overview,
    acquisition,
    behaviour,
    conversion,
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm">
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
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-4 py-1.5 font-semibold transition-colors",
        active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800",
      )}
    >
      {children}
    </button>
  );
}
