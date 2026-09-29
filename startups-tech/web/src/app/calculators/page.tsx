import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";

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

          ADOPTION DECLINED: src/components/layout/StartupsBackdrop.tsx. Its
          written contrast proof is measured against bg-slate-900 only, the one
          ground it is mounted on today. Mounting it on primary-600 would put it
          on an unmeasured ground, and the backdrop file is phase-1 owned and
          off limits to this package, so the proof cannot be extended here.

          `ground-dark` is load-bearing: the breadcrumb is the first focusable
          thing in this hero and without the rebind its ring would paint
          primary-600 on primary-600, 1.00:1. No light island sits inside this
          section. */}
      <section className="ground-dark bg-primary-600 py-12 sm:py-16">
        <div className={siteContainerLg}>
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

          ADOPTION DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx.
          It requires a `title` and a `description`, and this hub publishes
          neither. Supplying them is authoring marketing copy, which the owner
          ruling on this port forbids. Owner item, not a builder item.

          ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx,
          an interruption, banned estate-wide, and a calculator hub is exactly
          where one gets proposed. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
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
                <div className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {t.category}
                </div>
                <h2 className="mt-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary-700">{t.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.oneLiner}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
