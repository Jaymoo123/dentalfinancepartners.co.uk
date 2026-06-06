import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideByTopic, publishedGuideTopics } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return publishedGuideTopics().map((topic) => ({ topic }));
}

function formatUkDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  return {
    title: guide ? `${guide.title} (free guide)` : "Free guide",
    description: guide?.summary,
    // Gated, value-behind-the-email asset — never indexed so it cannot compete
    // with the ranking blog/calculator pages.
    robots: { index: false, follow: false },
  };
}

export default async function ResourceGuidePage({ params }: Props) {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  if (!guide) notFound();

  const resource = resourceForTopic(topic as TopicKey);
  const topicObj = getTopic(topic);
  const xlsxReady = isXlsxEnabled(resource);
  const reviewed = formatUkDate(guide.frontmatter.lastReviewed);

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Resources" },
              { label: guide.title },
            ]}
          />

          <header className="mt-6 border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Your free guide{topicObj ? ` · ${topicObj.label}` : ""}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {guide.title}
            </h1>
            {guide.summary ? (
              <p className="mt-4 text-lg leading-relaxed text-slate-700">{guide.summary}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              {guide.frontmatter.version ? <span>Version {guide.frontmatter.version}</span> : null}
              {reviewed ? <span>Last reviewed {reviewed}</span> : null}
            </div>

            {xlsxReady && resource?.xlsx ? (
              <div className="mt-6 print:hidden">
                <a
                  href={resource.xlsx.file}
                  download
                  className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-600 bg-emerald-600 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Download the {resource.xlsx.label}
                </a>
              </div>
            ) : null}
          </header>

          <div
            className="article-body prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          <aside className="mt-12 border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8 print:hidden">
            <h2 className="text-xl font-bold text-slate-900">
              Want this checked for your own situation?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              This guide is general information, not advice for your specific circumstances. A property
              tax specialist can run your actual numbers and tell you what is worth doing.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-600 px-5 py-3 text-base font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                Talk to a specialist
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
