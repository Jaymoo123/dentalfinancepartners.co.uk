/**
 * @accounting-network/web-shared/support -- types
 *
 * ONE implementation of the floating help widget for the estate. Everything
 * that differs between sites arrives through `WidgetConfig`, injected once at
 * the mount (`<IntentProvider config={...}>`). Nothing in this module hardcodes
 * a brand colour, a hex value, a storage prefix, a route or a sentence of
 * visitor-facing copy, with one declared exception: the privacy-link sentence
 * fragment ("See our " / "Privacy Policy" / ".") rendered under the composer,
 * which is identical on every site in the estate and is paired byte-for-byte
 * with the `consent_text` written to the lead row.
 *
 * Lifted from startups-tech/web (commits 71f4b72c, 7dc3c7fe, 878d56ce) after
 * its adversarial review (docs/startups-tech/_port/R7_WIDGET_REVIEW.md).
 */

/** A topic in a site's intent taxonomy. Sites may carry extra fields. */
export type WidgetTopic = {
  key: string;
  label: string;
  /** slug of the calculator to recommend for this topic, or null. */
  primaryCalculator: string | null;
  /** short, intent-matched CTA used by the personalisation layer. */
  ctaCopy: string;
  /** lead-magnet resource id, or null when no such asset exists. */
  resourceId: string | null;
};

/* ------------------------------------------------------------------ route */

/**
 * One route family: the first path segment(s) that select it, and the lookup
 * that turns the SECOND segment into a topic key.
 *   { segments: ["calculators", "embed"], lookup: topicForCalcSlug }
 */
export type RouteRule = {
  segments: string[];
  lookup: (slug: string) => string | null;
};

/* --------------------------------------------------------------- journey */

export type JourneyStage = "researching" | "comparing" | "evaluating-us" | "ready";

export type JourneyProfile = {
  primaryTopic: string | null;
  secondaryTopic: string | null;
  stage: JourneyStage;
  /** Rough 0..1 engagement depth, for tie-breaks and escalation. */
  depth: number;
  /** multi-topic, visited-about, visited-services, visited-contact, used-calculator, returning, friction, deep-read. */
  signals: string[];
  pageCount: number;
};

/** The journey-model instance a site's config owns (one per site, created once). */
export type JourneyModel = {
  /** Install the bus subscription once and record the entry page. Idempotent. */
  init(): void;
  /** Upsert the current page node plus the special-page flags. */
  recordPath(pathname: string): void;
  /** Derive the current intent profile from the accumulated trail. */
  getProfile(): JourneyProfile;
  /** Test-only reset. */
  _reset(): void;
};

export type JourneyModelOptions = {
  /** sessionStorage key, site-prefixed (e.g. "ffp_journey"). */
  storageKey: string;
  deriveTopic: (pathname: string) => string | null;
  /** Route prefixes whose visit flips a trail flag. Defaults to /about, /services, /contact. */
  specialPathPrefixes?: { about: string; services: string; contact: string };
};

/* ---------------------------------------------------------------- engine */

export type Surface =
  | "hero_cta"
  | "sticky_cta"
  | "next_step"
  | "deep_scroll_modal"
  | "returning_bar";

export type IntentContext = {
  pageTopic: string | null; // topic of the page being viewed (route-derived)
  entryTopic: string | null; // session landing topic (search-intent proxy)
  lastTopic: string | null; // most-recent topic across visits
  returning: boolean;
  converted: boolean;
  scrollPct: number; // current page max scroll depth
  engagedMs: number; // cumulative engaged time this session
  isMobile: boolean;
};

/** The matched asset a surface should promote: a real, live resource. */
export type OfferKind = "tool" | "guide" | "specialist";

export type IntentOffer = {
  kind: OfferKind;
  title: string;
  blurb: string;
  href: string;
  reason: string;
};

export type IntentAction = {
  ruleId: string;
  surface: Surface;
  topic: string;
  label: string;
  ctaCopy: string;
  calculatorSlug: string | null;
  resourceId: string | null;
  variant: string; // for measurement
  offer: IntentOffer;
};

/** Site-authored offer copy. The escalation ladder itself stays in the kit. */
export type OfferBuilders = {
  tool(topicKey: string): IntentOffer | null;
  review(topicKey: string, reason?: string): IntentOffer | null;
  specialist(topicKey: string): IntentOffer;
  /** Reason line for the returning-visitor offer. */
  returningReason: string;
};

/** Engagement thresholds. Numbers only, so the defaults carry no copy. */
export type EngineThresholds = {
  engagedEscalateMs: number;
  engagedGuideMs: number;
  scrollEscalatePct: number;
  scrollModalPct: number;
};

export type EngineConfig = {
  getTopic(key: string | null | undefined): WidgetTopic | null;
  offers: OfferBuilders;
  thresholds?: Partial<EngineThresholds>;
};

/* -------------------------------------------------------------- openers */

export type OpenerCopy = {
  /** Cadence opener for a profile at ping index 0..n. */
  pick(profile: JourneyProfile, pingIndex: number): string;
  /** Fires on the exit-intent trigger. */
  exit(profile: JourneyProfile): string;
  /** Fires instantly on form_error. */
  friction(profile: JourneyProfile): string;
};

/* ------------------------------------------------------------ lead submit */

export type WidgetLeadPayload = {
  full_name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  source: string;
  source_url: string;
  submitted_at: string;
  consent_given: boolean;
  consent_text: string;
  consent_at: string;
  visitor_id?: string;
  session_id?: string;
  extras: Record<string, unknown>;
  captureMode: "full" | "email_only";
};

export type WidgetLeadResult = { success: boolean; error?: string };

/* --------------------------------------------------------- class recipes */

/**
 * Every class string the widget paints that a site may need to own. All are
 * Tailwind class strings, never hex.
 */
export type WidgetClasses = {
  /** Focus-ring recipe. Already spliced into the recipes below by the factory. */
  focusRing: string;
  /** Fixed wrapper. Carries the bottom offset (bottom-4, or bottom-24 behind a sticky bar). */
  container: string;
  /** The dialog panel. */
  panel: string;
  /** Panel header, including its ground. */
  header: string;
  headerAvatar: string;
  headerTitle: string;
  headerSubtitle: string;
  closeButton: string;
  /** Scrolling conversation area. */
  conversation: string;
  messageAvatar: string;
  messageBubble: string;
  successBubble: string;
  chipRow: string;
  chip: string;
  /** Footer band holding the ask button or the composer. */
  footer: string;
  /** Button that reveals the composer. */
  primaryButton: string;
  /** Composer submit button. */
  submitButton: string;
  input: string;
  honeypot: string;
  errorText: string;
  consentText: string;
  privacyLink: string;
  peekCard: string;
  peekButton: string;
  peekDismiss: string;
  launcher: string;
  badgeWrap: string;
  badgePing: string;
  badge: string;
};

/* ---------------------------------------------------------- copy strings */

/** Every visitor-facing string the widget renders. No defaults: all site-owned. */
export type WidgetCopy = {
  /** Panel aria-label and the launcher's open label. */
  launcherLabel: string;
  /** Launcher label while the panel is open. */
  closeLabel: string;
  /** Brand line in the panel header. */
  headerTitle: string;
  /** Reply-time line under it. */
  headerSubtitle: string;
  /** aria-label on the header close button. */
  closeAriaLabel: string;
  /** aria-label on the peek dismiss button. */
  dismissAriaLabel: string;
  /** Label on the calculator chip. */
  calculatorChip: string;
  /** Label on the contact chip. */
  contactChip: string;
  /** Label on the button that reveals the composer. */
  askButton: string;
  /** Submit button, idle and in-flight. */
  submitButton: string;
  submitButtonLoading: string;
  emailPlaceholder: string;
  emailAriaLabel: string;
  questionPlaceholder: string;
  questionAriaLabel: string;
  emailError: string;
  questionError: string;
  genericError: string;
  successMessage: string;
  /** Consent sentence shown above the privacy link, and written to the lead row. */
  consentPrefix: string;
};

/* ------------------------------------------------------------ the config */

export type WidgetConfig = {
  /** sessionStorage prefix, e.g. "ffp". Keys: <p>_journey, <p>_assistant_active, <p>_assistant_autoopened. */
  storagePrefix: string;
  /** form_id stamped on tracking, extras and ft.onLead. Estate views key on "specialist_widget". */
  formId: string;
  /** data-cta on the launcher. Estate analytics views key on this. */
  ctaId: string;
  /** Lead `source` written to the row. */
  leadSource: string;
  /** Path prefixes where the provider yields a null context, e.g. ["/embed", "/admin"]. */
  hiddenOnPaths: string[];
  /** Route families for topic derivation. */
  routeRules: RouteRule[];
  /** Topic lookup, from the site's taxonomy. */
  getTopic(key: string | null | undefined): WidgetTopic | null;
  /** The site's journey-model instance. */
  journey: JourneyModel;
  /** The site's opener copy. */
  openers: OpenerCopy;
  /** Offer builders + thresholds for evaluate(). */
  engine: EngineConfig;
  /** rule_id -> human label, for the personalisation events. */
  ruleLabel(ruleId: string): string;
  /** Route prefix the calculator chip links into, e.g. "/calculators/". */
  calculatorHrefPrefix: string;
  /** Where the contact chip points, e.g. "/contact". */
  contactHref: string;
  /** Where the privacy link points, e.g. "/privacy-policy". */
  privacyHref: string;
  /** The site's lead-submit client. */
  submitLead(payload: WidgetLeadPayload, honeypot: string): Promise<WidgetLeadResult>;
  classes: WidgetClasses;
  copy: WidgetCopy;
  /** Rendered launcher height in px. Must match `classes.launcher`. Default 52. */
  launcherHeightPx?: number;
};
