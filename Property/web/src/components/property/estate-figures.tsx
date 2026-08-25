import { ArrowRight, Check, Minus, X } from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The figures for /landed-estates.
 *
 * One file, per the pattern `leasehold-figures.tsx` and `compliance-figures.tsx`
 * set: every export is written for a single section of a single page.
 *
 * NOTHING HERE IS A NEW FACT. The £2.5m allowance, the £5m couple figure, the
 * 50% relief above the cap, the effective 20% rate, the 30 October 2024 line and
 * the AIM sub-tier all come from that page's prose and its `inForce` ledger,
 * which `docs/property/house_positions.md` section 15.4 is the source of truth
 * for. The worked £4m example below is the page's own, arithmetic included.
 *
 * All server components, no JavaScript.
 */

/* ------------------------------------------------------------- the cap */

const RELIEVED = 2_500_000;
const EXAMPLE = 4_000_000;
const EXCESS = EXAMPLE - RELIEVED; // 1,500,000
const TAXABLE = EXCESS * 0.5; // 750,000 — relief halves above the cap
const IHT = TAXABLE * 0.4; // 300,000 at the ordinary rate

const gbp = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

/**
 * The allowance as a bar, then the bill.
 *
 * The section's own line is that the qualifying value "is the single number that
 * tells you whether you have a problem", and it then works £4 million through in
 * a paragraph of arithmetic. A reader cannot hold four figures in their head
 * from prose. Split the bar at the cap and the shape of the answer is visible
 * before the numbers are read: most of the estate is covered, and only a slice
 * of the excess is ever exposed.
 *
 * Derived, not typed: change EXAMPLE and every figure below follows, so the
 * figure and the paragraph beside it cannot drift.
 */
export function AllowanceSplit() {
  const relievedPct = (RELIEVED / EXAMPLE) * 100;

  return (
    <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
      <h3 className="text-base font-bold text-slate-900 sm:text-lg">
        A worked estate: {gbp(EXAMPLE)} of qualifying value
      </h3>

      <div aria-hidden className="mt-6 flex h-6 overflow-hidden rounded-lg">
        <div className="bg-emerald-600" style={{ width: `${relievedPct}%` }} />
        <div className="flex-1 bg-amber-500" />
      </div>
      <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs font-semibold">
        <span className="text-emerald-700">{gbp(RELIEVED)} relieved in full</span>
        <span className="text-amber-700">{gbp(EXCESS)} above the allowance</span>
      </div>

      <dl className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3 sm:gap-5">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Relieved at 50%</dt>
          <dd className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{gbp(TAXABLE)}</dd>
          <dd className="mt-0.5 text-xs text-slate-500">stays in the estate</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Inheritance tax at 40%</dt>
          <dd className="mt-1 text-xl font-bold text-amber-800 sm:text-2xl">{gbp(IHT)}</dd>
          <dd className="mt-0.5 text-xs text-slate-500">before your nil rate band</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Effective rate on the excess</dt>
          <dd className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">20%</dd>
          <dd className="mt-0.5 text-xs text-slate-500">the number to plan against</dd>
        </div>
      </dl>

      <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900 ring-1 ring-emerald-100">
        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
        <span>
          Married or in a civil partnership? The unused part passes to the survivor, so the couple figure is{" "}
          <strong className="font-bold">{gbp(RELIEVED * 2)}</strong> and this same estate has nothing to pay.
        </span>
      </p>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* ------------------------------------------------------- the investment line */

const QUALIFIES = [
  { label: "Development work", detail: "Trading, so a developer holding sites and work in progress can qualify on that element." },
  { label: "Serviced accommodation", detail: "Only where the services are substantial rather than nominal, and the bar for that is high." },
];

const DOES_NOT = [
  { label: "Straight buy-to-let", detail: "However many properties you hold, and however much of your week they take up." },
  { label: "Furnished holiday letting", detail: "On its own, it has never cleared the line." },
];

/**
 * Which side of the investment line an activity falls, drawn as two columns.
 *
 * The section's whole subject is a binary test, and it was three paragraphs of
 * qualifications. A reader arrives asking "does mine count", which is a lookup.
 * The neutral dash rather than a cross on the right, following
 * `ComparisonTable`: nothing on that side is being done wrong, it simply is not
 * trading.
 */
export function InvestmentLine() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
      <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-200 sm:p-6">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Check aria-hidden className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
          Can qualify: mainly trading
        </h3>
        <ul className="mt-4 space-y-3">
          {QUALIFIES.map((q) => (
            <li key={q.label}>
              <p className="text-sm font-bold text-slate-900">{q.label}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{q.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Minus aria-hidden className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={3} />
          Does not qualify: mainly investment
        </h3>
        <ul className="mt-4 space-y-3">
          {DOES_NOT.map((d) => (
            <li key={d.label}>
              <p className="text-sm font-bold text-slate-900">{d.label}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{d.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- allocation */

/**
 * What draws on the £2.5m and what does not.
 *
 * The AIM point is the one thing on this page that works in the reader's favour,
 * and in prose it was the middle of a long paragraph. Setting the two tiers side
 * by side makes the distinction the section calls "one of the few places where
 * the reform left something on the table" impossible to miss.
 */
export function AllowanceClaims() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">One allowance, and what competes for it</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-700">
              <ArrowRight aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              Draws on your {gbp(RELIEVED)}
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
              <li>Qualifying agricultural value of the land and buildings</li>
              <li>A genuine trading business</li>
              <li>Ordinary shares in a private trading company</li>
            </ul>
          </div>
          <div className="sm:border-l sm:border-slate-200 sm:pl-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
              <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              Separate 50% tier, consumes none of it
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
              <li>Shares designated as not listed on the markets of recognised stock exchanges, AIM in practice</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 flex items-start gap-2.5 border-t border-slate-200 pt-4">
          <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={2.5} />
          <p className="text-sm leading-relaxed text-slate-600">
            The rentals in a mixed estate get no relief at all, and the trading side competes with the farmland for
            the same allowance, so the allocation decision is real money.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ the 30 October line */

const GIFT_RULES = [
  {
    side: "Before 30 October 2024",
    tone: "good" as const,
    gifts: "Outside the new regime entirely, whenever you die.",
    trusts: "A trust settled before that date keeps its own allowance.",
  },
  {
    side: "On or after 30 October 2024",
    tone: "warn" as const,
    gifts:
      "Measured against the new rules if you die on or after 6 April 2026 and within seven years of making them.",
    trusts:
      "Trusts settled by the same person share one allowance between them, so adding a trust no longer adds a slice of relief.",
  },
];

/**
 * The date that runs through the middle of everyone's half-finished planning.
 *
 * The section says the 30 October 2024 line "runs through the middle of a lot of
 * half-finished planning", which is precisely the kind of claim a reader has to
 * be able to check against their own dates. Two columns, one date, gifts and
 * trusts on each side.
 */
export function GiftTimeline() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {GIFT_RULES.map((r) => (
          <div
            key={r.side}
            className={`rounded-xl bg-white p-5 ring-1 sm:p-6 ${
              r.tone === "good" ? "ring-emerald-200" : "ring-amber-300"
            }`}
          >
            <p
              className={`text-xs font-bold uppercase tracking-wide ${
                r.tone === "good" ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {r.side}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Gifts</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{r.gifts}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Trusts</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{r.trusts}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        Sequencing matters more than it used to. Because the allowance looks back seven years, the order in which
        you give things away, and how far apart, changes what is left when it counts.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ scope */

const OUT_OF_SCOPE = [
  { label: "Herd basis elections", who: "Your farm accountant", detail: "The livestock valuation election is a farm accounts decision." },
  { label: "Farmers' averaging", who: "Your farm accountant", detail: "Averaging profits across two or five years is income tax work on the trading accounts." },
  {
    label: "Basic Payment Scheme and environmental schemes",
    who: "Farm accountant or land agent",
    detail: "Scheme entitlements, delinked payments and stewardship agreements.",
  },
  {
    label: "Dividing the estate between farming and non-farming children",
    who: "Solicitor and the family",
    detail: "We cover the tax consequences of whichever split you choose, not the split itself.",
  },
  {
    label: "Agricultural tenancy law",
    who: "Rural surveyor and solicitor",
    detail: "Succession rights, rent reviews and notices to quit.",
  },
];

/**
 * What we do not do, and who does.
 *
 * A bulleted list of disclaimers reads as small print. As a table with a named
 * adviser against each row it reads as what it actually is, which is a referral
 * map, and it is more useful to the reader for being one. The section's own
 * framing is "we work alongside those advisers rather than replacing them".
 */
export function OutOfScope() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/70 sm:mt-10">
      {OUT_OF_SCOPE.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:grid-cols-[1.3fr_1fr] sm:items-baseline sm:gap-6 sm:px-6"
        >
          <div>
            <p className="text-sm font-bold text-slate-900">{row.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{row.detail}</p>
          </div>
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <ArrowRight aria-hidden className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
            {row.who}
          </p>
        </div>
      ))}
    </div>
  );
}
