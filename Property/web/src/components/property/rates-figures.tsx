import { AlertTriangle, Check, Minus } from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The figures for /property-tax-rates.
 *
 * NOTHING HERE IS A NEW FACT and, unusually for a figures file, nothing here is
 * even a new NUMBER: the band arrays below are the single source the page's own
 * `RateTable` rows are built from, so the table and the figure beside it cannot
 * disagree. That is the "derive, never type" rule taken one step further than
 * `SdltMarketValue` takes it, and it is the right step on a page whose entire
 * value is that its figures are citable.
 *
 * WHAT THE FIGURES ADD, given the tables were already there. A rate table is a
 * lookup and it is good at that. What it cannot show is the one thing every
 * property tax page gets asked about, which is HOW the rate is applied:
 *
 *   - the main bands are MARGINAL, charged only on the slice inside each band;
 *   - the surcharges are not, and land on the whole price;
 *   - corporation tax has a middle zone whose effective rate is HIGHER than its
 *     top rate;
 *   - the MTD threshold falls in steps rather than sitting still.
 *
 * Each of those is a shape, and prose beside a table has been failing to carry
 * it. None of them is a new claim: all four are already in the page's copy.
 *
 * All server components, no JavaScript.
 */

/* ------------------------------------------------------------------- bands */

export type Band = {
  /** Lower bound in pounds. */
  from: number;
  /** Upper bound in pounds, or null for the open-ended top band. */
  to: number | null;
  /** Main residential rate, as a percentage. */
  rate: number;
  /** Rate with the additional-dwelling surcharge, where the page prints one. */
  additional?: number;
};

export const SDLT_BANDS: Band[] = [
  { from: 0, to: 125_000, rate: 0, additional: 5 },
  { from: 125_000, to: 250_000, rate: 2, additional: 7 },
  { from: 250_000, to: 925_000, rate: 5, additional: 10 },
  { from: 925_000, to: 1_500_000, rate: 10, additional: 15 },
  { from: 1_500_000, to: null, rate: 12, additional: 17 },
];

export const LBTT_BANDS: Band[] = [
  { from: 0, to: 145_000, rate: 0 },
  { from: 145_000, to: 250_000, rate: 2 },
  { from: 250_000, to: 325_000, rate: 5 },
  { from: 325_000, to: 750_000, rate: 10 },
  { from: 750_000, to: null, rate: 12 },
];

export const LTT_BANDS: Band[] = [
  { from: 0, to: 225_000, rate: 0 },
  { from: 225_000, to: 400_000, rate: 6 },
  { from: 400_000, to: 750_000, rate: 7.5 },
  { from: 750_000, to: 1_500_000, rate: 10 },
  { from: 1_500_000, to: null, rate: 12 },
];

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

/** The band range exactly as the tables print it, from one source. */
export function bandLabel(b: Band): string {
  if (b.from === 0) return `Up to ${gbp(b.to as number)}`;
  if (b.to === null) return `Above ${gbp(b.from)}`;
  return `${gbp(b.from + 1)} to ${gbp(b.to)}`;
}

/**
 * Width of the open-ended top band, as a share of the drawn axis.
 *
 * The top band has no upper bound, so it cannot be drawn to scale. It is given a
 * fixed slice and a faded right edge, which says "and onwards" without implying
 * a ceiling the law does not have.
 */
const OPEN_BAND_SHARE = 0.18;

function widths(bands: Band[]): number[] {
  const capped = bands.filter((b) => b.to !== null);
  const span = (capped[capped.length - 1].to as number) - capped[0].from;
  const openWidth = span * (OPEN_BAND_SHARE / (1 - OPEN_BAND_SHARE));
  const total = span + openWidth;
  return bands.map((b) => ((b.to === null ? openWidth : b.to - b.from) / total) * 100);
}

/**
 * Rate intensity. Colour is meaning: the ramp runs from "nothing to pay" to
 * "the top slice", and it is measured on the SAME emerald and amber scale the
 * rest of the site uses for money kept and money that bites.
 */
function rateTone(rate: number, max: number): string {
  if (rate === 0) return "bg-emerald-500";
  const share = rate / max;
  if (share < 0.4) return "bg-emerald-600";
  if (share < 0.7) return "bg-amber-400";
  if (share < 0.9) return "bg-amber-500";
  return "bg-amber-600";
}

/**
 * The bands drawn along a price axis, plus whatever lands on the whole price.
 *
 * This is the figure the whole page needed. Every table on it lists a rate per
 * band, and the single most misunderstood thing about all three taxes is that
 * those rates are MARGINAL: they are charged on the slice of the price inside
 * each band and never on the whole of it. The page says so once, in a sentence,
 * above the first table. Drawn as segments of one price axis, each labelled with
 * its own rate, the reader cannot read it any other way.
 *
 * `wholePrice` is the counterweight and the reason this component takes it at
 * all. A surcharge behaves the OPPOSITE way, landing on the entire price rather
 * than a slice, and drawing it as one unbroken bar underneath the segmented one
 * is the clearest statement of that difference available. Where a page has no
 * such charge, pass nothing and the bar does not render.
 *
 * The segments are `aria-hidden` because every band and rate is direct-labelled
 * in the legend beneath, which is also the table view for a screen reader.
 */
export function BandLadder({
  bands,
  axisLabel,
  wholePrice,
  notes,
}: {
  bands: Band[];
  /** What the axis measures, named so the bar is never a bare abstraction. */
  axisLabel: string;
  /** A charge that lands on the whole price rather than on a slice. */
  wholePrice?: { rate: string; label: string; detail: string };
  /** Neutral "this does not exist here" lines. Dashes, never crosses. */
  notes?: string[];
}) {
  const w = widths(bands);
  const max = Math.max(...bands.map((b) => b.rate));

  return (
    <div className="mt-6">
      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900">
          Each rate applies only to the slice of {axisLabel} inside its band
        </h3>

        <div aria-hidden className="mt-4 flex h-6 w-full overflow-hidden rounded-full bg-slate-200">
          {bands.map((b, i) => (
            <span
              key={b.from}
              className={`${rateTone(b.rate, max)} ${b.to === null ? "opacity-90" : ""}`}
              style={{ width: `${w[i]}%` }}
            />
          ))}
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
          {bands.map((b) => (
            <li key={b.from} className="flex items-baseline gap-2.5 text-sm">
              <span
                aria-hidden
                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${rateTone(b.rate, max)}`}
              />
              <span className="flex-1 text-slate-700">{bandLabel(b)}</span>
              <span className="font-bold tabular-nums text-slate-900">{b.rate}%</span>
              {b.additional !== undefined ? (
                <span className="w-14 text-right tabular-nums text-amber-800">{b.additional}%</span>
              ) : null}
            </li>
          ))}
        </ul>
        {bands.some((b) => b.additional !== undefined) ? (
          <p className="mt-2 text-right text-xs font-semibold uppercase tracking-wide text-amber-800">
            Right column: with the surcharge
          </p>
        ) : null}

        {wholePrice ? (
          <div className="mt-6 border-t border-slate-200 pt-5">
            <h3 className="text-sm font-bold text-slate-900">
              This one does not work that way. It lands on the whole price.
            </h3>
            <div aria-hidden className="mt-3 h-6 w-full rounded-full bg-amber-500" />
            <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-bold tabular-nums text-amber-800 sm:text-3xl">
                {wholePrice.rate}
              </span>
              <span className="text-sm font-bold text-slate-900">{wholePrice.label}</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{wholePrice.detail}</p>
          </div>
        ) : null}

        {notes && notes.length > 0 ? (
          <ul className="mt-5 space-y-1.5 border-t border-slate-200 pt-5">
            {notes.map((n) => (
              <li key={n} className="flex items-baseline gap-2.5 text-sm text-slate-600">
                <Minus aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={3} />
                {n}
              </li>
            ))}
          </ul>
        ) : null}

        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- CGT */

const AEA = 3_000;
const CGT_BASIC = 18;
const CGT_HIGHER = 24;

/**
 * The gain, in the order it is actually taxed.
 *
 * The CGT table lists four rows and the reader has to assemble the sequence
 * themselves: take the gain, take the allowance off it first, then split what is
 * left across two rates depending on how much basic-rate band is unused. That
 * order is the whole answer to "what will I pay", and a four-row table states
 * every part of it while showing none of it.
 *
 * No worked example, because the page publishes none and this must not invent
 * one. What is drawn is the SEQUENCE, with the allowance as a slice that never
 * reaches a rate at all.
 */
export function CgtOrder() {
  return (
    <div className="mt-6">
      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900">The order it happens in</h3>

        <ol className="mt-4 space-y-3">
          <li className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">First</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
              <span className="text-xl font-bold tabular-nums text-slate-900">
                £{AEA.toLocaleString("en-GB")}
              </span>
              <span className="text-sm font-bold text-slate-900">comes off the gain and is not taxed</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              The annual exempt amount. It is used before any rate is applied.
            </p>
          </li>
          <li className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-4 ring-1 ring-emerald-100">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Then, the lower slice</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-800">{CGT_BASIC}%</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                On whatever fits inside your unused basic-rate band.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 ring-1 ring-amber-200">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800">And the rest</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-amber-800">{CGT_HIGHER}%</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                On everything above that band. Most landlords meet both rates on one sale.
              </p>
            </div>
          </li>
        </ol>

        <p className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
          <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" strokeWidth={2.5} />
          <span>
            <strong className="font-bold">60 days from completion</strong> to report and pay, which is the only
            deadline on this page and the only figure here with a penalty attached. It runs from completion, not
            from the end of the tax year.
          </span>
        </p>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- company rates */

const CT_SMALL = 19;
const CT_MARGINAL = 26.5;
const CT_MAIN = 25;

const CT_ZONES = [
  {
    band: "Up to £50,000",
    rate: `${CT_SMALL}%`,
    note: "The small profits rate.",
    tone: "emerald" as const,
    share: 20,
  },
  {
    band: "£50,000 to £250,000",
    rate: `about ${CT_MARGINAL}%`,
    note: "Marginal relief. The effective rate on this slice is HIGHER than the main rate above it.",
    tone: "amber" as const,
    share: 45,
  },
  {
    band: "£250,000 and above",
    rate: `${CT_MAIN}%`,
    note: "The main rate.",
    tone: "slate" as const,
    share: 35,
  },
];

const CT_TONES = {
  emerald: { bar: "bg-emerald-600", text: "text-emerald-800", ring: "ring-emerald-100" },
  amber: { bar: "bg-amber-500", text: "text-amber-800", ring: "ring-amber-200" },
  slate: { bar: "bg-slate-500", text: "text-slate-900", ring: "ring-slate-200" },
};

/**
 * The three corporation tax zones, drawn so the middle one is visibly the odd
 * one out.
 *
 * The table gives 19%, 25% and "about 26.5%" as three rows in a list, and a
 * reader scanning a list assumes a rate that sits between two others belongs
 * between them. It does not: the marginal band's effective rate is higher than
 * the rate above it, which is the single most counterintuitive number on the
 * page and the reason a landlord's incorporation arithmetic goes wrong.
 *
 * The widths are illustrative weighting and say so, because the top band is open
 * ended and cannot be drawn to scale. Every rate is direct-labelled.
 */
export function CorporationZones() {
  return (
    <div className="mt-6">
      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900">
          The middle band is the one to look at, and it is not between the other two
        </h3>

        <div aria-hidden className="mt-4 flex h-6 w-full overflow-hidden rounded-full bg-slate-200">
          {CT_ZONES.map((z) => (
            <span key={z.band} className={CT_TONES[z.tone].bar} style={{ width: `${z.share}%` }} />
          ))}
        </div>

        <ul className="mt-4 space-y-3">
          {CT_ZONES.map((z) => (
            <li key={z.band} className={`rounded-xl bg-white p-4 ring-1 ${CT_TONES[z.tone].ring}`}>
              <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <span className="text-sm font-bold text-slate-900">{z.band}</span>
                <span className={`text-xl font-bold tabular-nums ${CT_TONES[z.tone].text}`}>{z.rate}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{z.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Bar widths are illustrative weighting, not a scale. The top band is open ended.
        </p>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- MTD */

const MTD_STEPS = [
  { when: "From April 2026", threshold: "£50,000", note: "In force. Gross property and self-employment income." },
  { when: "From April 2027", threshold: "£30,000", note: "The step most landlords are caught by." },
  { when: "From April 2028", threshold: "£20,000", note: "The floor as it currently stands." },
];

const ALLOWANCES = [
  { figure: "£1,000", label: "Property allowance", note: "Against gross rent, instead of actual costs." },
  { figure: "£7,500", label: "Rent-a-room relief", note: "£3,750 where the income is shared." },
];

/**
 * The MTD threshold as a descending staircase.
 *
 * As two table rows it is a pair of static facts. It is not static: it is one
 * threshold falling in three steps, and a landlord who is out of scope today is
 * being told the date they come into scope. A rail carries that and a table
 * cannot, and this is the only figure on the page whose subject is time.
 *
 * The allowances sit beside it because they are the other half of the same
 * section and they are genuinely static, which the contrast makes obvious.
 */
export function MtdStaircase() {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-5">
      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900">The threshold does not sit still</h3>
        <ol className="relative mt-5 space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
          {MTD_STEPS.map((s, i) => (
            <li key={s.when} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full ring-4 ring-slate-50 sm:-left-[39px] ${
                  i === 0 ? "bg-emerald-600" : "border-2 border-amber-500 bg-white"
                }`}
              />
              <p
                className={`text-xs font-bold uppercase tracking-wide ${
                  i === 0 ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {s.when}
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl">{s.threshold}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{s.note}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900">These do sit still</h3>
        <ul className="mt-5 space-y-4">
          {ALLOWANCES.map((a) => (
            <li key={a.label} className="rounded-xl bg-white p-4 ring-1 ring-emerald-100">
              <p className="flex items-baseline gap-2">
                <Check aria-hidden className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                <span className="text-2xl font-bold tabular-nums text-emerald-800">{a.figure}</span>
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">{a.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{a.note}</p>
            </li>
          ))}
        </ul>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}
