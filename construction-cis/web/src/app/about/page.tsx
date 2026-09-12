import type { Metadata } from "next";
import Link from "next/link";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnOnDark, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  // NOTE: this description is pinned against src/lib/page-summaries.ts by
  // src/tests/design/page-summaries.test.ts. Edit both or neither.
  title: "About | Specialist CIS Accountants for Construction Trades",
  description:
    "Specialist CIS accountants for UK construction trades. We only work with CIS subcontractors and contractors, so we understand the rules that a generalist accountant will not.",
};

/**
 * What the page already argued in prose, made scannable. Every line is lifted
 * from this route's own paragraph 3, which is live copy: no new claim, no
 * number that is not already published here, and nothing about fees, timing or
 * a client base.
 *
 * Deliberately NOT Property's NumberedReasons component. That component is a
 * client component whose numerals animate off `.story-numeral` /
 * `.story-numeral-rule` keyframes in Property's globals.css. Neither class
 * exists in this site's globals.css, so porting it would ship a row of grey
 * stubs that never light. The numerals below are the static 01/02/03 treatment
 * /contact already uses, which is the same anatomy without the machinery.
 */
const focusAreas = [
  {
    n: "01",
    title: "CIS refunds",
    body: "The 20% deduction is taken before any expenses or allowances are considered. The materials split on every deduction statement, mileage at the correct rate, and capital allowances on tools and equipment all change what comes back.",
  },
  {
    n: "02",
    title: "Gross payment status",
    body: "The qualification tests, the compliance history that sits behind them, and the April 2026 anti-fraud changes that affected GPS applications.",
  },
  {
    n: "03",
    title: "Contractor and limited company obligations",
    body: "CIS300 monthly returns, nil returns, and the EPS real-time reclaim route that limited company subcontractors use instead of waiting for a Self Assessment repayment.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Navy motif hero, matching Property/web/src/app/about/page.tsx. The
          route's tail is now the cream LeadCTAPanel, so the dark ground at the
          top is safe: bands are navy hero, white prose, neutral-50 focus areas,
          cream panel, navy footer. No two adjacent bands share a ground and the
          last opaque band under <main> is light (DESIGN_SYSTEM section 9). */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb variant="light" items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          {/* Dark ground, so .eyebrow keeps its explicit text-orange-400
              (#ff8904, 7.54 on #171717). The bare class default would render at
              3.43. Pinned by file:line in src/tests/design/eyebrow-ground.test.ts. */}
          <p className="eyebrow text-orange-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only work with the construction industry.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Because CIS, gross payment status, the deduction base rules and the EPS reclaim route are specific enough that generalist experience is not the same as specialist experience.
          </p>
          {/* The ask moves into the hero and points at the closing panel on this
              same route, replacing a bare btnPrimary to /contact that sat
              mid-page and recorded 0 CTA clicks (section 0.5: a bare button is
              not a CTA block). No data-cta: adding one would put a new triple in
              front of src/tests/design/cta-attribute-diff.test.ts, which this
              package may not edit. `about_hero_book|hero|form` is the id this
              link wants, matching for_hero_book / home_hero_book /
              services_hero_book / cis_refund_hero_book; it is reported to the
              orchestrator rather than added here.

              No unique internal destination is lost by dropping the /contact
              button: /contact is a chrome destination (SiteFooter.tsx:28). */}
          <div className="mt-10">
            <Link href="#book" className={btnOnDark}>
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {/* CLAIM SWEEP, 2026-09-12. "Every client we work with operates in
                the construction industry under CIS" was a claim about our own
                client base, which PROPERTY_STANDARD_ROLLOUT section I locks out
                estate-wide ("no claims of clients/customers/served/advised, no
                client records exist anywhere in the estate"). Replaced with the
                same point made as a scope statement, which is the shape
                /cis-refund already publishes ("Construction tax is the whole of
                what we do, not a sideline"). */}
            <p>
              We are specialist accountants for CIS subcontractors and contractors. Construction under CIS is the whole of what we do, not a sideline. That focus means we understand the financial specifics of construction work in a way that a general practice does not.
            </p>
            {/* Same sweep. The sentence ended "...these are things we work on
                every week across a large CIS client base", which is an aggregate
                claim about a client base we hold no records of, and is the exact
                sentence CLAIMS_REGISTER.md:162 files as a live breach in its
                homepage copy (src/app/page.tsx:411). Fixed here; the homepage
                instance is reported, not reached, because that file belongs to
                Phase 5.

                55p per mile from April 2026 traces to
                docs/construction-cis/house_positions.md:168 (AMAP first 10,000
                business miles from 6 April 2026, up from 45p). Verified, kept. */}
            <p>
              The CIS refund position is the clearest example. The 20% deduction is taken before any expenses or allowances are considered. Getting the materials split right on every deduction statement, claiming mileage at the correct rate (55p per mile from April 2026), applying capital allowances correctly on tools and equipment: these are the details that decide what a subcontractor gets back, and they are what this site is built around.
            </p>
            <p>
              The same applies to gross payment status, contractor CIS300 obligations, the EPS real-time reclaim route for limited company subcontractors, and the April 2026 anti-fraud changes that affected GPS applications. These are not things that come up occasionally for us. They are the core of what we do.
            </p>
            {/* TD-18 / GATE 8, and the wording this package establishes for all
                five call sites of the claim. What stood here was "We work on a
                fixed-fee basis. You know what you are paying before we start."
                Under the pool model we do not quote at all: the enquiry goes to
                independent firms in the partner network, each of which sets its
                own fee (/privacy-policy section 5, :109-119 and :143-144). It
                was a promise about commercial terms we are not the party to
                make.

                The turnaround half of gate 8's /about sentence is ALREADY GONE:
                the 2026-09-11 TD-13/TD-14 sweep took it out across 19 files and
                this paragraph carries no duration. Nothing to remove there.

                No fee, no number, no duration, and the promising party is named. */}
            <p>
              Fees are agreed before any work starts. The specialist firm you speak to sets its own fee and agrees it with you up front, so nothing begins until you have. You deal with specialist CIS accountants, not a call centre.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">What we focus on</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Three areas, and not much else.
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.n}>
                {/* --accent-strong (#c2410c), 5.18 on neutral-50. --accent
                    (#f97316) measures 2.75 there and globals.css:43 forbids it
                    carrying text on a light ground. */}
                <span
                  className="font-mono text-2xl font-semibold text-[var(--accent-strong)] tabular-nums"
                  aria-hidden
                >
                  {area.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">{area.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 0.5's closing ask: this route could previously be scrolled to
          the bottom without meeting one. `contained` renders the panel on
          --hero-cream, so the tail is neutral-50, cream, navy footer, and no
          navy band touches the footer.

          No data-cta on the wrapper: autoCapture resolves through
          closest("[data-cta]") and an id here would swallow every control inside
          the form (05ddb709). The LeadForm emits its own lifecycle events.

          Every visible string is passed explicitly, defaults included, because a
          kit component publishes copy through default props and nobody reviews
          a default. Each proof point is checked against /privacy-policy section
          5. No fee, no number, no duration. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          eyebrow="Get started"
          title="Talk to a CIS specialist"
          description="Book a free introductory call. Tell us where you are and what you need, and a specialist will pick it up. No hard sell, no obligation."
          formTitle="Book your free call"
          submitLabel="Request a callback"
          proofPoints={[
            {
              title: "CIS specialists, not a general accounting practice",
              detail: "Construction tax is the whole of what we do, not a sideline.",
            },
            {
              title: "A specialist CIS accountant will be in touch",
              detail: "Not a sales team, not a call centre.",
            },
            {
              title: "Fees agreed before any work starts",
              detail: "The specialist firm you speak to sets its own fee and agrees it with you up front.",
            },
          ]}
          footnote={
            <>
              We help subcontractors across all construction trades.{" "}
              <Link
                href="/for"
                className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 ${focusRing}`}
              >
                See the trades we cover
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
