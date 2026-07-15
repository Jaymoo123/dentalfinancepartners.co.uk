import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { sellerHubs } from "@/data/for";
export const metadata: Metadata = {
  title: "Ecommerce and Marketplace Seller Accountants | Who We Help",
  description: "Specialist ecommerce tax support by seller type: Amazon FBA/FBM, Shopify, marketplace sellers (eBay/Etsy/Vinted/TikTok Shop) and dropshippers.",
};
export default function ForIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#8a5e1a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist ecommerce tax support for every type of online seller.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Each selling model carries different VAT, platform and tax considerations. We work with all of them.</p>
      </div>
    </section>
    <section className="bg-[#c9861b]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sellerHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#c9861b] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#c9861b] transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{hub.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
