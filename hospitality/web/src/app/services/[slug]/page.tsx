import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { hospitalityServices, getHospitalityService } from "@/data/hospitality-services";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBreadcrumb, JsonLd } from "@accounting-network/web-shared/schema";

export function generateStaticParams() {
  return hospitalityServices.map((s) => ({ slug: s.slug }));
}

const SERVICE_CLOSERS: Record<string, string> = {
  "tronc-scheme-setup":
    "Tell us how tips reach your staff today and we will design a tronc that genuinely is independent, appoint the troncmaster, and notify HMRC for you.",
  "hospitality-payroll":
    "Send us a typical rota and we will run your payroll off it, keep the tronc separate, and make sure the April 2026 cost rises are priced in before they land.",
  "hospitality-vat":
    "Send us your menu and a month of takings and we will tell you which lines are standard rated, which are not, and whether you have been overpaying.",
  "toms-advice":
    "Tell us what is bundled into your packages and we will tell you whether the Tour Operators Margin Scheme applies to you, and what it does to your VAT bill either way.",
  "business-rates-relief":
    "Send us your rateable value and your current bill and we will tell you what relief you are entitled to from April 2026 and how to claim it.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getHospitalityService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getHospitalityService(slug);
  if (!service) notFound();

  return (
    <>
      {/* 2026-09-28 parity fix (brief section 5, G3): had FAQPage but no
          Service node and no BreadcrumbList. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildServiceJsonLd({
            name: service.headline,
            description: service.metaDescription,
            url: `/services/${slug}`,
          }),
        }}
      />
      <JsonLd
        data={buildBreadcrumb(
          [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title ?? service.headline }],
          { siteUrl: siteConfig.url },
        )}
      />
      <section className="border-b border-neutral-200 bg-[#b0532f] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6">
            All services
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {service.headline}.
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: service.intro }}
          />
          <div className="mt-10">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#b0532f] hover:bg-white/90 transition-colors">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {service.stats.map((stat) => (
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges operators face.</h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {service.challenges.map((item) => (
              <article key={item.title} className="border border-neutral-200 border-l-4 border-l-[#b0532f] bg-neutral-50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p
                  className="mt-4 text-base leading-relaxed text-neutral-600 [&_a]:text-[#b0532f] [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-[#8f421f]"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {service.howWeHelp.map((item) => (
              <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-[#b0532f] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-neutral-600 [&_a]:text-[#b0532f] [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-[#8f421f]"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />
      )}
      {service.faqs.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
              <div className="space-y-3 sm:space-y-4">
                {service.faqs.map((faq) => (
                  <details key={faq.question} className="group border border-neutral-200 bg-white">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#b0532f] transition-colors list-none">
                      <span>{faq.question}</span>
                      <span className="flex-shrink-0 text-[#b0532f] transition-transform group-open:rotate-45" aria-hidden>
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

      {/* 2026-09-28 parity fix (brief section 4): this page rendered zero forms,
          only a /contact link. Swapped for the shared LeadCTAPanel + this
          site's own LeadForm, same pattern as ecommerce's /services/[slug]. */}
      <LeadCTAPanel
        eyebrow="Free first call, then a fixed fee in writing"
        title="Speak to a hospitality accounts specialist."
        description={`${SERVICE_CLOSERS[service.slug] ?? "Tell us about your hospitality business and we will tell you where you stand."} We reply within 24 hours and one of our accountants comes back to you directly.`}
        proofPoints={[]}
        formTitle="Book your free first call"
        form={<LeadForm submitLabel="Request callback" />}
      />

      <section className="bg-[#fafaf7] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">Other services</p>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {hospitalityServices.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group block border border-neutral-200 bg-white p-4 transition-all hover:border-[#b0532f] hover:shadow-sm">
                <span className="text-sm font-semibold text-neutral-800 group-hover:text-[#b0532f] transition-colors">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
