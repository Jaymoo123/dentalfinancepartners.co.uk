import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { hospitalityHubs } from "@/data/hospitality-hubs";

export const metadata: Metadata = {
  title: "Hospitality Sectors We Work With | Restaurants, Pubs, Hotels and More",
  description:
    "Specialist hospitality accounting for restaurants, pubs and bars, takeaways, hotels, cafes and caterers. Sector-specific advice on tronc, VAT, payroll and accounts.",
};

export default function ForIndexPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-[#b0532f] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Specialist accounting for every hospitality sector.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Each hospitality sector has different VAT rules, payroll complexity and compliance requirements. We work with operators across all of them, week in and week out.
          </p>
        </div>
      </section>

      <section className="bg-[#b0532f]/5 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hospitalityHubs.map((hub) => (
              <Link key={hub.slug} href={`/for/${hub.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#b0532f] hover:shadow-md">
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#b0532f] transition-colors">{hub.title}</span>
                <p className="mt-2 text-sm text-neutral-500 group-hover:text-neutral-600 transition-colors line-clamp-2">{hub.intro.split(".")[0]}.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Each sector has its own rules.</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>A restaurant, a pub and a hotel all sit in the hospitality sector but face different VAT rules, different payroll complexity and different compliance obligations. The accounting requirements are not interchangeable.</p>
              <p>Getting tronc wrong costs employer NIC that should have been saved. Getting food VAT wrong costs 20% on supplies that were actually zero-rated, or creates an HMRC liability on supplies that should have been standard-rated. We know the specific rules for each sector.</p>
            </div>
            <div className="mt-8">
              <Link href="/contact" className={btnPrimary}>Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
