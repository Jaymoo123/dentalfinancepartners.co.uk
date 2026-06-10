/**
 * First-party analytics event taxonomy — the single source of truth.
 *
 * The server ingest route (/api/track) imports EVENT_NAMES as an allowlist and
 * rejects anything off-list, and the Supabase web_events.props column mirrors
 * these payload shapes. Keep this file and the schema migration in lockstep.
 *
 * Privacy: no field here should ever carry PII (no name/email/phone/raw IP).
 * track() additionally scrubs email/phone-shaped strings defensively.
 */

/** Every event name we will ever send. Off-list names are rejected server-side. */
export const EVENT_NAMES = [
  "page_view",
  "scroll_depth",
  "section_view",
  "engagement_time",
  "rage_click",
  "dead_click",
  "outbound_click",
  "contact_click",
  "element_click",
  "cta_click",
  "custom_interaction",
  "client_error",
  "form_start",
  "form_field_focus",
  "form_field_abandon",
  "form_submit",
  "form_error",
  "lead_submitted",
  "calc_view",
  "calc_input_change",
  "calc_computed",
  "calc_result_viewed",
  "calc_copy",
  "calc_share",
  "gate_view",
  "resource_unlocked",
  "embed_cta_click",
  "exit_intent_shown",
  "personalization_shown",
  "personalization_clicked",
  "personalization_dismissed",
  "support_opened",
  "web_vital",
  "subscribe_view",
  "subscribe_submitted",
  "experiment_view",
  "experiment_action",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const EVENT_NAME_SET = new Set<string>(EVENT_NAMES);

/** True if `name` is a known, allowlisted event name. */
export function isKnownEvent(name: string): name is EventName {
  return EVENT_NAME_SET.has(name);
}

/**
 * Interaction events (anything beyond a passive page_view) prove a real human.
 * The ingest endpoint flips web_sessions.human_confirmed=true on the first of
 * these. engagement_time is included because the client only emits it AFTER a
 * genuine pointer/keyboard/touch/scroll input has been seen this session.
 */
export const INTERACTION_EVENTS: ReadonlySet<string> = new Set([
  "engagement_time",
  "scroll_depth",
  "section_view",
  "element_click",
  "cta_click",
  "custom_interaction",
  "outbound_click",
  "contact_click",
  "calc_view",
  "calc_input_change",
  "calc_computed",
  "calc_result_viewed",
  "calc_copy",
  "calc_share",
  "resource_unlocked",
  "embed_cta_click",
  "form_start",
  "form_field_focus",
  "form_submit",
  "lead_submitted",
  "personalization_clicked",
  "support_opened",
  "subscribe_submitted",
  "experiment_action",
]);

/** Free-form, JSON-serialisable event payload. Values are scrubbed of PII. */
export type EventProps = Record<string, string | number | boolean | null | undefined>;

/**
 * The common envelope track() stamps onto every event before sending.
 * page_path/page_query/client_ts are filled at send time.
 */
export interface EventEnvelope {
  visitor_id: string;
  session_id: string;
  site_key: string;
  page_path: string;
  page_query: string;
  client_ts: string;
  is_embed: boolean;
  embed_slug?: string;
  consent_state: string;
}

/** A fully-formed event as it travels to /api/track. */
export interface TrackEvent extends EventEnvelope {
  event_name: EventName;
  props: EventProps;
}

/** The batch body POSTed to /api/track. */
export interface TrackBatch {
  events: TrackEvent[];
}

/** Hard caps mirrored by the server validator. */
export const LIMITS = {
  MAX_BATCH_EVENTS: 40,
  MAX_PROPS_BYTES: 4_096,
  FLUSH_AT_EVENTS: 12,
  FLUSH_INTERVAL_MS: 4_000,
  SESSION_IDLE_MS: 30 * 60 * 1000,
  SCROLL_MILESTONES: [25, 50, 75, 90, 100] as const,
} as const;
