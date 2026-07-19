import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { hospitalityServices } from "@/data/hospitality-services";
import { serviceTiers } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: { absolute: "Hospitality Accounting Services | Hospitality Tax" },
  description:
    "Hospitality accounting services: tronc scheme setup, payroll, VAT, TOMS and business rates relief. Specialist support for UK restaurants, pubs, hotels, cafes and takeaways.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-[#b0532f] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hospitality accounting services.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Every service is built around how hospitality finance actually works: tronc and tips compliance, food and drink VAT, payroll for variable-hours teams and the specific requirements of each sector.
          </p>
        </div>
      </section>

      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Three service tiers
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
              Start with annual compliance, add tronc and management accounts as you grow, move to specialist advisory when you are expanding or planning a sale.
            </p>
            {/* ponytail: CSS custom property sets brand colour for ServiceTiers without extra deps */}
            <div className="mt-8" style={{ "--brand-primary": "#b0532f" } as Record<string, string>}>
              <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hospitalityServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group block bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#b0532f] transition-all">
                <h2 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#b0532f] transition-colors sm:text-2xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">{service.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#b0532f]">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Not sure which service you need?</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Tell us about your hospitality business and we will tell you what is required and how we can help.
          </p>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
