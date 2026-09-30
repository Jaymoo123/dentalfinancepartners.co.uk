import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { TopicHero, TopicSection } from "@/components/property/TopicSection";
import {
  DepositMoment,
  EmbedDeliverables,
  EpcStandards,
  ForwardTraits,
  MtdSplit,
  NotYetLive,
  PeriodicQuestions,
  WhatChanged,
} from "@/components/property/letting-agents-figures";
import { btnOnCream, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

const PAGE_PATH = "/for-letting-agents";
const TITLE = "For Letting Agents: What Your Landlords Will Ask You This Year";
const DESCRIPTION =
  "The tenancy rules changed for private assured tenancies on 1 May 2026. Plain answers to the questions your landlords bring you, plus free calculators you can point them at or embed.";

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

// Blog category prefixes resolved from each post's frontmatter `category:` via
// slugifyCategory() in src/lib/blog.ts. Do not guess these.
const LTE = "/blog/landlord-tax-essentials";
const MTD = "/blog/making-tax-digital-mtd";

/**
 * The five tools this page offers, as `CalculatorTabs` keys.
 *
 * These were five `CalculatorLinkCards` until 2026-08-23, when the owner made
 * the standing call that a calculator never gets a card: a card is the wrong
 * affordance for a tool the reader can use where they are standing. Same five
 * tools, same order, now usable on the page instead of linked off it.
 *
 * The section's copy changed with them. It used to say "send one instead of
 * doing the sum on the back of a viewing sheet", which a tab cannot honour, so
 * it now says run it here and points at the embed section below for the case
 * where an agent genuinely wants the tool on their own site.
 */
const calculatorTabs = ["stampduty", "rentalyield", "section24", "rentalincome", "mtd"] as const;

export default function ForLettingAgentsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "For letting agents: what your landlords will ask you this year",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    about: { "@type": "Thing", name: "Landlord law and tax for letting agents" },
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <TopicHero
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "For letting agents" }]} />}
        title="For letting agents: what your landlords will ask you this year"
        /* Standfirst rewritten for conversion, 2026-08-23. The old one described
           what the page was ("This page is for letting and estate agents. Short
           answers you can give at the desk"). This one leads on the agent's own
           problem, names what they walk away with, and keeps the two factual
           anchors the descriptive version carried: the 1 May 2026 commencement
           and the no-gate promise, which the Forwarding section cashes. */
        standfirst={
          <>
            Since 1 May 2026 your landlords have been asking you questions that are not your job to answer, and
            getting one wrong costs you the relationship. Give them a straight answer at the desk, run the number
            in front of them, and forward a page that settles it. Nothing here is gated, nothing asks your landlord
            for their details, and none of it costs you anything.
          </>
        }
        primary={
          <Link
            href="#book"
            data-cta="letting_agents_hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={`${btnPrimary} bg-emerald-600 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Ask a property tax specialist
          </Link>
        }
        secondary={
          /* Owner, 2026-08-23: scroll to the calculators ON THIS PAGE rather than
             leaving for /calculators. Same five tools either way, and keeping the
             agent here keeps them in front of the ask at the foot. */
          <Link
            href="#calculators"
            data-cta="letting_agents_hero_calculators"
            data-cta-placement="hero"
            className={`${btnOnCream} px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Run a calculator now
          </Link>
        }
      />

      <TopicSection
        id="what-changed"
        eyebrow="In force"
        title="What changed on 1 May 2026, and who it applies to"
        links={[
          {
            href: `${LTE}/rra-2026-whats-in-force-letting-agents`,
            label: "In force, and not in force: the full list",
          },
        ]}
        /* Scope first, then the three changes as before and after. Scope decides whether
           the rest of the section applies at all, and a housing association tenancy
           takes a neutral dash rather than a cross. */
        figure={<WhatChanged />}
      >
        <p>
          The tenancy reforms in the Renters&rsquo; Rights Act 2025 came into force on 1 May 2026. They reach
          private assured tenancies. Social-housing assured tenancies were carved out of that wave, so a landlord
          letting through a housing association is asking you a different question.
        </p>
        <p>
          Three changes cover most of what lands on your desk. Section 21 is gone, and possession now runs on the
          Section 8 grounds. Every assured tenancy is periodic. A rent rise goes through a Section 13 notice
          rather than whatever the tenancy agreement used to say.
        </p>
        <p>
          It helps to know that the Renters&rsquo; Rights Act 2025 rewrote the Housing Act 1988 rather than
          replacing it. The tenancy you manage is still an assured tenancy, which is why so much of the
          paperwork looks familiar.
        </p>
        <p>
          You do not need the commencement detail at the counter. You will want it the first time a landlord asks
          what became of Section 21, or why a Section 8 notice looks different now. The explainer carries it in
          full.
        </p>
      </TopicSection>

      <TopicSection
        id="not-yet"
        eyebrow="Not commenced"
        tone="slate"
        title="The two things that are still not running"
        links={[
          {
            href: `${LTE}/prs-database-landlord-ombudsman-registration-requirements`,
            label: "The database and redress enrolment, in order",
          },
          {
            href: `${LTE}/renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords`,
            label: "Landlord redress: where the duty comes from",
          },
        ]}
        /* Three duties, badged with whether each is running. A bulleted list gave all
           three equal weight and no status, which is the confusion the section
           exists to undo. */
        figure={<NotYetLive />}
      >
        <p>
          Two of the things your landlords have read about are in the Renters&rsquo; Rights Act 2025 and are not
          running. One is the landlord database. The other is the landlord redress scheme.
        </p>
        <p>
          Neither duty has been switched on, so neither puts anything on your landlord today. The database has no
          commencement date at all, and on the redress side the only part in force is a boundary provision about
          which ombudsman handles which complaint. The power to write the rules is live. The rules are not
          written.
        </p>
        <p>
          When the database opens, your landlord will need an entry before a property can be marketed. When the
          redress regime starts, it will be a regime of approved schemes rather than one named ombudsman, which is
          a distinction worth holding on to.
        </p>
        <p>
          No registration fee exists in law, so a figure quoted at you by a landlord has come from somewhere that
          made it up. Your own agency redress membership is a separate and much older duty, and the
          Renters&rsquo; Rights Act 2025 did not touch it.
        </p>
      </TopicSection>

      <TopicSection
        id="periodic"
        eyebrow="Tenancy shape"
        title="The periodic switch, and the two questions it generates"
        links={[
          { href: `${LTE}/a-complete-guide-to-periodic-tenancy`, label: "Periodic tenancies, start to finish" },
          {
            href: `${LTE}/renters-rights-act-periodic-tenancy-switch-landlord-obligations`,
            label: "What the switch put on the landlord",
          },
        ]}
        /* The two questions the switch generates, and the rent question it does not,
           marked with a neutral dash. Agents keep answering the third when asked
           the first. */
        figure={<PeriodicQuestions />}
      >
        <p>
          Every private assured tenancy is periodic now, and two questions follow from that. The first is what notice the
          tenant has to give. The second is what happened to a fixed term that was still running on 30 April 2026.
        </p>
        <p>
          Neither of them is the rent question. Putting the rent up runs on the Section 13 route instead, and
          that is a once-a-year decision rather than a consequence of the switch.
        </p>
        <p>
          Both pages below were written for the landlord rather than for you, which is what makes them worth
          forwarding. You should not have to explain the conversion yourself twice a week.
        </p>
      </TopicSection>

      <TopicSection
        id="epc"
        eyebrow="The band E floor"
        tone="slate"
        title="What your landlords believe about EPC, and what the law says"
        links={[
          {
            href: `${LTE}/mees-epc-rules-what-your-landlords-think`,
            label: "MEES: law today against the headline",
          },
          { href: `${LTE}/mees-regulations-landlords`, label: "The MEES rules a landlord has to meet" },
          { href: `${LTE}/energy-performance-certificates-epc`, label: "EPCs: what the certificate has to show" },
          {
            href: `${LTE}/epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`,
            label: "The 2030 proposal and the spending cap",
          },
        ]}
        /* Enacted beside not enacted. Deliberately two bands and not an A to G scale:
           the page names E and C and makes no claim about the others. */
        figure={<EpcStandards />}
      >
        <p>
          A landlord will tell you the property has to reach EPC C by 2030. That is government policy. It is not
          enacted, and no regulations have been laid to make it law.
        </p>
        <p>
          The standard in force is EPC E. Once a landlord has spent £3,500 including VAT on getting there, they
          can register an exemption instead of spending more. Give the enacted position first and the policy second,
          and you have given your landlord a straighter answer than the article that sent them to you.
        </p>
      </TopicSection>

      <TopicSection
        id="mtd"
        eyebrow="Quarterly updates"
        title="Who files what under Making Tax Digital"
        links={[
          {
            href: `${MTD}/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`,
            label: "Managed portfolios: who files quarterly",
          },
        ]}
        /* Whose obligation it is, then the statement itself with the top and bottom
           lines marked. The trap is arithmetic and prose cannot show it. */
        figure={<MtdSplit />}
      >
        <p>
          Making Tax Digital for Income Tax is the landlord&rsquo;s obligation and not yours. You do not file for
          them and you are not part of the submission. What your statement does is feed their categories: the
          gross rent you collected, your commission, the management fee and anything else you deducted.
        </p>
        <p>
          One trap is worth knowing, because it costs a landlord money rather than time. If they treat the net
          figure you paid them as their income, both their income and their costs come out understated. The test
          that decides whether they are in the regime at all runs on the gross figure.
        </p>
      </TopicSection>

      <TopicSection
        id="deposits"
        eyebrow="At check-out"
        tone="slate"
        title="Deposits and the landlord’s tax position"
        links={[
          {
            href: `${LTE}/tenancy-deposits-landlord-tax-position`,
            label: "What to tell a landlord at check-out",
          },
        ]}
        /* Two states on a rail, because the section's point is that the tax moment is
           the check-out deduction and not the holding of the money. */
        figure={<DepositMoment />}
      >
        <p>
          Deposits raise a tax question, and it is not the one landlords expect. It is not about holding the
          money. It is about the end of the tenancy, when a deduction is made and the landlord keeps part of what
          was paid.
        </p>
        <p>
          That is the point where a landlord asks you what to tell their accountant, and the page below is the
          answer to send. Your agency&rsquo;s own client-money obligations are a separate regime and are not
          covered here.
        </p>
      </TopicSection>

      <TopicSection
        id="calculators"
        eyebrow="Free tools"
        title="Calculators you can run on a landlord's question"
      >
        <p>
          Run the number in front of them instead of doing the sum on the back of a viewing sheet. Every one of
          these is free, needs no sign-up, and can sit on your own website: the{" "}
          <Link href="#embed" className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
            embed section below
          </Link>{" "}
          is one line of HTML.
        </p>
        {/* Literal href, not a mapped constant. `calculator-tabs-crawl-path.test.ts`
            is a source scan and cannot see through an array, and this page went from
            five crawlable per-tool links to zero the moment the cards became tabs.
            Keep at least this one spelled out. */}
        <p>
          The most-asked of the five is the{" "}
          <Link
            href="/calculators/stamp-duty-calculator"
            className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            stamp duty calculator
          </Link>
          , because the buy-to-let surcharge is the figure landlords most often get wrong on their next purchase.
        </p>
        <div className="mt-6">
          <CalculatorTabs tabs={[...calculatorTabs]} />
        </div>
      </TopicSection>

      {/* The embed offer as a full-bleed navy deliverables band, not a body
          section (owner, 2026-08-23). It carries its own `id="embed"`, which the
          calculators section links to. Adjacency holds: calculators above is
          white and Forwarding below is white. */}
      <EmbedDeliverables />

      <TopicSection
        id="forward"
        eyebrow="Open URLs"
        title="Forwarding these to your landlords"
      >
        <p>
          Every page linked from here is written to be sent. They answer the landlord&rsquo;s question rather than
          describing the law at them, and they sit on open URLs, so you can paste one into a reply and move on.
        </p>

        {/* Inline rather than in the `figure` slot, which renders after every
            child: the traits belong above the closing ask, not under it. The
            hero's no-gate promise is cashed here. */}
        <ForwardTraits />

        {/* Was a bare `btnPrimary` link. A bare button is not a CTA block
            (DESIGN_SYSTEM.md section 7): statement left, button right, stacking
            on mobile. Slate card because this section sits on the white ground.
            `data-cta` unchanged, so the `vw_cta_performance` row survives. */}
        <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <p className="text-base font-bold text-slate-900 sm:text-lg">
            There is always one question a page cannot settle. Send us that one and we will answer it, or tell you
            the landlord needs their own accountant.
          </p>
          <Link
            href="#book"
            data-cta="letting_agents_forward_book"
            data-cta-placement="forward"
            data-cta-goal="form"
            className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
          >
            Send us the one you cannot answer
          </Link>
        </div>
      </TopicSection>

      {/* Anchor for the hero primary and the mid-page ask.
          CONTAINED, not the full-bleed navy panel: this page carries no FAQ, so
          a navy panel would be the last block before the navy footer. The
          adjacency rule's first permitted resolution is the contained variant
          (report 01 §2 R1), which is what this is. The ask is addressed to the
          agent rather than to their landlord, so it does not contradict the
          hero's promise that nothing here asks a landlord for their details.
          The free consultation is an existing site-wide claim (/about,
          /contact, /blog, /calculators, /incorporation), not a new one. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          eyebrow="For agents"
          title="Have a landlord question you cannot answer at the desk?"
          description="Send it to us. We answer property tax questions for letting and estate agents, and we will tell you if the landlord needs their own accountant rather than us."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          formTitle="Ask a property tax specialist"
          submitLabel="Send the question"
          footnote="No obligation and no hard sell. If the answer is simple, we will just tell you."
        />
      </div>
    </>
  );
}
