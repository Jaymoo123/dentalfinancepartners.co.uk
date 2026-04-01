import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, sectionY, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: "Specialist accountants for UK solicitors and law firms. SRA compliance expertise, partnership tax knowledge, and practice succession planning. Learn about our legal sector focus and approach.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: "Specialist accountants for UK solicitors and law firms. SRA compliance expertise, partnership tax knowledge, and practice succession planning.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteConfig.name}`,
    description: "Specialist accountants for UK solicitors and law firms. SRA compliance expertise, partnership tax knowledge, and practice succession planning.",
    images: [siteConfig.publisherLogoUrl],
  },
};

export default function AboutPage() {
  return (
    <>
      <section className={sectionY}>
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

          <div className="mx-auto mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--primary)] md:text-5xl">
              Specialist accountants for solicitors and law firms
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
              We work exclusively with UK solicitors, law firms, and legal practitioners. From sole practitioners managing self-assessment to multi-partner LLPs navigating complex tax structures, we understand the unique financial and regulatory challenges facing the legal sector.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-8">
            <div className="card-premium">
              <h2 className="text-2xl font-semibold text-[var(--primary)]">Why we specialize in the legal sector</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
                <p>
                  Legal practices face accounting challenges that generalist accountants simply don't encounter. SRA Accounts Rules require strict client money handling and 5-week reconciliations. Partnership and LLP structures involve complex profit allocations and Basis Period Reform implications. VAT on legal services has specific rules around disbursements and counsel fees that require specialist knowledge.
                </p>
                <p>
                  With 26.2% of SRA firm closures attributed to accounting breaches (up from 18.6% the previous year), the stakes have never been higher. You need accountants who understand not just general accounting principles, but the specific regulatory framework, tax treatment, and compliance requirements unique to solicitors and law firms.
                </p>
                <p>
                  That's why we focus exclusively on the legal sector. Every accountant on our team works only with solicitors, law firms, and legal practitioners. We understand SRA compliance, client money rules, partnership taxation, LLP structures, and the financial pressures facing legal practices in 2026.
                </p>
              </div>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-semibold text-[var(--primary)]">Our approach</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
                <p>
                  We believe accounting for solicitors should be clear, proactive, and focused on your specific needs. Whether you're managing SRA compliance, optimizing your partnership structure, or planning practice succession, we provide practical guidance grounded in legal sector expertise.
                </p>
                <p>
                  Our solicitor accountants work with sole practitioners handling self-assessment and MTD compliance, law firm partners navigating profit allocations and LLP conversions, practice managers ensuring client money compliance, and multi-partner firms planning succession and growth.
                </p>
                <p>
                  We combine deep legal sector knowledge with modern, accessible service. Fixed fees, direct access to your dedicated accountant, and clear explanations—no jargon, no surprises, no hidden charges.
                </p>
              </div>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-semibold text-[var(--primary)]">What makes us different</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
                <p>
                  <strong className="text-[var(--primary)]">100% legal sector focus.</strong> We don't work with landlords, dentists, or general businesses. Every client is a solicitor, law firm, or legal practitioner. This focus means we understand your challenges, speak your language, and stay current with SRA regulations and legal sector tax changes.
                </p>
                <p>
                  <strong className="text-[var(--primary)]">SRA compliance expertise.</strong> We have a 100% pass rate on SRA Accountant's Reports. We understand client money rules, trust accounting, reconciliation requirements, and COFA responsibilities as well as you do.
                </p>
                <p>
                  <strong className="text-[var(--primary)]">Proactive tax planning.</strong> Beyond compliance, we provide strategic advice on partnership structures, LLP conversions, profit extraction, practice valuations, and succession planning. We help you make informed decisions about your practice's financial future.
                </p>
                <p>
                  <strong className="text-[var(--primary)]">Modern, accessible service.</strong> Fixed fees, online access, and direct communication with your dedicated solicitor accountant. We're here when you need us, without the traditional barriers of old-school accounting firms.
                </p>
              </div>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-semibold text-[var(--primary)]">Who we work with</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
                <p>
                  We work with solicitors and law firms across England and Wales, from sole practitioners in high street practices to multi-partner firms in city centers. Our clients include:
                </p>
                <ul className="space-y-2 pl-6">
                  <li className="list-disc">Sole practitioner solicitors managing self-assessment and MTD compliance</li>
                  <li className="list-disc">Law firm partners navigating partnership tax and profit allocations</li>
                  <li className="list-disc">Practice managers and COFAs ensuring SRA Accounts Rules compliance</li>
                  <li className="list-disc">Multi-partner firms planning LLP conversions and succession</li>
                  <li className="list-disc">Legal practice owners considering practice sales or retirement</li>
                </ul>
                <p>
                  Whether you're in London, Manchester, Birmingham, Leeds, Bristol, or anywhere else in the UK, we provide the same specialist service and legal sector expertise.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-[var(--primary)] md:text-3xl">
                Ready to work with specialist solicitor accountants?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                Book a free consultation to discuss your practice's accounting needs. We'll provide clear advice with no obligation.
              </p>
              <div className="mt-8">
                <Link href="/contact" className={btnPrimary}>
                  Book free consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Ready to work with specialist solicitor accountants?"
        description="Book a free consultation to discuss your practice's accounting needs. We'll provide clear advice with no obligation."
      />
    </>
  );
}
