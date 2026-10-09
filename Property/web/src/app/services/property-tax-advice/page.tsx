import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Building2,
  CalendarClock,
  FileWarning,
  Home,
  Landmark,
  Percent,
  ShieldQuestion,
  UserX,
  Users,
  type LucideIcon,
} from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { DrawnTickList } from "@/components/property/DrawnTickList";
import { DecisionWindow } from "@/components/property/DecisionWindow";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

const PAGE_PATH = "/services/property-tax-advice";
const pageUrl = `${siteConfig.url}${PAGE_PATH}`;

/**
 * Ours, kept whole (carve-out 5). Their version is retitled to "Property Tax
 * Advice | One-Off Specialist Consultations" and carries neither hreflang nor a
 * twitter card. Our title was set against the collision pre-flight in
 * expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md (commit
 * bbfe0437), which the designer never saw; re-running that matrix needs the
 * surface map rather than a judgement, so the retitle is recorded and not
 * adopted. Same brief mandates Service + FAQPage + BreadcrumbList and "link 4-8
 * relevant existing blog posts in-body": both are restored below.
 */
/* 2026-10-09 (WP1 service rewrite): title kept as today's string, which is the
   blueprint 3.4 fallback. The first-choice "Property Tax Advice | Specialist
   Property Tax Advisors UK" renders with two pipes once the layout template adds
   the brand, and service_page_verify.py check 1 blocks a second pipe. Keeping the
   live string also keeps what ChatGPT has indexed. Descriptions rewritten to the
   pack's meta description, cut to 140-155 characters. */
export const metadata: Metadata = {
  title: "Property Tax Advice from Specialist Advisors",
  description:
    "Specialist property tax advice for UK landlords: incorporation, CGT timing, Section 24, stamp duty, IHT, HMRC enquiries. Written advice, free first call.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Property Tax Advice from Specialist Advisors",
    description:
      "One-off property tax advice for UK landlords and investors on incorporation, capital gains timing, Section 24, stamp duty, inheritance tax and HMRC enquiries.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Tax Advice from Specialist Advisors",
    description:
      "One-off property tax advice for UK landlords: incorporation, capital gains timing, Section 24, stamp duty, inheritance tax, HMRC enquiries.",
  },
};

/**
 * The "What we do" list (blueprint 3.4). One array renders the H3s and builds
 * `hasOfferCatalog`, so the schema names cannot drift from the visible
 * headings (service_page_verify.py check 5). Each item is one definition
 * sentence, then two or three short labelled lines: the shape AI overviews lift.
 *
 * 2026-10-09: replaces the six `coverage` cards (structuring, CGT timing,
 * Section 24 mitigation, capital allowances, IHT, non-resident). Capital
 * allowances moves to one line under "Who we work with"; non-resident work is
 * a link to /services/non-resident-landlord from the same section.
 */
type ServiceItem = {
  title: string;
  definition: string;
  icon: LucideIcon;
  lines: Array<{ label: string; text: ReactNode }>;
};

const services: ServiceItem[] = [
  {
    title: "Incorporation and structuring advice",
    definition:
      "We work out whether your properties belong in your own name, joint names or a company, and what a move costs.",
    icon: Building2,
    lines: [
      {
        label: "What we model",
        text: "the stamp duty and capital gains tax a move triggers, against the yearly saving.",
      },
    ],
  },
  {
    title: "Capital gains tax planning on a sale or gift",
    definition:
      "We plan when you sell or give away a property, and in what order, so the gain lands in the cheapest year.",
    icon: CalendarClock,
    lines: [
      {
        label: "Gifts count",
        text: "a gift to family is taxed as if you had sold, so the bill can arrive with no cash to pay it.",
      },
      {
        label: "The deadline",
        // house_positions.md §5 (60-day reporting where tax is due)
        text: "where tax is due, the return and the payment are both due 60 days after completion.",
      },
    ],
  },
  {
    title: "Section 24 and finance-cost planning",
    definition: "We work out what the limit on mortgage interest relief costs you, and which fixes are worth it.",
    icon: Percent,
    lines: [
      {
        label: "How it works",
        // house_positions.md §4 (basic-rate tax credit, not a deduction)
        text: "your interest earns a basic-rate tax credit instead of coming off your profit.",
      },
      {
        label: "What we test",
        text: (
          <>
            pensions, a spouse&apos;s share, refinancing and a company. Our guide to{" "}
            <InlineLink href="/section-24">the mortgage interest restriction</InlineLink> has the detail.
          </>
        ),
      },
    ],
  },
  {
    title: "Stamp duty land tax on purchases and transfers",
    definition:
      "We give stamp duty advice before you exchange, while the name on the purchase and the funding can still change.",
    icon: Home,
    lines: [
      {
        label: "What we check",
        text: "whether the higher rates for additional homes apply, and what a transfer into a company would cost.",
      },
    ],
  },
  {
    title: "Inheritance tax and succession planning for portfolios",
    definition:
      "We plan how a portfolio passes on: the order of gifts, the seven-year clock, family companies and trusts.",
    icon: Users,
    lines: [
      {
        label: "The catch",
        // house_positions.md §9 (standard buy-to-let does not qualify for BPR)
        text: "rental property is an investment, so business relief rarely applies.",
      },
      {
        label: "Coming next",
        // house_positions.md §9 (unused pension funds in IHT scope from 6 April 2027)
        text: "unused pensions join the estate from April 2027.",
      },
    ],
  },
  {
    title: "HMRC enquiries and undeclared income disclosures",
    definition:
      "We settle your position before you answer HMRC about a nudge letter, an enquiry or undeclared rent.",
    icon: FileWarning,
    lines: [
      { label: "The usual route", text: "the Let Property Campaign, for undeclared rent." },
      { label: "Why timing matters", text: "telling HMRC first generally costs less than being found." },
    ],
  },
];

/**
 * Theirs, adopted: the six triggers said the way a reader would say them. A
 * described problem gets skimmed, a sentence you would actually say stops you.
 *
 * Keep this EVEN in length. The marquee zigzags on index and an odd set shows a
 * seam where the loop joins.
 */
/* 2026-10-09 (WP1 service rewrite): the marquee is retired on this page and the
   six triggers render once, statically, under "Property tax specialists for the
   decisions that cost most". PromptMarquee prints every prompt twice in the HTML
   to make its loop (681 words on the 9 Oct snapshot, a third of the length
   budget), and the answer-pattern spec lists persona quotes rendered twice as
   something to cut. The six situations, and the substance of each detail,
   survive below in the first person; the quoted `text` lines do not. The array
   stays even so the marquee can come back without a seam. */
const triggerPrompts: Array<{ tag: string; detail: string; icon: LucideIcon }> = [
  {
    tag: "You are about to buy or sell",
    detail: "Ownership, funding and stamp duty are fixed on completion day, so we look before you exchange.",
    icon: Home,
  },
  {
    tag: "Your accountant only files",
    detail: "Filing and planning are different jobs. If nobody has modelled your position in years, we will.",
    icon: UserX,
  },
  {
    tag: "HMRC has written to you",
    detail: "What you say first shapes the whole enquiry, so we settle your position before you reply.",
    icon: FileWarning,
  },
  {
    tag: "You are restructuring",
    detail: "Moving property between spouses or into a company touches four taxes at once; we model them together.",
    icon: ArrowLeftRight,
  },
  {
    tag: "You have inherited a property",
    detail: "Probate value sets your base cost. Selling, letting and passing it on each change the bill; we cost all three.",
    icon: Landmark,
  },
  {
    tag: "Someone has sold you a scheme",
    detail: "We check a proposed structure before you commit money, and say where it holds and where it fails.",
    icon: ShieldQuestion,
  },
];

/* The `scenarios` list that used to sit here was merged into `triggerPrompts`
   above (owner, 2026-08-23). It was the same six situations as the prompts, told
   in the second person: prompt 1 and scenario 1 were both "about to buy or sell",
   and so on down all six, so the section stated its argument twice, once as a
   rotating card and again as a static list underneath. Every word of the
   substance is preserved, now as each prompt's `detail`, which is what report 03
   §7.2 and PLAN 6.3 were protecting: the hook and the substance both survive,
   they are just no longer in two competing blocks. */

/* 2026-10-09 (WP1 service rewrite): five steps cut to the three the blueprint
   (3.1 item 7) specifies, free call first. Implementation-only-if-you-want-it
   becomes the sentence under the timeline. */
const engagement = [
  {
    n: "01",
    title: "A free scoping call",
    body: "We talk through the decision, the properties and your income. If you do not need a consultation, we say so there and then.",
  },
  {
    n: "02",
    title: "Scope and fee agreed",
    body: "We write down the question and quote a fixed fee for answering it. Nothing starts until you approve it.",
  },
  {
    n: "03",
    title: "Modelling and the written note",
    body: "We run the options on your figures and send a note with each one costed and our recommendation, then a call so you can push back.",
  },
];

/* 2026-10-09 (WP1 service rewrite): replaces the ComparisonTable rows (general
   adviser against specialist). The shared component prints a "Most recommended"
   pill, which the answer-pattern spec section 4 removes as a superlative, and
   renders every row twice in the HTML. This table answers H2 4 (advisor or
   accountant) instead, once, and keeps the `comparison_book` CTA id. */
const advisorOrAccountant: Array<[string, string, string]> = [
  ["When you need one", "After the tax year, to a filing deadline", "Before a decision, while it can still change"],
  ["What they work from", "Your records of what has happened", "The options still open to you"],
  ["What you get", "Returns and accounts filed on time", "Each option costed, with a recommendation"],
  ["How it is paid for", "A recurring fee for recurring work", "A fixed fee for one defined question"],
];

/**
 * Verbatim identical between the two trees, and the cleanest fact surface of the
 * seven pillar pages (report 03 §7.3). One back-patch applied on the MTD row:
 * the £20,000 / 6 April 2028 step (house_positions.md §3, :172 and :817) was
 * missing on both sides.
 */
/* 2026-10-09 (WP1 service rewrite): cut to the rows a landlord's decision turns
   on, each cited. Dropped: writing down allowances, dividend rates, business
   asset disposal relief (does not apply to investment property, §5) and employer
   national insurance; the answer-pattern spec leaves rate sets to
   /property-tax-rates, which this section links. Added: the incorporation
   relief claim (§5). */
const changes: Array<[string, string, string]> = [
  // house_positions.md §7 (22/42/47 from 6 April 2027; England, Wales and NI; Scotland carved out)
  [
    "Rates on property income",
    "22%, 42% and 47% replace 20%, 40% and 45% in England, Wales and Northern Ireland; Scottish taxpayers stay on Holyrood's rates",
    "6 April 2027",
  ],
  // house_positions.md §4 and §7 (reducer at the 22% property basic rate; higher-rate wedge stays 20 points)
  [
    "Tax credit for mortgage interest",
    "Rises from 20% to 22%, matching the new basic rate, so the higher-rate gap stays at 20 points",
    "6 April 2027",
  ],
  // house_positions.md §3 (£50,000 from April 2026, £30,000 from April 2027, £20,000 from April 2028)
  [
    "Making Tax Digital for landlords",
    "Quarterly updates for qualifying income over £50,000, then over £30,000, then over £20,000",
    "April 2026, 2027, 2028",
  ],
  // house_positions.md §5 (section 162 relief must be claimed for transfers on or after 6 April 2026)
  [
    "Incorporation relief",
    "Must be claimed when a letting business moves into a company; it no longer applies automatically",
    "6 April 2026",
  ],
  // house_positions.md §9 (NRB and RNRB frozen until 5 April 2031)
  ["Inheritance tax nil-rate bands", "Frozen", "To 5 April 2031"],
];

/* 2026-10-09 (WP1 service rewrite): rewritten in the first person; the old
   wording is not carried over line for line. */
const deliverables = [
  "Every realistic option, with the numbers attached",
  "Our recommendation, which can be to change nothing",
  "The assumptions and risks, stated plainly",
  "Every deadline and election, with its date",
  "A follow-up call to challenge the answer before you act",
  "A note your solicitor, broker or accountant can work from",
];

/**
 * Ours, restored. Their re-layout deleted the "Background reading before you
 * book" box outright, taking all eight blog deep links with it, on the page that
 * is one of only two authored inbound paths from a commercial hub into five
 * different blog clusters. Carve-out 5.
 */
/* 2026-10-09 (WP1 service rewrite): the eight hrefs are unchanged. One label
   loses "Section 24" (statute names stay on the guides, answer-pattern spec
   section 2), and the cards render without excerpts: `relatedItemsFromLinks`
   pulls each post's first sentence, and on 9 Oct those excerpts printed a
   Finance Act section number and a stale £1m figure into this page's body. */
const backgroundReading = [
  {
    href: "/blog/incorporation-and-company-structures/how-to-choose-right-property-company-structure-uk-landlords-2026",
    label: "Choosing the right company structure for a property portfolio",
  },
  {
    href: "/blog/section-24-and-tax-relief/2027-property-tax-rates-section-24-relief-uk-landlords",
    label: "What the 2027 rate changes do to mortgage interest relief",
  },
  {
    href: "/blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk",
    label: "Capital gains tax deferral strategies for property investors",
  },
  {
    href: "/blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate",
    label: "Calculating the capital gains charge on transferring property to a company",
  },
  {
    href: "/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework",
    label: "Capital allowances for property investors: the full decision framework",
  },
  {
    href: "/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact",
    label: "The business and agricultural relief cap and what it means for property",
  },
  {
    href: "/blog/landlord-tax-essentials/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics",
    label: "Family investment companies and freezing portfolio value for inheritance tax",
  },
  {
    href: "/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026",
    label: "Making Tax Digital software for landlords",
  },
];

const relatedGuides = [
  {
    href: "/landlord-tax",
    label: "Landlord tax explained: what UK landlords pay in 2026/27",
  },
  {
    href: "/section-24",
    label: "Mortgage interest relief for landlords, explained",
  },
  {
    href: "/incorporation",
    label: "Should I incorporate my buy-to-let?",
  },
  {
    href: "/making-tax-digital-landlords",
    label: "Making Tax Digital for landlords: rules and deadlines",
  },
  {
    href: "/cost-of-selling-a-property",
    label: "Cost of selling a house: the full bill",
  },
  {
    href: "/property-tax-rates",
    label: "Property tax rates 2026/27",
  },
];

/* 2026-10-09 (WP1 service rewrite): 12 items per blueprint 3.4. Dropped "Do you
   work with landlords outside London?" (the "Where we work" sentence answers it)
   and "How quickly can I get advice?" (a response-time claim, deferred fact F5).
   Added the People Also Ask questions "What does a property tax advisor do?" and
   "What changes for landlords' income tax from April 2027?". Same array feeds
   FaqSection and buildFaqPageJsonLd. */
const faqs: FaqEntry[] = [
  {
    question: "What does a property tax advisor do?",
    answer:
      "A property tax advisor works out the tax cost of a property decision before you make it. We look at how you own property, when and how you sell or gift it, how your mortgage interest is relieved, what stamp duty applies and what your estate will face. You get the options costed against your own figures, a recommendation, and the deadlines that come with it.",
  },
  {
    question: "What is the difference between property tax advice and property accountancy?",
    answer:
      "Accountancy reports the year; advice changes a decision. Accountancy is the yearly cycle of bookkeeping, rental schedules, Self Assessment, company accounts and quarterly Making Tax Digital updates. Advice starts from one question, such as whether to incorporate or when to sell, and ends with a note that costs the options. You can buy the advice from us and leave your accounts exactly where they are.",
  },
  {
    question: "Do I have to switch accountants to get advice from you?",
    answer:
      "No, you keep your accountant. A consultation is a standalone piece of work. Many of the landlords we advise stay with their existing accountant for the annual return and come to us only for the decision that sits outside it. We write the note so your accountant can act on it directly, and we will talk them through it if that helps.",
  },
  {
    question: "What does a property tax consultation cost?",
    answer:
      "It depends on the question, and we quote before we start. The fee turns on how many properties are involved, how they are owned, how many taxes the decision touches and how much modelling it needs. A single sale is a small job; a portfolio split across spouses and a company is a large one. The first call is free, and you approve a fixed fee before any work begins.",
  },
  {
    question: "What should I bring to the first call?",
    answer:
      "Bring a list of the properties and the decision you face. For each property, a rough value, the mortgage outstanding, how it is owned and, if you have them, the purchase date and price. Add your approximate income and your spouse's, because both change the answer. If some of it is missing, come anyway; we will tell you on the call what else we need.",
  },
  {
    question: "Can you advise on a property I have already bought or sold?",
    // house_positions.md §5 (60-day return and payment where CGT is due)
    answer:
      "Yes, though fewer options remain once it has completed. Before exchange we can still shape ownership, funding and structure. Afterwards we work with the reliefs, elections, income split and any disclosure still open to you. If you have sold and capital gains tax is due, the return and the payment are due within 60 days of completion, so bring the completion date to the first call.",
  },
  {
    question: "Do you give advice on incorporation?",
    // house_positions.md §5 (incorporation relief must be claimed for transfers on or after 6 April 2026)
    answer:
      "Yes, it is one of the questions we are asked most. We model the capital gains tax and the stamp duty cost of moving the properties against the yearly saving, and show the year you would break even. Incorporation relief can defer the gain where your letting amounts to a business, but for transfers from 6 April 2026 it has to be claimed. Our buy-to-let incorporation guide explains the test and has a calculator for a first number.",
  },
  {
    question: "Is a property tax specialist worth it for a small portfolio?",
    answer:
      "Sometimes not, and we will say so. With one or two lightly mortgaged properties and an income inside the basic-rate band, there is often nothing worth planning. The value shows up when you pay higher-rate tax, when borrowing is heavy, when a sale or purchase is coming, or when the portfolio is large enough to leave an inheritance tax bill. The free call settles which group you fall into.",
  },
  {
    question: "Do you advise on commercial property as well as residential?",
    // house_positions.md §5 (non-residential gains aligned to 18% / 24% from 30 October 2024)
    answer:
      "Yes. Commercial and mixed-use property raises its own questions: capital allowances on the fixtures in a building, the option to tax for VAT, and stamp duty at non-residential rates. Gains on commercial property are taxed at the same 18% and 24% rates as residential ones. These are the areas a generalist most often misses, so we check them before you buy rather than after.",
  },
  {
    question: "Can you help with an HMRC enquiry or an undisclosed rental period?",
    answer:
      "Yes, and the earlier you come to us, the more options remain. Rent that was never declared is usually put right through the Let Property Campaign, and a disclosure you make before HMRC asks normally ends better than one they prompt. If a letter has already arrived, we read it with you and settle your position before you reply, because your first answer shapes the rest of the enquiry.",
  },
  {
    question: "What changes for landlords' income tax from April 2027?",
    // house_positions.md §7 (22/42/47 on property income from 6 April 2027, England, Wales and NI,
    // Scotland carved out, enacted law) and §4 (finance-cost reducer at 22%)
    answer:
      "From 6 April 2027, rental income is taxed at its own rates: 22% basic, 42% higher and 47% additional, in place of 20%, 40% and 45%. This applies in England, Wales and Northern Ireland; Scottish taxpayers stay on the rates Holyrood sets. The tax credit for mortgage interest rises from 20% to 22% at the same time, so a higher-rate landlord's gap stays at 20 points. These rates are already law, not a proposal.",
  },
  {
    question: "Will you tell me if I should do nothing?",
    answer:
      "Yes, and it happens often. Leaving things as they are is a proper recommendation, and once the numbers are run it is the right one for many landlords. We would rather tell you that on a free call than sell you a restructure that costs more than it saves. If your current setup is already the right one, the note says so and shows you why.",
  },
];

/**
 * Ours, kept (carve-out 5). Their version emits FAQPage only. BreadcrumbList
 * comes from <Breadcrumb>.
 */
/* 2026-10-09 (WP1 service rewrite, blueprint 3.1 schema): `@id` added; provider
   now references the canonical Organization node by `@id` instead of redefining
   it (the node the layout emits is `${siteConfig.url}#organization`, no slash,
   per packages/web-shared/schema/organization.ts); areaServed is the Country
   "United Kingdom" rather than the code GB; name equals the H1; hasOfferCatalog
   is built from `services`, the array that renders the "What we do" H3s. Each
   entry is a named Offer rather than an Offer wrapping a Service: the verify
   script treats every Service node as the page's own (check 17) and a nested
   one without @id, provider and areaServed blocks. */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}#service`,
  name: "Property tax advice from specialist advisors",
  serviceType: "Property tax advisory and consultation",
  description:
    "One-off property tax advice for UK landlords and investors on incorporation and structuring, capital gains tax on a sale or gift, Section 24, stamp duty land tax, inheritance tax and HMRC enquiries.",
  url: pageUrl,
  provider: { "@id": `${siteConfig.url}#organization` },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  audience: {
    "@type": "Audience",
    audienceType: "UK landlords and property investors",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property tax advice services",
    itemListElement: services.map((item) => ({
      "@type": "Offer",
      name: item.title,
      description: item.definition,
    })),
  },
};

const h2 = "text-2xl font-bold text-slate-900 sm:text-4xl";
const bodyText = "mt-4 text-sm sm:text-base leading-relaxed text-slate-700";

export default function PropertyTaxAdvicePage() {
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

      <section
        className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] overflow-hidden ${heroCreamSurface}`}
      >
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Property tax advice" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Property tax advice from specialist advisors
            </h1>
            {/* 2026-10-09: the first sentence is today's opening, kept verbatim
                in place (it is the positioning ChatGPT cites). The two sentences
                after it bring the paragraph to the blueprint's answer-first
                length. No link in this paragraph (check 13). */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free
              consultation scopes the question, quotes a fixed fee, and tells you if you do not need us. We work only
              on property tax: bring us one decision, from a purchase or gift to an HMRC letter, and we cost each
              option before you commit. Your accounts stay where they are, and we work by video call across the UK.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* The secondary CTA pointed at the FAQ, which the designer's own
                  rule forbids: a hero secondary sends the reader to something
                  they can do, not to a list of questions. */}
              <Link
                href="/contact"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a consultation
              </Link>
              {/* 2026-10-09: data-cta added, matching the other two service pages.
                  Label changed from "Try the free calculators": the same label
                  next to the shared stats strip made 8-word sequences identical
                  to both siblings (verify check 11). */}
              <Link
                href="#free-tools"
                data-cta="hero_calculators"
                data-cta-placement="hero"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Run the free calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip, same treatment as the homepage: white with a hairline, so
          it reads as a break from the hero rather than a section of its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
        </div>
      </section>

      {/* 2026-10-09: H2 1 is today's section, kept word for word and in place:
          it is the positioning ChatGPT quotes. Only the id is new. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Why advice first</Eyebrow>
            <h2 id="advice-not-another-set-of-accounts" className={h2}>
              Advice, not another set of accounts
            </h2>
            <p className={bodyText}>
              Most property tax is lost at the point of a decision, not at the point of filing. By the time a return is
              prepared the choice is already made, and the return simply reports what it cost.
            </p>
            <DecisionWindow />
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700">
              This is a consultation service for that earlier moment. You bring a specific decision, we model it against
              your real figures, and you get a written note with the options costed and a clear recommendation. It is a
              defined piece of work with a fixed fee, not a retainer.
            </p>
            <p className={bodyText}>
              If what you actually need is someone to run the annual return, the rental schedules, the company accounts
              and the quarterly Making Tax Digital submissions, that is a different service and it lives on our{" "}
              <InlineLink href="/services/property-accountant">property accountant page</InlineLink>. Plenty of people
              use both. Plenty use only one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 id="tax-advice-for-landlords-what-a-consultation-covers" className={h2}>
              Tax advice for landlords: what a consultation covers
            </h2>
            <p className={bodyText}>
              Our landlord tax advice covers six decisions, and one consultation can take in one or several.
            </p>
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
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Where it matters</Eyebrow>
            <h2 id="property-tax-specialists-for-the-decisions-that-cost-most" className={`${h2} text-balance`}>
              Property tax specialists for the decisions that cost most
            </h2>
            <p className={bodyText}>
              As property tax specialists we see six moments again and again, each cheaper to get right before than to
              unpick after. You do not need a property tax expert for every question, but you do for these.
            </p>
            <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {triggerPrompts.map((t) => (
                <li key={t.tag} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
                  <span className="flex items-center gap-3">
                    <t.icon aria-hidden className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.75} />
                    <span className="font-bold text-slate-900">{t.tag}</span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-slate-700">{t.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
              A landlord tax specialist is worth most before the event, so call while it is still a choice.
            </p>
            <Link
              href="#book"
              data-cta="triggers_book"
              data-cta-placement="triggers"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6 w-full sm:w-auto`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Advisor or accountant</Eyebrow>
            <h2 id="property-tax-advisor-or-accountant-which-do-you-need" className={h2}>
              Property tax advisor or accountant: which do you need?
            </h2>
            <p className={bodyText}>
              You need a property tax advisor when a decision is still open, and an accountant when a return is due.
              An accountant reports what has happened. We change what happens next, which is why a buy-to-let tax
              advisor earns their keep before a purchase, a disposal or an incorporation.
            </p>
            <div className="mt-8 overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-6">
              <table className="w-full min-w-[32rem] border-collapse text-sm">
                <caption className="sr-only">A property accountant compared with a property tax advisor</caption>
                <thead>
                  <tr className="border-b-2 border-slate-300 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-900">
                      <span className="sr-only">Area</span>
                    </th>
                    <th className="py-2 pr-4 font-bold text-slate-900">A property accountant</th>
                    <th className="py-2 font-bold text-emerald-800">A property tax advisor</th>
                  </tr>
                </thead>
                <tbody>
                  {advisorOrAccountant.map(([area, accountant, advisor]) => (
                    <tr key={area} className="border-b border-slate-200 align-top last:border-b-0">
                      <th scope="row" className="py-3 pr-4 text-left font-semibold text-slate-900">
                        {area}
                      </th>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{accountant}</td>
                      <td className="py-3 leading-relaxed text-slate-700">{advisor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={bodyText}>
              Many landlords keep their accountant and use us only for the decision.
            </p>
            <Link
              href="#book"
              data-cta="comparison_book"
              data-cta-placement="comparison_table"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6 w-full sm:w-auto`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Enquiries and disclosures</Eyebrow>
            <h2 id="property-tax-consultants-for-hmrc-enquiries-and-disclosures" className={h2}>
              Property tax consultants for HMRC enquiries and disclosures
            </h2>
            <p className={bodyText}>
              We act as property tax consultants when HMRC is already involved: a nudge letter about rental income, a
              formal enquiry into a return, or a disclosure you would rather make before anyone asks.
            </p>
            <p className={bodyText}>
              When an enquiry opens, HMRC asks for records and explanations. We read the letter with you, work out
              which years and figures are in question, and agree the reply before it goes.
            </p>
            <p className={bodyText}>
              If rent has gone undeclared, we prepare the disclosure through the Let Property Campaign; our page on{" "}
              <InlineLink href="/for/rental-income-disclosure">disclosing past rental income</InlineLink> explains how
              it runs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Who we work with</Eyebrow>
            <h2 id="who-we-work-with" className={h2}>
              Who we work with
            </h2>
            <p className={bodyText}>
              We work with landlords and property investors facing a tax decision, from one buy-to-let to a portfolio in
              a company.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              <li>
                Landlords who want the numbers before{" "}
                <InlineLink href="/for/moving-property-into-a-limited-company">
                  moving property into a limited company
                </InlineLink>
                .
              </li>
              <li>
                Landlords{" "}
                <InlineLink href="/for/selling-a-buy-to-let">selling a buy-to-let</InlineLink>, where the year and
                the ownership split change the bill.
              </li>
              <li>
                Landlords planning{" "}
                <InlineLink href="/for/landlord-retirement-and-succession">
                  retirement and succession
                </InlineLink>
                .
              </li>
              <li>
                Investors who want property investment tax advice before the next purchase, not after it.
              </li>
              <li>
                Commercial property owners, where we check capital allowances on fixtures; our{" "}
                <InlineLink href="/blog/property-types-and-specialist-tax/capital-allowances-on-property">
                  capital allowances guide
                </InlineLink>{" "}
                explains the claim.
              </li>
              <li>
                Landlords living abroad, through our{" "}
                <InlineLink href="/services/non-resident-landlord">non-resident landlord service</InlineLink>.
              </li>
              <li>
                Small landlords with one or two properties, where our small landlord tax advice often ends in &ldquo;change
                nothing&rdquo;.
              </li>
            </ul>
            <p className={bodyText}>
              We work only on property tax. We do not advise trading businesses or payroll.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The engagement</Eyebrow>
            <h2 id="how-an-engagement-works" className={h2}>
              How an engagement works
            </h2>
            <p className={bodyText}>An engagement works in three steps, and the first one costs nothing.</p>
            <ProcessTimeline steps={engagement} />
            <p className={bodyText}>
              We can carry the plan out if you want us to. Nothing ties you to us afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* Their ordering, adopted: the deliverables band moves from second-to-last
          to the middle, so the "what do I actually get" answer arrives before the
          differentiation argument rather than after it (report 03 §7.2). */}
      {/* 2026-10-09: the band now sits under "How an engagement works" with no
          heading of its own (the blueprint H2 set has no deliverables H2), so
          its list reads as the end of the engagement. */}
      <section className="bg-slate-900 py-12 text-white sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow onDark>Deliverables</Eyebrow>
            <p className="mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl">What you take away from it</p>
            <DrawnTickList
              items={deliverables}
              className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base"
            />

            {/* Placed at the foot of the deliverables rather than in a strip of
                its own: the reader has just finished the list of what they get,
                which is the point the price question turns into a booking. */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="#book"
                data-cta="deliverables_book"
                data-cta-placement="deliverables"
                data-cta-goal="form"
                className={`${btnPrimary} w-full sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
              <p className="text-sm text-slate-400">The first call is free and commits you to nothing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The fees section slot (blueprint 3.1 item 8, ruling R7): how fees are
          set, no figure, until F3 exists. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Fees</Eyebrow>
            <h2 id="what-advice-costs" className={h2}>
              What advice costs
            </h2>
            <p className={bodyText}>
              What advice costs depends on the question, and we quote it as a fixed fee before any work begins. How much
              property tax consultants charge turns on four things: how many properties, how they are owned, how many
              taxes the decision touches, and how much modelling it takes.
            </p>
            <p className={bodyText}>
              Timing the sale of one flat is a small job; restructuring a portfolio across two spouses and a company is a
              large one. We do not bill by the hour and there is no retainer. If the question changes, we tell you
              before any extra fee applies.
            </p>
          </div>
        </div>
      </section>

      <section id="free-tools" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 id="run-the-numbers-yourself-first" className={h2}>
              Run the numbers yourself first
            </h2>
            <p className={bodyText}>
              Before you book, you can size several of these questions yourself with our free calculators. If the number
              comes out small, you may not need us at all, and we would much rather you learned that here.
            </p>
            <div className="mt-8">
              <CalculatorTabs tabs={["section24", "incorporation", "mtd", "stampduty"]} />
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
                the same reasoning. Reachability is unaffected (SiteFooter ships
                per-tool links site-wide), so nothing is orphaned. */}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Moving parts</Eyebrow>
            <h2 id="the-rules-your-advice-has-to-work-around-in-2026-27" className={h2}>
              The rules your advice has to work around in 2026/27
            </h2>
            <p className={bodyText}>
              The rules your advice has to work around are moving, and several changes already in law land by April
              2028. We advise on the rules as they will stand.
            </p>
            {/* Worked example. house_positions.md §4 (credit at 20% for 2026/27, 22% from 2027/28) and §7
                (property income at 40% then 42% for a higher-rate landlord; wedge stays 20 points).
                £12,000 x 20% = £2,400; £12,000 x 22% = £2,640. */}
            <p className={bodyText}>
              Take a higher-rate landlord paying £12,000 a year in mortgage interest. In 2026/27 the interest earns a
              20% tax credit, worth £2,400, against rent taxed at 40%. From 2027/28 the credit is 22%, worth £2,640,
              against rent taxed at 42%. The gap between relief and rate stays at 20 points; what rises is the tax on
              the profit itself.
            </p>

            <div className="mt-8 overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-900">Change</th>
                    <th className="py-2 pr-4 font-bold text-slate-900">Position</th>
                    <th className="py-2 font-bold text-slate-900">From</th>
                  </tr>
                </thead>
                <tbody>
                  {changes.map(([change, position, from]) => (
                    <tr key={change} className="border-b border-slate-200 align-top">
                      <td className="py-3 pr-4 font-semibold text-slate-900">{change}</td>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{position}</td>
                      <td className="py-3 whitespace-nowrap text-slate-700">{from}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Owner rule 33: the note goes on every visual carrying figures,
                  including statutory ones. The structurally identical changes
                  table on /landlord-tax already carries it; this one is the same
                  table with the same rates, so it carries it too. */}
              <ExampleFigureNote className="mt-3" />
            </div>
            <p className={bodyText}>
              Our <InlineLink href="/property-tax-rates">property tax rates reference</InlineLink> carries every rate
              and threshold if you want the detail before a call.
            </p>

            {/* Carve-out 5. Their re-layout deleted this box and all eight blog
                deep links with it. Owner 2026-08-23 moved it down here from the
                Scope section, under the changes table: a reader who has just met
                the rules that are moving is the one who wants to read further,
                and it no longer interrupts the run from scope into process.
                `bg-white` because this section's ground is slate-50 and a
                slate-50 card on it would have no edge (DESIGN_SYSTEM §4a). */}
            {/* 2026-10-09: same place, same eight links; cards without excerpts
                (see the note on `backgroundReading`). */}
            <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">Background reading before you book</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                Our guides on the questions consultations most often turn on.
              </p>
              <RelatedArticles
                className="mt-5"
                items={backgroundReading.map(({ href, label }) => ({ href, title: label }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2026-10-09: TestimonialsSection removed. It named three cities outside
          "Where we work" (rule R4 and the writer prompt) and carried an
          unverifiable "worth the fee" line; the blueprint 3.4 H2 set has no
          testimonials section. */}

      {/* Both anchor forms, so neither 404s. Ours shipped `#faq` and was linked
          from our own hero; theirs renames it `#faqs`. Report 03 §7.2 found no
          internal or documented reference to either, but an off-site one cannot
          be ruled out and two ids cost one element. */}
      <div id="faqs" className="scroll-mt-24">
        <div id="faq" className="scroll-mt-24">
          <FaqSection title="Questions about a consultation" faqs={faqs} headingId="questions-about-a-consultation" />
        </div>
      </div>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Further reading</Eyebrow>
            <h2 id="related-guides-and-services" className={h2}>
              Related guides and services
            </h2>
            <p className={bodyText}>
              These guides cover the ground most of our consultations start from.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {relatedGuides.map((g) => (
                <li key={g.href}>
                  <InlineLink href={g.href}>{g.label}</InlineLink>
                </li>
              ))}
            </ul>
            <p className={bodyText}>
              For the yearly returns and accounts rather than one decision, see our{" "}
              <InlineLink href="/services/landlord-accountant">landlord accountants for UK rental income</InlineLink>,
              or the property accountant service linked near the top of this page.
            </p>
          </div>
        </div>
      </section>

      {/* Anchor for every primary CTA on the page. `scroll-mt` clears the sticky
          header so the panel's heading is not hidden under it on arrival. */}
      {/* 2026-10-09: title reworded so the UK spelling "adviser" appears once, in
          an H2 (assignment row "property tax adviser", placement h2). It still
          opens "Get specialist", which keeps the panel in the verify script's
          shared-component exclusion. Proof points and footnote unchanged
          (blueprint 3.1 items 9 and 12: left as they are until F5). Footnote
          now the /about panel's line: the old "If the answer is simple" is on
          the verify script's AI-tell list (check 10). */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          headingId="get-advice"
          title="Get specialist advice from a property tax adviser on the decision in front of you"
          description="Tell us the decision you are weighing up. We will scope the question, quote a fixed fee, and tell you up front if you do not need us."
          proofPoints={[
            { title: "One-off advice welcome", detail: "No need to move your accounts to us" },
            { title: "Fixed fees, quoted upfront", detail: "You approve the fee before any work starts" },
            { title: "A free first call", detail: "No obligation, and we say so if you do not need us" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* Local coverage (blueprint 3.1 items 4 and 13): the one sentence that
          serves the "near me" and stacked-UK rows without the strings, and the
          only place on the page a city is named. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Coverage</Eyebrow>
            <h2 id="where-we-work" className={h2}>
              Where we work
            </h2>
            <p className={bodyText}>
              We advise landlords anywhere in the UK by video call and phone, so your postcode makes no difference to
              the service; our pages for <InlineLink href="/locations/london">London</InlineLink>,{" "}
              <InlineLink href="/locations/manchester">Manchester</InlineLink>,{" "}
              <InlineLink href="/locations/birmingham">Birmingham</InlineLink>,{" "}
              <InlineLink href="/locations/leeds">Leeds</InlineLink> and{" "}
              <InlineLink href="/locations/bristol">Bristol</InlineLink> describe the local work.
            </p>
            <p className={bodyText}>
              Each consultation runs the same way wherever you are: a free call, a fixed quote, then the note. Where
              Scotland or Wales has its own version of a tax, such as stamp duty, we advise on that version.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
