import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { ecommerceServices } from "@/data/services";
export const metadata: Metadata = {
  title: "Ecommerce Tax Services | VAT, Accounts and Seller Compliance",
  description: "Specialist ecommerce accountancy services: VAT compliance, settlement reconciliation, EU selling and HMRC platform-reporting letter response.",
};
export default function ServicesIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#8a5e1a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist services for UK online sellers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">VAT compliance, settlement reconciliation, EU selling and HMRC letter response.</p>
      </div>
    </section>
    <section className="bg-[#c9861b]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ecommerceServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#c9861b] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#c9861b] transition-colors">{s.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{s.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
