import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";
import { siteContainerLg } from "@/components/ui/layout-utils";

/**
 * Closing conversion panel: the pitch on the left, the real LeadForm on the
 * right. Mirrored locally from Property/web/src/components/property/LeadCTAPanel.tsx
 * rather than imported from the kit, because the kit equivalents hardcode
 * Property's copy with no prop to override it (playbook trap 12).
 *
 * The point of embedding the form rather than linking to /contact is that it
 * removes a click: the reader converts where they finished reading.
 *
 * NOT an interruptive surface. It is a static band in the page body: no
 * overlay, no timer, no trigger, no dismissal, nothing that fires on its own.
 * Adding an interruptive surface needs the owner's explicit yes.
 */
export function LeadCTAPanel({
  eyebrow = "Free consultation",
  title,
  description,
  proofPoints,
  formTitle = "Book your free call",
  submitLabel = "Request a callback",
  footnote,
  contained = false,
  redirectOnSuccess = true,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  proofPoints: { title: string; detail: string }[];
  formTitle?: string;
  submitLabel?: string;
  footnote?: ReactNode;
  /**
   * Renders the panel as a light band (cream section, white card) instead of
   * the full-bleed navy one. Use it where the navy band would be the last
   * band before the navy footer: DESIGN_SYSTEM.md section 9, navy must never
   * touch navy.
   */
  contained?: boolean;
  redirectOnSuccess?: boolean;
}) {
  if (contained) {
    return (
      <section className="bg-[var(--hero-cream)] py-12 sm:py-20 lg:py-24">
        <div className={siteContainerLg}>
          <PanelBody
            eyebrow={eyebrow}
            title={title}
            description={description}
            proofPoints={proofPoints}
            formTitle={formTitle}
            submitLabel={submitLabel}
            footnote={footnote}
            redirectOnSuccess={redirectOnSuccess}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[var(--dark)]">
      <TradeBackdrop tone="navy" />
      <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
        <PanelBody
          dark
          eyebrow={eyebrow}
          title={title}
          description={description}
          proofPoints={proofPoints}
          formTitle={formTitle}
          submitLabel={submitLabel}
          footnote={footnote}
          redirectOnSuccess={redirectOnSuccess}
        />
      </div>
    </section>
  );
}

/**
 * Shared inner layout, so the navy and the light variant cannot drift. Only the
 * text and badge colours change. Every colour is a token:
 *   light: .eyebrow default --accent-strong on --hero-cream 4.95; neutral-900
 *          heading 17.14; neutral-600 body 7.47; badge --accent-strong on
 *          --accent-whisper 4.88.
 *   dark:  --highlight-on-dark 10.59 on --dark; white heading 17.85;
 *          neutral-300 body 12.04; neutral-200 footnote 14.17.
 * LeadForm renders on a white card on both variants: its labels are ink on
 * white, which is the only ground it is safe on.
 */
function PanelBody({
  eyebrow,
  title,
  description,
  proofPoints,
  formTitle,
  submitLabel,
  footnote,
  redirectOnSuccess,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  proofPoints: { title: string; detail: string }[];
  formTitle: string;
  submitLabel: string;
  footnote?: ReactNode;
  redirectOnSuccess: boolean;
  dark?: boolean;
}) {
  return (
    <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div>
        {/* Two literal spellings on purpose, not one conditional className: the
            .eyebrow contrast guard (src/tests/design/eyebrow-ground.test.ts)
            enumerates occurrences by grepping for the literal eyebrow className
            string, so a template-string className would be invisible to it. Note
            the grep has no comment filter, so this note avoids writing that
            literal out. On dark the
            on-dark step is mandatory (the bare default measures ~3.43 there). */}
        {dark ? (
          <p className="eyebrow text-orange-400">{eyebrow}</p>
        ) : (
          <p className="eyebrow">{eyebrow}</p>
        )}
        <h2
          className={`mt-3 text-2xl font-bold tracking-tight sm:text-4xl ${
            dark ? "text-white" : "text-neutral-900"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-4 text-lg leading-relaxed sm:mt-6 sm:text-xl ${
            dark ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          {description}
        </p>
        <ul className="mt-8 space-y-4">
          {proofPoints.map((point) => (
            <li key={point.title} className="flex items-center gap-4">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${
                  dark
                    ? "bg-white/5 text-[var(--highlight-on-dark)] ring-white/15"
                    : "bg-[var(--accent-whisper)] text-[var(--accent-strong)] ring-[var(--accent)]/20"
                }`}
              >
                <Check aria-hidden className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span>
                <span className={`block font-bold ${dark ? "text-white" : "text-neutral-900"}`}>
                  {point.title}
                </span>
                <span className={`block text-sm ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
                  {point.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
        {footnote ? (
          <p
            className={`mt-6 max-w-md text-sm leading-relaxed ${
              dark ? "text-neutral-200" : "text-neutral-600"
            }`}
          >
            {footnote}
          </p>
        ) : null}
      </div>

      <div className="rounded-xl bg-white p-6 ring-1 ring-neutral-200 sm:p-8 lg:p-10">
        <h3 className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl">{formTitle}</h3>
        <LeadForm submitLabel={submitLabel} redirectOnSuccess={redirectOnSuccess} />
      </div>
    </div>
  );
}
