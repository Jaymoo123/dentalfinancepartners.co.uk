import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { NumberedReasons } from "@accounting-network/web-shared/design/marketing/NumberedReasons";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { getAllFundamentals } from "@/lib/fundamentals";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { JsonLd, buildBreadcrumb, buildCollectionPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Fundamentals | Pillar Guides for UK Business Owners",
  description:
    "Definitive pillar guides on UK business tax, finance, incorporation, IR35, MTD, R&D, exit planning and more. Written by our specialist accountants for limited companies, contractors, sole traders and partnerships.",
  alternates: { canonical: `${siteConfig.url}/fundamentals` },
  openGraph: {
    title: "Fundamentals | Pillar Guides for UK Business Owners",
    description:
      "Definitive pillar guides on UK business tax, finance, incorporation, IR35, MTD, R&D, exit planning and more.",
    url: `${siteConfig.url}/fundamentals`,
    type: "website",
  },
};

const ORIENTATION = [
  {
    title: "Incorporate, or decide not to",
    body: "Sole trader against limited company is the decision everything else hangs off. Get it wrong and you pay for it every year until you change it.",
  },
  {
    title: "Get the VAT and payroll rhythm right",
    body: "Once you are trading, the calendar runs you: VAT returns, RTI submissions, corporation tax, the director's own pay. Set it up once and it stops being a monthly scramble.",
  },
  {
    title: "Plan the exit before you need to",
    body: "Whether you sell, wind down or hand over, the reliefs are won 12 to 24 months out. By completion the structure is already fixed.",
  },
];

export default function FundamentalsIndexPage() {
  const guides = getAllFundamentals();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Fundamentals" },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumb(crumbs),
          buildCollectionPage({
            name: "Fundamentals",
            description: `${guides.length} pillar guides on UK business tax, structure, VAT, payroll and exit planning.`,
            path: "/fundamentals",
          }),
        ]}
      />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            {/* One trail, not two. This page used to appear twice in its own
                breadcrumb (Guides -> Fundamentals, both pointing here). */}
            <Breadcrumb siteUrl={siteConfig.url} onDark items={crumbs} />
            <Eyebrow onDark>Pillar guides</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              UK business finance fundamentals
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              The definitive guides we wish every UK business owner had read before incorporating,
              hiring, or selling.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Where to start</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Three decisions, in the order they arrive
          </h2>
          <Prose>
            <p>
              These guides are not a syllabus and you do not have to read them in order. But most
              UK business owners meet the same three questions in the same sequence, and knowing
              which one you are actually facing is usually enough to tell you which guide to open.
            </p>
          </Prose>
          <div className="mt-8 sm:mt-12">
            <NumberedReasons items={ORIENTATION} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The guides</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">
            {guides.length} pillar {guides.length === 1 ? "guide" : "guides"}
          </h2>
          {guides.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No pillar guides published yet. Check back soon.
            </p>
          ) : (
            <RelatedArticles
              columns={3}
              items={guides.map((g) => ({
                href: `/fundamentals/${g.slug}`,
                title: g.title,
                excerpt: g.summary,
                kind: "guide" as const,
              }))}
            />
          )}
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Rather have someone read your position than read six guides?"
          description="A free call with an accountant who looks at your actual figures, and tells you which of these decisions is the one in front of you."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          // Contained, not navy: this panel closes the page and the footer is
          // slate-900. Navy must never touch navy.
          contained
          ground="white"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
