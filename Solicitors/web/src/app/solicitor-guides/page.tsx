import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllGuides } from "@/lib/solicitor-guides";
import { buildBreadcrumbJsonLd, buildCollectionPage, JsonLd } from "@/lib/schema/index";

export const metadata: Metadata = {
  title: `Pillar Guides for UK Solicitors and Law Firms | ${siteConfig.name}`,
  description:
    "Long-form pillar guides on the decisions UK solicitor firms actually face. SRA Accounts Rules, partnership vs LLP, post-merger integration, PII, COFA, fee-share vs equity partner.",
  alternates: {
    canonical: `${siteConfig.url}/solicitor-guides`,
    languages: {
      "en-GB": `${siteConfig.url}/solicitor-guides`,
      "x-default": `${siteConfig.url}/solicitor-guides`,
    },
  },
  openGraph: {
    title: "Pillar guides for UK solicitors and law firms",
    description:
      "Long-form pillar guides on the decisions UK solicitor firms actually face.",
    url: `${siteConfig.url}/solicitor-guides`,
    type: "website",
  },
};

export default function SolicitorGuidesIndex() {
  const guides = getAllGuides();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Solicitor Guides" },
  ];
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const collectionSchema = buildCollectionPage({
    name: "Pillar Guides for UK Solicitors and Law Firms",
    description:
      "Long-form pillar guides on the decisions UK solicitor firms actually face.",
    path: "/solicitor-guides",
    numberOfItems: guides.length,
  });

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              Pillar guides
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Deep guides for UK solicitors and law firms
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Long-form reference content on the decisions that actually move the
              numbers. Written for partners, COFAs, firm buyers and consultant solicitors. Every guide grounded in current 2025/26 UK tax and SRA regulatory rules.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-5xl">
            {guides.length === 0 ? (
              <p className="text-center text-base text-[var(--ink-soft)]">
                Pillar guides will appear here.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {guides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/solicitor-guides/${g.slug}`}
                    className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-white p-7 transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                      {g.eyebrow}
                    </p>
                    <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--primary)]">
                      {g.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {g.summary}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between text-xs text-[var(--muted)]">
                      <span>
                        {Math.round(g.wordCount / 200)} min read · {g.wordCount.toLocaleString()} words
                      </span>
                      <span className="font-semibold text-[var(--primary)]">
                        Read guide →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
