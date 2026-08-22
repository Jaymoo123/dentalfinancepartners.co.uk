import { fmtGBP } from "@/lib/research/landlord-index";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * What pooling hides.
 *
 * UK residential lets net into a single property business, so the return shows
 * one profit figure and a property that lost money all year leaves no trace in
 * it. Prose cannot make that disappearance felt; an axis can. Each property
 * sits against a shared zero line, and the one below it is the argument for
 * property-level reporting.
 *
 * Illustrative figures, not a client. They exist to show the shape of the
 * problem, which is why the figure carries an example-figures note.
 *
 * Ported 2026-08-22, Phase 6.4. The only change from the designer's file is the
 * standing accessibility floor (CONTEXT.md Rule Zero (c)): their hand-rolled
 * "*Example figures displayed" line was `text-slate-400` at 11px on this card's
 * white ground, 2.63:1, and is now the shared `ExampleFigureNote`, which renders
 * the identical string at `text-slate-500`, 4.76:1.
 */

type Property = { name: string; profit: number };

const PROPERTIES: Property[] = [
  { name: "Two-bed flat, city centre", profit: 9_400 },
  { name: "Terrace, let to sharers", profit: 7_100 },
  { name: "Semi, single family let", profit: 5_200 },
  { name: "One-bed flat, high service charge", profit: 1_300 },
  { name: "Recently refinanced house", profit: -4_800 },
];

const POOLED = PROPERTIES.reduce((total, p) => total + p.profit, 0);

const MAX_GAIN = Math.max(...PROPERTIES.map((p) => p.profit));
const MAX_LOSS = Math.abs(Math.min(...PROPERTIES.map((p) => p.profit)));

/**
 * The axis sits where the two extremes balance, so a pound is the same width
 * on both sides of zero. Splitting the track 50/50 would silently plot the
 * losses on their own scale and overstate them.
 */
const LOSS_SHARE = (MAX_LOSS / (MAX_LOSS + MAX_GAIN)) * 100;

/** Emerald above the line, orange below. Validated on white: CVD ΔE 10.1,
 *  normal-vision ΔE 28.8. Side of the axis and a signed label carry the same
 *  meaning, so nothing here depends on seeing hue. */
const GAIN_FILL = "#059669";
const LOSS_FILL = "#ea580c";

const signed = (n: number) => (n < 0 ? `−${fmtGBP(Math.abs(n))}` : fmtGBP(n));

export function PortfolioPooling() {
  return (
    <figure className="not-prose rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8">
      <figcaption className="text-sm font-bold text-slate-900">
        Five properties, one property business
      </figcaption>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        Profit or loss per property for the year.
      </p>

      <div className="mt-6 space-y-4">
        {PROPERTIES.map((property) => {
          const isLoss = property.profit < 0;
          const width = isLoss
            ? (Math.abs(property.profit) / MAX_LOSS) * LOSS_SHARE
            : (property.profit / MAX_GAIN) * (100 - LOSS_SHARE);

          return (
            <div key={property.name}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold text-slate-600">{property.name}</span>
                <span className={`text-sm font-bold ${isLoss ? "text-orange-700" : "text-slate-900"}`}>
                  {signed(property.profit)}
                </span>
              </div>
              <div className="relative mt-1.5 flex h-3.5">
                <div className="flex justify-end" style={{ width: `${LOSS_SHARE}%` }}>
                  {isLoss && (
                    <div className="h-full rounded-l" style={{ width: `${(width / LOSS_SHARE) * 100}%`, backgroundColor: LOSS_FILL }} />
                  )}
                </div>
                <div style={{ width: `${100 - LOSS_SHARE}%` }}>
                  {!isLoss && (
                    <div
                      className="h-full rounded-r"
                      style={{ width: `${(width / (100 - LOSS_SHARE)) * 100}%`, backgroundColor: GAIN_FILL }}
                    />
                  )}
                </div>
                <div
                  aria-hidden
                  className="absolute inset-y-0 w-px bg-slate-300"
                  style={{ left: `${LOSS_SHARE}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{fmtGBP(POOLED)}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          The single figure the return declares. It nets the five together, so the property losing{" "}
          {fmtGBP(MAX_LOSS)} a year never appears, and nothing tells you to look.
        </p>
      </div>
      <ExampleFigureNote className="mt-4" />
    </figure>
  );
}
