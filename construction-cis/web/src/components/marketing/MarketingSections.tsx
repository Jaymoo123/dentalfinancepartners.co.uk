import { siteContainerLg } from "@/components/ui/layout-utils";

/**
 * The two F.2 marketing blocks the homepage shares with Phase 6's /contact:
 * "who we are" and "why choose us". They live here rather than inline in
 * page.tsx so the second consumer imports them instead of copying the copy.
 *
 * Mirrored in ANATOMY ONLY from Property/web/src/components/property/MarketingSections.tsx.
 * The kit equivalents hardcode Property's landlord copy with no copy props
 * (playbook trap 12), so nothing here is imported from them.
 *
 * Copy provenance: every sentence in WhoWeAreSection is lifted verbatim from
 * src/app/about/page.tsx, which is live copy. No new claim is authored here.
 * WhyChooseUsSection carries the homepage's own existing "why specialist
 * matters" copy, moved, not rewritten.
 *
 * Grounds: WhoWeAre is white, WhyChooseUs is neutral-50, so the pair oscillates
 * between the neutral-50 problem band above and the white services band below
 * (DESIGN_SYSTEM section 9, no two adjacent bands share a ground).
 *
 * The .section-label class is a solid --btn-ground pill with a white label
 * (globals.css:289), 5.18:1 and ground-independent, so it is safe on either
 * band. It is deliberately used instead of .eyebrow: .eyebrow's occurrences are
 * pinned by file:line in src/tests/design/eyebrow-ground.test.ts and a new one
 * here would move that pin for no contrast gain.
 */
export function WhoWeAreSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="max-w-3xl">
          <div className="section-label mb-4">Who we are</div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            We only work with the construction industry.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            We are specialist accountants for CIS subcontractors and contractors. Construction under CIS is the whole of what we do, not a sideline. That focus means we understand the financial specifics of construction work in a way that a general practice does not.
          </p>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The same applies to gross payment status, contractor CIS300 obligations, the EPS real-time reclaim route for limited company subcontractors, and the April 2026 anti-fraud changes that affected GPS applications. These are not things that come up occasionally for us. They are the core of what we do.
          </p>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="max-w-3xl">
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            A generalist handles your compliance.{" "}
            <span className="text-[var(--accent-strong)]">We handle CIS-specific tax.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The materials split, the mileage rate, GPS qualification tests, April 2026 nil returns, EPS real-time reclaims: these are things a generalist accountant handles occasionally. They are routine in construction, and CIS is the only thing we specialise in.
          </p>
        </div>
      </div>
    </section>
  );
}
