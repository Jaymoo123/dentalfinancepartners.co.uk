import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import {
  btnOnDark,
  btnPrimary,
  btnSecondary,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { TopicSection } from "@accounting-network/web-shared/design/marketing/TopicSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `SRA Compliance & Trust Accounting`,
  description: "Expert SRA Accounts Rules compliance for solicitors. Client money handling, trust accounting, 5-week reconciliations, and annual Accountant's Reports. COFA support and breach prevention.",
  alternates: { canonical: `${siteConfig.url}/sra-compliance` },
  openGraph: {
    title: `SRA Compliance & Trust Accounting | ${siteConfig.name}`,
    description: "Expert SRA Accounts Rules compliance for solicitors. Client money handling, trust accounting, 5-week reconciliations, and annual Accountant's Reports.",
    url: `${siteConfig.url}/sra-compliance`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `SRA Compliance & Trust Accounting | ${siteConfig.name}`,
    description: "Expert SRA Accounts Rules compliance for solicitors. Client money handling, trust accounting, 5-week reconciliations.",
    images: [siteConfig.publisherLogoUrl],
  },
};

const complianceAreas = [
  {
    title: "Client account reconciliations",
    description: "5-week reconciliation cycles ensuring client money is properly accounted for and SRA rules are met. We identify discrepancies early and ensure your client accounts are audit-ready.",
  },
  {
    title: "Trust accounting",
    description: "Proper handling of client money, trust funds, and stakeholder balances. We ensure your trust accounting meets SRA requirements and provides clear audit trails.",
  },
  {
    title: "SRA Accountant's Reports",
    description: "The annual report has to come from an independent accountant holding a practising certificate from a recognised supervisory body. We connect you with one from our specialist partner network and help you get the client money records ready, so nothing surfaces late.",
  },
  {
    title: "COFA support",
    description: "Ongoing support for Compliance Officers for Finance and Administration. We help you understand your responsibilities, maintain proper records, and respond to SRA queries.",
  },
  {
    title: "Breach prevention",
    description: "Proactive monitoring and guidance to prevent SRA Accounts Rules breaches. We help you implement proper controls and procedures to protect your practicing certificate.",
  },
  {
    title: "Client ledger management",
    description: "Accurate maintenance of client ledgers, matter accounting, and proper allocation of receipts and payments. We ensure your records meet SRA standards.",
  },
];

const commonIssues = [
  {
    title: "Late or incomplete reconciliations",
    impact: "SRA breach risk",
    solution: "We implement 5-week reconciliation schedules with automated checks and early warning systems.",
  },
  {
    title: "Mixed client and office money",
    impact: "Accounts Rules breach",
    solution: "Clear segregation procedures, proper allocation protocols, and regular reviews to prevent mixing.",
  },
  {
    title: "Inadequate record-keeping",
    impact: "Failed Accountant's Report",
    solution: "Structured record-keeping systems, client ledger reviews, and proper documentation protocols.",
  },
  {
    title: "Unclear COFA responsibilities",
    impact: "Personal liability exposure",
    solution: "COFA training, responsibility mapping, and ongoing compliance support to protect you personally.",
  },
];

export default function SRACompliancePage() {
  return (
    <>
      {/* Navy motif hero replaces the crimson-over-stock-photo gradient. The
          brand hex measures 3.06 on slate-900, so nothing here is brand-tinted
          text; the breadcrumb takes the light variant and its items are
          byte-unchanged, so the BreadcrumbList JSON-LD is untouched. */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb
            items={[{ label: "SRA Compliance", href: "/sra-compliance" }]}
            variant="light"
          />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              SRA Accounts Rules compliance and trust accounting
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Expert client money management, trust accounting, and SRA compliance for solicitors and law firms. We ensure your client accounts meet regulatory standards and protect your practicing certificate.
            </p>
            <div className="mt-8">
              <Link href="/contact" className={btnOnDark}>
                Book free compliance review
              </Link>
            </div>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      {/* The six service tiles are this band's visual: they re-present the
          compliance work the standfirst above names, and invent no words.
          Slate tiles oppose the white section ground. */}
      <TopicSection
        id="the-challenge"
        eyebrow="The challenge"
        title="SRA compliance is getting harder"
        tone="white"
        figure={
          <ul className="mt-8 grid list-none gap-6 pl-0 md:grid-cols-2 lg:grid-cols-3">
            {complianceAreas.map((area) => (
              <li key={area.title} className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{area.description}</p>
              </li>
            ))}
          </ul>
        }
      >
        <p>
          26.2% of SRA firm closures in 2024-25 were due to accounting breaches—up from 18.6% the previous year. With heightened regulatory scrutiny and increasingly complex Accounts Rules, you need specialist accountants who understand SRA compliance as well as you do.
        </p>
      </TopicSection>

      {/* White cards on the slate ground. The impact line is direct-labelled
          ("Impact:"), so nothing rests on hue; violet-700 measures 7.10 on
          white and keeps the escalation reading without colliding with the
          crimson brand. */}
      <TopicSection
        id="common-issues"
        eyebrow="Common issues"
        title="What we help you avoid"
        tone="slate"
        figure={
          <ul className="mt-8 grid list-none gap-6 pl-0">
            {commonIssues.map((issue) => (
              <li key={issue.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">{issue.title}</h3>
                <p className="mt-2 text-sm font-semibold text-violet-700">Impact: {issue.impact}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Our solution:</strong> {issue.solution}
                </p>
              </li>
            ))}
          </ul>
        }
      >
        <p>
          These are the most common SRA compliance issues we see when solicitors come to us from generalist accountants:
        </p>
      </TopicSection>

      <TopicSection
        id="get-started"
        eyebrow="Get started"
        title="Book your free compliance review"
        tone="white"
        figure={
          <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900">Free SRA compliance review</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              We'll review your current client money procedures and identify any compliance gaps—no obligation, no charge.
            </p>
            <div className="mt-6">
              <Link href="/contact" className={btnPrimary}>
                Request compliance review
              </Link>
            </div>
          </div>
        }
      >
        <p>
          Whether you're concerned about SRA compliance, need help with client account reconciliations, or want to ensure your trust accounting is correct, we're here to help. Fill in the form below and we'll arrange a short introductory call.
        </p>
      </TopicSection>

      {/* One closing ask. The retired CTASection's two links survive verbatim as
          the panel footnote so `cta-section-primary` and `cta-section-secondary`
          keep their ids, labels and hrefs and no live series forks. Contained on
          slate, so a navy panel never touches the navy footer. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow=""
          formTitle=""
          title="Ensure your SRA compliance is watertight"
          description="Book a free compliance review to identify any gaps in your client money procedures."
          proofPoints={[]}
          form={<LeadForm redirectOnSuccess={false} />}
          footnote={
            <span className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className={`${btnPrimary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-primary"
              >
                Speak to a specialist
              </Link>
              <Link
                href="/services"
                className={`${btnSecondary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-secondary"
              >
                View services
              </Link>
            </span>
          }
        />
      </div>
    </>
  );
}
