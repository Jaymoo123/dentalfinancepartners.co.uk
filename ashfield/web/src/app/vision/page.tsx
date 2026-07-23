import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GlassStat } from "@/components/glass/GlassStat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { estateTotals, leadsSeries, monthLabel, fmtNum } from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "The goal, mission and strategy behind Ashfield Trading's network of niche accounting growth platforms, built on proprietary research from official data.",
  alternates: { canonical: `${siteConfig.url}/vision` },
};

const strategySteps = [
  {
    title: "Proprietary data",
    body: "Every platform starts with research nobody else has assembled: indexes, survival curves and formation trends built from official sources such as the Office for National Statistics and Companies House, published with attribution and a stated methodology.",
  },
  {
    title: "Authority",
    body: "Original data earns citations, from journalists, from other sites, and increasingly from AI systems that answer the questions firm owners and their clients ask. Authority compounds; commodity content does not.",
  },
  {
    title: "Distribution",
    body: "Authority translates into search visibility across the questions a niche actually asks. Each site becomes the place its sector arrives at when a real decision, a company formation, a tax change, a practice sale, is in front of them.",
  },
  {
    title: "Partnership",
    body: "Visibility becomes verified enquiries, and enquiries are routed to accounting firms with the capacity and the appetite to serve that niche well. The firm grows, the platform deepens, and the cycle repeats.",
  },
];

const principles = [
  {
    title: "Data before opinion",
    body: "A claim on any of our sites should trace back to a dataset, a statute or a published methodology. Where we model or project, we say so, list the assumptions, and label the result indicative.",
  },
  {
    title: "Official sources",
    body: "Our research assets are built from official data, ONS releases, Companies House filings and other public records, used under their open licences with attribution. Provenance is part of the product.",
  },
  {
    title: "Verified leads",
    body: "An enquiry only counts if it survives verification: honeypot filtering, real-time phone lookup, email verification, deduplication and tier grading. We would rather report a smaller, honest number.",
  },
  {
    title: "Quality as strategy",
    body: "Search engines, AI systems and firm owners are all converging on the same filter: is this genuinely useful? We treat editorial quality not as polish but as the strategy itself. Thin content is a liability we do not carry.",
  },
];

export default function VisionPage() {
  const totals = estateTotals();
  const monthly = leadsSeries();
  const latest = monthly[monthly.length - 1];

  return (
    <div>
      {/* 1 - Hero: asymmetric, paper, generous */}
      <section className="mx-auto max-w-[1200px] px-(--gutter) pb-24 pt-24 md:pt-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-9">
            <SectionHeading eyebrow="Vision" as="h1">
              The definitive network of niche accounting growth platforms in
              the UK
            </SectionHeading>
            <p className="type-lead measure mt-8">
              Ashfield Trading builds and operates specialist platforms, one
              per accounting niche, each grounded in proprietary research from
              official data. The platforms earn authority, the authority earns
              qualified enquiries, and the enquiries fuel the growth of the
              accounting firms we work with.
            </p>
          </div>
        </div>
      </section>

      {/* 2 - Goal: tight ruled band for tempo */}
      <section className="hairline-t hairline-b bg-paper-2 py-12" data-reveal>
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <p className="type-h2 italic measure">
            A firm should be found for what it is genuinely good at.
          </p>
        </div>
      </section>

      {/* 3 - Mission: sticky-left editorial split 5/7, longest prose */}
      <section className="mx-auto max-w-[1200px] px-(--gutter) py-28 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <SectionHeading eyebrow="Mission">
                Why this network exists
              </SectionHeading>
            </div>
          </div>
          <div className="space-y-6 md:col-span-7" data-reveal>
            <p className="type-body measure text-ink-70">
              Most accounting firms are better than their visibility. A
              practice that quietly serves contractors, dentists, landlords or
              care providers with real depth is often invisible next to a
              generalist with a bigger marketing budget. Meanwhile the cost of
              acquiring a client through paid channels keeps rising, and the
              rented audience disappears the moment the spend stops.
            </p>
            <p className="type-body measure text-ink-70">
              Our mission is to close that gap with owned assets rather than
              rented attention. We build the specialist platform a niche
              deserves, the research, the guidance, the calculators, the
              editorial depth, and then connect it to firms that can serve that
              niche properly. The firm gets a durable source of qualified
              demand. The niche gets a genuinely useful resource. Both sides of
              that exchange have to hold for the model to work, which is why we
              publish methodology, cite official sources and verify every
              enquiry before it counts.
            </p>
            <p className="type-body measure text-ink-70">
              We do this facelessly and deliberately so. There is no personality
              to outgrow, no named expert to depend on. The authority sits in
              the data and the work, where it can compound for years.
            </p>
          </div>
        </div>
      </section>

      {/* 4 - Strategy: numbered ruled list, paper-2, no cards */}
      <section className="bg-paper-2 grain py-24 md:py-28 cv-auto">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Strategy">
            Data, then authority, then distribution, then partnership
          </SectionHeading>
          <p className="type-lead measure mt-6">
            The strategy is a sequence, not a menu. Each stage only works
            because the one before it is real.
          </p>
          <ol className="mt-14">
            {strategySteps.map((step, i) => (
              <li
                key={step.title}
                className="hairline-t grid gap-4 py-8 md:grid-cols-12"
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="type-stat !text-[2.5rem] text-navy md:col-span-1">
                  {i + 1}
                </span>
                <h3 className="type-h3 md:col-span-3">{step.title}</h3>
                <p className="type-body text-ink-70 md:col-span-8 md:max-w-[52ch]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 - Where it stands: glass stat panels over ghost numeral (glass moments: 2) */}
      <section className="bg-paper-3 grain py-24 md:py-28 cv-auto">
        <div className="relative mx-auto max-w-[1200px] px-(--gutter)">
          <span
            aria-hidden="true"
            className="ghost-numeral absolute -top-10 right-0 hidden text-[13rem] md:block"
          >
            {totals.sites}
          </span>
          <div className="relative md:max-w-[60%]">
            <SectionHeading eyebrow="Where it stands">
              An estate, measured
            </SectionHeading>
            <p className="type-body measure mt-6 text-ink-70">
              The network today: {totals.sites} live brand sites and{" "}
              {totals.research_assets} proprietary research assets built from
              official data. Estate-wide qualified enquiries reached{" "}
              {fmtNum(latest.count)} in {monthLabel(latest.month)}. The trend is
              steep, but the history is short, only three complete months, so we
              treat the trajectory as encouraging rather than proven.
            </p>
          </div>
          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 md:max-w-[720px]">
            <GlassStat
              value={fmtNum(totals.sites)}
              label="Live brand sites"
              caption="One platform per niche"
            />
            <GlassStat
              value={fmtNum(totals.research_assets)}
              label="Proprietary research assets"
              caption="Built from ONS, Companies House and other official data"
            />
          </div>
        </div>
      </section>

      {/* 6 - Operating principles: ruled two-column list */}
      <section className="mx-auto max-w-[1200px] px-(--gutter) py-28 md:py-36">
        <SectionHeading eyebrow="Operating principles">
          The rules we hold ourselves to
        </SectionHeading>
        <div className="mt-14 grid gap-x-16 md:grid-cols-2">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="hairline-t py-8"
              data-reveal
              style={{ "--i": i % 2 } as React.CSSProperties}
            >
              <h3 className="type-h3">{p.title}</h3>
              <p className="type-body mt-3 max-w-[52ch] text-ink-70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 - Closing CTA: the one centred section */}
      <section className="bg-paper-3 grain py-28 text-center md:py-36">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <h2 className="type-h1 mx-auto max-w-[24ch]">
            The ambition is simple to state and slow to build
          </h2>
          <p className="type-lead mx-auto mt-6 max-w-[52ch]">
            One platform per niche, each the best resource its sector has.
            If your firm wants to grow inside one of them, start a
            conversation.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" href="/contact">
              Get in touch
            </Button>
            <Button variant="secondary" size="lg" href="/value">
              How the model works
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
