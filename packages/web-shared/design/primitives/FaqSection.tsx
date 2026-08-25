import type { FaqEntry } from "../../schema/faq-page";
import { siteContainerLg } from "../layout-utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { Eyebrow } from "./page-blocks";

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
}: {
  eyebrow?: string;
  title?: string;
  faqs: FaqEntry[];
  className?: string;
  /** Card surface. Use "white" when the section itself sits on slate-50. */
  tone?: "slate" | "white";
}) {
  const itemSurface = tone === "white" ? "bg-white" : "bg-slate-50";
  return (
    <section className={className}>
      <div className={siteContainerLg}>
        {eyebrow ? (
          <Eyebrow>{eyebrow}</Eyebrow>
        ) : null}
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8 sm:mb-12">{title}</h2>
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.question} value={`faq-${idx}`} className={itemSurface}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
