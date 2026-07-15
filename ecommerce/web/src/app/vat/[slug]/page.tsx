import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { vatPages, getVatPage } from "@/data/vat";
import { buildFaqJsonLd } from "@/lib/schema";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";

export function generateStaticParams() { return vatPages.map((v) => ({ slug: v.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vp = getVatPage(slug);
  if (!vp) return {};
  return { title: { absolute: vp.metaTitle }, description: vp.metaDescription, alternates: { canonical: `${siteConfig.url}/vat/${slug}` } };
}

export default async function VatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vp = getVatPage(slug);
  if (!vp) notFound();
  return (<>
    <section className="border-b border-neutral-200 bg-[#8a5e1a] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Link href="/vat" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6">VAT Hub</Link>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{vp.headline}.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{vp.intro}</p>
        <div className="mt-10"><Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#8a5e1a] hover:bg-white/90 transition-colors">Get in touch</Link></div>
      </div>
    </section>
    <section className="bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {vp.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col sm:text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
              <div className="mt-1 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key considerations.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {vp.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-[#c9861b] bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {vp.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-[#c9861b] hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    {vp.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(vp.faqs) }} />}
    {vp.faqs.length > 0 && (
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {vp.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#c9861b] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-[#c9861b] transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <h2 className="text-2xl font-bold text-white sm:text-4xl">Speak to an ecommerce VAT specialist.</h2>
        <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">Tell us about your VAT situation and we will reply within 24 hours.</p>
        <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
  </>);
}
