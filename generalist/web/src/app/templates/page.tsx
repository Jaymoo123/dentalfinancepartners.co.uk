import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Free UK Business Templates`,
  description:
    "Free downloadable PDF templates for UK limited companies, sole traders and contractors. Invoice template, year-end checklist, MTD ITSA checklist, mileage log, dividend voucher, board minutes, monthly expense tracker. Reviewed against current HMRC and Companies House requirements.",
  alternates: { canonical: `${siteConfig.url}/templates` },
  openGraph: {
    title: `Free UK Business Templates | ${siteConfig.name}`,
    description: "Free PDF templates: invoice, expense tracker, year-end checklist, MTD ITSA checklist and more.",
    url: `${siteConfig.url}/templates`,
    type: "website",
  },
};

const TEMPLATES = [
  {
    slug: "invoice-template",
    title: "UK invoice template",
    summary: "VAT-aware invoice template for UK businesses. Compatible with sole traders, limited companies and partnerships. Replace the bracketed placeholders.",
    audience: "Every UK business issuing invoices",
  },
  {
    slug: "expense-tracker",
    title: "Monthly expense tracker",
    summary: "One-page monthly expense log with HMRC-aligned categories. Use to reconcile bank statements before posting to your bookkeeping software.",
    audience: "Sole traders, freelancers, small Ltd companies",
  },
  {
    slug: "year-end-checklist",
    title: "Limited company year-end tax checklist",
    summary: "23-item checklist for the 4-6 weeks before your company year-end. Covers salary review, dividend timing, AIA, R&D claim prep and post-year-end filings.",
    audience: "Limited company directors",
  },
  {
    slug: "mtd-itsa-checklist",
    title: "MTD for Income Tax quarterly checklist",
    summary: "Pre-MTD setup steps + per-quarter and end-of-period workflow. For self-employed and landlords with qualifying income over £50,000 from April 2026.",
    audience: "Sole traders and landlords",
  },
  {
    slug: "mileage-log",
    title: "Business mileage log",
    summary: "HMRC-compliant mileage log using AMAP rates (55p first 10,000 miles from 6 April 2026, 25p thereafter). Track 22 trips per page, auto-calculates the claim.",
    audience: "Anyone driving a personal vehicle for business",
  },
  {
    slug: "dividend-voucher",
    title: "Dividend voucher template",
    summary: "Companies Act 2006 compliant dividend voucher. Required by law for every dividend payment. Keep with company records for at least 6 years.",
    audience: "Limited company directors paying dividends",
  },
  {
    slug: "board-minutes",
    title: "Board minutes (interim dividend declaration)",
    summary: "Template for single-director or multi-director Ltd companies. Minutes the dividend declaration and confirms distributable reserves were checked.",
    audience: "Limited company directors",
  },
];

export default function TemplatesIndexPage() {
  return (
    <>
      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Templates" }]}
            />
            <Eyebrow onDark>Free templates</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              UK business templates, free.
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              Seven PDF templates for UK limited companies, contractors and sole traders. Each one reviewed against current HMRC and Companies House requirements. Download, fill in, use. No email required.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <article
                key={t.slug}
                className="flex h-full flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200 transition-shadow hover:shadow-md sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <FileText className="h-6 w-6 text-primary-700" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {t.title}
                </h2>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t.audience}
                </p>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-slate-600">
                  {t.summary}
                </p>
                <a
                  href={`/templates/${t.slug}.pdf`}
                  download
                  className={`${btnPrimary} mt-5 w-full gap-2`}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Editorial</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              About the templates
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Every template is reviewed by James Holloway against current HMRC and Companies House requirements. They are not a substitute for tailored tax advice, but they cover the standard documents most UK limited companies, contractors, sole traders and small businesses need.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              No email required. Share them freely with your team, your accountant, or your network. If something is wrong or out of date, get in touch and the editorial team will fix it.
            </p>
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Would a conversation be quicker than a blank template?"
          description="A free call with an accountant who works from your actual figures, instead of a document you have to fill in and interpret yourself."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          contained
          ground="white"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
