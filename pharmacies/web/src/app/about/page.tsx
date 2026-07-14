import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "About | Specialist Accountants for UK Pharmacy Owners",
  description: `${siteConfig.name} are specialist accountants for UK community pharmacy owners, buyers, sellers, and groups.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    <section className="border-b border-neutral-200 bg-[#0f3a4a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">We only work with pharmacy businesses and their owners.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">NHS contract economics, VAT retail schemes, goodwill transactions, and community pharmacy payroll are specific enough that general accounting experience is not the same as specialist experience.</p>
      </div>
    </section>
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>We are specialist accountants for UK community pharmacy businesses: independent owners, buyers and sellers, pharmacy groups, and locum pharmacists.</p>
          <p>Community pharmacies operate under a set of financial rules that differ from most small businesses: NHS Drug Tariff payments, dispensing contractor reconciliation, FP34 claims, VAT retail scheme apportionment, and goodwill-heavy transactions at purchase or sale.</p>
          <p>We handle purchase accounting, sale and CGT planning, pharmacy valuation support, NHS payment reconciliation, VAT retail schemes, payroll for dispensing and retail staff, incorporation and structure, and benchmarking against sector margins.</p>
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
