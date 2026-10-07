import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { focusRing, sectionY } from "@/components/ui/layout-utils";
import { CALC_CAPTURE_BLURB, CALC_CAPTURE_HEADING, site } from "@/lib/calculators/site";

export const metadata: Metadata = {
  title: `Pharmacy Finance Calculators`,
  description: "Free scenario tools for UK community pharmacy owners: estimate the tax on a pharmacy sale, model goodwill, and plan incorporation. Built on current HMRC rules.",
  alternates: { canonical: `${site.url}/calculators` },
};

export default function CalculatorsPage() {
  const tools = allTools();
  return (
    <>
      {/* UA band 1, HERO. This route was a single `<div>` band with a 36px h1,
          no ground, no backdrop above the fold and no eyebrow - the thinnest of
          the five hubs. It now opens on the same shape as /services and /for.
          Container stays `mx-auto max-w-4xl px-6`, the measure this route
          already reads at, rather than widening to siteContainerLg.
          GROUND: bg-primary-950 `hex 0f3a4a`, a NEW ground FOR THIS ROUTE,
          carrying the row measured for the identical hero at
          src/app/services/page.tsx:44-49 (binding rule 7, reuse a measured
          ground rather than invent a third). Bare white 12.18, slate-300 9.09;
          composited with the motif's 0.10 of `hex 45cdff`, white 9.78,
          slate-300 7.36, white/80 trail 7.08, and the eyebrow rule's
          `primary-400` mark 5.37 against the 3.0 graphic floor. All PASS.
          `ground-dark` with it: the trail links are the only focusable elements
          on this ground.
          The Breadcrumb tone moves default -> onBrand with the ground. The
          `Eyebrow` text is "Calculators", the terminal crumb label this route
          already renders immediately above it, so no string is authored.
          The h1 takes the hub type step (`sm:text-5xl lg:text-6xl`,
          `leading-[1.15]`) and its colour moves from `var(--ink)` to white for
          the dark ground. Its words, and the paragraph's, are untouched; the
          paragraph moves to `text-slate-300` for the same reason (7.36). */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <PharmaciesBackdrop patternId="calculators-hub-hero" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Breadcrumb
            siteUrl={site.url}
            tone="onBrand"
            items={[{ label: "Home", href: "/" }, { label: "Calculators" }]}
          />
          <Eyebrow onDark>Calculators</Eyebrow>
          <h1 className="text-3xl font-semibold tracking-tight leading-[1.15] text-balance text-white sm:text-5xl lg:text-6xl">
            Pharmacy finance calculators
          </h1>
          {/* The page's one published paragraph, split at its own sentence
              break: the claim stays here, the caveat sits in the NoticeCard
              below the cards, where a reader meets it after choosing a tool.
              Both sentences are byte-identical to what this route already
              published; no wording was added or changed (owner ruling
              2026-09-28). */}
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Free scenario tools built on current HMRC rules.
          </p>
        </div>
      </section>

      {/* UA band 2, the tools, on slate-50 so the ground alternates out of the
          navy hero and into the panel's white `contained` variant below (no
          adjacentSame on this route, which is where the only sameAdjacent in
          the whole site was measured).
          GROUND: bg-slate-50 `hex f8fafc` is NEW for this route. Measured on it:
          `var(--ink)` `hex 0f172a` 16.82, `var(--ink-soft)` `hex 334155` 9.89,
          `var(--muted)` `hex 475569` 7.24, `var(--brand-primary)` `hex 0f3a4a`
          (the card category label and the enquiry link) 11.64. All PASS. The
          cards stay `bg-white`, so they keep an edge against the section
          (DESIGN_SYSTEM 4a rule 3) and the NoticeCard flips to `ground="slate"`
          per its own rule at NoticeCard.tsx:17.
          ADOPTED: packages/web-shared/design/marketing/ScrollGlowGroup.tsx
          around the tool grid. It replaces the grid `<div>` rather than
          wrapping it (the component takes `className`), so the three tool cards
          are its direct children and the `:nth-child` stagger works as
          designed. No copy, no href, no colour: the `card-glow` keyframe reads
          this site's declared `--brand-glow-deep`. The floor of 13 is held -
          every `toolPath(t.slug)` href is byte-identical.
          DECLINED: `Eyebrow` on this band. The only labels inside it are the
          per-card `t.category` strings and the enquiry link's own
          CALC_CAPTURE_HEADING; there is no band-level heading or label to
          promote, and minting one would author copy (binding rule 1). The route
          carries its eyebrow on the hero instead.
          DECLINED: packages/web-shared/design/marketing/DrawnTickList.tsx:33.
          It takes `items: string[]`, one claim per tick. This route publishes no
          set of single-sentence claims: its only lists are the three tool cards
          (each a link with a name and a one-liner, i.e. navigation, not claims)
          and the single NoticeCard caveat. Feeding it tool names would turn
          links into plain text and drop 3 of the 13 floor links. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className="mx-auto max-w-4xl px-6">
        {tools.length === 0 ? (
          <p className="mt-10 text-sm text-[var(--muted)]">Calculators coming soon.</p>
        ) : (
          <>
            <ScrollGlowGroup className="mt-10 grid gap-6 sm:grid-cols-2">
              {tools.map((t) => (
                <Link
                  key={t.slug}
                  href={toolPath(t.slug)}
                  // NEW live segmentation (zero data-cta-goal existed on this
                  // site before phase 2-6). On the control, never a wrapper.
                  data-cta="calc_index_tool"
                  data-cta-placement="index_grid"
                  data-cta-goal="tool"
                  className="block rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    {t.category}
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-[var(--ink)]">{t.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t.oneLiner}</p>
                </Link>
              ))}
            </ScrollGlowGroup>
            {/* Kit NoticeCard, tone="slate" (a neutral caveat, nobody's fault).
                `ground` moves white -> slate with the band's new slate-50
                ground, so the card paints white and keeps an edge
                (NoticeCard.tsx:17). Fed the page's own second sentence,
                verbatim. */}
            <div className="mt-10">
              <NoticeCard tone="slate" ground="slate">
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  All calculators are estimation tools only: speak to a specialist before filing or transacting.
                </p>
              </NoticeCard>
            </div>
            {/* M1a: the control W4's `calc_index_help` needed. No new config
                string and no authored sentence: the label is
                CALC_CAPTURE_HEADING, the sentence this subsystem already
                publishes under every calculator result and in the panel this
                anchor jumps to, so the link and its destination read the same.
                The id sits on the <a>, never a wrapper. */}
            <p className="mt-6 text-sm">
              <a
                href="#calculator-enquiry"
                data-cta="calc_index_help"
                data-cta-placement="index_grid"
                data-cta-goal="form"
                className={`font-semibold text-[var(--brand-primary)] underline underline-offset-4 ${focusRing}`}
              >
                {CALC_CAPTURE_HEADING}
              </a>
            </p>
          </>
        )}
        </div>
      </section>

      {/* Kit LeadCTAPanel: this index carried NO form at all, so one panel here
          is the package's one conversion gain. `contained` + ground="white"
          deliberately: the non-contained variant paints a slate-900 band, and a
          new dark ground on this route would need .ground-dark plus a backdrop
          and a measured ratio for no design reason, with the navy footer
          directly beneath it (section F item 8).
          `eyebrow=""` and `formTitle=""`: locked rule 9, this site publishes
          neither default label. `proofPoints={[]}`: the index publishes no
          proof points and inventing three would author copy.
          `title` / `description` are the strings CalcResultCta already
          publishes under every calculator result, imported from the one const
          in lib/calculators/site.ts rather than retyped. */}
      {/* M1a: anchor target for the `calc_index_help` link above. The kit panel
          exposes no id prop, so the id goes on a wrapper with a scroll offset,
          matching the `#enquiry-form` shape on the blog template. */}
      <div id="calculator-enquiry" className="scroll-mt-24">
      <LeadCTAPanel
        eyebrow=""
        formTitle=""
        title={CALC_CAPTURE_HEADING}
        description={CALC_CAPTURE_BLURB}
        proofPoints={[]}
        form={<LeadForm submitLabel="Send enquiry" />}
        contained
        ground="white"
      />
      </div>
    </>
  );
}
