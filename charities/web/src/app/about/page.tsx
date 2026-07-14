import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "About | Specialist Charity Accountants",
  description: `${siteConfig.name} is a specialist accountancy practice for UK charities, CICs and social enterprises. Accounts, independent examination, Gift Aid and trustee compliance.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  const co = siteConfig.company;

  return (
    <>
      <section className="border-b border-neutral-200 bg-[#1a5c4a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only work with charities, CICs and social enterprises.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Because the Charities SORP, fund accounting, Gift Aid and independent examination are specific enough that general accounting experience is not the same as specialist experience.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>We are specialist accountants for charities, community interest companies and social enterprises. Every client we work with operates in the charity and not-for-profit sector. That focus means we understand the financial specifics of charitable organisations in a way that a general practice does not.</p>
            <p>The independent examination is the clearest example. Many trustees do not know what the examiner is looking for, what the examiner needs the accounts to include, or how to make the examination process straightforward. We carry out examinations week in, week out and we prepare the accounts with the examination in mind.</p>
            <p>The same applies to Gift Aid and GASDS claims, fund accounting for restricted grants, the Charities SORP presentation requirements, and the Charity Commission annual return. These are not things that come up occasionally for us. They are the core of what we do.</p>
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
