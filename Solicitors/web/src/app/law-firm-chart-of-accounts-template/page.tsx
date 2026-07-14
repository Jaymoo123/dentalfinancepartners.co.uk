import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "Law Firm Chart of Accounts Template (Free Excel + PDF Download)";
const DESCRIPTION =
  "Free UK law firm chart of accounts template with client-money control accounts, SRA Accounts Rules notes and department fee codes. Excel and PDF, ready to import into QuickBooks or Xero.";
const PATH = "/law-firm-chart-of-accounts-template";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}${PATH}`,
    languages: { "en-GB": `${siteConfig.url}${PATH}`, "x-default": `${siteConfig.url}${PATH}` },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}${PATH}`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "Why does a law firm need a different chart of accounts from a general business?",
    answer:
      "Law firms hold client money separately from their own funds under the SRA Accounts Rules. This requires a dedicated client bank account (code 1002) and a matching client account control liability (code 2001). These two accounts must reconcile to one another at all times, and a five-weekly reconciliation is required under Rule 8.3. General business accounting software does not include these controls by default, so they must be added manually.",
  },
  {
    question: "What is the client account control liability?",
    answer:
      "Account 2001 represents the firm's obligation to clients whose money is held in the client bank account (1002). Every pound sitting in the client bank account should have a corresponding credit in the control liability. When the two accounts reconcile, the firm can demonstrate it holds exactly the right amount of client money, no more and no less, which is the core requirement of the SRA Accounts Rules.",
  },
  {
    question: "Can I import this chart of accounts into QuickBooks or Xero?",
    answer:
      "Yes. Both QuickBooks Online and Xero accept a CSV or XLSX import of your account list. Export the Excel sheet as CSV, map the Code column to Account Number and the Account Name column to Account Name, then import under Settings > Chart of Accounts (QuickBooks) or Accounting > Chart of Accounts > Import (Xero). You may need to add a Type column matching your software's account type taxonomy before importing.",
  },
  {
    question: "How should I split professional fees by department?",
    answer:
      "The template uses codes 4001 to 4004 for conveyancing, litigation, private client and commercial fees respectively. If your practice management software tracks time and billing by department already, you can map each department's fee income to the relevant code. If not, you can sub-code further, for example 4001.1 for residential conveyancing and 4001.2 for commercial property, using your software's sub-account or tracking category feature.",
  },
  {
    question: "Where do irrecoverable disbursements go?",
    answer:
      "Code 7009 covers disbursements paid on behalf of clients that cannot be recovered, for example court fees written off after an aborted matter. Disbursements that will be recovered sit in code 1004 (Disbursements recoverable) as a debtor until payment is received. Moving a disbursement from 1004 to 7009 recognises the loss at the point it becomes clear recovery is unlikely.",
  },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Law firm chart of accounts template" },
];

export default function LawFirmChartOfAccountsTemplatePage() {
  const serviceSchema = buildService({
    name: "Law Firm Chart of Accounts Template",
    description: DESCRIPTION,
    path: PATH,
    serviceType: "Free Accounting Template",
    category: "Specialist Legal Sector Accountancy Resources",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema
    ? [serviceSchema, breadcrumbSchema, faqSchema]
    : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-3 py-1.5 text-xs font-semibold text-white uppercase tracking-[0.16em]">
              Free download · Excel + PDF · No email required
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Law firm chart of accounts template
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              A free UK law firm chart of accounts with client-money control accounts, department fee codes and SRA Accounts Rules notes built in. Download as Excel or PDF and import directly into QuickBooks or Xero.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/downloads/law-firm-chart-of-accounts.xlsx"
                download
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] hover:bg-white/90 transition-colors"
              >
                Download Excel (.xlsx)
              </a>
              <a
                href="/downloads/law-firm-chart-of-accounts.pdf"
                download
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What a chart of accounts is */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              What a chart of accounts is for a law firm
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)]">
              A chart of accounts is the numbered list of every ledger account your practice uses to record financial transactions. Each transaction, a fee billed, a salary paid, a disbursement advanced, gets posted to one account code. Your profit and loss account, balance sheet and VAT return are all built from these coded entries.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              For a law firm, the chart of accounts has to do something that a general business chart does not: it must separate the firm's own money from client money at the ledger level. The SRA Accounts Rules require firms to keep client money segregated in a dedicated client bank account and to be able to demonstrate, at any time, that the balance held equals the total owed to clients. That demonstration happens through the reconciliation of two linked accounts: the client bank account (1002) and the client account control liability (2001).
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {[
                { range: "1000s", label: "Assets", desc: "Office bank, client bank (control), debtors, disbursements recoverable, WIP." },
                { range: "2000s", label: "Liabilities", desc: "Client account control liability, VAT, PAYE/NIC, partner capital and current accounts." },
                { range: "4000s", label: "Income", desc: "Professional fees by department (conveyancing, litigation, private client, commercial) and interest received." },
                { range: "7000s", label: "Expenditure", desc: "Salaries, PII, practising certificates, professional subs, rent, IT, marketing, bank charges, irrecoverable disbursements." },
              ].map((item) => (
                <div key={item.range} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{item.range}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--ink)]">{item.label}</div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why law firms are different */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Why law firms need client-money control accounts that general businesses do not
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)]">
              When a client pays funds in advance, for example a conveyancing completion amount or a probate bond, that money is not income. It belongs to the client and must sit in a ring-fenced client bank account. The firm is acting as custodian, not owner.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "The client bank account (1002)",
                  body: "This is the bank account where client money is held. It appears in the assets section of the balance sheet, but it is not freely available to the firm. Its balance is always matched by a corresponding liability.",
                },
                {
                  title: "The client account control liability (2001)",
                  body: "This is the firm's obligation to clients whose money it holds. The balance must always equal the balance in 1002. When they match, the firm can demonstrate it is holding the correct amount of client money.",
                },
                {
                  title: "The five-weekly reconciliation (Rule 8.3)",
                  body: "Under SRA Accounts Rules Rule 8.3, the firm must carry out a reconciliation of its client account at least every five weeks. The reconciliation compares the client bank account balance against the sum of all individual client ledger balances. Any difference must be investigated and resolved promptly.",
                },
                {
                  title: "What the COFA does",
                  body: "The Compliance Officer for Finance and Administration is responsible for ensuring the firm complies with the SRA Accounts Rules. The COFA must be satisfied that the reconciliation process is operating correctly and that any breaches are reported to the SRA where required.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6">
                  <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to adapt the codes */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              How to adapt the codes for your firm
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)]">
              The codes in this template are a starting point. Most firms will need to extend them to match their own structure and practice areas.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  heading: "Sub-code by department",
                  body: "If your practice management software tracks time and billing by department, you can sub-code the 4000s to match. For example, 4001.1 residential conveyancing, 4001.2 commercial property. Most software supports sub-accounts or tracking categories for this.",
                },
                {
                  heading: "Add partner drawings accounts",
                  body: "Equity partners typically have a drawings account within the 2011 current account range. You can add 2011.01, 2011.02 and so on for each partner, which makes it straightforward to produce individual partner profit and drawings statements at year end.",
                },
                {
                  heading: "Import into QuickBooks or Xero",
                  body: "Both QuickBooks Online and Xero accept a CSV or XLSX import of your account list. Export the Excel sheet as CSV, map Code to Account Number and Account Name to Account Name, then import under Settings > Chart of Accounts (QuickBooks) or Accounting > Chart of Accounts > Import (Xero). You may need to add a Type column matching your software's taxonomy.",
                },
                {
                  heading: "Legal aid firms",
                  body: "If your firm does legal aid work, you may need additional income codes to split LAA-funded fees from private fees, and potentially separate WIP accounts for matter types that are reported differently for LAA billing purposes.",
                },
              ].map((item, i) => (
                <li key={item.heading} className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 font-serif text-base font-semibold text-[var(--primary)]">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--ink)]">{item.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download section */}
      <section id="downloads" className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl text-center">
              Download the template
            </h2>
            <p className="mt-4 text-center text-sm leading-relaxed text-[var(--ink-soft)]">
              No email required. Both formats are free.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-7 flex flex-col">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">Excel format</div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[var(--ink)]">law-firm-chart-of-accounts.xlsx</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                  Full chart with colour-coded categories, a Code Ranges summary sheet, and notes on client-money reconciliation and SRA Accounts Rules requirements. Import directly into QuickBooks or Xero as CSV.
                </p>
                <a
                  href="/downloads/law-firm-chart-of-accounts.xlsx"
                  download
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-colors"
                >
                  Download Excel (.xlsx)
                </a>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-7 flex flex-col">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">PDF format</div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[var(--ink)]">law-firm-chart-of-accounts.pdf</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                  A one-page summary of all account codes and names, suitable for printing and pinning in your accounts office. Includes SRA reconciliation notes and QuickBooks/Xero import guidance.
                </p>
                <a
                  href="/downloads/law-firm-chart-of-accounts.pdf"
                  download
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
                >
                  Download PDF
                </a>
              </div>
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
                <div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6 sm:p-7">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Further reading</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Related solicitor guides
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-3">
              {[
                {
                  href: "/solicitor-guides/sra-accounts-rules-essentials",
                  title: "SRA Accounts Rules Essentials",
                  body: "Client money discipline, the five-weekly reconciliation cycle, the accountant's report, COFA role and common breaches.",
                },
                {
                  href: "/solicitor-guides/cofa-fundamentals",
                  title: "COFA Fundamentals",
                  body: "Role mechanics, materiality judgements and the 90-day new-COFA onboarding checklist.",
                },
                {
                  href: "/solicitor-guides/professional-indemnity-tax-treatment",
                  title: "PII Tax Treatment",
                  body: "How professional indemnity insurance premiums are treated for tax and the deductibility rules for law firms.",
                },
              ].map((g) => (
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
