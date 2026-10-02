import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `About ${siteConfig.name} | Who We Are and How We Work` },
  description: `${siteConfig.name} is an accountancy firm for UK wills, probate and inheritance tax. What we do, what we don't, and how we keep our guides accurate.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Accountants for the money side of wills, probate and inheritance tax.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            We built {siteConfig.name} because this is an area where people need clear answers at difficult moments, and too much of what exists online is either sales material dressed up as guidance, or official documentation written for professionals.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-12 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Who we are</h2>
              <p>
                {siteConfig.name} is an accountancy firm covering the money side of wills, probate, inheritance tax and estate planning in the UK. We are accountants, not a law firm, and we do not present ourselves as one. The guides and calculators are written and maintained by our team, with input from our specialists in wills, probate and tax, and every substantive page is checked against official sources before it is published.
              </p>
              <p>
                {siteConfig.name} is a trading name of Ashfield Trading Ltd, a company registered in England and Wales.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">What we do</h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-neutral-900">Free calculators.</span> Inheritance tax estimates, nil rate band checks, probate cost estimates and a checker for the April 2027 pension changes. All free, no sign-up, working shown.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Plain-English guides.</span> Step-by-step explanations of probate, wills, inheritance tax and estate planning, written from official source material and kept current.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Specialist help.</span> If you want professional help, one of our estate planning specialists can take it on. No cold calls. We only contact you about the enquiry you send.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">What we do not do</h2>
              <p>We think you should know exactly where our boundaries are:</p>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-neutral-900">We do not provide legal or financial advice.</span> Everything on this site is general information. It cannot take account of your personal circumstances, and it is not a substitute for advice from a qualified professional.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">We do not write wills, administer estates or handle probate applications.</span> That is legal work. Where you need a solicitor, we work alongside a regulated firm and stay on the money side.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">We do not sell financial products.</span> No equity release, no investments, no insurance.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">How we are paid</h2>
              <p>
                Honesty about this matters to us. We earn fees for the estate accounting and inheritance tax work our team does for clients who ask for it. That never changes what our guides and calculators say. The tools and content are free for everyone, whether or not you ever speak to a specialist.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Editorial standards</h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-neutral-900">Sources.</span> Our primary sources are gov.uk, HMRC guidance and manuals, and HM Courts and Tribunals Service (HMCTS). Where a page relies on a specific rule or figure, we cite it.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Figures.</span> Tax figures are stated for the current tax year (2026/27) and dated on the page.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Review cadence.</span> Every guide carries a last-reviewed date. We review content after each Budget and Finance Act, and at the start of each tax year. Pages affected by the April 2027 pension changes are flagged and will be updated as final rules and guidance are confirmed.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Corrections.</span> If you spot something wrong, tell us via the contact page. We would rather fix it than defend it.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/contact" className={btnPrimary}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Closing ask. Added 2026-09-28 (estate parity phase 0): this page rendered
          no capture surface at all, so the only route off it was a link. Same
          anatomy as /probate's closing block, not a new pattern. */}
      <section className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Want a specialist to take it from here?</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">Some estates need more than a calculator</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">Some estates are simple. Many are not: blended families, business assets, property abroad, pensions after April 2027. If you would like a professional to look at your situation, tell us a little about it and one of our estate planning specialists will take a look. It costs you nothing to ask, and there is no obligation.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl">Speak to a specialist</h3>
              <LeadForm submitLabel="Speak to a specialist" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
