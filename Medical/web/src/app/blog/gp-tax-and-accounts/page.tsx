import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "GP Tax & Accounts — Tax Planning for General Practitioners | Medical Accountants UK",
  description:
    "Expert guidance on GP tax returns, NHS income reporting, partnership taxation and tax-efficient strategies for general practitioners across the UK.",
  alternates: { canonical: `${siteConfig.url}/blog/gp-tax-and-accounts` },
  openGraph: {
    title: "GP Tax & Accounts — Tax Planning for General Practitioners",
    description:
      "Expert guidance on GP tax returns, NHS income reporting, partnership taxation and tax-efficient strategies.",
    url: `${siteConfig.url}/blog/gp-tax-and-accounts`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Tax & Accounts — Tax Planning for General Practitioners",
    description:
      "Expert guidance on GP tax returns, NHS income reporting, partnership taxation and tax-efficient strategies.",
  },
};

export default function GPTaxAccountsPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "GP Tax & Accounts");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "GP Tax & Accounts" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "GP Tax & Accounts",
        description: metadata.description,
        url: `${siteConfig.url}/blog/gp-tax-and-accounts`,
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
            { label: "GP Tax & Accounts" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            GP Tax &amp; Accounts
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            Tax compliance for general practitioners is rarely straightforward. Multiple income
            streams, complex partnership arrangements, NHS pension interactions and evolving HMRC
            requirements mean GPs need a clear understanding of their obligations — and the
            strategies available to reduce their tax burden legally. This hub covers the
            essentials every GP should know.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              GP Tax Return Essentials
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Every GP with self-employed income must file a Self Assessment tax return by 31
              January following the end of the tax year. For GP partners, this includes reporting
              their share of partnership profits on the partnership pages (SA800) and their
              personal return (SA100). Salaried GPs who only receive PAYE income may not need to
              file — but those with locum sessions, private work or investment income above £1,000
              almost certainly will.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Getting the return right depends on accurate partnership accounts and correctly
              allocated income. Common errors include misreporting superannuation contributions
              (which are not deducted from taxable profits but are relieved via the pension
              scheme), failing to include seniority payments or Golden Hello retention payments,
              and not claiming overlap relief when a GP retires or leaves a practice mid-year.
              These mistakes can trigger HMRC enquiries and result in penalties plus interest on
              underpaid tax.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Income Sources and Reporting
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              A GP&apos;s taxable income can come from a surprisingly wide range of sources. Each
              must be reported correctly, and some have specific rules that differ from standard
              self-employment income.
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li>NHS partnership profits — the GP&apos;s share of practice profits after allowable expenses</li>
              <li>Salaried GP income — taxed via PAYE, but additional income may require Self Assessment</li>
              <li>Locum fees — typically self-employed income requiring registration and Class 2/4 NICs</li>
              <li>Private and medico-legal work — insurance reports, cremation fees, occupational health contracts</li>
              <li>NHS Pension Scheme employer contributions — not taxable income but affect annual allowance calculations</li>
              <li>Property income from surgery premises — rent received from the practice or third parties</li>
              <li>Training grants, bursaries and clinical excellence awards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Tax Efficiency Strategies for GPs
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Tax planning for GPs goes beyond claiming allowable expenses. While practice costs,
              professional subscriptions (BMA, MDU/MPS, RCGP), training courses and business
              mileage are all deductible, genuine tax efficiency requires a more strategic
              approach. Pension contributions remain one of the most powerful tools — NHS Pension
              Scheme contributions attract full income tax relief, and additional voluntary
              contributions or personal pensions can shelter further income.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              For higher-earning GPs, the tapered annual allowance means pension contributions
              above the threshold trigger tax charges. Understanding where you sit relative to
              the adjusted income thresholds is critical — a small reduction in taxable income
              can sometimes restore thousands of pounds of annual allowance. Other strategies
              include timing capital expenditure to maximise capital allowances, using the
              marriage allowance or spousal employment where appropriate, and structuring
              private work through a limited company when volumes justify the administrative
              overhead.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Partnership Taxation
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              GP partnerships are transparent for tax purposes — the partnership itself does not
              pay tax, but each partner is taxed on their allocated share of profits. The
              partnership must file a partnership return (SA800) showing total income and
              expenses, and each partner reports their share on their personal return. Profit
              allocation follows the partnership agreement, which may include prior shares,
              seniority adjustments and different splits for different income streams.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Complications arise when partners join or leave mid-year, when profit-sharing
              ratios change or when the practice has a different accounting year end from the
              standard 5 April tax year. The basis period reform that took effect from 2024/25
              means all partnerships are now taxed on a tax-year basis, eliminating overlap
              profits going forward but requiring transitional adjustments for existing
              practices. GPs who accumulated overlap relief over many years should ensure this
              is being correctly unwound in their returns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Payment on Account and the Tax Planning Calendar
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Self-employed GPs make payments on account — two advance payments towards the
              current year&apos;s tax bill, each equal to half of the previous year&apos;s
              liability. These fall on 31 January and 31 July. If income has fallen
              significantly (for example, due to reduced sessions or a change in partnership
              share), GPs can apply to reduce payments on account — but must be careful, as
              underestimating triggers interest charges.
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li><strong>April–May:</strong> Review the previous tax year, gather income records and commission partnership accounts</li>
              <li><strong>June–September:</strong> Finalise partnership accounts, prepare superannuation certificates and draft personal returns</li>
              <li><strong>October–December:</strong> Submit Self Assessment return, review current-year estimates and plan pension contributions</li>
              <li><strong>January:</strong> Pay balancing payment and first payment on account for the new tax year</li>
              <li><strong>July:</strong> Make second payment on account — consider reducing if income has dropped</li>
            </ul>
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
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{p.summary}</p>
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
              Need GP Tax Planning Support?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              From Self Assessment filing and partnership taxation to pension optimisation and
              HMRC enquiry support, our specialist medical accountants help GPs across the UK
              keep more of what they earn. Request a free consultation to discuss your tax
              position and discover the savings available to you.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Tax Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
