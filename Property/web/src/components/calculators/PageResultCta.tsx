/**
 * Lead CTA shown after a result on the on-page (non-embed) calculator variant,
 * for placements that DON'T already have their own lead form below the tool —
 * chiefly the homepage, where the calculators otherwise dead-end with nowhere to
 * go after a result. Routes to /contact (same origin) and is tagged
 * data-cta-goal="form" so the funnel counts it as a form-bound CTA. Dedicated
 * calculator pages keep their own expert-help form, so they leave this off; the
 * embed variant uses EmbedCta instead.
 */
export function PageResultCta({ campaign, label }: { campaign: string; label?: string }) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <a
        href="/contact"
        data-cta={`calc_result_${campaign}`}
        data-cta-placement="calc_result"
        data-cta-goal="form"
        className="inline-flex w-full items-center justify-center bg-emerald-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white border-b-4 border-emerald-800 hover:bg-emerald-700 active:border-b-2 active:translate-y-0.5 transition-colors"
      >
        {label ?? "Talk to a specialist property accountant →"}
      </a>
    </div>
  );
}
