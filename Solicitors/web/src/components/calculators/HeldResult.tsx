"use client";

import { useEffect, useRef } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";

/**
 * The held (pre-reveal) state shared by every result gate on this site: the
 * reader's real result, rendered but unreadable behind navy frosted glass, with
 * the capture prompt on top. Ported from generalist/Property; emerald swapped
 * for the brand ramp.
 *
 * Showing the true result rather than a placeholder is the point. The reader
 * sees the shape of their own answer, a figure, a yes/no, how long the
 * breakdown runs, without being able to read it. A fabricated number would be
 * less persuasive and dishonest once revealed. It costs nothing to put the real
 * one in the DOM: skipping the gate always reveals it anyway.
 *
 * `ground` describes what is being covered, not what this looks like. Both
 * grounds render navy; light content needs a heavier scrim to get there.
 *
 * `blurb` and `buttonLabel` are props, not constants, because law-firm-sale-cgt
 * already ships a gated pre-reveal state with its own live wording; the hard
 * rule of 2026-09-11 forbids rewriting it, so that surface passes its existing
 * strings straight through.
 */
export function HeldResult({
  children,
  onReveal,
  ground = "navy",
  contentClassName = "",
  minHeightClass = "min-h-[320px]",
  blurb = "Your figure is ready. Confirm it with an accountant, or skip straight to the numbers.",
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
  blurb?: string;
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

  // Dark panels only: strip the child's own vertical margin (it would show as a
  // pale band across the glass) and force the surface navy, since a panel that
  // colours itself by outcome signals nothing until the figure is readable.
  // Light content is a set of sibling cards, so neither override applies.
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
        <div className="max-w-sm rounded-xl bg-slate-900/90 p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
          {/* primary-400 (rose-400), not the brand hex: #c41e3a on slate-900
              measures 3.11 and this is 12px text, which owes 4.5:1. 6.74. */}
          <p className="text-xs font-bold uppercase tracking-wider text-primary-400">Your result</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{blurb}</p>
          <button
            type="button"
            onClick={onReveal}
            data-cta={dataCta}
            className={`${btnPrimary} mt-6 w-full`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
