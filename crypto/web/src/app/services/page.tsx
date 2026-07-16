import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { cryptoServices } from "@/data/crypto-services";
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
    <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Not sure which service you need?</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">Tell us about your crypto situation and we will explain what is required.</p>
        <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
  </>);
}
