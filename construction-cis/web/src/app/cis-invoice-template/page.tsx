import type { Metadata } from "next";
import Link from "next/link";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqJsonLd } from "@/lib/schema";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";

export const metadata: Metadata = {
  title: "CIS Subcontractor Invoice Template UK (Free Excel + PDF Download)",
  description:
    "Free CIS subcontractor invoice template for UK construction. Labour and materials split, CIS deduction line, plus standard VAT, domestic reverse charge and non-VAT versions. Excel and PDF.",
};

/**
 * `slug` exists only to build the route-unique `data-cta` ids below. It is not
 * rendered and it is not derived from `title`: a copy edit to a card heading
 * must not silently rename a CTA id and split its vw_cta_performance history.
 */
const downloads = [
  {
    slug: "reverse_charge",
    title: "Domestic reverse charge version",
    tag: "Most VAT-registered subcontractors",
    body: "For VAT-registered subcontractors supplying CIS construction services to VAT-registered, CIS-registered customers. Carries the required wording: \"Reverse charge: customer to account for VAT to HMRC\", shows the VAT amount for information and adds no VAT to the amount payable.",
    xlsx: "/downloads/cis-subcontractor-invoice-template-reverse-charge.xlsx",
    pdf: "/downloads/cis-subcontractor-invoice-template-reverse-charge.pdf",
  },
  {
    slug: "standard_vat",
    title: "Standard VAT version",
    tag: "End users and excluded supplies",
    body: "For VAT-registered subcontractors invoicing end users, intermediaries who have confirmed end-user status in writing, or supplies outside the reverse charge (zero-rated work, non-CIS supplies). Adds 20% VAT to the invoice total in the normal way.",
    xlsx: "/downloads/cis-subcontractor-invoice-template-standard-vat.xlsx",
    pdf: "/downloads/cis-subcontractor-invoice-template-standard-vat.pdf",
  },
  {
    slug: "no_vat",
    title: "Non-VAT-registered version",
    tag: "Below the VAT threshold",
    body: "For subcontractors who are not VAT registered. No VAT lines at all: labour and materials split, CIS deduction on labour only, amount payable. If you are not VAT registered, the domestic reverse charge cannot apply to your invoices.",
    xlsx: "/downloads/cis-subcontractor-invoice-template-no-vat.xlsx",
    pdf: "/downloads/cis-subcontractor-invoice-template-no-vat.pdf",
  },
];

const mustShow = [
  ["Labour and materials as separate lines", "The CIS deduction applies to the labour element only. Materials you personally purchased for the job are excluded from the deduction base, so the contractor needs a clear split to deduct the correct amount. Our guide to CIS invoice splitting covers the rules in detail."],
  ["Your UTR number", "The contractor verifies you with HMRC using your Unique Taxpayer Reference. Showing it on every invoice avoids verification delays and the 30% unmatched rate."],
  ["The CIS deduction, shown against labour only", "20% for registered subcontractors, 30% if unregistered, 0% with gross payment status. The deduction is calculated on labour excluding VAT. The template applies the rate you set to the labour subtotal automatically."],
  ["The correct VAT treatment", "Standard VAT, domestic reverse charge wording, or no VAT at all, depending on your registration and the customer. Using the wrong treatment is one of the most common CIS invoicing errors."],
  ["Normal invoice essentials", "Invoice number and date, your business name and address, the customer's details, a description of the work, the site or contract reference, and your payment details."],
];

const faqs = [
  {
    question: "Does a CIS invoice need to split labour and materials?",
    answer:
      "Yes, whenever you have supplied materials. The CIS deduction applies to the labour element only, so the contractor needs the split to calculate the deduction correctly. If the invoice shows one combined figure, many contractors deduct on the full amount, which over-deducts you on every job. On a £2,000 invoice with £1,300 of materials, that error costs £260.",
  },
  {
    question: "Should I show the CIS deduction on my invoice?",
    answer:
      "It is not a legal requirement, but it is good practice and this template includes it. Showing the expected deduction against the labour line makes the amount payable unambiguous, gives the contractor a figure to check against, and creates a paper trail if the deduction on the payment and deduction statement later differs.",
  },
  {
    question: "When does the VAT domestic reverse charge apply to my invoice?",
    answer:
      "Broadly, when all of these are true: the supply is standard or reduced rated construction services within CIS, both you and your customer are VAT registered, the customer is CIS registered, and the customer is not an end user or intermediary who has notified you of that status in writing. When it applies, you do not charge VAT. You state the VAT rate and the reverse charge wording, and the customer accounts for the VAT to HMRC.",
  },
  {
    question: "What wording must a reverse charge invoice include?",
    answer:
      "HMRC requires a clear note that the reverse charge applies and that the customer must account for the VAT, for example: \"Reverse charge: customer to account for VAT to HMRC.\" The invoice must also make clear the VAT rate that applies (usually 20%), even though no VAT is added to the total. The reverse charge version of this template includes both.",
  },
  {
    question: "Is CIS deducted before or after VAT?",
    answer:
      "The CIS deduction is always calculated on amounts excluding VAT. Under a standard VAT invoice, the contractor deducts CIS from the labour element net of VAT, then pays the VAT in full. Under the reverse charge there is no VAT on the invoice anyway, so the calculation is unchanged: deduction rate multiplied by the labour element.",
  },
  {
    question: "Which CIS rate should I use in the template?",
    answer:
      "20% if you are registered for CIS, 30% if you are unregistered or the contractor cannot verify you, and 0% if you hold gross payment status. The Excel version has an editable rate cell that recalculates the deduction and amount payable automatically.",
  },
  {
    question: "Does plant hire go in the labour or materials column?",
    answer:
      "Plant hired from a third party, including fuel and consumables for it, can be treated as materials and excluded from the CIS deduction base under HMRC's CIS 340 guidance. Plant you own cannot be excluded. If in doubt, keep the hire invoice as evidence and show the cost on a materials line.",
  },
];

/** Light-ground secondary, matching /cis-refund's hero secondary. */
const btnLightSecondary =
  `inline-flex min-h-12 items-center justify-center border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 ${focusRing}`;

export default function CisInvoiceTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* Hero. Cream, not the untokenised #1e293b it shipped on: the dark
          grounds on this route are spent on the chrome and the footer, and the
          page has to tail light (DESIGN_SYSTEM section 9). Copy unchanged. */}
      <section className="border-b border-neutral-200 bg-[var(--hero-cream)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "CIS invoice template" }]}
          />
          <Eyebrow>Free download</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            CIS subcontractor invoice template.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            A free UK invoice template built for CIS subcontractors: labour and materials split out, the CIS deduction calculated on labour only, and three VAT versions including the domestic reverse charge wording HMRC requires. Excel and PDF, no email required.
          </p>
          <div className="mt-10">
            <a href="#downloads" className={btnPrimary}>
              Get the templates
            </a>
          </div>
        </div>
      </section>

      {/* Downloads. scroll-mt-24 closes TD-22: this is the target of the hero
          CTA above, under a sticky header with smooth scrolling, so without it
          the heading lands behind the bar. */}
      <section id="downloads" className="scroll-mt-24 border-b border-neutral-200 bg-[var(--surface-elevated)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Downloads</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Three versions. Pick the one that matches your VAT position.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Each Excel file calculates the labour subtotal, materials subtotal, CIS deduction and amount payable for you, with an editable CIS rate cell (20%, 30% or 0%). The PDF versions are print-and-fill.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {downloads.map((d) => (
              <article key={d.title} className="flex flex-col bg-white border border-neutral-200 border-t-4 border-t-[var(--btn-ground)] p-6 sm:p-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">{d.tag}</div>
                <h3 className="mt-2 text-lg font-bold text-neutral-900">{d.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{d.body}</p>
                {/* ADDITIVE ids, one per affordance, on the <a> itself and never
                    on the wrapping card: autoCapture resolves through
                    closest("[data-cta]"), so an id on the <article> would
                    attribute every click in the card, including the body text,
                    to the download (commit 05ddb709). goal="download" is new
                    vocabulary, and it is what the click does: these buttons
                    fetch a file, they do not reach a form or /contact.

                    The six ids these two lines render, written out because the
                    cta-attribute-diff extractor reads the JSX attribute and so
                    records the template literal rather than the values:
                      template_invoice_xlsx_reverse_charge
                      template_invoice_pdf_reverse_charge
                      template_invoice_xlsx_standard_vat
                      template_invoice_pdf_standard_vat
                      template_invoice_xlsx_no_vat
                      template_invoice_pdf_no_vat */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={d.xlsx}
                    download
                    className={btnPrimary}
                    data-cta={`template_invoice_xlsx_${d.slug}`}
                    data-cta-placement="downloads"
                    data-cta-goal="download"
                  >
                    Excel (.xlsx)
                  </a>
                  <a
                    href={d.pdf}
                    download
                    className={btnLightSecondary}
                    data-cta={`template_invoice_pdf_${d.slug}`}
                    data-cta-placement="downloads"
                    data-cta-goal="download"
                  >
                    PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What a CIS invoice must show */}
      <section className="border-b border-neutral-200 bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>What to include</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            What a CIS invoice must show.
          </h2>
          <ul className="mt-10 space-y-3">
            {mustShow.map(([title, body], i) => (
              <li key={title} className="flex items-start gap-4 border border-neutral-200 bg-white p-5 sm:p-6">
                {/* --btn-ground, not orange-500: the numeral carries information,
                    so the 3:1 graphics floor applies and #f97316 measures 2.80
                    behind a white glyph (DESIGN_DELTA section 1). */}
                <div className="h-8 w-8 flex items-center justify-center bg-[var(--btn-ground)] text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-neutral-600">
            For the full rules on the labour and materials split, including plant hire and what counts as materials, read our guide to{" "}
            <Link href="/blog/cis-basics/cis-invoice-splitting-labour-materials" className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--btn-ground-hover)] transition-colors ${focusRing}`}>
              CIS invoice splitting
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Reverse charge summary */}
      <section className="border-b border-neutral-200 bg-[var(--surface-elevated)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Reverse charge rules</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The VAT domestic reverse charge, in short.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                heading: "When it applies",
                body: "Standard or reduced rated construction services within CIS, supplied by a VAT-registered subcontractor to a VAT-registered, CIS-registered customer who is not an end user. Since March 2021 this covers most subcontractor-to-contractor invoicing in the supply chain.",
              },
              {
                heading: "What changes on the invoice",
                body: "You do not add VAT to the amount payable. Instead the invoice states the applicable VAT rate and carries the wording \"Reverse charge: customer to account for VAT to HMRC\". The customer declares the VAT on their own return and usually recovers it on the same return.",
              },
              {
                heading: "What does not change",
                body: "The CIS deduction. It is always calculated on the labour element excluding VAT, so the reverse charge changes who accounts for the VAT, not how the CIS deduction works. Labour and materials are still split in exactly the same way.",
              },
            ].map((item) => (
              <div key={item.heading} className="bg-white border border-neutral-200 border-t-4 border-t-[var(--btn-ground)] p-6 sm:p-8">
                <h3 className="text-lg font-bold text-neutral-900">{item.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-neutral-600">
            Full guides:{" "}
            <Link href="/blog/vat-and-mtd/vat-reverse-charge-for-cis-subcontractors" className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--btn-ground-hover)] transition-colors ${focusRing}`}>
              the reverse charge for subcontractors
            </Link>
            ,{" "}
            <Link href="/blog/vat-and-mtd/vat-reverse-charge-for-cis-contractors" className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--btn-ground-hover)] transition-colors ${focusRing}`}>
              for contractors receiving invoices
            </Link>
            , and{" "}
            <Link href="/blog/vat-and-mtd/vat-reverse-charge-construction" className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--btn-ground-hover)] transition-colors ${focusRing}`}>
              how the construction reverse charge works
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ. Hand-rolled <details>, the same markup the homepage and the
          sibling template page use, and deliberately NOT the kit FaqSection:
          that component wraps answers in a Radix AccordionContent with no
          forceMount, so a closed answer leaves the server HTML entirely, while
          buildFaqJsonLd above keeps asserting it. <details> is crawlable
          closed. Same `faqs` array feeds both, so markup and schema cannot
          drift. */}
      <section className="border-b border-neutral-200 bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            CIS invoicing questions, answered.
          </h2>
          <div className="mt-10 space-y-3 sm:space-y-4 max-w-3xl">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border border-neutral-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-bold text-neutral-900 hover:text-[var(--btn-ground-hover)] transition-colors list-none marker:content-none">
                  <span>{faq.question}</span>
                  <span
                    className="flex-shrink-0 text-[var(--accent-strong)] transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-neutral-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-neutral-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section D.3 closing ask. This was a full-bleed #1e293b band and so the
          last opaque band under <main>, running straight into the slate-900
          footer: 1 of the 29 routes in the DESIGN_DELTA 3a.1 breach. `contained`
          renders the panel on --hero-cream, so the tail is --surface (FAQ),
          cream (panel), navy (footer). The same LeadForm is inside the panel, so
          no capture is lost, and the heading, the body and the form title are
          this page's own published strings rather than the component defaults
          ("Free consultation" / "Book your free call"), which would publish new
          copy through a default prop. Static band in the page body: nothing
          interruptive. The wrapper carries NO data-cta (05ddb709). */}
      <LeadCTAPanel
        contained
        eyebrow="Beyond the template"
        title="Over-deducted on past invoices?"
        description="If contractors have been deducting CIS from your materials, or from your full invoice value, the excess is recoverable. We review your deduction statements, correct the position and claim back what you are owed."
        formTitle="Ask about a CIS review"
        submitLabel="Request a callback"
        proofPoints={[
          {
            title: "The deduction applies to labour only",
            detail: "Materials you purchased for the job are excluded from the deduction base.",
          },
          {
            title: "We read the deduction statements, not just the invoices",
            detail: "The over-deduction shows up in what the contractor actually paid.",
          },
          {
            title: "A specialist CIS accountant will be in touch",
            detail: "Not a sales team, not a call centre.",
          },
        ]}
        footnote={
          <>
            See our{" "}
            <Link
              href="/cis-refund"
              className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 ${focusRing}`}
            >
              CIS refund service
            </Link>
            .
          </>
        }
      />
    </>
  );
}
