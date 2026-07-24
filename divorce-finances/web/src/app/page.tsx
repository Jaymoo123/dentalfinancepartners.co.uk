import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";
import { HeroOffer } from "@/components/intent/HeroOffer";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { tradeTypes } from "@/data/trade-types";

/**
 * Homepage. Real hero, proof and section copy from
 * _staging/divorce-core-copy/homepage.md. Stats and tiers are sourced from
 * config/service-tiers.ts, never hardcoded here.
 */

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Divorce Money, Costs and Settlements Explained` },
  description:
    "Free UK divorce finance calculators and plain-English guides. Court fees, settlements, pensions and the family home, with a route to a vetted specialist when you need one.",
  alternates: { canonical: siteConfig.url },
};

const calculatorCards = [
  {
    title: "Divorce cost calculator",
    body: "What your divorce is likely to cost end to end, by route: doing it yourself online, a fixed-fee service, or a solicitor-led case. Includes the July 2026 court fee increases.",
  },
  {
    title: "Help with Fees checker",
    body: "Court fees can be reduced or waived if your income and savings are below set thresholds. Check in two minutes whether you are likely to qualify before you pay anything.",
  },
  {
    title: "Consent order and clean break cost calculator",
    body: "A financial order is the only thing that makes your settlement binding. See what one costs across the DIY, fixed-fee and solicitor routes.",
  },
  {
    title: "Financial settlement range estimator",
    body: "There is no formula for a divorce settlement, and anyone who gives you a single number is guessing. Our estimator gives you a realistic range based on the factors courts actually weigh, with every assumption stated.",
  },
  {
    title: "Mediation vs solicitor cost comparison",
    body: "Most people do not need a courtroom. Compare what mediation, solicitor negotiation and court proceedings typically cost, including the Family Mediation Voucher.",
  },
];

const handoffSteps = [
  {
    title: "Tell us where you are",
    body: "A short form. Where you are in the process, what is at stake, what kind of help you want.",
  },
  {
    title: "We match you",
    body: "A vetted specialist firm or accredited mediator suited to your situation, not a call centre round robin.",
  },
  {
    title: "They contact you directly",
    body: "Usually within a few working days. You decide whether to go ahead. Walking away costs nothing.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-900 py-16 sm:py-24">
        <div className={siteContainerLg}>
          <div className="section-label mb-6 text-orange-400">
            Divorce and separation finances, England and Wales
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            The money side of divorce, explained without the fog.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Divorce is hard enough without guessing what it will cost or what a fair settlement
            looks like. {siteConfig.name} gives you free calculators built on published court fees,
            plain-English guides checked against official sources, and, when you are ready, an
            introduction to a vetted family law specialist. No sign-up needed for any of the tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <HeroOffer
              fallback={
                <Link href="/calculators" className={btnSecondary}>
                  Try the free calculators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              }
            />
            <Link href="/contact" className={btnPrimary}>
              Speak to a specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Stats (renders nothing while siteStats is empty) */}
      {siteStats.length > 0 && <StatsBar stats={siteStats} />}

      {/* What you can work out here */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Free calculators</div>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Put numbers on it before you commit to anything.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Every tool shows its working and states its assumptions. Court fees are taken from the
            published HMCTS schedule and dated, so you know the figures are current.
          </p>
          <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {calculatorCards.map((card) => (
              <div
                key={card.title}
                className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-lg font-bold text-neutral-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/calculators" className={btnSecondary}>
              See all calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-4">Plain-English guides</div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              The questions everyone asks, answered from official sources.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Who keeps the house. What happens to pensions. Whether you need a solicitor at all.
              How Form E works. What a clean break order actually does. Our guides are written from
              gov.uk, HMCTS and legislation, dated, and updated when the rules change.
            </p>
            <div className="mt-8">
              <Link href="/blog" className={btnSecondary}>
                Browse the guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-orange-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Made for your situation
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              Divorce finances look different depending on what you own and who depends on you.
            </h2>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {tradeTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className="group block bg-white/5 border border-white/10 p-5 sm:p-6 transition-all hover:bg-orange-500/20 hover:border-orange-400/40"
              >
                <span className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  {type.title}
                </span>
                <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-2">
                  {type.intro.split(".")[0]}.
                </p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How the specialist handoff works */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">When you need more than information</div>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            We are not a law firm. We know good ones.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Everything on {siteConfig.name} is general information, and some situations need more
            than that: you cannot agree a settlement, there is a business or a pension worth more
            than the house, or you simply want it handled properly. Tell us about your situation
            and we will introduce you to a vetted family law firm or accredited mediator suited to
            it. Your details are shared only with your consent, we may receive a fee from the firm
            we introduce you to, and you are never under any obligation to proceed.
          </p>
          <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-3">
            {handoffSteps.map((step, idx) => (
              <div key={step.title} className="border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <span className="font-mono text-2xl font-semibold text-orange-500 tabular-nums" aria-hidden>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contact" className={btnPrimary}>
              Get connected
            </Link>
          </div>
        </div>
      </section>

      {/* Service tiers (renders nothing while serviceTiers is empty) */}
      {serviceTiers.length > 0 && (
        <section className="bg-[#fafaf7] py-12 sm:py-16">
          <div className={siteContainerLg}>
            <ServiceTiers tiers={serviceTiers} />
          </div>
        </section>
      )}

      {/* Straight answers about who we are */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Read this before you trust any site about divorce money.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              {siteConfig.name} is a free information service, not a law firm and not a financial
              adviser. Nothing here is legal or financial advice, and our settlement estimator
              gives ranges, never verdicts. If you use a firm we introduce you to, that firm may
              pay us a fee. It never changes what you pay, and it never changes what our guides and
              calculators say. That is the entire business model, stated plainly, because a site
              about money during divorce should not be coy about its own.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-semibold text-sm sm:text-base transition-colors"
              >
                More about how we work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section id="contact" className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Tell us about your situation
            </h2>
            <p className="mt-3 text-neutral-600">
              A specialist will come back to you within one working day. Free, with no obligation.
            </p>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
