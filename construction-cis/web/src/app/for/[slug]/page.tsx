import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import {
  btnPrimary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { tradeTypes, getTradeType } from "@/data/trade-types";
import { buildFaqJsonLd } from "@/lib/schema";
import { NextStepOffer } from "@/components/intent/NextStepOffer";

export function generateStaticParams() {
  return tradeTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = getTradeType(slug);
  if (!type) return {};
  return {
    // metaTitle already carries its own descriptor suffix; bypass the layout
    // brand template to avoid a double suffix / over-length title.
    title: { absolute: type.metaTitle },
    description: type.metaDescription,
  };
}

export default async function TradeTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getTradeType(slug);
  if (!type) notFound();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/for"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider hover:text-orange-400 transition-colors mb-6 ${focusRing}`}
          >
            <ArrowRight className="h-3 w-3 rotate-180" />
            All trades
          </Link>
          <div className="section-label mb-6">CIS accounting</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {type.headline}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            {type.intro}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/contact" className={`${btnPrimary} text-base px-8 py-3.5 text-center`}>
              Book a free call
            </Link>
            <Link
              href="/cis-refund"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
            >
              CIS refund service
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-orange-600 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {type.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-orange-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">The specific challenges</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            What makes {type.title.toLowerCase()} accounting different.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {type.challenges.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">How we help</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            What we do for {type.title.toLowerCase()}.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {type.howWeHelp.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-orange-500 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-semibold text-sm sm:text-base transition-colors">
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {type.testimonial && (
        <section className="bg-neutral-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <div className="max-w-3xl mx-auto">
              <figure className="relative bg-white border border-neutral-200 p-8 sm:p-10 shadow-sm">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-orange-100" aria-hidden />
                <blockquote className="text-lg sm:text-xl leading-relaxed text-neutral-800 font-medium pr-10">
                  &ldquo;{type.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-neutral-100 text-sm font-semibold text-neutral-500">
                  {type.testimonial.attribution}
                </figcaption>
              </figure>
              <p className="mt-4 text-center text-xs text-neutral-400">
                Composite snapshot based on client patterns. Name and figures anonymised. The tax mechanics are real.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {type.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(type.faqs) }}
        />
      )}
      {type.faqs.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">
                Questions from {type.title.toLowerCase()}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {type.faqs.map((faq) => (
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
      )}

      {/* Personalised next-step card (treatment arm only; control sees nothing here) */}
      <div className="bg-white px-4 sm:px-6 lg:px-8">
        <div className={siteContainerLg}>
          <NextStepOffer />
        </div>
      </div>

      {/* Contact CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Talk to a specialist {type.title.toLowerCase()} accountant
              </h2>
              <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">
                Book a free call. We will talk through your CIS position, your deduction history and whether there is anything worth changing. No hard sell, no obligation.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Specialist in CIS and construction accounting, not a generalist practice",
                  "24-hour response guarantee",
                  "Fixed fees, quoted before we start",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-neutral-300">
                    <div className="h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs font-bold flex-shrink-0">✓</div>
                    <span className="text-sm sm:text-base">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:mb-6">Book your free call</h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>

      {/* Other trade types */}
      <section className="bg-[#fafaf7] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Other trades we work with
          </p>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {tradeTypes
              .filter((t) => t.slug !== slug)
              .slice(0, 5)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/for/${t.slug}`}
                  className="group block border border-neutral-200 bg-white p-4 transition-all hover:border-orange-500 hover:shadow-sm"
                >
                  <span className="text-sm font-semibold text-neutral-800 group-hover:text-orange-700 transition-colors">
                    {t.title}
                  </span>
                  <ArrowRight className="mt-2 h-3.5 w-3.5 text-neutral-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
          </div>
          <div className="mt-5">
            <Link
              href="/for"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:text-orange-800 transition-colors"
            >
              See all trades we work with
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
