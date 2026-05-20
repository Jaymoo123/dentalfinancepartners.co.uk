import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, ShieldAlert } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, referencedOrganization, referencedPerson } from "@/lib/schema";
import { STORIES } from "./data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(STORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = STORIES[slug];
  if (!story) return { title: "Story not found" };

  const url = `${siteConfig.url}/founder-stories/${slug}`;
  return {
    title: `${story.title} | Founder Stories`,
    description: `Composite case study: ${story.outcome}. Agency type: ${story.agency_type}. Stage: ${story.stage}.`,
    alternates: { canonical: url },
    openGraph: {
      title: story.title,
      description: `Composite case study: ${story.outcome}`,
      url,
      type: "article",
    },
  };
}

export default async function FounderStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = STORIES[slug];
  if (!story) notFound();

  const url = `${siteConfig.url}/founder-stories/${slug}`;
  const related = Object.values(STORIES)
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article" as const,
    "@id": `${url}#article`,
    headline: story.title,
    description: story.outcome,
    url,
    inLanguage: "en-GB",
    articleSection: "Founder Stories",
    isAccessibleForFree: true,
    publisher: referencedOrganization(),
    author: referencedPerson("james-whitfield"),
  };
  return (
    <>
      <JsonLd data={article} />

      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Founder Stories", href: "/founder-stories" },
              { label: story.title },
            ]}
          />
          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Users className="h-3.5 w-3.5" />
              {story.agency_type} · {story.stage}
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              {story.title}
            </h1>
            <p className="mt-4 text-base text-slate-300">
              <strong className="text-white">Outcome:</strong> {story.outcome}
            </p>
          </div>
        </div>
      </section>

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-amber-500 p-5 mb-10">
              <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>This is a composite case study.</strong> It is based on patterns across multiple real agency clients. Names, locations and specific figures have been anonymised. The financial mechanics and tax treatment are real and reflect current 2025/26 UK rules.
              </p>
            </div>

            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: story.body }}
            />

            <div className="mt-12 bg-slate-900 p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-bold sm:text-3xl">Want to talk through your own situation?</h2>
              <p className="mt-3 text-base sm:text-lg text-slate-200">
                Book a free 60-minute Agency Finance Health Check. We will model your actual position and show you what the numbers say.
              </p>
              <Link href="/free-health-check" className={`${btnPrimary} mt-6`}>
                Book a free health check
              </Link>
            </div>

            {related.length > 0 && (
              <section className="mt-12 pt-12 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Other founder stories</h2>
                <ul className="space-y-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/founder-stories/${r.slug}`}
                        className="block bg-slate-50 border-l-4 border-slate-300 p-5 hover:border-indigo-600 hover:bg-white transition-all"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                          {r.agency_type}
                        </p>
                        <h3 className="mt-2 text-base font-bold text-slate-900">{r.title}</h3>
                        <p className="mt-2 text-xs text-slate-600">{r.outcome}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
