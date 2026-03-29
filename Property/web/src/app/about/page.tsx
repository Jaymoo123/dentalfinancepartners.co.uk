import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Property Accountants UK | 100+ Landlords Served",
  description:
    "Property-only accounting firm serving UK landlords since 2020. 100+ buy-to-let investors trust us for Section 24, MTD, incorporation, and portfolio management. No generalists.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About Property Accountants UK",
    description: "Specialist property accountants serving 100+ UK landlords. Property-only focus since 2020.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

const whyWeExist = [
  {
    title: "Property income is genuinely complex",
    body: "Section 24 restrictions, MTD quarterly reporting, incorporation decisions, portfolio-level cash flow — the picture is rarely straightforward. A generalist accountant will work with what you give them, but that's not the same as understanding how a property portfolio actually operates.",
  },
  {
    title: "Most landlords are financially underserved",
    body: "Compliance is handled, but strategic advice is missing. Should you incorporate? When? What's the upfront cost vs. long-term saving? Which properties are actually profitable? Most accountants can't answer these questions off the top of their head because they don't see enough landlord clients.",
  },
  {
    title: "We only work with property investors",
    body: "100% of our clients are landlords or property developers. That focus means we understand the tax specifics, the cash flow realities, and the strategic decisions that property investors face. It also means the conversation is more efficient — you don't have to explain what Section 24 is.",
  },
];

const howWeWork = [
  {
    icon: "🏢",
    title: "Property-only expertise",
    body: "We only work with landlords and property investors. Every client is a buy-to-let owner or developer. That focus gives us depth of experience that generalist accountants can't match.",
  },
  {
    icon: "📊",
    title: "Proactive advice, not just compliance",
    body: "We don't wait for you to ask. If incorporation would save you money, we'll model it. If MTD is approaching, we'll prepare you early. If a property is underperforming, we'll flag it.",
  },
  {
    icon: "💬",
    title: "Transparent and accessible",
    body: "Fixed fees with no surprises. You speak to the same accountant every time. Plain English explanations, not accounting jargon. We're here when you need us.",
  },
];

const stats = [
  { value: "100+", label: "Landlords served" },
  { value: "24hr", label: "Response time" },
  { value: "£2.4M+", label: "Tax savings identified" },
  { value: "100%", label: "Property-only focus" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=85"
          alt="UK property skyline"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              About {siteConfig.name}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-white">
              Specialist property accountants working exclusively with UK landlords and buy-to-let investors.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald-600 py-8 sm:py-12">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-emerald-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why we exist</h2>
            <div className="mt-10 space-y-6">
              {whyWeExist.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-slate-50 p-8">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-10">How we work</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {howWeWork.map((item) => (
                <div key={item.title} className="bg-white border-2 border-slate-200 p-6 text-center hover:border-emerald-600 transition-all">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">What makes us different</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-slate-300 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">No generalists</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  We don&apos;t serve restaurants, retailers, or consultants. 100% of our clients are landlords or property developers. That means every conversation is with someone who understands property accounting deeply.
                </p>
              </div>
              <div className="border-l-4 border-slate-300 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">Fixed fees, no surprises</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  You know what you&apos;re paying upfront. No hourly billing, no surprise invoices. If your situation changes mid-year, we&apos;ll tell you before any additional fees apply.
                </p>
              </div>
              <div className="border-l-4 border-slate-300 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">Same accountant every time</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  You&apos;re not passed around a team. You work with one qualified accountant who knows your portfolio, your goals, and your tax position. They&apos;re available when you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <CTASection
            title="Get your property tax sorted"
            description="Book a free consultation to discuss your situation. We'll give you clear recommendations, no hard sell."
          />
        </div>
      </section>
    </>
  );
}
