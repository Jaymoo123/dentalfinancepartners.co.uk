import { AlertTriangle, ArrowRight, Check, Minus } from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The figures for /landlord-tax.
 *
 * This page already carried more visuals than any other on the site
 * (`CoverageCards`, `RentalProfitStack`, `DisposalFigures`, `PenaltyLadder`,
 * four tables and two check lists). What follows fills the sections that were
 * still prose or a bare list, under the standing rule that a body section does
 * not ship as prose alone (DESIGN_SYSTEM.md section 4a).
 *
 * NOTHING HERE IS A NEW FACT. Every figure, rate and claim already appears in
 * that page's prose or in one of its row arrays, and the effective rates below
 * are DERIVED from the worked example's own numbers rather than typed, so the
 * figure and the table it sits under cannot disagree.
 *
 * All server components, no JavaScript.
 */

/* ------------------------------------------------------- the effective rate */

/**
 * The worked example's own numbers, and only its own numbers.
 *
 * These are the four figures the section states in prose: the cash left after
 * the mortgage, the tax attributable to the property this year and next, and the
 * headline band the reader thinks they are in. Every percentage in the figure is
 * computed from them, so editing the worked example moves the bars with it.
 */
const CASH_RETAINED = 11_000;
const TAX_2026 = 5_146;
const TAX_2027 = 5_366;
const HEADLINE_RATE = 40;

const rate = (tax: number) => (tax / CASH_RETAINED) * 100;

const EFFECTIVE = [
  {
    label: "The headline rate you think you are paying",
    detail: "Higher-rate income tax.",
    value: HEADLINE_RATE,
    display: `${HEADLINE_RATE}%`,
    tone: "slate" as const,
  },
  {
    label: "2026/27, on the cash you actually received",
    detail: `£${TAX_2026.toLocaleString("en-GB")} of tax on £${CASH_RETAINED.toLocaleString("en-GB")} left after the mortgage.`,
    value: rate(TAX_2026),
    display: `about ${Math.round(rate(TAX_2026))}%`,
    tone: "amber" as const,
  },
  {
    label: "2027/28, same figures, new property rates",
    detail: `£${TAX_2027.toLocaleString("en-GB")} on the same £${CASH_RETAINED.toLocaleString("en-GB")}. The extra 2% of relief is worth £180; the extra 2% on the property income costs £400.`,
    value: rate(TAX_2027),
    display: `near ${Math.round(rate(TAX_2027))}%`,
    tone: "red" as const,
  },
];

const EFFECTIVE_TONES = {
  slate: { bar: "bg-slate-400", text: "text-slate-900" },
  amber: { bar: "bg-amber-500", text: "text-amber-800" },
  red: { bar: "bg-red-600", text: "text-red-800" },
};

/**
 * The effective rate against the headline rate.
 *
 * The section's own sentence is "that gap is Section 24 in one number", and the
 * number is in the middle of a paragraph under an eight-row table. A gap between
 * two rates is the one claim on this page that is a shape rather than a fact,
 * and the third bar is what turns it from a grievance about today into a reason
 * to act before April 2027.
 *
 * The scale runs to 50 rather than to 100 so the three bars are distinguishable;
 * every value is direct-labelled, so the bars carry no information of their own
 * and are `aria-hidden`.
 *
 * Colour is exposure, not decoration: slate for what the reader assumed, amber
 * where the real figure bites, red where it gets worse next year.
 */
export function EffectiveRate() {
  const scale = 50;
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          What that is as a rate on money actually received
        </h3>
        <ul className="mt-5 space-y-5">
          {EFFECTIVE.map((e) => {
            const tone = EFFECTIVE_TONES[e.tone];
            return (
              <li key={e.label}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <span className="text-sm font-bold text-slate-900">{e.label}</span>
                  <span className={`text-lg font-bold tabular-nums ${tone.text}`}>{e.display}</span>
                </div>
                <div aria-hidden className="mt-2 h-4 w-full rounded-full bg-slate-100">
                  <span
                    className={`block h-4 rounded-full ${tone.bar}`}
                    style={{ width: `${(e.value / scale) * 100}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{e.detail}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-700">
          Push the mortgage interest to £15,000 and the cash retained falls to £5,000 while the tax bill barely
          moves. That is the point where gearing, ownership structure and pension contributions stop being
          optional considerations.
        </p>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ losses */

/**
 * Where a property loss can and cannot go.
 *
 * The section closes on the claim that forgotten losses are "the most common
 * piece of free relief left unclaimed", and states the rule as one sentence
 * carrying a negation and a permission at once. Drawn as two destinations, the
 * reader can see which door is shut without parsing the sentence.
 *
 * The blocked route takes a neutral dash and not a cross. Setting a property
 * loss against salary is a thing people reasonably expect to be able to do, not
 * a thing anyone is doing wrong (rule 5).
 */
export function LossRoutes() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
            <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Cannot go here
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-900">Against your salary</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            A loss in a property business cannot reduce employment income, however large it is and whatever else
            happened that year.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-emerald-200 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Goes here, indefinitely
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-900">
            Forward, against future profits of the same business
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            There is no time limit, which is exactly why it gets forgotten. Track it and it is free relief; lose
            the record and it is gone.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ buying */

const PURCHASE_CLOCK = [
  {
    when: "Exchange",
    title: "The last moment to fix the structure",
    detail:
      "Mixed-use and multiple dwellings are worth checking before exchange, not after. A purchase with commercial elements is taxed under the non-residential table, which is frequently cheaper, and it is far easier to get right at the outset than to reclaim later.",
    state: "done" as const,
  },
  {
    when: "Completion",
    title: "The charge crystallises",
    detail:
      "Charged on the whole price, not just the slice above a threshold. A company pays from the first pound, with no zero band.",
    state: "done" as const,
  },
  {
    when: "14 days later",
    title: "Filed and paid, in England and Northern Ireland",
    detail: "A fortnight, not a tax year. It is the shortest deadline a landlord meets anywhere in the system.",
    state: "deadline" as const,
  },
];

/**
 * The purchase as a clock, because the expensive decisions are all upstream.
 *
 * The section's three bolded paragraphs are ordered by topic, and the reader
 * takes from them that stamp duty is a thing that happens at the end. It is not:
 * every choice that changes the bill has to be made at or before exchange, and
 * the only thing that happens at the end is paying. Ordered by time, the section
 * reads as instructions rather than as description.
 *
 * The 14 day deadline is the terminal node in the sitewide "not reached yet"
 * treatment, amber and hollow.
 */
export function PurchaseClock() {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
        {PURCHASE_CLOCK.map((s) => (
          <li key={s.when} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full ring-4 ring-slate-50 sm:-left-[39px] ${
                s.state === "deadline" ? "border-2 border-amber-500 bg-white" : "bg-emerald-600"
              }`}
            />
            <p
              className={`text-xs font-bold uppercase tracking-wide ${
                s.state === "deadline" ? "text-amber-700" : "text-emerald-700"
              }`}
            >
              {s.when}
            </p>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------- IHT */

const IHT_RATE = 40;
const IHT_TAPER = "£2m";
const IHT_FROZEN_TO = "5 April 2031";

/**
 * The two numbers the inheritance tax section turns on, set as figures.
 *
 * The section's mechanism is that nothing about the tax is changing and that is
 * precisely the problem: the bands are frozen while values rise, so the number
 * of estates over the line grows every year without a single rate moving. Two
 * figure chips, one a rate and one a date, state the mechanism in the two things
 * a reader will remember.
 */
export function IhtFreeze() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
      <div className="rounded-xl bg-white p-5 ring-1 ring-amber-200 sm:p-6">
        <p className="text-3xl font-bold tabular-nums text-amber-800 sm:text-4xl">{IHT_RATE}%</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-800">On everything above the bands</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Rental property counts in full, at market value less the outstanding mortgage.
        </p>
      </div>
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200 sm:p-6">
        <p className="text-3xl font-bold tabular-nums text-slate-900 sm:text-4xl">{IHT_TAPER}</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-600">The taper threshold</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Frozen alongside the nil-rate band and the residence nil-rate band.
        </p>
      </div>
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200 sm:p-6">
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">Frozen to</p>
        <p className="mt-1 text-xl font-bold tabular-nums text-slate-900">{IHT_FROZEN_TO}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          No rate has to move for more estates to be caught. Rising values do it on their own, every year until
          then.
        </p>
      </div>
      <div className="sm:col-span-3">
        <ExampleFigureNote />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- structure */

const SUITS_COMPANY = [
  "Higher-rate taxpayer",
  "Geared, with real mortgage interest",
  "Building the portfolio rather than living off it",
  "Able to leave profit in the business",
];

const SUITS_PERSONAL = [
  "Basic-rate taxpayer",
  "Low or no gearing",
  "Needs the income now",
  "Expects to sell within a few years",
];

/**
 * The rough rule, as two columns the reader can tick themselves against.
 *
 * The section calls it "the rough rule" and then writes it as one sentence with
 * four conditions on each side, which is a sentence nobody can hold. The reader's
 * actual question is "which one am I", and two columns answer it by letting them
 * count.
 *
 * Neither side is coloured as the right answer, because neither is: the emerald
 * marks the ticks, not a recommendation. The caveat below is load-bearing and
 * stays attached to the figure rather than floating in the prose after it.
 */
export function WhichStructure() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">A company tends to suit</h3>
          <ul className="mt-4 space-y-2.5">
            {SUITS_COMPANY.map((s) => (
              <li key={s} className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-700">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Personal ownership tends to suit</h3>
          <ul className="mt-4 space-y-2.5">
            {SUITS_PERSONAL.map((s) => (
              <li key={s} className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-700">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
        <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" strokeWidth={2.5} />
        <span>
          Ticking the company column is not the decision. Moving existing property in is a disposal at market
          value, and section 162 incorporation relief is no longer automatic: for transfers on or after 6 April
          2026 it has to be claimed.
        </span>
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- specialist */

const SPECIALIST_SPLIT = [
  {
    who: "A generalist accountant",
    body: "Files what you give them, accurately. Nothing here is a criticism: it is what the engagement is.",
    tone: "slate" as const,
    items: ["Files the return", "Applies the figures you supply", "Meets the deadline"],
  },
  {
    who: "Someone who reads portfolios every week",
    body: "Sees the things that are not on the paperwork you handed over, because they are absences rather than entries.",
    tone: "emerald" as const,
    items: [
      "That a declaration of trust needed a Form 17 to follow it",
      "That a mixed-use purchase was taxed on the wrong table",
      "That a loss from three years ago is still available",
      "That a disposal should have straddled two tax years",
    ],
  },
];

/**
 * Filing against noticing, side by side.
 *
 * The section makes an argument about the DIFFERENCE between two kinds of work
 * and then sets both halves as continuous prose, so the comparison has to be
 * assembled by the reader. Its four examples are the whole case and they are the
 * last thing in the paragraph.
 *
 * The generalist column is deliberately not drawn as a failure. The claim is
 * that the two jobs are different, not that one is done badly, and a red-flagged
 * column would make the page look like it is selling against accountants rather
 * than describing what specialisation buys.
 */
export function SpecialistSplit() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
      {SPECIALIST_SPLIT.map((s) => (
        <div
          key={s.who}
          className={`rounded-xl bg-white p-5 ring-1 sm:p-6 ${
            s.tone === "emerald" ? "ring-emerald-200" : "ring-slate-200/70"
          }`}
        >
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{s.who}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
          <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
            {s.items.map((i) => (
              <li key={i} className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-700">
                {s.tone === "emerald" ? (
                  <ArrowRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                ) : (
                  <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={3} />
                )}
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
