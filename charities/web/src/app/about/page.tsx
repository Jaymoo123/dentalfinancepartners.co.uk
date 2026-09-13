import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  siteContainerLg,
  sectionYLoose,
} from "@accounting-network/web-shared/design/layout-utils";

export const metadata: Metadata = {
  title: "About | Specialist Charity Accountants",
  description: `${siteConfig.name} is a specialist accountancy practice for UK charities, CICs and social enterprises. Accounts, independent examination, Gift Aid and trustee compliance.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  const co = siteConfig.company;

  return (
    <>
      {/* Brand-ground hero. primary-600 IS #1a5c4a and measures 7.85 on white,
          so white copy on it clears the 4.5:1 text floor with room to spare.
          No eyebrow: this page has no label nobody wrote, and inventing one is
          copy, not design. */}
      <section className="bg-primary-600 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              We only work with charities, CICs and social enterprises.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Because the Charities SORP, fund accounting, Gift Aid and independent examination are specific enough that general accounting experience is not the same as specialist experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          {/* Two columns rather than a clamped prose block: the entity details
              were a footnote under the text and now sit beside it, which is
              where a reader checking who we are actually looks. */}
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div className="min-w-0 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              <p>We are specialist accountants for charities, community interest companies and social enterprises. That focus means we understand the financial specifics of charitable organisations in a way that a general practice does not.</p>
              <p>The independent examination is the clearest example. Many trustees do not know what the examiner is looking for, what the examiner needs the accounts to include, or how to make the examination process straightforward. We prepare the accounts with the examination in mind and connect you with an independent examiner.</p>
              <p>The same applies to Gift Aid and GASDS claims, fund accounting for restricted grants, the Charities SORP presentation requirements, and the Charity Commission annual return. These are not things that come up occasionally for us. They are the core of what we do.</p>
            </div>

            <div className="min-w-0">
              <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <p className="text-sm leading-relaxed text-slate-600">{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-10">
            <Link href="/contact" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
