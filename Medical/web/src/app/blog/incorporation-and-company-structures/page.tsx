import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Incorporation & Company Structures for Doctors | Medical Accountants UK",
  description:
    "Guide to incorporating a medical practice in the UK — limited company vs LLP, tax savings, CQC rules and the transition process for doctors and GPs.",
  alternates: { canonical: `${siteConfig.url}/blog/incorporation-and-company-structures` },
  openGraph: {
    title: "Incorporation & Company Structures for Doctors",
    description:
      "Guide to incorporating a medical practice in the UK — limited company vs LLP, tax savings, CQC rules and the transition process for doctors and GPs.",
    url: `${siteConfig.url}/blog/incorporation-and-company-structures`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Incorporation & Company Structures for Doctors",
    description:
      "Guide to incorporating a medical practice in the UK — limited company vs LLP, tax savings, CQC rules and the transition process for doctors and GPs.",
  },
};

export default function IncorporationPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter(
    (p) => p.category === "Incorporation & Company Structures"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Incorporation & Company Structures" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Incorporation & Company Structures for Doctors",
        description: metadata.description,
        url: `${siteConfig.url}/blog/incorporation-and-company-structures`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={`${contentNarrow} ${sectionY}`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Incorporation & Company Structures" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Incorporation &amp; Company Structures for Medical Practices
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            More GP practices and medical professionals are exploring incorporation as a way to
            reduce their tax burden and create a more flexible business structure. However,
            incorporating a medical practice involves far more than forming a company — from NHS
            contract considerations and CQC registration to pension implications and partnership
            buy-outs, the decision requires careful analysis. This hub covers everything you need to
            evaluate before making the move.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              When to Consider Incorporating a Medical Practice
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Incorporation tends to become attractive when practice profits significantly exceed the
              partners&apos; personal income needs. If a GP practice generates substantial surplus
              that is reinvested or retained, the corporation tax rate of 25% (for profits above
              £250,000) or the small-profits rate of 19% can be materially lower than the 45%
              additional rate of income tax plus Class 4 National Insurance that partners would
              otherwise pay. The gap widens further where profits can be extracted as dividends
              rather than salary, taking advantage of lower dividend tax rates.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              That said, incorporation is not a universal solution. Practices with profits that are
              fully drawn by partners each year see less benefit, because the tax saving on
              corporation tax is offset by the tax on extracting those profits. Practices planning to
              wind down, or where partners are close to retirement, may also find the costs and
              disruption outweigh the gains. A detailed projection comparing the after-tax position
              as a partnership versus a limited company or LLP over at least a five-year horizon is
              essential before committing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Limited Company vs LLP Structures
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              The two main vehicles for incorporation are a private limited company and a limited
              liability partnership (LLP). A limited company is a separate legal entity that pays
              corporation tax on its profits; directors and shareholders then pay income tax on
              salaries and dividends drawn from the company. This creates the classic
              &ldquo;two-tier&rdquo; tax structure that can reduce the overall rate when profits are
              retained.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              An LLP, by contrast, is tax-transparent — profits are allocated to members and taxed as
              self-employment income, much like a traditional partnership. The primary advantage of
              an LLP is limited liability protection without the corporation-tax layer, making it
              suitable for practices where all profits are distributed. LLPs also avoid the benefit-
              in-kind complications that arise when a company provides assets to directors. The right
              choice depends on the practice&apos;s profit level, distribution policy and long-term
              growth plans.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Tax Implications of Incorporation
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Beyond headline tax rates, incorporation triggers several one-off and ongoing tax
              events. Transferring the practice&apos;s assets to a company may be treated as a
              disposal for capital gains tax purposes, though Section 162 incorporation relief can
              defer the gain where the entire business (including goodwill) is transferred in
              exchange for shares. HMRC scrutinises medical-practice goodwill valuations closely, so
              a robust, defensible valuation is essential.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Ongoing, the company must operate PAYE for director salaries, file annual accounts and
              a corporation tax return, and manage dividend paperwork. National Insurance treatment
              also changes: directors pay Class 1 NICs on salary rather than Classes 2 and 4, and
              the company pays employer NICs on top. Careful salary-and-dividend planning each year
              can optimise the overall position, but it requires ongoing professional advice as
              thresholds and rates change with each Budget.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Regulatory Considerations: CQC and NHS Contracts
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Medical practices operating under an NHS GMS or PMS contract must obtain consent from
              NHS England (or the relevant ICB) before changing their legal structure. The contract
              itself cannot simply be assigned to a new entity — a fresh contract or novation
              agreement is required. CQC registration must also transfer to the new legal entity,
              which involves a fresh application, an assessment of the new registered manager and
              potentially an inspection.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              These regulatory steps add both cost and timeline to the incorporation process.
              Practices should allow at least six to twelve months from the initial decision to the
              completion of the transfer. Engaging early with the ICB and CQC, and ensuring that the
              new entity&apos;s governance structure meets their requirements, reduces the risk of
              delays. Specialist medical accountants coordinate with solicitors and regulatory bodies
              to manage the process end to end.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              The Transition Process and Costs
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              A typical incorporation involves several workstreams running in parallel: company
              formation and shareholder agreement drafting, goodwill and asset valuations, NHS
              contract novation, CQC re-registration, TUPE consultation for employed staff, bank
              account setup and finance restructuring, and pension scheme adjustments. Legal,
              accounting and valuation fees for a mid-sized GP practice commonly range from £15,000
              to £30,000, depending on complexity.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Partners should also plan for the cash-flow impact. The company will need working
              capital from day one, and there may be a period where partners&apos; drawings reduce
              while the company builds reserves. Stamp duty land tax may apply if property is
              transferred to the company, though holdover relief or SDLT group relief may be
              available in certain structures. A phased approach — incorporating the trading activity
              first and dealing with property separately — can sometimes smooth the transition.
            </p>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">Related Articles</h2>
              <ul className="space-y-4">
                {relatedPosts.map((p) => {
                  const readTime = calculateReadTime(p.contentHtml);
                  return (
                    <li key={p.slug}>
                      <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                        <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                          <Link
                            href={`/blog/${p.slug}`}
                            className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                          >
                            {p.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                          {p.summary}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-sm text-[var(--muted)]">
                          {p.date && (
                            <time dateTime={p.date}>
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(p.date))}
                            </time>
                          )}
                          <span>•</span>
                          <span>{readTime} min read</span>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="mt-16 border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 p-8 sm:p-10 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
              Considering Incorporation?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Incorporation can unlock significant tax savings for the right practice, but the
              regulatory, legal and financial complexities demand expert guidance. Our specialist
              medical accountants will model the numbers, coordinate with your solicitors and
              regulatory bodies, and manage the entire transition so you can focus on patient care.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Incorporation Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
