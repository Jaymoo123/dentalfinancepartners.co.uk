/**
 * Hospitality Tax's configuration for the shared floating help widget.
 *
 * The widget itself, the intent provider, the journey model, the route parser
 * and the personalisation engine live in the kit
 * (`@accounting-network/web-shared/support`). THIS file is everything that is
 * this site's: the taxonomy wiring, the route families, the openers, every
 * visitor-facing string, the class recipes, the `hfp` storage prefix, the lead
 * source and the submit client. This site is the SECOND consumer of the kit
 * module; startups-tech was the first.
 *
 * Deltas from the kit defaults:
 * - Buttons and the launcher sit on the primary-600 step with a 700 hover, not
 *   the kit default 700/800. 600 is the brand step and the LOCKED button ground
 *   on this site (globals.css --btn-ground/-hover/-active = 600/700/800, white
 *   label 5.09 / 7.08 / 9.93).
 * - `focusRing` is this site's local recipe from components/ui/layout-utils
 *   (outline-[var(--focus-ring)]); the kit's `outline-primary-*` literals are
 *   banned here by src/tests/focus-ring.test.ts.
 * - Storage prefix `hfp`, matching AnalyticsProvider's storagePrefix in
 *   app/layout.tsx: hfp_assistant_autoopened, hfp_assistant_active, hfp_journey.
 * - Submit is submitSiteLead with captureMode "email_only".
 * - `source` is niche.content_strategy.source_identifier, the same value
 *   components/forms/LeadForm.tsx sends. No rival source key is introduced.
 * - Bottom offset stays the kit default bottom-4: there is no sticky bar on
 *   this site (owner ruling 2026-09-29). The kit lifts the launcher above the
 *   footer by transform.
 * - Header ground is the kit default primary-950 with `.ground-dark`, inside
 *   which this site's globals.css rebinds --focus-ring to white.
 *
 * `formId` is "specialist_widget" and the launcher carries
 * data-cta="specialist_widget", byte-identical to the rest of the estate,
 * because the estate analytics views key on it.
 */
import type {
  IntentOffer,
  WidgetConfig,
} from "@accounting-network/web-shared/support/types";
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
 * Everything else (the homepage, /about, /contact, /book, the bare index
 * routes) has no topic and the widget falls back to its generic opener.
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

/** This site's journey model instance (sessionStorage key `hfp_journey`). */
export const journey = createJourneyModel({
  storageKey: "hfp_journey",
  deriveTopic,
});

/* ------------------------------------------------------------------ offers
 * Offer copy for the personalisation engine. No surface on this site consumes
 * evaluate() today (owner ruling 2026-09-29: the help widget is the only
 * mounted surface, and it reads the journey model directly), so none of this
 * copy reaches a visitor. It is kept so a later yes to a hero CTA, sticky CTA,
 * next-step card, deep-scroll modal or returning bar needs no re-derivation.
 * Every href is a live route on this site: the three calculators and /contact.
 */
function toolOffer(topicKey: string): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t || !t.primaryCalculator) return null;
  const label = t.label.toLowerCase();
  return {
    kind: "tool",
    title: t.ctaCopy,
    blurb: `Run your own numbers on ${label} in a couple of minutes.`,
    href: `/calculators/${t.primaryCalculator}`,
    reason: "Most-used tool for this topic",
  };
}

function reviewOffer(
  topicKey: string,
  reason = "You have spent real time on this. A quick look will confirm where you stand",
): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t) return null;
  return {
    kind: "specialist",
    title: t.ctaCopy,
    blurb: "A no-obligation look at your position with a hospitality accountant.",
    href: "/contact",
    reason,
  };
}

function specialistOffer(topicKey: string): IntentOffer {
  const t = getTopic(topicKey);
  const label = (t?.label ?? "your hospitality tax").toLowerCase();
  return {
    kind: "specialist",
    title: "Speak to a hospitality accountant",
    blurb: `Get your ${label} position checked by a hospitality accountant.`,
    href: "/contact",
    reason: "You have spent real time here. An accountant can confirm your position",
  };
}

/* ------------------------------------------------------------- the config */

export const widgetConfig: WidgetConfig = {
  storagePrefix: "hfp",
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
    // 600 ground with a 700 hover: this site's locked button steps.
    primaryButton: `w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 ${focusRing}`,
    submitButton: `w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 ${focusRing}`,
    launcher: `relative flex h-[52px] w-[12.5rem] shrink-0 items-center justify-center gap-2 rounded-full bg-primary-600 px-4 text-sm font-semibold text-white shadow-2xl hover:bg-primary-700 ${focusRing}`,
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
