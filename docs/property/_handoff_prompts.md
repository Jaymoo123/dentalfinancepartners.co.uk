# Handoff prompts — paste into a fresh Claude Code session in this repo

Two parallel threads were split off on 2026-06-25 to keep each agent's context light.
A new session auto-loads the memory index, so these prompts are self-contained. See also
`docs/property/PROACTIVE_ASSISTANT_BRIEF.md` and memory
`property_leadform_honeypot_silent_drop`.

---

## 1. Honeypot lead-drop — monitor + deferred closers

Currently in **monitoring mode**. The rename `company_url -> enquiry_ref` is deployed and
verified; `scripts/honeypot_health.py` watches it (PASS = no real human blocked since the
rename; ALARM = a real human tripped it post-rename → escalate). Check anytime with:

```
python scripts/honeypot_health.py
```

Resume prompt:

```
Resume the Property lead-form honeypot work. Read the memory
`property_leadform_honeypot_silent_drop` and `scripts/honeypot_health.py` for full state.

Background: we renamed the honeypot field company_url -> enquiry_ref (deployed, verified)
to stop browser autofill silently dropping real leads, and built honeypot_health.py to
monitor it. We deliberately deferred three "closers". Please:
  1. Run `python scripts/honeypot_health.py` and report the current readout (watch the
     real_humans column = 0, and whether Property leads have resumed since 06-22).
  2. If, and only if, I confirm I want them, plan + (after sign-off) implement the closers:
     (a) Step-2 de-fang (never silently block when a real field was actually typed);
     (b) add the ft.onError diagnostic to ResourceGate + SubscribeForm so the monitor sees
         all 5 surfaces; (c) rename the coupled SubscribeForm + /api/nurture/subscribe pair;
     (d) sweep the rename across the other 7 estate sites' per-site LeadForm/MiniCapture copies.
Respect: isolate-one-variable, local-first, explicit sign-off before any prod deploy, and a
post-deploy live submit probe per surface.
```

---

## 2. Proactive journey-aware on-site assistant — design the plan

Exploration is done and captured in `docs/property/PROACTIVE_ASSISTANT_BRIEF.md`; this agent
should design the plan from it (don't re-explore from scratch). The friction-recovery trigger
ties back to thread 1 — it fires off `form_error`/honeypot and recovers exactly the leads the
honeypot was dropping.

Planning prompt:

```
Plan a proactive, journey-aware on-site assistant for the Property site
(www.propertytaxpartners.co.uk) in this monorepo. START by reading
`docs/property/PROACTIVE_ASSISTANT_BRIEF.md` in full — it captures a completed codebase
exploration (the bottom-right SpecialistWidget, the intent engine + existing proactive
triggers, the full journey-signal catalog, and the lead-capture/AI/nurture/consent infra
to reuse), plus the open product decisions. Also skim the memory entries it links
(property_behaviour_analytics, property_experiments_concluded, lead_form_consent,
user_not_accountant_authority_constraint, feedback_gold_standard_quality_bar).

Goal: upgrade the under-used bottom-right widget into an assistant that (a) recovers
visitors when a form silently fails (the honeypot/friction case) and (b) offers a
lower-commitment pathway to commercial-intent-but-not-ready visitors, reusing the existing
intent engine, journey signals, and capture/nurture infra rather than rebuilding.

Use the plan-mode workflow: do only light targeted exploration (the brief already has the
file map — don't re-explore from scratch), then design the approach. Before finalizing,
use AskUserQuestion to resolve the brief's "Open decisions" (chiefly: rules-based vs
LLM-backed conversation; how proactive/aggressive + suppression; tone/privacy posture for
behaviour-referencing copy; scope; persona/name; ship-on vs A/B; Privacy Policy update).
Then write the plan and ExitPlanMode. Build nothing until the plan is approved. Constraints:
gold-standard quality (never AI-scammy), honour consent/PECR (check isTrackingAllowed,
prefer generic-helpful over surveillance-y copy), local-first, explicit sign-off before prod.
```
