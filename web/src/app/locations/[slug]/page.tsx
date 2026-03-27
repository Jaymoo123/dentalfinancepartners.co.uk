import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteConfig.locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  if (!loc) {
    return {};
  }
  const canonical = `${siteConfig.url}/locations/${loc.slug}`;
  return {
    title: loc.title,
    description: `${loc.title} — ${siteConfig.name} provides specialist UK dental practice accounting and tax support.`,
    alternates: { canonical },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  if (!loc) {
    notFound();
  }

  const posts = getAllPosts().slice(0, 3);

  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">{loc.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {siteConfig.name} supports{" "}
        <strong>dental practices</strong>, <strong>associates</strong>, and <strong>owners</strong> across the UK
        with sector-specific accounting and tax advice. Use this page as a starting point for local SEO — expand with
        verified office address, local schema, and testimonials.
      </p>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">How we help practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        <li>Year-end accounts and corporation tax aligned to dental practice economics</li>
        <li>Associate and self-employed tax positions where HMRC scrutiny is high</li>
        <li>Profit extraction and cashflow modelling for owners planning investment</li>
      </ul>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Related articles</h2>
      <ul className="mt-4 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className={`inline-flex min-h-10 items-center text-[var(--accent-strong)] underline ${focusRing} rounded`}
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <CTASection
          title={`Request a call — ${loc.title}`}
          description="Tell us about your practice structure and we will map the accounting and tax work that fits."
        />
      </div>
    </div>
  );
}
