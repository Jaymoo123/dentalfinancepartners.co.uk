# Proactive journey-aware on-site assistant — exploration brief & handoff

**Status:** DESIGN-ONLY exploration complete (2026-06-25), no code written. This doc
captures the codebase exploration so a planning agent can design the feature without
re-exploring. Next step = produce a plan (plan-mode workflow), resolve the open decisions
with the owner, then build.

Related memory: `unified_console_plan`, `property_behaviour_analytics`,
`property_experiments_concluded`, `property_leadform_honeypot_silent_drop`,
`property_conversion_funnel_overhaul`, `lead_form_consent`,
`email_routing_partner_vs_subscriber`, `feedback_gold_standard_quality_bar`,
`user_not_accountant_authority_constraint`.

## The idea (owner's words, distilled)

Use the first-party journey data we already collect to drive the under-used bottom-right
widget (currently a static "Ask a specialist" FAQ + form, NOT a chatbot) as a **proactive,
journey-aware assistant** that captures visitors we'd otherwise lose:

1. **Friction recovery** — when a submit silently fails (e.g. the honeypot case, or any
   `form_error` / repeated submit with no `lead_submitted`): *"I can see you're having
   trouble submitting over there — can I help over here?"* Directly recovers an otherwise
   100%-lost lead.
2. **Commercial-intent-but-not-ready** — when someone shows intent but isn't ready for the
   big jump to booking a call: *"Not sure you're ready for a call yet? Chat to [name] and we
   can help you decide if we can help."* Take a few details, ask a couple of qualifying
   questions, offer a **lower-commitment alternative pathway**.

Goal: a graduated ladder (proactive chat → answer a question → grab a guide/calc → callback
→ call) that captures the "messy middle" the single "book a call" CTA loses.

## Honest assessment (is it a good idea?)

Yes — strong, proven CRO pattern, and we have the rare ingredient most sites lack: rich
first-party journey data. Tensions to design around:
- **Low traffic** (~1–5 leads/day) ⇒ can't A/B to quality fast; triggers + copy must be
  sharp from day 1, not experimental.
- **Tone/creepiness** — "I can see you're struggling" can read as surveillance. Needs
  helpful framing + the right consent posture (see Consent below).
- **The widget today is a static form, not a conversation.** Proactive *triggers* are cheap;
  a real *conversational* assistant (LLM) is more powerful but adds cost/complexity. Pick the
  point on that spectrum deliberately (a key decision below).
- **Privacy/PECR** — proactively engaging off tracked behaviour has consent implications.

## Intervention surface — what exists (reuse, don't rebuild)

- **The bottom-right widget:** `Property/web/src/components/support/SpecialistWidget.tsx`
  (mounted `app/layout.tsx:~109`, inside `IntentProvider`). Topic-aware FAQ + email/question
  lead capture. Emits `support_opened`; submits via `submitLead`. Reads `useIntentContext()`
  (topic, returning, converted, scrollPct, engagedMs). No-ops in `/embed`, `/admin`, or when
  the visitor opted out.
- **Intent engine (the machinery to extend):** `Property/web/src/lib/intent/engine.ts` —
  pure `evaluate(surface, ctx)` (~159-213) + `pickOffer()` escalation ladder (tool → guide →
  specialist, ~119-133) + tunable thresholds (~62-66). Add a new `Surface` (e.g.
  `"assistant_popup"`), an evaluation rule, and a component that calls `useIntent(...)`, then
  mount in `layout.tsx`. This is the clean insertion point.
- **Context provider:** `Property/web/src/components/intent/IntentProvider.tsx` — builds
  `IntentContext` (pageTopic/entryTopic/lastTopic/returning/converted/scrollPct/engagedMs/
  isMobile); **polls live scroll + engagement every 1.5s** from autoCapture.
- **Existing proactive triggers (patterns to copy):**
  `components/intent/DeepScrollModal.tsx` (70% scroll → escalating offer),
  `components/intent/ReturningBar.tsx` (visit>1 → resume last topic),
  `components/blog/ExitIntentModal.tsx` (mouse/scroll exit on blog+calc → `MiniCapture`),
  `components/calculators/ResultGateModal.tsx` (calc-result interstitial, the live
  `result_gate_capture` experiment). All fire `personalization_shown/clicked/dismissed`.
- **Visit state:** `packages/web-shared/analytics/visitMemory.ts` — `isReturning()`,
  `isConverted()`, `setConverted()` (suppresses all escalation once converted).
- **Experiments/personalization registry:** `packages/web-shared/experiments/registries/property.ts`
  (`useExperiment(key)`, deterministic per-visitor assignment, exposure auto-stamped). Most
  on-site experiments are concluded/locked; `result_gate_capture` still running.

## Journey signals — what we register (the "what can we react to")

- **Vocabulary:** `packages/web-shared/analytics/types.ts` — 51 event types. Most useful for
  this feature: `form_error` (now incl. `error_kind='honeypot'`), `form_field_abandon`
  (`had_value`), `form_submit`/`lead_submitted`, `rage_click`, `dead_click`, `client_error`,
  `calc_view/input_change/computed/result_viewed/copy`, `cta_click`, `support_opened`,
  `exit_intent_shown`, `scroll_depth`, `section_view`, `engagement_time`.
- **Live signals available to a trigger** (via IntentContext, polled 1.5s): scroll %,
  cumulative engaged ms, page/entry/last topic, returning, converted, isMobile.
  `autoCapture.ts` exports `getMaxScrollPct()` / `getEngagedMs()`.
- **Persisted:** `web_sessions` (identity, channel/UTM, device/geo, consent, is_bot,
  human_confirmed, engaged_ms, max_scroll_pct, lead_id) + `web_events` (per-event, props
  JSONB, monthly-partitioned). Rollup views incl. `vw_visitor_journey`,
  `vw_calculator_conversion`, `vw_form_field_dropoff`, `vw_ux_friction`, `vw_lead_intent_mix`.
- **High-value signals we could ADD** (cheap, no schema change — emit new events in
  autoCapture/form tracking): expose **repeat-visit** to events (`isReturning()` exists but
  isn't on events), **multiple-calculators-used** (research depth), **calc_copy → form_start**
  (prep behaviour), **pricing/contact-page dwell**, **idle-before-form** (hesitation),
  **form-error/retry patterns** (confused vs bot). These sharpen intent inference.

## Capture / AI / nurture / consent (the back half — all live, reuse it)

- **Lead capture:** `packages/web-shared/lib/supabase-client.ts` `submitLead()`. Mark
  assistant leads with **`source: "assistant"`** (clean tracking) and/or **`extras` JSONB**
  (qualifying answers, pathway chosen, quality signal). Auto-fires `/api/leads/notify`
  (operator email) + `/api/leads/enrich` (Opus classification).
- **Routing:** `Property/web/src/lib/lead-routing.ts` — Property leads → `junayd@ashfieldtrading.com`;
  **partner (DJH/Reflex) is CC-excluded on Property** (and on `source="test"`). If adding
  `source="assistant"`, decide whether to add it to the CC-exclusion set.
- **LLM (already wired):** `Property/web/src/lib/ai.ts` `classifyLead()` — **Opus 4.8 via
  Vercel AI Gateway** (OIDC on Vercel; `AI_GATEWAY_API_KEY` local). Single-turn classify
  today; multi-turn chat would call the same Gateway with self-managed conversation state.
  No RAG/chat infra exists yet. (House rule: Opus for reasoning, no DeepSeek/Haiku for
  content — `feedback_no_deepseek_opus_only`.)
- **Alternative pathways to offer:** resource downloads (`lib/resources/registry.ts` +
  `components/resources/ResourceGate.tsx` + `/api/resources/deliver`), calculators fleet,
  essential guides (`lib/essential-guides.ts`), nurture email sequence
  (`config/nurture.ts`, double opt-in), Landlord Tax Index research.
- **Consent / PECR (must-honour):** enquiry capture = legitimate interests; email signups =
  explicit consent (double opt-in). Check **`isTrackingAllowed()`** (`analytics/consent.ts`)
  before firing any proactive UI (ExitIntentModal already does). Safest copy is **generic
  and helpful** ("get a free review of your situation") rather than **behaviour-inferred**
  ("I see you're looking at incorporation"). If we reference inferred intent, document it in
  the Privacy Policy (`app/privacy-policy/page.tsx`) under legitimate interests and keep it
  to what the visitor self-evidently did on this page. Standard lead consent text applies
  (`config/site.ts` `leadConsentText`, `lead_form_consent`).

## Friction-recovery trigger (the honeypot tie-in — highest leverage)

The friction case is the most concrete and valuable: when `form_error` fires (esp.
`error_kind='honeypot'`), or a submit is pressed repeatedly with no `lead_submitted`,
proactively surface the assistant with an alternative path. This recovers exactly the leads
the honeypot was silently dropping (see `property_leadform_honeypot_silent_drop`). It's a
safety net *on top of* the honeypot rename fix, not a replacement for it.

## Open decisions for the owner (resolve in plan mode via AskUserQuestion)

1. **Rules-based scripted triggers vs LLM-backed conversation** (or staged: rules first, LLM
   later). Drives cost, complexity, risk.
2. **How proactive / aggressive** — which triggers fire, suppression caps (per session / per
   N days), do-not-nag-after-converted (already a pattern).
3. **Tone & privacy posture** — generic-helpful vs behaviour-referencing copy; what we're
   comfortable saying we "noticed."
4. **Scope** — which pages/surfaces (blog, calculators, high-intent pages), desktop/mobile.
5. **Persona** — does the assistant get a name? (owner floated "[chatbot name]").
6. **Measurement** — ship-on vs A/B experiment; which guardrails (form-completion, lead
   quality, spam, opt-out rate).
7. **Privacy Policy update** needed before behaviour-aware proactive engagement ships.

## Constraints to respect (from owner feedback memory)

Gold-standard quality bar (never AI-scammy/thin); off-site authority must stay faceless but
this is on-site UX (fine); build local-first, prod actions need explicit sign-off; isolate
variables, verify first; comprehensive + documented in repo docs (this file).
