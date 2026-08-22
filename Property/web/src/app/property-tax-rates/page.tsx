import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow } from "@/components/ui/page-blocks";
import { siteStats } from "@/lib/site-stats";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { buildBreadcrumbJsonLd } from "@/lib/schema";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

const UPDATED = "2026/27 tax year";

/** One source for the visible breadcrumb and its JSON-LD. Keep them identical. */
const BREADCRUMB = [{ label: "Home", href: "/" }, { label: "UK property tax rates" }];

export const metadata: Metadata = {
  title: "UK Property Tax Rates 2026/27 | Landlord Tax Reference",
  description:
    // Ours (c218d7a6): shortened to fit the SERP snippet.
    "Current UK property tax rates for 2026/27: stamp duty (SDLT, LBTT, LTT), capital gains, rental income, Section 24, corporation and dividend tax, MTD.",
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
      <ExampleFigureNote className="mt-3" />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  calc,
  guide,
}: {
  id: string;
  /**
   * The short signpost above the heading. Required, not optional: the section
   * eyebrows are now the ONLY navigational signposting on this page, the hero
   * jump-link pills having been removed. A section without one goes unmarked in
   * a run of seven rate tables, so the type makes forgetting it a build error.
   */
  eyebrow: string;
  title: string;
  children: ReactNode;
  calc?: { href: string; label: string };
  guide?: { href: string; label: string };
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">{children}</div>
      {(calc || guide) && (
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
          {calc && (
            <Link href={calc.href} className="inline-block py-0.5 text-emerald-700 hover:text-emerald-800">
              {calc.label} →
            </Link>
          )}
          {guide && (
            <Link href={guide.href} className="inline-block py-0.5 text-slate-500 hover:text-emerald-700">
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
      {/* The visible breadcrumb rendered without the structured data behind it,
          so the trail existed for a reader and not for a crawler. Same items,
          one source. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildBreadcrumbJsonLd(BREADCRUMB) }}
      />

      <section className={`relative overflow-hidden ${heroCreamSurface} py-12 sm:py-16`}>
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb items={BREADCRUMB} />
          <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-6xl">
            UK property tax rates 2026/27
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Every current UK property tax figure a landlord needs, in one place. Figures are for the {UPDATED}{" "}
            and are maintained against HMRC, Revenue Scotland, the Welsh Revenue Authority and legislation.gov.uk.
          </p>

          {/* This page had no call to action of any kind: a reader could arrive
              from search, find their figure and leave without ever meeting an
              ask. Both buttons stay on the page. */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="#book"
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnPrimary} bg-emerald-600 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Get your rates checked
            </Link>
            <Link
              href="#free-tools"
              className={`${btnOnCream} px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Run your numbers
            </Link>
          </div>

          {/* No jump-link chip row here, by explicit instruction: the section
              eyebrows are the only navigational signposting these pages use.
              An earlier pass put a row of pills under this hero; it was removed
              because it competed with the eyebrows for the same job and put a
              second, differently-styled index above the fold.

              The `Section` ids and `scroll-mt-24` below are untouched and
              predate that row, so deep links into a section still land
              correctly. Do not re-add the pills. */}
        </div>
      </section>

      {/* Proof before the reference, reusing the shared siteStats. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div>
            <Section
              id="sdlt"
              eyebrow="Stamp duty"
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
              eyebrow="Scotland"
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
              eyebrow="Wales"
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
              eyebrow="Capital gains"
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

            {/* The only ask between the hero and the panel at the foot. Before
                this, a reader could arrive from a search like "landlord CGT
                rate 2026", find the figure in the table above and leave, with
                seven sections of reference between them and the next ask.

                Placed after CGT and nowhere else on the page for one reason:
                the row directly above it is the only DEADLINE on the page. A
                rate is a fact you look up; 60 days from completion is a clock
                that may already be running, and it is the one moment on a
                lookup surface where the reader's question stops being "what is
                the rate" and becomes "am I late".

                Deliberately restrained. This is a reference page and a hard
                sell between rate tables would cost the trust that makes it
                worth citing, which is the same reason the page carries no
                prompt marquee. */}
            <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <div className="min-w-0">
                <p className="text-base font-bold text-slate-900 sm:text-lg">
                  Sold a property in the last 60 days?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  The reporting deadline runs from completion, not from the end of the tax year, and it is the one
                  on this page with a penalty attached. We can file it for you.
                </p>
              </div>
              <Link
                href="#book"
                data-cta="cgt_deadline_book"
                data-cta-placement="cgt"
                data-cta-goal="form"
                className={`${btnPrimary} mt-5 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Get the 60-day return filed
              </Link>
            </div>

            <Section
              id="income-tax"
              eyebrow="Rental income"
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
              eyebrow="Company"
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

            <Section id="allowances" eyebrow="Allowances and MTD" title="Allowances, reliefs and MTD">
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

          </div>
        </div>
      </section>

      {/* Proof, then the tools, then the ask, then the FAQ. The
          testimonials sit ABOVE the free tools rather than beside `#book`
          because both are full-bleed navy: adjacent they read as one dark
          slab, and the light tools block between them is what keeps the
          band alternating. */}
      <TestimonialsSection
        eyebrow="Testimonials"
        title="Landlords who stopped guessing at the rates"
        description="Anonymised feedback from landlords and investors we have worked with on exactly these questions."
      />

      {/* Free tools, the hero's secondary CTA target. A rates table tells you
          the percentage; the calculators tell you the number, and that is the
          question a reader on this page actually arrived with. */}
      <section id="free-tools" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Put these rates against your own figures</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Free, and the figures are yours to take to any adviser.
            </p>
            <div className="mt-8 sm:mt-10">
              <CalculatorTabs />
            </div>
          </div>
        </div>
      </section>

      {/* Was a pale mint card holding a bare LeadForm, mid-page and below the
          last rate table: the least assertive block on a page whose job is to
          convert a lookup into an enquiry. Now the same full-bleed navy panel
          the other resources pages close on, and the target of `#book`. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Not sure which rates apply to you?"
          description="Rates are the easy part. Knowing which reliefs you qualify for, and how the pieces interact, is where the savings are. Tell us about your situation for a no-obligation review."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
      <FaqSection
        title="Frequently asked questions"
        faqs={faqs}
        className="bg-white py-12 sm:py-16 lg:py-20"
      />

    </>
  );
}
