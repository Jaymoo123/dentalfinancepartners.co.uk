import type { ReactNode } from "react";
import Link from "next/link";

import { DentistsBackdrop } from "@/components/layout/DentistsBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";

/**
 * The shared chrome of the four `/research/*` report pages.
 *
 * Before the port each page carried its own copy of the same hero, stat tile,
 * section rule, findings panel and closing panel, so a fix applied to one was a
 * fix applied to one. They are one module now and the pages carry only their
 * own content.
 *
 * Grounds, because the rule is measured against the SECTION ground and not the
 * label (`docs/dentists/DESIGN_DELTA.md`):
 *   hero          navy #001b3d      white 17.15, gold eyebrow 6.23
 *   body          --background      ink 16.40, muted 7.24, primary-700 11.13
 *   panels        --surface #ffffff ink 17.15, muted 7.58, primary-700 11.64
 * Gold appears only on the navy hero and as decoration (a rule, an underline)
 * on the light grounds, never as text on them, where it measures 2.75.
 *
 * ponytail: one module for the five shared blocks, not a page template with a
 * config object. Each page still writes its own JSX and its own words.
 */

export const RESEARCH_SERIES = [
  {
    href: "/research/nhs-dental-activity-index",
    title: "NHS Dental Activity Recovery Index",
    summary: "Monthly UDA delivery in England against the pre-Covid 2019/20 baseline.",
  },
  {
    href: "/research/nhs-dentist-earnings-index",
    title: "NHS Dentist Earnings and Expenses Tracker",
    summary: "Gross earnings, expenses and net income for self-employed NHS dentists.",
  },
  {
    href: "/research/dental-practice-density",
    title: "Dental Practice Density: England Regional Map",
    summary: "CQC-registered dental locations per 100,000 people, by region.",
  },
  {
    href: "/research/dental-company-formation-index",
    title: "Dental Company Formation Index",
    summary: "New dental limited companies incorporated under SIC 86230, month by month.",
  },
] as const;

/** Body link on a light ground. primary-700 #1a3a5c, 11.64 on the panel and
 *  11.13 on the page ground. The underline is gold, which is decoration and not
 *  the thing carrying the text. */
export const reportLink = `font-semibold text-primary-700 underline decoration-[var(--gold)] decoration-2 underline-offset-4 hover:text-primary-800 ${focusRing} rounded`;

export function ReportHero({
  crumb,
  eyebrow,
  title,
  intro,
  stats,
}: {
  /** Final breadcrumb label. Home and Research are added here. */
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[var(--navy)]">
      <DentistsBackdrop tone="navy" />
      <div className={`relative z-10 ${siteContainerLg} ${sectionYLoose}`}>
        <Breadcrumb
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Research", href: "/research" },
            { label: crumb },
          ]}
        />
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">{intro}</p>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/15">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-3xl font-bold tabular-nums text-white sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/75">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function ReportSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0 sm:py-12"
    >
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

/** The findings panel. The gold rule is the accent; every word in it is ink. */
export function KeyFindings({
  title = "Key findings",
  children,
  note,
}: {
  title?: string;
  children: ReactNode;
  note: ReactNode;
}) {
  return (
    <div className="card-premium border-l-4 border-l-[var(--gold)] p-6 sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{title}</h2>
      <ul className="mt-4 space-y-3 text-base leading-relaxed text-[var(--ink-soft)]">{children}</ul>
      <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">{note}</p>
    </div>
  );
}

/** The white panel a chart is drawn on. The 3:1 series-colour floor in the chart
 *  components is measured against this ground. */
export function ChartPanel({ children }: { children: ReactNode }) {
  return <div className="not-prose card-premium mt-6 p-4 sm:p-6">{children}</div>;
}

export function DataTableWrap({ children }: { children: ReactNode }) {
  return <div className="not-prose mt-4 overflow-x-auto">{children}</div>;
}

/** Closing panel. A light ground, because the lead form renders here and renders
 *  on a light ground everywhere else on the site. */
export function ClosingPanel({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="card-premium mt-12 p-8 sm:p-10">
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
        {heading}
      </h2>
      {children}
    </div>
  );
}

/** The other three series. Four pages that share a reader and never linked to
 *  each other; three unique internal links per page, and the cluster reads as
 *  one body of work. */
export function OtherSeries({ current }: { current: string }) {
  const others = RESEARCH_SERIES.filter((s) => s.href !== current);
  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h2 className="text-xl font-semibold tracking-tight text-[var(--ink)]">
        The other three data series
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {others.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className={`card-premium group flex h-full flex-col p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-[rgba(0,27,61,0.08)] ${focusRing}`}
              data-cta="research_related_series"
              data-cta-placement="research_report"
              data-cta-goal="content"
            >
              <span className="text-base font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                {s.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">
        <Link href="/research" className={reportLink} data-cta="research_index_return" data-cta-placement="research_report" data-cta-goal="content">
          All four data series
        </Link>
      </p>
    </section>
  );
}

export function ReportFaqs({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
        Frequently asked questions
      </h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((f) => (
          <div key={f.question}>
            <dt className="text-lg font-semibold leading-snug text-[var(--ink)]">{f.question}</dt>
            <dd className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
