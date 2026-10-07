/**
 * Pharmacy Tax's configuration for the shared capture layer.
 *
 * The widget, the intent provider, the journey model, the route parser and the
 * personalisation engine all live in the kit
 * (`@accounting-network/web-shared/support`). THIS file is everything that is
 * this site's: the taxonomy wiring, the route families, the openers, every
 * visitor-facing string, the class recipes, the `pfp` storage prefix, the lead
 * source and the submit client.
 *
 * Worked example followed: startups-tech/web/src/lib/intent/widget-config.ts.
 * The session plan named `config/support.ts`; the plan's own §E.1 row 5 says to
 * follow the worked example, so the config lives here (W7 receipt records it).
 *
 * Deltas from the kit defaults, all recorded in the W7 receipt:
 * - This site's own `focusRing` from components/ui/layout-utils (the kit's
 *   `outline-primary-*` literals are banned by src/tests/focus-ring.test.ts).
 * - `container` overridden to `bottom-24`: this site DOES mount a sticky bar,
 *   so the kit default `bottom-4` would put the launcher behind it. Same value
 *   generalist uses for the same reason (generalist SpecialistWidget.tsx:346).
 * - Storage prefix `pfp`, matching AnalyticsProvider's storagePrefix in
 *   app/layout.tsx: pfp_assistant_autoopened, pfp_assistant_active, pfp_journey.
 *   Never `phfp` (P0-E §0.1): a new prefix orphans existing local state.
 * - Submit is submitSiteLead with captureMode "email_only" and role "Other"
 *   (api/leads/submit/route.ts:71 defaults role to "Other"; the six configured
 *   role options are all self-declared and the widget asks for none of them).
 * - `leadSource` is niche.content_strategy.source_identifier = "pharmacies",
 *   the same value components/forms/LeadForm.tsx sends. No rival source key.
 *
 * `formId` is "specialist_widget" and the launcher carries
 * data-cta="specialist_widget", byte-identical to Property and generalist,
 * because the estate analytics views key on it.
 */
import type { IntentOffer, WidgetConfig } from "@accounting-network/web-shared/support/types";
import { createJourneyModel } from "@accounting-network/web-shared/support/journeyModel";
import { makeDeriveTopic } from "@accounting-network/web-shared/support/deriveTopic";
import { defaultWidgetClasses } from "@accounting-network/web-shared/support/classes";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { focusRing } from "@/components/ui/layout-utils";
import { submitSiteLead } from "@/lib/leads/submit-client";
import {
  getTopic,
  topicForBlogSlug,
  topicForCalcSlug,
  topicForServiceSlug,
  topicForHubSlug,
  topicForResearchSlug,
} from "./taxonomy";
import { ruleLabel } from "./labels";
import { pickOpener, exitOpener, frictionOpener } from "@/lib/assistant/opener";

export const SPECIALIST_WIDGET_FORM_ID = "specialist_widget";

/**
 * Route families for this site:
 *   /blog/<category>/<slug>  -> blog category slug
 *   /blog/<category>         -> blog category slug (index)
 *   /calculators/<slug>      -> calculator slug
 *   /embed/<slug>            -> calculator slug
 *   /services/<slug>         -> service slug
 *   /for/<slug>              -> audience hub slug
 *   /research/<slug>         -> research page slug
 * Everything else (homepage, /contact, /about, the bare index routes) has no
 * topic and every surface falls back to its generic version. There is no
 * /research hub route on this site (P0-E §2) and none is invented here.
 */
export const ROUTE_RULES = [
  { segments: ["blog"], lookup: topicForBlogSlug },
  { segments: ["calculators", "embed"], lookup: topicForCalcSlug },
  { segments: ["services"], lookup: topicForServiceSlug },
  { segments: ["for"], lookup: topicForHubSlug },
  { segments: ["research"], lookup: topicForResearchSlug },
];

/** Route-derived topic for this site. Exported for the taxonomy tests. */
export const deriveTopic = makeDeriveTopic(ROUTE_RULES);

/** This site's journey model instance (sessionStorage key `pfp_journey`). */
export const journey = createJourneyModel({
  storageKey: "pfp_journey",
  deriveTopic,
});

/* ------------------------------------------------------------------ offers
 * Offer copy for the personalisation engine, read by the sticky bar, the
 * returning bar, the deep-scroll modal and the next-step card through the kit's
 * evaluate(). Every sentence here is visitor-facing and is listed verbatim in
 * the W7 receipt. `label` is already lower-case in the taxonomy so it reads
 * inside a sentence; it is never re-cased here, because "NHS" must survive.
 */
function toolOffer(topicKey: string): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t || !t.primaryCalculator) return null;
  return {
    kind: "tool",
    title: t.ctaCopy,
    blurb: `Run your own numbers on ${t.label} in a couple of minutes.`,
    href: `/calculators/${t.primaryCalculator}`,
    reason: "Most-used tool for this topic",
  };
}

function reviewOffer(
  topicKey: string,
  reason = "You have spent real time on this. A quick look will confirm where you stand.",
): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t) return null;
  return {
    kind: "specialist",
    title: t.ctaCopy,
    blurb: "A no-obligation look at your position with a pharmacy accountant.",
    href: "/contact",
    reason,
  };
}

function specialistOffer(topicKey: string): IntentOffer {
  const t = getTopic(topicKey);
  return {
    kind: "specialist",
    title: "Speak to a pharmacy accountant",
    blurb: `Get your position on ${t?.label ?? "pharmacy tax"} checked by a pharmacy accountant.`,
    href: "/contact",
    reason: "You have spent real time here. An accountant can confirm your position",
  };
}

/* ------------------------------------------------------------- the config */

export const widgetConfig: WidgetConfig = {
  storagePrefix: "pfp",
  formId: SPECIALIST_WIDGET_FORM_ID,
  ctaId: SPECIALIST_WIDGET_FORM_ID,
  leadSource: niche.content_strategy.source_identifier,
  hiddenOnPaths: ["/embed", "/admin"],
  routeRules: ROUTE_RULES,
  getTopic,
  journey,
  openers: { pick: pickOpener, exit: exitOpener, friction: frictionOpener },
  engine: {
    getTopic,
    offers: {
      tool: toolOffer,
      review: reviewOffer,
      specialist: specialistOffer,
      returningReason: "Pick up where you left off. Get your position looked at",
    },
  },
  ruleLabel,
  calculatorHrefPrefix: "/calculators/",
  contactHref: "/contact",
  privacyHref: "/privacy-policy",
  submitLead: (payload, honeypot) =>
    submitSiteLead({ ...payload, role: "Other" }, honeypot),
  classes: {
    ...defaultWidgetClasses(focusRing),
    // The sticky bar occupies the bottom of the viewport on this site.
    container: "fixed bottom-24 right-4 z-[55] print:hidden",
  },
  copy: {
    launcherLabel: "Ask an accountant",
    closeLabel: "Close",
    headerTitle: siteConfig.name,
    headerSubtitle: "We reply within 24 hours",
    closeAriaLabel: "Close",
    dismissAriaLabel: "Dismiss",
    calculatorChip: "See your numbers",
    contactChip: niche.cta.sticky_button,
    askButton: "Ask an accountant",
    submitButton: "Send to an accountant",
    submitButtonLoading: "Sending...",
    emailPlaceholder: niche.lead_form.placeholders.email,
    emailAriaLabel: "Your email",
    questionPlaceholder: "Your question for an accountant",
    questionAriaLabel: "Your question",
    emailError: "Enter a valid email address.",
    questionError: "Add a short message so the accountant knows how to help.",
    genericError: "Something went wrong. Please try again.",
    successMessage:
      "Thanks, we have your message. One of our accountants will reply by email within 24 hours. Please keep an eye on your inbox, and your spam or junk folder, so the reply is not missed.",
    consentPrefix: siteConfig.leadConsentText,
  },
};
