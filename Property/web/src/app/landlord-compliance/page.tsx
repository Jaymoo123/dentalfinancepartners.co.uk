import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { FaqSection } from "@/components/ui/FaqSection";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { TopicHero, TopicSection } from "@/components/property/TopicSection";
import {
  CommercialSplit,
  ComplianceCostSummary,
  ComplianceCycles,
  ComplianceDuties,
  DeductibilityBuckets,
  EicrCodes,
  EnergyRegimes,
  FireScope,
  GasWindow,
  HorizonList,
  LicensingSchemes,
  PenaltyScale,
} from "@/components/property/compliance-figures";
import { btnOnCream, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

const PAGE_PATH = "/landlord-compliance";
const TITLE = "Landlord Compliance: Duties, Costs and Penalties in England";
const DESCRIPTION =
  "Every safety, energy and licensing duty on an England landlord: the renewal cycle, verified 2026 costs, the penalties, and what is deductible against rental income.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Gas, EICR, EPC, MEES, fire and licensing duties for landlords in England, with the renewal cycle, 2026 costs, penalties and the tax treatment.",
  },
};

const calendar = [
  {
    duty: "Gas safety record (CP12)",
    cycle: "Every 12 months",
    basis: "GSIUR 1998 reg 36(3)(a)",
    where: "Great Britain",
  },
  {
    duty: "Electrical installation condition report (EICR)",
    cycle: "At least every 5 years, sooner if the report says so",
    basis: "SI 2020/312 reg 3",
    where: "England",
  },
  {
    duty: "Energy performance certificate (EPC)",
    cycle: "Valid for 10 years from the date it is entered on the register",
    basis: "SI 2012/3118 reg 9(2)",
    where: "England and Wales",
  },
  {
    duty: "Minimum energy efficiency standard (band E floor)",
    cycle: "Continuous, checked whenever the EPC or the letting changes",
    basis: "SI 2015/962",
    where: "England and Wales",
  },
  {
    duty: "Fire risk assessment (HMOs and common parts)",
    cycle: "No statutory interval, reviewed regularly and on any significant change",
    basis: "RRFSO 2005 art 9",
    where: "England and Wales",
  },
  {
    duty: "Smoke and carbon monoxide alarms",
    cycle: "Checked in working order on the day the tenancy begins",
    basis: "SI 2015/1693 reg 4",
    where: "England",
  },
  {
    duty: "Property licence (mandatory HMO, additional or selective)",
    cycle: "Term of up to 5 years, renewed before expiry",
    basis: "Housing Act 2004 Parts 2 and 3",
    where: "England",
  },
];

const costs = [
  {
    item: "Gas safety record (CP12), single boiler",
    price: "£60 to £120",
    cycle: "Annual",
    spread: "£60 to £120 a year",
  },
  {
    item: "CP12 bundled with a boiler service",
    price: "£110 to £160",
    cycle: "Annual",
    spread: "£110 to £160 a year",
  },
  {
    item: "EICR, typical rental property",
    price: "£120 to £350",
    cycle: "5-yearly",
    spread: "£24 to £70 a year",
  },
  {
    item: "EICR remedial work, small C2 fixes",
    price: "£100 to £500",
    cycle: "As triggered by the report",
    spread: "Budget a contingency, not a fixed figure",
  },
  {
    item: "Domestic EPC, direct to an accredited assessor",
    price: "£45 to £90 (£35 to £120 across the whole market)",
    cycle: "10-yearly",
    spread: "£5 to £9 a year",
  },
  {
    item: "Fire risk assessment, small HMO",
    price: "£150 to £300",
    cycle: "First assessment, reviews cost less",
    spread: "Varies with the review cadence you adopt",
  },
  {
    item: "Fire risk assessment, small converted block",
    price: "£250 to £600",
    cycle: "First assessment, reviews cost less",
    spread: "Usually a service charge cost, not a landlord cost",
  },
  {
    item: "Fire risk assessment, high-rise building",
    price: "£800 to £1,500 or more",
    cycle: "First assessment, reviews cost less",
    spread: "Usually a service charge cost, not a landlord cost",
  },
  {
    item: "Mandatory HMO licence",
    price: "Around £600 to £1,900 (Camden charges £1,531)",
    cycle: "Up to 5 years",
    spread: "£120 to £380 a year across the term",
  },
  {
    item: "Selective licence",
    price: "Around £500 to £1,000 (Liverpool charges £704)",
    cycle: "Up to 5 years",
    spread: "£100 to £200 a year across the term",
  },
  {
    item: "MEES improvement works, domestic",
    price: "Capped at £3,500 including VAT",
    cycle: "Only where the property is below band E",
    spread: "One-off, and usually capital rather than revenue",
  },
];

/**
 * What is coming but is not law. Both entries are the section's own paragraphs,
 * split at their natural join. Keep them OUT of any "current duties" list: the
 * whole point of the section is that a reader must not plan against them.
 */
const horizon = [
  {
    title: "Renters' Rights Act 2025",
    detail:
      "Adds a redress scheme obligation and a private rented sector database, and extends the rent repayment order window. Commencement is being phased, so the operative question for any given duty is which provisions have actually been brought into force rather than what the Act says on its face.",
  },
  {
    title: "The Decent Homes Standard for the PRS",
    detail:
      "Preliminary provisions only, with the substantive standard awaiting a further statutory instrument.",
  },
  {
    title: "EPC C by 2030, and EPC C or B for commercial",
    detail:
      "Consultation and policy positions. Neither has been laid as a statutory instrument. Treat them as a direction of travel that should shape what you do at the next refurbishment or the next purchase, and treat band E as the line that is actually enforceable today.",
  },
];

const penalties = [
  {
    breach: "No gas safety check or record",
    exposure:
      "Criminal enforcement by the HSE. A substantial fine, unlimited on indictment, and a custodial sentence are both on the table. There is no fixed civil penalty figure to plan against.",
    basis: "GSIUR 1998 reg 36, enforced under the HSWA 1974",
  },
  {
    breach: "No EICR, or remedial work not done",
    exposure:
      "A financial penalty of up to £40,000 per breach imposed by the local housing authority. The cap was £30,000 until SI 2025/1043 raised it with effect from 1 November 2025, so older guidance understates it. Breaches stack, so several duties missed on one property means several penalties.",
    basis: "SI 2020/312 reg 11",
  },
  {
    breach: "Marketing or letting a dwelling without a valid EPC",
    exposure:
      "A fixed £200 penalty charge notice per breach for a dwelling, issued by trading standards. For a non-dwelling the amount is 12.5% of the rateable value, subject to a £500 minimum and a £5,000 maximum, with a £750 default where no rateable value can be determined.",
    basis: "SI 2012/3118 reg 38",
  },
  {
    breach: "Letting a sub-standard property below EPC band E",
    exposure:
      "A ladder of penalties: up to £2,000 for a breach under three months, up to £4,000 at three months or more, up to £1,000 for false or misleading register information and up to £2,000 for ignoring a compliance notice, all subject to an aggregate cap of £5,000 per property. Publication of the breach on the public register runs alongside it.",
    basis: "SI 2015/962 reg 40",
  },
  {
    breach: "No suitable and sufficient fire risk assessment",
    exposure:
      "Offences under article 32, enforced by the fire and rescue authority through enforcement and prohibition notices and, in serious cases, prosecution. The practical exposure is usually the works the enforcement notice demands rather than the fine.",
    basis: "RRFSO 2005 arts 26 and 32",
  },
  {
    breach: "Letting without a required property licence",
    exposure:
      "A civil penalty of up to £40,000 per offence, raised from £30,000 by SI 2026/319 with effect from 1 May 2026, or criminal prosecution with an unlimited fine on summary conviction. On top of either, a rent repayment order can claw back up to two years of rent, and repeat offenders face banning orders.",
    basis: "Housing Act 2004 ss.72, 95 and 249A",
  },
];

const faqs = [
  {
    question: "What certificates does a landlord legally need in England?",
    answer:
      "A gas safety record for every gas appliance and flue where the property has gas, renewed every 12 months; an electrical installation condition report at least every five years; a valid energy performance certificate of at least band E before the property is marketed or let; and working smoke and carbon monoxide alarms checked on the first day of the tenancy. A fire risk assessment is additionally required where the Regulatory Reform (Fire Safety) Order 2005 applies, which means HMOs and the common parts of blocks of flats. A property licence is required where the council operates mandatory, additional or selective licensing that catches your property.",
  },
  {
    question: "How often does each landlord certificate need renewing?",
    answer:
      "Gas every 12 months under reg 36(3)(a) of GSIUR 1998. The EICR at intervals of no more than five years, or sooner if the previous report specifies a shorter interval, under reg 3 of SI 2020/312. The EPC lasts ten years from the date it was entered on the register, under reg 9(2) of SI 2012/3118. The fire risk assessment has no statutory interval: article 9 of the RRFSO 2005 requires it to be reviewed regularly and immediately where there is reason to think it is out of date. A licence runs for a term of up to five years and most councils grant the full term.",
  },
  {
    question: "Are landlord safety certificates tax deductible?",
    answer:
      "Yes. The gas safety check, the EICR fee, the EPC fee, a fire risk assessment fee and a licence fee are all compulsory regulatory costs of running the letting business, so they are revenue expenses deducted against rental income under ITTOIA 2005 s.272. They are not finance costs, so the Section 24 restriction does not touch them. Where a fee covers a multi-year licence term it is still deducted in the year it is incurred.",
  },
  {
    question: "Are compliance fines and penalties tax deductible?",
    answer:
      "No. Penalties imposed for breaking the law are not incurred wholly and exclusively for the purposes of the business, so no relief is available, whether the penalty is the £40,000 civil penalty for an EICR breach, the licensing penalty under s.249A, the £200 EPC penalty charge notice or an HSE fine. HMRC sets the position out at BIM38500 onwards. The contrast is stark: a £150 report is fully deductible, and the penalty for skipping it is not deductible at all.",
  },
  {
    question: "How much does compliance cost for a single let each year?",
    answer:
      "On a gas-heated single let, budget £60 to £120 a year for the CP12, £120 to £350 every five years for the EICR, and £45 to £90 every ten years for the EPC when booked direct with an accredited assessor. Spread across the cycles, that is roughly £90 to £200 a year before any remedial work. Remedial work is the variable that actually moves the number: small C2 fixes commonly land between £100 and £500, and a first-time rewire runs to four figures.",
  },
  {
    question: "What is the maximum fine for not having an EICR?",
    answer:
      "Up to £40,000 per breach, imposed by the local housing authority under reg 11 of the Electrical Safety Standards in the Private Rented Sector Regulations 2020. The cap was £30,000 when the regulations were made and was raised to £40,000 by SI 2025/1043 with effect from 1 November 2025, so a large amount of guidance still online quotes the old figure. It is a per-breach cap, not a total: multiple breaches can be penalised separately, and there is a right of appeal to the First-tier Tribunal.",
  },
  {
    question: "Does every rental property need a fire risk assessment?",
    answer:
      "No, and this is the single most common error in landlord guidance. The Regulatory Reform (Fire Safety) Order 2005 applies to HMOs and to the common parts of buildings containing two or more sets of domestic premises. A single self-contained house let to one household is outside it and needs no fire risk assessment. The smoke and carbon monoxide alarm regulations still apply to that property, and so does the general repairing obligation.",
  },
  {
    question: "Is EPC C by 2030 the law yet?",
    answer:
      "No. The enacted minimum energy efficiency standard for domestic private rented property in England and Wales is EPC band E, with a landlord spending cap of £3,500 including VAT, under the Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015. The EPC C by 2030 trajectory and the £10,000 cap that is quoted alongside it are government policy aspiration: no statutory instrument has been laid to give either statutory force. Plan for the direction of travel, but do not treat it as a legal deadline.",
  },
  {
    question: "Do the same compliance rules apply across the UK?",
    answer:
      "No, and mixing them up is expensive. The gas safety regulations are Great Britain wide. The EICR regulations are an England-only statutory instrument, although Scotland has required electrical inspections since 2015 under its own rules. The EPC and MEES regulations cover England and Wales, with Scotland running a separate regime. Licensing under Housing Act 2004 Parts 2 and 3 is the England framework described on this page, and Wales, Scotland and Northern Ireland operate parallel but distinct schemes, including Rent Smart Wales.",
  },
  {
    question: "Is money spent bringing a property up to EPC E deductible?",
    answer:
      "Usually not against rental income. Insulation, glazing and heating upgrades that materially improve the specification of the building are capital improvements, so they are added to the base cost and relieved against capital gains tax on eventual sale under TCGA 1992 s.38(1)(b). A like-for-like boiler replacement is a repair and therefore revenue. Grant receipts under schemes such as ECO4, GBIS and the Boiler Upgrade Scheme reduce the expenditure they fund, and therefore reduce the base cost you can claim.",
  },
];

export default function LandlordCompliancePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Landlord compliance: the duties, the cycle, the cost and the tax treatment",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    about: { "@type": "Thing", name: "Private rented sector landlord compliance" },
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <TopicHero
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Landlord compliance" }]} />}
        title="Landlord compliance: the duties, the renewal cycle, the cost and the tax treatment"
        standfirst={
          <>
            Six recurring duties sit on a residential letting in England: gas, electrical, energy, fire, alarms and,
            in a growing number of council areas, a licence. Each has its own statutory clock, its own enforcement
            body and its own penalty. Here is the whole cycle in one place, with what it costs, what it costs to get
            wrong, and which parts of the bill you can actually deduct.
          </>
        }
        primary={
          <Link
            href="#book"
            data-cta="compliance_hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={`${btnPrimary} bg-emerald-600 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Book a landlord tax review
          </Link>
        }
        secondary={
          <Link
            href="/landlord-tax"
            data-cta="compliance_hero_guide"
            data-cta-placement="hero"
            className={`${btnOnCream} px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Read the landlord tax guide
          </Link>
        }
      />

      <TopicSection
        id="what-it-covers"
        eyebrow="Six duties"
        title="What landlord compliance actually covers"
      >
        <div className="rounded-xl bg-slate-50 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">Jurisdiction, before anything else</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            This page describes the position for a residential property let in <strong>England</strong>. The
            regimes do not share a footprint. The gas safety regulations apply across{" "}
            <strong>Great Britain</strong>. The electrical safety regulations are an{" "}
            <strong>England-only</strong> statutory instrument, although Scotland has required electrical
            inspections since 2015 under separate rules. The EPC and minimum energy efficiency regulations, and
            the fire safety order, cover <strong>England and Wales</strong>. Licensing under the Housing Act
            2004 is described here in its England form; Wales, Scotland and Northern Ireland run parallel but
            distinct schemes, including Rent Smart Wales. Check the regime for the country your property is in
            before relying on any figure below.
          </p>
        </div>
        <p>
          Landlord compliance is not one obligation. It is a set of separate statutory duties, created at
          different times by different departments, enforced by different bodies, and carrying penalties that
          range from a fixed £200 notice to a £40,000 civil penalty and, for gas, a criminal prosecution. They
          have almost nothing in common except that they all land on the same person and all get budgeted for
          out of the same rent.
        </p>
        {/* The five duties were a bulleted list, which is the one shape that
            makes five separate statutory regimes look like one list. Each is now
            a card carrying its own cycle and its own enforcement track, which is
            the section's actual argument. Bodies verbatim. */}
        <ComplianceDuties />
        <p>
          One thing worth naming early, because it is the most common misreading: the EICR is the report. There
          is no separate document called an electrical safety certificate in law. When an agent or a council
          asks for the certificate, the satisfactory EICR is the thing they mean.
        </p>
      </TopicSection>

      <TopicSection
        id="calendar"
        eyebrow="Renewal cycles"
        tone="slate"
        title="The landlord compliance calendar"
      >
        <p>
          The cycles are not aligned, which is why compliance drifts. A gas check falls due every year, an EICR
          every five, an EPC every ten, and a licence on a term the council sets. Most landlords who get caught
          out were not ignoring the rules, they lost track of one date.
        </p>
        {/* The misalignment the paragraph above just claimed, drawn before the
            table states it row by row. */}
        <ComplianceCycles />
        <div className="overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 text-left">
                <th className="py-2 pr-4 font-bold text-slate-900">Duty</th>
                <th className="py-2 pr-4 font-bold text-slate-900">How often</th>
                <th className="py-2 pr-4 font-bold text-slate-900">Legal basis</th>
                <th className="py-2 font-bold text-slate-900">Applies in</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((row) => (
                <tr key={row.duty} className="border-b border-slate-200">
                  <td className="py-2 pr-4 font-semibold text-slate-900">{row.duty}</td>
                  <td className="py-2 pr-4 text-slate-700">{row.cycle}</td>
                  <td className="py-2 pr-4 text-slate-700">{row.basis}</td>
                  <td className="py-2 text-slate-700">{row.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ExampleFigureNote className="mt-3" />
        </div>
        <p>
          The dates that matter are not only the renewal dates. Each regime carries service and action
          deadlines that run from the inspection, and those are where councils find breaches:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Gas:</strong> a copy of the record to each existing tenant within{" "}
            <strong>28 days</strong> of the check, and to any new tenant <strong>before occupation</strong>.
            The record is kept until there have been two further checks of that appliance or flue, and for two
            years from the last check where an appliance is removed. A check carried out in the two months
            before the deadline date is treated as made on the deadline date, so booking early does not shorten
            the next cycle.
          </li>
          <li>
            <strong>Electrical:</strong> the report to each existing tenant within <strong>28 days</strong> of
            the inspection, to a new tenant <strong>before occupation</strong>, and to the local housing
            authority within <strong>7 days</strong> of a written request. Further investigative or remedial
            work flagged by an unsatisfactory report must be completed within <strong>28 days</strong>, or any
            shorter period the report specifies.
          </li>
          <li>
            <strong>Energy:</strong> a valid EPC must exist before the property is marketed, and be made
            available free of charge to any prospective tenant at the earliest opportunity. A re-let does not
            need a fresh certificate while a valid one is on the register, which is why the register check comes
            before the booking.
          </li>
          <li>
            <strong>Fire:</strong> article 9 sets no fixed interval. It requires the assessment to be kept up
            to date and reviewed immediately where there is reason to suspect it is no longer valid or the
            building has significantly changed. In practice assessors and enforcing authorities work to an
            annual review with a full reassessment every three to five years.
          </li>
        </ul>
      </TopicSection>

      <TopicSection
        id="costs"
        eyebrow="The budget"
        title="What landlord compliance costs in 2026"
        links={[
          {
            href: "/blog/landlord-tax-essentials/gas-safety-certificate-cost",
            label: "Gas safety certificate cost",
          },
          {
            href: "/blog/landlord-tax-essentials/eicr-certificate-cost-landlords",
            label: "EICR certificate cost",
          },
          { href: "/blog/landlord-tax-essentials/epc-certificate-cost-uk", label: "EPC cost" },
          {
            href: "/blog/landlord-tax-essentials/fire-risk-assessment-cost",
            label: "Fire risk assessment cost",
          },
        ]}
      >
        <p>
          These are the market ranges our cost pages verify for 2026. Quotes move with the size and age of the
          property, the region, how many appliances or circuits there are, and whether you book direct or
          through an agent. Treat the ranges as a budgeting floor and ceiling, not a quote.
        </p>
        <div className="overflow-x-auto rounded-xl bg-slate-50 p-5 sm:p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 text-left">
                <th className="py-2 pr-4 font-bold text-slate-900">Item</th>
                <th className="py-2 pr-4 font-bold text-slate-900">Typical 2026 price</th>
                <th className="py-2 pr-4 font-bold text-slate-900">Cycle</th>
                <th className="py-2 font-bold text-slate-900">Spread over the cycle</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((row) => (
                <tr key={row.item} className="border-b border-slate-200">
                  <td className="py-2 pr-4 font-semibold text-slate-900">{row.item}</td>
                  <td className="py-2 pr-4 text-slate-700">{row.price}</td>
                  <td className="py-2 pr-4 text-slate-700">{row.cycle}</td>
                  <td className="py-2 text-slate-700">{row.spread}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ExampleFigureNote className="mt-3" />
        </div>
        {/* The two figures this section actually lands on, and the two levers,
            which were the last two paragraphs. Every number is theirs. */}
        <ComplianceCostSummary />
      </TopicSection>

      <TopicSection
        id="penalties"
        eyebrow="Getting it wrong"
        tone="slate"
        title="Penalties at a glance"
      >
        <p>
          Two things are worth understanding before you read the table. First, the caps moved recently and much
          of the guidance online is stale: the electrical penalty rose from £30,000 to £40,000 on 1 November
          2025, and the licensing civil penalty rose from £30,000 to £40,000 on 1 May 2026. Second, these are
          separate regimes with separate enforcement, so an unlicensed and uncertified property can attract
          both.
        </p>
        {/* Current caps on one line, before the per-breach detail. The section
            opens by warning that much of the guidance online is stale, which is
            the argument for putting the live numbers where they cannot be
            missed. */}
        <PenaltyScale />
        <div className="space-y-5">
          {penalties.map((p) => (
            <div key={p.breach} className="rounded-xl bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900">{p.breach}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{p.exposure}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{p.basis}</p>
            </div>
          ))}
        </div>
        <p>
          Financial penalties are not the whole exposure. A rent repayment order lets a tenant or the council
          recover up to two years of rent from an unlicensed letting. Repeat offenders face banning orders,
          which end the rental business altogether and bring their own capital gains tax consequences on
          cessation. And a missing gas record or deposit failure can block a possession claim, which turns a
          compliance slip into months of lost rent.
        </p>
      </TopicSection>

      <TopicSection
        id="tax"
        eyebrow="Three buckets"
        title="What is deductible, what is capital, and what gets no relief at all"
        links={[
          // Both are top-level pillar routes, so the href-derived pill rule
          // gives them nothing and their cards rendered bare beside the blog
          // card's Article pill and excerpt. `kind` supplies the pill and
          // `PAGE_SUMMARIES` supplies the sentence, so all three now match.
          { href: "/landlord-tax", label: "Landlord tax guide", kind: "guide" },
          { href: "/section-24", label: "Section 24 explained", kind: "guide" },
          {
            href: "/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords",
            label: "Are HMO licensing fees deductible",
          },
        ]}
      >
        <p>
          This is the part most compliance guidance skips, and it is where the money is. Every compliance
          pound falls into one of three buckets, and they are treated completely differently.
        </p>
        {/* The three-row table became three cards. A table gave all three the
            same weight; the section's point is that they are treated completely
            differently, so the headline on each card is that answer. Examples
            and statutory references are carried verbatim. */}
        <DeductibilityBuckets />
        <p>
          The line between the first two buckets is <strong>repair against improvement</strong>, and it is the
          single most common source of amended returns in this area. Restoring the installation to the
          condition it was in is a repair. Making it materially better than it was is capital. A consumer unit
          swapped like for like after a C2 code is a repair; a first-time rewire of a 1960s installation that
          brings it up to a modern standard is not. Replacing a failed boiler with a modern equivalent is
          normally a repair; the same replacement as part of a wider upgrade to the property is not.
        </p>
        <p>
          Three practical points follow. First, none of these costs are finance costs, so the{" "}
          <Link href="/section-24" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Section 24 restriction
          </Link>{" "}
          does not apply to any of them: they come off rental income at your full marginal rate, unlike
          mortgage interest. Second, compliance spend before the first tenant moves in is not lost, because
          pre-letting expenditure of a revenue nature is relieved under the pre-trading rules. Third, grants
          matter: energy efficiency grant receipts reduce the expenditure they fund, which reduces the base
          cost you can claim on sale, so the grant and the works have to be tracked together rather than
          separately.
        </p>
        <p>
          A licence fee is deductible in full in the year it is incurred even though the licence covers a term
          of up to five years. Landlords sometimes spread it across the term in their own accounts, which
          understates the deduction in year one and creates a reconciliation problem later.
        </p>
        {/* The bare button became the prompt-and-button block /incorporation
            uses at the foot of its own two-lists section. Same recipe exactly:
            white card, hairline ring, statement on the left, CTA on the right.
            A button alone asks for the click without saying why now; the line
            beside it is the reason, and here the reason is the repair-against-
            improvement split the section has just spent four paragraphs on. */}
        <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <p className="text-base font-bold text-slate-900 sm:text-lg">
            Not sure which bucket your last invoice falls in? That line is worth getting right once.
          </p>
          <Link
            href="#book"
            data-cta="compliance_tax_book"
            data-cta-placement="tax"
            data-cta-goal="form"
            className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
          >
            Book a consultation
          </Link>
        </div>
      </TopicSection>

      <TopicSection
        id="gas"
        eyebrow="Every 12 months"
        tone="slate"
        title="Gas safety"
        links={[
          {
            href: "/blog/landlord-tax-essentials/gas-safety-certificates",
            label: "Gas safety certificates (CP12): the full regime",
          },
          {
            href: "/blog/landlord-tax-essentials/gas-safety-certificate-cost",
            label: "What a CP12 costs and how bundling works",
          },
        ]}
      >
        <p>
          Regulation 36 of the Gas Safety (Installation and Use) Regulations 1998 requires an annual check of
          every gas appliance and flue by a Gas Safe registered engineer, the record supplied to tenants within
          fixed deadlines, and the record retained. Enforcement runs through the HSE on a criminal track, not
          through a civil penalty regime, which is why no fixed fine figure exists to plan against and why the
          figures circulating in agent guidance should be treated with suspicion.
        </p>
        {/* Regulation 36A drawn rather than described. It is the section's one
            genuinely useful operational detail and it was buried mid-paragraph;
            a rule about dates belongs on a bar. Copy carried through. */}
        <GasWindow />
      </TopicSection>

      <TopicSection
        id="electrical"
        eyebrow="Five-yearly"
        title="Electrical safety and the EICR"
        links={[
          {
            href: "/blog/landlord-tax-essentials/landlord-electrical-safety-certificate",
            label: "The EICR duty cycle, deadlines and penalties",
          },
          {
            href: "/blog/landlord-tax-essentials/eicr-certificate-cost-landlords",
            label: "EICR cost and the tax split on remedial work",
          },
        ]}
      >
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require the
          fixed installation to be inspected and tested by a qualified person at intervals of no more than five
          years, or sooner where the report specifies. The report itself is the EICR, and the codes it carries
          drive everything that follows: C1 means danger present, C2 means potentially dangerous, and FI means
          further investigation required. Any of the three makes the report unsatisfactory and starts the
          28-day remedial clock.
        </p>
        {/* The three codes and the clock they start. A reader holding a report
            is looking for their own code and should not have to read a
            paragraph to find it. */}
        <EicrCodes />
        <p>
          A narrow set of tenancies is excluded from the regime by Schedule 1, including long leases of seven
          years or more, lodger arrangements where the occupier shares amenities with the landlord, student
          halls of residence, hostels and refuges, care homes, hospitals and hospices. Since 1 November 2025
          the regime also reaches registered providers of social housing, whose earlier exclusion was removed.
        </p>
      </TopicSection>

      <TopicSection
        id="energy"
        eyebrow="The band E floor"
        tone="slate"
        title="EPCs and the minimum energy efficiency standard"
        links={[
          {
            href: "/blog/landlord-tax-essentials/energy-performance-certificates-epc",
            label: "Energy performance certificates explained",
          },
          { href: "/blog/landlord-tax-essentials/how-to-book-an-epc", label: "How to book an EPC" },
          {
            href: "/blog/landlord-tax-essentials/mees-regulations-landlords",
            label: "MEES: the band E floor, exemptions and the cap",
          },
          {
            href: "/blog/landlord-tax-essentials/epc-c-2030-minimum-energy-efficiency-landlord-spending-cap",
            label: "EPC C by 2030: what is actually enacted",
          },
          {
            href: "/blog/landlord-tax-essentials/epc-improvement-grant-schemes-landlords-eco4-bus-gbis",
            label: "Grant schemes for energy improvements",
          },
        ]}
      >
        <p>
          Two separate statutes are involved here, and merging them causes real errors. They answer different
          questions.
        </p>
        {/* Two questions, two cards. The section warns that these get merged, so
            drawing them apart is the correction. Band E and the £3,500 cap sit
            under the second, because that is the regulation they belong to. */}
        <EnergyRegimes />
        <p>
          Most exemption classes run for five years; the temporary exemption for someone who has recently become a
          landlord runs for six months.
        </p>
        <p>
          Before booking anything, search the national register. An EPC lasts ten years and survives both a
          sale and a re-let, so a valid certificate may already exist for the property. A surprising share of
          the EPC market is landlords paying for a certificate they already have.
        </p>
      </TopicSection>

      <TopicSection
        id="fire"
        eyebrow="HMOs and common parts"
        title="Fire safety and alarms"
        links={[
          {
            href: "/blog/landlord-tax-essentials/fire-risk-assessment-cost",
            label: "Fire risk assessment cost and who bears it",
          },
          {
            href: "/blog/property-types-and-specialist-tax/building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords",
            label: "Building Safety Act 2022 and cladding cost recovery",
          },
        ]}
      >
        <p>
          The Regulatory Reform (Fire Safety) Order 2005 does not reach every rental, and any guide telling you it
          does is wrong. Where it does apply, the responsible person must make a suitable and sufficient assessment
          and, since October 2023, record it in full rather than recording significant findings only.
        </p>
        {/* Where it applies and where it does not, drawn side by side, because
            the section says in terms that most guides get this wrong. Neutral
            dash rather than a cross on the second column: nothing is being done
            wrong there. The alarms duty follows, since it is the one that IS in
            every let. */}
        <FireScope />
        <p>
          Who pays depends on the building. An HMO landlord bears their own assessment cost and deducts it as
          a revenue expense. In a block, the freeholder or managing agent procures the assessment and recovers
          it through the service charge as a management cost, subject to the statutory reasonableness test. A
          right to manage company that has taken over management procures and recharges it in the same way.
        </p>
        <p>
          Check the current wording of regulation 4 before assuming the carbon monoxide scope, because it has been
          amended.
        </p>
      </TopicSection>

      <TopicSection
        id="licensing"
        eyebrow="Council schemes"
        tone="slate"
        title="Licensing: mandatory, additional and selective"
        links={[
          {
            href: "/blog/landlord-tax-essentials/landlord-licensing-explained",
            label: "Which of the three schemes applies to you",
          },
          {
            href: "/blog/property-types-and-specialist-tax/hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics",
            label: "HMO and selective licensing mechanics",
          },
          {
            href: "/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords",
            label: "The tax treatment of licence fees",
          },
        ]}
      >
        <p>England runs three licensing regimes under the Housing Act 2004.</p>
        {/* Three schemes, three cards, each saying where it bites. */}
        <LicensingSchemes />
        <p>
          Which one applies turns on four facts you can check quickly: how many people live there, how many
          households they form, which council area the property sits in, and whether that council has a live
          designation. Designations run for up to five years and then lapse or are re-made, so a scheme that
          ended last year does not bind you and one that started last month does.
        </p>
        <p>
          Fees vary widely and are set locally. Mandatory HMO licences commonly run from around £600 to £1,900, and
          selective licences from around £500 to £1,000, usually split between a payment on application and a second
          payment on grant.
        </p>
      </TopicSection>

      <TopicSection
        id="commercial"
        eyebrow="Non-domestic"
        title="Commercial property is a different regime"
        links={[
          {
            href: "/blog/property-types-and-specialist-tax/commercial-epc-requirements",
            label: "Commercial EPC requirements",
          },
          {
            href: "/blog/property-types-and-specialist-tax/commercial-energy-performance-certificate-cost",
            label: "Commercial EPC cost",
          },
          {
            href: "/blog/property-types-and-specialist-tax/commercial-property-mees-compliance",
            label: "Commercial MEES compliance",
          },
        ]}
      >
        <p>
          If you let non-domestic property, do not import the figures above. Four things behave differently, and
          each of them is a mistake someone makes every year.
        </p>
        {/* Side by side, because the section's whole instruction is "do not
            import the figures above" and four contrasts spread across two
            paragraphs is exactly the shape that produces the mistake it warns
            about. Every pair is theirs. */}
        <CommercialSplit />
        <p>
          On the commercial side the payback filter works like this: improvements that do not pay for themselves in
          energy savings within seven years are not relevant improvements, and an exemption can be registered where
          all relevant improvements have been made or none can be.
        </p>
      </TopicSection>

      <TopicSection
        id="wider"
        eyebrow="On the horizon"
        tone="slate"
        title="The wider regime, and what is coming"
        links={[
          {
            href: "/blog/landlord-tax-essentials/decent-homes-standard-prs-landlord-compliance-checklist",
            label: "The Decent Homes Standard for the PRS",
          },
          {
            href: "/blog/landlord-tax-essentials/renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords",
            label: "Mandatory redress scheme enrolment",
          },
          { href: "/blog/landlord-tax-essentials", label: "All landlord tax essentials guides" },
        ]}
      >
        <p>
          None of the following is in force. The operative question for any given duty is which provisions have
          actually been brought into force, rather than what an Act says on its face.
        </p>
        {/* The same hollow-marker rail /leasehold uses for uncommenced law, for
            the same reason: these are real, dated-looking obligations that a
            reader could easily mistake for current ones. */}
        <HorizonList items={horizon} />
        <p>
          For how the compliance bill fits into the wider tax position on a portfolio, see our{" "}
          <Link href="/landlord-tax" className="font-semibold text-emerald-700 hover:text-emerald-800">
            landlord tax guide
          </Link>
          , model your rental profit with the{" "}
          <Link
            href="/calculators/rental-income-tax-calculator"
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            rental income tax calculator
          </Link>
          , or read what our{" "}
          <Link
            href="/services/landlord-accountant"
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            landlord accounting service
          </Link>{" "}
          covers on the ongoing compliance side.
        </p>
      </TopicSection>

      {/* Anchor for the hero primary and the mid-page ask. The copy is the
          CTASection copy this replaces, unchanged; the proof points are the trio
          already claimed in niche.config.json, /about and the four service
          pages, so nothing here is a new factual claim (rule 30). */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Make the compliance bill work harder on your tax return"
          description="Book a free consultation. We will check that every certificate, licence and remedial job has been claimed in the right place, and that nothing capital has been buried in your repairs."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* The light section that keeps the navy panel off the navy footer
          (adjacency rule, resolution 2), and the accordion every other FAQ on
          the site uses. The FAQPage JSON-LD is emitted separately above, so
          collapsing costs no schema. */}
      <FaqSection title="Landlord compliance questions" faqs={faqs} />
    </>
  );
}
