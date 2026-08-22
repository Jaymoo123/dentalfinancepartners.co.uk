import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { ScrollGlowGroup } from "@/components/property/ScrollGlowGroup";

export type CoverageItem = {
  title: string;
  body: string;
  /**
   * What the reader walks away holding. Optional, but worth writing where the
   * bodies describe a *subject* ("capital allowances on commercial property"):
   * a reader scanning six subjects cannot tell which of them is for them, and
   * the outcome line is the answer to "what do I get out of this one".
   */
  outcome?: string;
  icon: LucideIcon;
};

/**
 * The "what the advice covers" grid. A card per subject: emerald icon badge,
 * the subject, the detail, then the outcome pinned to the foot of the card.
 *
 * Server component — no JavaScript. The icon arrives as a `LucideIcon` value
 * rather than a name because the page rendering this is also a server
 * component; a client component would need the registry indirection instead.
 *
 * `mt-auto` on the outcome row is doing real work: bodies vary by ~40 words,
 * and without it the emerald rules land at six different heights across the
 * grid and the section stops reading as a set.
 */
export function CoverageCards({
  items,
  tone = "slate",
  columns = 2,
  glow = false,
}: {
  items: CoverageItem[];
  /** Columns from `md`. Three suits a set of three; two suits an even set. */
  columns?: 2 | 3;
  /**
   * Card surface. Must contrast with the section behind it — slate cards on a
   * white section, white cards on a slate-50 one. Getting this backwards makes
   * the cards disappear into the ground.
   */
  tone?: "slate" | "white";
  /**
   * Run the one-time staggered glow across the cards the first time the grid is
   * on screen, the same sequence /services uses on its client tiers.
   *
   * This also swaps the resting card treatment, and has to: the glow keyframes
   * animate `border-color` and finish on an emerald drop shadow, so a card
   * whose rest state is a slate ring and no shadow would animate a border it
   * does not have and then snap out of a shadow it never had. The glow variant
   * carries the same border and resting shadow as the /services tiles, which is
   * what the animation resolves to.
   *
   * Off by default, and off everywhere it is not asked for: the sequence is a
   * punctuation mark on first sight, and a page that glows in four places is
   * not punctuating anything.
   */
  glow?: boolean;
}) {
  const gridClass = `mt-8 grid gap-5 sm:mt-10 sm:gap-6 ${
    columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
  }`;

  const surface = glow
    ? `border border-emerald-100 shadow-[0_6px_20px_-8px_rgba(5,150,105,0.28)] hover:shadow-[0_16px_32px_-12px_rgba(5,150,105,0.4)] ${
        tone === "white" ? "bg-white" : "bg-slate-50"
      }`
    : `ring-1 ring-slate-200/70 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] ${
        tone === "white" ? "bg-white" : "bg-slate-50"
      }`;

  const Grid = glow ? ScrollGlowGroup : "div";

  return (
    <Grid className={gridClass}>
      {items.map((item) => (
        <div
          key={item.title}
          className={`flex flex-col rounded-xl p-6 transition-shadow duration-200 sm:p-8 ${surface}`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <item.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
          <p
            className={`mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700 ${
              item.outcome ? "mb-5" : ""
            }`}
          >
            {item.body}
          </p>
          {item.outcome && (
            <p className="mt-auto flex items-start gap-2.5 border-t border-slate-200 pt-4 text-sm font-semibold text-emerald-800">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
              <span>{item.outcome}</span>
            </p>
          )}
        </div>
      ))}
    </Grid>
  );
}
