import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, FileSearch, MessageSquare, TrendingUp } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: `Free Agency Finance Health Check | ${siteConfig.name}`,
  description:
    "Free 60-minute financial health check for UK agency founders. ICAEW qualified review of your salary structure, VAT position, R&D eligibility and tax efficiency. No obligation.",
  alternates: { canonical: `${siteConfig.url}/free-health-check` },
  openGraph: {
    title: "Free Agency Finance Health Check",
    description:
      "Free 60-minute review of your agency's tax and finance position by ICAEW qualified accountants. No obligation.",
    url: `${siteConfig.url}/free-health-check`,
    type: "website",
  },
};

const includes = [
  {
    icon: ClipboardCheck,
    title: "Salary & dividend structure review",
    body: "We model your current extraction strategy against the optimal split for your profit level, identify any tax leakage, and quantify potential savings.",
  },
  {
    icon: FileSearch,
    title: "R&D tax credit eligibility check",
    body: "If you're a digital, tech, AI or creative agency we'll assess whether any of your work qualifies for R&D credits. Most agencies leave money on the table here.",
  },
  {
    icon: TrendingUp,
    title: "VAT scheme & registration review",
    body: "Are you on the right VAT scheme for your business model? Flat rate, cash accounting, standard — each has different implications. We'll tell you what we'd recommend.",
  },
  {
    icon: MessageSquare,
    title: "Personalised next-step plan",
    body: "You leave with a clear, written summary of what you should do next. Whether you become a client or not — no obligation, no follow-up sales calls.",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us about your agency",
    body: "Complete a short form below. Takes 2 minutes. We'll be in touch within 24 hours to schedule your call.",
  },
  {
    n: "02",
    title: "60-minute video review",
    body: "We review your current setup with an ICAEW qualified accountant. Salary, dividends, VAT, R&D, structure, cash flow. Bring questions.",
  },
  {
    n: "03",
    title: "Written summary delivered",
    body: "Within 48 hours of the call you receive a written summary of what we'd recommend. Yours to keep, whether you become a client or not.",
  },
];

const faqs = [
  {
    q: "Is this actually free?",
    a: "Yes. No card required, no follow-up sales calls, no fees of any kind. We do this because most agency founders we meet have at least 2-3 tax inefficiencies that we can spot in 60 minutes. We'd rather demonstrate our value upfront than send a sales deck.",
  },
  {
    q: "What does an ICAEW qualified accountant actually do on the call?",
    a: "We review your current limited company structure, salary and dividend split, VAT position, expense practices, and any R&D activity. We flag tax efficiencies you're missing and give you specific numbers on what they're worth. The call is led by a senior ICAEW chartered accountant, not a sales rep.",
  },
  {
    q: "Do I need to be an existing client or share any sensitive data?",
    a: "No. You don't need to share access to Xero, your accounts, or anything sensitive before the call. We'll ask you 5-6 specific questions during the conversation that let us assess the structure. If you choose to become a client afterwards, we'll handle the data transfer properly with authorisation codes.",
  },
  {
    q: "Will you try to sell me?",
    a: "No follow-up sales calls. We'll send the written summary and that's it. If you want to talk further, you reach out to us. Most founders end up booking a paid engagement because the recommendations have specific savings attached — but the offer of help isn't conditional on signing up.",
  },
];

export default function FreeHealthCheckPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Agency Finance Health Check",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: "Accountancy consultation",
    description: "Free 60-minute financial health check for UK agency founders. ICAEW qualified accountants review salary structure, VAT position, R&D eligibility and tax efficiency. No obligation.",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqJsonLd]) }} />

      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Free Health Check" },
            ]}
          />
          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Free · No obligation · 60 minutes
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Free Agency Finance Health Check
            </h1>
            <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-slate-200 max-w-3xl">
              60 minutes with an ICAEW qualified accountant. We review your salary structure, VAT, R&D eligibility and tax position — then send you a written summary. No obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What's included</h2>
              <p className="mt-4 text-lg text-slate-600">
                Four checks that typically surface £3,000-£15,000 in annual tax savings for the agency founders we speak to.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {includes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-slate-50 border border-slate-200 p-6 sm:p-8 hover:border-indigo-600 transition-all">
                    <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="bg-white border-l-4 border-indigo-600 p-6 sm:p-7">
                  <div className="font-mono text-3xl font-bold text-indigo-600">{s.n}</div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="claim" className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-indigo-50 border-2 border-indigo-600/20 p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">Claim your free health check</h2>
                <p className="mt-3 text-base sm:text-lg text-slate-700">
                  Tell us about your agency. We'll be in touch within 24 hours to schedule.
                </p>
              </div>
              <LeadForm redirectOnSuccess={false} submitLabel="Claim my free health check" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-8 text-center">Common questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="bg-white border-l-4 border-slate-300 hover:border-indigo-600 transition-all p-6">
                  <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
                  <p className="mt-3 text-base text-slate-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-center">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Prefer to chat first?
            </h2>
            <p className="mt-4 text-slate-300">
              If you'd rather have an informal initial chat before committing to the full health check, that's fine too.
            </p>
            <Link href="/contact" className={`${btnPrimary} mt-6`}>
              Just have a chat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
