import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: `Free Startup Tax Calculators`,
  description: "Free startup tax calculators: R&D relief estimator, SEIS and EIS relief calculator, EMI vs unapproved options comparison, and founder dividend vs salary calculator. Built on 2026/27 HMRC rules.",
  alternates: { canonical: `${site.url}/calculators` },
};

/**
 * Contrast wrapper for the adopted kit Breadcrumb on this site's brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 links with slate-400 chevrons, both written for the kit's navy. On
 * the primary-600 ground below (#4f46e5) they measure 4.23:1 and 2.45:1, under
 * the 4.5 text floor and the 3.0 graphic floor. The kit is a manager carve-out,
 * so the ground-correct palette is applied here, at the call site: white is
 * 6.29:1 and white/80 is 4.63:1 on the same ground. Identical string on the
 * tool template next door.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export default function CalculatorsPage() {
  const tools = allTools();
  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. This
          route had no breadcrumb and no BreadcrumbList JSON-LD at all; the kit
          component emits both. The Home crumb is NOT a new internal link: the
          kit header wordmark and the kit footer already emit href="/" on every
          page since phase 1, so this route's UNIQUE internal link set is
          unchanged and the /calculators floor of 4 is still carried by the four
          tool cards below.

          ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
          Its own header states it is the shallow hero for the token-gated
          noindex pages and is deliberately not the content-page hero, and it
          hardcodes a slate-900 ground, which would replace the brand ground the
          sibling tool template already uses.

          ADOPTION DECLINED here: `Eyebrow onDark` from
          packages/web-shared/design/primitives/page-blocks.tsx. Its on-dark
          branch is slate-300, 4.23:1 on #4f46e5, under the 4.5 floor for an
          11-12px label. Eyebrow IS adopted inside the tool itself, on white,
          via src/components/calculators/CalculatorClient.tsx.

          DECLINE REVERSED, 2026-09-29 (U2 item 1, and plan false premise 11).
          ADOPTED: src/components/layout/StartupsBackdrop.tsx. The decline that
          stood here was "its contrast proof covers bg-slate-900 only". U4 has
          since extended that proof and the file now carries the row for THIS
          ground: bg-primary-600 #4f46e5, composited with the motif at its
          strongest point = #544de7, white 5.85 (both floors PASS). The same row
          records that `text-slate-300` measures 3.94 on this ground and must
          not be used for body copy while the backdrop is mounted; nothing in
          this band is slate-300 (the h1 is white, the standfirst white/90 and
          the breadcrumb is forced to white by crumbOnBrand above), so no copy
          colour changes here. Host contract added: `relative overflow-hidden`
          on the section, `relative z-10` on the content.

          `ground-dark` is load-bearing: the breadcrumb is the first focusable
          thing in this hero and without the rebind its ring would paint
          primary-600 on primary-600, 1.00:1. No light island sits inside this
          section. */}
      <section className="ground-dark relative overflow-hidden bg-primary-600 py-12 sm:py-16">
        <StartupsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className={crumbOnBrand}>
            <Breadcrumb onDark siteUrl={site.url} items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Startup tax calculators
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Free scenario tools built on 2026/27 HMRC rules. All calculators are estimation tools only: speak to a specialist before filing.
          </p>
        </div>
      </section>
      {/* ADOPTION DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx.
          Its cards are <div>s with no link slot, and here the cards ARE the four
          /calculators/<slug> links, which is the entire job of this grid and the
          whole of the route's link floor. Adopting it would delete them.

          PRIOR DECLINE, SUPERSEDED 2026-09-29 (see the panel mounted at the
          foot of this page): the panel component requires a `title` and a
          `description`, which this hub published neither of at the time, and
          supplying them was authoring marketing copy. The owner ruling below
          overrides that decline with the services-hub strings, unauthored.

          ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx,
          an interruption, banned estate-wide, and a calculator hub is exactly
          where one gets proposed. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          {/* ADOPTED: packages/web-shared/design/marketing/ScrollGlowGroup.tsx,
              a wrapper. It flips data-glow="on" once the grid is fully on
              screen and the card-glow rules U4 imported into globals.css do the
              rest. No card, href or string inside it changes. */}
          <ScrollGlowGroup className="grid gap-6 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={toolPath(t.slug)}
                className={`group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}
              >
                {/* text-primary-700 (#4338ca, 7.90 on white), not primary-600.
                    A 12px uppercase label is text and needs the 4.5 floor with
                    room; the card's hover border stays primary-400, which is a
                    graphic and clears 3:1 against the slate-200 it replaces. */}
                {/* U2: the generalist `rounded-full` pill shape, applied to the
                    label this card already published. The STRING is unchanged
                    (`t.category` from src/lib/calculators/registry.ts); only the
                    shape and the ground are. primary-50 #eef2ff under
                    primary-700 #4338ca measures 7.42, past the 4.5 text floor
                    with room at 12px. */}
                <div className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {t.category}
                </div>
                <h2 className="mt-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary-700">{t.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.oneLiner}</p>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>
      {/* ADOPTED 2026-09-29, owner ruling: this index must carry an enquiry
          form like every other money page on the site. The earlier decline
          above is superseded, not deleted, so the prior reasoning stays on
          record. No copy is authored: title/description are the same strings
          src/app/services/page.tsx and src/app/for/page.tsx already pass to
          this same component, byte-identical. Distinct `patternId` because a
          <pattern> id must be unique per DOCUMENT and this page already
          mounts the motif once above. */}
      <LeadCTAPanel
        title="Speak to a startup tax specialist."
        description="Tell us about your situation and we will reply within 24 hours."
        proofPoints={[]}
        form={<LeadForm submitLabel="Send enquiry" />}
        backdrop={<StartupsBackdrop patternId="calculators-panel" />}
      />
    </>
  );
}
