import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { GUIDES } from "./data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return { title: "Guide not found" };

  const url = `${siteConfig.url}/guides/${slug}`;
  return {
    title: `${guide.title} | Free Guide`,
    description: guide.teaser,
    alternates: { canonical: url },
    openGraph: { title: guide.title, description: guide.teaser, url, type: "article" },
  };
}

export default async function GuideLandingPage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

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
                { label: "Guides", href: "/guides" },
                { label: guide.title },
              ]}
            />
            <Eyebrow onDark>{guide.category}</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              {guide.teaser}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div>
              <Eyebrow>Inside the guide</Eyebrow>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">What&rsquo;s inside</h2>
              <DrawnTickList
                tickClassName="text-primary-600"
                className="text-base text-slate-700"
                items={[
                  "Specific actionable steps with deadlines",
                  "2026/27 UK tax figures throughout",
                  "Real software, HMRC form references, and worked examples",
                  "Written by our specialist accountants",
                  "Free, no obligation, no follow-up sales calls",
                ]}
              />

              <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                <h3 className="text-base font-bold text-slate-900">Why we publish these for free</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  We work with UK business owners across every sector: limited companies, contractors, sole traders, partnerships and growing SMEs. The patterns we see repeat. Publishing the playbooks publicly is how we demonstrate the value of working with us. If you find this useful and want it applied to your specific situation, a free call is where that conversation starts.
                </p>
              </div>
            </div>

            <aside>
              {/* D.1: a LeadForm never sits in a coloured card. White card, slate ring. */}
              <div className="sticky top-24 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)] sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <Download className="h-6 w-6 text-primary-700" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Get the full guide</h2>
                <p className="mt-2 text-sm text-slate-700">
                  Drop your email and we&rsquo;ll send you the full guide right away. No spam, no follow-up calls unless you ask.
                </p>
                <div className="mt-5">
                  <LeadForm
                    successRedirect={`/guides/${guide.slug}/download`}
                    submitLabel="Get the guide"
                  />
                </div>
                <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                  By submitting you agree to receive this guide and occasional related insights. Unsubscribe any time.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
