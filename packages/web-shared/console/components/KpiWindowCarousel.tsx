"use client";

/**
 * Mobile-first KPI window pager for the per-site Overview.
 *
 * Receives fully server-rendered card-grid nodes (one per time window) and lets
 * the operator swipe between them on touch, or use the segmented control /
 * arrows / dots on desktop. Only already-rendered RSC nodes cross the boundary,
 * so no data or PII enters the client bundle — same contract as DashboardTabs.
 *
 * Zero dependencies: native CSS scroll-snap (Tailwind v4) drives the swipe; a
 * little state tracks the active page for the indicator.
 */
import { useRef, useState } from "react";
import type { ReactNode } from "react";

export type KpiPage = {
  key: string;
  label: string;
  node: ReactNode;
  /** Precise range shown under the tabs for the active page, e.g. "Last 7 days". */
  meta?: string;
};

export default function KpiWindowCarousel({
  pages,
  caption,
}: {
  pages: KpiPage[];
  caption?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(pages.length - 1, i));
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
    setActive(idx);
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <div>
      {/* Window selector + desktop arrows */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-nowrap items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pages.map((p, i) => {
            const isActive = i === active;
            const base =
              "shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 font-medium transition-colors";
            const cls = isActive
              ? `${base} bg-white text-slate-900 shadow-sm`
              : `${base} text-slate-500 hover:text-slate-800`;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => goTo(i)}
                className={cls}
                aria-current={isActive ? "true" : undefined}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <ArrowButton dir="prev" disabled={active === 0} onClick={() => goTo(active - 1)} />
          <ArrowButton
            dir="next"
            disabled={active === pages.length - 1}
            onClick={() => goTo(active + 1)}
          />
        </div>
      </div>

      {/* Active window's precise range */}
      {pages[active]?.meta && (
        <p className="mb-2 text-xs text-slate-400">{pages[active].meta}</p>
      )}

      {/* Swipeable pages */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((p) => (
          <div key={p.key} className="w-full shrink-0 snap-start">
            {p.node}
          </div>
        ))}
      </div>

      {/* Position dots + caption */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {pages.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${p.label}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-slate-700" : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
        {caption && <p className="text-right text-xs text-slate-400">{caption}</p>}
      </div>
    </div>
  );
}

function ArrowButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous window" : "Next window"}
      className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {dir === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
}
