import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { careHubs, getHub } from "@/data/care-hubs";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { JsonLd, buildBreadcrumb, buildFaqPage, buildService } from "@accounting-network/web-shared/schema";
import { niche } from "@/config/niche-loader";
import { LeadForm } from "@/components/forms/LeadForm";

/* Schema parity fix (mirrors charities' for/[slug]): this route emitted only
   a hand-rolled FAQPage via lib/schema.buildFaqJsonLd, no Service, no
   BreadcrumbList. */
const SCHEMA_OPTS = {
  siteUrl: siteConfig.url,
  siteName: siteConfig.name,
  legalName: siteConfig.legalName,
  publisherLogoUrl: siteConfig.publisherLogoUrl,
};

export function generateStaticParams() { return careHubs.map((h) => ({ slug: h.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) return {};
  return { title: { absolute: hub.metaTitle }, description: hub.metaDescription, alternates: { canonical: `${siteConfig.url}/for/${slug}` } };
}

export default async function CareHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) notFound();
  return (<>
    <JsonLd
      data={[
        buildService(
          {
            name: hub.title,
            description: hub.metaDescription,
            url: `/for/${hub.slug}`,
            areaServed: "United Kingdom",
          },
          SCHEMA_OPTS,
        ),
        buildBreadcrumb(
          [
            { label: "Home", href: "/" },
            { label: "For", href: "/for" },
            { label: hub.title },
          ],
          SCHEMA_OPTS,
        ),
        ...(buildFaqPage(hub.faqs) ? [buildFaqPage(hub.faqs)!] : []),
      ]}
    />
    <section className="border-b border-neutral-200 bg-[#5a4d75] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Link href="/for" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6">All provider types</Link>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{hub.headline}.</h1>
        {/* intro carries inline <a> anchors in src/data/care-hubs.ts; {hub.intro} would
            escape the markup and ship the tags as visible text (see the charities fix). */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80" dangerouslySetInnerHTML={{ __html: hub.intro }} />
        <div className="mt-10"><Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#5a4d75] hover:bg-white/90 transition-colors">Get in touch</Link></div>
      </div>
    </section>
    <section className="bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {hub.stats.map((stat) => (
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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What makes {hub.title.toLowerCase()} finance different.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {hub.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-[#7d6b9e] bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help {hub.title.toLowerCase()}.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {hub.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-[#7d6b9e] hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {hub.faqs.length > 0 && (
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {hub.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#7d6b9e] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-[#7d6b9e] transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    <div id="book" className="scroll-mt-24">
      <LeadCTAPanel
        contained
        ground="slate"
        eyebrow="Free call"
        title={`Talk to a care sector specialist about ${hub.title}`}
        description={`Tell us about your ${hub.title.toLowerCase()} situation and we will reply within 24 hours.`}
        proofPoints={[]}
        formTitle="Get in touch"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    </div>
  </>);
}
