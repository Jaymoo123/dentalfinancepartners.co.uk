import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

const UPDATED = "2026/27 tax year";

export const metadata: Metadata = {
  title: "UK Property Tax Rates 2026/27 | Landlord Tax Reference",
  description:
    "Current UK property tax rates for 2026/27 in one place: stamp duty (SDLT, LBTT, LTT), capital gains tax, rental income tax and Section 24, corporation and dividend tax, allowances and MTD thresholds. Verified figures.",
  alternates: { canonical: `${siteConfig.url}/property-tax-rates` },
  openGraph: {
    title: "UK Property Tax Rates 2026/27 (Landlord Reference)",
    description:
      "Every current UK property tax rate for landlords in one reference: stamp duty, CGT, rental income tax, corporation and dividend tax, allowances and MTD.",
    url: `${siteConfig.url}/property-tax-rates`,
    type: "website",
  },
};

const faqs = [
  {
    question: "What are the stamp duty rates for a buy-to-let in 2026/27?",
    answer:
      "In England and Northern Ireland a buy-to-let or second home pays the standard SDLT bands (0% to £125,000, 2% to £250,000, 5% to £925,000, 10% to £1.5m, 12% above) plus a 5% additional-dwelling surcharge on the whole price. Scotland adds an 8% Additional Dwelling Supplement to LBTT, and Wales applies a separate higher-rates LTT table.",
  },
  {
    question: "What is the capital gains tax rate on property?",
    answer:
      "For 2026/27, residential property gains are taxed at 18% within your unused basic-rate band and 24% above it, after the £3,000 annual exempt amount. The tax must be reported and paid within 60 days of completion.",
  },
  {
    question: "What is the corporation tax rate for a property company?",
    answer:
      "19% on profits up to £50,000, 25% on profits of £250,000 or more, with marginal relief tapering between the two (an effective rate of about 26.5% on the middle slice).",
  },
  {
    question: "Does Section 24 still apply in 2026/27?",
    answer:
      "Yes. Individual landlords cannot deduct mortgage interest; they receive a basic-rate tax credit of 20% on it for 2026/27, rising to 22% from 2027/28. Companies are not affected and deduct interest in full.",
  },
];

type Row = { band: string; a: string; b?: string };

function RateTable({ head, rows }: { head: [string, string, string?]; rows: Row[] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-slate-300 text-left">
            <th className="py-2 pr-4 font-bold text-slate-900">{head[0]}</th>
            <th className="py-2 pr-4 font-bold text-slate-900">{head[1]}</th>
            {head[2] && <th className="py-2 font-bold text-slate-900">{head[2]}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-200">
              <td className="py-2 pr-4 text-slate-700">{r.band}</td>
              <td className="py-2 pr-4 font-semibold text-slate-900">{r.a}</td>
              {head[2] && <td className="py-2 font-semibold text-slate-900">{r.b}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({
  id,
  title,
  children,
  calc,
  guide,
}: {
  id: string;
  title: string;
  children: ReactNode;
  calc?: { href: string; label: string };
  guide?: { href: string; label: string };
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">{children}</div>
      {(calc || guide) && (
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
          {calc && (
            <Link href={calc.href} className="text-emerald-700 hover:text-emerald-800">
              {calc.label} →
            </Link>
          )}
          {guide && (
            <Link href={guide.href} className="text-slate-500 hover:text-emerald-700">
              {guide.label} →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

export default function PropertyTaxRatesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Property Tax Rates 2026/27",
    description:
      "A reference of current UK property tax rates for landlords for the 2026/27 tax year, maintained by Property Tax Partners.",
    inLanguage: "en-GB",
    datePublished: "2026-06-04",
    dateModified: "2026-06-04",
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/property-tax-rates` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "UK property tax rates" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            UK property tax rates 2026/27
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Every current UK property tax figure a landlord needs, in one place. Figures are for the {UPDATED}{" "}
            and are maintained against HMRC, Revenue Scotland, the Welsh Revenue Authority and legislation.gov.uk.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Section
              id="sdlt"
              title="Stamp Duty Land Tax (England & Northern Ireland)"
              calc={{ href: "/calculators/stamp-duty-calculator", label: "Stamp duty calculator" }}
            >
              <p>
                Each rate applies only to the part of the price within its band. A buy-to-let or second home
                adds a 5% surcharge on the whole price.
              </p>
              <RateTable
                head={["Band", "Standard", "+ 5% additional"]}
                rows={[
                  { band: "Up to £125,000", a: "0%", b: "5%" },
                  { band: "£125,001 to £250,000", a: "2%", b: "7%" },
                  { band: "£250,001 to £925,000", a: "5%", b: "10%" },
                  { band: "£925,001 to £1,500,000", a: "10%", b: "15%" },
                  { band: "Above £1,500,000", a: "12%", b: "17%" },
                ]}
              />
              <p>
                Non-UK-resident buyers add a further 2%. First-time buyers pay 0% to £300,000 and 5% on
                £300,001 to £500,000, with no relief once the price exceeds £500,000.
              </p>
            </Section>

            <Section
              id="lbtt"
              title="LBTT (Scotland)"
              calc={{ href: "/calculators/lbtt-calculator-scotland", label: "LBTT calculator" }}
            >
              <RateTable
                head={["Band", "Rate"]}
                rows={[
                  { band: "Up to £145,000", a: "0%" },
                  { band: "£145,001 to £250,000", a: "2%" },
                  { band: "£250,001 to £325,000", a: "5%" },
                  { band: "£325,001 to £750,000", a: "10%" },
                  { band: "Above £750,000", a: "12%" },
                ]}
              />
              <p>
                The Additional Dwelling Supplement is 8% of the whole price for an additional dwelling worth
                £40,000 or more. First-time-buyer relief raises the nil band to £175,000.
              </p>
            </Section>

            <Section
              id="ltt"
              title="LTT (Wales)"
              calc={{ href: "/calculators/ltt-calculator-wales", label: "LTT calculator" }}
            >
              <p>Main residential rates. Additional properties use a separate higher-rates table (5% to 17%).</p>
              <RateTable
                head={["Band", "Main rate"]}
                rows={[
                  { band: "Up to £225,000", a: "0%" },
                  { band: "£225,001 to £400,000", a: "6%" },
                  { band: "£400,001 to £750,000", a: "7.5%" },
                  { band: "£750,001 to £1,500,000", a: "10%" },
                  { band: "Above £1,500,000", a: "12%" },
                ]}
              />
              <p>Wales has no first-time-buyer relief and no non-resident surcharge.</p>
            </Section>

            <Section
              id="cgt"
              title="Capital Gains Tax on residential property"
              calc={{ href: "/calculators/capital-gains-tax-calculator", label: "Capital gains tax calculator" }}
              guide={{
                href: "/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk",
                label: "Full CGT guide",
              }}
            >
              <RateTable
                head={["Item", "2026/27"]}
                rows={[
                  { band: "Rate within unused basic-rate band", a: "18%" },
                  { band: "Rate above the basic-rate band", a: "24%" },
                  { band: "Annual exempt amount", a: "£3,000" },
                  { band: "Reporting and payment deadline", a: "60 days from completion" },
                ]}
              />
            </Section>

            <Section
              id="income-tax"
              title="Rental income tax and Section 24"
              calc={{ href: "/calculators/rental-income-tax-calculator", label: "Rental income tax calculator" }}
              guide={{
                href: "/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide",
                label: "Full Section 24 guide",
              }}
            >
              <RateTable
                head={["Item", "2026/27"]}
                rows={[
                  { band: "Income tax rates", a: "20% / 40% / 45%" },
                  { band: "Personal allowance", a: "£12,570" },
                  { band: "Section 24 mortgage-interest credit", a: "20% (22% from 2027/28)" },
                  { band: "Property income rates from 2027/28 (England, Wales, NI)", a: "22% / 42% / 47%" },
                ]}
              />
              <p>
                Individual landlords cannot deduct mortgage interest. The full profit is taxed and a
                basic-rate credit is given on the interest. Companies deduct interest in full.
              </p>
            </Section>

            <Section
              id="company"
              title="Corporation tax and dividends (property company)"
              calc={{ href: "/calculators/corporation-tax-calculator", label: "Corporation tax calculator" }}
              guide={{
                href: "/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk",
                label: "Full incorporation guide",
              }}
            >
              <RateTable
                head={["Item", "2026/27"]}
                rows={[
                  { band: "Corporation tax up to £50,000 profit", a: "19%" },
                  { band: "Corporation tax £250,000 profit or more", a: "25%" },
                  { band: "Marginal relief band (effective)", a: "about 26.5%" },
                  { band: "Dividend allowance", a: "£500" },
                  { band: "Dividend tax rates", a: "10.75% / 35.75% / 39.35%" },
                ]}
              />
            </Section>

            <Section id="allowances" title="Allowances, reliefs and MTD">
              <RateTable
                head={["Item", "2026/27"]}
                rows={[
                  { band: "Property allowance", a: "£1,000" },
                  { band: "Rent-a-room relief", a: "£7,500 (£3,750 if shared)" },
                  { band: "Making Tax Digital threshold (from April 2026)", a: "£50,000 gross income" },
                  { band: "MTD threshold from April 2027 / April 2028", a: "£30,000 / £20,000" },
                ]}
              />
              <p className="text-sm text-slate-500">
                These figures are a quick reference and not a substitute for advice on your own position. We
                can confirm exactly how each applies to you.
              </p>
            </Section>

            <div className="mt-10 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl">
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">Not sure which rates apply to you?</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Rates are the easy part. Knowing which reliefs you qualify for, and how the pieces interact, is
                where the savings are. Tell us about your situation for a no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a property tax review" />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
