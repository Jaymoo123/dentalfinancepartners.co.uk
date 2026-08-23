import { AlertTriangle, ArrowRight, Check, Minus, Receipt, TrendingUp, Users, Wallet } from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The figures for /leasehold.
 *
 * One file rather than seven, because every one of these is written for a single
 * section of a single page and none is reusable anywhere else. Same shape as
 * `TopicSection.tsx`, which exports the section and its hero together for the
 * same reason.
 *
 * NOTHING HERE IS A NEW FACT. Every date, figure, Act, section number and status
 * below already appears in that page's prose or in its `inForce` ledger, which
 * `docs/property/house_positions.md` section 31.3a is the source of truth for
 * (re-locked 2026-08-15, commencement register exhausted: only SI 2024/1018,
 * SI 2025/57 and SI 2025/131 exist). These components re-present that copy so it
 * can be scanned; they do not extend it. In particular the timeline names an SI
 * only where the ledger already pairs that SI with that date, and says
 * "January 2025" unattributed where the ledger does, rather than guessing which
 * of the three instruments carried the two-year rule.
 *
 * All server components, no JavaScript.
 */

/* ---------------------------------------------------------------- structure */

/**
 * The statutes IN THE ORDER PARLIAMENT PASSED THEM. The years are the whole
 * point of the figure, so the array is sorted by year and must stay that way.
 */
const STATUTES = [
  {
    year: "1967",
    act: "Leasehold Reform Act 1967",
    governs: "Houses. The right to buy the freehold, or take a 50-year extension.",
  },
  {
    year: "1985",
    act: "Landlord and Tenant Act 1985",
    governs: "Service charges. Reasonableness, consultation and the 18-month rule.",
  },
  {
    year: "1993",
    act: "Leasehold Reform, Housing and Urban Development Act 1993",
    governs: "Flats. The right to extend a lease and to enfranchise collectively.",
  },
  {
    year: "2002",
    act: "Commonhold and Leasehold Reform Act 2002",
    governs: "Management, including the no-fault right to manage.",
  },
  {
    year: "2022",
    act: "Leasehold Reform (Ground Rent) Act 2022",
    governs: "Ground rent on new qualifying long leases, limited to a peppercorn.",
  },
  {
    year: "2024",
    act: "Leasehold and Freehold Reform Act 2024",
    governs: "Amends several of the above, but only in part. This is where the confusion starts.",
    unfinished: true,
  },
];

/**
 * Six Acts on one rail, oldest first.
 *
 * This replaced a card grid, and the reason is that a grid says "six equivalent
 * things" when the section's actual claim is that leasehold law ACCRETED: no
 * single code, just statute added to statute across sixty years, each answering
 * whatever was going wrong at the time. Six years running down a line say that
 * before a word is read. A grid cannot, whatever order the cards are in.
 *
 * The 2024 Act is the terminal node and is drawn differently on purpose: it is
 * the only one on the rail that is not fully in force, and the section that
 * follows this one is entirely about which parts of it have commenced. Amber
 * and a hollow marker, matching `CommencementTimeline` below, so the two figures
 * read as the same story continuing rather than two unrelated devices.
 */
export function LeaseholdStatuteMap() {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative border-l-2 border-slate-200 pl-6 sm:pl-8">
        {STATUTES.map((s) => (
          <li key={s.act} className="relative pb-6 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white sm:-left-[39px] ${
                s.unfinished ? "border-2 border-amber-500 bg-white" : "bg-emerald-600"
              }`}
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={`text-xl font-bold tabular-nums sm:text-2xl ${
                  s.unfinished ? "text-amber-700" : "text-emerald-700"
                }`}
              >
                {s.year}
              </span>
              <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{s.act}</h3>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{s.governs}</p>
            {s.unfinished ? (
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
                <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
                Mostly not yet in force
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------- commencement */

type Milestone = {
  when: string;
  title: string;
  detail: string;
  state: "done" | "pending";
};

const MILESTONES: Milestone[] = [
  {
    when: "31 October 2024",
    title: "Building safety amendments commenced",
    detail: "SI 2024/1018. The remediation order machinery is live.",
    state: "done",
  },
  {
    when: "January 2025",
    title: "Two-year ownership rule abolished",
    detail: "A buyer can serve an extension notice immediately on completion. No waiting period.",
    state: "done",
  },
  {
    when: "3 March 2025",
    title: "Right to manage reforms commenced",
    detail:
      "SI 2025/131. Non-residential limit raised from 25% to 50%, the tribunal becomes first instance, and the RTM company no longer pays the landlord's process costs as a general rule.",
    state: "done",
  },
  {
    when: "24 October 2025",
    title: "Judicial review dismissed, appeal pending",
    detail:
      "The Divisional Court dismissed the freeholders' challenge to the marriage value, ground rent and costs provisions. The Court of Appeal has since given permission to appeal.",
    state: "done",
  },
  {
    when: "23 September 2026",
    title: "Valuation consultation closes",
    detail:
      "Prescribed deferment and capitalisation rates remain uncommenced. The post-Sportelli 5% deferment rate is still the working rate.",
    state: "pending",
  },
  {
    when: "No date set",
    title: "Marriage value, 990-year terms, costs and transparency",
    detail:
      "Marriage value abolition, the 990-year term, the section 60 costs repeal and service charge transparency are all uncommenced. Commencement is a governmental act, and the government has not exercised it.",
    state: "pending",
  },
];

/**
 * The 2024 Act as a timeline, because the section's whole argument is about
 * WHEN, and a status column in a table cannot show that three things happened
 * and four have not.
 *
 * The pending steps are deliberately drawn in the same rail rather than split
 * into a second list: the point is that they sit on the same road and simply
 * have not been reached. Hollow markers and an amber tint carry that; the state
 * is also written out in the date column, so nothing rests on the marker.
 */
export function CommencementTimeline() {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
        {MILESTONES.map((m) => (
          <li key={m.title} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white sm:-left-[39px] ${
                m.state === "done" ? "bg-emerald-600" : "border-2 border-amber-500 bg-white"
              }`}
            />
            <p
              className={`text-xs font-bold uppercase tracking-wide ${
                m.state === "done" ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {m.when}
              <span className="ml-2 font-semibold text-slate-500">
                {m.state === "done" ? "in force" : "not commenced"}
              </span>
            </p>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">{m.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{m.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ----------------------------------------------------------------- premium */

const PREMIUM_PARTS = [
  {
    name: "Term",
    body: "The value to the freeholder of the ground rent still to be received over the unexpired term.",
    always: true,
  },
  {
    name: "Reversion",
    body: "The deferred value of getting the flat back when the lease ends, discounted at the post-Sportelli 5% deferment rate.",
    always: true,
  },
  {
    name: "Marriage value",
    body: "The uplift in combined value created by merging the freehold interest with a longer lease. Payable only where the unexpired term is under 80 years, and still payable, because the abolition in the 2024 Act is not in force.",
    always: false,
  },
];

/**
 * What the premium is built from, and the 80-year cliff.
 *
 * The section already says marriage value "applies only where the unexpired term
 * is under 80 years" and calls that the cliff. As prose it is one clause among
 * five paragraphs. Split into two states, above 80 and below 80, with the third
 * component appearing only on one side, the cliff becomes the thing the reader
 * cannot miss, which is the correct emphasis: it is the one number on this page
 * that changes what a reader should do this month.
 */
export function PremiumStack() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          Three components, discounted at a statutory deferment rate
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {PREMIUM_PARTS.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl bg-white p-5 ring-1 ${p.always ? "ring-slate-200/70" : "ring-amber-300"}`}
            >
              <p
                className={`text-sm font-bold ${p.always ? "text-slate-900" : "text-amber-800"}`}
              >
                {p.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>

        {/* The cliff itself. Two states side by side, because the whole point is
            that one component switches on as the term crosses a line. */}
        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 sm:gap-5">
          <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
              <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              80 years or more unexpired
            </p>
            <p className="mt-3 text-lg font-bold text-slate-900">Term + reversion only</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">No marriage value.</p>
          </div>
          <div className="rounded-xl bg-white p-5 ring-1 ring-amber-300">
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
              <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              Under 80 years unexpired
            </p>
            <p className="mt-3 text-lg font-bold text-slate-900">Term + reversion + marriage value</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              The premium steps up sharply and keeps climbing as the term shortens.
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-700">
          If your lease is near 80 years, the date you serve notice matters more than anything else on this page.
        </p>
        <ExampleFigureNote className="mt-4" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- RTM */

const RTM_CHANGES = [
  {
    before: "Non-residential floor space limit of 25%",
    after: "Raised to 50%, bringing many shop-and-flats buildings into scope for the first time",
  },
  {
    before: "High Court as the first instance forum",
    after: "First-tier Tribunal is now first instance",
  },
  {
    before: "RTM company paid the landlord's process costs, win or lose",
    after: "General rule is no liability, with a narrow exception where a claim is withdrawn and the company acted unreasonably",
  },
];

/**
 * What the commenced RTM reforms actually changed, as before and after.
 *
 * These are the 2024 Act provisions that DID commence, which is unusual enough
 * on this page to be worth showing rather than describing. A change is two
 * states and a direction, so it is drawn as two states and a direction.
 */
export function RtmChanges() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          What changed on 3 March 2025, under SI 2025/131
        </h3>
        <ul className="mt-5 space-y-4">
          {RTM_CHANGES.map((c) => (
            <li
              key={c.before}
              className="grid gap-3 border-t border-slate-200 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-5"
            >
              <p className="text-sm leading-relaxed text-slate-500 line-through decoration-slate-300">{c.before}</p>
              <ArrowRight aria-hidden className="hidden h-4 w-4 shrink-0 text-slate-400 sm:block" />
              <p className="text-sm font-semibold leading-relaxed text-slate-900">{c.after}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-700">
          What does not move is ownership. The freeholder remains the freeholder, the lease terms are untouched, and
          ground rent stays payable.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- service charges */

const CHARGE_FACTS = [
  {
    figure: "£250",
    label: "Qualifying works",
    body: "Consultation is required where the works would cost any one leaseholder more than this. Per leaseholder, not per building or per project.",
  },
  {
    figure: "£100",
    label: "Long term agreements",
    body: "Consultation is required where a qualifying long term agreement would cost any one leaseholder more than this in an accounting period.",
  },
  {
    figure: "18 months",
    label: "The demand window",
    body: "A landlord cannot demand a charge more than 18 months after the cost was incurred, unless it notified leaseholders within that time that a demand would follow.",
  },
];

/**
 * The three numbers a leaseholder actually looks up, pulled out of the prose.
 *
 * The section's own line is that the consultation thresholds are "the ones most
 * often misquoted", which is a good reason to set them as figures rather than
 * bury them mid-paragraph. The per-leaseholder qualifier travels with each one,
 * because that is the specific thing people get wrong.
 */
export function ServiceChargeLevers() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {CHARGE_FACTS.map((f) => (
          <div key={f.figure} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{f.figure}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-700">{f.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.body}</p>
          </div>
        ))}
      </div>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* --------------------------------------------------------------- ground rent */

const GROUND_RENT_STATES = [
  {
    badge: "Law",
    tone: "law" as const,
    title: "New leases",
    body: "The Leasehold Reform (Ground Rent) Act 2022 limits ground rent on new qualifying residential long leases to a peppercorn. Commenced by SI 2022/694 on 30 June 2022, and on 1 April 2023 for retirement home leases. A prohibited term is automatically treated as a peppercorn, and an enforcement authority can impose a penalty of between £500 and £30,000 per breach, with refund orders on top.",
  },
  {
    badge: "Unchanged",
    tone: "neutral" as const,
    title: "Existing leases",
    body: "The 2022 Act does not touch a lease granted before it commenced. A doubling clause or an RPI-linked escalator in a 2015 lease is enforceable exactly as drafted. The statutory escape route is a lease extension, because a statutory extension takes effect at a peppercorn.",
  },
  {
    badge: "Not law",
    tone: "draft" as const,
    title: "The £250 cap",
    body: "It sits in the draft Commonhold and Leasehold Reform Bill. It is not in the 2024 Act, it has not been enacted, and it should not appear in any calculation you rely on.",
  },
];

const STATE_TONES = {
  law: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  draft: "bg-amber-50 text-amber-800 ring-amber-200",
};

/**
 * Three states of ground rent, badged law / unchanged / not law.
 *
 * This is the section that most needs a figure on the whole page. Its own
 * opening sentence is that "almost every ground rent question resolves once you
 * separate three things that most coverage runs together", and a bulleted list
 * runs them together again by giving all three the same visual weight and no
 * status. The badge is the separation the copy asks for, stated in a word.
 */
export function GroundRentStates() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {GROUND_RENT_STATES.map((s) => (
          <div key={s.title} className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ${STATE_TONES[s.tone]}`}
            >
              {s.tone === "law" ? (
                <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              ) : s.tone === "draft" ? (
                <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              ) : (
                <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              )}
              {s.badge}
            </span>
            <h3 className="mt-3 text-base font-bold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- tax */

/**
 * The four tax points.
 *
 * `figure` and `caption` are pulled out of the body rather than invented: each
 * is the number that paragraph already turns on, lifted so a reader scanning the
 * section can find their own situation by the figure. Change a body figure and
 * change the chip with it, or the card contradicts itself.
 *
 * `tone` is the reader's exposure, not decoration. Amber where the paragraph
 * describes a charge that catches people out, emerald where it describes relief
 * or a charge that does not arise. Every card also states which it is in words,
 * so the colour is emphasis and never the message.
 */
const TAX_POINTS = [
  {
    title: "Stamp duty on an extension premium",
    icon: Receipt,
    figure: "5%",
    caption: "surcharge on the whole premium at £40,000+",
    tone: "warn" as const,
    body: "A statutory lease extension is treated for stamp duty land tax as a surrender of the old lease and the grant of a new one, so the premium is chargeable consideration. Rent at a peppercorn contributes nothing to the net present value calculation, so in practice the premium is the charge. The trap is the additional dwellings surcharge: where the premium reaches £40,000 and you already own another residential property, the 5% surcharge applies to the whole premium. That catches a meaningful share of London and South East extensions, and it is routinely missed until the return is prepared.",
  },
  {
    title: "Collective enfranchisement is calculated differently",
    icon: Users,
    figure: "Per flat",
    caption: "rates applied to the divided figure, then multiplied back up",
    tone: "good" as const,
    body: "The total consideration is divided by the number of qualifying flats, the rates are applied to that per-flat figure, and the result is multiplied back up. Because the per-flat fraction often falls in or below the nil rate band, the charge is usually far lower than applying the rates to the aggregate price. Buying the freehold of a house is a straightforward purchase taxed in the ordinary way.",
  },
  {
    title: "Capital gains tax",
    icon: TrendingUp,
    figure: "£0",
    caption: "for the leaseholder. 18% and 24% for the freeholder",
    tone: "good" as const,
    body: "The leaseholder has no capital gains tax charge on extending or enfranchising, because money is going out rather than coming in. The premium is capital expenditure that increases the base cost of the property for a future disposal, so keep the paperwork. The freeholder is the one making a disposal, taxed at residential rates of 18% and 24% for an individual or within the corporation tax charge for a company.",
  },
  {
    title: "Deductibility on a let flat",
    icon: Wallet,
    figure: "£500,000",
    caption: "the ATED point to re-check after a revaluation",
    tone: "warn" as const,
    body: "Ground rent and service charges are revenue expenses and come off rental income in the normal way. The extension premium does not: it is capital, and the distinction is absolute rather than a matter of degree. If the flat is held in a company and a revaluation after extension pushes it over £500,000, check the annual tax on enveloped dwellings position before the next valuation date.",
  },
];

const TAX_TONES = {
  warn: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    figure: "text-amber-800",
    edge: "before:bg-amber-500",
  },
  good: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    figure: "text-emerald-800",
    edge: "before:bg-emerald-600",
  },
};

/**
 * The four tax points as cards.
 *
 * Each was already a paragraph opening on a bolded label, which is a heading
 * wearing a paragraph's clothes. Promoting the labels to real h3s makes the
 * section scannable and gives the page four more headings naming things people
 * search for (the additional dwellings surcharge, collective enfranchisement,
 * capital expenditure, ATED). Bodies are the paragraphs verbatim.
 *
 * The figure chip and the coloured edge are the difference between four grey
 * boxes and four answers. A reader scanning this section is looking for one
 * thing, "does this cost me anything", and the chip answers it before the
 * paragraph does.
 */
export function LeaseholdTaxCards() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
      {TAX_POINTS.map((t) => {
        const tone = TAX_TONES[t.tone];
        return (
          <div
            key={t.title}
            className={`relative overflow-hidden rounded-xl bg-white p-5 ring-1 ring-slate-200/70 before:absolute before:inset-y-0 before:left-0 before:w-1 before:content-[''] sm:p-6 ${tone.edge}`}
          >
            <div className="flex items-start gap-4 pl-2">
              <span
                aria-hidden
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${tone.badge}`}
              >
                <t.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">{t.title}</h3>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className={`text-lg font-bold tabular-nums sm:text-xl ${tone.figure}`}>{t.figure}</span>
                  <span className="text-xs leading-snug text-slate-500">{t.caption}</span>
                </p>
              </div>
            </div>
            <p className="mt-4 pl-2 text-sm leading-relaxed text-slate-700">{t.body}</p>
          </div>
        );
      })}
    </div>
  );
}
