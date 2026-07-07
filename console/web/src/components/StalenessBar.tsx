"use client";

import { useEffect, useState } from "react";

type Props = {
  refreshedAt: string | null;
  loading: boolean;
};

/**
 * Shows how fresh the dashboard data is based on the cache's refreshed_at
 * timestamp. Green < 3 min, amber 3-5 min, red > 5 min (cron failing).
 * Ticks every 30s client-side so the "Xm ago" text stays current.
 */
export function StalenessBar({ refreshedAt, loading }: Props) {
  const [, tick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  if (loading && !refreshedAt) {
    return (
      <span className="text-xs text-slate-400">Loading data…</span>
    );
  }

  if (!refreshedAt) return null;

  const ageMs = Date.now() - new Date(refreshedAt).getTime();
  const ageMins = Math.floor(ageMs / 60_000);

  const label =
    ageMins < 1 ? "Updated just now" : `Updated ${ageMins}m ago`;

  const colour =
    ageMins < 3
      ? "text-emerald-600"
      : ageMins < 5
        ? "text-amber-600"
        : "text-rose-600";

  const warn = ageMins >= 5;

  return (
    <span className={`text-xs ${colour}`} title={refreshedAt}>
      {warn ? "⚠ " : ""}
      {label}
      {warn && " — cron may be down"}
    </span>
  );
}
