import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

export const metadata: Metadata = {
  title: "About | Specialist Contractor Accountants",
  description:
    "Specialist accountants for UK contractors and IR35. We only work with contractors, so we understand the rules that a generalist accountant will not.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

/**
 * The four specialisms, promoted out of the third body paragraph so the section
 * carries a visual rather than shipping as prose (DESIGN_SYSTEM §0.2). Labels
 * only: the source paragraph says nothing further about them, and authoring a
 * description each would be inventing copy nobody wrote.
 */
const SPECIALISMS = [
  { n: "01", label: "IR35 and the off-payroll rules" },
  { n: "02", label: "Salary and dividend planning" },
  { n: "03", label: "Contractor expenses" },
  { n: "04", label: "PSC pension strategy" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero. Mono eyebrow hand-rolled from utilities rather than the
          `.eyebrow` class: that rule is `@layer components` in globals.css
          and pins `color: var(--accent)` #0e7490, which measures 3.35-3.69 on
          this site's dark grounds. Being layered, a `text-*` utility now DOES
          beat it; the hand-roll is kept because it needs no override at all.
          cyan-400 on neutral-900 measures 9.92. */}
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              About us
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              We only work with contractors.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              Because IR35, off-payroll working and PSC tax are specific enough that generalist experience is not the same as specialist experience.
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

      {/* Who we are. Two columns rather than a clamped prose block: §0.1's
          answer to "prose reads badly at full width" is to put something useful
          beside it, never `max-w-3xl`. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div className="min-w-0 space-y-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>
                We are specialist accountants for UK contractors and limited company directors. The work we take on involves a PSC, or someone considering one. That focus means we understand the financial specifics of contracting in a way that a general practice does not.
              </p>
              <p>
                IR35 is the clearest example. The rules are specific, the rules changed in April 2021, and getting them wrong is expensive. A generalist accountant can read the guidance. We work with those rules as they are applied in practice, contract by contract, so we know where the risks and opportunities actually are.
              </p>
            </div>
            <div className="min-w-0">
              <div className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-600">
                  How you are looked after
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-neutral-900">
                  You deal with specialist accountants, not a call centre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What specialism means in practice. The third paragraph's list, as a
          card grid. Ground oscillates against the white section above it. */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What specialism means in practice
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The same applies to salary and dividend planning, contractor expenses, PSC pension strategy, and the mechanics of the off-payroll rules. These are not things that come up occasionally for us. They are the core of what we do.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {SPECIALISMS.map((item) => (
              <div
                key={item.n}
                className="rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 sm:p-6"
              >
                <span className="font-mono text-2xl font-semibold tabular-nums text-primary-600" aria-hidden>
                  {item.n}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-neutral-900">
                  {item.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing ask. `contained` so a dark band never touches the dark footer,
          and `ground="white"` so it does not share the neutral-50 ground of the
          section above. `proofPoints` EMPTY on purpose: the kit's defaults are
          a fee claim and a turnaround promise, neither of which this site may
          publish. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Free call"
          title="Talk to an accountant who only works with contractors"
          description="Tell us about your contract and your current structure, and we will tell you where you stand and what is worth changing."
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
