import type { FaqEntry } from "@/lib/faq-page-schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/page-blocks";

/**
 * Q&A accordion used by the topic and service pages. Pair it with
 * buildFaqPageJsonLd() in the page so the markup and the schema stay in sync.
 *
 * Matches the homepage FAQ treatment: single-open, collapsible.
 */
export function FaqSection({
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  faqs,
  className = "bg-white py-12 sm:py-16 lg:py-20",
  tone = "slate",
  html = false,
  headingId,
}: {
  eyebrow?: string;
  title?: string;
  faqs: FaqEntry[];
  className?: string;
  /** Card surface. Use "white" when the section itself sits on slate-50. */
  tone?: "slate" | "white";
  /** `answer` is already-sanitised HTML (writer copy with inline links), not
   *  plain text. Every existing caller omits this and is unaffected. */
  html?: boolean;
  /** Stable anchor on the H2 so the section can be cited by URL fragment. */
  headingId?: string;
}) {
  const itemSurface = tone === "white" ? "bg-white" : "bg-slate-50";
  return (
    <section className={className}>
      <div className={siteContainerLg}>
        {eyebrow ? (
          <Eyebrow>{eyebrow}</Eyebrow>
        ) : null}
        <h2 id={headingId} className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8 sm:mb-12 scroll-mt-24">{title}</h2>
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.question} value={`faq-${idx}`} className={itemSurface}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {html ? <p dangerouslySetInnerHTML={{ __html: faq.answer }} /> : <p>{faq.answer}</p>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
