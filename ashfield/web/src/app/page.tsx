import type { Metadata } from "next";
import Link from "next/link";
import { GlassStat } from "@/components/glass/GlassStat";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MonthlyLeadsChart } from "@/components/estate/MonthlyLeadsChart";
import {
  estateSites,
  estateTotals,
  fmtNum,
  forecastSeries,
  leadsSeries,
  monthLabel,
} from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "Ashfield Trading",
  description:
    "Ashfield Trading Ltd operates 15 specialist UK accounting brand sites built on proprietary research. Accounting firms rent a complete niche site or buy qualified, verified leads.",
};

export default function HomePage() {
  const sites = estateSites();
  const totals = estateTotals();
  const monthly = leadsSeries();
  const forecast = forecastSeries();
  const latest = monthly[monthly.length - 1];
  const totalLeads = monthly.reduce((s, m) => s + m.count, 0);

  return (
    <>
      {/* Row 1 - hero: paper-3, ~100svh, asymmetric, ghost numeral + chart under chips */}
      <section className="grain relative flex min-h-[max(640px,100svh)] flex-col justify-center overflow-hidden bg-paper-3">
        <div className="mx-auto w-full max-w-[1200px] px-(--gutter) pb-24 pt-32">
          <p className="type-eyebrow" data-reveal>
            Ashfield Trading Ltd · fifteen brands, one operator
          </p>
          <h1
            className="type-display mt-6 max-w-[13ch]"
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            The firms clients find <em>first</em>
          </h1>
          <p
            className="type-lead measure mt-8"
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Ashfield builds and runs specialist accounting websites, one for
            each niche, each backed by proprietary research from official data.
            Accounting firms rent a complete site, or buy the qualified
            enquiries it produces.
          </p>
        </div>

        {/* Contrast layers: ghost "15" + the leads line running under the chips */}
        <div className="relative mx-auto w-full max-w-[1200px] px-(--gutter) pb-16">
          <span
            aria-hidden="true"
            className="ghost-numeral absolute -top-24 right-[6%] text-[clamp(9rem,22vw,19rem)]"
          >
            15
          </span>
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 -top-8 h-44 w-full"
            viewBox="0 0 900 176"
            preserveAspectRatio="none"
          >
            <path
              d="M0 168 L225 154 L450 98 L675 66 L900 30"
              fill="none"
              stroke="#14161a"
              strokeWidth="1.5"
            />
            <path
              d="M0 172 L300 160 L600 124 L900 96"
              fill="none"
              stroke="#1e2a5e"
              strokeWidth="1.5"
              strokeDasharray="2 6"
            />
          </svg>
          {/* Glass moment 1 of 3: hero stat chips */}
          <div className="relative grid gap-5 sm:grid-cols-3">
            <GlassStat
              value={fmtNum(totals.sites)}
              label="Live brand sites"
              caption="Each a single UK accounting niche"
            />
            <GlassStat
              value={fmtNum(totals.research_assets)}
              label="Proprietary research assets"
              caption="Official sources including ONS and Companies House"
            />
            <GlassStat
              value={fmtNum(latest?.count ?? 0)}
              label={`Qualified enquiries, ${latest ? monthLabel(latest.month) : "latest month"}`}
              caption="Month in progress, estate-wide"
            />
          </div>
        </div>
      </section>

      {/* Row 2 - brand strip: tight band, hairline top+bottom, paper */}
      <section className="hairline-t hairline-b bg-paper py-12">
        <div className="mx-auto max-w-[1360px] px-(--gutter)">
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {sites.map((s) => (
              <li
                key={s.id}
                className="type-caption whitespace-nowrap !text-ink-45 transition-colors duration-[180ms] hover:!text-ink"
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Row 3 - thesis: sticky-left 5/7 split, paper, py-11rem, serif pull-quote */}
      <section className="cv-auto bg-paper py-[11rem]">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-(--gutter) lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="The thesis">
                Own the niche, not the postcode
              </SectionHeading>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="type-lead measure" data-reveal>
              Most accounting firms compete for the same local search terms as
              every other firm in town. The clients worth winning do not search
              locally. A dentist buying a practice, a contractor inside IR35, a
              landlord facing a new tax regime: each searches their problem,
              nationally.
            </p>
            <p className="type-body measure mt-6 text-ink-70" data-reveal>
              Ashfield builds one authoritative site per niche and keeps it fed
              with original research: formation indexes, insolvency series,
              survival analyses, all compiled from official sources and
              published nowhere else. That research earns citations, the
              citations earn rankings, and the rankings produce enquiries from
              businesses that need a specialist.
            </p>
            <p className="type-body measure mt-6 text-ink-70" data-reveal>
              Firms plug into the output two ways: rent a whole site as their
              own storefront in a niche, or buy the qualified leads a site
              already generates. Either way, the research engine and the
              verification stack behind it stay maintained by us.
            </p>
            <blockquote className="mt-12 border-l border-hairline-strong pl-8" data-reveal>
              <p className="type-h2 italic">
                A niche site outranks a local firm because it answers the
                question the client actually asked.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Row 4 - portfolio: full-width hairline-ruled list, NOT cards, paper-2, py-8rem */}
      <section className="grain cv-auto bg-paper-2 py-32">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="The portfolio">
            Fifteen sites, fifteen niches
          </SectionHeading>
          <ol className="mt-14">
            {sites.map((s, i) => (
              <li
                key={s.id}
                className="hairline-t grid grid-cols-[3ch_1fr] items-baseline gap-x-6 py-5 last:border-b last:border-hairline sm:grid-cols-[3ch_minmax(14rem,18rem)_1fr_auto]"
                data-reveal
                style={{ "--i": i % 5 } as React.CSSProperties}
              >
                <span className="type-caption nums-lining">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="type-h3">{s.name}</span>
                <span className="type-caption col-start-2 sm:col-start-3 sm:!text-ink-70">
                  {s.sector}
                </span>
                <span className="type-caption col-start-2 nums-lining sm:col-start-4">
                  {s.research_assets.length > 0
                    ? `${s.research_assets.length} research asset${s.research_assets.length === 1 ? "" : "s"}`
                    : "content site"}
                </span>
              </li>
            ))}
          </ol>
          <p className="type-caption mt-6">
            Every brand is a trading name of Ashfield Trading Ltd, company
            16358723.
          </p>
        </div>
      </section>

      {/* Row 5 - numbers: glass stat panels over ghost numerals, paper-3, py-8rem, right overhang */}
      <section className="grain cv-auto relative overflow-hidden bg-paper-3 py-32">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="lg:max-w-[58%]">
            <SectionHeading eyebrow="The numbers">
              What the estate has produced since April
            </SectionHeading>
            <p className="type-body measure mt-6 text-ink-70">
              Estate-wide qualified enquiries, after honeypot filtering, phone
              lookup, email verification and deduplication. The history is
              short, three complete months, so treat the trend as early signal
              rather than an established rate.
            </p>
          </div>
          <div className="relative mt-16">
            <span
              aria-hidden="true"
              className="ghost-numeral absolute -top-20 left-[8%] text-[clamp(8rem,18vw,15rem)] nums-lining"
            >
              {fmtNum(totalLeads)}
            </span>
            {/* Glass moment 2 of 3: Numbers stat panels; grid overhangs the right edge */}
            <div className="relative grid gap-5 sm:grid-cols-3 lg:-mr-[calc((100vw-1200px)/2+var(--gutter))] lg:pr-(--gutter)">
              <GlassStat
                value={fmtNum(totalLeads)}
                label="Qualified enquiries since April 2026"
                caption="Estate-wide, all fifteen sites"
              />
              <GlassStat
                value={fmtNum(forecast[0]?.mid ?? 0)}
                label="Forecast monthly run rate"
                caption={`90% band ${fmtNum(forecast[0]?.low ?? 0)} to ${fmtNum(forecast[0]?.high ?? 0)}, next two months`}
              />
              <GlassStat
                value={fmtNum(totals.research_assets)}
                label="Research assets live"
                caption="Official sources including ONS and Companies House"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Row 6 - how it works teaser: split 7/5 reversed, paper, py-11rem */}
      <section className="cv-auto bg-paper py-[11rem]">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-(--gutter) lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ol className="space-y-0">
              {[
                [
                  "Enquire",
                  "Tell us the niche and whether you want the site or its leads.",
                ],
                [
                  "See the evidence",
                  "We send an anonymised proposal: lead volumes, tier grades, verification methodology, indicative terms.",
                ],
                [
                  "Agree terms",
                  "Exclusivity, routing and reporting are settled in writing before anything goes live.",
                ],
                [
                  "Go live",
                  "Site handover or lead routing switches on, with monthly reporting from day one.",
                ],
              ].map(([title, body], i) => (
                <li
                  key={title}
                  className="hairline-t grid grid-cols-[4rem_1fr] gap-x-6 py-7"
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="type-stat !text-[2.5rem] text-ink-45">
                    {i + 1}
                  </span>
                  <span>
                    <span className="type-h3 block">{title}</span>
                    <span className="type-body mt-1 block max-w-[52ch] text-ink-70">
                      {body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="How it works">
                From enquiry to live in four steps
              </SectionHeading>
              <p className="type-body measure mt-6 text-ink-70">
                Two tracks, renter and lead buyer, both starting from a single
                enquiry and an evidence pack rather than a sales call.
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/how-it-works">
                  See the full process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 7 - charts band: 1360px, paper, py-8rem */}
      <section className="cv-auto bg-paper py-32">
        <div className="mx-auto max-w-[1360px] px-(--gutter)">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionHeading eyebrow="Trajectory">
                Enquiries by month
              </SectionHeading>
              <p className="type-stat mt-8 nums-lining">{fmtNum(totalLeads)}</p>
              <p className="type-eyebrow mt-2">
                Qualified enquiries to date
              </p>
              <p className="type-caption measure mt-6 !text-ink-70">
                Growth is steep but fitted on only three complete months.
                Illustrative trend, not a forecast of future volumes.
              </p>
            </div>
            <div className="lg:col-span-9">
              <MonthlyLeadsChart
                monthly={monthly}
                forecast={forecast}
                ariaLabel={`Estate-wide qualified enquiries by month, ${monthly.length ? monthLabel(monthly[0].month) : ""} to ${latest ? monthLabel(latest.month) : ""}, with a two-month forecast band.`}
                fig={1}
                caption="Estate-wide qualified enquiries by month, with two-month forecast band (90% interval)."
                source={`Ashfield estate lead records, ${latest ? monthLabel(latest.month) : "2026"}. Poisson trend on three complete months.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Row 8 - offers: 3 unequal tiers, featured Rent = glass + taller, paper-2, py-8rem */}
      <section className="grain cv-auto bg-paper-2 py-32">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="The offer">Two ways in</SectionHeading>
          <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
            {/* Glass moment 3 of 3: featured Rent tier */}
            <GlassCard className="px-8 py-10 lg:-mt-6 lg:pb-14">
              <p className="type-eyebrow">Rent a site</p>
              <p className="type-h2 mt-4">A whole niche, under your name</p>
              <p className="type-body mt-5 text-ink-70">
                Take over a complete brand site: content engine, research
                assets, lead flow and nurture infrastructure, run for you and
                branded to your firm.
              </p>
              <p className="type-body mt-6 nums-lining">
                Setup from £1,500 to £3,000, then £750 to £1,500 per month by
                niche and exclusivity.
              </p>
              <p className="type-caption mt-2">
                Indicative, subject to proposal.
              </p>
              <div className="mt-8">
                <Button href="/rent-a-site">About renting a site</Button>
              </div>
            </GlassCard>

            <div className="rounded-(--radius-card) border border-hairline bg-paper px-8 py-10">
              <p className="type-eyebrow">Buy leads</p>
              <p className="type-h3 mt-4">Qualified enquiries, per lead</p>
              <p className="type-body mt-5 text-ink-70">
                Verified, tier-graded enquiries from a niche site, routed to
                your inbox with deduplication and exclusivity terms agreed up
                front.
              </p>
              <p className="type-body mt-6 nums-lining">
                £40 to £120 per qualified lead by tier and niche; retainers
                from £500 per month.
              </p>
              <p className="type-caption mt-2">
                Indicative, subject to proposal.
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/buy-leads">
                  About buying leads
                </Button>
              </div>
            </div>

            <div className="rounded-(--radius-card) border border-hairline px-8 py-10">
              <p className="type-eyebrow">Partner</p>
              <p className="type-h3 mt-4">Something longer term</p>
              <p className="type-body mt-5 text-ink-70">
                For firms or investors interested in the estate itself rather
                than a single niche, we discuss structures case by case.
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/contact">
                  Start a conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 9 - closing CTA: the one centered section, paper-3, py-11rem, oversized serif */}
      <section className="grain cv-auto bg-paper-3 py-[11rem] text-center">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <h2 className="type-h1 mx-auto max-w-[20ch]" data-reveal>
            Pick a niche. We will show you what it already produces.
          </h2>
          <p
            className="type-lead mx-auto mt-6 max-w-[46ch]"
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            One enquiry gets you an anonymised evidence pack for the niche you
            care about: volumes, tiers, methodology, indicative terms.
          </p>
          <div className="mt-10" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <Button size="lg" href="/contact">
              Make an enquiry
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
