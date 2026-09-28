import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { pharmacyServices } from "@/data/pharmacies-services";
import { serviceTiers } from "@/config/service-tiers";
import { siteContainerLg } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "Services | Pharmacy Tax",
  description: "Specialist pharmacy accounting services: purchase accounting, sale and CGT, valuation, NHS reconciliation, VAT retail schemes, payroll, incorporation, and benchmarking.",
  alternates: { canonical: `${siteConfig.url}/services` },
};
export default function ServicesPage() {
  return (
    <main className={`${siteContainerLg} py-16`}>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Services</h1>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-neutral-900">Service tiers</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Start with compliance essentials, add management accounts and payroll as you grow, move to specialist advisory when buying or selling a pharmacy. You can move tier at any month-end.
        </p>
        <div className="mt-8">
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-neutral-900">All services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {pharmacyServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 hover:border-[#0f3a4a] hover:shadow-md transition-all">
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{service.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    {/* ADDED 2026-09-28 parity phase 0 (Opus read): brief section 4 requires one
        lead form on every money page and this route rendered none. Same band as
        the /for and /services slug templates, not a new pattern. */}
    <section className="bg-[#0f3a4a] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Not sure which of these you need?</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">Most pharmacy owners need two or three of them at once and cannot tell which comes first. Tell us what you run and what is worrying you, and we will tell you where we would start.</p>
            <p className="mt-4 text-sm text-white/70">Free first call, then a fixed fee in writing.</p>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <LeadForm submitLabel="Send enquiry" />
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              We reply within 24 hours and one of our accountants comes back to you directly.
            </p>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
