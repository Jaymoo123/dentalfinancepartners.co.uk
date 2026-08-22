import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
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

function Section({
  id,
  title,
  children,
  links,
}: {
  id: string;
  title: string;
  children: ReactNode;
  links?: { href: string; label: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
      {links && links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-emerald-700 hover:text-emerald-800">
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

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

      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Leasehold" }]} />
          <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Leasehold explained: extensions, right to manage, service charges and ground rent
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Most leasehold content published since 2024 tells you marriage value has gone and extensions now run to
            990 years. Neither is in force. Here is what the law actually is today, what it costs, and where the tax
            lands.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className={`${btnPrimary} bg-emerald-600 border-emerald-800 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Talk to a property tax specialist
            </Link>
            <Link
              href="/calculators/stamp-duty-calculator"
              className={`${btnSecondary} border-white bg-white/10 px-6 py-3 text-center text-sm text-white hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Check the stamp duty on a premium
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <Section
              id="what-is-leasehold"
              title="What leasehold actually is"
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
                sits in five or six separate Acts. Flats are governed by the Leasehold Reform, Housing and Urban
                Development Act 1993, houses by the Leasehold Reform Act 1967, management by the Commonhold and
                Leasehold Reform Act 2002, service charges by the Landlord and Tenant Act 1985, and ground rent on
                new leases by the Leasehold Reform (Ground Rent) Act 2022. The Leasehold and Freehold Reform Act 2024
                amends several of them, but only in part, which is where nearly all the confusion comes from.
              </p>
              <p>
                This page describes the position in <strong>England</strong>. Wales shares most of the primary
                statutory framework but some regulations, including the right to manage model articles, are made for
                England separately. Scotland abolished long residential leases and has no equivalent regime, and
                Northern Ireland has its own.
              </p>
            </Section>

            <Section
              id="in-force"
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
              <div className="overflow-x-auto">
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
            </Section>

            <Section
              id="lease-extension"
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
              <p>The premium is built from three components, discounted at a statutory deferment rate:</p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong>Term.</strong> The value to the freeholder of the ground rent still to be received over the
                  unexpired term.
                </li>
                <li>
                  <strong>Reversion.</strong> The deferred value of getting the flat back when the lease ends,
                  discounted at the post-Sportelli 5% deferment rate.
                </li>
                <li>
                  <strong>Marriage value.</strong> The uplift in combined value created by merging the freehold
                  interest with a longer lease. It applies only where the unexpired term is under 80 years, and it is
                  still payable, because the abolition in the 2024 Act is not in force.
                </li>
              </ul>
              <p>
                That third component is the 80-year cliff. Above 80 years unexpired, no marriage value. Below it, the
                premium steps up sharply and keeps climbing as the term shortens. If your lease is near 80 years, the
                date you serve notice matters more than anything else on this page.
              </p>
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
            </Section>

            <Section
              id="right-to-manage"
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
                The 2024 Act reforms to right to manage are the ones that did commence, on 3 March 2025 under
                SI 2025/131, and they changed three things worth knowing. The non-residential floor space limit rose
                from 25% to 50%, which brings a large number of shop-and-flats buildings into scope for the first
                time. The First-tier Tribunal is now the first instance forum rather than the High Court. And the old
                rule that the RTM company paid the landlord&apos;s process costs win or lose has gone: the general
                rule is now no liability, with a narrow exception where a claim is withdrawn and the company acted
                unreasonably.
              </p>
              <p>
                The mechanics are strict and the deadlines are statutory. The RTM company must be a private company
                limited by guarantee using the prescribed model articles, membership at the point of service must
                cover qualifying tenants of at least half the flats, and the claim notice must allow the landlord at
                least one month to serve a counter-notice. Get a notice wrong and the claim fails on procedure rather
                than on merit.
              </p>
            </Section>

            <Section
              id="service-charges"
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
                The consultation thresholds are the ones most often misquoted. Consultation is required where
                qualifying works would cost any one leaseholder more than <strong>£250</strong>, and where a
                qualifying long term agreement would cost any one leaseholder more than <strong>£100</strong> in an
                accounting period. Both figures are per leaseholder, not per building or per project. Where the
                landlord fails to consult, the recoverable amount is capped at those figures, although the tribunal
                can dispense with consultation where leaseholders suffered no real prejudice.
              </p>
              <p>
                There is also an 18-month rule. A landlord cannot demand a service charge more than 18 months after
                the cost was incurred, unless it notified leaseholders within that 18 months that the cost had been
                incurred and a demand would follow. The notification limb is what turns the rule from a hard bar into
                a conditional one, and it is where most 18-month arguments are actually won or lost.
              </p>
              <p>
                Tribunal applications carry a fee. From 6 July 2026 an application to determine service charge
                liability costs £114 to issue and £227 if it goes to a hearing.
              </p>
            </Section>

            <Section
              id="ground-rent"
              title="Ground rent: three separate states, constantly confused"
              links={[
                { href: `${BLOG}/ground-rent-rules-uk`, label: "Ground rent rules, law versus draft" },
              ]}
            >
              <p>
                Almost every ground rent question resolves once you separate three things that most coverage runs
                together.
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong>New leases: law.</strong> The Leasehold Reform (Ground Rent) Act 2022 limits ground rent on
                  new qualifying residential long leases to a peppercorn. Commenced by SI 2022/694 on 30 June 2022,
                  and on 1 April 2023 for retirement home leases. A prohibited term is automatically treated as a
                  peppercorn, and an enforcement authority can impose a penalty of between £500 and £30,000 per
                  breach, with refund orders on top.
                </li>
                <li>
                  <strong>Existing leases: unchanged.</strong> The 2022 Act does not touch a lease granted before it
                  commenced. A doubling clause or an RPI-linked escalator in a 2015 lease is enforceable exactly as
                  drafted. The statutory escape route is a lease extension, because a statutory extension takes
                  effect at a peppercorn.
                </li>
                <li>
                  <strong>The £250 cap: not law.</strong> It sits in the draft Commonhold and Leasehold Reform Bill.
                  It is not in the 2024 Act, it has not been enacted, and it should not appear in any calculation you
                  rely on.
                </li>
              </ul>
              <p>
                One historic worry has genuinely closed. A long lease with ground rent above £250 a year, or £1,000
                in Greater London, could technically fall within the assured tenancy rules, which caused years of
                lender caution about doubling clauses. Fixed-term tenancies exceeding 21 years are now excluded from
                assured status regardless of the rent level.
              </p>
            </Section>

            <Section
              id="tax"
              title="The tax nobody mentions until completion"
              links={[
                { href: "/calculators/stamp-duty-calculator", label: "Stamp duty calculator" },
                { href: "/landlord-tax", label: "Landlord tax guide" },
                {
                  href: `${BLOG}/archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt`,
                  label: "Lease extensions and the Scottish position",
                },
              ]}
            >
              <p>
                <strong>Stamp duty on an extension premium.</strong> A statutory lease extension is treated for
                stamp duty land tax as a surrender of the old lease and the grant of a new one, so the premium is
                chargeable consideration. Rent at a peppercorn contributes nothing to the net present value
                calculation, so in practice the premium is the charge. The trap is the additional dwellings
                surcharge: where the premium reaches £40,000 and you already own another residential property, the 5%
                surcharge applies to the whole premium. That catches a meaningful share of London and South East
                extensions, and it is routinely missed until the return is prepared.
              </p>
              <p>
                <strong>Collective enfranchisement is calculated differently.</strong> The total consideration is
                divided by the number of qualifying flats, the rates are applied to that per-flat figure, and the
                result is multiplied back up. Because the per-flat fraction often falls in or below the nil rate
                band, the charge is usually far lower than applying the rates to the aggregate price. Buying the
                freehold of a house is a straightforward purchase taxed in the ordinary way.
              </p>
              <p>
                <strong>Capital gains tax.</strong> The leaseholder has no capital gains tax charge on extending or
                enfranchising, because money is going out rather than coming in. The premium is capital expenditure
                that increases the base cost of the property for a future disposal, so keep the paperwork. The
                freeholder is the one making a disposal, taxed at residential rates of 18% and 24% for an individual
                or within the corporation tax charge for a company.
              </p>
              <p>
                <strong>Deductibility on a let flat.</strong> Ground rent and service charges are revenue expenses
                and come off rental income in the normal way. The extension premium does not: it is capital, and the
                distinction is absolute rather than a matter of degree. If the flat is held in a company and a
                revaluation after extension pushes it over £500,000, check the annual tax on enveloped dwellings
                position before the next valuation date.
              </p>
            </Section>

            <Section
              id="where-to-start"
              title="Where to start if your lease is getting short"
              links={[
                { href: "/resources/leasehold", label: "Leasehold resource hub" },
                { href: "/blog/property-types-and-specialist-tax", label: "All specialist property tax guides" },
                { href: "/services/property-tax-advice", label: "Property tax advice" },
              ]}
            >
              <p>
                Find the unexpired term first, from the lease itself or the title register, and work out how far it
                is from 80 years. That single number decides whether this is urgent or merely important. Under 85
                years and you should be getting a valuation now, because a claim served before the term passes 80
                avoids marriage value entirely.
              </p>
              <p>
                Then decide the route: extend, enfranchise, take over management, or do nothing for now. They answer
                different problems. Extension protects value and mortgageability. Enfranchisement removes the
                freeholder. Right to manage fixes bad management without buying anything. Doing nothing is a real
                option on a lease with 120 years left and a competent managing agent.
              </p>
              <p>
                Our side of it is the tax: the stamp duty on the premium, whether the surcharge bites, what is
                deductible against rent, and how the premium affects the eventual gain. The valuation and the notices
                are a surveyor and a solicitor. Getting all three lined up before serving notice is what stops a
                claim becoming expensive.
              </p>
            </Section>

            <div className="mt-12 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Leasehold questions</h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Check the tax before you serve notice"
        description="Book a free consultation. We will look at the stamp duty on the premium, the surcharge position, and what the extension does to your eventual capital gains tax."
        primaryLabel="Book free consultation"
        secondaryHref="/calculators/stamp-duty-calculator"
        secondaryLabel="Check the stamp duty first"
      />
    </>
  );
}
