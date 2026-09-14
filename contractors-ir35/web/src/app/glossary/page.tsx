import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { GLOSSARY } from "./[slug]/data";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

export const metadata: Metadata = {
  title: { absolute: `IR35 Glossary | ${siteConfig.name}` },
  description:
    "Plain-English definitions of IR35, off-payroll and contractor tax terms: inside vs outside IR35, CEST, SDS, umbrella companies and dividends. Verified for 2026/27.",
  alternates: { canonical: `${siteConfig.url}/glossary` },
  openGraph: {
    title: "IR35 Glossary | Contractor Tax Terms Explained",
    description:
      "Plain-English definitions for UK limited-company contractors, umbrella workers and freelancers.",
    url: `${siteConfig.url}/glossary`,
    type: "website",
  },
};

const CATEGORIES = [
  "IR35 fundamentals",
  "Status tests",
  "Off-payroll mechanics",
  "Limited company tax",
  "Umbrella and employment",
  "Expenses, VAT and compliance",
] as const;

export default function GlossaryIndexPage() {
  const entries = Object.values(GLOSSARY);

  // Group by category
  const byCategory: Record<string, typeof entries> = {};
  for (const e of entries) {
    (byCategory[e.category] ||= []).push(e);
  }

  // Use canonical order, then any uncategorised extras
  const canonicalCats = CATEGORIES.filter(
    (c) => byCategory[c] && byCategory[c].length > 0
  );
  const extraCats = Object.keys(byCategory).filter(
    (c) => !(CATEGORIES as readonly string[]).includes(c)
  );
  const categories = [...canonicalCats, ...extraCats];

  return (
    <>
      {/* Hero. Navy band, breadcrumb onDark, mono eyebrow, h1, standfirst, and a
          primary CTA at the on-page form. The eyebrow is hand-rolled rather than
          the `.eyebrow` class because that rule pins `color: var(--accent)`
          (#0e7490, 3.69 on this near-black ground). It is `@layer components`,
          so a `text-primary-400` utility WOULD win against it; hand-rolling is
          kept because it needs no override at all. */}
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "IR35 Glossary" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              Plain English definitions
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              IR35 and contractor tax glossary
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              {entries.length > 0
                ? `${entries.length} definitions of the terms UK limited-company contractors, umbrella workers and freelancers actually need to understand. Written by specialist contractor accountants. All figures verified for 2026/27.`
                : "Specialist contractor accountants explaining the IR35 and contractor tax terms you need to understand. Definitions being added now."}
            </p>
            <Link
              href="#book"
              className={`${btnPrimary} mt-8 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      {/* Term listing. Body ground is white and the container IS the measure:
          the old `max-w-6xl mx-auto` inside a `max-w-6xl` container was a no-op
          clamp, and the old `bg-stone-50` was an off-ramp literal. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {entries.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center ring-1 ring-neutral-200/70">
              <h2 className="mb-2 text-xl font-bold text-neutral-900">
                Definitions coming soon
              </h2>
              <p className="mx-auto max-w-md text-neutral-600">
                We are adding plain-English IR35 and contractor tax definitions
                now. Check back, or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary-600 underline hover:text-primary-700"
                >
                  book a free call
                </Link>{" "}
                if you have a specific question.
              </p>
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat} className="mb-12 last:mb-0">
                <h2 className="mb-6 border-b border-neutral-200 pb-3 text-2xl font-bold text-neutral-900">
                  {cat}
                </h2>
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {byCategory[cat].map((e) => (
                    <Link
                      key={e.slug}
                      href={`/glossary/${e.slug}`}
                      className="group flex flex-col rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 transition-colors hover:bg-neutral-50 hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:p-6"
                    >
                      <h3 className="text-lg font-bold leading-snug text-neutral-900">
                        {e.term}
                      </h3>
                      <span className="mt-3 inline-flex items-center text-sm font-semibold text-primary-600">
                        Read definition
                        <ArrowRight
                          aria-hidden
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Closing ask. `contained` so a dark band never touches the dark footer
          (the canonical tail is panel, then footer). `proofPoints` is left EMPTY
          on purpose: the kit has no authored proof copy for this site and
          inventing some would be a claim nobody wrote. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow="Free call"
          title="Not sure how a definition applies to your contract?"
          description="Tell us about the engagement and how you actually work, and we will tell you where you stand on IR35, in plain English."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            <>
              No obligation. If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-600 underline hover:text-primary-700"
              >
                contact form
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
