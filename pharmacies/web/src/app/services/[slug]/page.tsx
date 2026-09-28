import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pharmacyServices, getPharmacyService } from "@/data/pharmacies-services";
import { buildFaqJsonLd, buildServiceJsonLd, buildBreadcrumbJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";

export function generateStaticParams() { return pharmacyServices.map((s) => ({ slug: s.slug })); }

const SERVICE_CLOSERS: Record<string, string> = {
  "pharmacy-purchase-accounting":
    "Send us the target's accounts and we will tell you what you are actually buying, what to pay for it, and how to structure the purchase so the tax works.",
  "pharmacy-sale-cgt-badr":
    "Tell us how the business is held and when you want to exit, and we will model what you keep after CGT and whether Business Asset Disposal Relief applies.",
  "pharmacy-valuation-goodwill":
    "Send us three years of accounts and your FP34 history and we will value the goodwill the way a buyer's bank will, not the way a broker's brochure does.",
  "nhs-payment-reconciliation-fp34":
    "Send us a few months of FP34 schedules and your bank statements and we will tell you what the NHS has actually paid you, and what it has not.",
  "pharmacy-vat-retail-schemes":
    "Tell us how your counter sales and dispensing split and we will tell you which retail scheme leaves you better off, and fix the apportionment if it is wrong.",
  "pharmacy-payroll-workforce":
    "Send us a typical rota and we will run the payroll off it, including locums, pension auto-enrolment and the April 2026 employer cost rises.",
  "pharmacy-incorporation-structure":
    "Tell us what the business earns and how you draw from it, and we will show you what incorporating does to your tax bill before you commit to it.",
  "pharmacy-benchmarking-margin":
    "Send us your accounts and we will show you where you sit against comparable pharmacies on gross margin, staff cost and items per month.",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getPharmacyService(slug);
  if (!service) return {};
  return { title: { absolute: service.metaTitle }, description: service.metaDescription, alternates: { canonical: `${siteConfig.url}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getPharmacyService(slug);
  if (!service) notFound();
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildServiceJsonLd({ name: service.title, description: service.metaDescription, url: `/services/${service.slug}` }),
      }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildBreadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]),
      }}
    />
    <section className="border-b border-neutral-200 bg-[#0f3a4a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6">All services</Link>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{service.headline}.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{service.intro}</p>
        <div className="mt-10"><Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#0f3a4a] hover:bg-white/90 transition-colors">Get in touch</Link></div>
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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges clients face.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {service.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-[#0f3a4a] bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {service.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-[#0f3a4a] hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {service.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />}
    {service.faqs.length > 0 && (
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#0f3a4a] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-[#0f3a4a] transition-transform group-open:rotate-45" aria-hidden>
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
    <section className="bg-[#0f3a4a] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Speak to a pharmacy finance specialist.</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">{SERVICE_CLOSERS[service.slug] ?? "Tell us about your situation and we will tell you where you stand."}</p>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <LeadForm submitLabel="Send enquiry" />
            {/* Closer copy: SERVICE_CLOSERS above, one authored sentence per service (Opus read 2026-09-28). */}
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              We reply within 24 hours and one of our accountants comes back to you directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>);
}
