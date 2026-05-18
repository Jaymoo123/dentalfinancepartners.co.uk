import type { Metadata } from "next";
import Link from "next/link";
import { HealthCheckWizard } from "@/components/health-check/Wizard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "Free Firm Health Check for UK Solicitors and Law Firms";
const DESCRIPTION =
  "10-minute diagnostic for UK law firms. Sole practitioner, partnership, LLP, ABS. We flag the SRA compliance, FA 2014 Salaried Member, BADR, and goodwill items most relevant to your specific position.";

const FAQS = [
  {
    question: "What does the firm health check cover?",
    answer:
      "Ten or so dental-specific questions covering your role (sole practitioner, equity partner, fixed-share, salaried, associate, consultant), firm type and practice area, entity structure, client money volume, COFA status, and sale / acquisition / succession plans. The output is a prioritised list of SRA compliance, structural, tax, FA 2014, BADR, and post-merger items most relevant to your specific position.",
  },
  {
    question: "How long does it take?",
    answer:
      "10 minutes for most people. Six steps; the last is a review screen before you submit. Optional fields can be skipped without materially affecting the report.",
  },
  {
    question: "Is the report personalised tax or regulatory advice?",
    answer:
      "No. The report is generated automatically from your inputs and is directional only. It flags items most worth looking at for someone in your position, but specific numbers and decisions require a conversation with a legal-sector-specialist accountant on your actual figures. The follow-up scoping call is where personalised advice begins.",
  },
  {
    question: "Will you spam me afterwards?",
    answer:
      "No. We follow up once with the report and an offer of a 30-minute scoping call. If you don't reply, we don't chase. No drip sequences, no remarketing, no list-selling.",
  },
  {
    question: "Is this only for equity partners?",
    answer:
      "No. Sole practitioners, equity partners, fixed-share and salaried members, associates, trainees, consultants and COFAs all benefit from the structural and compliance review. Different roles will see different items flagged; the rules engine routes each profile to the items most relevant to them.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/free-firm-health-check`,
    languages: {
      "en-GB": `${siteConfig.url}/free-firm-health-check`,
      "x-default": `${siteConfig.url}/free-firm-health-check`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/free-firm-health-check`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function FreeFirmHealthCheckPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Free firm health check" },
  ];

  const serviceSchema = buildService({
    name: "Free Firm Health Check",
    description: DESCRIPTION,
    path: "/free-firm-health-check",
    serviceType: "Law Firm Diagnostic",
    category: "Specialist Legal Sector Accountancy Services",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-3 py-1.5 text-xs font-semibold text-white uppercase tracking-[0.16em]">
              Free · 10 minutes · No obligation
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Free firm health check for UK solicitors
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Ten or so solicitor-specific questions. We&apos;ll flag the SRA compliance, FA 2014 Salaried Member, BADR, post-merger and structural items most worth reviewing in your specific position. The output is on-screen plus a follow-up email — no PDF wall, no sales drip.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat value="6" label="Steps" />
              <Stat value="10 min" label="To complete" />
              <Stat value="15+" label="Diagnostic rules" />
              <Stat value="Free" label="No charge" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <HealthCheckWizard />
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              How the check works
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Step num="1" title="Answer 10-ish questions" body="Six short steps covering your role, firm type, structure, client money volume, COFA status, and sale / buy plans. Optional notes at the end if you want to flag a specific concern." />
              <Step num="2" title="On-screen findings" body="15+ diagnostic rules run on your answers. Items are prioritised: Priority (impactful + actionable), Notable, Tweaks, FYI. You see the top five immediately." />
              <Step num="3" title="Follow-up call (optional)" body="We follow up to your email once with the full report and offer a 30-minute scoping call to put real numbers against the items. If you don't reply, we don't chase." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl text-center">
              Frequently asked
            </h2>
            <dl className="mt-10 space-y-5">
              {FAQS.map((f) => (
                <div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6 sm:p-7">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                Want to read first?
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Background reading from our pillar library
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED_GUIDES.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`group block rounded-2xl border border-white/15 bg-white/5 p-5 transition-all hover:border-white hover:bg-white/10 ${focusRing}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 mb-2">Pillar guide</p>
                  <h3 className="font-serif text-base font-semibold text-white">{g.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">{g.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const RELATED_GUIDES = [
  {
    href: "/solicitor-guides/sra-accounts-rules-essentials",
    title: "SRA Accounts Rules Essentials",
    body: "Client money discipline, five-weekly cycle, accountant's report, COFA role, common breaches.",
  },
  {
    href: "/solicitor-guides/partnership-vs-llp-for-solicitors",
    title: "Partnership vs LLP",
    body: "FA 2014 mechanics, conversion economics, capital and risk.",
  },
  {
    href: "/solicitor-guides/cofa-fundamentals",
    title: "COFA Fundamentals",
    body: "Role mechanics, materiality calls, 90-day new-COFA onboarding.",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl font-semibold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{label}</div>
    </div>
  );
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 font-serif text-base font-semibold text-[var(--primary)]">{num}</div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}
