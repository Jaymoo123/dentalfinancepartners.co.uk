import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { vatPages } from "@/data/vat";
export const metadata: Metadata = {
  title: "Ecommerce VAT Hub | UK Online Seller VAT Guides",
  description: "VAT guidance for UK ecommerce and marketplace sellers: deemed supplier rules, marketplace fee VAT, the £135 import rule, IOSS/OSS, postponed VAT and margin scheme.",
};
export default function VatIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#8a5e1a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">VAT for online sellers: the depth cluster.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Ecommerce VAT is specific. Deemed supplier rules, marketplace fee reverse charge, the £135 import rule, IOSS and postponed VAT all apply differently to online sellers.</p>
      </div>
    </section>
    <section className="bg-[#c9861b]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {vatPages.map((vp) => (
            <Link key={vp.slug} href={`/vat/${vp.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#c9861b] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#c9861b] transition-colors">{vp.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{vp.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
