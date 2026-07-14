import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "About | Specialist UK Startup Tax Accountants",
  description: `${siteConfig.name} are specialist UK accountants for funded and scaling startups.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    <section className="border-b border-neutral-200 bg-[#4f46e5] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">We work exclusively with funded and scaling UK startups.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">R&D relief, SEIS and EIS, EMI and share schemes, and investor-ready accounts are specialist enough that general accounting experience is not the same as specialist experience.</p>
      </div>
    </section>
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>We are specialist accountants for funded and scaling UK startups: pre-seed founders preparing for a first raise, VC-backed companies managing R&D and EIS compliance, SaaS businesses navigating VAT place-of-supply, and software development companies with EMI option pools.</p>
          <p>The compliance obligations at each stage of growth are specific: claim notification deadlines for R&D, EIS1 and EIS3 compliance statements after investment, EMI grant notifications and the annual ERS return by 6 July. Getting these right is the substance of the engagement, not a side effect of it.</p>
          <p>We handle R&D merged scheme and ERIS claims, SEIS and EIS advance assurance and compliance, EMI scheme setup and ongoing reporting, share scheme design, Corporation Tax planning, and the investor-ready accounts that boards and future investors expect.</p>
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
