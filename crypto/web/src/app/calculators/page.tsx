import type { Metadata } from "next";
import Link from "next/link";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { sectionY, siteContainerLg } from "@/components/ui/layout-utils";
import { PageHero } from "@/app/_parts/PageHero";

export const metadata: Metadata = {
  title: `Free Crypto Tax Calculators`,
  description: "Free crypto tax calculators for UK holders: CGT estimator, HMRC disclosure scope, investor vs trader checker, and staking/mining income estimator. Built on 2026/27 HMRC rules.",
  alternates: { canonical: `${site.url}/calculators` },
};

export default function CalculatorsPage() {
  const tools = allTools();
  return (
    <>
      {/* Hero. Was a hand-copy of _parts/PageHero's anatomy (navy ground, kit
          Breadcrumb, Eyebrow, h1, standfirst) rather than a call to it, which is
          why it never picked up CryptoBackdrop when the backdrop landed. Now it
          calls PageHero. Same copy, same h1, same Breadcrumb component with the
          same items and the same onDark, so the BreadcrumbList JSON-LD is
          unchanged; what changes is that the trail now sits inside the 3xl copy
          column and the hero gets the motif, both of which is what every other
          route family on this site already does.

          No hero CTA, unlike the topic pages. The action on this page is the
          tool list immediately below it, and a "Get in touch" button above the
          fold competes with it for the same click. The closing panel carries
          the ask instead. */}
      <PageHero
        eyebrow="Free tools"
        title="Crypto tax calculators."
        items={[{ label: "Home", href: "/" }, { label: "Calculators" }]}
      >
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          {tools.length} free scenario tools built on 2026/27 HMRC rules. No sign-up, no email
          needed to see a figure. Every one is an estimation tool: speak to a specialist before
          you file.
        </p>
      </PageHero>

      {/* The tool list.
          Property groups this index by category under its own h3 per category,
          which works there because sixteen tools fall into six categories. Here
          four tools fall into four categories, so grouping would produce four
          headings with one card each and give "HMRC Disclosure" the same weight
          as the page title. Property's own file carries a comment warning
          against exactly that shape. One grid, category as a card label. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Pick the question you need answered.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={toolPath(t.slug)}
                className="group flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:p-8"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {t.category}
                </span>
                <span className="mt-3 text-lg font-bold text-slate-900 group-hover:text-primary-700">
                  {t.name}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {t.oneLiner}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing ask. A LINK to /contact, the same posture as the topic pages:
          this page carries no capture surface today and adding one is an owner
          decision. White ground so the navy panel is not the second navy field
          running straight into the slate-900 footer. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="rounded-xl bg-[#0e1a3a] p-8 sm:p-12">
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Need help reading your result?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              These tools give you the shape of the answer. Tell us about your situation and we will
              talk you through the filing position that applies to it.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#0e1a3a] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
