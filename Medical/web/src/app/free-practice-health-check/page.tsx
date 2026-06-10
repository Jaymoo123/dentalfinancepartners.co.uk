import type { Metadata } from "next";
import Link from "next/link";
import { MedicalHealthCheckWizard } from "@/components/health-check/MedicalHealthCheckWizard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

const TITLE = "Free Medical Practice Health Check for UK Doctors";
const DESCRIPTION =
  "5-minute diagnostic for UK doctors: GP partners, salaried GPs, hospital consultants, locum doctors, and junior doctors. We flag the NHS pension, tax structure, IR35, and private practice items most relevant to your specific position.";

const FAQS = [
  {
    question: "What does the medical practice health check cover?",
    answer:
      "Five questions covering your role (GP partner, salaried GP, consultant, locum, junior doctor), NHS pension status, private practice situation, income level, and current accountancy arrangement. The output is a prioritised list of structural, tax, pension, and compliance items most relevant to your specific position.",
  },
  {
    question: "How long does it take?",
    answer:
      "5 minutes for most people. Five short steps covering the most impactful variables, followed by your contact details. Results appear on screen immediately.",
  },
  {
    question: "Is this personalised tax advice?",
    answer:
      "No. The diagnostic is generated automatically from your inputs and is directional only. It flags items worth looking at for someone in your position. The specific numbers and decisions require a conversation with a medical specialist accountant on your actual figures. The free follow-up call is where the personalised advice begins.",
  },
  {
    question: "Will you contact me repeatedly?",
    answer:
      "No. We follow up once with the report and an offer of a 30-minute scoping call. If you do not reply, we do not chase. No drip campaigns, no remarketing, no list-selling.",
  },
  {
    question: "Is this only for GP partners?",
    answer:
      "No. The diagnostic covers GPs, salaried GPs, hospital consultants, locum doctors, and junior doctors. Different roles see different items flagged; the rules engine routes each profile to the items most relevant to them.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/free-practice-health-check`,
    languages: {
      "en-GB": `${siteConfig.url}/free-practice-health-check`,
      "x-default": `${siteConfig.url}/free-practice-health-check`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/free-practice-health-check`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const RELATED_GUIDES = [
  {
    href: "/medical-guides/nhs-pension-annual-allowance",
    title: "NHS Pension Annual Allowance Guide",
    body: "Pension input amounts, tapered allowance, Scheme Pays elections, and carry-forward for UK doctors.",
  },
  {
    href: "/medical-guides/locum-limited-company-vs-umbrella",
    title: "Locum Doctor: Ltd Company vs Umbrella vs Sole Trader",
    body: "Net take-home comparison, IR35 interaction, and when each structure makes sense.",
  },
  {
    href: "/medical-guides/consultant-private-practice-tax",
    title: "Consultant Private Practice Tax Guide",
    body: "Private practice income treatment, company structures, medico-legal work, and NHS pension interaction.",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl font-semibold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--copper-light)]/90">{label}</div>
    </div>
  );
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--copper-soft)] font-serif text-base font-semibold text-[var(--copper-strong)]">
        {num}
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}

export default function FreePracticeHealthCheckPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Free practice health check" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} py-14 sm:py-20`}>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--copper)]/20 border border-[var(--copper)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--copper-light)]">
              Free · 5 minutes · No obligation
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Free practice health check for UK doctors
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Five medical-specific questions. We flag the NHS pension, tax structure, IR35, private practice, and compliance items most worth reviewing in your specific position. On-screen results plus a follow-up email — no PDF wall, no sales sequences.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat value="5" label="Questions" />
              <Stat value="5 min" label="To complete" />
              <Stat value="15+" label="Diagnostic rules" />
              <Stat value="Free" label="No charge" />
            </div>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-2xl">
            <MedicalHealthCheckWizard />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              How the check works
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Step
                num="1"
                title="Answer 5 questions"
                body="Five short steps covering your role, NHS pension status, private practice setup, income level, and current accountancy arrangement."
              />
              <Step
                num="2"
                title="On-screen findings"
                body="15+ diagnostic rules run against your answers. Items are prioritised: Priority (impactful and actionable now), Notable, FYI. You see results immediately."
              />
              <Step
                num="3"
                title="Free follow-up call (optional)"
                body="We follow up once by email with the full report and an offer of a 30-minute scoping call to put real numbers against the items. If you do not reply, we do not chase."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl text-center">
              Frequently asked
            </h2>
            <dl className="mt-10 space-y-5">
              {FAQS.map((f) => (
                <div
                  key={f.question}
                  className="rounded-2xl border-l-4 border-[var(--copper)] bg-white p-6 sm:p-7"
                >
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--copper-light)]">
                Want to read first?
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Background reading from our guide library
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED_GUIDES.map((g) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
