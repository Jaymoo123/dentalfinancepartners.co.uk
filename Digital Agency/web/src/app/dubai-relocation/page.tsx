import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Compass,
  Globe2,
  Home,
  PiggyBank,
  Plane,
  Receipt,
  Wallet,
} from "lucide-react";
import { siteContainerLg, btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "UK Agency Founder Relocating to Dubai? | Specialist Guidance",
  description:
    "Specialist UK and UAE financial guidance for agency founders relocating to Dubai. Statutory residence test, UAE entity setup, cross-border tax, agency operations. ICAEW qualified.",
  alternates: { canonical: `${siteConfig.url}/dubai-relocation` },
  openGraph: {
    title: "UK Agency Founder Relocating to Dubai?",
    description: "Specialist UK + UAE financial guidance for agency founders relocating to Dubai.",
    url: `${siteConfig.url}/dubai-relocation`,
    type: "website",
  },
};

const subcategories = [
  {
    icon: Plane,
    title: "UK tax on leaving",
    body: "Statutory residence test, split-year treatment, deemed domicile, exit charges. When does HMRC stop being interested in you?",
    href: "/blog/international-agencies",
  },
  {
    icon: Building2,
    title: "Dubai entity & setup",
    body: "Mainland vs free zone, IFZA vs JAFZA vs DMCC, golden visa eligibility, share capital, costs and timelines.",
    href: "/blog/international-agencies",
  },
  {
    icon: Receipt,
    title: "UAE tax (corporate + VAT)",
    body: "9% corporate tax, small business relief, free zone qualifying income, VAT thresholds, designated zone implications.",
    href: "/blog/international-agencies",
  },
  {
    icon: Globe2,
    title: "Cross-border operations",
    body: "Running a UK agency from Dubai, invoicing UK clients from UAE, VAT on cross-border services, IR35 from abroad.",
    href: "/blog/international-agencies",
  },
  {
    icon: PiggyBank,
    title: "Personal finance",
    body: "UK pensions when non-resident, ISAs after leaving, selling UK property, dividends from a UK company while in Dubai.",
    href: "/blog/international-agencies",
  },
  {
    icon: Home,
    title: "Practical relocation",
    body: "Cost of living, schools, healthcare, property purchase, banking. The non-tax decisions that still affect your finances.",
    href: "/blog/international-agencies",
  },
  {
    icon: Wallet,
    title: "Agency-specific migration",
    body: "Transferring your UK agency, dual-entity structures, where your IP sits, what happens to your team, when to sell vs hold.",
    href: "/blog/international-agencies",
  },
];

const stages = [
  {
    n: "01",
    title: "Pre-move planning",
    body: "12-18 months before. Tax planning, entity structure, asset disposals, pension contributions. The decisions that set up the next 5 years.",
  },
  {
    n: "02",
    title: "The move itself",
    body: "Statutory residence test timing, split-year treatment, registering in UAE, banking, golden visa. The mechanics of changing residence.",
  },
  {
    n: "03",
    title: "Post-move operations",
    body: "Running your UK agency from Dubai, invoicing, VAT, contractor management, ongoing UK tax position, UK property + investments.",
  },
];

const faqs = [
  {
    q: "Why use a UK accountant rather than a Dubai one?",
    a: "Because most of the financial decisions that make or break a Dubai relocation for a UK agency founder are UK-side: statutory residence test, exit charges, what happens to your UK limited company, how UK dividends are taxed when you're non-resident, UK pension and ISA treatment. We handle the UK side and partner with Dubai-side advisors for UAE entity setup. You get one coordinated plan rather than two disconnected ones.",
  },
  {
    q: "When should I start planning?",
    a: "12-18 months before the move ideally. Statutory residence test timing, asset disposal sequencing, exit planning and entity restructuring all need lead time. We can still help if you're moving in 3 months, but the optimal tax positions usually require some forward planning.",
  },
  {
    q: "Do I have to close my UK limited company?",
    a: "No. Many agency founders keep their UK Ltd running while based in Dubai. That has specific tax implications (UK corporation tax still applies to UK-source income, dividend tax treatment changes for non-residents, etc.) but can be the right structure. We model it both ways and recommend based on your specific position.",
  },
  {
    q: "Will I save tax overall?",
    a: "Usually yes, sometimes significantly. Dubai has no personal income tax. UAE corporate tax is 9% (with reliefs that can bring it lower for small companies and qualifying free zone income). But you need to factor in the cost of becoming UK non-resident properly, UAE setup and licence costs, and the UK tax that may still apply to UK-source income. Net savings depend on your situation. We model it in pounds.",
  },
  {
    q: "Can you advise on UAE-side tax?",
    a: "We work to UK ICAEW standards and our regulated advice is UK-focused. For UAE corporate tax, VAT and licensing we partner with Dubai-based specialists who handle that side. You get a coordinated plan with one point of contact (us) and specialist UAE input where the rules require it.",
  },
];

const stats = [
  { value: "0%", label: "UAE personal income tax" },
  { value: "9%", label: "UAE corporate tax" },
  { value: "183", label: "SRT day-count threshold" },
  { value: "12-18mo", label: "Recommended planning lead time" },
];

export default function DubaiRelocationPage() {
  const service = buildService({
    name: "UK to Dubai Relocation Financial Planning for Agency Founders",
    description:
      "Specialist UK and UAE financial planning for agency founders relocating to Dubai. Statutory residence test, UAE entity setup, dual-jurisdiction tax, agency operations across UK and UAE.",
    url: "/dubai-relocation",
    serviceType: "Cross-border tax and financial advisory",
    areaServed: ["United Kingdom", "United Arab Emirates"],
  });
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={faqPage ? [service, faqPage] : [service]} />

      <section className="relative h-[500px] sm:h-[560px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2000&q=85"
          alt="Dubai skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-end pb-12 sm:pb-16`}>
          <div className="max-w-3xl">
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "Dubai Relocation" },
              ]}
            />
            <div className="mt-6 inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Compass className="h-3.5 w-3.5" />
              UK + UAE specialist
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              UK agency founder <span className="text-indigo-400">relocating to Dubai?</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-2xl">
              Specialist UK and UAE financial guidance for agency founders making the move. From statutory residence test to running a UK Ltd from Dubai. ICAEW qualified.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
              <Link href="#consultation" className={`${btnPrimary} text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4`}>
                Book a relocation consultation
              </Link>
              <Link href="/blog/international-agencies" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4`}>
                Read the articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-700 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{s.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What we cover</h2>
              <p className="mt-4 text-lg text-slate-600">
                Seven areas where a UK agency founder relocating to Dubai needs joined-up, specialist advice. Generalist accountants handle one or two of these. We handle all seven.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="group block bg-slate-50 border border-slate-200 p-6 sm:p-7 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </Link>
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
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">When in the journey do we help?</h2>
              <p className="mt-4 text-lg text-slate-600">
                Pre-move planning, the move itself, and post-move operations. Each stage has different financial decisions and different lead times.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {stages.map((s) => (
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

      <section id="consultation" className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-indigo-50 border-2 border-indigo-600/20 p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Free 90-min relocation consultation
                </div>
                <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">
                  Book your relocation consultation
                </h2>
                <p className="mt-3 text-base sm:text-lg text-slate-700">
                  90 minutes with an ICAEW qualified accountant. We map your UK exit position, your UAE setup options and your agency's structure. You leave with a written plan. No obligation.
                </p>
              </div>
              <LeadForm redirectOnSuccess={false} submitLabel="Book my relocation consultation" />
              <p className="mt-4 text-xs text-slate-500 text-center">
                In the message field, please mention your target move date and your current agency size so we can prepare properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-center mb-8">
              Frequently asked questions
            </h2>
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

      <section className="bg-slate-900 py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto text-center">
            <BadgeCheck className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Want the full picture first?
            </h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
              We are building a deep library of articles on every facet of UK → Dubai relocation for agency founders. Read first, talk later.
            </p>
            <Link
              href="/blog/international-agencies"
              className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 font-bold transition-colors"
            >
              Browse the articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
