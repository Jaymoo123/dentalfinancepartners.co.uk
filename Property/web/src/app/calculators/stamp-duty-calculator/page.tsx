import type { Metadata } from "next";
import Link from "next/link";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator UK 2026: SDLT for Home Buyers and Landlords",
  description:
    "Free UK stamp duty calculator. Work out SDLT on your purchase in England and Northern Ireland, including the 5% second home and buy-to-let surcharge, first-time buyer relief and the 2% non-resident surcharge.",
  alternates: { canonical: `${siteConfig.url}/calculators/stamp-duty-calculator` },
  openGraph: {
    title: "Stamp Duty (SDLT) Calculator for UK Property",
    description: "Work out your stamp duty, including the buy-to-let and second-home surcharge.",
    url: `${siteConfig.url}/calculators/stamp-duty-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stamp Duty (SDLT) Calculator",
    description: "Work out your stamp duty, including the buy-to-let and second-home surcharge.",
  },
};

const faqs = [
  {
    q: "How much stamp duty will I pay in the UK?",
    a: "Stamp duty is charged in slices. On a standard residential purchase in England or Northern Ireland you pay nothing up to £125,000, 2% from £125,001 to £250,000, 5% from £250,001 to £925,000, 10% from £925,001 to £1.5 million and 12% above that. Enter your price in the calculator above for the exact figure.",
  },
  {
    q: "What is the stamp duty surcharge on a second home or buy-to-let?",
    a: "A 5% surcharge applies on top of every band when you buy an additional residential property, so a £350,000 buy-to-let carries £17,500 of surcharge before the standard rates are added.",
  },
  {
    q: "Do first-time buyers pay stamp duty?",
    a: "First-time buyers pay nothing on the first £300,000 and 5% on the portion between £300,000 and £500,000. Above £500,000 the relief is lost entirely and standard rates apply to the whole price.",
  },
  {
    q: "Is SDLT the same as stamp duty?",
    a: "Yes. Stamp Duty Land Tax (SDLT) is the formal name for the tax on property purchases in England and Northern Ireland. Scotland charges LBTT and Wales charges LTT instead, at different rates and thresholds.",
  },
  {
    q: "Do non-UK residents pay extra stamp duty?",
    a: "Yes. A further 2% surcharge applies to buyers who are not UK resident for SDLT purposes, on top of the standard rates and any additional-dwelling surcharge.",
  },
  {
    q: "Can I get a stamp duty refund on a second home?",
    a: "If you paid the additional-dwelling surcharge because you had not yet sold your previous main residence, you can usually reclaim it if you sell that former home within three years. Claims are time limited, so check the dates before you assume the window is open.",
  },
  {
    q: "When is stamp duty due?",
    a: "The return and the payment are both due within 14 days of completion. Your conveyancer normally files it, but the legal responsibility sits with you as the buyer.",
  },
];

export default function StampDutyCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Stamp Duty (SDLT) Calculator",
            description:
              "Work out Stamp Duty Land Tax on a property purchase in England and Northern Ireland, including the 5% additional-dwelling surcharge, first-time-buyer relief and the 2% non-resident surcharge.",
            path: "/calculators/stamp-duty-calculator",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Stamp Duty Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Stamp duty calculator (SDLT) for UK buyers and landlords
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Work out the Stamp Duty Land Tax on a property purchase in England &amp; Northern Ireland,
            including the 5% surcharge on buy-to-lets and second homes.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <StampDutyCalculator variant="page" />
            <CalculatorPageResources slug="stamp-duty-calculator" pageTitle="Stamp Duty (SDLT) Calculator" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              How stamp duty works on a buy-to-let or second home
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Stamp Duty Land Tax (SDLT) is charged on property purchases in England and Northern Ireland.
                The standard residential rates are 0% up to £125,000, 2% on the portion from £125,001 to £250,000,
                5% from £250,001 to £925,000, 10% from £925,001 to £1.5 million, and 12% above £1.5 million. Each
                rate applies only to the slice of the price within that band.
              </p>
              <p>
                If you are buying an <strong>additional residential property</strong> (a buy-to-let or a second
                home), a <strong>5% surcharge</strong> applies on top of every band (raised from 3% on 31 October
                2024). On a £350,000 buy-to-let that surcharge alone adds £17,500.
              </p>
              <p>
                <strong>First-time buyers</strong> pay nothing on the first £300,000 and 5% on the portion from
                £300,000 to £500,000, with no relief once the price exceeds £500,000. <strong>Non-UK residents</strong>{" "}
                pay a further 2% surcharge.
              </p>
              <p>
                Scotland and Wales have their own taxes (LBTT and LTT) with different rates and thresholds, so this
                calculator covers England and Northern Ireland only. The figure is an estimate, because reliefs and edge cases
                (mixed-use, six-or-more dwellings, uninhabitable property) can change it.
              </p>
            </div>

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Buying a property? Get the tax right from the start.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Stamp duty is only the first tax decision. We help landlords and investors structure purchases
                tax-efficiently, checking surcharge-refund routes, weighing incorporation, and planning the ongoing
                tax on the property. Tell us about your purchase for a no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a property tax review" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Stamp duty calculator: common questions
            </h2>
            <dl className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="text-lg font-semibold text-slate-900">{f.q}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-slate-700">{f.a}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
              Related calculators and rate tables
            </h2>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
              <li>
                Buying your first home? Use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/first-time-buyer-stamp-duty-calculator">first-time buyer SDLT calculator</Link>
                .
              </li>
              <li>
                Buying in Scotland? Land and Buildings Transaction Tax applies instead, so use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/lbtt-calculator-scotland">LBTT calculator</Link>
                .
              </li>
              <li>
                Buying in Wales? Land Transaction Tax applies, so use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/ltt-calculator-wales">LTT calculator</Link>
                .
              </li>
              <li>
                Every current threshold, band and surcharge is set out on our{" "}
                <a className="text-emerald-700 underline" href="/property-tax-rates">
                  UK property tax rates page
                </a>
                .
              </li>
              <li>
                Weighing up how the purchase should be owned? Speak to a{" "}
                <a className="text-emerald-700 underline" href="/services/property-accountant">
                  specialist property accountant
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
