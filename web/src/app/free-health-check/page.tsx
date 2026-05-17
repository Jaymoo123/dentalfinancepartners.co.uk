import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, FileSearch, MessageSquare, TrendingUp } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { HealthCheckWizard } from "@/components/health-check/Wizard";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Free Agency Finance Health Check | ${siteConfig.name}`,
  description:
    "Free, instant agency finance health check for UK founders. Answer 12 questions, get a personalised PDF report flagging tax, structure, VAT, R&D and exit opportunities. ICAEW-quality framework.",
  alternates: { canonical: `${siteConfig.url}/free-health-check` },
  openGraph: {
    title: "Free Agency Finance Health Check — instant personalised PDF",
    description:
      "Two minutes in, a personalised PDF report by email. We run your answers against 20+ checks across extraction, R&D, VAT, IR35, exit and international.",
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
    title: "VAT scheme & structure review",
    body: "Are you on the right VAT scheme and entity structure for your business model? We flag what we'd change and what it's worth in pounds.",
  },
  {
    icon: MessageSquare,
    title: "Exit, IR35 & international flags",
    body: "BADR qualifying period, IR35 exposure on contractors, US withholding tax, UAE relocation sequencing — anything material to your specific setup.",
  },
];

const steps = [
  {
    n: "01",
    title: "Answer 12 questions",
    body: "Multi-step wizard. Two minutes. Anonymised — we ask for a band, not your actual VAT number.",
  },
  {
    n: "02",
    title: "Instant personalised PDF",
    body: "Your answers run through 20+ checks across extraction, R&D, VAT, IR35, international and exit. Each opportunity has indicative impact and the action to take.",
  },
  {
    n: "03",
    title: "Optional 60-minute call",
    body: "Want to put real numbers on each opportunity? Book a call with an ICAEW qualified accountant. No obligation, no sales drip.",
  },
];

const faqs = [
  {
    q: "Is this actually free?",
    a: "Yes. No card, no follow-up sales drip. The PDF is generated from your inputs and lands in your inbox in a couple of minutes. We do this because most agency founders we speak to have at least 2–3 tax inefficiencies that surface in a 12-question scan — we'd rather demonstrate the analysis than send a brochure.",
  },
  {
    q: "How accurate is the report?",
    a: "Directional. The rules engine uses 2025/26 UK tax figures and flags opportunities that almost always need a closer look. Indicative impact figures are based on typical agency profiles. The PDF is explicit that it's editorial, not personalised advice — for decisions specific to your agency, book a call.",
  },
  {
    q: "What do you do with my data?",
    a: "We store your submission to generate the report and email it to you. We use it to follow up if your top concern needs an answer we can give. We don't sell it, share it, or send retargeting drips. Unsubscribe from any email and we stop. Full details in the privacy policy.",
  },
  {
    q: "Do you really not push for a sale?",
    a: "Correct. The PDF includes a soft CTA to book a call if you want to dig deeper. We don't auto-enroll you in a sales sequence. About half the agencies we eventually work with came back to us months later — the analysis is the offer, not the appointment.",
  },
];

export default function FreeHealthCheckPage() {
  const service = buildService({
    name: "Free Agency Finance Health Check",
    description:
      "Free instant agency finance health check for UK founders. 12-question wizard generates a personalised PDF report flagging tax, structure, VAT, R&D, IR35, exit and international opportunities. All figures use 2025/26 UK rates.",
    url: "/free-health-check",
    serviceType: "Agency finance health check",
    areaServed: "United Kingdom",
  });
  // Free offer — extend the Service with an Offer
  (service as Record<string, unknown>).offers = {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  };
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={faqPage ? [service, faqPage] : [service]} />

      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 py-16 sm:py-20 overflow-hidden">
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
              Free · Instant PDF · 2 minutes
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Get a personalised tax health check for your agency in 2 minutes.
            </h1>
            <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-slate-200 max-w-3xl">
              Answer 12 questions. Receive a personalised PDF by email. We flag
              tax, structure, R&amp;D, IR35, VAT, exit and international
              opportunities — each one priced and actionable.
            </p>
          </div>
        </div>
      </section>

      <section id="wizard" className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <HealthCheckWizard />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What we check</h2>
              <p className="mt-4 text-lg text-slate-600">
                20+ checks across extraction, structure, VAT, R&amp;D, IR35, exit and international.
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

      <section className="bg-white py-16 sm:py-20">
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
              If you&rsquo;d rather talk before answering the wizard, that&rsquo;s fine too.
            </p>
            <Link href="/contact" className={`${btnPrimary} mt-6`}>
              Book a 30-minute call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
