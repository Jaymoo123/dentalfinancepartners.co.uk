import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { cryptoServices } from "@/data/crypto-services";
import { serviceTiers } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: { absolute: "Crypto Tax Services | Crypto Tax Partners" },
  description: "Crypto tax services: HMRC disclosure, Self Assessment, Koinly reconciliation, CGT planning and investor vs trader status advice.",
};

export default function ServicesPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#0e1a3a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Crypto tax services.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Five specialist services built around the tax and compliance obligations that cryptoasset holders actually face.</p>
      </div>
    </section>

    <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cryptoServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group block bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#0e1a3a] transition-all">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#0e1a3a] transition-colors sm:text-2xl">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">{service.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0e1a3a]">Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Three service tiers</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Simple CGT filing for straightforward investors, full reconciliation for complex portfolios, and disclosure support for prior-year corrections. You can move tier at any point.
          </p>
        </div>
        <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
      </div>
    </section>

    <section className="border-t border-neutral-200 bg-[#fafaf9] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Not sure which service you need?</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">Tell us about your crypto situation and we will explain what is required. We reply within 24 hours.</p>
            <ul className="mt-8 space-y-3 text-sm text-neutral-600">
              <li className="flex items-start gap-3"><span className="mt-0.5 font-bold text-[#0e1a3a]">✓</span><span>Reviewed by a crypto tax specialist, not a generalist</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5 font-bold text-[#0e1a3a]">✓</span><span>No obligation, free initial reply</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5 font-bold text-[#0e1a3a]">✓</span><span>Response within 24 hours</span></li>
            </ul>
          </div>
          <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900">Get in touch</h3>
            <p className="mt-2 text-sm text-neutral-500">We will be back within 24 hours.</p>
            <div className="mt-6">
              <LeadForm redirectOnSuccess={false} submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
}
