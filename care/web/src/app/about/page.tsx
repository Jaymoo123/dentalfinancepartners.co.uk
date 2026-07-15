import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "About | Specialist UK Care Sector Accountants",
  description: `${siteConfig.name} are specialist UK accountants for care providers.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    <section className="border-b border-neutral-200 bg-[#5a4d75] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">We work with UK care providers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Care home accounts, payroll, VAT and financial compliance are specialist enough that general accounting experience is not the same as care sector experience.</p>
      </div>
    </section>
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>We are specialist accountants for UK care providers: care homes, domiciliary care agencies, supported living operators, children's homes and new care businesses.</p>
          <p>We support accounts, payroll, VAT and financial compliance for the care sector. This page is being prepared and will set out our approach in more detail.</p>
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
