import { fmtGBP } from "@/lib/research/landlord-index";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The Section 24 wedge, drawn once.
 *
 * The finance cost restriction is hard to feel in prose because the damage is a
 * gap between two numbers that never appear side by side: the profit the
 * landlord banks, and the larger profit HMRC taxes. So we put them on one
 * scale, stacked, with the added-back interest as its own segment. The reader
 * sees the phantom slice before reading a word about it.
 *
 * Figures match the worked example on /section-24 so the two pages cannot
 * drift. Change them in both places or not at all.
 *
 * Ported 2026-08-22, Phase 6.4. The only change from the designer's file is the
 * standing accessibility floor (CONTEXT.md Rule Zero (c)): their hand-rolled
 * "*Example figures displayed" line was `text-slate-400` at 11px on this card's
 * white ground, 2.63:1, and is now the shared `ExampleFigureNote`, which renders
 * the identical string at `text-slate-500`, 4.76:1. Their own `RateWedge`,
 * `RentalProfitStack` and `PenaltyLadder` already import that component; this
 * one and `PortfolioPooling` are the two that inlined it.
 */

const RENT = 50_000;
const COSTS = 8_000;
const INTEREST = 18_000;

const KEPT = RENT - COSTS - INTEREST; // 24,000 — the cash that actually lands
const TAXED = RENT - COSTS; // 42,000 — the profit the return declares
const ANNUAL_COST = INTEREST * 0.2; // 3,600 — the 40% charge less the 20% credit

const pct = (n: number) => `${(n / TAXED) * 100}%`;

/** Emerald reads as money kept, orange as the phantom slice. Validated as a
 *  categorical pair on white: CVD ΔE 10.1, normal-vision ΔE 28.8, both above
 *  gate. Every value is direct-labelled, so identity never rests on hue. */
const KEPT_FILL = "#059669";
const PHANTOM_FILL = "#ea580c";

export function Section24Wedge() {
  return (
    <figure className="not-prose rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8">
      <figcaption className="text-sm font-bold text-slate-900">
        One landlord, one year
      </figcaption>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        {fmtGBP(RENT)} of rent, {fmtGBP(COSTS)} of running costs, {fmtGBP(INTEREST)} of mortgage interest.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold text-slate-600">Profit you actually bank</span>
            <span className="text-sm font-bold text-slate-900">{fmtGBP(KEPT)}</span>
          </div>
          <div className="mt-2 h-4">
            <div
              className="h-full rounded-r"
              style={{ width: pct(KEPT), backgroundColor: KEPT_FILL }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold text-slate-600">Profit HMRC taxes you on</span>
            <span className="text-sm font-bold text-slate-900">{fmtGBP(TAXED)}</span>
          </div>
          <div className="mt-2 flex h-4 gap-0.5">
            <div style={{ width: pct(KEPT), backgroundColor: KEPT_FILL }} />
            <div
              className="rounded-r"
              style={{ width: pct(INTEREST), backgroundColor: PHANTOM_FILL }}
            />
          </div>
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <span
              aria-hidden
              className="inline-block h-2 w-2 shrink-0 rounded-sm"
              style={{ backgroundColor: PHANTOM_FILL }}
            />
            {fmtGBP(INTEREST)} of interest you paid, added back
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{fmtGBP(ANNUAL_COST)}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          A year, on identical cash flows. Taxed at 40% on that slice, relieved at 20%. From April 2027 the
          rates become 42% and 22%, so the wedge is unchanged.
        </p>
      </div>
      <ExampleFigureNote className="mt-4" />
    </figure>
  );
}
