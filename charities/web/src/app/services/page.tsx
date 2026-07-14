import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { charityServices } from "@/data/charity-services";

export const metadata: Metadata = {
  title: { absolute: "Charity Accounting Services | Trustee Finance Partners" },
  description:
    "Charity accounting services: independent examination, annual accounts, bookkeeping, Gift Aid claims and charity VAT. Specialist support for charities, CICs and social enterprises.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-[#1a5c4a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Charity accounting services.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Every service is built around how charity finance works in practice: fund accounting, Charity Commission compliance, Gift Aid and the specific requirements of the Charities SORP.
          </p>
        </div>
      </section>

      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {charityServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group block bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#1a5c4a] transition-all">
                <h2 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#1a5c4a] transition-colors sm:text-2xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">{service.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a5c4a]">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Not sure which service you need?</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Tell us about your charity, CIC or social enterprise and we will tell you what is required and how we can help.
          </p>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
