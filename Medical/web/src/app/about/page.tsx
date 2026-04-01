import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "About Medical Accountants UK | Specialist GP Accountants & Medical Tax Advisors",
  description:
    "Why we focus exclusively on UK medical professionals. Specialist GP accountants and medical tax advisors serving doctors, consultants, and practice owners. NHS pension expertise, locum tax planning, and private practice incorporation advice from accountants who understand the medical sector.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About Medical Accountants UK | Specialist GP Accountants",
    description:
      "Why we focus exclusively on UK medical professionals. Specialist GP accountants serving doctors, consultants, and practice owners with NHS pension expertise and medical tax planning.",
    url: `${siteConfig.url}/about`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
};

export default function AboutPage() {
  const orgSchema = buildOrganizationJsonLd();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        About Medical Accountants UK
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We built a specialist accounting practice to serve the unique financial landscape of UK medicine — from NHS pension complexities and locum tax planning to private practice incorporation. We understand that your financial needs are distinct from generic small businesses, and our entire client base consists of GPs, consultants, locum doctors, and medical practice owners.
      </p>
      
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Why medical-only focus matters</h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
        Medical professionals face financial challenges that simply don't exist in other sectors. NHS pension annual allowance calculations, locum IR35 status, mixed NHS and private income reconciliation, practice partnership profit-sharing, and medical expense claims all require specific technical knowledge. A generalist accountant can process your numbers, but they won't proactively identify the tax planning opportunities or compliance risks that medical specialists recognize immediately.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
        Our GP accountants work exclusively with medical professionals. Every client is a GP, consultant, locum doctor, or practice owner. This concentrated focus means we've encountered every scenario multiple times — from unexpected NHS pension tax charges to complex practice acquisition structures. We speak your language and understand the medical sector's financial realities.
      </p>

      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">How we work with medical professionals</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-[var(--ink-soft)]">
        <li>Partner-led advice tailored specifically to GPs, consultants and medical practice owners. You work directly with qualified accountants who specialize in medical sector accounting.</li>
        <li>Proactive, year-round tax planning focused on medical-specific issues like NHS pension optimization, locum tax efficiency, and private practice structuring — not just year-end compliance.</li>
        <li>Clear, actionable guidance on NHS pension annual allowance calculations, lifetime allowance planning, and scheme pays elections. We help you navigate these complex areas with confidence.</li>
        <li>Structured advice that withstands scrutiny from HMRC, mortgage lenders, practice partners, or potential practice buyers. All recommendations are documented and defensible.</li>
        <li>Fixed-fee pricing with no hidden charges. You know exactly what you're paying before we start work.</li>
      </ul>

      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Who we work with</h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
        Our client base includes GP partners managing complex partnership structures, salaried GPs planning career progression, hospital consultants balancing NHS and private work, locum doctors managing multiple income streams, and practice owners considering expansion or succession. We serve medical professionals at every career stage, from newly qualified doctors establishing their tax position to senior consultants planning retirement and pension drawdown.
      </p>
      
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Evidence-led content for medical professionals</h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
        Our{" "}
        <Link href="/blog" className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}>
          blog
        </Link>{" "}
        is written specifically for medical professionals who need UK-specific tax insights and medical accounting guidance — not generic financial tips. Every article is researched, fact-checked, and written by accountants who work with doctors daily. Topics include NHS pension annual allowance planning, locum tax deductions, private practice incorporation, medical expense claims, and GP partnership accounting. Start with our foundational guides on{" "}
        <Link
          href="/blog/nhs-pension-annual-allowance-planning"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          NHS pension annual allowance planning
        </Link>{" "}
        or{" "}
        <Link
          href="/blog/locum-doctor-tax-deductions-uk"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          locum doctor tax deductions
        </Link>
        .
      </p>

      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Our approach to medical accounting</h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
        We don't offer generic accounting packages. Instead, we start with your specific situation and build a service around your needs. Whether you need help with NHS pension planning, locum tax returns, practice incorporation, or ongoing financial management, we tailor our approach to your professional structure and financial goals. You get direct access to your dedicated GP accountant, clear communication without jargon, and transparent fixed-fee pricing.
      </p>
      <div className="mt-10 sm:mt-12">
        <CTASection
          title="See if we are a fit"
          description="Tell us about your role — GP, consultant, locum or practice owner — and your key financial priorities for the coming year."
        />
      </div>
    </div>
    </>
  );
}