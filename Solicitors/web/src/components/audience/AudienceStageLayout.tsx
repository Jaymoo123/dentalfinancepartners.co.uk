import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import {
  btnPrimary,
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import {
  JsonLd,
  buildFaqPage,
  buildBreadcrumbJsonLd,
} from "@/lib/schema/index";

export type AudienceStage = {
  slug: string;
  /** Page title for metadata (also used as H1 when no `heroHeading`). */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Short label shown above the H1, e.g. "For associate dentists". */
  eyebrow: string;
  badge: string;
  heroHeading: string;
  intro: string;
  stats: { value: string; label: string }[];
  concerns: { title: string; body: string }[];
  services: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  relatedGuides?: { href: string; title: string; body: string }[];
};

type Props = { data: AudienceStage };

export function AudienceStageLayout({ data }: Props) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: data.eyebrow },
  ];
  const faqPage = buildFaqPage(
    data.faqs.map((f) => ({ question: f.q, answer: f.a })),
  );
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const schemaPayload = faqPage
    ? [breadcrumbSchema, faqPage]
    : [breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero: navy motif ground, the standard. The crimson full-bleed slab it
          replaces was decoration doing structural work; the brand hex measures
          3.06:1 on slate-900 and can never carry text there, so the badge and
          eyebrow move to rose-300 / the shared Eyebrow. Narrow measure on hero
          copy only. */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-rose-300 ring-1 ring-rose-300/30">
              {data.badge}
            </div>
            <div className="mt-4">
              <Eyebrow onDark>{data.eyebrow}</Eyebrow>
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              {data.heroHeading}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {data.intro}
            </p>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      {/* Stats strip: white band directly under the hero, the standard's own
          proof strip. Light, so the hero navy has something to end against. */}
      <section className="border-b border-slate-200 bg-white">
        <div className={`${siteContainerLg} py-5 sm:py-7`}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concerns: slate ground, white cards opposing it. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What we hear from {data.eyebrow.replace(/^For\s+/i, "").toLowerCase()}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The questions and concerns that come up most often in a first conversation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.concerns.map((c, i) => (
              <article
                key={c.title}
                className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-base font-bold tabular-nums text-slate-900 ring-1 ring-slate-200/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we work: white ground, slate cards. Unclamped, siteContainerLg is
          the measure. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How we work with {data.eyebrow.replace(/^For\s+/i, "").toLowerCase()}
          </h2>
          <div className="mt-10 space-y-5">
            {data.services.map((s, i) => (
              <div
                key={s.title}
                className="flex gap-5 rounded-xl border-l-4 border-[var(--btn-ground)] bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-7"
              >
                <div className="flex-shrink-0">
                  <div className="font-mono text-sm font-bold tabular-nums tracking-tight text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The ask, in the same position it has always occupied. Contained on a
          slate ground: the sections either side are white, and a navy band here
          would be the second navy field on the page. Every visible string is
          the route's own - the eyebrow and both headings are the old inline
          block's copy, byte for byte - and `proofPoints`/`formTitle` are
          suppressed because no such words exist on these routes. */}
      <LeadCTAPanel
        contained
        ground="slate"
        eyebrow="Free 10-minute practice health check"
        title={data.ctaTitle}
        description={data.ctaBody}
        proofPoints={[]}
        formTitle=""
        form={<LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />}
      />

      {/* FAQ: white ground, slate cards, the phase-5 /services recipe. The array
          is the same binding passed to buildFaqPage() above (T17). */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Common questions
          </h2>
          <dl className="mt-10 grid gap-5 lg:grid-cols-2">
            {data.faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-7"
              >
                <dt className="text-lg font-bold text-slate-900">{f.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related guides (optional). Light ground, not the navy band it used to
          be: this is the last section before the slate-900 footer and navy must
          never touch navy. Every href and label is unchanged. */}
      {data.relatedGuides && data.relatedGuides.length > 0 && (
        <section className="bg-slate-50">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <Eyebrow>Want to read first?</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Pillar guides for {data.eyebrow.replace(/^For\s+/i, "").toLowerCase()}
            </h2>
            <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedGuides.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`group block rounded-xl bg-white p-5 ring-1 ring-slate-200/70 transition-shadow hover:shadow-md ${focusRing}`}
                >
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Pillar guide
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {g.body}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/solicitor-guides" className={btnPrimary}>
                Browse all pillar guides
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
