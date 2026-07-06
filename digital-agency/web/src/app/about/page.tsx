import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Crosshair,
  Eye,
  Globe2,
  Headset,
  LineChart,
  MessageCircle,
  Target,
  UserCheck,
  Wallet,
  Workflow,
} from "lucide-react";
import { siteContainerLg, btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd, buildOrganization } from "@/lib/schema";

export const metadata: Metadata = {
  title: `About ${siteConfig.name} | Specialist Agency Accountants for Founders`,
  description:
    "Agency Founder Finance works exclusively with agency founders across the UK and UAE. Agency-only specialist accountants with fixed fees and plain-English advice.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: "Specialist agency accountants for founders. Agency-only focus across the UK and UAE.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.name}`,
    description: "Specialist agency accountants for founders. Agency-only focus across the UK and UAE.",
  },
};

const whyWeExist = [
  {
    title: "Agency finance is genuinely different",
    body: "Retainer revenue, utilisation rates, contractor IR35 exposure, salary and dividend extraction, R&D credits for tech-enabled work, exit multiples driven by EBITDA. Agency finance has a specific set of problems that a generalist accountant handles once every few years. We handle them every day.",
  },
  {
    title: "Most agency founders are financially underserved",
    body: "The accounts get filed on time, but the strategic advice is missing. Should you incorporate? When? Is your salary and dividend split optimal? Could you claim R&D credits? What is your agency actually worth on a sale? Most accountants cannot answer these questions quickly because they do not see enough agency clients. We can, because we only work with agency founders.",
  },
  {
    title: "Pattern recognition you cannot get one client at a time",
    body: "Because we see the same decisions play out across agencies, we can tell you how similar founders structured a first hire, priced a retainer or timed an exit, and what happened next. You get the benefit of those patterns rather than theory, without paying for anyone's learning curve on your account.",
  },
  {
    title: "We only work with agency founders",
    body: "Every client we work with runs or owns an agency. Marketing, digital, creative, PR, web, recruitment, advertising and everything in between. That focus means the conversation is faster, the advice is more relevant, and we are not learning your business model from scratch on your time.",
  },
];

const howWeWork = [
  {
    icon: Target,
    title: "Agency-only expertise",
    body: "Every client we work with is an agency founder. That gives us depth of experience across IR35, salary extraction, R&D claims and exit planning that a mixed-practice firm simply cannot match.",
  },
  {
    icon: LineChart,
    title: "Proactive advice, not just compliance",
    body: "We do not wait for you to ask. If your salary split could be more efficient, we model it. If R&D applies, we identify it. If your exit timeline should be shaping your structure now, we tell you before year end.",
  },
  {
    icon: Headset,
    title: "Transparent and accessible",
    body: "Fixed fees with no surprises. You speak to the same specialist accountant every time. Plain English explanations, not jargon. We are here when you need us, not just at year end.",
  },
  {
    icon: Globe2,
    title: "UK and UAE coverage",
    body: "We advise agency founders operating across the UK and UAE, including those running cross-border structures, considering UAE free zone entities, or planning a tax-efficient relocation. International agency finance is a specialist area and we have the experience to advise on it properly.",
  },
];

const differentiators = [
  {
    icon: Crosshair,
    title: "Pure agency focus",
    body: "Every client is an agency founder. Every conversation is faster, more relevant, and with someone who understands your business model from day one without needing it explained.",
  },
  {
    icon: BadgeCheck,
    title: "Plain English, not jargon",
    body: "Tax is complicated. We make it clear. Every piece of advice comes with an explanation of what it means in pounds for your agency. No technical jargon, no filing for the sake of it, just clear guidance that helps you make better decisions.",
  },
  {
    icon: Wallet,
    title: "Fixed fees, no surprises",
    body: "You know what you are paying upfront. No hourly billing, no surprise invoices. If your situation changes mid-year, we will tell you before any additional fees apply.",
  },
  {
    icon: UserCheck,
    title: "Same accountant every time",
    body: "You are not passed around a team. You work with one specialist accountant who knows your agency, your goals, and your tax position. They are available when you need them, not just at year end.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery call",
    body: "A 30-minute call to understand your agency, your numbers, and where you want to be in 18 months. No pitch, no commitment.",
  },
  {
    step: "02",
    title: "Fixed-fee proposal",
    body: "Within 48 hours we send a clear, fixed-fee proposal covering exactly what is included and what is not. You decide whether to proceed.",
  },
  {
    step: "03",
    title: "Onboarding & handover",
    body: "We handle the move from your previous accountant. Authorisation codes, software access, historical accounts. Typical onboarding completes in 2-3 weeks.",
  },
  {
    step: "04",
    title: "Ongoing partnership",
    body: "Monthly check-ins, quarterly management accounts, year-end accounts and tax filing, plus advice whenever you need it. One named accountant, always.",
  },
];

const agencyTypes = [
  { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
  { label: "Digital agencies", href: "/agencies/digital-agencies" },
  { label: "Creative agencies", href: "/agencies/creative-agencies" },
  { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
  { label: "PR agencies", href: "/agencies/pr-agencies" },
  { label: "Web design agencies", href: "/agencies/web-design-agencies" },
  { label: "SEO agencies", href: "/agencies/seo-agencies" },
  { label: "Recruitment agencies", href: "/agencies/recruitment-agencies" },
];

const stats = [
  { value: "Agency-only", label: "Exclusive specialism" },
  { value: "24hr", label: "Response guarantee" },
  { value: "Fixed fees", label: "No surprise billing" },
  { value: "UK + UAE", label: "Territories covered" },
];

const trustBadges = [
  "Agency specialists",
  "Agency-only focus",
  "24hr response",
  "Fixed fees",
  "UK & UAE founders",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildOrganization()} />
      {/* Hero */}
      <section className="relative h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&q=85"
          alt="Agency team at work"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/55" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-end pb-12 sm:pb-16`}>
          <div className="max-w-3xl">
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "About" },
              ]}
            />
            <div className="mt-6 inline-block bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
              About {siteConfig.name}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              The accountant <span className="text-indigo-400">built for agencies.</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-slate-200 max-w-2xl">
              Specialist accountants working exclusively with agency founders across the UK and UAE.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-indigo-700 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                Our story
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Why we exist</h2>
              <p className="mt-4 text-lg text-slate-600">
                The four reasons we built Agency Founder Finance the way we did.
              </p>
            </div>
            <div className="space-y-5">
              {whyWeExist.map((item, idx) => (
                <div
                  key={item.title}
                  className="group flex gap-5 sm:gap-6 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-600 hover:shadow-md transition-all p-6 sm:p-8"
                >
                  <div className="hidden sm:flex flex-shrink-0 h-12 w-12 items-center justify-center bg-indigo-600 text-white font-mono font-bold text-lg">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-700">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                How we work
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Four things we do differently</h2>
              <p className="mt-4 text-lg text-slate-600">
                Specialist expertise, proactive advice, transparent service, international reach.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {howWeWork.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white border border-slate-200 p-6 sm:p-8 hover:border-indigo-600 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-center h-14 w-14 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg group-hover:shadow-xl transition-all">
                      <Icon className="h-7 w-7 text-white" strokeWidth={2} />
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

      {/* Process timeline */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                <Workflow className="h-3.5 w-3.5" /> The process
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Working with us</h2>
              <p className="mt-4 text-lg text-slate-600">
                From first call to ongoing partnership in three weeks, with no jargon and no surprises.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {process.map((step) => (
                <div key={step.step} className="relative bg-slate-50 border-l-4 border-indigo-600 p-6 sm:p-7">
                  <div className="font-mono text-3xl font-bold text-indigo-600">{step.step}</div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
                What sets us apart
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Why founders choose us</h2>
              <p className="mt-4 text-lg text-slate-300">
                Specialist, responsive, transparent, consistent. The four things that matter when you trust someone with your agency's finances.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {differentiators.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white/5 border border-white/10 p-6 sm:p-8 hover:bg-indigo-600/10 hover:border-indigo-400/40 transition-all"
                  >
                    <div className="flex items-center justify-center h-12 w-12 bg-indigo-500/20 border border-indigo-400/30">
                      <Icon className="h-6 w-6 text-indigo-300" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Agency types */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                <Eye className="h-3.5 w-3.5" /> The agencies we serve
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Every agency type</h2>
              <p className="mt-4 text-lg text-slate-600">
                If you sell expertise and time, we understand your business model.
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
              {agencyTypes.map((type) => (
                <Link
                  key={type.href}
                  href={type.href}
                  className="group block bg-slate-50 border border-slate-200 p-4 sm:p-5 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {type.label}
                  </span>
                  <ArrowRight className="mt-2 h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-slate-500">
              Also: content, email, influencer, performance, ecommerce, automation, AI, software, UX, branding, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Trust badges row */}
      <section className="bg-slate-50 py-10 border-y border-slate-200">
        <div className={siteContainerLg}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                <span className="font-semibold">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=85"
            alt="Modern agency office"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/92" />
        </div>
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
                <MessageCircle className="h-3.5 w-3.5" /> Get started
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to work with an agency specialist?
              </h2>
              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-slate-200">
                Book a free 30-minute call. We will talk through your situation and give you clear, practical recommendations. No jargon, no obligation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/contact" className={`${btnPrimary} text-base sm:text-lg px-8 py-3 sm:px-10 sm:py-4`}>
                  Book a free call
                </Link>
                <Link href="/services" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-8 py-3 sm:px-10 sm:py-4`}>
                  See our services
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Request a callback</h3>
              <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
