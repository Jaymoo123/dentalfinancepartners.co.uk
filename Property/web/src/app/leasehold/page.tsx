import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { FaqSection } from "@/components/ui/FaqSection";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { TopicHero, TopicSection } from "@/components/property/TopicSection";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { InlineLink } from "@/components/ui/page-blocks";
import {
  CommencementTimeline,
  GroundRentStates,
  LeaseholdStatuteMap,
  LeaseholdTaxCards,
  PremiumStack,
  RtmChanges,
  ServiceChargeLevers,
} from "@/components/property/leasehold-figures";
import { btnOnCream, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

const PAGE_PATH = "/leasehold";
const TITLE = "Leasehold Explained: Extensions, RTM and Service Charges";
const DESCRIPTION =
  "What is actually in force under the 2024 Act, why marriage value still applies, and how lease extensions, RTM, service charges and ground rent work.";

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
    description: DESCRIPTION,
  },
};

const BLOG = "/blog/property-types-and-specialist-tax";

/**
 * Condensed LFRA 2024 commencement ledger. This is the maintained differentiator
 * on this page: most leasehold content on the web asserts that marriage value is
 * abolished and that extensions run to 990 years, and both are wrong today.
 * Source of truth: docs/property/house_positions.md §31.3a (re-locked 2026-08-15,
 * commencement register exhausted: only SI 2024/1018, SI 2025/57, SI 2025/131).
 * The full row-by-row version lives on the leasehold-reform-act-2024 post.
 */
const inForce = [
  {
    provision: "Two-year ownership rule abolished",
    status: "In force (January 2025)",
    effect: "A buyer can serve an extension notice immediately on completion. No waiting period.",
  },
  {
    provision: "Right to Manage reforms (ss.49 to 52, s.64)",
    status: "In force (3 March 2025, SI 2025/131)",
    effect:
      "Non-residential limit raised from 25% to 50%, tribunal is first instance, and the RTM company no longer pays the landlord's process costs as a general rule.",
  },
  {
    provision: "Building safety amendments (ss.114 to 116, s.120)",
    status: "In force (31 October 2024, SI 2024/1018)",
    effect: "Remediation order machinery is live.",
  },
  {
    provision: "Marriage value abolition",
    status: "Not in force",
    effect:
      "Marriage value remains payable in full on any lease with under 80 years unexpired. This is the single most misreported point in leasehold coverage.",
  },
  {
    provision: "990-year lease term at a peppercorn",
    status: "Not in force",
    effect:
      "A statutory extension of a flat completed today adds 90 years to the existing term, at a peppercorn ground rent.",
  },
  {
    provision: "Prescribed deferment and capitalisation rates",
    status: "Not in force. Consultation closes 23 September 2026",
    effect:
      "The post-Sportelli 5% deferment rate remains the working rate. Prescribed rates could move premiums either way.",
  },
  {
    provision: "Service charge transparency (ss.53 to 58)",
    status: "Not in force",
    effect:
      "Landlord and Tenant Act 1985 sections 18 to 30 and SI 2003/1987 remain the operative regime.",
  },
  {
    provision: "Extension and enfranchisement costs reform (s.60 repeal)",
    status: "Not in force",
    effect:
      "You still pay the freeholder's reasonable legal and valuation costs on an extension claim, even though you no longer do on an RTM claim.",
  },
  {
    provision: "£250 ground rent cap",
    status: "Draft Bill only",
    effect:
      "Sits in the Commonhold and Leasehold Reform Bill, not in the 2024 Act. It is not law and should never be planned around.",
  },
];

/**
 * The "where to start" run, as steps. This is the closing section's own three
 * paragraphs, split at their natural joins and not otherwise rewritten: the
 * copy was already a sequence, and only its shape has changed.
 */
const nextSteps = [
  {
    n: "01",
    title: "Find the unexpired term",
    body: "From the lease itself or the title register, and work out how far it is from 80 years. That single number decides whether this is urgent or merely important. Under 85 years and you should be getting a valuation now, because a claim served before the term passes 80 avoids marriage value entirely.",
  },
  {
    n: "02",
    title: "Decide the route",
    body: "Extend, enfranchise, take over management, or do nothing for now. They answer different problems. Extension protects value and mortgageability. Enfranchisement removes the freeholder. Right to manage fixes bad management without buying anything. Doing nothing is a real option on a lease with 120 years left and a competent managing agent.",
  },
  {
    n: "03",
    title: "Line up all three advisers before serving notice",
    body: "Our side of it is the tax: the stamp duty on the premium, whether the surcharge bites, what is deductible against rent, and how the premium affects the eventual gain. The valuation and the notices are a surveyor and a solicitor. Getting all three lined up before serving notice is what stops a claim becoming expensive.",
  },
];

const faqs = [
  {
    question: "Has marriage value been abolished?",
    answer:
      "No. The Leasehold and Freehold Reform Act 2024 provides for abolition, but that provision has not been commenced, so it is not in force. A lease extension or enfranchisement claim made today on a lease with fewer than 80 years unexpired still pays marriage value in full. Most online coverage published since 2024 gets this wrong. The valuation provisions are widely expected to need secondary legislation first, and the consultation on prescribed deferment and capitalisation rates does not close until 23 September 2026, so realistic commencement is 2027 or later. Treat any specific commencement date you find online as unreliable.",
  },
  {
    question: "How long is a statutory lease extension?",
    answer:
      "For a flat under Chapter II of the Leasehold Reform, Housing and Urban Development Act 1993, the extension adds 90 years to your existing unexpired term and reduces the ground rent to a peppercorn. The 990-year term legislated by the 2024 Act is not in force, so nobody is completing a 990-year extension today. For a house under the Leasehold Reform Act 1967 the statutory extension is 50 years at a modern ground rent, which is why most house leaseholders buy the freehold instead.",
  },
  {
    question: "Why does the premium jump below 80 years?",
    answer:
      "Because marriage value enters the valuation once the unexpired term falls below 80 years. Marriage value is the uplift in the combined value of the freehold and the extended lease, and it is currently shared between leaseholder and freeholder. Above 80 years it is not payable at all. That is the 80-year cliff, and it is the reason extension advice is time-critical: the difference between serving notice at 80 years and one month and serving it at 79 years and 11 months can be thousands of pounds.",
  },
  {
    question: "Do I have to have owned the flat for two years to extend?",
    answer:
      "No, not since January 2025. The two-year qualifying ownership rule was abolished by the 2024 Act and that abolition is in force. A buyer can serve a section 42 notice immediately on completion. This is one of only a small number of 2024 Act provisions that genuinely are current law.",
  },
  {
    question: "Is ground rent capped at £250?",
    answer:
      "No. The £250 cap sits in the draft Commonhold and Leasehold Reform Bill and is not enacted. What is law is the Leasehold Reform (Ground Rent) Act 2022, which limits ground rent on new qualifying residential long leases to a peppercorn, commenced by SI 2022/694 on 30 June 2022 for most leases and 1 April 2023 for retirement home leases. It does not touch existing leases at all, so a contractual doubling or RPI-linked clause in a lease granted before then stands as drafted.",
  },
  {
    question: "Does Right to Manage change who owns the building?",
    answer:
      "No. Right to Manage transfers management functions to a company owned by the leaseholders. The freeholder still owns the freehold, the lease terms are unchanged, the lease length is unchanged and the ground rent is still payable. It is a no-fault right, so you do not have to prove mismanagement, and since 3 March 2025 a building can have up to 50% non-residential floor space and still qualify, up from 25%.",
  },
  {
    question: "Can I claim service charges and ground rent against rental income?",
    answer:
      "Yes, if you let the flat. Service charges and ground rent are revenue costs of the letting and are deducted from rental income in the normal way. The premium you pay to extend the lease is capital, not revenue, so it is not deductible against rent. It goes into the base cost of the lease for capital gains tax when you eventually sell.",
  },
];

export default function LeaseholdPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Leasehold explained: extensions, right to manage, service charges and ground rent",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    about: { "@type": "Thing", name: "Leasehold reform and lease extension" },
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
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Leasehold" }]} />}
        title="Leasehold explained: extensions, right to manage, service charges and ground rent"
        standfirst={
          <>
            Most leasehold content published since 2024 tells you marriage value has gone and extensions now run to
            990 years. Neither is in force. Here is what the law actually is today, what it costs, and where the tax
            lands.
          </>
        }
        primary={
          <Link
            href="#book"
            data-cta="leasehold_hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={`${btnPrimary} bg-emerald-600 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Talk to a property tax specialist
          </Link>
        }
        secondary={
          <Link
            href="/calculators/stamp-duty-calculator"
            data-cta="leasehold_hero_calculator"
            data-cta-placement="hero"
            className={`${btnOnCream} px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Check the stamp duty on a premium
          </Link>
        }
      />

      <TopicSection
        id="what-is-leasehold"
        eyebrow="The structure"
        title="What leasehold actually is"
        /* The six-Act sentence became a card each. The paragraph naming all six
           in a row was the least readable way to make the section's own point,
           which is that leasehold is a pile of separate statutes rather than a
           code. No Act, and no part of what each governs, was dropped. */
        figure={<LeaseholdStatuteMap />}
        links={[
          { href: `${BLOG}/lease-extension-vs-freehold-purchase`, label: "Extend the lease or buy the freehold" },
          { href: `${BLOG}/commonhold-and-leasehold-reform-bill`, label: "What the reform pipeline holds" },
        ]}
      >
        <p>
          A leasehold owner owns a lease, which is a wasting asset: the right to occupy a property for a fixed
          number of years, granted by a freeholder who keeps the underlying ownership. Everything difficult
          about leasehold follows from that one fact. The lease shortens every year, the freeholder retains
          rights over the building, and the leaseholder pays for services they do not control.
        </p>
        <p>
          Parliament has answered that with statutory rights rather than a single code, which is why the law
          sits in five or six separate Acts rather than in one place.
        </p>
        <p>
          This page describes the position in <strong>England</strong>. Wales shares most of the primary
          statutory framework but some regulations, including the right to manage model articles, are made for
          England separately. Scotland abolished long residential leases and has no equivalent regime, and
          Northern Ireland has its own.
        </p>
      </TopicSection>

      <TopicSection
        id="in-force"
        eyebrow="Commencement"
        tone="slate"
        title="What is actually in force under the 2024 Act"
        links={[
          {
            href: `${BLOG}/leasehold-reform-act-2024-what-is-in-force`,
            label: "The full provision-by-provision ledger",
          },
        ]}
      >
        <p>
          The Leasehold and Freehold Reform Act 2024 received Royal Assent, and that is where most reporting
          stopped. An Act on the statute book does nothing until its provisions are commenced by statutory
          instrument, and as at August 2026 exactly three commencement instruments exist: SI 2024/1018,
          SI 2025/57 and SI 2025/131. Three of the four headline reforms have not been commenced at all.
        </p>
        {/* The same events on a rail before the ledger below. The section's
            argument is entirely about WHEN, and a status column cannot show that
            three provisions commenced and four have not; a timeline can. The
            table stays: it is the provision-by-provision reference, and this is
            the shape of the story. */}
        <CommencementTimeline />
        {/* Designer's figure-card treatment, the same one the statutory
            changes tables on /landlord-tax and /services/property-tax-advice
            carry: a white card on the slate ground, the table inside it, and
            the owner's rule-33 note beneath. */}
        <div className="overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 text-left">
                <th className="py-2 pr-4 font-bold text-slate-900">Provision</th>
                <th className="py-2 pr-4 font-bold text-slate-900">Status</th>
                <th className="py-2 font-bold text-slate-900">What it means today</th>
              </tr>
            </thead>
            <tbody>
              {inForce.map((row) => (
                <tr key={row.provision} className="border-b border-slate-200 align-top">
                  <td className="py-2 pr-4 font-semibold text-slate-900">{row.provision}</td>
                  <td className="py-2 pr-4 text-slate-900">{row.status}</td>
                  <td className="py-2 text-slate-700">{row.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ExampleFigureNote className="mt-3" />
        </div>
        <p className="text-sm text-slate-500">
          Status checked against the commencement register on 15 August 2026. We re-check it before updating
          any leasehold page, and again after the valuation consultation closes on 23 September 2026.
        </p>
        <p>
          The freeholders challenged the marriage value, ground rent and costs provisions by judicial review.
          The Divisional Court dismissed the challenge on 24 October 2025, and the Court of Appeal has since
          given permission to appeal, so a second round is pending. Neither outcome commences or suspends
          anything: commencement is a purely governmental act, and the government has not exercised it for the
          valuation provisions.
        </p>
        <p>
          The practical rule for anyone making a decision this year is simple. Plan on the law as it is, not as
          it is drafted to become, and price any claim on the assumption that marriage value is payable.
        </p>
      </TopicSection>

      <TopicSection
        id="lease-extension"
        eyebrow="Section 42"
        title="Lease extension: what drives the premium"
        links={[
          { href: `${BLOG}/lease-extension-cost-uk`, label: "Lease extension cost, premium and fees" },
          {
            href: `${BLOG}/lease-extension-solicitor-what-they-do`,
            label: "What a lease extension solicitor does",
          },
          {
            href: `${BLOG}/lease-extensions-in-the-uk-surrender-and-regrant`,
            label: "Surrender and regrant, the legal mechanic",
          },
        ]}
      >
        <p>
          A qualifying flat leaseholder has a unilateral right under Chapter II of the 1993 Act to extend:
          serve a section 42 notice, and the freeholder must grant a new lease of the existing unexpired term
          plus 90 years, at a peppercorn ground rent. There is no negotiation about whether it happens, only
          about the price. Since January 2025 there is no qualifying ownership period, so a buyer can serve
          notice on the day of completion.
        </p>
        {/* The three components and the 80-year cliff, which were a bulleted
            list plus a paragraph. `PremiumStack` carries the same three bodies
            verbatim and draws the above-80 / under-80 split the copy called a
            cliff but rendered as one clause among five. Inline rather than via
            the `figure` prop because it belongs HERE, between the right to
            extend and what the whole thing costs, not at the foot of the
            section. */}
        <PremiumStack />
        <p>
          Costs sit on top of the premium. You pay your own legal and valuation fees and, because the section
          60 costs repeal in the 2024 Act is not in force, the freeholder&apos;s reasonable legal and valuation
          costs as well. A realistic all-in figure is commonly 1.3 to 1.8 times the headline premium. An
          individual flat extension typically runs 6 to 12 months, collective enfranchisement 9 to 18 months.
        </p>
        <p>
          Houses work differently. Under the 1967 Act a qualifying house leaseholder can either buy the
          freehold outright or take a 50-year extension at a modern ground rent. In practice almost everyone
          buys the freehold, because it ends the leasehold structure rather than deferring it. Collective
          enfranchisement of a block needs at least 50% of qualifying tenants to participate, which is a
          coordination problem more often than a legal one.
        </p>
      </TopicSection>

      <TopicSection
        id="right-to-manage"
        eyebrow="Taking over"
        tone="slate"
        title="Right to manage: control without buying anything"
        links={[
          { href: `${BLOG}/right-to-manage-explained`, label: "Right to manage explained" },
          { href: `${BLOG}/right-to-manage-company-setup`, label: "Setting up the RTM company" },
          { href: `${BLOG}/right-to-manage-process-steps`, label: "The RTM notices and deadlines" },
        ]}
      >
        <p>
          Right to manage under Part 2 of the Commonhold and Leasehold Reform Act 2002 moves the management
          functions of a building to a company owned by the leaseholders. It is a no-fault right, so there is
          nothing to prove: no mismanagement, no negligence, no dispute required. What does not move is
          ownership. The freeholder remains the freeholder, the lease terms are untouched, and ground rent
          stays payable.
        </p>
        <p>
          The 2024 Act reforms to right to manage are the ones that did commence, and they changed three things
          worth knowing.
        </p>
        {/* The three changes as before-and-after rows. A change is two states
            and a direction, and the paragraph this replaces had to spell all six
            states out in sequence. Every one of them is carried verbatim in
            `RtmChanges`, including the ownership caveat that closed it. */}
        <RtmChanges />
        <p>
          The mechanics are strict and the deadlines are statutory. The RTM company must be a private company
          limited by guarantee using the prescribed model articles, membership at the point of service must
          cover qualifying tenants of at least half the flats, and the claim notice must allow the landlord at
          least one month to serve a counter-notice. Get a notice wrong and the claim fails on procedure rather
          than on merit.
        </p>
      </TopicSection>

      <TopicSection
        id="service-charges"
        eyebrow="Disputes"
        title="Service charges: what you can actually challenge"
        links={[
          {
            href: `${BLOG}/service-charge-disputes-leaseholders`,
            label: "The leaseholder service charge toolkit",
          },
          {
            href: `${BLOG}/building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords`,
            label: "Cladding costs and leaseholder protections",
          },
        ]}
      >
        <p>
          Service charges are governed by the Landlord and Tenant Act 1985, not by the 2024 Act, because the
          transparency provisions in Part 4 of the 2024 Act have never been commenced. The 1985 Act gives four
          levers that matter: costs must be reasonably incurred and the work of a reasonable standard, major
          works need formal consultation, demands are time limited, and the First-tier Tribunal can determine
          liability.
        </p>
        <p>
          The consultation thresholds are the ones most often misquoted, and the 18-month rule is the one most
          often assumed to be absolute.
        </p>
        {/* The three numbers a leaseholder actually looks up, set as figures
            rather than buried mid-paragraph. The section's own line is that
            these are "the ones most often misquoted", which is the argument for
            giving them their own weight. The per-leaseholder qualifier travels
            with each one, because that is the specific thing people get wrong. */}
        <ServiceChargeLevers />
        <p>
          Where the landlord fails to consult, the recoverable amount is capped at those figures, although the
          tribunal can dispense with consultation where leaseholders suffered no real prejudice. On the 18-month
          rule, the notification limb is what turns it from a hard bar into a conditional one, and it is where
          most 18-month arguments are actually won or lost.
        </p>
        <p>
          Tribunal applications carry a fee. From 6 July 2026 an application to determine service charge
          liability costs £114 to issue and £227 if it goes to a hearing.
        </p>
      </TopicSection>

      <TopicSection
        id="ground-rent"
        eyebrow="Law against draft"
        tone="slate"
        title="Ground rent: three separate states, constantly confused"
        links={[
          { href: `${BLOG}/ground-rent-rules-uk`, label: "Ground rent rules, law versus draft" },
        ]}
      >
        <p>
          Almost every ground rent question resolves once you separate three things that most coverage runs
          together.
        </p>
        {/* Badged law / unchanged / not law. This is the section that most
            needed a figure: its own opening sentence asks the reader to separate
            three things, and a bulleted list ran them back together by giving
            all three identical weight and no status. Bodies are the three list
            items verbatim; the badge is the separation the copy asks for, said
            in one word. */}
        <GroundRentStates />
        <p>
          One historic worry has genuinely closed. A long lease with ground rent above £250 a year, or £1,000
          in Greater London, could technically fall within the assured tenancy rules, which caused years of
          lender caution about doubling clauses. Fixed-term tenancies exceeding 21 years are now excluded from
          assured status regardless of the rent level.
        </p>
      </TopicSection>

      <TopicSection
        id="tax"
        eyebrow="Stamp duty and gains"
        title="The tax nobody mentions until completion"
        /* The stamp duty calculator was the third card in this row. A card is
           the wrong affordance for a tool the reader can just USE: the section
           has spent four cards telling them the premium is chargeable
           consideration, so the tool goes in the section as a tab rather than as
           a link out of it. Only the two reading destinations stay as cards, and
           `kind: "guide"` overrides the href-derived pill on /landlord-tax,
           which is a pillar route and matches none of the four prefixes. */
        links={[
          { href: "/landlord-tax", label: "Landlord tax guide", kind: "guide" },
          {
            href: `${BLOG}/archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt`,
            label: "Lease extensions and the Scottish position",
          },
        ]}
      >
        {/* The four tax points as cards. Each was already a paragraph opening
            on a bolded label, which is a heading wearing a paragraph's clothes.
            `LeaseholdTaxCards` promotes those labels to real h3s and carries the
            four bodies verbatim, so the section gains four headings naming
            things people search for and loses no copy. */}
        <LeaseholdTaxCards />
        {/* The tool itself, in the site's tab treatment, rather than a card
            linking away to it. `CalculatorTabs` takes an explicit tab list, so
            this renders the one calculator this section is actually about.

            Note for the crawl-path guard in
            `src/tests/calculator-tabs-crawl-path.test.ts`: tabs are
            <button role="tab"> and emit no crawlable link, so this page needs a
            per-tool <a href> of its own. It has one, in the Scottish position
            paragraph below, which links /calculators/stamp-duty-calculator in
            prose. Do not remove that link while this block is here. */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            Put the premium through the stamp duty calculator
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Enter the premium as the purchase price. If you already own another residential property, the{" "}
            <InlineLink href="/calculators/stamp-duty-calculator">stamp duty calculator</InlineLink> will show the
            surcharge on the whole figure.
          </p>
          <div className="mt-5">
            <CalculatorTabs tabs={["stampduty"]} />
          </div>
        </div>
      </TopicSection>

      <TopicSection
        id="where-to-start"
        eyebrow="Next steps"
        tone="slate"
        title="Where to start if your lease is getting short"
        /* The three paragraphs were already a sequence: find the number, choose
           the route, line the advisers up. `ProcessTimeline` is the component the
           site already uses for an ordered run of steps, so the section says in
           its shape what it was saying in its order. Every sentence is carried
           through; nothing is summarised away. */
        figure={<ProcessTimeline steps={nextSteps} />}
        links={[
          { href: "/resources/leasehold", label: "Leasehold resource hub" },
          {
            href: "/blog/property-types-and-specialist-tax",
            label: "All specialist property tax guides",
          },
          { href: "/services/property-tax-advice", label: "Property tax advice" },
        ]}
      >
        <p>
          Three things, in this order. The first one decides whether the other two are urgent.
        </p>
      </TopicSection>

      {/* Anchor for the hero primary and the mid-page ask. `scroll-mt-24` clears
          the sticky header so the panel heading is not hidden on arrival. The
          copy is the CTASection copy this replaces, unchanged; the proof points
          are the trio already claimed in niche.config.json, /about and the four
          service pages, so nothing here is a new factual claim (rule 30). */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Check the tax before you serve notice"
          description="Book a free consultation. We will look at the stamp duty on the premium, the surcharge position, and what the extension does to your eventual capital gains tax."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* The light section that keeps the navy panel off the navy footer
          (adjacency rule, resolution 2). It also replaces a hand-rolled h3 list
          with the accordion every other FAQ on the site uses; the FAQPage
          JSON-LD is emitted separately above, so collapsing costs no schema. */}
      <FaqSection title="Leasehold questions" faqs={faqs} />
    </>
  );
}
