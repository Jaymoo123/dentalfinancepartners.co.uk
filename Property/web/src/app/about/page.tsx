import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Building2, MessageSquare, Check } from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { NumberedReasons } from "@/components/property/NumberedReasons";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StatsCounter } from "@/components/property/StatsCounter";
import { siteStats } from "@/lib/site-stats";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/page-blocks";

export const metadata: Metadata = {
  // Ours (c218d7a6): the brand-suffix dedupe drops `siteConfig.name` from the
  // title, because layout.tsx's title.template already appends it, and the
  // description is shortened to fit the SERP snippet.
  title: `About Us | 100+ Landlords Served`,
  description:
    "Property-only accounting firm serving UK landlords since 2020. 100+ buy-to-let investors trust us for Section 24, MTD and incorporation advice.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: "Specialist property accountants serving 100+ UK landlords. Property-only focus since 2020.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.name}`,
    description: "Specialist property accountants serving 100+ UK landlords. Property-only focus since 2020.",
  },
};

const whyWeExist = [
  {
    title: "Property income is genuinely complex",
    body: "Section 24 restrictions, MTD quarterly reporting, incorporation decisions, portfolio-level cash flow: the picture is rarely straightforward. A generalist accountant will work with what you give them, but that's not the same as understanding how a property portfolio actually operates.",
  },
  {
    title: "Most landlords are financially underserved",
    body: "Compliance is handled, but strategic advice is missing. Should you incorporate? When? What's the upfront cost vs. long-term saving? Which properties are actually profitable? Most accountants can't answer these questions off the top of their head because they don't see enough landlord clients.",
  },
  {
    title: "We only work with property investors",
    body: "100% of our clients are landlords or property developers. That focus means we understand the tax specifics, the cash flow realities, and the strategic decisions that property investors face. It also means the conversation is more efficient: you don't have to explain what Section 24 is.",
  },
];

const howWeWork = [
  {
    icon: Building2,
    title: "Property-only expertise",
    body: "We only work with landlords and property investors. Every client is a buy-to-let owner or developer. That focus gives us depth of experience that generalist accountants can't match.",
  },
  {
    icon: BarChart3,
    title: "Proactive advice, not just compliance",
    body: "We don't wait for you to ask. If incorporation would save you money, we'll model it. If MTD is approaching, we'll prepare you early. If a property is underperforming, we'll flag it.",
  },
  {
    icon: MessageSquare,
    title: "Transparent and accessible",
    body: "Fixed fees with no surprises. You speak to the same accountant every time. Plain English explanations, not accounting jargon. We're here when you need us.",
  },
];

/**
 * The three differentiators, lifted out of the JSX where they were written as
 * three hand-copied card literals. Same copy, now data, so the section can be a
 * list rather than a third identical card grid.
 */
const whatMakesUsDifferent = [
  {
    title: "No generalists",
    body: "We do not serve restaurants, retailers or consultants. 100% of our clients are landlords or property developers, so every conversation is with someone who understands property accounting deeply.",
  },
  {
    title: "Fixed fees, no surprises",
    body: "You know what you are paying upfront. No hourly billing, no surprise invoices. If your situation changes mid-year, we will tell you before any additional fees apply.",
  },
  {
    title: "Same accountant every time",
    body: "You are not passed around a team. You work with one qualified accountant who knows your portfolio, your goals and your tax position, and who is available when you need them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] overflow-hidden bg-slate-900">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
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
            {/* The hero had no ask at all: a reader convinced by the first
                screen had to scroll the whole page to act. Points at the panel
                on this page rather than /contact, so the enquiry is taken where
                the reader already is. */}
            <div className="mt-6 sm:mt-8">
              <Link
                href="#book"
                data-cta="about_hero_book"
                data-cta-placement="hero"
                className={`${btnPrimary} bg-emerald-600 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}
              >
                Book your free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar — matches homepage (cream, counts up on scroll) */}
      <section className="bg-slate-50 py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Why we exist</h2>
          </div>
          {/* Numbered editorial list, not cards. This section and the two
              below it used to be three consecutive 3-up grids of the same
              rounded-slate card, which made a page of distinct arguments read
              as one undifferentiated texture. Each now carries its own device:
              numerals here, icon cards next, a ruled statement list after.

              These are the three legs of an argument, so they are numbered and
              the numeral is the loudest thing in each column. No card ground:
              the copy sits directly on the white. */}
          <NumberedReasons items={whyWeExist} />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How we work</h2>
          </div>
          {/* The one section on this page that is legitimately a card grid:
              three parallel capabilities, each with an icon. Given real card
              treatment (white on the slate band, hairline ring, lifted shadow
              on hover) so it reads as deliberate rather than as the same tile
              repeated a third time. */}
          <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {howWeWork.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl bg-white p-6 ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)] hover:ring-emerald-300 sm:p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <item.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placed HERE, not at the foot, and the position is load-bearing.

          It is a navy band and so is LeadCTAPanel, and LeadCTAPanel's own rule
          is that navy must not land on navy. Sitting third from the end leaves
          the white "What makes us different" list between the two dark fields.
          If the tail of this page is ever reordered, keep something light
          between these quotes and the panel.

          It also earns its place in the argument: the page has just finished
          claiming what the firm is like, and this is the first section where
          somebody other than the firm says so. */}
      <TestimonialsSection description="Anonymised feedback from landlords and investors we have worked with." />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>The difference</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What makes us different</h2>
          </div>
          {/* A ruled statement list, stacked full width rather than a third
              3-up grid. Each of these is a promise the firm is making, so each
              gets a full line and a tick, and the reader can take them one at a
              time instead of scanning three columns. */}
          <ul className="mt-8 sm:mt-12">
            {whatMakesUsDifferent.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 border-t border-slate-200 py-6 last:border-b sm:flex-row sm:gap-6 sm:py-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Check aria-hidden className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="sm:grid sm:flex-1 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:mt-0 sm:text-base">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Was a pale mint CTASection card with two buttons, both of which sent
          the reader off this page to start the enquiry somewhere else. Now the
          real form, taken here.

          This also gives /about the `id="book"` it never had, which is what the
          hero CTA above targets. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get your property tax sorted"
          description="Tell us what you own, how it is held and what is on your mind. We will come back within 24 hours with clear recommendations and a fixed fee in writing if you want us to act on them."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "Same accountant every time", detail: "You are not passed around a team" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

    </>
  );
}
