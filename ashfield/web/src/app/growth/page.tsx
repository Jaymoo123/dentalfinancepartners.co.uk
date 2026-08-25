import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { CSSProperties } from "react";
import { GlassStat } from "@/components/glass/GlassStat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MonthlyLeadsChart } from "@/components/estate/MonthlyLeadsChart";
import { FirmGrowthChart, type GrowthScenario } from "@/components/estate/FirmGrowthChart";
import {
  forecastSeries,
  leadsSeries,
  estateTotals,
  fmtNum,
  monthLabel,
  snapshot,
} from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "Growth | Ashfield Trading",
  description:
    "Estate-wide enquiry trajectory across 15 niche accounting brand sites, with methodology, and an illustrative model of what a monthly lead flow can mean for a firm.",
  alternates: { canonical: `${siteConfig.url}/growth` },
};

/* ---------------------------------------------------------------- */
/* Illustrative firm-side model, computed transparently from the     */
/* assumptions in the table below. Not a forecast.                   */
/* ---------------------------------------------------------------- */
const CONVERSION = 0.2; // 1 in 5 qualified enquiries becomes a client
const AVG_FIRST_YEAR_FEE = 1500; // £ per client, first-year recurring fees
const MONTHS = 12;

const SCENARIO_DEFS = [
  { label: "10 leads/mo", leadsPerMonth: 10 },
  { label: "20 leads/mo", leadsPerMonth: 20 },
  { label: "35 leads/mo", leadsPerMonth: 35 },
] as const;

function buildScenarios(): GrowthScenario[] {
  return SCENARIO_DEFS.map(({ label, leadsPerMonth }) => {
    const clientsPerMonth = leadsPerMonth * CONVERSION;
    const feePerMonthCohort = clientsPerMonth * AVG_FIRST_YEAR_FEE;
    return {
      label,
      series: Array.from({ length: MONTHS }, (_, i) => ({
        period: `M${i + 1}`,
        value: feePerMonthCohort * (i + 1), // cumulative annualised fee income won
      })),
    };
  });
}

export default function GrowthPage() {
  const monthly = leadsSeries();
  const forecast = forecastSeries();
  const totals = estateTotals();
  const trend = snapshot.leads.trend;
  const latest = monthly[monthly.length - 1];
  const fcMid = forecast[0];
  const scenarios = buildScenarios();
  const total12 = (leads: number) =>
    leads * CONVERSION * AVG_FIRST_YEAR_FEE * MONTHS;

  return (
    <div>
      {/* 1. Header, paper, asymmetric */}
      <section className="mx-auto max-w-[1200px] px-(--gutter) pb-24 pt-24">
        <div className="max-w-[52rem]" data-reveal>
          <SectionHeading eyebrow="Growth" as="h1">
            The trajectory, and what it could mean for a firm
          </SectionHeading>
          <p className="type-lead measure mt-6 text-ink-70">
            Two views. First, the estate itself: enquiries across all{" "}
            {totals.sites} brand sites, month by month, with a stated forecast
            band and its full methodology. Second, an illustrative model of
            what a given lead flow can mean for an accounting firm, built from
            assumptions you can see and challenge.
          </p>
        </div>
      </section>

      {/* 2. Estate numbers: glass stat panels over ghost numeral, paper-3 */}
      <section className="bg-paper-3 grain py-24">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="Estate trajectory">
            Enquiries, estate-wide
          </SectionHeading>
          <div className="relative mt-14">
            <span
              aria-hidden="true"
              className="ghost-numeral absolute -top-16 left-2 text-[12rem]"
            >
              {fmtNum(latest.count)}
            </span>
            <div className="relative grid gap-6 py-8 sm:grid-cols-3">
              <GlassStat
                value={fmtNum(latest.count)}
                label="Enquiries this month"
                caption={`${monthLabel(latest.month)}, month in progress`}
              />
              <GlassStat
                value={fmtNum(fcMid.mid)}
                label="Run-rate, per month"
                caption={`90% band ${fmtNum(fcMid.low)} to ${fmtNum(fcMid.high)}`}
              />
              <GlassStat
                value={fmtNum(totals.sites)}
                label="Live brand sites"
                caption={`${fmtNum(totals.research_assets)} research assets`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chart band, wide 1360px, paper, split with hanging methodology */}
      <section className="mx-auto max-w-[1360px] px-(--gutter) py-[11rem]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8" data-reveal>
            <MonthlyLeadsChart
              monthly={monthly}
              forecast={forecast}
              ariaLabel={`Estate-wide enquiries by month, ${monthLabel(monthly[0].month)} to ${monthLabel(latest.month)}, with a flat forecast band of ${fmtNum(fcMid.low)} to ${fmtNum(fcMid.high)} per month for the next two months.`}
              fig={1}
              caption={`Estate-wide enquiries by month, ${monthLabel(monthly[0].month)} to ${monthLabel(latest.month)} (partial), with flat run-rate projection`}
              source={`Estate lead ledger, aggregate monthly counts, ${monthLabel(latest.month)}`}
            />
          </div>
          <aside className="lg:col-span-4" data-reveal style={{ "--i": 1 } as CSSProperties}>
            <h3 className="type-eyebrow border-b border-hairline pb-3">
              Methodology
            </h3>
            <ul className="type-caption mt-4 space-y-3 !text-ink-70">
              <li className="border-b border-hairline pb-3">
                Counts are enquiries that passed submission validation, with
                same-email duplicates within 24 hours merged and test entries
                excluded.
              </li>
              <li className="border-b border-hairline pb-3">
                The projection is a flat run-rate, not a growth extrapolation:
                a trailing 30-day bootstrap of daily arrivals gives a mid
                estimate of {fmtNum(fcMid.mid)} per month with a 90% interval
                of {fmtNum(fcMid.low)} to {fmtNum(fcMid.high)}, held flat for
                the next two months.
              </li>
              <li className="border-b border-hairline pb-3">
                History is short. The series is four months old and the fitted
                trend rests on only {trend.months_fitted} complete months, so
                the steep early growth should not be read as a durable rate.
                We deliberately project flat rather than extend it.
              </li>
              <li className="pb-1">
                {monthLabel(latest.month)} is a partial month; its final count
                will differ from the figure shown.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* 3b. Tight bridge band: one line, hairline-ruled, ~3rem tempo */}
      <section className="border-y border-hairline py-12">
        <div className="mx-auto max-w-[1200px] px-(--gutter)" data-reveal>
          <p className="type-caption !text-ink-70">
            That is what the estate produces. The second question is what a
            flow like that is worth to the firm receiving it.
          </p>
        </div>
      </section>

      {/* 4. Firm-side model: tight intro band + assumptions table + chart, paper-2 */}
      <section className="bg-paper-2 grain py-24">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <SectionHeading eyebrow="Firm-side model">
                What a lead flow can mean for a firm
              </SectionHeading>
              <p className="type-body measure mt-6 text-ink-70">
                A simple, transparent arithmetic exercise: take a monthly flow
                of qualified leads, apply a conversion assumption, and value
                each new client at an average first-year fee. The chart shows
                cumulative first-year fee income won over twelve months for
                three lead volumes. Every input is listed below; change any of
                them and the lines move accordingly.
              </p>
              <p className="type-body mt-6 border-l-2 border-navy pl-4 font-medium">
                Illustrative model, not a forecast. Nothing here is a
                projection of your firm&rsquo;s results or a guarantee of
                revenue. Actual conversion and fee levels vary by niche, firm
                and service mix.
              </p>

              <h3 className="type-eyebrow mt-12 border-b border-hairline-strong pb-3">
                Assumptions
              </h3>
              <table className="mt-2 w-full text-left">
                <tbody className="type-caption !text-ink-70">
                  <tr className="border-b border-hairline">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      Lead volumes modelled
                    </th>
                    <td className="py-3 nums-lining">10, 20 and 35 qualified leads per month</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      Conversion to client
                    </th>
                    <td className="py-3 nums-lining">20% (one in five qualified enquiries)</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      Average first-year fee
                    </th>
                    <td className="py-3 nums-lining">£1,500 per new client</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      Period
                    </th>
                    <td className="py-3 nums-lining">12 months, constant lead flow, no churn modelled</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-normal">
                      Calculation
                    </th>
                    <td className="py-3 nums-lining">
                      leads × 20% × £1,500, accumulated month by month
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-7" data-reveal style={{ "--i": 1 } as CSSProperties}>
              <FirmGrowthChart
                scenarios={scenarios}
                ariaLabel={`Illustrative cumulative first-year fee income over 12 months at 10, 20 and 35 leads per month, assuming 20% conversion and a £1,500 average first-year fee: roughly £${fmtNum(total12(10))}, £${fmtNum(total12(20))} and £${fmtNum(total12(35))} respectively by month 12.`}
                fig={2}
                caption="Illustrative cumulative first-year fee income (£) over 12 months at three lead volumes, under the assumptions in the adjacent table. Illustrative model, not a forecast"
                source="Ashfield illustrative model, assumptions as stated"
              />
              <p className="type-caption mt-4 !text-ink-70">
                Under these assumptions the three volumes reach roughly £
                {fmtNum(total12(10))}, £{fmtNum(total12(20))} and £
                {fmtNum(total12(35))} of cumulative first-year fees by month
                twelve. That is the arithmetic of the stated inputs, nothing
                more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA: the one centred section */}
      <section className="bg-paper-3 py-32 text-center">
        <div className="mx-auto max-w-[1200px] px-(--gutter)" data-reveal>
          <h2 className="type-h2 mx-auto max-w-[28ch]">
            Test the model against your own numbers
          </h2>
          <p className="type-lead mx-auto mt-6 max-w-[46ch] text-ink-70">
            Tell us your niche and capacity, and we will set out what the
            estate is actually producing there, with the same transparency as
            above.
          </p>
          <div className="mt-10">
            <Button size="lg" href="/contact">
              Start a conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
