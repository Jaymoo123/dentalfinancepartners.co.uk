/**
 * Additive resource-gate island for Medical Accountants UK calculator pages.
 *
 * Resolves the topic from the calculator slug, then POINTS AT the topic's guide
 * and workbook below the calculator. The existing calculator stays the indexable
 * hero: this never touches its server-rendered copy, H1, explainer or schema.
 *
 * It used to mount the ResourceGate form here. It no longer does, decided
 * 2026-09-11 on the numbers rather than on the layout rule. Phase 4 gives every
 * calculator page a LeadCTAPanel and a skippable result gate, which would have
 * made three asks on one page, against a standard of one form per page. The
 * gate's own record: ONE lead in five months (Supabase `leads`, source=medical,
 * extras.resource_gate, non-test: 1 row, 2026-08-19, against 25 leads total and
 * 22 of those from /contact). Nothing is withheld by removing it, because
 * /resources/<topic> serves the same workbook and the same guide, and email
 * delivery was never wired (RESOURCE_EMAIL_DELIVERY_ENABLED = false), so the
 * form's only function was to collect an address before handing over a file it
 * hands over anyway. Re-mounting it is a two-line revert.
 *
 * When no enabled asset exists for the topic, this renders nothing, so calculator
 * pages are unchanged until a resource is onboarded.
 *
 * Mount once in src/app/calculators/[slug]/page.tsx after <CalculatorClient slug={slug}>.
 * Medical uses a single dynamic [slug] route (no per-slug static pages), so this is
 * a single wiring point.
 *
 * TOKEN HARDENING: no var(--primary), no orange-*, no emerald-*.
 * The label eyebrow chip uses bg-[var(--navy)] text-[var(--copper)].
 *
 * FLAT routing: Medical uses flat blog routing; calc pages do NOT have this concern
 * (they use the slug directly via topicForCalcSlug).
 */
import Link from "next/link";
import { topicForCalcSlug, getTopic } from "@/lib/intent/taxonomy";
import { hasEnabledResource, isXlsxEnabled, resourceForTopic } from "@/lib/resources/registry";

export function CalculatorPageResources({
  slug,
  pageTitle,
}: {
  slug: string;
  pageTitle?: string;
}) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;

  const hasGate = hasEnabledResource(topic);
  if (!hasGate) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  // The /resources/<topic> guide used to be reachable only from the gate's
  // post-submit success state. With the gate gone this block IS the crawlable
  // inbound link to it, and to the workbook. Guarded on slug === topic so an
  // ALIASED guide (gp-tax points at the locum guide) is never offered under a
  // mismatched heading.
  const resource = resourceForTopic(topic);
  const guide = resource?.guide;
  /* The workbook needs the SAME alias guard as the guide, and an adversarial
     review caught that it did not have one. The gp-practice record borrows the
     LOCUM workbook and the LOCUM guide (registry.ts:125,130), so three
     calculators rendered their own specialism in the heading and then offered
     a locum spreadsheet underneath it. The guide was already suppressed by the
     slug check; the workbook was not, because an XlsxAsset carries no slug.
     Its own topic is in its path, so compare on that. Suppress rather than
     mislabel: the right answer is no spreadsheet, not somebody else's. */
  const asset = resource && isXlsxEnabled(resource) ? resource.xlsx : null;
  const xlsx = asset && asset.file.startsWith(`/resources/${topic}/`) ? asset : null;
  const ownGuide = guide && guide.enabled && guide.slug === topic ? guide : null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <span className="inline-block bg-[var(--navy)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--copper)]">
          Go deeper
        </span>
        <p className="text-sm font-semibold text-[var(--ink-soft)]">
          Get the full {label} model and guide
        </p>
      </div>
      {ownGuide && (
        <p className="mt-2 text-sm text-[var(--muted)]">
          Prefer to read first? The{" "}
          <Link
            href={`/resources/${ownGuide.slug}`}
            className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4"
          >
            {ownGuide.label}
          </Link>{" "}
          is free to read, with no email needed.
        </p>
      )}
      {xlsx && (
        <p className="mt-2 text-sm text-[var(--muted)]">
          The{" "}
          <a
            href={xlsx.file}
            download
            className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4"
          >
            {xlsx.label}
          </a>{" "}
          is a spreadsheet you can download and run on your own figures.
        </p>
      )}
    </div>
  );
}

// Re-exported as default for convenience.
export { CalculatorPageResources as default };
