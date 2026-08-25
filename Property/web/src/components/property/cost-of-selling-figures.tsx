import { AlertTriangle, ArrowRight, Check, Gavel, HelpCircle, Minus, Repeat } from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import {
  DEFAULT_AGENT_FEE_PCT,
  DEFAULT_SALE_PRICE,
} from "@/lib/calculators/tools/cost-of-selling-calculator";

/**
 * The figures for /cost-of-selling-a-property.
 *
 * One file rather than nine, for the reason `leasehold-figures.tsx` gives: none
 * of these is reusable off its own page.
 *
 * NOTHING HERE IS A NEW FACT. Every percentage, pound figure, source and caveat
 * below already appears in that page's prose or in its `atAGlance` array. These
 * components re-present it so it can be scanned; they do not extend it. Where a
 * figure and the prose carry the same number, change them in the same edit.
 *
 * DERIVED, NOT TYPED. The sale price and the agent rate are imported from the
 * cost of selling calculator's own defaults, and every pound figure on the page
 * is computed from them, so the visuals cannot drift from the tool the page
 * sends the reader to. That is the `SdltMarketValue` over `lib/sdlt.ts`
 * precedent (DESIGN_SYSTEM.md section 5, rule 2).
 *
 * All server components, no JavaScript.
 */

/* ------------------------------------------------------------------ numbers */

const PRICE = DEFAULT_SALE_PRICE; // £293,000
const AGENT_PCT = DEFAULT_AGENT_FEE_PCT; // 1.42% including VAT

/** The three smaller lines, from the calculator's own defaults. */
const CONVEYANCING = 700;
const EPC_MID = 80;
const REMOVALS = 550;

const pct = (p: number) => (PRICE * p) / 100;

const COMMISSION = pct(AGENT_PCT); // 4,160.60
const BILL = COMMISSION + CONVEYANCING + EPC_MID + REMOVALS; // 5,490.60

/**
 * Money, rounded to the step the prose beside it uses.
 *
 * The page says "about £4,160" and "about £5,500", so the exact £4,160.60 and
 * £5,490.60 have to be presented at the same precision or the figure contradicts
 * the paragraph it sits under. `step` is that precision, never decoration.
 *
 * A local three-liner rather than an import: the six `gbp` helpers in `lib/`
 * all format exactly, and every one of them would need wrapping here anyway.
 */
const money = (n: number, step = 10) =>
  `£${(Math.round(n / step) * step).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;

/* --------------------------------------------------------------- the bill */

type BillRow = { label: string; figure: string; condition: string };

/**
 * One bar for the whole bill, then the sourced detail underneath.
 *
 * The section's claim is not "here are six costs". It is that ONE of the six is
 * three quarters of the money and is the only one worth an argument. A list of
 * six rows gives all six the same weight and says the opposite. A single bar
 * split by share says it before a word is read, and the commission segment is
 * the only one wide enough to carry its own label.
 *
 * The rows are the page's own `atAGlance` array, passed in rather than copied,
 * and they stay because the provenance in the `condition` cells is the entire
 * differentiator on this SERP. Bar and rows share one `ExampleFigureNote`: they
 * are one visual describing one bill, and two stacked notes read as two
 * disclaimers.
 *
 * Amber is the commission because it is the line that catches sellers out, and
 * `aria-hidden` on the bar is safe because every segment is direct-labelled in
 * the legend below it (rule 4).
 */
export function BillStack({ rows }: { rows: BillRow[] }) {
  const segments = [
    { label: "Estate agent commission", value: COMMISSION, bar: "bg-amber-500", dot: "bg-amber-500" },
    { label: "Conveyancing", value: CONVEYANCING, bar: "bg-slate-500", dot: "bg-slate-500" },
    { label: "Removals", value: REMOVALS, bar: "bg-slate-400", dot: "bg-slate-400" },
    { label: "EPC", value: EPC_MID, bar: "bg-slate-300", dot: "bg-slate-300" },
  ];

  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-slate-50 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            The bill on a {money(PRICE, 1000)} sale
          </h3>
          <p className="text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl">
            about {money(BILL, 100)}
          </p>
        </div>

        <div aria-hidden className="mt-4 flex h-5 w-full overflow-hidden rounded-full bg-slate-200">
          {segments.map((s) => (
            <span
              key={s.label}
              className={s.bar}
              style={{ width: `${(s.value / BILL) * 100}%` }}
            />
          ))}
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
          {segments.map((s) => (
            <li key={s.label} className="flex items-baseline gap-2.5 text-sm">
              <span aria-hidden className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`} />
              <span className="flex-1 text-slate-700">{s.label}</span>
              <span className="font-bold tabular-nums text-slate-900">{money(s.value)}</span>
              <span className="w-12 text-right tabular-nums text-slate-500">
                {Math.round((s.value / BILL) * 100)}%
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
          <strong className="font-bold">
            Commission is {Math.round((COMMISSION / BILL) * 100)}% of the bill
          </strong>{" "}
          and the only line big enough to be worth an argument. There is a seventh line if the property has not
          been your own home throughout, and it is bigger than all four of these together.
        </p>

        <dl className="mt-5 border-t border-slate-200 pt-2">
          {rows.map((row) => (
            <div key={row.label} className="border-b border-slate-200 py-3 last:border-b-0 last:pb-0">
              <dt className="font-bold text-slate-900">
                {row.label}: <span className="text-emerald-700">{row.figure}</span>
              </dt>
              <dd className="mt-1 text-sm text-slate-700">{row.condition}</dd>
            </div>
          ))}
        </dl>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- agent fees */

/**
 * A bar row on the shared fee scale. `from`/`to` are percentages of the sale
 * price; a point estimate passes the same value twice and is drawn as a marker
 * so a published average never looks like a range.
 */
type FeeRow = {
  label: string;
  source: string;
  from: number;
  to: number;
  tone: "point" | "band" | "wide";
};

const SCALE_MIN = 0.9;
const SCALE_MAX = 3.6;

const FEE_ROWS: FeeRow[] = [
  {
    label: "Which?, average paid",
    source: "Updated June 2026, citing Rightmove data for 2025",
    from: 1.3,
    to: 1.3,
    tone: "point",
  },
  {
    label: "HomeOwners Alliance, 2026 average",
    source: "The figure this page prices everything on",
    from: AGENT_PCT,
    to: AGENT_PCT,
    tone: "point",
  },
  {
    label: "Sole agency",
    source: "One agent markets your home",
    from: 1.2,
    to: 1.8,
    tone: "band",
  },
  {
    label: "Multi-agency",
    source: "Several compete, only the winner is paid",
    from: 3,
    to: 3.6,
    tone: "wide",
  },
  {
    label: "The full published spread",
    source: "Where quotes actually land, end to end",
    from: SCALE_MIN,
    to: SCALE_MAX,
    tone: "wide",
  },
];

const FEE_TONES = {
  point: "bg-emerald-600",
  band: "bg-emerald-500/70",
  wide: "bg-amber-400/80",
};

const offset = (v: number) => ((v - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;

/**
 * Five published fee positions on one axis, in pounds and percent.
 *
 * The section's argument is that three sources disagree and the honest answer is
 * the spread, not an average. Prose cannot show a spread: it can only list the
 * numbers one after another, which is what every page that outranks us does.
 * Drawn on a shared axis, the disagreement between 1.3% and 1.42% turns out to
 * be visually trivial next to the distance from 1.2% to 3.6%, which is the
 * section's actual point.
 *
 * Every row is direct-labelled with its own percentage and its own pound figure,
 * so nothing rests on bar length or hue and the bars are `aria-hidden`.
 */
export function FeeSpread() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          What the sources actually say, on a {money(PRICE, 1000)} sale
        </h3>

        <ul className="mt-5 space-y-5">
          {FEE_ROWS.map((r) => {
            const point = r.from === r.to;
            return (
              <li key={r.label}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <span className="text-sm font-bold text-slate-900">{r.label}</span>
                  <span className="text-sm font-bold tabular-nums text-slate-900">
                    {point ? `${r.from}%` : `${r.from}% to ${r.to}%`}
                    <span className="ml-2 font-semibold text-slate-500">
                      {point
                        ? money(pct(r.from))
                        : `${money(pct(r.from))} to ${money(pct(r.to))}`}
                    </span>
                  </span>
                </div>
                <div aria-hidden className="relative mt-2 h-3 w-full rounded-full bg-slate-100">
                  <span
                    className={`absolute inset-y-0 rounded-full ${FEE_TONES[r.tone]}`}
                    style={{
                      left: `${offset(r.from)}%`,
                      width: point ? "0.75rem" : `${offset(r.to) - offset(r.from)}%`,
                      marginLeft: point ? "-0.375rem" : undefined,
                    }}
                  />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{r.source}</p>
              </li>
            );
          })}
        </ul>

        <p aria-hidden className="mt-4 flex justify-between text-xs font-semibold tabular-nums text-slate-400">
          <span>{SCALE_MIN}%</span>
          <span>{SCALE_MAX}%</span>
        </p>

        {/* The VAT trap, as two states rather than a sentence: the whole point
            is that the cheaper-looking quote is the dearer one, which only lands
            when the two are set beside each other with their pound figures. */}
        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
          <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-800">
              <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              Quoted &ldquo;1.2% plus VAT&rdquo;
            </p>
            <p className="mt-2 text-lg font-bold tabular-nums text-slate-900">
              1.44%, or {money(pct(1.44))}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              The lower-looking headline. It is the dearer of the two.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
              <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              Quoted &ldquo;1.3% including VAT&rdquo;
            </p>
            <p className="mt-2 text-lg font-bold tabular-nums text-slate-900">
              1.3%, or {money(pct(1.3))}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              Ask for the figure including VAT, in writing, before you sign.
            </p>
          </div>
        </div>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- negotiating */

const TARGET_PCT = 1.2; // 1% plus VAT, the target the section names
const KEPT = pct(AGENT_PCT) - pct(TARGET_PCT); // 644.60

const CONTRACT_LEVERS = [
  {
    lever: "The tie-in period",
    body: "How long you are locked in if the agent turns out to be wrong for you. Usually easier to shift than the percentage.",
  },
  {
    lever: "The notice period",
    body: "What it takes to leave once you have decided to. It decides how expensive a bad choice is.",
  },
  {
    lever: "A sliding scale",
    body: "A lower base rate with a higher percentage above an agreed price, so the agent chases the top of your range.",
  },
];

/**
 * The negotiation as two bars and a gap.
 *
 * The section already gives the number, but "you keep about £640" buried in a
 * paragraph is a fact, and two bars with the difference called out between them
 * is an argument. The gap is the figure the reader is deciding about, so the gap
 * is what the figure draws.
 *
 * Emerald on the money kept, because that is the site's colour for money you
 * keep. The levers underneath are the fallback the section names for when the
 * rate itself will not move, and they carry no figures on purpose: the page does
 * not publish a price for a tie-in period and this must not invent one.
 */
export function NegotiationGap() {
  return (
    // Slate card: this section sits on the white ground, and the alternation
    // rule applies to a figure's own surface as much as to a section's.
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          What one conversation is worth on a {money(PRICE, 1000)} sale
        </h3>

        <div className="mt-5 space-y-4">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="text-sm font-bold text-slate-900">The 2026 average, {AGENT_PCT}%</span>
              <span className="text-sm font-bold tabular-nums text-slate-900">{money(COMMISSION)}</span>
            </div>
            <div aria-hidden className="mt-2 h-4 w-full rounded-full bg-slate-200">
              <span className="block h-4 rounded-full bg-slate-400" style={{ width: "100%" }} />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="text-sm font-bold text-slate-900">
                The target sellers aim for, {TARGET_PCT}% (1% plus VAT)
              </span>
              <span className="text-sm font-bold tabular-nums text-slate-900">{money(pct(TARGET_PCT))}</span>
            </div>
            <div aria-hidden className="mt-2 h-4 w-full rounded-full bg-slate-200">
              <span
                className="block h-4 rounded-full bg-emerald-600"
                style={{ width: `${(pct(TARGET_PCT) / COMMISSION) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900 ring-1 ring-emerald-100">
          <span className="block text-2xl font-bold tabular-nums text-emerald-800 sm:text-3xl">
            {money(KEPT)} kept
          </span>
          More than your conveyancing and your EPC put together. Push at the valuation, before you have said yes
          to anyone, because that is the only moment your business is still in play.
        </p>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <h4 className="text-sm font-bold text-slate-900">If the rate will not move, move the contract</h4>
          <ul className="mt-3 space-y-3">
            {CONTRACT_LEVERS.map((l) => (
              <li key={l.lever} className="flex gap-3">
                <ArrowRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-sm leading-relaxed text-slate-700">
                  <span className="font-bold text-slate-900">{l.lever}.</span> {l.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- selling routes */

const ONLINE_FLAT = 999;
const ONLINE_ID_CHECK = 80;
const ONLINE_TOTAL = ONLINE_FLAT + ONLINE_ID_CHECK;

const ROUTES = [
  {
    label: "High street agent",
    detail: `${AGENT_PCT}% including VAT, the 2026 average`,
    cost: COMMISSION,
    display: money(COMMISSION),
    bar: "bg-amber-500",
  },
  {
    label: "Online agent",
    detail: `A ${money(ONLINE_FLAT, 1)} flat fee plus the ${money(ONLINE_ID_CHECK, 1)} identity check`,
    cost: ONLINE_TOTAL,
    display: money(ONLINE_TOTAL, 1),
    bar: "bg-emerald-600",
  },
  {
    label: "No agent at all",
    detail: "A private listing package. More cash on the table, all of the work on you",
    cost: 400,
    display: "£0 to £400",
    bar: "bg-emerald-500/70",
  },
];

/**
 * Three routes on one pound scale, and the thing nobody can tell you.
 *
 * The saving is genuinely large and the section says so, but its more important
 * sentence is the one after it: there is no independent dataset on whether the
 * cheaper routes achieve a lower price, so the saving is a fee comparison and
 * not an outcome. A bar chart alone would state the first half and imply the
 * second half is settled. The slate panel is therefore part of the figure, not a
 * footnote to it, and it is slate because nobody here is doing anything wrong
 * (rule 5): it is an open question, not a warning.
 */
export function RouteCompare() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          What each route charges you on a {money(PRICE, 1000)} sale
        </h3>

        <ul className="mt-5 space-y-4">
          {ROUTES.map((r) => (
            <li key={r.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <span className="text-sm font-bold text-slate-900">{r.label}</span>
                <span className="text-sm font-bold tabular-nums text-slate-900">{r.display}</span>
              </div>
              <div aria-hidden className="mt-2 h-4 w-full rounded-full bg-slate-100">
                <span
                  className={`block h-4 rounded-full ${r.bar}`}
                  style={{ width: `${(r.cost / COMMISSION) * 100}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{r.detail}</p>
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900 ring-1 ring-emerald-100">
          <span className="block text-2xl font-bold tabular-nums text-emerald-800 sm:text-3xl">
            {money(COMMISSION - ONLINE_TOTAL, 1)} better off
          </span>
          On the fee alone, taking the online route instead of the average high street commission. Published flat
          fees run from £129 to £1,599 across named providers, and Which? gives the wider market band as £300 to
          £1,500, so check where your quote sits before you use this number.
        </p>

        <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
            <HelpCircle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
            What nobody can tell you
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Whether you end up ahead. There is no current independent dataset showing whether online and
            do-it-yourself sellers achieve a lower price. Which? notes a flat fee gives an agent less reason to
            chase the top of your range. Providers say they usually hit the asking price. Both are positions
            rather than evidence, and if saving £3,000 on the fee costs you £5,000 on the price you are worse off.
          </p>
        </div>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------- the smaller lines */

const SELLING_SIDE = [
  { line: "Conveyancing on the sale", figure: money(CONVEYANCING, 1), note: "More on a leasehold flat: your solicitor has a management pack to chase." },
  { line: "Energy Performance Certificate", figure: "£35 to £120", note: "Needed before marketing, not before selling. Free if yours is still in date." },
  { line: "Removals", figure: money(REMOVALS, 1), note: "One published estimate. Quotes vary more than any other line here." },
];

const BUYING_SIDE = [
  { line: "Stamp duty", figure: "By price band", note: "On what you buy next, not on what you sell." },
  { line: "Survey", figure: "About £650", note: "" },
  { line: "Conveyancing on the purchase", figure: "About £1,050", note: "" },
  { line: "Mortgage arrangement fees", figure: "About £1,000", note: "" },
  { line: "Land Registry fee", figure: "By price band", note: "Fixed by law, so the one line on the whole move you cannot shop around for." },
];

const NOT_YOURS = ["Stamp duty on the property you are selling", "The Land Registry fee on the property you are leaving"];

/**
 * The smaller lines, split by which side of the chain they sit on.
 *
 * A single list of costs is what makes people budget the buying side into a
 * selling calculation, which is the specific mistake the section closes on. Two
 * columns and a third neutral block answer "is this mine" by position, before
 * the reader has read a word of any row.
 *
 * The third block uses a neutral dash and not a red cross, because nobody is
 * doing anything wrong by wondering (rule 5).
 */
export function BillSides() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
          <h3 className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Your selling bill
          </h3>
          <ul className="mt-4 space-y-3">
            {SELLING_SIDE.map((r) => (
              <li key={r.line} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-sm font-bold text-slate-900">{r.line}</span>
                  <span className="text-sm font-bold tabular-nums text-emerald-700">{r.figure}</span>
                </p>
                {r.note ? <p className="mt-1 text-xs leading-relaxed text-slate-600">{r.note}</p> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
          <h3 className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
            <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
            Only if you are buying too
          </h3>
          <ul className="mt-4 space-y-3">
            {BUYING_SIDE.map((r) => (
              <li key={r.line} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-sm font-bold text-slate-900">{r.line}</span>
                  <span className="text-sm font-bold tabular-nums text-amber-800">{r.figure}</span>
                </p>
                {r.note ? <p className="mt-1 text-xs leading-relaxed text-slate-600">{r.note}</p> : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-600">
            This is where the real money goes on a move, and none of it belongs in your selling budget.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-slate-200 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-700">Not on your bill at all</p>
        <ul className="mt-2 space-y-1.5">
          {NOT_YOURS.map((n) => (
            <li key={n} className="flex items-baseline gap-2.5 text-sm text-slate-700">
              <Minus aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={3} />
              {n}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">Both belong to the buyer. Keep them out.</p>
      </div>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* ------------------------------------------------------------ other routes */

const AUCTION_LOW = 2.4; // 2% plus VAT
const AUCTION_HIGH = 3.6; // 3% plus VAT
const MMOA_PCT = 3; // 2.5% plus VAT

const ALTERNATIVES = [
  {
    name: "Traditional auction",
    icon: Gavel,
    figure: `${money(pct(AUCTION_LOW))} to ${money(pct(AUCTION_HIGH))}`,
    caption: "Commission of 2% to 3% plus VAT, minimum fees from £1,500",
    payer: "You pay, and you pay more",
    body: "The contract is made when the hammer falls and your buyer cannot walk away. You are buying speed and a binding buyer, not a lower fee.",
  },
  {
    name: "Modern method of auction",
    icon: Repeat,
    figure: `About ${money(pct(MMOA_PCT))}`,
    caption: "Reservation fee usually at least 2.5% plus VAT, minimum £6,000 including VAT",
    payer: "The buyer pays, so you pay in the price",
    body: "Your buyer has to find that on top of what they bid, which narrows your pool and drags on what they can offer. Typically 28 days to exchange and another 28 to complete.",
  },
  {
    name: "Part-exchange",
    icon: ArrowRight,
    figure: "No commission",
    caption: "And no chain, no viewings and no agent",
    payer: "You pay in the offer",
    body: "The developer prices in a discount to open market value, and that discount is usually far larger than the fee you avoided. It is a genuine arm's length sale, so on a taxable property the lower price does at least reduce your gain.",
  },
];

/**
 * The three alternatives, each answering "who actually pays" first.
 *
 * Every one of these routes looks cheaper than a high street agent and none of
 * them is, which is the section's whole claim. The card therefore leads on the
 * payer rather than the price: on the modern method the fee is genuinely not
 * charged to you, and it still costs you money. A price-first grid would hide
 * exactly the thing the section exists to say.
 *
 * Amber throughout, because all three are charges that catch sellers out. The
 * high street baseline is restated on each card so the comparison is on the card
 * and not in the reader's memory.
 */
export function AlternativeRoutes() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {ALTERNATIVES.map((a) => (
          <div key={a.name} className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200"
            >
              <a.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">{a.name}</h3>
            <p className="mt-2 text-xl font-bold tabular-nums text-amber-800">{a.figure}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.caption}</p>
            <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
              <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              {a.payer}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{a.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        The baseline all three are being measured against is {money(COMMISSION)}, the average high street
        commission on a {money(PRICE, 1000)} sale.
      </p>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* ----------------------------------------------------------------- probate */

const PROBATE_STEPS = [
  {
    when: "Date of death",
    title: "The clock on any rise in value starts",
    detail:
      "What changes in a probate sale is not the bill. It is who is taxed on the rise in value between this date and the day the sale completes.",
  },
  {
    when: "Before you list",
    title: "Decide who sells, and take it deliberately",
    detail:
      "Selling as the personal representatives is not the same, for tax, as transferring the property to the beneficiaries and letting them sell. Which leaves the family better off depends on how many beneficiaries there are and what else they have sold that year. Make the call before the board goes up, not after an offer comes in.",
  },
  {
    when: "Grant of probate",
    title: "You need it in hand before you commit to a buyer",
    detail:
      "The house does not belong to whoever inherits it until it is transferred to them. It sits with the personal representatives, and until the grant is through the timetable is not yours to control.",
  },
  {
    when: "All the personal representatives",
    title: "They all have to agree, or a court has to order it",
    detail:
      "The exception is where probate was granted to only some of the named executors, in which case the ones who proved the will can sell on their own.",
  },
  {
    when: "Completion",
    title: "The estate pays the bill out of the proceeds",
    detail:
      "The same commission, the same conveyancing and the same EPC as any other sale, paid from the sale money rather than by anyone personally.",
  },
];

/**
 * The probate sale as a running order, because that is what the section is.
 *
 * Its own first line is that the costs are the same and the order of operations
 * is not, and that getting the order wrong is the most common reason a probate
 * sale collapses. A card grid would say "five equivalent considerations", which
 * contradicts the claim word for word. A rail says sequence, which is the claim.
 *
 * No figures, so no note: the one number the section quotes is the same bill the
 * top of the page already prices and it is stated in the last step in words.
 */
export function ProbateOrder() {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
        {PROBATE_STEPS.map((s) => (
          <li key={s.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-emerald-600 ring-4 ring-white sm:-left-[39px]"
            />
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{s.when}</p>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------- CGT */

/**
 * The worked example uses £300,000, not the £293,000 anchor, because the section
 * deliberately switches to a round number and says so. Keep them different.
 */
const CGT_PRICE = 300_000;
const CGT_HIGHER_RATE = 24; // the higher residential rate the section prices at
const CGT_COMMISSION = (CGT_PRICE * AGENT_PCT) / 100; // 4,260
const CGT_DEDUCTED = CGT_COMMISSION + CONVEYANCING; // 4,960

const DEDUCTIBLE = [
  "Your estate agent's commission",
  "Your solicitor's fees on the sale",
  "Advertising to find a buyer",
  "An auctioneer's fees, if you sell that way",
  "A surveyor's or valuer's fee",
  "A valuation you need in order to work the gain out",
];

const NOT_DEDUCTIBLE = [
  "Removals",
  "Storage",
  "Cleaning",
  "Anything spent making the place look presentable",
  "Mortgage interest",
  "Early repayment charges",
];

/**
 * The closed list, as a list with two sides.
 *
 * "Closed" is the operative word in the section and it is the thing a reader
 * gets wrong: they assume the test is whether a cost felt like part of selling.
 * Two columns show the boundary itself, which is the answer to the question
 * people actually arrive with.
 *
 * Neutral dashes on the right, never red crosses. Nobody is doing anything wrong
 * by paying for removals (rule 5). The worked example sits above, because the
 * amount at stake is what makes a reader bother reading the lists.
 */
export function DeductibleSplit() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          On a former rental sold for {money(CGT_PRICE, 1000)}
        </h3>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-600">Commission at {AGENT_PCT}%</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-slate-900">{money(CGT_COMMISSION, 1)}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-600">Plus conveyancing</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-slate-900">{money(CGT_DEDUCTED, 1)} off the gain</dd>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <dt className="text-xs font-bold uppercase tracking-wide text-emerald-800">
              Worth, at the {CGT_HIGHER_RATE}% higher residential rate
            </dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-emerald-800">
              just under {money((CGT_DEDUCTED * CGT_HIGHER_RATE) / 100, 100)}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          You deduct the gross fee, VAT included, because as a private seller you have no way of reclaiming it.
        </p>

        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 sm:gap-5">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
              <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              Comes off the gain
            </p>
            <ul className="mt-3 space-y-2">
              {DEDUCTIBLE.map((d) => (
                <li key={d} className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-700">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
              <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              Does not
            </p>
            <ul className="mt-3 space-y-2">
              {NOT_DEDUCTIBLE.map((d) => (
                <li key={d} className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-600">
                  <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={3} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- your dates */

const SALE_DATES = [
  {
    when: "Exchange",
    title: "This fixes the tax year, and nothing else does",
    detail:
      "A sale that exchanges on 1 April and completes on 20 May is taxed in the year that has just ended. If your sale is anything other than a straightforward main home, that gap is where the money is.",
    state: "key" as const,
  },
  {
    when: "Completion",
    title: "The 60 day clock starts here",
    detail:
      "Not on the day you shook hands. Keep the completion statement: it is the one piece of paper evidencing your commission, your conveyancing fee and anything the agent added on top.",
    state: "key" as const,
  },
  {
    when: "60 days after completion",
    title: "The return is due, and the tax with it",
    detail:
      "A separate return on its own deadline, nothing like the ordinary tax return timetable. This is the date that catches people out.",
    state: "deadline" as const,
  },
];

/**
 * Two dates and a deadline, on a rail.
 *
 * The section's closing point is that two dates do two different jobs and people
 * assume there is only one. Prose has to say that in a sentence the reader has
 * already decided is administrative detail. A rail with the deadline drawn as
 * the terminal node makes it a shape instead, and the shape is the warning.
 *
 * Amber and a hollow marker on the deadline, matching the sitewide treatment for
 * a point that has not been reached yet. No pound figures, so no note.
 */
export function SaleTimeline() {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
        {SALE_DATES.map((d) => (
          <li key={d.when} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full ring-4 ring-white sm:-left-[39px] ${
                d.state === "deadline" ? "border-2 border-amber-500 bg-white" : "bg-emerald-600"
              }`}
            />
            <p
              className={`text-xs font-bold uppercase tracking-wide ${
                d.state === "deadline" ? "text-amber-700" : "text-emerald-700"
              }`}
            >
              {d.when}
            </p>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">{d.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{d.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
