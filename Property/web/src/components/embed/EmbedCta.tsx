/**
 * Lead-driving CTA shown only inside the embeddable (iframe) variant of a
 * calculator. The on-page variant keeps its own page-level CTA / LeadForm, so
 * EmbedCta is rendered only when variant === "embed" by each calculator. Links
 * to /contact with embed UTM tags so leads originating from a partner embed are
 * attributable in analytics.
 */
export function EmbedCta({ campaign, label }: { campaign: string; label?: string }) {
  const href = `https://www.propertytaxpartners.co.uk/contact?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${campaign}`;
  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="inline-flex w-full items-center justify-center bg-emerald-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white border-b-4 border-emerald-800 hover:bg-emerald-700 active:border-b-2 active:translate-y-0.5 transition-colors"
      >
        {label ?? "Speak to a specialist property accountant →"}
      </a>
    </div>
  );
}
