import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { careServices } from "@/data/care-services";
import { serviceTiers } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: "Care Sector Accountancy Services | Payroll, VAT and More",
  description: "Specialist care sector accountancy services: CQC financial viability statements, care payroll, VAT reviews, and support for buying, selling or starting a care business.",
};
export default function ServicesIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#5a4d75] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist services for UK care providers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Payroll, VAT reviews, financial viability statements, and support for buying, selling or starting a care business.</p>
      </div>
    </section>

    <section className="bg-[#7d6b9e]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Three service tiers</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Start with compliance and CQC financial paperwork, add monthly management accounts as you grow, move to advisory for acquisitions and exits. You can move tier at any month-end.
          </p>
        </div>
        <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
      </div>
    </section>

    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {careServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#7d6b9e] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#7d6b9e] transition-colors">{s.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{s.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
