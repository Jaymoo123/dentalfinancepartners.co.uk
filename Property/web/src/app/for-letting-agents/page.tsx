import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
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

const calculators = [
  {
    href: "/calculators/stamp-duty-calculator",
    name: "Stamp duty calculator",
    line: "What a landlord pays on the next purchase, with the buy-to-let surcharge built in.",
  },
  {
    href: "/calculators/rental-yield-calculator",
    name: "Rental yield calculator",
    line: "Whether the yield on a property is the one the landlord thinks it is.",
  },
  {
    href: "/calculators/section-24-calculator",
    name: "Section 24 calculator",
    line: "What the mortgage interest restriction costs a landlord at their own tax band.",
  },
  {
    href: "/calculators/rental-income-tax-calculator",
    name: "Rental income tax calculator",
    line: "The tax on a year of rent, once the allowable running costs come out.",
  },
  {
    href: "/calculators/mtd-checker",
    name: "Making Tax Digital checker",
    line: "Whether a landlord is caught by Making Tax Digital, and from which April.",
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

      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "For letting agents" }]} />
          <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            For letting agents: what your landlords will ask you this year
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            The tenancy rules changed when the Renters&rsquo; Rights Act 2025 reforms came into force on 1 May 2026,
            and the questions have not stopped since. This page is for letting and estate agents. Short answers you can
            give at the desk, and longer pages you can forward to the landlord who asked. Nothing
            here is gated and nothing asks your landlord for their details.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/calculators"
              className={`${btnPrimary} bg-emerald-600 border-emerald-800 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Open the calculators
            </Link>
            <Link
              href="/embed"
              className={`${btnSecondary} border-white bg-white/10 px-6 py-3 text-center text-sm text-white hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Put them on your own site
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <Section
              id="what-changed"
              title="What changed on 1 May 2026, and who it applies to"
              links={[
                {
                  href: `${LTE}/rra-2026-whats-in-force-letting-agents`,
                  label: "In force, and not in force: the full list",
                },
              ]}
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
            </Section>

            <Section
              id="not-yet"
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
            </Section>

            <Section
              id="periodic"
              title="The periodic switch, and the two questions it generates"
              links={[
                { href: `${LTE}/a-complete-guide-to-periodic-tenancy`, label: "Periodic tenancies, start to finish" },
                {
                  href: `${LTE}/renters-rights-act-periodic-tenancy-switch-landlord-obligations`,
                  label: "What the switch put on the landlord",
                },
              ]}
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
            </Section>

            <Section
              id="epc"
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
            </Section>

            <Section
              id="mtd"
              title="Who files what under Making Tax Digital"
              links={[
                {
                  href: `${MTD}/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`,
                  label: "Managed portfolios: who files quarterly",
                },
              ]}
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
            </Section>

            <Section
              id="deposits"
              title="Deposits and the landlord’s tax position"
              links={[
                {
                  href: `${LTE}/tenancy-deposits-landlord-tax-position`,
                  label: "What to tell a landlord at check-out",
                },
              ]}
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
            </Section>

            <Section id="calculators" title="Calculators you can point a landlord at">
              <p>
                Send one instead of doing the sum on the back of a viewing sheet.
              </p>
              <ul className="ml-5 list-disc space-y-2">
                {calculators.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="font-semibold text-emerald-700 hover:text-emerald-800">
                      {c.name}
                    </Link>{" "}
                    {c.line}
                  </li>
                ))}
              </ul>
            </Section>

            <Section
              id="embed"
              title="Putting the calculators on your own site"
              links={[{ href: "/embed", label: "The embed gallery" }]}
            >
              <p>
                Every calculator here can sit on your own website. It is one line of HTML, it costs nothing, and we keep
                the rates current so that you never have to think about it again.
              </p>
              <p>
                The only condition is that the small &ldquo;Powered by Property Tax Partners&rdquo; line stays where it
                is. The gallery has the code for each calculator.
              </p>
            </Section>

            <Section id="forward" title="Forwarding these to your landlords">
              <p>
                Every page linked from here is written to be sent. They answer the landlord&rsquo;s question rather than
                describing the law at them, and they sit on open URLs, so you can paste one into a reply and move on.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
