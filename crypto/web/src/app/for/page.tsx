import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { cryptoHubs } from "@/data/crypto-hubs";
export const metadata: Metadata = {
  title: "Crypto Tax by Holder Type | Investors, Traders, DeFi, NFTs and More",
  description: "Specialist crypto tax advice by holder type: investors, day traders, DeFi and staking participants, NFT creators, miners and businesses.",
};
export default function ForIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#0e1a3a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist crypto tax for every type of holder.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Each holder type faces different tax rules and compliance obligations. We work with all of them.</p>
      </div>
    </section>
    <section className="bg-[#0e1a3a]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cryptoHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#0e1a3a] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#0e1a3a] transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{hub.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
