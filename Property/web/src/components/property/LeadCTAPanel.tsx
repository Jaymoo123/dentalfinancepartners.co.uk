import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Eyebrow } from "@/components/ui/page-blocks";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { siteContainerLg } from "@/components/ui/layout-utils";

type ProofPoint = { title: string; detail: string };

/**
 * Closing conversion panel: pitch on the left, the real lead form on the right.
 * Lifted from the homepage's "Get started" block so the two pages share one
 * implementation instead of two that drift.
 *
 * The point of embedding the form rather than linking to /contact is that it
 * removes a click from the funnel: the reader converts where they finished
 * reading, at the moment the argument has landed.
 */
export function LeadCTAPanel({
  eyebrow = "Free consultation",
  title,
  description,
  proofPoints,
  formTitle = "Book your free consultation",
  submitLabel = "Request callback",
  footnote,
  contained = false,
  ground = "slate",
  redirectOnSuccess = true,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  proofPoints: ProofPoint[];
  formTitle?: string;
  submitLabel?: string;
  footnote?: ReactNode;
  /**
   * Renders a light grey card inset on a slate-50 section instead of the
   * full-bleed navy band. Use it where a navy panel would run into the navy
   * footer, or sit directly under the navy testimonial band: two dark fields
   * with no light between them read as one undifferentiated slab.
   */
  contained?: boolean;
  /**
   * Section ground behind the contained card. Flip it to "white" where the
   * preceding section is already slate-50, so the panel still reads as its own
   * band instead of merging with what is above it. Ignored when not contained.
   */
  ground?: "slate" | "white";
  /**
   * Passed straight to `LeadForm`. The calculator pages set it false: a reader
   * who has just entered their figures should keep their result on screen
   * rather than be thrown to /thank-you, which loses the very thing they came
   * for. Everywhere else the redirect is worth having, because the thank-you
   * page offers the slot picker at the highest-intent moment.
   */
  redirectOnSuccess?: boolean;
}) {
  if (contained) {
    return (
      <section className={`py-12 sm:py-16 lg:py-20 ${ground === "white" ? "bg-white" : "bg-slate-50"}`}>
        <div className={siteContainerLg}>
          <div className="rounded-xl bg-slate-100 p-6 ring-1 ring-slate-200 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)] sm:p-10 lg:p-14">
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
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-900">
      <HeroBrickBackdrop />
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
 * Shared inner layout, so the navy and grey variants cannot drift. Only the
 * text and icon-badge colours change: on grey the badges use the site's
 * light-surface treatment (emerald-50 / emerald-600 / ring emerald-100).
 *
 * The eyebrow is the shared `Eyebrow` block, not a local one. It used to be a
 * hand-rolled legacy label (bold, widest tracking, saturated emerald on the
 * text) which read louder than the equivalent label on the homepage — the
 * panel is otherwise the homepage's own block, so the two have to match.
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
  proofPoints: ProofPoint[];
  formTitle: string;
  submitLabel: string;
  footnote?: ReactNode;
  redirectOnSuccess: boolean;
  dark?: boolean;
}) {
  return (
    <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div>
        <Eyebrow onDark={dark}>{eyebrow}</Eyebrow>
        <h2 className={`text-2xl font-bold sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
        <p
          className={`mt-4 text-lg leading-relaxed sm:mt-6 sm:text-xl ${dark ? "text-slate-200" : "text-slate-600"}`}
        >
          {description}
        </p>
        <ul className="mt-8 space-y-4">
          {proofPoints.map((point) => (
            <li key={point.title} className="flex items-center gap-4">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${
                  dark
                    ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                    : "bg-emerald-50 text-emerald-600 ring-emerald-100"
                }`}
              >
                <Check aria-hidden className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span>
                <span className={`block font-bold ${dark ? "text-white" : "text-slate-900"}`}>{point.title}</span>
                <span className={`block text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{point.detail}</span>
              </span>
            </li>
          ))}
        </ul>
        {footnote && (
          <p className={`mt-6 max-w-md text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {footnote}
          </p>
        )}
      </div>

      <div
        className={`rounded-xl bg-white p-6 sm:p-8 lg:p-10 ${dark ? "" : "ring-1 ring-slate-200 shadow-sm"}`}
      >
        <h3 className="mb-4 text-xl font-bold text-slate-900 sm:mb-6 sm:text-2xl">{formTitle}</h3>
        <LeadForm submitLabel={submitLabel} redirectOnSuccess={redirectOnSuccess} />
      </div>
    </div>
  );
}
