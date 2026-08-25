import Link from "next/link";
import { ArrowRight, Building2, Clock, MapPin, PoundSterling, RefreshCw, ShieldCheck, Target } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@/components/ui/page-blocks";
import { LocationChips } from "@/components/property/LocationChips";
import { WhyUsList } from "@/components/property/WhyUsList";
import { essentialGuides, guideGroups } from "@/lib/essential-guides";

/**
 * The three homepage body bands that /contact also carries, owner 2026-08-23:
 * a reader who lands straight on the form has met none of the argument the
 * homepage makes, so the form was the whole page.
 *
 * Lifted out of app/page.tsx rather than copied into app/contact/page.tsx, the
 * same posture as LocationChips and TestimonialsSection before them. Two copies
 * of these arrays would drift the moment one page's copy is edited.
 *
 * Grounds differ between the two hosts, so `WhatWeCoverSection` takes a `tone`.
 * Everything else keeps the homepage's ground and the alternation still holds
 * on both pages. Check §9 of docs/property/DESIGN_SYSTEM.md before reordering.
 */

// Firm traits, distinct from the services grid on the homepage.
const whoWeAre = [
  {
    icon: Target,
    title: "Property-only focus",
    body: "Every client is a landlord, investor, or developer. No restaurants, no retailers, just property.",
  },
  {
    icon: MapPin,
    title: "UK-wide coverage",
    body: "From single rental flats to thirty-property portfolios, anywhere in the UK.",
  },
  {
    icon: PoundSterling,
    title: "Fixed fees",
    body: "Quoted up front with no surprises, and no hard sell, ever.",
  },
  {
    icon: Clock,
    title: "24hr response",
    body: "Every enquiry answered within one working day, usually the same day.",
  },
];

const whyUs = [
  {
    icon: Building2,
    title: "Property is all we do",
    body: "We work only with landlords, investors, and developers, so the property rules are core competence rather than an occasional sideline.",
  },
  {
    icon: ShieldCheck,
    title: "Specialist depth where generalists slip",
    body: "Section 24, the 60-day CGT window, and incorporation modelled correctly, not treated as an afterthought.",
  },
  {
    icon: PoundSterling,
    title: "Fixed fees, no surprises",
    body: "Quoted up front, and for most landlords recovered several times over through reliefs claimed and penalties avoided.",
  },
  {
    icon: RefreshCw,
    title: "Up to date with every change",
    body: "The Finance Act 2026 measures, the 2027 income tax rate change, and the falling MTD thresholds are built into your plan.",
  },
];

/** National property-accountant intro, plus the locations strip. */
export function WhoWeAreSection() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className={siteContainerLg}>
        <div className="max-w-3xl">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-3 sm:mb-4">
            Property tax is all we do
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">
            Property Tax Partners is a specialist property accountancy firm for UK landlords, buy-to-let investors, and developers. Property is all we do, so{" "}
            <Link href="/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Section 24</Link>,{" "}
            <Link href="/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Making Tax Digital</Link>{" "}
            (live since 6 April 2026), the 60-day CGT window, and the{" "}
            <Link href="/incorporation" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">incorporation</Link>{" "}
            decision are core competence, not a sideline.
          </p>
        </div>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whoWeAre.map((item) => (
            <div key={item.title} className="rounded-xl bg-slate-50 p-5 sm:p-6 transition-colors border border-transparent hover:border-emerald-600">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 mb-3">
                <item.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
        {/* Locations strip (absorbed from the old "Areas we serve" section) */}
        <LocationChips className="mt-6 sm:mt-8" />
      </div>
    </section>
  );
}

/** Why landlords choose a specialist. */
export function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Why landlords choose a specialist
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              A generalist accountant can file your return. A specialist property accountant makes sure the structure, the reliefs, and the deadlines are right before you ever get there.
            </p>
          </div>
          <WhyUsList items={whyUs.map(({ title, body }) => ({ title, body }))} />
        </div>
      </div>
    </section>
  );
}

/**
 * Comprehensive tax-area coverage.
 *
 * `tone` is the section's own ground. The cards take the opposite one, because
 * a white card on a white section has no edge (DESIGN_SYSTEM §4a rule 3).
 */
export function WhatWeCoverSection({ tone = "slate" }: { tone?: "slate" | "white" }) {
  const sectionGround = tone === "white" ? "bg-white" : "bg-slate-50";
  const cardGround = tone === "white" ? "bg-slate-50" : "bg-white";
  const rowHover = tone === "white" ? "hover:bg-white" : "hover:bg-slate-50";
  return (
    <section className={`${sectionGround} py-12 sm:py-16 lg:py-20`}>
      <div className={siteContainerLg}>
        <div className="max-w-3xl mb-8 sm:mb-12">
          <Eyebrow>What we cover</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            The tax areas a property accountant handles
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
            From the everyday return to the once-in-a-portfolio decision, here is the full scope we cover for UK landlords and investors.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {guideGroups.map((g) => (
            <div key={g.key} className={`rounded-xl ${cardGround} p-5 sm:p-6 shadow-sm flex flex-col`}>
              <div className="border-b border-slate-100 pb-4 sm:pb-5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{g.label}</h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">{g.blurb}</p>
              </div>
              <div className="mt-2 flex flex-col">
                {essentialGuides.filter((area) => area.group === g.key).map((area) => (
                  <Link
                    key={area.title}
                    href={area.href}
                    className={`group -mx-2 flex items-center gap-3 rounded-xl p-2.5 sm:p-3 transition-colors ${rowHover}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <area.icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1 text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {area.title}
                    </span>
                    <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
