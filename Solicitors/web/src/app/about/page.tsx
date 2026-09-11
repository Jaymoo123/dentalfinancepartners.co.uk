import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import {
  btnPrimary,
  btnSecondary,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About`,
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

/* The four "what makes us different" paragraphs already lead with their own
   bold label, so the tile grid below re-presents THIS section's copy and
   invents no words: the label becomes the tile heading, the rest of the
   sentence becomes its body. Order is unchanged. */
const differentiators = [
  {
    label: "100% legal sector focus.",
    body: "We don't work with landlords, dentists, or general businesses. Every client is a solicitor, law firm, or legal practitioner. This focus means we understand your challenges, speak your language, and stay current with SRA regulations and legal sector tax changes.",
  },
  {
    label: "SRA compliance expertise.",
    body: "Client money rules, trust accounting, reconciliation requirements and COFA responsibilities are the core of the work, handled on a monthly rhythm rather than as a year-end scramble before the accountant's report.",
  },
  {
    label: "Proactive tax planning.",
    body: "Beyond compliance, we provide strategic advice on partnership structures, LLP conversions, profit extraction, practice valuations, and succession planning. We help you make informed decisions about your practice's financial future.",
  },
  {
    label: "Modern, accessible service.",
    body: "Fixed fees, online access, and direct communication with your dedicated solicitor accountant. We're here when you need us, without the traditional barriers of old-school accounting firms.",
  },
];

/* Same device for "who we work with": the five existing list items become five
   tiles on the opposing ground. Words verbatim, order unchanged. */
const clientTypes = [
  "Sole practitioner solicitors managing self-assessment and MTD compliance",
  "Law firm partners navigating partnership tax and profit allocations",
  "Practice managers and COFAs ensuring SRA Accounts Rules compliance",
  "Multi-partner firms planning LLP conversions and succession",
  "Legal practice owners considering practice sales or retirement",
];

export default function AboutPage() {
  return (
    <>
      {/* Navy motif hero, breadcrumb inside it. The brand hex measures 3.06 on
          slate-900 and never carries text there. */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} variant="light" />
          {/* Narrow measure on the hero copy only; every body band below is
              siteContainerLg. */}
          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              Specialist accountants for solicitors and law firms
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              We work exclusively with UK solicitors, law firms, and legal practitioners. From sole practitioners managing self-assessment to multi-partner LLPs navigating complex tax structures, we understand the unique financial and regulatory challenges facing the legal sector.
            </p>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      <section id="why-legal-sector" className="scroll-mt-24 bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Why we specialize in the legal sector</h2>
          <Prose>
            <p>
              Legal practices face accounting challenges that generalist accountants simply don't encounter. SRA Accounts Rules require strict client money handling and 5-week reconciliations. Partnership and LLP structures involve complex profit allocations and Basis Period Reform implications. VAT on legal services has specific rules around disbursements and counsel fees that require specialist knowledge.
            </p>
            <p>
              With 26.2% of SRA firm closures attributed to accounting breaches (up from 18.6% the previous year), the stakes have never been higher. You need accountants who understand not just general accounting principles, but the specific regulatory framework, tax treatment, and compliance requirements unique to solicitors and law firms.
            </p>
            <p>
              That's why we focus exclusively on the legal sector. Every accountant on our team works only with solicitors, law firms, and legal practitioners. We understand SRA compliance, client money rules, partnership taxation, LLP structures, and the financial pressures facing legal practices in 2026.
            </p>
          </Prose>
        </div>
      </section>

      <section id="our-approach" className="scroll-mt-24 bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Our approach</h2>
          <Prose>
            <p>
              We believe accounting for solicitors should be clear, proactive, and focused on your specific needs. Whether you're managing SRA compliance, optimizing your partnership structure, or planning practice succession, we provide practical guidance grounded in legal sector expertise.
            </p>
            <p>
              Our solicitor accountants work with sole practitioners handling self-assessment and MTD compliance, law firm partners navigating profit allocations and LLP conversions, practice managers ensuring client money compliance, and multi-partner firms planning succession and growth.
            </p>
            <p>
              We combine deep legal sector knowledge with modern, accessible service. Fixed fees, direct access to your dedicated accountant, and clear explanations—no jargon, no surprises, no hidden charges.
            </p>
          </Prose>
        </div>
      </section>

      <section id="what-makes-us-different" className="scroll-mt-24 bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What makes us different</h2>
          {/* Cards take the slate ground so they oppose this section's white. */}
          <ul className="mt-8 grid list-none gap-6 pl-0 sm:grid-cols-2">
            {differentiators.map((item) => (
              <li key={item.label} className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">{item.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="who-we-work-with" className="scroll-mt-24 bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who we work with</h2>
          <Prose>
            <p>
              We work with solicitors and law firms across England and Wales, from sole practitioners in high street practices to multi-partner firms in city centers. Our clients include:
            </p>
          </Prose>
          {/* White tiles on the slate ground, one per existing list item. */}
          <ul className="mt-8 grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {clientTypes.map((item) => (
              <li key={item} className="rounded-xl bg-white p-5 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200/70">
                {item}
              </li>
            ))}
          </ul>
          <Prose>
            <p>
              Whether you're in London, Manchester, Birmingham, Leeds, Bristol, or anywhere else in the UK, we provide the same specialist service and legal sector expertise.
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Ready to work with specialist solicitor accountants?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Book a free consultation to discuss your practice's accounting needs. We'll provide clear advice with no obligation.
          </p>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>
              Book free consultation
            </Link>
          </div>
        </div>
      </section>

      {/* One closing ask. The retired CTASection's two links survive verbatim as
          the panel footnote so `cta-section-primary` and `cta-section-secondary`
          keep their ids, labels and hrefs and no live series forks. Contained,
          so a navy panel never touches the navy footer. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow=""
          formTitle=""
          title="Ready to work with specialist solicitor accountants?"
          description="Book a free consultation to discuss your practice's accounting needs. We'll provide clear advice with no obligation."
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
