import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "About | Specialist Hospitality Accountants",
  description: `${siteConfig.name} is a specialist accountancy practice for UK hospitality businesses. Tronc and tips compliance, food VAT, payroll and accounts for restaurants, pubs, hotels, cafes and takeaways.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  const co = siteConfig.company;

  return (
    <>
      <section className="border-b border-neutral-200 bg-[#b0532f] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only work with hospitality businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Because tronc and tips compliance, food and drink VAT, payroll for variable-hours teams and the specific requirements of the licensed trade are specific enough that general accounting experience is not the same as specialist experience.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>We are specialist accountants for hospitality operators: restaurants, pubs and bars, hotels, cafes, takeaways, caterers and street food businesses. Every client we work with operates in the hospitality sector. That focus means we understand the financial specifics of the industry in a way that a general practice does not.</p>
            <p>Tronc and tips compliance is the clearest example. Many operators do not know what HMRC is looking for, what the Employment (Allocation of Tips) Act 2023 requires, or how to structure a scheme that actually saves employer National Insurance. We set up and operate tronc schemes week in, week out and we know where the compliance risks are.</p>
            <p>The same applies to food and drink VAT, payroll for zero-hours and variable-hours staff, business rates relief for licensed premises, and the Corporation Tax position for hospitality businesses. These are not things that come up occasionally for us. They are the core of what we do.</p>
            <p>We work on a fixed-fee basis. You know what you are paying before we start. We reply within one working day.</p>
          </div>
          <div className="mt-10 border-t border-neutral-100 pt-8 text-sm text-neutral-500">
            <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
          </div>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
