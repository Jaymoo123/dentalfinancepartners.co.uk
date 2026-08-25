import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `About ${siteConfig.name} | Who We Are and How We Work` },
  description: `${siteConfig.name} is a free information service for UK wills, probate and inheritance tax. What we do, what we don't, and how we keep our guides accurate.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A free information service for wills, probate and inheritance tax.
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
                {siteConfig.name} is a free information service covering wills, probate, inheritance tax and estate planning in the UK. We are not a law firm and we do not present ourselves as one. The site is built and maintained as an editorial service, with input from specialists in wills, probate and tax, and every substantive page is checked against official sources before it is published.
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
                  <span className="font-semibold text-neutral-900">Specialist connections.</span> If you want professional help, we can connect you with vetted specialist firms. This only ever happens with your consent.
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
                  <span className="font-semibold text-neutral-900">We do not write wills, administer estates or handle probate applications.</span> That work belongs with specialist firms.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">We do not sell financial products.</span> No equity release, no investments, no insurance.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">How we make money</h2>
              <p>
                Honesty about this matters to us. If you ask us to connect you with a specialist firm and you go on to use their services, we may receive a fee from that firm. This never changes what you pay, and it never changes what our guides and calculators say. The tools and content are free for everyone, whether or not you ever speak to a specialist.
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
    </>
  );
}
