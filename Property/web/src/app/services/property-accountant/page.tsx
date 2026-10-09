import type { Metadata } from "next";
import Link from "next/link";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { relatedItemsFromLinks } from "@/lib/blog";
import { TaxYearGap } from "@/components/property/TaxYearGap";
import type { LucideIcon } from "lucide-react";
import { Building2, Compass, FileText, MonitorCheck, Receipt, Store } from "lucide-react";

const PAGE_PATH = "/services/property-accountant";

/**
 * 2026-10-09 (WP1-services): the title, H1 and descriptions below move to the
 * plural "Property accountants ... UK" form set by
 * docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md
 * §3.2 (owner rulings R2 and R3: the homepage gives up "property accountants
 * UK" to this page). That is a new assignment from the same collision method
 * the note below describes, not the designer's retitle, which stays not adopted.
 */
/**
 * Ours, kept whole (carve-out 5). The designer retitled this page to
 * "Property Accountant | Landlords, Portfolios & SPVs" without sight of the
 * cannibalisation matrix in expansion_research/_prop_audit_2026_08_05/
 * wave_brief_shared.md (commit bbfe0437), whose collision pre-flight froze the
 * homepage at "Property Accountants UK | Specialist Landlord Tax Advice" and
 * assigned this page its own phrasing. Re-running that matrix needs the surface
 * map, not a judgement, so the retitle is recorded and not adopted.
 *
 * hreflang and the twitter card are ours too: their version has neither.
 */
export const metadata: Metadata = {
  title: "Property Accountants for UK Landlords and Investors",
  description:
    "Specialist property accountants for UK landlords, investors and property companies: rental accounts, company accounts and MTD filing. Free first call.",
  alternates: {
    canonical: `${siteConfig.url}${PAGE_PATH}`,
    languages: {
      "en-GB": `${siteConfig.url}${PAGE_PATH}`,
      "x-default": `${siteConfig.url}${PAGE_PATH}`,
    },
  },
  openGraph: {
    title: "Property Accountants for UK Landlords and Investors",
    description:
      "Rental accounts, company accounts, MTD filing and tax planning from accountants who work only on property. Free first call.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Accountants for UK Landlords and Investors",
    description: "Rental accounts, company accounts, MTD filing and tax planning for UK property.",
  },
};

type Service = {
  title: string;
  icon: LucideIcon;
  definition: string;
  lines: Array<{ label: string; text: string }>;
};

/**
 * The "What we do" list. Each title is an H3 on the page AND an Offer name in
 * hasOfferCatalog below, built from this one array so copy and schema cannot
 * drift (blueprint §3.1 item 5; verify check 5).
 */
const services: Service[] = [
  {
    title: "Rental accounts and Self Assessment",
    icon: FileText,
    definition:
      "We prepare your rental accounts property by property, then complete the property pages of your Self Assessment return from them.",
    lines: [
      { label: "What you get", text: "a profit figure for each property, so you can see which one carries the rest." },
      {
        label: "What we check",
        text: "the finance cost restriction applied correctly, every expense claimed, and joint ownership split the way the property is actually owned.",
      },
    ],
  },
  {
    title: "Property company and SPV accounts",
    icon: Building2,
    definition:
      "We prepare and file the year-end accounts and corporation tax return for a property company, often called an SPV (special purpose vehicle).",
    lines: [
      {
        label: "What you get",
        text: "accounts filed on time, a director's loan account that reconciles, and a plan for drawing money out.",
      },
      {
        label: "Why it differs",
        // house_positions.md §4: companies deduct finance costs in full; the restriction is for individuals.
        text: "a company deducts its mortgage interest in full, so its planning differs from property held personally.",
      },
    ],
  },
  {
    title: "Making Tax Digital quarterly filing",
    icon: MonitorCheck,
    definition:
      "We keep your records in Making Tax Digital (MTD) software and send HMRC your quarterly updates and your year-end return.",
    lines: [
      {
        label: "When it applies",
        // house_positions.md §3: £50,000 from 6 April 2026, £30,000 from April 2027, £20,000 from April 2028.
        text: "from 6 April 2026 if your qualifying income is over £50,000, from April 2027 over £30,000, and from April 2028 over £20,000.",
      },
      {
        label: "What we do",
        text: "choose and set up the software, then file each quarter.",
      },
      {
        label: "Who is outside it",
        // house_positions.md §3: limited companies are outside MTD for ITSA.
        text: "limited companies, which carry on filing annual company returns.",
      },
    ],
  },
  {
    title: "Capital gains tax on sales",
    icon: Receipt,
    definition:
      "We calculate and report the capital gains tax on a sale, with the figure ready before you accept an offer.",
    lines: [
      {
        label: "The deadline",
        // house_positions.md §5: UK residents report and pay within 60 days of completion where CGT is due.
        text: "if you live in the UK and tax is due on a residential sale, you report and pay within 60 days of completion.",
      },
      {
        label: "What we check",
        text: "the base cost from purchase and improvement records, and any relief for a former home.",
      },
    ],
  },
  {
    title: "Incorporation and structuring advice",
    icon: Compass,
    definition:
      "We tell you whether your property should sit in your own name, a limited company or both, and we cost a move before you make it.",
    lines: [
      {
        label: "What we model",
        text: "the capital gains tax and stamp duty a transfer can trigger, against the yearly saving.",
      },
      {
        label: "What has changed",
        // house_positions.md §5: incorporation relief must be claimed for transfers on or after 6 April 2026.
        text: "incorporation relief, which can defer the gain for a genuine property business, now has to be claimed for transfers from 6 April 2026.",
      },
    ],
  },
  {
    title: "Commercial property accounts",
    icon: Store,
    definition:
      "We also act as a commercial property accountant for owners of shops, offices and industrial units.",
    lines: [
      {
        label: "What differs",
        text: "capital allowances, which residential lets mostly cannot claim, are often available on the fixtures in a commercial building.",
      },
      {
        label: "Mixed holdings",
        text: "flats and commercial units owned together are handled in one set of figures.",
      },
    ],
  },
];

const feeDrivers = [
  {
    title: "How many properties you own",
    body: "More properties means more rent and costs to record, and usually more changes across the year.",
  },
  {
    title: "Personal, company or both",
    body: "Each structure has its own filings, and holding both means two sets of returns and the planning between them.",
  },
  {
    title: "Records kept as you go, or once a year",
    body: "We can keep your books through the year, or work from your own records at the year end.",
  },
  {
    title: "Whether Making Tax Digital applies",
    body: "Quarterly updates add four submissions a year to the year-end work.",
  },
];

const onboarding = [
  {
    n: "01",
    title: "Talk it through",
    body: "Describe your properties, who owns them and what you want to change, and one of our accountants goes through it with you on a free call. If your affairs are simple enough to handle yourself, we will say so.",
  },
  {
    n: "02",
    title: "Agree the fee",
    body: "We set the scope, then quote a fixed fee for your approval before any work starts. If you already have an accountant, we ask them for professional clearance and collect your past returns and records, so nothing carried forward is lost.",
  },
  {
    n: "03",
    // 2026-10-09 (WP1-services): "questions answered inside 24 hours" is removed
    // from this step. Blueprint §3.1 item 9 and the answer-pattern spec §4 keep
    // the 24-hour line in the shared components only (LeadCTAPanel proof strip,
    // site-stats) until F5 confirms or removes it; it is not repeated in body
    // copy. The owner question recorded below is still open.
    // Ours, kept: "inside 24 hours". The designer changed this to "inside one
    // working day" without comment, which is a different service promise, and
    // their own LeadCTAPanel on this page still proves "24-hour response", as
    // does siteStats. Raised as an owner question rather than changed here.
    title: "Run the year",
    body: "We keep the records current, file quarterly updates where MTD applies, deal with HMRC and Companies House, and book a planning conversation before your year end.",
  },
];

/**
 * 2026-10-09 (WP1-services): the explainer post is added and the cost post
 * relabelled, both by their real titles, per blueprint §3.2 "Links out". The
 * other seven entries are unchanged.
 */
/**
 * Ours, restored whole. Their layout deletes this section, and with it eight
 * curated deep links spanning four blog clusters. These seven pages are the only
 * authored equity flowing outward into the clusters
 * (docs/Property/STRUCTURE_VS_COMPETITORS_2026-08-17.md:128-142), and the wave
 * brief that built this page required "4-8 relevant existing blog posts in-body".
 */
const feedingPosts = [
  {
    href: "/blog/property-accountant-services/what-does-a-property-accountant-do",
    label: "What Does a Property Accountant Do? Services and Scope for UK Landlords",
  },
  {
    href: "/blog/property-accountant-services/how-to-choose-a-property-accountant",
    label: "How to choose a property accountant",
  },
  {
    href: "/blog/property-accountant-services/how-much-does-a-property-accountant-cost",
    label: "How Much Does a Property Accountant Cost: UK Pricing Guide 2026",
  },
  {
    href: "/blog/property-accountant-services/change-landlord-accountants",
    label: "Changing accountants without losing anything",
  },
  {
    href: "/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide",
    label: "Finance costs and the interest restriction",
  },
  {
    href: "/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline",
    label: "MTD for landlords from April 2026",
  },
  {
    href: "/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026",
    label: "MTD software compared",
  },
  {
    href: "/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk",
    label: "Buy-to-let limited companies in full",
  },
  {
    href: "/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide",
    label: "Filing a landlord Self Assessment return",
  },
];

const cities = [
  { href: "/locations/london", label: "London" },
  { href: "/locations/manchester", label: "Manchester" },
  { href: "/locations/birmingham", label: "Birmingham" },
  { href: "/locations/leeds", label: "Leeds" },
  { href: "/locations/bristol", label: "Bristol" },
];

const faqs: FaqEntry[] = [
  {
    question: "What does a property accountant do?",
    answer:
      "A property accountant prepares the accounts and tax returns for rental and investment property and plans the tax around them. For you that means rental accounts, the property pages of your Self Assessment return, company accounts if you use a limited company, Making Tax Digital updates, the capital gains return when you sell, and advice on how to hold the next purchase. We do all of it, and nothing outside property.",
  },
  {
    question: "What does a specialist property accountant do?",
    answer:
      "A specialist property accountant does the same work as any accountant for a landlord, but sees enough property cases to catch what a generalist misses. Typical examples are a refurbishment claimed as a repair when part of it was an improvement, a joint ownership split that does not match the paperwork, or a sale reported late. We work only on property, so these are everyday questions for us.",
  },
  {
    question: "Do landlords need an accountant?",
    answer:
      "No law says a landlord must use an accountant, and you can file your own return. Most landlords bring one in when the tax stops being simple: a second or third property, a limited company, a property owned with someone else, or a sale. At that point the rules start to interact, mistakes are harder to spot yourself, and we can show you on the first call what we would do differently.",
  },
  {
    question: "Do I need a property accountant for one buy-to-let?",
    // house_positions.md §3: MTD for ITSA from 6 April 2026 above £50,000 of qualifying income.
    answer:
      "Often not. A single let with no mortgage and routine costs is a return many owners manage alone. Three things usually change that: a mortgage while you pay higher rate tax, because the interest restriction then costs real money; a refurbishment that mixes repairs with improvements; or qualifying income above £50,000, which brings quarterly Making Tax Digital filing from April 2026. The first call will show which side of that line you are on.",
  },
  {
    question: "What is the difference between a property accountant and a regular accountant?",
    answer:
      "The difference is depth on property rules, not the ability to file a return. A regular accountant can prepare a correct return from what you hand over. A property accountant also checks what you have not thought to mention: how the interest restriction applies, whether costs are repairs or improvements, how joint ownership is split, and what a sale or a move into a company will cost. Because we only do property, we raise those questions before you ask.",
  },
  {
    question: "How much does a property accountant cost?",
    answer:
      "It depends on how many properties you own, whether they are held personally, in a company or both, whether we keep your books through the year, and whether Making Tax Digital applies. We quote a fixed fee once we know those four things, and you approve it before any work starts. Our guide to property accountant fees shows what firms across the market charge and what each level should include.",
  },
  {
    question: "Can you take over from my current accountant mid-year?",
    answer:
      "You can, and there is no need to wait for the year end. We contact your current accountant for professional clearance, collect your past returns, workings and any losses or allowances carried forward, and continue from where they stopped. Changing accountant does not reset anything with HMRC, and we explain at the start what the handover involves in your case.",
  },
  {
    question: "Do you handle both personally held property and limited companies?",
    answer:
      "Yes, and it is a common mix: older properties in your own name and newer purchases in a company. We prepare your Self Assessment return as well as the company accounts and corporation tax return, and we plan them together, because where the next purchase goes and how you take money out of the company both depend on the whole picture.",
  },
  {
    question: "Will you tell me whether to incorporate?",
    // house_positions.md §5 (CGT on transfer, incorporation relief) and §1 (SDLT on transfer).
    answer:
      "Yes. We model your numbers and give you a straight answer, including when it is no. Moving property into a company usually triggers capital gains tax and stamp duty at the point of transfer, so the yearly saving has to repay that cost first. It tends to suit a higher rate landlord with large mortgages who plans to hold for many years, and rarely suits a basic rate landlord or someone selling soon.",
  },
  {
    question: "How does Making Tax Digital change what you do for me?",
    // house_positions.md §3: £50,000 from 6 April 2026, £30,000 from April 2027, £20,000 from April 2028.
    answer:
      "It replaces one annual return with quarterly digital updates plus a year-end return. It applies from 6 April 2026 if your qualifying income is over £50,000, from April 2027 over £30,000 and from April 2028 over £20,000. We choose and set up the software, keep your records current through the year, and file each quarter, so nothing has to be rebuilt in a rush in January.",
  },
  {
    question: "What records do you need from me?",
    answer:
      "We need whatever shows money in and out: rent statements from your agent or bank, mortgage interest statements, insurance, repair and maintenance invoices, service charge and ground rent bills, and the completion statement for anything you bought or sold. For a company, add its bank statements and anything you paid personally on its behalf. If your records are a box of receipts, we can work with that and set up something better.",
  },
  {
    question: "Do you work with non-resident landlords?",
    // house_positions.md §5: non-UK residents file the 60-day return for every UK land disposal, tax due or not.
    answer:
      "Yes. If you live abroad and let property in the UK, your rent normally falls under the Non-Resident Landlord Scheme, and any UK property you sell has to be reported within 60 days whether or not tax is due. We handle the UK returns and the scheme approvals for you, and our non-resident landlord service covers that work in more detail.",
  },
];

/**
 * Ours, restored. Their version emits FAQPage only, which drops the richest
 * service markup on the site: hasOfferCatalog is the machine-readable list of
 * what the service includes, built from the six coverage items so a copy edit
 * cannot drift from the schema. BreadcrumbList comes from <Breadcrumb>.
 *
 * 2026-10-09 (WP1-services): built from `services` (the "What we do" H3s),
 * name equal to the H1, provider by @id only, areaServed as the Country
 * "United Kingdom" (blueprint §3.1 schema). The provider @id keeps the form the
 * layout's Organization node actually emits (`${siteConfig.url}#organization`),
 * so the reference resolves.
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}${PAGE_PATH}#service`,
  name: "Property accountants for UK landlords and investors",
  serviceType: "Property accountant",
  description:
    "Accounting and tax for UK landlords, property investors and property companies: rental accounts and Self Assessment, company and SPV accounts, Making Tax Digital filing, capital gains tax on sales, incorporation advice and commercial property accounts.",
  url: `${siteConfig.url}${PAGE_PATH}`,
  provider: { "@id": `${siteConfig.url}#organization` },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  audience: {
    "@type": "Audience",
    audienceType: "UK landlords, property investors and property companies",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property accountancy services",
    itemListElement: services.map((item) => ({
      "@type": "Offer",
      name: item.title,
    })),
  },
};

const h2 = "text-2xl font-bold text-slate-900 sm:text-4xl";

export default function PropertyAccountantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <section className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] overflow-hidden ${heroCreamSurface}`}>
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Property accountant" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Property accountants for UK landlords and investors
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              We are property accountants for landlords, investors and owners of property companies anywhere in
              the UK. We prepare rental accounts, Self Assessment returns, company accounts and Making Tax
              Digital filings, and plan the tax that goes with them, because property is the only work we do. We
              work remotely from our registered office in Shipley, West Yorkshire. The first call is free, and we
              quote a fixed fee for you to approve before any work starts.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              We work with landlords and investors across the UK by video call, phone and email, so where you or
              your properties are makes no difference to the service; our London, Manchester, Birmingham, Leeds
              and Bristol pages describe how that works in each city.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a consultation
              </Link>
              <Link
                href="#free-tools"
                data-cta="hero_calculators"
                data-cta-placement="hero"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Try the free calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="included" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The work</Eyebrow>
          <h2 id="what-a-property-accountant-does-for-you" className={h2}>
            What a property accountant does for you
          </h2>
          <Prose>
            <p>
              A property accountant keeps the records, prepares the returns and plans the tax for people who own
              rental and investment property, and we do all three as one service. In the UK the job is called a
              property accountant; in the US you will see real estate accountants doing the same work. Most people
              use several of the six services below.
            </p>
          </Prose>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
            {services.map((item) => (
              <div key={item.title} className="flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <item.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.definition}</p>
                <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
                  {item.lines.map((line) => (
                    <li key={line.label}>
                      <span className="font-semibold text-slate-900">{line.label}:</span> {line.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Describe your properties and how they are owned, and the first call will pin down which of these
              you need.
            </p>
            <Link
              href="#book"
              data-cta="included_book"
              data-cta-placement="what_is_included"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The difference</Eyebrow>
          <h2 id="specialist-property-accountants-not-a-general-practice" className={h2}>
            Specialist property accountants, not a general practice
          </h2>
          <Prose>
            <p>
              We are specialist property accountants: we work on property accounts and property tax and nothing
              else, and we do not take on restaurants, retailers or consultants. A general practice can file a
              correct return from what it is given. The gap is in the questions it does not ask, because a firm
              that sees a few landlords a year rarely meets the same property problem twice.
            </p>
            <p>
              Plenty of firms call themselves property specialist accountants. When comparing accountants that
              specialise in property, these are the four points worth testing, and the ones we raise first.
            </p>
          </Prose>
          <ul className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
            <li className="rounded-xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200/70 sm:p-8 sm:text-base">
              <span className="block font-bold text-slate-900">Mortgage interest</span>
              {/* house_positions.md §4: interest earns a basic rate credit, capped by three limits, excess carried forward. */}
              On property you own personally, the interest is not deducted from rent. It earns a basic rate tax
              credit instead, which is capped in some years and carried forward. We track both each year, and our{" "}
              <InlineLink href="/section-24">Section 24 guide</InlineLink> explains the rule.
            </li>
            <li className="rounded-xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200/70 sm:p-8 sm:text-base">
              <span className="block font-bold text-slate-900">Repairs or improvements</span>
              A like-for-like replacement is usually a repair you claim now; an extension is an improvement that
              only counts on a sale. Each cost is classed as the money is spent, with the reasons kept on file.
            </li>
            <li className="rounded-xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200/70 sm:p-8 sm:text-base">
              <span className="block font-bold text-slate-900">Joint ownership</span>
              Joint owners are taxed on a default split unless an election changes it, and the election has to
              match who really owns what. We check that the returns, the election and the title agree.
            </li>
            <li className="rounded-xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200/70 sm:p-8 sm:text-base">
              <span className="block font-bold text-slate-900">Deadlines outside the tax return</span>
              {/* house_positions.md §5 (60-day CGT return) and §3 (MTD quarterly updates). */}
              A sale with tax to pay has its own 60-day return, and quarterly MTD updates sit outside the January
              deadline. Those dates are tracked for you, and the{" "}
              <InlineLink href="/landlord-tax">landlord tax guide</InlineLink> sets out the full calendar.
            </li>
          </ul>

          <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Not sure your current accountant checks these? Bring your last return to the first call and we will
              tell you what we would look at.
            </p>
            <Link
              href="#book"
              data-cta="difference_book"
              data-cta-placement="the_difference"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Planning</Eyebrow>
          <h2 id="property-tax-accountant-the-planning-side" className={h2}>
            Property tax accountant: the planning side
          </h2>
          <Prose>
            <p>
              As your property tax accountant we plan the tax as well as report it, and the accounts and the
              planning are one engagement, not two. Good property tax accounting starts before the return: most of
              the bill is set by decisions made during the year, and by January they are history. We do not wait
              for you to ask.
            </p>
            {/* Worked example. house_positions.md §4: 20% basic rate credit for 2026/27, rising to 22% from
                2027/28; §7: property income rates 22/42/47% from 2027/28, so the higher rate wedge stays 20 points.
                Arithmetic: £18,000 x 40% = £7,200; x 20% = £3,600; 2027/28: x 42% = £7,560, x 22% = £3,960,
                gap £3,600 both years. */}
            <p>
              Here is what that means in numbers. A higher rate landlord pays £18,000 of mortgage interest on flats
              held in their own name. If that interest could still be deducted, it would save £7,200 at 40%; the
              basic rate credit gives £3,600 for 2026/27, so the restriction costs £3,600 a year. From 2027/28 the
              credit rises to 22% and the higher rate on property income to 42%, and the gap stays the same.
            </p>
            <p>
              That is why we model where the next purchase should sit before it is bought. Accounting for property
              tax this way covers sales and gifts too, while there is still time to change the outcome.
            </p>
          </Prose>
          <TaxYearGap />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Investors</Eyebrow>
          <h2 id="accountants-for-property-investors-and-investment-portfolios" className={h2}>
            Accountants for property investors and investment portfolios
          </h2>
          <Prose>
            <p>
              We act as accountants for property investors once one or two lets have become a portfolio, when the
              question shifts from whether the return is right to which property is earning its keep. As your
              property portfolio accountant we produce figures for each property alongside the tax figures, so a
              flat that loses money every year stops hiding inside the total.
            </p>
            <p>
              Multi-property portfolio accounting is mostly about records: rent, interest and costs tracked per
              property and per owner, refinancing followed so you know what the borrowing paid for, and the same
              ledger feeding your quarterly MTD updates. Our guide to{" "}
              <InlineLink href="/blog/portfolio-management/property-portfolio-accounting-tracking-profitability">
                tracking profitability by property
              </InlineLink>{" "}
              shows how that works.
            </p>
            <p>
              Many investors end up with property in their own name and in one or more companies. We act as
              accountants for property company structures as well as for the individual, and plan the two
              together. That joined up view is what property investment accountants should give a portfolio of
              any size.
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Fit</Eyebrow>
          <h2 id="who-we-work-with" className={h2}>
            Who we work with
          </h2>
          <Prose>
            <p>
              We work with landlords, property investors, commercial property owners and property companies, from
              a single buy-to-let in your own name to a portfolio run through a limited company. Our accounting
              services for property owners share one core, and these pages cover the commonest situations.
            </p>
          </Prose>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            <li>
              <InlineLink href="/for/first-time-and-accidental-landlords">First-time and accidental landlords</InlineLink>
              : you let a flat you once lived in or inherited, and the return has stopped being simple.
            </li>
            <li>
              <InlineLink href="/for/property-spv-set-up">Setting up a property company</InlineLink>: you are
              buying through a new SPV and want it right from the first purchase.
            </li>
            <li>
              <InlineLink href="/for/moving-property-into-a-limited-company">
                Moving property into a limited company
              </InlineLink>
              : you want the cost of incorporating worked out before you commit.
            </li>
            <li>
              <InlineLink href="/for/selling-a-buy-to-let">Selling a buy-to-let</InlineLink>: an offer is on the
              table and you want to know what you keep after tax.
            </li>
            <li>
              <InlineLink href="/for/non-resident-landlords">Non-resident landlords</InlineLink>: you live abroad
              and let property here, and our{" "}
              <InlineLink href="/services/non-resident-landlord">non-resident landlord service</InlineLink> handles
              the scheme and the UK returns.
            </li>
          </ul>
          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              If none of these quite fits, describe your position on the first call and you will get a straight
              answer on whether we are the right firm.
            </p>
            <Link
              href="#book"
              data-cta="prompts_book"
              data-cta-placement="sound_familiar"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Getting started</Eyebrow>
          <h2 id="how-it-works" className={h2}>
            How it works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-700">
            It works in three stages, and the opening conversation is free.
          </p>
          <ProcessTimeline steps={onboarding} />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Fees</Eyebrow>
          <h2 id="how-our-fees-work" className={h2}>
            How our fees work
          </h2>
          <Prose>
            <p>
              We charge fixed fees, quoted upfront, and you approve the fee before any work starts. There is no
              hourly billing; the figure depends on the four things below, not a package picked from a list.
            </p>
          </Prose>

          {/* DECISION I is open: the designer asked for a fee figure across six
              sessions and never received one, and their standing rule is never
              to invent a price. So the section names what moves the number and
              stops, with no placeholder and no stub. If a figure is supplied it
              belongs immediately below this grid, as a third card row or a
              single "typical range" line above the two ends. */}
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
            {feeDrivers.map((driver) => (
              <div key={driver.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-7">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{driver.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{driver.body}</p>
              </div>
            ))}
          </div>

          <Prose>
            <p>
              If your circumstances change during the year, you hear about any extra fee before it is charged. For what
              firms across the market charge and what each level should include, read our guide to{" "}
              <InlineLink href="/blog/property-accountant-services/how-much-does-a-property-accountant-cost">
                property accountant fees
              </InlineLink>
              .
            </p>
          </Prose>

          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Send us an outline of what you own and how it is held, and we will come back with your fee.
            </p>
            <Link
              href="#book"
              data-cta="fees_book"
              data-cta-placement="fees"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <FaqSection title="Questions people ask" faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Further reading</Eyebrow>
          <h2 id="related-guides-and-services" className={h2}>
            Related guides and services
          </h2>
          <Prose>
            <p>
              These guides go further into the subjects on this page: the{" "}
              <InlineLink href="/landlord-tax">guide to landlord tax</InlineLink>, the{" "}
              <InlineLink href="/section-24">finance cost restriction</InlineLink> in full,{" "}
              <InlineLink href="/making-tax-digital-landlords">Making Tax Digital for landlords</InlineLink>,{" "}
              <InlineLink href="/incorporation">incorporation</InlineLink>, and this year&apos;s{" "}
              <InlineLink href="/property-tax-rates">property tax rates</InlineLink>.
            </p>
            <p>
              Two sibling services cover narrower needs. For a single decision that needs modelling on its own,
              such as a sale, a restructure or an inheritance question, see{" "}
              <InlineLink href="/services/property-tax-advice">property tax advice from specialist advisors</InlineLink>;
              for rental returns and accounts without the wider planning, see{" "}
              <InlineLink href="/services/landlord-accountant">landlord accountants for UK rental income</InlineLink>.
            </p>
          </Prose>
          <RelatedArticles className="mt-8" items={relatedItemsFromLinks(feedingPosts)} />
        </div>
      </section>

      <section id="free-tools" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free tools</Eyebrow>
          <h2 id="work-out-your-own-numbers-first" className={h2}>
            Work out your own numbers first
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-700">
            Our free calculators give you a first number on the mortgage interest restriction, the cost of
            incorporating, whether Making Tax Digital applies to you and profit per property. Bring the result to
            the first call.
          </p>
          <div className="mt-8 sm:mt-10">
            <CalculatorTabs />
          </div>
          {/* OWNER DECISION 2026-08-23: the tabs are the only calculator
              surface this page carries. Both the 2x2 CalculatorLinkCards
              module and the "Or open any of them on its own page" link list
              that briefly replaced it are gone, asked for twice and
              reaffirmed.

              Know what that costs before restoring anything here.
              `CalculatorTabs` renders <button role="tab">, not anchors, so
              this page now emits ZERO in-body links to any /calculators/<slug>
              page. That is the page-authored topical equity carve-out 5
              protects and `calculator-tabs-crawl-path.test.ts` guards; this
              route is listed in that test's OWNER_REMOVED_INBODY_LINKS with
              the same reasoning. /calculators/mtd-checker is the one to watch:
              it already takes zero in-body links from all 760 blog posts
              (STRUCTURE_VS_COMPETITORS_2026-08-17.md:142). Reachability is
              unaffected (SiteFooter ships per-tool links site-wide), so
              nothing is orphaned. */}
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Coverage</Eyebrow>
          <h2 id="where-we-work" className={h2}>
            Where we work
          </h2>
          <Prose>
            <p>
              We work with clients anywhere in the UK from one team, and five city pages describe local work:
            </p>
          </Prose>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base">
            {cities.map((city) => (
              <li key={city.href}>
                <InlineLink href={city.href}>{city.label}</InlineLink>
              </li>
            ))}
          </ul>
          <Prose>
            <p>
              Wherever you are, the service, the accountants you deal with and the way we agree fees stay the same.
              If you live outside the UK and let property here, the same applies, with the extra non-resident
              filings handled for you.
            </p>
          </Prose>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Talk to a property accountant about your portfolio"
          description="A free consultation, a straight answer about whether you need us, and a fixed fee quoted before any work starts if you do."
          proofPoints={[
            { title: "Property-only specialists", detail: "Landlords, investors and property companies" },
            { title: "Fixed fees, quoted upfront", detail: "You approve the fee before any work starts" },
            { title: "A free first call", detail: "No obligation, and we say so if you do not need us" },
          ]}
          footnote="No obligation and no hard sell. If you do not need us, we will tell you."
        />
      </div>
    </>
  );
}
