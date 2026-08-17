import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  btnSecondary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ShieldCheck,
  Calculator,
  BookOpenCheck,
  Users,
} from "lucide-react";
import { tradeTypes } from "@/data/trade-types";
import { buildFaqJsonLd } from "@/lib/schema";
import { allTools, toolPath } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: { absolute: `Free UK Inheritance Tax & Probate Calculators | ${siteConfig.name}` },
  description:
    "Work out inheritance tax, probate costs and the 2027 pension changes with free calculators and plain-English guides. No jargon, no pressure, no sales pitch.",
  alternates: { canonical: siteConfig.url },
};

const keyStats = [
  { value: "£325k", label: "Standard nil rate band per person" },
  { value: "£175k", label: "Residence nil rate band per person" },
  { value: "April 2027", label: "Pensions join the estate for IHT" },
  { value: "7", label: "Free calculators, no sign-up" },
];

const faqs = [
  {
    question: "Do I need a solicitor for probate?",
    answer:
      "Not always. Straightforward estates, for example a single property and a small number of accounts with no disputes, can often be administered using the online probate service. More complex estates, business assets, overseas property, or disagreements between beneficiaries usually benefit from professional support. Our probate cost estimator and DIY versus solicitor checker help you work out which applies to your situation.",
  },
  {
    question: "What is the inheritance tax nil rate band?",
    answer:
      "The standard nil rate band is £325,000 per person for 2026/27. A further residence nil rate band of up to £175,000 per person may be available where a home passes to direct descendants. Both bands can be transferred between spouses and civil partners, meaning a surviving spouse's estate can potentially benefit from up to £1 million combined before inheritance tax applies. This is general guidance, not advice on your particular estate.",
  },
  {
    question: "How will the April 2027 pension changes affect inheritance tax?",
    answer:
      "From 6 April 2027, most unused pension funds and death benefits are due to count as part of your estate for inheritance tax. For many families this is the biggest change to estate planning in a generation. Our 2027 pension exposure checker shows whether your family is likely to be affected and by roughly how much.",
  },
  {
    question: "Is this site a law firm or financial adviser?",
    answer:
      `No. ${siteConfig.name} is an information service, not a law firm or financial adviser. We provide free calculators and plain-English guides based on gov.uk, HMRC and HMCTS sources. If your situation needs professional hands, we can connect you with a vetted specialist firm, but only with your consent and only if you choose to.`,
  },
];

export default function HomePage() {
  const tools = allTools().slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* Hero */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=2000&q=85"
          alt="Person reviewing paperwork at a desk"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/97 via-neutral-950/90 to-neutral-900/60" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="hero-reveal">
              <div className="section-label mb-6">
                Probate & inheritance tax, in plain English
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Understand inheritance tax, probate and your estate. In plain English.
              </h1>
            </div>
            <div className="hero-reveal-delay">
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
                Free calculators and clear guides for anyone dealing with a death, planning a will, or checking whether the April 2027 pension changes affect their family. No jargon, no appointments, no pressure.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link href="/calculators" className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                  Use the free calculators
                </Link>
                <Link
                  href="/blog"
                  className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
                >
                  Read the guides
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2.5 text-sm text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-orange-400 flex-shrink-0" aria-hidden />
                <span className="font-medium">Free, always. No sign-up, no obligation.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats bar */}
      <section className="bg-[#1e293b] py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-orange-300 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <article className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8">
              <Calculator className="h-8 w-8 text-orange-600" strokeWidth={1.75} aria-hidden />
              <h2 className="mt-4 text-xl font-bold text-neutral-900">Free calculators, real numbers</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Estimate inheritance tax, check your nil rate bands, and see what probate might cost. Every calculator uses current HMRC figures for 2026/27, including the £325,000 nil rate band and £175,000 residence nil rate band, and shows its working so you can see exactly how the numbers fall.
              </p>
            </article>
            <article className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8">
              <BookOpenCheck className="h-8 w-8 text-orange-600" strokeWidth={1.75} aria-hidden />
              <h2 className="mt-4 text-xl font-bold text-neutral-900">Plain-English guides</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Probate and estate planning are wrapped in language nobody uses in real life. Our guides translate it. Each one is written from gov.uk, HMRC and HMCTS source material, dated, and reviewed when the rules change.
              </p>
            </article>
          </div>

          {/* Flagship callout: 2027 pension changes */}
          <div className="mt-6 sm:mt-8 relative overflow-hidden bg-[#1e293b] p-6 sm:p-10">
            <div className="section-label mb-4">April 2027 pension changes</div>
            <h2 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
              Pensions are joining inheritance tax in April 2027
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              From 6 April 2027, most unused pension funds and death benefits are due to count as part of your estate for inheritance tax. For many families this is the single biggest change to estate planning in a generation, and plenty of people who have never thought about inheritance tax will be drawn in. Our 2027 pension exposure checker shows whether your family is likely to be affected and by roughly how much.
            </p>
            <Link
              href={toolPath("pensions-iht-2027-estimator")}
              className={`${btnPrimary} mt-6 inline-flex text-base px-6 py-3`}
            >
              Check your 2027 exposure
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <Users className="h-8 w-8 text-orange-600" strokeWidth={1.75} aria-hidden />
            <h2 className="mt-4 text-xl font-bold text-neutral-900">Specialist help, when you want it</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
              We are an information service, not a law firm. If your situation needs professional hands, we can connect you with vetted specialist firms for wills, probate and estate planning. You only hear from anyone if you send us an enquiry, and you can tell us to stop at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator grid */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Start with a number</div>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              Most people arrive here with one question: how much?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              How much tax, how much will probate cost, how much can we pass on tax free. Pick the calculator that matches your question. Each takes a few minutes, needs no sign-up, and explains its result in plain English.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className={`group block border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-orange-500 hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-700 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{tool.oneLiner}</p>
                <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm">
                  Open calculator
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/calculators" className={btnSecondary}>
              View all calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-orange-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Every family&apos;s situation is different
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              We help people in all circumstances
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-300">
              Probate and inheritance tax work the same way in principle, but the reliefs, allowances and pitfalls differ by circumstance. We know the specifics.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {tradeTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className="group block bg-white/5 border border-white/10 p-4 sm:p-5 transition-all hover:bg-orange-500/20 hover:border-orange-400/40"
              >
                <span className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                  {type.title}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-neutral-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              See all situations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mid-page image break */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/4098365/pexels-photo-4098365.jpeg?auto=compress&cs=tinysrgb&w=2000&q=85"
          alt="Hands reviewing legal documents at a table"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1e293b]/82" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Built on official sources, not sales material
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-orange-200">
              Built on official sources: gov.uk, HMRC and HMCTS. Figures current for the 2026/27 tax year. {siteConfig.name} is a trading name of Ashfield Trading Ltd. We provide information and tools, not legal or financial advice.
            </p>
          </div>
        </div>
      </section>

      {/* Closing lead-capture CTA */}
      <section className="relative overflow-hidden bg-[#1e293b]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Want a specialist to take it from here?</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Some estates need more than a calculator
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-neutral-200">
                Some estates are simple. Many are not: blended families, business assets, property abroad, pensions after April 2027. If you would like a professional to look at your situation, tell us a little about it and we will connect you with a vetted specialist firm. It costs you nothing to ask, and there is no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "You choose if and when", sub: "No pressure, no cold calls" },
                  { title: "Vetted specialist firms only", sub: "Matched to wills, probate or estate planning as needed" },
                  { title: "Only if you ask us", sub: "Nothing is passed on unless you send an enquiry, and you can object at any time" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-neutral-200">
                    <div className="h-12 w-12 flex items-center justify-center bg-orange-500 text-white font-bold text-xl flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-neutral-400">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">Get connected with a specialist</h3>
              <LeadForm submitLabel="Get connected with a specialist" />
              <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                By sending your details you agree to us using them to respond to your enquiry and to contact you about it. Full details in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-orange-700 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-orange-500 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">Probate guides</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Practical probate and inheritance tax guides.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Plain English articles on probate applications, estate valuation, inheritance tax and wills, written from gov.uk, HMRC and HMCTS source material.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-semibold text-sm sm:text-base transition-colors"
              >
                How we can help
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
