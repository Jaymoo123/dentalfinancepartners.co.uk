import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_parts/PageHero";
import { sectionY, siteContainerLg } from "@/components/ui/layout-utils";
import { cryptoHubs } from "@/data/crypto-hubs";
import { siteConfig } from "@/config/site";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Crypto Tax by Holder Type | Investors, Traders, DeFi, NFTs and More",
  description: "Specialist crypto tax advice by holder type: investors, day traders, DeFi and staking participants, NFT creators, miners and businesses.",
  alternates: { canonical: `${siteConfig.url}/for` },
};

export default function ForIndexPage() {
  return (<>
    <PageHero eyebrow="Crypto tax by holder type" title="Specialist crypto tax for every type of holder." items={[{ label: "Home", href: "/" }, { label: "Holder types" }]}>
      <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">Each holder type faces different tax rules and compliance obligations. We work with all of them.</p>
    </PageHero>

    <section className="bg-slate-50">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cryptoHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className="group flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]">
              <span className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary-700">{hub.title}</span>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{hub.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Phase 0 2026-09-28: this hub previously had no capture surface at
        all. proofPoints={[]}: crypto publishes neither a fee nor a
        turnaround figure. */}
    <LeadCTAPanel
      title="Not sure which holder type fits you?"
      description="Tell us what you hold and how you came by it, and we will point you to the right place, or just take it from there."
      proofPoints={[]}
      formTitle="Get in touch"
      form={<LeadForm submitLabel="Send enquiry" />}
    />
  </>);
}
