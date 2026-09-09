import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { BLOG_STAGE_LIST } from "@/lib/blog-stages";

export const metadata: Metadata = {
  title: `Insights by business stage`,
  description:
    "UK tax, structure and finance articles grouped by where you are in the business lifecycle: starting, running, scaling or exiting.",
  alternates: { canonical: `${siteConfig.url}/blog/stage` },
  robots: { index: false, follow: true },
};

export default function BlogStageIndexPage() {
  return (
    <>
      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/blog" },
                { label: "By stage" },
              ]}
            />
            <Eyebrow onDark>Browse by stage</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              Where are you?
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              Tax and structure decisions look different at every stage. Pick the one closest to
              where your business is now.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {BLOG_STAGE_LIST.map((s) => (
              <Link
                key={s.slug}
                href={`/blog/stage/${s.slug}`}
                data-cta={`blog_stage_card_${s.slug}`}
                data-cta-placement="stage_grid"
                className={`group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-600 hover:shadow-md sm:p-7 ${focusRing}`}
              >
                <Eyebrow>{s.keywords}</Eyebrow>
                <h3 className="text-lg font-bold! tracking-normal! leading-snug! text-slate-900 sm:text-xl">
                  {s.name}
                </h3>
                <p className="mt-3 flex-grow text-base leading-7 text-slate-600">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700 group-hover:text-primary-800">
                  Browse articles
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* No LeadCTAPanel here by design: this is a noindex switchboard whose one
          job is to send the reader on to a stage page, each of which carries the
          panel. A form here would compete with that hand-off. (Gate 10.) */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Not sure which one</Eyebrow>
          <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-4xl">
            Browse the whole library instead
          </h2>
          <Link
            href="/blog"
            data-cta="blog_stage_all_articles"
            data-cta-placement="stage_tail"
            className={`inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-600 transition-colors hover:text-primary-700 sm:text-base ${focusRing}`}
          >
            All articles and guides
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
