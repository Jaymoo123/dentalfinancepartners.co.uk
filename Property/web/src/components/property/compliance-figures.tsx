import {
  AlarmSmoke,
  ArrowRight,
  Building2,
  Check,
  FileCheck,
  Flame,
  Gauge,
  Minus,
  ScrollText,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The figures for /landlord-compliance.
 *
 * One file for the same reason `leasehold-figures.tsx` is one file: every export
 * here is written for a single section of a single page and none is reusable
 * elsewhere.
 *
 * NOTHING HERE IS A NEW FACT. Every figure, date, regulation, penalty cap and
 * cycle already appears in that page's prose or in its `calendar`, `costs` and
 * `penalties` arrays. These components re-present that copy so it can be
 * scanned; they do not extend it. If a figure changes in the page, change it
 * here in the same edit or the two will disagree.
 *
 * All server components, no JavaScript.
 */

/* -------------------------------------------------------------- primitives */

type Tone = "good" | "warn" | "bad" | "neutral";

const TONES: Record<Tone, { badge: string; edge: string; text: string }> = {
  good: { badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", edge: "bg-emerald-600", text: "text-emerald-800" },
  warn: { badge: "bg-amber-50 text-amber-700 ring-amber-200", edge: "bg-amber-500", text: "text-amber-800" },
  bad: { badge: "bg-red-50 text-red-700 ring-red-200", edge: "bg-red-600", text: "text-red-800" },
  neutral: { badge: "bg-slate-100 text-slate-600 ring-slate-200", edge: "bg-slate-400", text: "text-slate-700" },
};

/**
 * The card this page uses everywhere: icon badge, title, an optional figure
 * chip, body, and a coloured edge carrying the reader's exposure.
 *
 * `tone` is meaning, not decoration. Emerald where something is relieved or
 * satisfied, amber where a duty bites, red where there is no relief or a
 * criminal track, slate where it simply does not apply. Every card also states
 * which in words, so the colour never carries the message on its own.
 */
function FigureCard({
  icon: Icon,
  title,
  figure,
  caption,
  body,
  tone = "neutral",
}: {
  icon: LucideIcon;
  title: string;
  figure?: string;
  caption?: string;
  body: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${t.edge}`} />
      <div className="flex items-start gap-4 pl-2">
        <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${t.badge}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-snug text-slate-900">{title}</h3>
          {figure ? (
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className={`text-lg font-bold tabular-nums ${t.text}`}>{figure}</span>
              {caption ? <span className="text-xs leading-snug text-slate-500">{caption}</span> : null}
            </p>
          ) : null}
        </div>
      </div>
      <p className="mt-3 pl-2 text-sm leading-relaxed text-slate-700">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------- the duties */

const DUTIES = [
  {
    icon: Flame,
    title: "Gas",
    figure: "Annual",
    caption: "criminal enforcement",
    tone: "bad" as const,
    body: "An annual safety check of every gas appliance and flue by a Gas Safe registered engineer, with the record supplied to tenants and retained.",
  },
  {
    icon: Zap,
    title: "Electrical",
    figure: "5 years",
    caption: "28 days to remedy",
    tone: "warn" as const,
    body: "Inspection and testing of the fixed installation by a qualified person at least every five years, producing the EICR, with any remedial work completed within 28 days.",
  },
  {
    icon: Gauge,
    title: "Energy",
    figure: "Band E",
    caption: "EPC valid 10 years",
    tone: "warn" as const,
    body: "A valid EPC before the property is marketed or let, and a rating of at least band E unless a valid exemption is registered.",
  },
  {
    icon: AlarmSmoke,
    title: "Fire",
    figure: "HMOs and common parts",
    tone: "warn" as const,
    body: "A suitable and sufficient fire risk assessment, where the property is an HMO or the building has common parts, plus smoke and carbon monoxide alarms in every let.",
  },
  {
    icon: FileCheck,
    title: "Licensing",
    figure: "Council term",
    caption: "up to 5 years",
    tone: "warn" as const,
    body: "A licence where the property is a larger HMO anywhere in England, or sits inside a council designation for additional or selective licensing.",
  },
];

/**
 * The five duties, which were a bulleted list.
 *
 * The section's own argument is that these are five SEPARATE regimes with
 * nothing in common but the payer, and a bulleted list is the one shape that
 * makes five separate things look like one list. Five cards, each with its own
 * cycle on the face of it, says the opposite.
 */
export function ComplianceDuties() {
  return (
    <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {DUTIES.map((d) => (
        <FigureCard key={d.title} {...d} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- the cycles */

const CYCLES = [
  { every: "1", unit: "year", duty: "Gas safety record", tone: "bad" as const },
  { every: "5", unit: "years", duty: "EICR", tone: "warn" as const },
  { every: "10", unit: "years", duty: "EPC", tone: "good" as const },
  { every: "?", unit: "council term", duty: "Licence", tone: "neutral" as const },
];

const SERVICE_DEADLINES = [
  { when: "Before occupation", what: "Gas record and EICR to any new tenant, before they move in." },
  { when: "28 days", what: "Gas record to existing tenants after the check. EICR to existing tenants after the inspection. Remedial work from an unsatisfactory EICR." },
  { when: "7 days", what: "EICR to the local housing authority, from a written request." },
];

/**
 * Why compliance drifts, drawn rather than asserted.
 *
 * The section says "the cycles are not aligned, which is why compliance drifts",
 * and then prints a table sorted by duty, which hides the thing it just claimed.
 * Four intervals side by side, biggest number to smallest attention, make the
 * misalignment the first thing on the page. The service deadlines follow,
 * because they are a different clock again: they run from the inspection, not
 * from the renewal, and the section says that is where councils find breaches.
 */
export function ComplianceCycles() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {CYCLES.map((c) => {
          const t = TONES[c.tone];
          return (
            <div key={c.duty} className="rounded-xl bg-white p-5 text-center ring-1 ring-slate-200/70">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Every</p>
              <p className={`mt-1 text-4xl font-bold tabular-nums ${t.text}`}>{c.every}</p>
              <p className="text-xs font-semibold text-slate-500">{c.unit}</p>
              <p className="mt-3 border-t border-slate-200 pt-3 text-sm font-bold text-slate-900">{c.duty}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900">The other clock: deadlines that run from the inspection</h3>
        <ul className="mt-4 space-y-3">
          {SERVICE_DEADLINES.map((d) => (
            <li key={d.when} className="flex flex-col gap-1 border-t border-slate-200 pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:gap-4">
              <span className="w-40 shrink-0 text-sm font-bold text-amber-800">{d.when}</span>
              <span className="text-sm leading-relaxed text-slate-700">{d.what}</span>
            </li>
          ))}
        </ul>
      </div>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* --------------------------------------------------------------- the costs */

/**
 * The two figures the cost section actually lands on, and the two levers.
 *
 * The table above this gives every line item; what a reader wants is "what does
 * this cost me a year" and "can I make it cheaper". Both sentences are already
 * in the prose. This puts them where they can be found.
 */
export function ComplianceCostSummary() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="rounded-xl bg-slate-900 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Certificates on a gas-heated single let, no licensing
          </p>
          <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">£90 to £200</p>
          <p className="mt-1 text-sm text-emerald-400">a year, once the 5 and 10-year items are spread</p>
          <p className="mt-4 border-t border-white/20 pt-4 text-sm leading-relaxed text-slate-300">
            That is not the number that hurts. The number that hurts is remedial work: an unsatisfactory EICR can
            trigger anything from a £100 socket repair to a four-figure rewire, and a fire risk assessment action
            plan is open-ended by design.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-5">
          <FigureCard
            icon={Check}
            tone="good"
            title="Bundle the visit"
            figure="£110 to £160"
            caption="CP12 with a boiler service, against £60 to £120 alone"
            body="Assessors who carry out more than one inspection in a single visit usually price the second one lower."
          />
          <FigureCard
            icon={Check}
            tone="good"
            title="Book direct, not through an agent"
            body="The agent markup is often the largest single component of the quote."
          />
        </div>
      </div>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* ------------------------------------------------------------ the penalties */

const PENALTY_SCALE = [
  { cap: "£200", label: "EPC, dwelling", tone: "warn" as const },
  { cap: "£5,000", label: "Alarms", tone: "warn" as const },
  { cap: "£40,000", label: "EICR breach", tone: "bad" as const },
  { cap: "£40,000", label: "Licensing", tone: "bad" as const },
  { cap: "Criminal", label: "Gas", tone: "bad" as const },
];

/**
 * The exposure range on one line, before the per-breach detail.
 *
 * The section opens by saying the caps moved recently and that much of the
 * guidance online is stale, which is a reason to put the current numbers where
 * they cannot be missed. Gas is deliberately not a number: it runs on a criminal
 * track through the HSE, there is no fixed civil figure, and inventing one to
 * complete the row would be the exact error the copy warns about.
 */
export function PenaltyScale() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {PENALTY_SCALE.map((p) => {
          const t = TONES[p.tone];
          return (
            <div
              key={`${p.cap}-${p.label}`}
              className={`flex-1 rounded-xl px-4 py-4 text-center ring-1 ${t.badge} min-w-[8rem]`}
            >
              <p className="text-xl font-bold tabular-nums sm:text-2xl">{p.cap}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide">{p.label}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        These are separate regimes with separate enforcement, so an unlicensed and uncertified property can attract
        more than one at the same time.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------- three buckets */

const BUCKETS = [
  {
    icon: Check,
    tone: "good" as const,
    title: "Revenue",
    figure: "Full relief",
    caption: "in the year incurred",
    examples:
      "CP12 fee, EICR fee, EPC fee, fire risk assessment fee, licence fee, alarm servicing, like-for-like repairs the inspection flags",
    treatment: "Deducted against rental profit in the year incurred, under ITTOIA 2005 s.272",
  },
  {
    icon: Building2,
    tone: "neutral" as const,
    title: "Capital",
    figure: "Deferred",
    caption: "relieved on sale",
    examples:
      "A first-time full rewire that materially upgrades the installation, a new alarm or compartmentation system, insulation and glazing that lift the EPC band",
    treatment: "Added to the base cost and relieved against capital gains tax on sale, under TCGA 1992 s.38(1)(b)",
  },
  {
    icon: X,
    tone: "bad" as const,
    title: "No relief",
    figure: "Nothing",
    caption: "not wholly and exclusively",
    examples: "Civil penalties, penalty charge notices, criminal fines, rent repayment orders",
    treatment:
      "Not incurred wholly and exclusively for the business, so nothing is deductible. HMRC sets this out at BIM38500 onwards",
  },
];

/**
 * The three buckets, which were a three-row table.
 *
 * A table gives all three rows the same weight, and the section's point is that
 * the three are treated COMPLETELY differently: full relief now, relief deferred
 * to sale, or no relief at all. The headline on each card is that answer.
 * Statutory references are kept on the face of the card, because they are the
 * reason a reader can act on this rather than just read it.
 */
export function DeductibilityBuckets() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
      {BUCKETS.map((b) => {
        const t = TONES[b.tone];
        return (
          <div key={b.title} className="relative flex flex-col overflow-hidden rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
            <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${t.edge}`} />
            <div className="flex items-center gap-3 pt-2">
              <span aria-hidden className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${t.badge}`}>
                <b.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                <p className={`text-sm font-bold ${t.text}`}>
                  {b.figure} <span className="font-medium text-slate-500">{b.caption}</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">Examples</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{b.examples}</p>
            <p className="mt-4 border-t border-slate-200 pt-3 text-sm leading-relaxed text-slate-600">{b.treatment}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- gas 36A */

/**
 * Regulation 36A, which is the section's one genuinely useful operational
 * detail and is buried in a paragraph.
 *
 * A rule about dates is drawn as dates. The two-month window is what lets a
 * landlord fix the price and the renewal date in advance without shortening the
 * cycle, and that is hard to believe from a sentence and obvious from a bar.
 */
export function GasWindow() {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
      <h3 className="text-base font-bold text-slate-900 sm:text-lg">
        Regulation 36A: the two-month window that does not shorten the cycle
      </h3>
      <div aria-hidden className="mt-6 flex h-3 overflow-hidden rounded-full">
        <div className="w-5/6 bg-slate-200" />
        <div className="w-1/6 bg-emerald-600" />
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold">
        <span className="text-slate-500">Cycle runs</span>
        <span className="text-emerald-700">Last 2 months: check here</span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-700">
        A check carried out in the two months before the deadline date is treated as made on the deadline date. Book
        inside that window and the next deadline stays where it was, which is why the annual check is often described
        as a ten to twelve month job rather than a strict twelve.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ EICR codes */

const EICR_CODES = [
  { code: "C1", meaning: "Danger present", tone: "bad" as const },
  { code: "C2", meaning: "Potentially dangerous", tone: "bad" as const },
  { code: "FI", meaning: "Further investigation required", tone: "warn" as const },
];

/**
 * The three codes that make a report unsatisfactory, and the clock they start.
 *
 * The section already says "the codes it carries drive everything that follows",
 * so the codes are the thing to surface. A reader holding a report is looking
 * for their own code, and should not have to read a paragraph to find it.
 */
export function EicrCodes() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {EICR_CODES.map((c) => {
          const t = TONES[c.tone];
          return (
            <div key={c.code} className={`rounded-xl px-5 py-5 ring-1 ${t.badge}`}>
              <p className="text-2xl font-bold">{c.code}</p>
              <p className="mt-1 text-sm font-semibold">{c.meaning}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-slate-900 px-5 py-4">
        <span className="text-sm font-semibold text-slate-300">Any of the three</span>
        <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-500" />
        <span className="text-sm font-bold text-white">Report is unsatisfactory</span>
        <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-500" />
        <span className="text-sm font-bold text-amber-400">28 days to remedy</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- energy */

/**
 * The two energy statutes, which the section warns are "merged" to real effect.
 *
 * They answer different questions, so they are drawn as two questions. The band
 * E floor and the £3,500 cap sit under the second one, because that is the
 * regulation they belong to.
 */
export function EnergyRegimes() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">EPB Regulations 2012</p>
        <h3 className="mt-2 text-base font-bold text-slate-900">Must a certificate exist?</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          An EPC before marketing, made available free of charge to a prospective tenant, valid for ten years from the
          date it went on the register.
        </p>
        <p className="mt-4 flex items-baseline gap-2 border-t border-slate-200 pt-4">
          <span className="text-2xl font-bold tabular-nums text-slate-900">10 years</span>
          <span className="text-xs text-slate-500">and it survives a sale and a re-let</span>
        </p>
      </div>
      <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">EE (PRP) Regulations 2015</p>
        <h3 className="mt-2 text-base font-bold text-slate-900">Is the band good enough to let?</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Letting a domestic property rated F or G has been prohibited for new tenancies since 1 April 2018 and for all
          continuing lets since 1 April 2020, unless a valid exemption is registered.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-200 pt-4">
          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700">Band E</span>
            <span className="text-xs text-slate-500">the floor</span>
          </p>
          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tabular-nums text-amber-800">£3,500</span>
            <span className="text-xs text-slate-500">cost cap, including VAT</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- fire */

/**
 * Where the fire safety order applies and where it does not.
 *
 * The section says in terms that "any guide telling you every rental needs a
 * fire risk assessment is wrong", which is a correction worth drawing rather
 * than stating. Two columns, applies and does not, with the neutral dash rather
 * than a cross on the second: nothing is being done wrong there.
 */
export function FireScope() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:grid-cols-2 sm:gap-8 sm:p-6">
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Check aria-hidden className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
            The fire safety order applies
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            <li>HMOs</li>
            <li>Common parts of buildings containing two or more sets of domestic premises</li>
          </ul>
        </div>
        <div className="sm:border-l sm:border-slate-200 sm:pl-8">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Minus aria-hidden className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={3} />
            It does not apply
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            <li>Inside a single self-contained house let to one household</li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <FigureCard
          icon={AlarmSmoke}
          tone="warn"
          title="Alarms, in every let, with no exceptions"
          figure="£5,000"
          caption="maximum penalty, regulation 8(2)"
          body="A smoke alarm on each storey with living accommodation, carbon monoxide alarms in rooms with a qualifying combustion appliance, and a working-order check on the day the tenancy begins."
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- licensing */

const SCHEMES = [
  {
    icon: Users,
    title: "Mandatory HMO",
    figure: "Nationwide",
    caption: "no designation needed",
    tone: "bad" as const,
    body: "Applies to any HMO occupied by five or more people forming two or more households, regardless of what the council has designated.",
  },
  {
    icon: Users,
    title: "Additional HMO",
    figure: "Designated areas",
    caption: "smaller shared houses",
    tone: "warn" as const,
    body: "Catches smaller shared houses, but only inside an area the council has designated.",
  },
  {
    icon: Building2,
    title: "Selective",
    figure: "Designated areas",
    caption: "every private rental",
    tone: "warn" as const,
    body: "Catches every private rental inside a designated area, including an ordinary single-family let with no sharing at all.",
  },
];

/**
 * The three schemes, and the per-year figure the section says to compare on.
 *
 * "Read them per year of term rather than as a headline" is the actionable line
 * in this section, and it was the last sentence of the last paragraph. The
 * worked figure it gives is drawn out beside the schemes.
 */
export function LicensingSchemes() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {SCHEMES.map((s) => (
          <FigureCard key={s.title} {...s} />
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-slate-900 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Read the fee per year of term</p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-2xl font-bold text-white sm:text-3xl">£704</span>
          <span className="text-sm text-slate-300">selective licence over a five-year term</span>
          <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-500" />
          <span className="text-2xl font-bold text-emerald-400 sm:text-3xl">£141</span>
          <span className="text-sm text-slate-300">a year, which is the figure to compare</span>
        </p>
      </div>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* ------------------------------------------------------------- commercial */

const COMMERCIAL_SPLIT = [
  { dimension: "Energy improvement filter", domestic: "£3,500 cost cap, including VAT", commercial: "Seven-year simple payback test" },
  { dimension: "EPC penalty", domestic: "£200 fixed notice", commercial: "A percentage of rateable value" },
  { dimension: "MEES penalty", domestic: "Fixed caps", commercial: "Linked to rateable value, split under and over three months" },
  {
    dimension: "Capital allowances",
    domestic: "Blocked by the dwelling-house restriction",
    commercial: "Plant within an energy upgrade can often be claimed",
  },
];

/**
 * Domestic against commercial, because the section's whole instruction is "do
 * not import the figures above".
 *
 * Set side by side, the differences are checkable in one pass. In prose they
 * were four contrasts spread across two paragraphs, which is exactly the shape
 * that produces the mistake the section is warning about.
 */
export function CommercialSplit() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/70 sm:mt-10">
      <div className="hidden grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 sm:grid sm:px-6">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">&nbsp;</span>
        <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Domestic</span>
        <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">Commercial</span>
      </div>
      {COMMERCIAL_SPLIT.map((row) => (
        <div
          key={row.dimension}
          className="grid gap-2 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:grid-cols-[1.1fr_1fr_1fr] sm:gap-4 sm:px-6"
        >
          <p className="text-sm font-bold text-slate-900">{row.dimension}</p>
          <p className="text-sm leading-relaxed text-slate-600">
            <span className="font-semibold text-slate-500 sm:hidden">Domestic: </span>
            {row.domestic}
          </p>
          <p className="text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-emerald-700 sm:hidden">Commercial: </span>
            {row.commercial}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- horizon */

/**
 * What is coming, on the same rail treatment the rest of the site uses for
 * things that have not happened yet. Hollow amber markers, because none of this
 * is in force and the section's point is that commencement is staged.
 */
export function HorizonList({ items }: { items: Array<{ title: string; detail: string }> }) {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
        {items.map((item) => (
          <li key={item.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-amber-500 bg-white ring-4 ring-white sm:-left-[39px]"
            />
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-700">
              <ScrollText aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              Not yet in force
            </p>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{item.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
