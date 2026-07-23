import type { Metadata } from "next";
import {
  JsonLd,
  buildFaqPage,
  type FaqEntry,
} from "@accounting-network/web-shared/schema";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassStat } from "@/components/glass/GlassStat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { estateTotals, fmtNum } from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "Rent a niche accounting site",
  description:
    "Rent a complete, live niche accounting site: established domain authority, a running content engine, proprietary research assets and a verified lead flow, operated for your firm.",
  alternates: { canonical: `${siteConfig.url}/rent-a-site` },
  openGraph: {
    title: `Rent a niche accounting site | ${siteConfig.name}`,
    description:
      "A complete, live niche accounting site operated for your firm: domain authority, content engine, research assets and verified lead flow.",
    url: `${siteConfig.url}/rent-a-site`,
    type: "website",
  },
};

const included = [
  {
    part: "Established domain",
    detail:
      "A live site with existing search presence in its niche, not a fresh domain waiting to mature.",
  },
  {
    part: "Content engine",
    detail:
      "A running editorial pipeline: technical guides, calculators and topical updates kept current against UK tax legislation.",
  },
  {
    part: "Proprietary research assets",
    detail:
      "Data indexes and research hubs built from official sources (ONS, Companies House), the authority layer search engines and AI answer surfaces cite.",
  },
  {
    part: "Verified lead flow",
    detail:
      "Every enquiry passes honeypot filtering, real-time phone lookup, email verification and deduplication, then receives a tier grade from very high to low.",
  },
  {
    part: "Nurture infrastructure",
    detail:
      "Automated follow-up sequences, lead notifications and reporting, so enquiries that do not convert on day one are not lost.",
  },
];

const inclusions: [string, string][] = [
  ["Hosting, domain and technical maintenance", "Included, we operate the stack"],
  ["Content production and legislative updates", "Included, ongoing"],
  ["Research asset maintenance and new data releases", "Included, ongoing"],
  ["Lead verification, grading and deduplication", "Included, every enquiry"],
  ["Lead delivery by email with tier grade", "Included, real time"],
  ["Monthly performance reporting", "Included"],
  ["Nurture sequences for unconverted enquiries", "Included"],
  ["Your firm's branding on the site", "By agreement, niche dependent"],
  ["Paid advertising spend", "Not included, organic only by default"],
];

// ponytail: FAQ answers deliberately price-free so the identical text can sit in FAQPage JSON-LD.
const faqs: FaqEntry[] = [
  {
    question: "What does renting a site actually mean?",
    answer:
      "You take over the lead flow from one of our live niche accounting sites. We continue to own and operate the site, its content engine and its research assets; qualified enquiries from that site route exclusively to your firm for the term of the agreement.",
  },
  {
    question: "Do I get exclusivity for my niche?",
    answer:
      "Yes, within the agreed scope. A rented site routes its enquiries to one firm only. Exclusivity can be set at niche level or extended to territory level, which is reflected in the proposal.",
  },
  {
    question: "How are leads verified before they reach us?",
    answer:
      "Every enquiry passes honeypot filtering, real-time phone number lookup, email verification and deduplication against prior submissions, then receives a tier grade from very high to low before delivery.",
  },
  {
    question: "How quickly does a rented site start producing enquiries?",
    answer:
      "The sites are already live and producing, so lead flow starts when routing is switched to your firm. Volume varies by niche and season; our estate history is short, so we share actual recent monthly figures in the proposal rather than long-run projections.",
  },
  {
    question: "What happens to the site and the leads if we end the agreement?",
    answer:
      "The site, its content and its research assets remain ours; lead routing is switched off at the end of the notice period. Details of enquiries delivered during the term remain yours, subject to the data-sharing terms agreed at the outset.",
  },
  {
    question: "Can we rent more than one niche?",
    answer:
      "Yes. Firms with capacity across several specialisms can rent multiple sites under one agreement, with combined reporting and a single monthly invoice.",
  },
  {
    question: "How is pricing set?",
    answer:
      "Pricing is indicative until proposal. It depends on the niche, the site's current enquiry volume and the level of exclusivity you want. Every engagement starts with a written proposal setting out the exact figures for your firm.",
  },
];

const indicative = (
  <p className="type-caption mt-4 !text-ink-70">Indicative, subject to proposal.</p>
);

export default function RentASitePage() {
  const totals = estateTotals();
  return (
    <>
      <JsonLd data={buildFaqPage(faqs)!} />

      {/* Hero: paper-3, ghost numeral, glass stat chips (glass moment 1) */}
      <section className="bg-paper-3 grain relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-(--gutter) py-[8rem]">
          <span
            aria-hidden="true"
            className="ghost-numeral absolute right-[-2rem] top-8 hidden text-[16rem] lg:block"
          >
            {fmtNum(totals.sites)}
          </span>
          <div className="relative max-w-[46rem]">
            <SectionHeading eyebrow="Rent a site" as="h1">
              A working practice growth engine, rented, not built
            </SectionHeading>
            <p className="type-lead measure mt-6">
              Renting one of our niche sites means taking over the lead flow of
              a live site that already ranks and carries its own research
              assets. The domain authority, the
              content engine, the data assets and the verification stack are
              already running. Your firm takes the enquiries.
            </p>
          </div>
          <div className="relative mt-14 grid max-w-[40rem] gap-6 sm:grid-cols-2">
            <GlassStat
              value={fmtNum(totals.sites)}
              label="Live brand sites"
              caption="Across UK accounting niches"
            />
            <GlassStat
              value={fmtNum(totals.research_assets)}
              label="Proprietary research assets"
              caption="Built from ONS and Companies House data"
            />
          </div>
        </div>
      </section>

      {/* Tight band */}
      <div className="border-y border-hairline bg-paper py-[3rem]">
        <p className="type-caption mx-auto max-w-[1200px] px-(--gutter) !text-ink-70">
          All pricing on this page is indicative and subject to proposal. No
          figure here constitutes an offer.
        </p>
      </div>

      {/* What renting means: split 5/7, paper, py-11rem */}
      <section className="bg-paper py-[11rem] cv-auto">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-(--gutter) lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="What you rent">
                Five things a new website does not have
              </SectionHeading>
              <p className="type-body measure mt-6 text-ink-70">
                A firm building this from scratch faces years of content
                production, data work and domain maturation before the first
                qualified enquiry. A rented site skips the wait because the
                asset already exists.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul>
              {included.map((item, i) => (
                <li
                  key={item.part}
                  data-reveal
                  style={{ "--i": Math.min(i, 4) } as React.CSSProperties}
                  className="border-b border-hairline py-8 first:pt-0"
                >
                  <p className="type-h3">{item.part}</p>
                  <p className="type-body measure mt-2 text-ink-70">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing: paper-2, unequal anatomy, featured glass tier (glass moment 2) */}
      <section className="bg-paper-2 grain py-[8rem] cv-auto">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Indicative pricing">
            Three ways to take a site
          </SectionHeading>
          <p className="type-body measure mt-6 text-ink-70">
            Setup runs from £1,500 to £3,000 and the monthly fee from £750 to
            £1,500, positioned within those bands by niche and exclusivity.
            Exact figures are set in a written proposal.
          </p>

          <div className="mt-14 grid items-end gap-8 lg:grid-cols-12">
            {/* Single niche: flat hairline card */}
            <div className="border border-hairline bg-paper p-8 lg:col-span-4" data-reveal>
              <p className="type-eyebrow">Single niche</p>
              <p className="type-h3 mt-4">One site, one specialism</p>
              <p className="type-body mt-4 text-ink-70">
                Rent one niche site matched to a specialism your firm already
                serves. Setup and monthly fee sit toward the lower end of the
                indicative bands.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="type-caption !text-ink-70">Setup from £1,500</li>
                <li className="type-caption !text-ink-70">From £750 per month</li>
                <li className="type-caption !text-ink-70">Niche-level exclusivity</li>
              </ul>
              {indicative}
            </div>

            {/* Featured: glass, taller */}
            <GlassCard className="relative p-10 lg:col-span-4 lg:min-h-[34rem]">
              <p className="type-eyebrow">Multi-niche</p>
              <p className="type-h3 mt-4">Two or more sites, one agreement</p>
              <p className="type-body mt-4 text-ink-70">
                For firms with capacity across specialisms. Each site is priced
                within the indicative bands, with combined reporting, a single
                invoice and priority on newly built niches.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="type-caption !text-ink-70">Setup £1,500 to £3,000 per site</li>
                <li className="type-caption !text-ink-70">£750 to £1,500 per site per month</li>
                <li className="type-caption !text-ink-70">Niche-level exclusivity on each</li>
                <li className="type-caption !text-ink-70">Combined monthly reporting</li>
              </ul>
              <div className="mt-8">
                <Button href="/contact">Request a proposal</Button>
              </div>
              {indicative}
            </GlassCard>

            {/* Exclusive territory: flat hairline card */}
            <div className="border border-hairline bg-paper p-8 lg:col-span-4" data-reveal>
              <p className="type-eyebrow">Exclusive territory</p>
              <p className="type-h3 mt-4">A niche locked to your firm</p>
              <p className="type-body mt-4 text-ink-70">
                Full exclusivity on a niche's enquiry flow, including any future
                sites we build in it. Pricing sits at the upper end of the
                indicative bands and is always bespoke.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="type-caption !text-ink-70">Setup up to £3,000</li>
                <li className="type-caption !text-ink-70">Up to £1,500 per month</li>
                <li className="type-caption !text-ink-70">Territory-level exclusivity</li>
              </ul>
              {indicative}
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions table: paper, py-6rem */}
      <section className="bg-paper py-[6rem] cv-auto">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Inclusions">What the fee covers</SectionHeading>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline-strong">
                  <th className="type-eyebrow py-3 pr-6 font-medium">Item</th>
                  <th className="type-eyebrow py-3 font-medium">Position</th>
                </tr>
              </thead>
              <tbody>
                {inclusions.map(([item, status]) => (
                  <tr key={item} className="border-b border-hairline">
                    <td className="type-body py-4 pr-6">{item}</td>
                    <td className="type-body py-4 text-ink-70">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Handover + exclusivity: paper-3, py-8rem, split 7/5 reversed */}
      <section className="bg-paper-3 grain py-[8rem] cv-auto">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-(--gutter) lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Terms">Handover and exclusivity</SectionHeading>
            <div className="measure mt-6 space-y-5">
              <p className="type-body text-ink-70">
                Handover is a routing change, not a migration. Once terms are
                agreed, enquiries from the site are directed to your firm, your
                notification addresses are configured, and delivery is tested
                with a flagged probe enquiry before anything goes live.
                Handover typically completes within days of signature because
                the site itself does not change hands.
              </p>
              <p className="type-body text-ink-70">
                Exclusivity is contractual and absolute within its scope. While
                your agreement runs, no other firm receives enquiries from your
                rented site, and territory agreements extend that lock to the
                niche as a whole. We do not operate waiting lists behind live
                agreements or split a site's enquiry flow between firms.
              </p>
              <p className="type-body text-ink-70">
                Agreements run on a rolling basis with a notice period set in
                the proposal. On termination, routing is switched off at the end
                of notice; the site, its content and its research assets remain
                with {siteConfig.company.legalName}, and the enquiry data
                delivered during the term remains with your firm under the
                data-sharing terms agreed at the outset.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-hairline bg-paper p-8 lg:mt-16">
              <p className="type-eyebrow">In practice</p>
              <ul className="mt-4 space-y-4">
                <li className="type-body text-ink-70">Routing switched, not sites transferred</li>
                <li className="type-body text-ink-70">Probe-tested delivery before go-live</li>
                <li className="type-body text-ink-70">One firm per site, no split flows</li>
                <li className="type-body text-ink-70">Rolling term, notice set in proposal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: paper, py-11rem */}
      <section className="bg-paper py-[11rem] cv-auto">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Questions">Frequently asked</SectionHeading>
          <div className="mt-10 max-w-[52rem]">
            {faqs.map((f) => (
              <details key={f.question} className="group border-b border-hairline py-6">
                <summary className="type-h3 cursor-pointer list-none marker:content-none">
                  {f.question}
                </summary>
                <p className="type-body measure mt-4 text-ink-70">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA: the one centered section, paper-2 */}
      <section className="bg-paper-2 grain py-[8rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter) text-center">
          <HairlineRule strong />
          <h2 className="type-h1 mt-12">Ask for the proposal</h2>
          <p className="type-lead mx-auto mt-6 max-w-[38rem]">
            Tell us your specialisms and capacity. We reply with a written
            proposal covering the site, its recent enquiry history and exact
            pricing for your firm.
          </p>
          <div className="mt-10">
            <Button size="lg" href="/contact">
              Start an enquiry
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
