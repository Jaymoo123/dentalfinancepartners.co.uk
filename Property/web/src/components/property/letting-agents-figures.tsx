import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Code2,
  Minus,
  PoundSterling,
  RefreshCw,
  X,
} from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { Eyebrow } from "@/components/ui/page-blocks";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { btnOnDark, siteContainerLg } from "@/components/ui/layout-utils";

/**
 * The figures for /for-letting-agents.
 *
 * One file rather than seven, for the reason `leasehold-figures.tsx` gives: none
 * of these is reusable off its own page.
 *
 * NOTHING HERE IS A NEW FACT. Every date, section number, status and figure
 * below already appears in that page's prose. These components re-present it so
 * an agent standing at a desk can scan it; they do not extend it. In particular
 * no figure names a commencement date the page does not name, and the EPC block
 * draws only the two bands the copy mentions rather than a full A to G scale,
 * because the page makes no claim about the others.
 *
 * The audience is the reason the shapes lean on status badges rather than on
 * prose. An agent is answering a landlord in front of them and needs "is this
 * law yet, and does it apply to this tenancy" in one look.
 *
 * All server components, no JavaScript.
 */

/* --------------------------------------------------------------- 1 May 2026 */

const IN_SCOPE = {
  yes: {
    label: "Private assured tenancies",
    body: "In scope. This is the tenancy you manage for a private landlord, and everything on this page is about it.",
  },
  no: {
    label: "Social housing assured tenancies",
    body: "Carved out of this wave. A landlord letting through a housing association is asking you a different question.",
  },
};

const CHANGES = [
  {
    before: "Section 21 no-fault possession",
    after: "Gone. Possession runs on the Section 8 grounds",
  },
  {
    before: "A fixed term, then a statutory periodic tenancy",
    after: "Every assured tenancy is periodic from the start",
  },
  {
    before: "A rent rise on whatever the tenancy agreement said",
    after: "A rent rise goes through a Section 13 notice",
  },
];

/**
 * Scope first, then the three changes as before and after.
 *
 * Scope leads because it is the question that decides whether the rest of the
 * section applies at all, and an agent who gets it wrong gives confident advice
 * about the wrong regime. The carved-out side takes a neutral dash and not a
 * cross: a housing association tenancy is not a failure, it is a different
 * question (rule 5).
 *
 * The three changes are drawn as two states and a direction because that is what
 * a change is. As prose they were one sentence carrying three separate reversals,
 * which is exactly the sentence an agent cannot recall at the counter.
 */
export function WhatChanged() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            In scope
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-900">{IN_SCOPE.yes.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{IN_SCOPE.yes.body}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
            <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Not this wave
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-900">{IN_SCOPE.no.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{IN_SCOPE.no.body}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:mt-5 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          The three changes that cover most of what lands on your desk
        </h3>
        <ul className="mt-5 space-y-4">
          {CHANGES.map((c) => (
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
          The Act rewrote the Housing Act 1988 rather than replacing it. The tenancy you manage is still an assured
          tenancy, which is why so much of the paperwork looks familiar.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ not commenced */

const STATUSES = [
  {
    title: "The landlord database",
    badge: "Not commenced",
    tone: "pending" as const,
    body: "No commencement date at all. It puts nothing on your landlord today. When it opens, they will need an entry before a property can be marketed.",
  },
  {
    title: "The landlord redress scheme",
    badge: "Rules not written",
    tone: "pending" as const,
    body: "The only part in force is a boundary provision about which ombudsman handles which complaint. The power to write the rules is live and the rules are not written. It will be a regime of approved schemes rather than one named ombudsman.",
  },
  {
    title: "Your own agency redress membership",
    badge: "In force",
    tone: "live" as const,
    body: "A separate and much older duty, and the Renters' Rights Act 2025 did not touch it. Do not let a landlord's database question turn into a question about yours.",
  },
];

const STATUS_TONES = {
  live: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
};

/**
 * Three duties, each badged with whether it is running.
 *
 * The section's whole job is to separate what a landlord has read about from
 * what is actually switched on, and a bulleted list runs them back together by
 * giving all three the same weight and no status. The badge is the separation
 * the copy asks for, stated in two words.
 *
 * The agent's own redress membership is on the same grid on purpose. It is the
 * one of the three that IS in force, and putting it beside the two that are not
 * is what stops a landlord's database question turning into a wrong answer about
 * the agency's own obligations.
 */
export function NotYetLive() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {STATUSES.map((s) => (
          <div key={s.title} className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ${STATUS_TONES[s.tone]}`}
            >
              {s.tone === "live" ? (
                <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
              ) : (
                <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              )}
              {s.badge}
            </span>
            <h3 className="mt-3 text-base font-bold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
        <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" strokeWidth={2.5} />
        <span>
          <strong className="font-bold">No registration fee exists in law.</strong> A figure quoted at you by a
          landlord has come from somewhere that made it up.
        </span>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- periodic */

const PERIODIC_QUESTIONS = [
  {
    q: "What notice does the tenant have to give?",
    kind: "asks" as const,
  },
  {
    q: "What happened to a fixed term that was still running on 30 April 2026?",
    kind: "asks" as const,
  },
  {
    q: "How does the landlord put the rent up?",
    kind: "not" as const,
    note: "Not a consequence of the switch. Rent runs on the Section 13 route, and it is a once-a-year decision.",
  },
];

/**
 * The two questions the switch generates, and the one it does not.
 *
 * The section already says the rent question is not one of them, and that
 * sentence is the reason the section exists: agents keep answering the rent
 * question when they are asked the notice question. Setting all three as
 * questions and marking the third with a neutral dash puts the distinction where
 * an agent will actually meet it, which is mid-conversation.
 */
export function PeriodicQuestions() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          Every private assured tenancy is periodic now
        </h3>
        <ul className="mt-5 space-y-3">
          {PERIODIC_QUESTIONS.map((p) => (
            <li
              key={p.q}
              className={`flex gap-3 rounded-xl bg-white p-4 ring-1 ${
                p.kind === "asks" ? "ring-emerald-100" : "ring-slate-200"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  p.kind === "asks" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {p.kind === "asks" ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                )}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-sm font-bold ${p.kind === "asks" ? "text-slate-900" : "text-slate-500"}`}
                >
                  {p.q}
                </span>
                {p.note ? <span className="mt-1 block text-sm leading-relaxed text-slate-600">{p.note}</span> : null}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          The first two follow from the switch. The third does not, and answering it as though it did is the
          mistake this section exists to stop.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- EPC */

const EPC_SPEND_CAP = 3_500;

/**
 * Two EPC standards, one enacted and one not.
 *
 * Deliberately NOT a full A to G band scale. The page names exactly two bands
 * and makes no claim about the others, and a scale would invite the reader to
 * infer a timetable the copy does not give (rule 1).
 *
 * The enacted standard is emerald and solid; the 2030 policy is amber with a
 * dashed edge, which is the sitewide treatment for something that is not in
 * force. The spending cap sits under the enacted side because that is the side
 * it belongs to: it is the exemption from the standard that exists, not from the
 * one that does not.
 */
export function EpcStandards() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Enacted, and the answer to give first
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800 sm:text-4xl">EPC E</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            The standard in force. This is the one a landlord has to meet today.
          </p>
        </div>
        <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-5 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
            <AlertTriangle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
            Policy, not law
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-800 sm:text-4xl">EPC C by 2030</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            What your landlord has read. It is government policy, it is not enacted, and no regulations have been
            laid to make it law.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl">
          £{EPC_SPEND_CAP.toLocaleString("en-GB")}
        </p>
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-700">
          Including VAT. Once a landlord has spent that much getting to band E, they can register an exemption
          instead of spending more.
        </p>
      </div>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}

/* --------------------------------------------------------------------- MTD */

const STATEMENT_LINES = [
  { label: "Gross rent you collected", tone: "gross" as const },
  { label: "Less your commission", tone: "deduct" as const },
  { label: "Less the management fee", tone: "deduct" as const },
  { label: "Less anything else you deducted", tone: "deduct" as const },
  { label: "Net paid to the landlord", tone: "net" as const },
];

/**
 * Who files what, then the statement itself, then the trap.
 *
 * The trap is the whole section and it is arithmetic: a landlord who reads the
 * bottom line of your statement as their income understates both their income
 * and their costs, and the threshold test that decides whether they are in the
 * regime at all runs on the top line. Prose has to hold five lines in the
 * reader's head to land that. Drawn as a statement with the top and bottom lines
 * marked, it lands on sight.
 *
 * No figures, so no note: the section publishes none and this must not invent
 * any to make the shape look fuller.
 */
export function MtdSplit() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
            <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Not yours
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-900">You do not file, and you are not in it</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Making Tax Digital for Income Tax is the landlord&rsquo;s obligation. You are not part of the
            submission.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-emerald-100 sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
            Yours
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-900">Your statement feeds their categories</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Every line on it becomes a line in their quarterly update, so the shape of your statement decides how
            easy their filing is.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:mt-5 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">What your statement has to carry</h3>
        <ul className="mt-4 divide-y divide-slate-200">
          {STATEMENT_LINES.map((l) => (
            <li
              key={l.label}
              className={`flex items-center gap-3 py-3 text-sm ${
                l.tone === "deduct" ? "pl-4 text-slate-600 sm:pl-6" : "font-bold text-slate-900"
              }`}
            >
              <span
                aria-hidden
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  l.tone === "gross" ? "bg-emerald-600" : l.tone === "net" ? "bg-amber-500" : "bg-slate-300"
                }`}
              />
              {l.label}
              {l.tone === "gross" ? (
                <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
                  The test runs on this
                </span>
              ) : null}
              {l.tone === "net" ? (
                <span className="ml-auto rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
                  Not their income
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
          <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" strokeWidth={2.5} />
          <span>
            <strong className="font-bold">The trap costs money, not time.</strong> A landlord who treats the net
            figure you paid them as their income understates both their income and their costs, and the test that
            decides whether they are in the regime at all runs on the gross figure.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- deposits */

/**
 * The deposit, as the moment it becomes a tax question.
 *
 * The section's first line is that the tax question is not the one landlords
 * expect: it is not about holding the money, it is about the deduction at
 * check-out. Two states on a rail put the "not this one" beside the "this one",
 * which is what the sentence is doing and what the sentence cannot make anyone
 * remember.
 */
export function DepositMoment() {
  return (
    <div className="mt-8 sm:mt-10">
      <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6 sm:pl-8">
        <li className="relative">
          <span
            aria-hidden
            className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 ring-4 ring-slate-50 sm:-left-[39px]"
          />
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">During the tenancy</p>
          <h3 className="mt-1.5 text-base font-bold text-slate-500">Holding the deposit is not the question</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            This is the part landlords expect to be asking about, and it is not where the tax point is.
          </p>
        </li>
        <li className="relative">
          <span
            aria-hidden
            className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 ring-4 ring-slate-50 sm:-left-[39px]"
          />
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">At check-out</p>
          <h3 className="mt-1.5 text-base font-bold text-slate-900">
            A deduction is made and the landlord keeps part of what was paid
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
            That is the moment, and it is the point where a landlord asks you what to tell their accountant.
          </p>
        </li>
      </ol>
      <p className="mt-5 flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200">
        <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={3} />
        <span>
          Your agency&rsquo;s own client-money obligations are a separate regime and are not covered here.
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------- embed */

const DELIVERABLES = [
  {
    icon: Code2,
    title: "One line of HTML",
    body: "Per calculator, copied from the gallery. It drops into your site the way a video embed does, and there is nothing to install.",
  },
  {
    icon: RefreshCw,
    title: "Rates kept current by us",
    body: "When a rate or a threshold moves, the tool on your site moves with it. You never have to think about it again.",
  },
  {
    icon: PoundSterling,
    title: "No cost, one condition",
    body: "The small “Powered by Property Tax Partners” line stays where it is. That is the whole agreement.",
  },
];

/**
 * The embed offer as a full-bleed navy band.
 *
 * Owner, 2026-08-23: this section is a deliverable, not a paragraph, and it
 * should look like one. It was a `TopicSection tone="slate"` whose entire content
 * was two sentences and a related card, which read as a footnote to the
 * calculators above it rather than as the second thing this page offers an agent.
 *
 * Navy plus the brick backdrop is the site's treatment for a band that is
 * addressed AT the reader rather than about a topic: the hero and the closing
 * lead panel both use it. Adjacency holds because the sections either side of it
 * are white (report 12 rule 7), and the page's own tail is unaffected.
 *
 * The three cards are what the agent receives, which is what makes it a
 * deliverables block. Nothing here is a new claim: the code, the maintained
 * rates and the attribution line are all in the copy this replaces.
 */
export function EmbedDeliverables() {
  return (
    <section id="embed" className="relative scroll-mt-24 overflow-hidden bg-slate-900">
      <HeroBrickBackdrop />
      <div className={`${siteContainerLg} relative z-10 py-12 sm:py-16 lg:py-20`}>
        <div className="max-w-3xl">
          <Eyebrow onDark>What you get</Eyebrow>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            Put the calculators on your own site
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
            Every calculator on this page can sit on your website instead of ours, under your own branding and
            beside your own listings. It costs nothing and it takes a copy and a paste.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {DELIVERABLES.map((d) => (
            <div key={d.title} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/15 sm:p-6">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"
              >
                <d.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-3 text-base font-bold text-white sm:text-lg">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{d.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <Link
            href="/embed"
            data-cta="letting_agents_embed_gallery"
            data-cta-placement="embed"
            className={`${btnOnDark} w-full text-center sm:w-auto`}
          >
            Get the embed code
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- forward */

const FORWARD_TRAITS = [
  {
    icon: Check,
    title: "Written to be sent",
    body: "They answer the landlord's question rather than describing the law at them.",
  },
  {
    icon: Check,
    title: "Open URLs",
    body: "Nothing is gated. Paste one into a reply and move on.",
  },
  {
    icon: X,
    title: "No details asked of your landlord",
    body: "No sign-up, no email wall, nothing that lands your landlord on a list.",
    negative: true,
  },
];

/**
 * What an agent is actually forwarding, in three chips.
 *
 * The hero promises "nothing here is gated and nothing asks your landlord for
 * their details", and this section is where that promise is cashed. It was three
 * clauses in one sentence; as three cards it is a thing an agent can check
 * before they paste a link into a reply to a client.
 *
 * The third card takes an X rather than a dash because it IS an absence being
 * claimed as a feature, not one side of a comparison.
 */
export function ForwardTraits() {
  return (
    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
      {FORWARD_TRAITS.map((t) => (
        <div key={t.title} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
          <span
            aria-hidden
            className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${
              t.negative
                ? "bg-slate-100 text-slate-600 ring-slate-200"
                : "bg-emerald-50 text-emerald-600 ring-emerald-100"
            }`}
          >
            <t.icon className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <h3 className="mt-3 text-base font-bold text-slate-900">{t.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
        </div>
      ))}
    </div>
  );
}
