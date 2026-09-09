import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { GUIDES } from "./[slug]/data";

export const metadata: Metadata = {
  title: `Free Guides`,
  description:
    "Free in-depth guides for UK business owners. Year-end tax checklist, switching accountants playbook, first 90 days post-incorporation, contractor playbook.",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesIndexPage() {
  const guides = Object.values(GUIDES);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Free guides" }];

  return (
    <>
      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb siteUrl={siteConfig.url} onDark items={crumbs} />
            <Eyebrow onDark>Free guides</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              Free in-depth guides
            </h1>
            {/* Describes what actually happens. The guide body is not on the
                page: each guide page lists what is inside and the full version
                is emailed after the form. The old line advertised a retired
                email-gate arm instead. */}
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              Long-form practical guides for UK business owners. Year-end tax planning, switching
              accountants, the first 90 days as a limited company, a contractor&rsquo;s first
              contract. Read what is inside on each guide&rsquo;s page, then get the guide itself by
              telling us where to send it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The guides</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">
            {guides.length} {guides.length === 1 ? "guide" : "guides"}
          </h2>
          <RelatedArticles
            columns={2}
            items={guides.map((g) => ({
              href: `/guides/${g.slug}`,
              title: g.title,
              excerpt: g.teaser,
              kind: "guide" as const,
            }))}
          />
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Would a conversation be faster than a guide?"
          description="A free call with an accountant who looks at your actual position, rather than a document you have to apply to it yourself."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          contained
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
