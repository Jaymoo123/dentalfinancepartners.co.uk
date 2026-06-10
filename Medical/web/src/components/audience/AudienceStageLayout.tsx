import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { siteContainerLg, btnOnDark, focusRing } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";

export type AudienceStage = {
  slug: string;
  role: string;
  displayRole: string;
  badge: string;
  heroHeading: string;
  intro: string;
  stats: { value: string; label: string }[];
  concerns: { icon: LucideIcon; title: string; body: string }[];
  services: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  relatedGuides?: { href: string; title: string; body: string }[];
};

type Props = { data: AudienceStage };

export function AudienceStageLayout({ data }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#000d1f] via-[var(--navy)] to-[var(--navy-soft)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(184,115,51,0.10), transparent 60%), radial-gradient(ellipse 60% 45% at 80% 100%, rgba(184,115,51,0.07), transparent 55%)",
          }}
        />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20`}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className={`hover:text-white/90 transition-colors ${focusRing} rounded`}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">/</li>
              <li className="font-medium text-white/80">For {data.displayRole}</li>
            </ol>
          </nav>
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-[var(--copper)]/20 border border-[var(--copper)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
              {data.badge}
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {data.heroHeading}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg max-w-2xl">
              {data.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[var(--navy)] py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl font-semibold text-[var(--copper-light)] sm:text-3xl lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concerns grid */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
                What we hear from {data.displayRole.toLowerCase()}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                The questions and concerns that come up most in the first conversation.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.concerns.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition-all hover:border-[var(--copper)] hover:shadow-md hover:shadow-[var(--copper-soft)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--navy)]">
                      <Icon className="h-5 w-5 text-[var(--copper-light)]" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-[var(--ink)] sm:text-lg">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[var(--background)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              How we work with {data.displayRole.toLowerCase()}
            </h2>
            <div className="mt-10 space-y-5">
              {data.services.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-5 rounded-2xl border-l-4 border-[var(--copper)] bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] font-mono text-sm font-bold text-[var(--copper-light)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[var(--ink)] sm:text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead form CTA */}
      <section className="bg-[var(--surface)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-[var(--copper)]/25 bg-white p-8 sm:p-12">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--copper-soft)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-strong)]">
                  Free consultation
                </div>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
                  {data.ctaTitle}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg max-w-2xl mx-auto">
                  {data.ctaBody}
                </p>
              </div>
              <LeadForm redirectOnSuccess={false} submitLabel="Book my free consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--background)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl text-center mb-10">
              Common questions from {data.displayRole.toLowerCase()}
            </h2>
            <div className="space-y-4">
              {data.faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border-l-4 border-[var(--border)] bg-white p-6 transition-colors hover:border-[var(--copper)] sm:p-7"
                >
                  <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">{f.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      {data.relatedGuides && data.relatedGuides.length > 0 && (
        <section className="bg-[var(--navy)] py-12 text-center">
          <div className={siteContainerLg}>
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--copper-light)]">
                Want to read first?
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Background reading from our guide library
              </h2>
              <div className="mt-10 grid gap-4 text-left sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.relatedGuides.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className={`group block rounded-2xl border border-white/15 bg-white/5 p-5 transition-all hover:border-[var(--copper)] hover:bg-white/10 ${focusRing}`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--copper-light)] mb-2">
                      Medical guide
                    </p>
                    <h3 className="font-serif text-base font-semibold text-white group-hover:text-[var(--copper-light)]">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">{g.body}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/medical-guides" className={btnOnDark}>
                  Browse all guides
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
