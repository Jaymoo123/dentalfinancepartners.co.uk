import type { Metadata } from "next";
import { JsonLd, buildFaqPage } from "@accounting-network/web-shared/schema";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassStat } from "@/components/glass/GlassStat";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { MonthlyLeadsChart } from "@/components/estate/MonthlyLeadsChart";
import { forecastSeries, leadsSeries, estateTotals } from "@/lib/estate/snapshot";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Buy qualified accounting leads",
  description:
    "Verified, tier-graded enquiries from 15 niche accounting brand sites. Every lead passes honeypot filtering, phone lookup, email verification and deduplication before it reaches your firm.",
  alternates: { canonical: `${siteConfig.url}/buy-leads` },
  openGraph: {
    title: `Buy qualified accounting leads | ${siteConfig.name}`,
    description:
      "Verified, tier-graded enquiries from 15 niche accounting brand sites, checked and deduplicated before they reach your firm.",
    url: `${siteConfig.url}/buy-leads`,
    type: "website",
  },
};

const verificationSteps = [
  {
    title: "Honeypot filtering",
    body: "Every enquiry form carries a hidden field that humans never see. Automated submissions fill it and are discarded before they touch the pipeline. Nothing scripted gets counted, let alone sold.",
  },
  {
    title: "Real-time phone lookup",
    body: "The number on the enquiry is checked against live carrier data as it arrives. Line type, validity and reachability are recorded, so a lead marked as callable actually rings.",
  },
  {
    title: "Email verification",
    body: "Each address is verified at the mailbox level, not just for format. Disposable domains, dead mailboxes and obvious aliases are flagged before grading.",
  },
  {
    title: "Deduplication",
    body: "Enquiries are matched against prior submissions across the whole estate. A repeat enquiry from the same person is never billed twice, whichever brand site it came through.",
  },
  {
    title: "Tier grading",
    body: "What survives is graded from very high to low against contact quality, enquiry substance and niche fit. You see the tier before you pay, and pricing follows the tier.",
  },
];

// No prices anywhere in these answers: they feed FAQPage JSON-LD verbatim.
const faqs = [
  {
    question: "Where do the leads come from?",
    answer:
      "Every lead originates on one of the 15 niche accounting brand sites operated by Ashfield Trading Ltd. Each site publishes proprietary research built from official data, and captures enquiries through its own forms. Nothing is bought in from third-party lead marketplaces.",
  },
  {
    question: "What counts as a qualified lead?",
    answer:
      "An enquiry that has passed honeypot filtering, real-time phone lookup, email verification and estate-wide deduplication, then been graded against contact quality, enquiry substance and niche fit. Submissions that fail any check are discarded, not discounted.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Per lead, priced by tier and niche, or a monthly retainer for a committed volume. All figures are indicative until confirmed in a written proposal for your firm, which sets out tier definitions, volumes and terms.",
  },
  {
    question: "Am I charged for duplicates or bad-contact leads?",
    answer:
      "No. Duplicates are removed across the whole estate before billing, and a lead whose phone or email fails verification after handover is credited under the replacement terms in your agreement.",
  },
  {
    question: "Can I get exclusivity in my niche or area?",
    answer:
      "Exclusive routing for a niche, or a niche and region combination, is available and priced accordingly. Without exclusivity, each lead is still sold once: routing to one firm at a time is the default, not an upgrade.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "Retainer arrangements run monthly with a notice period agreed in the proposal. Per-lead purchasing can start with a small trial batch so you can judge quality before committing to volume.",
  },
];

export default function BuyLeadsPage() {
  const monthly = leadsSeries();
  const forecast = forecastSeries();
  const totals = estateTotals();
  const latest = monthly[monthly.length - 1];

  return (
    <>
      <JsonLd data={buildFaqPage(faqs)!} />

      {/* 1 · Hero: paper-3, ghost numeral contrast layer, glass stat chips */}
      <section className="grain relative overflow-hidden bg-paper-3">
        <div className="mx-auto max-w-[1200px] px-(--gutter) pb-24 pt-28 md:pt-36">
          <div className="relative">
            <span
              aria-hidden="true"
              className="ghost-numeral absolute -top-10 right-0 hidden text-[13rem] lg:block"
            >
              {latest ? String(latest.count) : "56"}
            </span>
            <div className="relative max-w-[46rem]">
              <SectionHeading eyebrow="Buy leads" as="h1">
                Qualified enquiries, verified before you pay for them
              </SectionHeading>
              <p className="type-lead measure mt-6 text-ink-70">
                Fifteen niche accounting brand sites generate enquiries from
                firms&apos; ideal clients. Each one passes a five-stage
                verification stack and is graded by tier before it is offered
                for sale. You buy per lead or on retainer, and you only pay
                for what survives.
              </p>
            </div>
            <div
              className="relative mt-14 grid max-w-[52rem] gap-6 sm:grid-cols-3"
              data-reveal
            >
              <GlassStat
                value={latest ? String(latest.count) : "56"}
                label="Enquiries in July"
                caption="Month in progress"
              />
              <GlassStat value={String(totals.sites)} label="Live brand sites" />
              <GlassStat
                value={String(totals.research_assets)}
                label="Research assets"
                caption="Built from official data"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Pricing: split 5/7, featured retainer card = the one glass moment */}
      <section className="bg-paper py-[8rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Pricing">
                Two ways to buy
              </SectionHeading>
              <p className="type-body measure mt-6 text-ink-70">
                Per-lead pricing follows the tier and the niche: a
                very-high-tier enquiry in a competitive niche costs more than
                a low-tier one in a quiet one. Retainers suit firms that want
                a predictable monthly flow at a committed rate.
              </p>
              <p className="type-caption mt-6 !text-ink-70">
                All figures indicative, subject to proposal. Confirmed pricing
                is set out in a written proposal for your firm.
              </p>
            </div>
            <div className="grid gap-6 lg:col-span-7">
              <div
                className="border border-hairline bg-paper p-8"
                data-reveal
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <p className="type-eyebrow">Per lead</p>
                <p className="type-h2 mt-4">£40 to £120</p>
                <p className="type-caption mt-1 !text-ink-70">
                  per qualified lead, by tier and niche · indicative, subject
                  to proposal
                </p>
                <ul className="type-body mt-6 space-y-2 text-ink-70">
                  <li className="hairline-b pb-2">Pay only for verified, graded enquiries</li>
                  <li className="hairline-b pb-2">Tier visible before purchase</li>
                  <li className="pb-1">Trial batches available before any commitment</li>
                </ul>
              </div>
              <GlassCard className="p-8" data-reveal>
                <p className="type-eyebrow">Monthly retainer</p>
                <p className="type-h2 mt-4">From £500 per month</p>
                <p className="type-caption mt-1 !text-ink-70">
                  committed monthly volume at a blended rate · indicative,
                  subject to proposal
                </p>
                <ul className="type-body mt-6 space-y-2 text-ink-70">
                  <li className="hairline-b pb-2">Priority routing within your niche</li>
                  <li className="hairline-b pb-2">Blended per-lead rate below spot pricing</li>
                  <li className="hairline-b pb-2">Monthly reporting on volume, tiers and outcomes</li>
                  <li className="pb-1">Exclusivity options by niche or region</li>
                </ul>
                <div className="mt-8">
                  <Button href="/contact">Request a proposal</Button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Verification stack: numbered editorial flow, tight rhythm change */}
      <section className="bg-paper-2 grain py-[11rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Lead quality">
            Five checks before a lead exists
          </SectionHeading>
          <p className="type-lead measure mt-6 text-ink-70">
            A submission is not a lead. It becomes one only after it has
            cleared every stage below, in order. Submissions that fail any
            stage are discarded before grading.
          </p>
          <ol className="mt-16">
            {verificationSteps.map((step, i) => (
              <li
                key={step.title}
                className="hairline-b grid gap-4 py-8 md:grid-cols-12"
                data-reveal
                style={{ "--i": Math.min(i, 4) } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="font-display type-h2 nums-lining text-ink-45 md:col-span-1"
                >
                  {i + 1}
                </span>
                <h3 className="type-h3 md:col-span-3">{step.title}</h3>
                <p className="type-body text-ink-70 md:col-span-7 md:col-start-5">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 · Volume evidence: wide chart band */}
      <section className="cv-auto bg-paper py-[8rem]">
        <div className="mx-auto max-w-[1360px] px-(--gutter)">
          <div className="max-w-[46rem]">
            <SectionHeading eyebrow="Volume">
              What the estate is producing
            </SectionHeading>
            <p className="type-body measure mt-6 text-ink-70">
              Qualified enquiries across all 15 sites: 5 in April 2026, 12 in
              May, 40 in June and 56 so far in July. The trend is steep, but
              it is fitted on only three complete months. The forecast band
              is a run-rate estimate from the trailing 30 days, so treat it
              as a wide early estimate rather than a promise of volume.
            </p>
          </div>
          <div className="mt-14" data-reveal>
            <MonthlyLeadsChart
              monthly={monthly}
              forecast={forecast}
              ariaLabel="Estate-wide qualified enquiries by month, April to July 2026, with a two-month forecast band of 50 to 79 around a mid estimate of 64 per month"
              fig={1}
              source="Ashfield estate lead records, July 2026. Forecast: bootstrap of trailing 30-day daily lead counts, 90% band, projected flat for two months. Trend: Poisson fit on three complete months."
              caption="Estate-wide qualified enquiries by month, with forecast band. July is a partial month."
            />
          </div>
        </div>
      </section>

      {/* 5 · Terms: tight band, ruled definition list */}
      <section className="bg-paper py-[3rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <HairlineRule strong />
          <div className="grid gap-10 py-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeading eyebrow="Terms" as="h2">
                Dedupe and exclusivity
              </SectionHeading>
            </div>
            <dl className="space-y-8 md:col-span-7 md:col-start-6">
              <div className="hairline-b pb-6">
                <dt className="type-h3">Each lead sold once</dt>
                <dd className="type-body mt-2 text-ink-70">
                  A lead is routed to one firm. It is not resold, recycled or
                  offered to a second buyer if the first passes.
                </dd>
              </div>
              <div className="hairline-b pb-6">
                <dt className="type-h3">Estate-wide deduplication</dt>
                <dd className="type-body mt-2 text-ink-70">
                  Repeat enquiries from the same person are matched across all
                  15 sites and billed once, whichever brand they arrived
                  through.
                </dd>
              </div>
              <div>
                <dt className="type-h3">Exclusivity by agreement</dt>
                <dd className="type-body mt-2 text-ink-70">
                  Exclusive routing for a niche, or a niche and region, is
                  available on retainer terms and priced in the proposal.
                  Replacement terms for leads that fail verification after
                  handover are set out in the same agreement.
                </dd>
              </div>
            </dl>
          </div>
          <HairlineRule strong />
        </div>
      </section>

      {/* 6 · FAQ */}
      <section className="bg-paper-2 py-[6rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Questions">
            Before you ask
          </SectionHeading>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.question} className="hairline-b pb-8">
                <h3 className="type-h3">{f.question}</h3>
                <p className="type-body mt-3 text-ink-70">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Closing CTA: the one centred section */}
      <section className="grain bg-paper-3 py-[11rem]">
        <div className="mx-auto max-w-[52rem] px-(--gutter) text-center">
          <h2 className="type-h1">Start with a sample, not a contract</h2>
          <p className="type-lead mx-auto mt-6 max-w-[38rem] text-ink-70">
            Tell us your niche and capacity. We will send a proposal with
            anonymised lead examples, tier definitions and confirmed pricing
            for your firm.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" href="/contact">
              Request a proposal
            </Button>
            <Button variant="secondary" size="lg" href="/rent-a-site">
              Or rent a whole site
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
