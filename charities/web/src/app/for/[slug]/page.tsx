import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { charityTypes, getCharityType } from "@/data/charity-types";
import { buildFaqJsonLd } from "@/lib/schema";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";

export function generateStaticParams() {
  return charityTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = getCharityType(slug);
  if (!type) return {};
  return {
    title: { absolute: type.metaTitle },
    description: type.metaDescription,
    alternates: { canonical: `${siteConfig.url}/for/${slug}` },
  };
}

export default async function CharityTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getCharityType(slug);
  if (!type) notFound();

  return (
    <>
      <section className="border-b border-neutral-200 bg-[#1a5c4a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link href="/for" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6">
            All sectors
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{type.headline}.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{type.intro}</p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#1a5c4a] hover:bg-white/90 transition-colors">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {type.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What makes {type.title.toLowerCase()} accounting different.</h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {type.challenges.map((item) => (
              <article key={item.title} className="border border-neutral-200 border-l-4 border-l-[#1a5c4a] bg-neutral-50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help {type.title.toLowerCase()}.</h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {type.howWeHelp.map((item) => (
              <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-[#1a5c4a] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-[#1a5c4a] hover:opacity-80 font-semibold text-sm sm:text-base transition-opacity">
              View all services
            </Link>
          </div>
        </div>
      </section>

      {type.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(type.faqs) }} />
      )}
      {type.faqs.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
              <div className="space-y-3 sm:space-y-4">
                {type.faqs.map((faq) => (
                  <details key={faq.question} className="group border border-neutral-200 bg-white">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#1a5c4a] transition-colors list-none">
                      <span>{faq.question}</span>
                      <span className="flex-shrink-0 text-[#1a5c4a] transition-transform group-open:rotate-45" aria-hidden>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Speak to a specialist.</h2>
          <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">
            Tell us about your {type.title.toLowerCase()} and we will reply within 24 hours.
          </p>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fafaf7] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">Other sectors we work with</p>
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            {charityTypes.filter((t) => t.slug !== slug).map((t) => (
              <Link key={t.slug} href={`/for/${t.slug}`} className="group block border border-neutral-200 bg-white p-4 transition-all hover:border-[#1a5c4a] hover:shadow-sm">
                <span className="text-sm font-semibold text-neutral-800 group-hover:text-[#1a5c4a] transition-colors">{t.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/for" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a5c4a] hover:opacity-80 transition-opacity">
              See all sectors we work with
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
