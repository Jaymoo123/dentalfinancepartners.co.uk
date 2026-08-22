"use client";

import { useEffect, useRef } from "react";

/**
 * The held (pre-reveal) state shared by both result gates: the reader's real
 * result, rendered but unreadable behind navy frosted glass, with the capture
 * prompt on top.
 *
 * Showing the true result rather than a placeholder is the point. The reader
 * sees the shape of their own answer, a figure, a yes/no, how long the
 * breakdown runs, without being able to read it. A fabricated number would be
 * less persuasive and dishonest once revealed. It costs nothing to put the real
 * one in the DOM: skipping the gate always reveals it anyway.
 *
 * `ground` describes what is being covered, not what this looks like. Both
 * grounds render navy; light content needs a heavier scrim to get there.
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

  // Dark panels only: strip the child's own vertical margin (Portfolio carries
  // `mt-8`, which would show as a pale band across the glass) and force the
  // surface navy, since the MTD checker colours its panel by outcome and that
  // signal means nothing until the figure is readable. Light content is a set of
  // sibling cards, so neither override applies to it.
  const panelOverrides = ground === "navy" ? "[&>*]:my-0 [&>*]:h-full [&>*]:bg-slate-900" : "";
  const scrim = ground === "navy" ? "bg-slate-900/25" : "bg-slate-900/60";

  return (
    <div className={`relative flex ${minHeightClass} flex-col overflow-hidden bg-slate-900`}>
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
        <div className="max-w-sm rounded-2xl bg-slate-900/90 p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Your result</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Your figure is ready. Confirm it with a specialist, or skip straight to the numbers.
          </p>
          <button
            type="button"
            onClick={onReveal}
            data-cta={dataCta}
            className="mt-6 inline-flex min-h-12 touch-manipulation items-center justify-center rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-bold text-white transition-colors duration-150 hover:bg-emerald-700 active:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
