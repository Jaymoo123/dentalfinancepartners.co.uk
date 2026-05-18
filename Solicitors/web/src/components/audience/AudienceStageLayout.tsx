import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
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

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 px-3 py-1.5 text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.16em]">
              {data.badge}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {data.eyebrow}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {data.heroHeading}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              {data.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[var(--primary-dark)] border-y border-white/10">
        <div className={`${siteContainerLg} py-8 sm:py-10`}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]/90 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concerns */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              What we hear from {data.eyebrow.replace(/^For\s+/i, "").toLowerCase()}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              The questions and concerns that come up most often in a first conversation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.concerns.map((c, i) => (
              <article
                key={c.title}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] font-serif text-base font-semibold text-[var(--accent-strong)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-[var(--ink)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              How we work with {data.eyebrow.replace(/^For\s+/i, "").toLowerCase()}
            </h2>
            <div className="mt-10 space-y-5">
              {data.services.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-5 rounded-2xl border-l-4 border-[var(--accent)] bg-white p-6 sm:p-7"
                >
                  <div className="flex-shrink-0">
                    <div className="font-mono text-sm font-bold tracking-tight text-[var(--accent-strong)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health check CTA inline */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl rounded-3xl border-2 border-[var(--accent)]/30 bg-[var(--accent-soft)] p-8 sm:p-12">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                Free 10-minute practice health check
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                {data.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                {data.ctaBody}
              </p>
            </div>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl text-center">
              Common questions
            </h2>
            <dl className="mt-10 space-y-5">
              {data.faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border-l-4 border-[var(--accent)] bg-white p-6 sm:p-7"
                >
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                    {f.q}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Related guides (optional) */}
      {data.relatedGuides && data.relatedGuides.length > 0 && (
        <section className="bg-[var(--primary)] text-white">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Want to read first?
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
                  Pillar guides for {data.eyebrow.replace(/^For\s+/i, "").toLowerCase()}
                </h2>
              </div>
              <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.relatedGuides.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className={`group block rounded-2xl border border-white/15 bg-white/5 p-5 transition-all hover:border-[var(--accent)] hover:bg-white/10 ${focusRing}`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)] mb-2">
                      Pillar guide
                    </p>
                    <h3 className="font-serif text-base font-semibold text-white group-hover:text-[var(--accent)]">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      {g.body}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/solicitor-guides" className={btnPrimary}>
                  Browse all pillar guides
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
