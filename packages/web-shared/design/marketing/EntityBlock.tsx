import { siteContainerLg } from "../layout-utils";
import { Eyebrow, Prose } from "../primitives/page-blocks";

/**
 * The live consent wording (Property/web/src/config/site.ts:39, leadConsentText),
 * verbatim minus its trailing confirmation sentence. Reused wherever a page
 * needs to state the partner-network model in prose rather than at a form.
 */
export const PARTNER_NETWORK_SENTENCE =
  "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose.";

export type EntityCopy = {
  firm: string;
  serves: string;
  where: string;
  howItWorks: string[];
  next: string;
  notWhatWeAre: string;
};

/**
 * Plain-language "who is this" block for a `for/[slug]` segment page, sat
 * before the FAQ. Six labelled parts, semantic HTML only, no icons or images
 * and no new card styling: a model reading the page (or a person skimming it)
 * gets the entity, the scope and the boundary in one place.
 *
 * Renders nothing when `entity` is undefined, so it is safe to spread onto a
 * page before every site's `niche.config.json` carries the `entity` key.
 */
export function EntityBlock({
  firm,
  serves,
  where,
  howItWorks,
  next,
  notWhatWeAre,
  className = "bg-slate-50 py-12 sm:py-16 lg:py-20",
}: EntityCopy & { className?: string }) {
  return (
    <section aria-labelledby="entity-block-eyebrow" className={className}>
      <div className={siteContainerLg}>
        <Eyebrow>
          <span id="entity-block-eyebrow">About this service</span>
        </Eyebrow>

        <h2 className="text-base font-bold text-slate-900 sm:text-lg">Who we are</h2>
        <Prose>
          <p>{firm}</p>
        </Prose>

        <h2 className="mt-8 text-base font-bold text-slate-900 sm:text-lg">Who this is for</h2>
        <Prose>
          <p>{serves}</p>
        </Prose>

        <h2 className="mt-8 text-base font-bold text-slate-900 sm:text-lg">Where we work</h2>
        <Prose>
          <p>{where}</p>
        </Prose>

        <h2 className="mt-8 text-base font-bold text-slate-900 sm:text-lg">How it works</h2>
        <Prose>
          <ol className="list-decimal space-y-2 pl-5">
            {howItWorks.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Prose>

        <h2 className="mt-8 text-base font-bold text-slate-900 sm:text-lg">What happens next</h2>
        <Prose>
          <p>{next}</p>
        </Prose>

        <h2 className="mt-8 text-base font-bold text-slate-900 sm:text-lg">What we are not</h2>
        <Prose>
          <p>{notWhatWeAre}</p>
        </Prose>
      </div>
    </section>
  );
}
