import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { GlassStat } from "@/components/glass/GlassStat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { estateTotals, leadsSeries, monthLabel, fmtNum } from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "Why the model works | Ashfield Trading",
  description:
    "How proprietary research built on official data becomes search and AI-citation authority, then qualified enquiries, then fee growth for niche accounting firms.",
  alternates: { canonical: `${siteConfig.url}/value` },
};

const steps = [
  {
    n: "01",
    title: "Proprietary research from official data",
    body: "Each brand publishes research assets built from ONS and Companies House releases: formation indexes, survival rates, insolvency series, sector density maps. Every figure traces to an official source, attributed under the Open Government Licence where used. Nothing is scraped opinion; it is data nobody else in the niche has assembled.",
  },
  {
    n: "02",
    title: "Search and AI-citation authority",
    body: "Original data earns what generic content cannot: citations. Search engines rank the primary source, and AI assistants cite it when answering sector questions. Authority compounds per niche, on a domain built for that niche alone.",
  },
  {
    n: "03",
    title: "Qualified, verified enquiries",
    body: "Visitors arrive with commercial intent and convert on forms built for their sector. Every submission passes honeypot filtering, real-time phone lookup, email verification and deduplication, then receives a tier grade from very high to low before it reaches a firm.",
  },
  {
    n: "04",
    title: "Firm growth",
    body: "A firm plugs into an asset that already ranks, already converts and already verifies. The output is a predictable flow of graded enquiries in a defined niche, without the firm building or staffing any of it.",
  },
];

const buildVsRent = (assets: string): [string, string, string][] => [
  [
    "Time to first enquiry",
    "Typically a year or more: domain authority, content depth and rankings all start from zero.",
    "Immediate: the site, rankings and enquiry flow already exist.",
  ],
  [
    "Research capability",
    "Requires sourcing, cleaning and modelling official datasets in-house, then maintaining them each release cycle.",
    `${assets} assets already built and maintained centrally across the estate.`,
  ],
  [
    "Content engine",
    "Ongoing writing, editorial QA and technical upkeep, funded before any return.",
    "Included and already running; costs sit inside one indicative monthly fee.",
  ],
  [
    "Lead verification",
    "Built from scratch: filtering, phone and email checks, deduplication, grading.",
    "The estate stack applies from day one.",
  ],
  [
    "Risk profile",
    "Sunk cost if the niche or the site underperforms.",
    "Rental terms; step away if the numbers do not hold.",
  ],
];

export default function ValuePage() {
  const totals = estateTotals();
  const monthly = leadsSeries();
  const latest = monthly[monthly.length - 1];

  return (
    <>
      {/* 1. Hero: paper-3, asymmetric, no glass */}
      <section className="bg-paper-3 pb-[6rem] pt-[7rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading eyebrow="The model" as="h1">
                Data first, enquiries second
              </SectionHeading>
              <p className="type-lead measure mt-6" data-reveal>
                Ashfield builds proprietary research on official data, turns it
                into search and AI-citation authority across {fmtNum(totals.sites)}{" "}
                niche accounting brands, and converts that authority into
                verified enquiries firms can act on. Here is the chain, link by
                link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The model: numbered editorial flow, serif numerals, hairline-ruled */}
      <section className="hairline-t bg-paper py-[8rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading eyebrow="Four links">How value moves</SectionHeading>
                <p className="type-body measure mt-5 text-ink-70">
                  Each stage feeds the next. Remove one and the chain fails,
                  which is exactly why it is hard to copy.
                </p>
              </div>
            </div>
            <ol className="lg:col-span-8">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="hairline-t grid gap-4 py-10 first:border-t-0 first:pt-0 sm:grid-cols-[6rem_1fr]"
                >
                  <span
                    aria-hidden="true"
                    className="type-stat nums-lining !text-[3rem] text-navy"
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="type-h3">{s.title}</h3>
                    <p className="type-body measure mt-3 text-ink-70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. Niche vs generalist: paper-2 + grain, split 5/7 */}
      <section className="grain cv-auto bg-paper-2 py-[11rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Positioning">
                Why niche beats generalist
              </SectionHeading>
              <p className="type-h2 mt-8 italic" data-reveal>
                A dentist searching for an accountant is not looking for an
                accountant. They are looking for a dental accountant.
              </p>
            </div>
            <div className="space-y-10 lg:col-span-7">
              <div data-reveal className="measure">
                <h3 className="type-h3">Intent</h3>
                <p className="type-body mt-3 text-ink-70">
                  Niche queries carry the buying decision inside them. Someone
                  searching a sector-specific tax question has already
                  self-qualified by profession, by problem and usually by
                  urgency. A generalist site competes for broad terms against
                  national firms and directories; a niche site meets a smaller
                  audience at the exact moment they need sector help.
                </p>
              </div>
              <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="measure">
                <h3 className="type-h3">Conversion</h3>
                <p className="type-body mt-3 text-ink-70">
                  Pages that speak in a sector&apos;s own terms, its regulator,
                  its allowances, its cash-flow rhythms, convert at rates a
                  generic &lsquo;accountants near me&rsquo; page cannot match.
                  Across the estate, {fmtNum(latest?.count ?? 0)} qualified
                  enquiries arrived in {latest ? monthLabel(latest.month) : "the latest month"}{" "}
                  alone, on a history of only three complete months, so the
                  trend is steep but young.
                </p>
              </div>
              <div data-reveal style={{ "--i": 2 } as React.CSSProperties} className="measure">
                <h3 className="type-h3">Authority depth</h3>
                <p className="type-body mt-3 text-ink-70">
                  Authority is easier to build metre-deep than kilometre-wide.
                  One domain covering one profession, with original research on
                  that profession, becomes the citable source for it. Fifteen
                  such domains cover fifteen professions without any of them
                  diluting the others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The moat: paper-3 + grain, glass stat panels over ghost numeral (glass moment 1 of 1) */}
      <section className="grain cv-auto bg-paper-3 py-[8rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-2">
              <SectionHeading eyebrow="The moat">
                What a competitor would have to rebuild
              </SectionHeading>
              <p className="type-body measure mt-6 text-ink-70" data-reveal>
                The defensible part is not any single site. It is{" "}
                {fmtNum(totals.research_assets)} research assets built from
                official releases, the pipelines that keep them current, and
                distribution across {fmtNum(totals.sites)} established domains.
                Each asset took sourcing, modelling and editorial work; each
                domain took months of authority-building. Replicating one is a
                project. Replicating the estate is a business.
              </p>
            </div>
          </div>
          <div className="relative mt-16">
            <span
              aria-hidden="true"
              className="ghost-numeral absolute -top-16 right-0 hidden text-[13rem] lg:block"
            >
              {fmtNum(totals.research_assets)}
            </span>
            <div className="relative grid gap-6 sm:grid-cols-3 lg:ml-[8.333%]">
              <GlassStat
                value={fmtNum(totals.research_assets)}
                label="Research assets"
                caption="Built on ONS and Companies House data"
              />
              <GlassStat
                value={fmtNum(totals.sites)}
                label="Live brand sites"
                caption="One niche per domain"
              />
              <GlassStat
                value={fmtNum(latest?.count ?? 0)}
                label={`Enquiries, ${latest ? monthLabel(latest.month) : "latest month"}`}
                caption="Partial month; three complete months of history"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Build vs rent: tight band, hairline-ruled table, paper */}
      <section className="hairline-t bg-paper py-[6rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="The choice">Build it or rent it</SectionHeading>
          <p className="type-body measure mt-5 text-ink-70">
            A firm could assemble all of this itself. The comparison below is
            qualitative, no competitor pricing is implied, and rental terms are
            indicative, subject to proposal.
          </p>
          <div className="mt-12 overflow-x-auto" data-reveal>
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="hairline-b border-b-(--color-hairline-strong)">
                  <th scope="col" className="type-eyebrow py-4 pr-6 font-medium">
                    Dimension
                  </th>
                  <th scope="col" className="type-eyebrow py-4 pr-6 font-medium">
                    Building in-house
                  </th>
                  <th scope="col" className="type-eyebrow py-4 font-medium text-navy">
                    Renting from Ashfield
                  </th>
                </tr>
              </thead>
              <tbody>
                {buildVsRent(fmtNum(totals.research_assets)).map(([dim, build, rent]) => (
                  <tr key={dim} className="hairline-b align-top">
                    <th scope="row" className="type-body w-[18%] py-5 pr-6 font-medium">
                      {dim}
                    </th>
                    <td className="type-body w-[41%] py-5 pr-6 text-ink-70">{build}</td>
                    <td className="type-body w-[41%] py-5 text-ink-70">{rent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="type-caption mt-4">
            Qualitative comparison. Time and cost vary by niche and firm;
            nothing here is a forecast or an offer.
          </p>
        </div>
      </section>

      {/* 6. Closing CTA: the one centered section */}
      <section className="grain bg-paper-3 py-[11rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter) text-center">
          <h2 className="type-h1 mx-auto max-w-[18ch]" data-reveal>
            See the chain working in your niche
          </h2>
          <p className="type-lead mx-auto mt-6 max-w-[48ch]">
            Ask for a proposal with anonymised enquiry data from the sector you
            serve. Indicative terms, no commitment.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" href="/contact">
              Request a proposal
            </Button>
            <Button variant="secondary" size="lg" href="/rent-a-site">
              How renting works
            </Button>
          </div>
          <p className="type-caption mt-8 !text-ink-70">
            Or read the{" "}
            <Link href="/insights" className="underline underline-offset-2">
              research behind the estate
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
