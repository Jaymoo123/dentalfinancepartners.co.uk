import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "About | UK Cryptoasset Tax Specialists",
  description: `${siteConfig.name} are specialist UK tax accountants for cryptoasset holders.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    <section className="border-b border-neutral-200 bg-[#0e1a3a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">We only work with cryptoasset holders and businesses.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">CGT pooling rules, HMRC disclosure routes, staking income treatment and the CARF compliance deadline are specific enough that general accounting experience is not the same as specialist experience.</p>
      </div>
    </section>
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>We are specialist tax accountants for UK cryptoasset holders: investors, day traders, DeFi and staking participants, NFT creators, miners, and businesses that hold or accept crypto.</p>
          <p>The CARF reporting framework means exchanges will report your data to HMRC for the first time between January and May 2027, covering activity from 1 January 2026. Holders who have not kept accurate records need to act before that data lands.</p>
          <p>We handle CGT s104 pool calculations, HMRC disclosure, Self Assessment including the SA108 cryptoasset pages, staking and mining income classification, and DeFi transaction review.</p>
          <p>We work on a fixed-fee basis and reply within one working day.</p>
        </div>
        <div className="mt-10 border-t border-neutral-100 pt-8 text-sm text-neutral-500">
          <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
        </div>
        <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
  </>);
}
