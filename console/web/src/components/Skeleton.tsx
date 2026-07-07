"use client";

/** Pulsing grey placeholder shown while console_cache data loads. */

function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-slate-100 ${className}`} />;
}

/** Single stat card placeholder (matches SnapshotCard height). */
export function SkeletonStat() {
  return <Pulse className="h-24 w-full" />;
}

/** Row of N stat card placeholders. */
export function SkeletonStatGrid({ cols = 6 }: { cols?: number }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${
        cols === 6 ? "lg:grid-cols-6" : cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonStat key={i} />
      ))}
    </div>
  );
}

/** Chart area placeholder. */
export function SkeletonChart({ h = "h-48" }: { h?: string }) {
  return <Pulse className={`w-full ${h}`} />;
}

/** Table placeholder. */
export function SkeletonTable({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Pulse key={i} className={`h-8 w-full ${i % 3 === 2 ? "opacity-50" : ""}`} />
      ))}
    </div>
  );
}

/** Full-page dashboard skeleton shown before first data load. */
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <SkeletonStatGrid cols={6} />
      <SkeletonChart h="h-56" />
      <SkeletonStatGrid cols={6} />
      <SkeletonChart h="h-40" />
      <SkeletonTable rows={10} />
    </div>
  );
}
