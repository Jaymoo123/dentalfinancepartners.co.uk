import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { contractorTypes } from "@/data/contractor-types";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contractor Types We Work With | Specialist IR35 Accountants",
  description:
    "Specialist contractor accounting across every sector: IT, engineering, finance, consulting, NHS locums, oil and gas, legal, marketing and construction.",
  // Self-canonical. This route and /for/[slug] were pointing at the homepage,
  // which excluded 11 URLs from Google. Fixed 2026-09-12; do not regress it.
  alternates: { canonical: `${siteConfig.url}/for` },
};

/* Hand-rolled eyebrows: `.section-label` and `.eyebrow` are UNLAYERED rules in
   globals.css that pin their own colour and cannot be overridden by a utility. */
const eyebrowDark =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400";
const eyebrowLight =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-700";

export default function ForIndexPage() {
  return (
    <>
      {/* HOOK. */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          {/* Narrow measure on hero copy only. */}
          <div className="max-w-3xl">
            <p className={`${eyebrowDark} mb-6`}>Who we work with</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Specialist contractor accounting for every sector.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              IR35, limited company tax and contractor finances work differently across sectors. We know the specific challenges, working patterns and risk factors that apply to your type of contracting, not just the generic rules.
            </p>
            {/* Primary CTA stays on the page. Only the header CTA and the
                sticky banner leave for /contact. */}
            <Link
              href="#book"
              className={`${btnPrimary} mt-10 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM: why the generic rules are not enough. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>Why sector knowledge matters</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              IR35 works differently across sectors.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">
                The same tests, very different facts
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                The same IR35 tests (control, substitution, mutuality of obligation) apply to every contractor. But how they play out depends entirely on how contracting actually works in your sector. A platform developer embedded in a bank&apos;s engineering team faces different exposure than an offshore drilling engineer on a North Sea rotation. A locum solicitor covering maternity leave is in a different position from an interim CFO filling a vacant executive seat.
              </p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">
                Where a generalist loses the thread
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Generalist accountants apply the IR35 rules correctly in theory but miss the sector-specific working practice details that determine whether the position holds in practice. We know those details because we work with contractors across all of these sectors week in, week out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCOPE: every persona, each with its own crawlable link. */}
      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The contractor types we act for
          </h2>
          <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {contractorTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className={`group block rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 transition-colors hover:ring-primary-600/40 sm:p-6 ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                  {type.title}
                </span>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                  {type.intro.split(".")[0]}.
                </p>
                <ArrowRight
                  aria-hidden
                  className="mt-3 h-4 w-4 text-neutral-500 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ASK. `contained` keeps a dark band off the dark footer; `ground="white"`
          alternates against the warm section above. `proofPoints` intentionally
          EMPTY: Property's call site passes a fee claim and a turnaround
          promise, both banned on this site. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Free call"
          title="Tell us what you contract in"
          description="Book a free call. We will talk through your IR35 position, your structure and whether there is anything worth changing for the way your sector actually works."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            /* KNOWN CONTRACT: PanelBody renders `footnote` inside a <p>, so a
               <div> here would be a block in a paragraph and a hydration
               mismatch. Span only. */
            <span>
              No obligation. If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-700 underline hover:text-primary-800"
              >
                contact form
              </Link>
              .
            </span>
          }
        />
      </div>
    </>
  );
}
