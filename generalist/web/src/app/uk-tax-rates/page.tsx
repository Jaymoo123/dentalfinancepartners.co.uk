import type { Metadata } from "next";
import Link from "next/link";
import { UK_TAX_RATES } from "@/lib/uk-tax-rates";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildBreadcrumb } from "@/lib/schema";

const pageUrl = `${siteConfig.url.replace(/\/$/, "")}/uk-tax-rates`;

export const metadata: Metadata = {
  title: "UK Tax Rates 2026/27, Reference for UK Business Owners",
  description:
    "Canonical 2026/27 UK tax rates: corporation tax, dividend tax, BADR, CGT, VAT, R&D, MTD ITSA dates, NI, pensions and IHT. Updated and citable. Plain-English notes for UK business owners.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "UK Tax Rates 2026/27, Holloway Davies",
    description:
      "Machine-readable reference of every UK tax rate a UK business owner needs in 2026/27.",
    url: pageUrl,
    type: "article",
  },
};

function pct(n: number) {
  return `${(n * 100).toFixed(n * 100 < 1 ? 2 : n * 100 % 1 === 0 ? 0 : 2)}%`;
}

function gbp(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}

function Row({
  label,
  value,
  anchor,
  duty = false,
}: {
  label: string;
  value: string;
  anchor?: string;
  /** Statutory start dates and deadlines take the warning ramp's first step. */
  duty?: boolean;
}) {
  return (
    <tr id={anchor} className="scroll-mt-24 border-b border-slate-200 last:border-0">
      <td className="py-2.5 pr-4 align-top text-slate-700">{label}</td>
      <td
        className={`py-2.5 whitespace-nowrap font-mono tabular-nums ${
          duty ? "font-semibold text-violet-700" : "text-slate-900"
        }`}
      >
        {value}
      </td>
    </tr>
  );
}

/** Table wrapper. `tone` is the card ground, set opposite to its section. */
function FigureCard({ tone, children }: { tone: "white" | "slate"; children: React.ReactNode }) {
  return (
    <div
      className={`mt-4 rounded-xl p-4 ring-1 ring-slate-200/70 sm:p-6 ${
        tone === "white" ? "bg-white" : "bg-slate-50"
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] text-left text-sm sm:text-base">
          <tbody>{children}</tbody>
        </table>
      </div>
      <ExampleFigureNote className="mt-3" />
    </div>
  );
}

function Section({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: string;
  tone: "white" | "slate";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-10 first:pt-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        <Link href={`#${id}`} className="transition-colors hover:text-primary-700">
          {title}
        </Link>
      </h2>
      <FigureCard tone={tone}>{children}</FigureCard>
    </section>
  );
}

export default function UkTaxRatesPage() {
  const r = UK_TAX_RATES;

  const dataset = buildDataset({
    name: "UK Tax Rates 2026/27 (Holloway Davies reference)",
    description:
      "Canonical machine-readable UK tax rates for the 2026/27 tax year: corporation tax, dividend tax, income tax, NI, CGT, BADR, VAT, R&D, MTD ITSA, pensions, IHT. Maintained and citable.",
    path: "/uk-tax-rates",
    distributionPath: "/api/uk-tax-rates.json",
    dateModified: r.lastUpdated,
    temporalCoverage: `${r.taxYearStart}/${r.taxYearEnd}`,
    keywords: [
      "UK tax rates 2026/27",
      "corporation tax",
      "dividend tax",
      "BADR",
      "CGT",
      "VAT",
      "R&D tax credits",
      "MTD ITSA",
      "UK business tax",
      "limited company tax",
    ],
    license: r.licence.url,
    spatialCoverage: "United Kingdom",
  });

  const breadcrumb = buildBreadcrumb([
    { label: "Home", href: "/" },
    { label: "UK Tax Rates 2026/27" },
  ]);

  return (
    <>
      <JsonLd data={[dataset, breadcrumb]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "UK Tax Rates 2026/27" }]}
            />
            <Eyebrow onDark>
              Reference · Tax year {r.taxYear} · Updated {r.lastUpdated}
            </Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              UK Tax Rates 2026/27
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              Canonical, citable reference of every UK tax rate a limited company director,
              contractor, sole trader, partnership owner or small business owner needs in 2026/27.
              Maintained by Holloway Davies.{" "}
              <InlineLink href="/api/uk-tax-rates.json" onDark>
                Machine-readable JSON
              </InlineLink>
              {" · "}
              <InlineLink href="#sources" onDark>
                Primary sources
              </InlineLink>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <NoticeCard tone="slate">
              <p className="text-sm text-slate-700">
                <strong>Editorial:</strong> figures are provided as reference only. For decisions
                specific to your business, <InlineLink href="/contact">book a call</InlineLink>.
              </p>
            </NoticeCard>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <Eyebrow>Company and owner extraction</Eyebrow>

            <Section id="corporation-tax" title="Corporation Tax" tone="white">
              <Row
                label="Small profits rate (profits ≤ £50,000)"
                value={pct(r.corporationTax.smallProfitsRate)}
                anchor="ct-small-profits"
              />
              <Row
                label="Main rate (profits ≥ £250,000)"
                value={pct(r.corporationTax.mainRate)}
                anchor="ct-main"
              />
              <Row
                label="Marginal relief band"
                value={`${gbp(r.corporationTax.marginalRelief.lowerLimit)}–${gbp(r.corporationTax.marginalRelief.upperLimit)} · fraction ${r.corporationTax.marginalRelief.standardFraction}`}
                anchor="ct-marginal-relief"
              />
            </Section>

            <Section id="dividend-tax" title="Dividend Tax" tone="white">
              <Row label="Dividend allowance" value={gbp(r.dividendTax.allowance)} />
              <Row label="Basic rate" value={pct(r.dividendTax.basicRate)} />
              <Row label="Higher rate" value={pct(r.dividendTax.higherRate)} />
              <Row label="Additional rate" value={pct(r.dividendTax.additionalRate)} />
            </Section>

            <Section id="income-tax" title="Income Tax (England, Wales, NI)" tone="white">
              <Row label="Personal allowance" value={gbp(r.incomeTax.personalAllowance)} />
              <Row label="Basic rate (up to £50,270)" value={pct(r.incomeTax.basicRate)} />
              <Row label="Higher rate (£50,271–£125,140)" value={pct(r.incomeTax.higherRate)} />
              <Row
                label="Additional rate (above £125,140)"
                value={pct(r.incomeTax.additionalRate)}
              />
              <Row
                label="Personal allowance taper"
                value={`£1 lost per £2 above ${gbp(r.incomeTax.personalAllowanceTaperFrom)}, fully tapered at ${gbp(r.incomeTax.personalAllowanceFullyTaperedAt)}`}
              />
            </Section>

            <Section id="national-insurance" title="National Insurance" tone="white">
              <Row label="Employee primary threshold" value={gbp(r.nationalInsurance.employee.primaryThreshold)} />
              <Row label="Employee main rate (PT to UEL)" value={pct(r.nationalInsurance.employee.mainRate)} />
              <Row label="Employee upper rate (above UEL)" value={pct(r.nationalInsurance.employee.upperRate)} />
              <Row label="Employer secondary threshold" value={gbp(r.nationalInsurance.employer.secondaryThreshold)} />
              <Row label="Employer rate" value={pct(r.nationalInsurance.employer.rate)} />
              <Row label="Employment Allowance" value={gbp(r.nationalInsurance.employer.employmentAllowance)} />
              <Row label="Self-employed Class 4 (main)" value={pct(r.nationalInsurance.selfEmployed.class4MainRate)} />
              <Row label="Self-employed Class 4 (upper)" value={pct(r.nationalInsurance.selfEmployed.class4UpperRate)} />
            </Section>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <Eyebrow>Selling, investing and reliefs</Eyebrow>

            <Section id="capital-gains-tax" title="Capital Gains Tax" tone="slate">
              <Row label="Annual exempt amount" value={gbp(r.capitalGainsTax.annualExemption)} />
              <Row label="Non-residential, basic rate" value={pct(r.capitalGainsTax.nonResidential.basicRate)} />
              <Row label="Non-residential, higher rate" value={pct(r.capitalGainsTax.nonResidential.higherRate)} />
              <Row label="Residential, basic rate" value={pct(r.capitalGainsTax.residential.basicRate)} />
              <Row label="Residential, higher rate" value={pct(r.capitalGainsTax.residential.higherRate)} />
            </Section>

            <Section id="badr" title="Business Asset Disposal Relief (BADR)" tone="slate">
              <Row label="Lifetime limit" value={gbp(r.capitalGainsTax.badr.lifetimeLimit)} />
              <Row label="Rate (2025/26)" value={pct(r.capitalGainsTax.badr.rate_2025_26)} />
              <Row
                label="Rate from 6 April 2026"
                value={pct(r.capitalGainsTax.badr.rate_2026_27_from)}
                duty
              />
              <Row
                label="Qualifying period"
                value={`${r.capitalGainsTax.badr.qualifyingPeriodYears} years`}
              />
            </Section>

            <Section id="r-and-d" title="R&D Tax Relief" tone="slate">
              <Row label="Merged scheme, headline credit" value={pct(r.rdTaxCredits.merged.headlineCreditRate)} />
              <Row label="Merged scheme, effective after-tax benefit" value={pct(r.rdTaxCredits.merged.effectiveAfterTaxBenefit)} />
              <Row label="ERIS intensity threshold" value={pct(r.rdTaxCredits.erisSme.intensityThreshold)} />
              <Row label="ERIS enhancement rate" value={pct(r.rdTaxCredits.erisSme.enhancementRate)} />
              <Row label="ERIS payable credit rate" value={pct(r.rdTaxCredits.erisSme.payableCreditRate)} />
            </Section>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <Eyebrow>Filing duties, saving and estates</Eyebrow>

            <Section id="vat" title="VAT" tone="white">
              <Row label="Standard rate" value={pct(r.vat.standardRate)} />
              <Row label="Reduced rate" value={pct(r.vat.reducedRate)} />
              <Row label="Registration threshold" value={gbp(r.vat.registrationThreshold)} duty />
              <Row label="Deregistration threshold" value={gbp(r.vat.deregistrationThreshold)} />
              <Row label="Flat-rate limited-cost trader" value={pct(r.vat.flatRateLimitedCostTrader)} />
            </Section>

            <Section
              id="mtd-itsa"
              title="Making Tax Digital for Income Tax (ITSA)"
              tone="white"
            >
              <Row label="Phase 1, £50k+ self-employed/landlord" value={r.mtdItsa.phase1Date} duty />
              <Row label="Phase 2, £30k+ self-employed/landlord" value={r.mtdItsa.phase2Date} duty />
              <Row label="Phase 3, £20k+ self-employed/landlord" value={r.mtdItsa.phase3Date} duty />
            </Section>

            <Section id="pensions" title="Pensions" tone="white">
              <Row label="Annual allowance" value={gbp(r.pensions.annualAllowance)} />
              <Row label="Money purchase annual allowance" value={gbp(r.pensions.moneyPurchaseAnnualAllowance)} />
              <Row label="Tapered threshold income" value={gbp(r.pensions.taperedThresholdIncome)} />
              <Row label="Tapered adjusted income" value={gbp(r.pensions.taperedAdjustedIncome)} />
              <Row label="Lump sum allowance" value={gbp(r.pensions.lumpSumAllowance)} />
            </Section>

            <Section id="iht" title="Inheritance Tax" tone="white">
              <Row label="Nil-rate band" value={gbp(r.inheritanceTax.nilRateBand)} />
              <Row label="Residence nil-rate band" value={gbp(r.inheritanceTax.residenceNilRateBand)} />
              <Row label="Standard rate" value={pct(r.inheritanceTax.rate)} />
              <Row label="Reduced (10% to charity) rate" value={pct(r.inheritanceTax.reducedRate)} />
            </Section>
          </div>
        </div>
      </section>

      <section id="sources" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <Eyebrow>Provenance</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Primary sources</h2>
            <ul className="mt-4 space-y-2">
              {r.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-0.5 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                  >
                    {s.title}
                  </a>{" "}
                  <span className="text-slate-500">{s.publisher}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              Licence: {r.licence.name}{" "}
              <a
                href={r.licence.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                licence terms
              </a>
              . {r.licence.note}
            </p>
            <p className="mt-6">
              <Link href="/api/uk-tax-rates.json" className={btnPrimary}>
                Get the JSON
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="A rate table cannot tell you which rate you land on."
          description="A free call with an accountant who reads your own figures and tells you which of these thresholds you are near, and what moving across one would cost."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          contained
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
