import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { ProcessTimeline } from "@accounting-network/web-shared/design/marketing/ProcessTimeline";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import type { StatItem } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, btnPrimary, btnSecondary, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { CalculatorTabs } from "@/components/tools/CalculatorTabs";
import type { TabKey } from "@/components/tools/CalculatorTabs";
import { JsonLd, buildAudiencePageSchema } from "@/lib/schema";

export type AudienceStage = {
  slug: string;
  role: string;
  displayRole: string;
  /**
   * The mid-sentence form of `displayRole`, because `.toLowerCase()` on it
   * destroys the acronym: "GP Practices, Partners & Salaried GPs" became
   * "gp practices, partners & salaried gps" in three visible headings on
   * /for-gps. The other three audiences survived that only by luck, having no
   * acronym in their name. Authored per page rather than derived, because no
   * transform knows which letters are an acronym.
   */
  displayRoleLower?: string;
  badge: string;
  heroHeading: string;
  intro: string;
  /** Statutory figures only. Every value carries a house_positions reference in
   *  the page file that supplies it; a figure that cannot be re-derived there
   *  does not publish. */
  stats: StatItem[];
  concerns: { icon: LucideIcon; title: string; body: string }[];
  services: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  relatedGuides?: { href: string; title: string; body: string }[];
  /**
   * Crawlable per-calculator links. These are LINKS, not cards: the tabs below
   * render `<button role="tab">` and delete no anchor only because this list
   * spells every `/calculators/<slug>` href out in the page file that owns it.
   * See DISPOSITION_SLICE2 B.1.
   */
  relatedCalculators?: { href: string; name: string; desc: string }[];
  /** Which calculators mount as tabs on this route (DISPOSITION_SLICE2 B.3). */
  calculatorTabs?: TabKey[];
};

type Props = { data: AudienceStage };

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

export function AudienceStageLayout({ data }: Props) {
  return (
    <>
      {/* Answer-ready structured data for AI engines (BreadcrumbList + Service
          + FAQPage). Built once in @/lib/schema so every /for-* audience page
          emits it. The FAQ mirrors the visible Q&A below verbatim. The visible
          breadcrumb suppresses its own node so only one BreadcrumbList ships. */}
      <JsonLd data={buildAudiencePageSchema(data)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 sm:py-20">
        <MedicalBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            variant="light"
            suppressJsonLd
            items={[{ label: "Home", href: "/" }, { label: `For ${data.displayRole}` }]}
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-[var(--copper)]/20 border border-[var(--copper)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
              {data.badge}
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {data.heroHeading}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {data.intro}
            </p>
            <div className="mt-8">
              <Link href="#book" className={btnPrimary}>
                Ask a medical accountant about your position
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory figures strip. White, so it does not touch the navy hero. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={data.stats} />
          <ExampleFigureNote
            className="mt-4 text-center"
            label="Statutory figures for the tax year shown. Your own position is what decides the answer."
          />
        </div>
      </section>

      {/* Concerns grid */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>What we hear</Eyebrow>
            <h2 className="text-3xl font-bold text-[var(--ink)] sm:text-4xl">
              What we hear from {data.displayRoleLower ?? data.displayRole.toLowerCase()}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              The questions and concerns that come up most in the first conversation.
            </p>
          </div>
          <CoverageCards items={data.concerns} columns={3} tone="slate" />
        </div>
      </section>

      {/* How the work runs. A numbered list of stages is a sequence, not a card
          stack, so it renders on the kit timeline. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl font-bold text-[var(--ink)] sm:text-4xl">
            How we work with {data.displayRoleLower ?? data.displayRole.toLowerCase()}
          </h2>
          <div className="mt-10">
            <ProcessTimeline
              steps={data.services.map((s, i) => ({
                n: String(i + 1).padStart(2, "0"),
                title: s.title,
                body: s.body,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Calculators: tabs to run one here, links so the anchors survive. */}
      {data.relatedCalculators && data.relatedCalculators.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className={siteContainerLg}>
            <Eyebrow>Free calculators</Eyebrow>
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Run the numbers before you send anything
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
              Free to use, on 2026/27 rates. We ask once whether a specialist should check your figure, and skipping that still shows it.
            </p>
            {data.calculatorTabs && data.calculatorTabs.length > 0 ? (
              <div className="mt-8">
                <CalculatorTabs tabs={data.calculatorTabs} />
              </div>
            ) : null}
            <ul className="mt-8 space-y-3 pl-0">
              {data.relatedCalculators.map((c) => (
                <li key={c.href} className="text-sm leading-relaxed text-[var(--muted)]">
                  <Link
                    href={c.href}
                    className={`font-semibold text-[var(--copper-strong)] underline decoration-2 underline-offset-4 ${focusRing} rounded`}
                  >
                    {c.name}
                  </Link>
                  <span className="ml-2">{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Lead capture. redirectOnSuccess stays FALSE: flipping it is a funnel
          change on four routes and it has not been decided. */}
      <div id="book" className="scroll-mt-24" data-cta="audience_book" data-cta-goal="form" data-cta-placement="audience">
        <LeadCTAPanel
          contained
          ground="slate"
          title={data.ctaTitle}
          description={data.ctaBody}
          proofPoints={MEDICAL_PROOF_POINTS}
          footnote="No obligation. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Ask a medical accountant" />}
        />
      </div>

      <FaqSection
        className="bg-white py-12 sm:py-16 lg:py-20"
        eyebrow="FAQ"
        title={`Common questions from ${data.displayRoleLower ?? data.displayRole.toLowerCase()}`}
        faqs={data.faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />

      {/* Related guides. Light ground: this is the last section before the navy
          footer, and navy never touches navy. */}
      {data.relatedGuides && data.relatedGuides.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <Eyebrow>Want to read first?</Eyebrow>
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Background reading from our guide library
            </h2>
            <RelatedArticles
              className="mt-8"
              columns={3}
              items={data.relatedGuides.map((g) => ({
                href: g.href,
                title: g.title,
                excerpt: g.body,
                kind: "guide" as const,
              }))}
            />
            <div className="mt-8">
              <Link href="/medical-guides" className={btnSecondary}>
                Browse all guides
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
