/**
 * Config-driven stats bar, extracted from Property's StatsBar.tsx
 * (Property stays frozen; this is a parameterised copy).
 * Self-contained styling — does not depend on Property's .stats-bar CSS.
 */
export interface StatItemConfig {
  icon: string;
  value: string;
  label: string;
}

export interface StatsBarProps {
  stats: StatItemConfig[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border border-slate-200 bg-white px-6 py-6 sm:py-8">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-2xl" aria-hidden="true">{s.icon}</div>
          <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">{s.value}</div>
          <div className="mt-0.5 text-xs sm:text-sm text-slate-600">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
