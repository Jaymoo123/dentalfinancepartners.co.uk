import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { addHeadingIds } from "@accounting-network/web-shared/content/markdown-utils";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { siteConfig } from "@/config/site";
import { PrintButton } from "@/components/ui/PrintButton";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { GUIDES } from "../data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return { title: "Guide not found" };
  // Don't index download pages, they should rank as the landing version
  return {
    title: `${guide.title} | Download`,
    description: guide.teaser,
    robots: { index: false, follow: true },
  };
}

/** Minimal h2/h3 reader, same shape as lib/resources/content.ts's extractor.
 *  ponytail: regex rather than a parser: the bodies are generated HTML from
 *  pipeline/generate_guides.py, not arbitrary input. */
function readHeadings(html: string) {
  const re = /<h([23])([^>]*)>([^<]*)<\/h[23]>/gi;
  const out: { id: string; text: string; level: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const id = /id="([^"]*)"/.exec(m[2])?.[1] ?? "";
    const text = m[3].replace(/<[^>]+>/g, "").trim();
    if (id && text) out.push({ id, text, level: parseInt(m[1], 10) });
  }
  return out;
}

export default async function GuideDownloadPage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  // The generated bodies ship without heading ids, so the anchors the TOC needs
  // are added here rather than in the data file (which is regenerated).
  const body = addHeadingIds(guide.body);
  const headings = readHeadings(body);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 py-8 sm:py-10 lg:py-12">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: guide.title, href: `/guides/${guide.slug}` },
                { label: "Download" },
              ]}
            />
            <Eyebrow onDark>Guide unlocked</Eyebrow>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <div className="mb-8 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 print:hidden">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 shrink-0 text-slate-500" />
                  <p className="text-sm text-slate-700">
                    <strong>Tip:</strong> hit print and save as PDF for offline use.
                  </p>
                </div>
                <PrintButton />
              </div>

              <div className="article-body prose-blog" dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            <aside className="print:hidden">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div id="enquiry-form" className="scroll-mt-24 print:hidden">
        <LeadCTAPanel
          title="Want this applied to your business?"
          description="A free call with a specialist accountant who reads your actual position, then tells you which parts of this guide matter for you and which you can ignore."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          contained
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
