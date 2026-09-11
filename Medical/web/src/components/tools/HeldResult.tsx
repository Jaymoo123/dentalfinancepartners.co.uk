"use client";

import { useEffect, useRef } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";

/**
 * The held (pre-reveal) state shared by both calculator tiers: the reader's REAL
 * result, rendered but unreadable behind frosted glass, with the capture prompt
 * on top.
 *
 * Showing the true result rather than a placeholder is the point. The reader
 * sees the shape of their own answer (a figure, a yes/no, how long the breakdown
 * runs) without being able to read it. A fabricated number would be less
 * persuasive and dishonest once revealed, and it costs nothing to put the real
 * one in the DOM: skipping the gate always reveals it anyway.
 *
 * `ground` describes what is being covered, not what this looks like. The
 * generic fleet's result column is already dark (shared Calculator renders
 * bg-slate-900); the premium result panel is a light surface and needs a heavier
 * scrim to reach the same ground.
 */
export function HeldResult({
  children,
  onReveal,
  ground = "navy",
  contentClassName = "",
  minHeightClass = "min-h-[320px]",
  buttonLabel = "See my result",
  dataCta,
}: {
  /** The real result panel. */
  children: React.ReactNode;
  onReveal: () => void;
  /** "navy" when the result panel is already dark, "light" for light cards. */
  ground?: "navy" | "light";
  /** Padding/spacing the content needs, when it does not bring its own. */
  contentClassName?: string;
  minHeightClass?: string;
  buttonLabel?: string;
  /** Set where the press is captured by the analytics delegate, not by a hook. */
  dataCta?: string;
}) {
  const heldRef = useRef<HTMLDivElement>(null);

  // Set imperatively rather than as a JSX prop so this does not depend on the
  // React version's typing of `inert`. Nothing inside the held result should be
  // reachable by tab, pointer or screen reader while it is blurred.
  useEffect(() => {
    heldRef.current?.setAttribute("inert", "");
  });

  // Dark panels only: strip the child's own vertical margin and force the
  // surface navy, so an outcome-coloured panel does not leak a signal that means
  // nothing until the figure is readable.
  const panelOverrides =
    ground === "navy" ? "[&>*]:my-0 [&>*]:h-full [&>*]:bg-[var(--navy)]" : "";
  const scrim = ground === "navy" ? "bg-[var(--navy)]/25" : "bg-[var(--navy)]/60";

  return (
    <div
      className={`relative flex ${minHeightClass} flex-col overflow-hidden bg-[var(--navy)]`}
    >
      <div
        ref={heldRef}
        aria-hidden="true"
        className={`flex-1 select-none blur-[10px] saturate-125 scale-[1.03] ${contentClassName} ${panelOverrides}`}
      >
        {children}
      </div>

      {/* Glass sheen, so the panel reads as frosted rather than out of focus. */}
      <div className={`absolute inset-0 ${scrim} backdrop-blur-[3px]`} aria-hidden="true" />

      {/* The prompt keeps its own solid ground: over a blurred backdrop that
          differs per calculator, contrast is otherwise unpredictable. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center sm:p-6">
        <div className="max-w-sm rounded-2xl bg-[var(--navy)]/90 p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
            Your result
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Your figure is ready. Have a specialist medical accountant confirm it, or skip
            straight to the number.
          </p>
          <button
            type="button"
            onClick={onReveal}
            data-cta={dataCta}
            className={`${btnPrimary} mt-6`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
