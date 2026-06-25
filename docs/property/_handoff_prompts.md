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

Planning prompt (open-ended — let the agent explore and judge for itself):

```
Design the plan for a proactive, journey-aware on-site assistant for the Property site
(www.propertytaxpartners.co.uk) in this monorepo.

There's a starting-point brief at `docs/property/PROACTIVE_ASSISTANT_BRIEF.md` (a prior
codebase exploration: the bottom-right SpecialistWidget, the intent engine and existing
proactive triggers, the journey-signal catalog, the lead-capture/AI/nurture/consent infra,
and open questions) plus linked memory entries. Treat it as a map, not gospel — read it,
then explore, verify, and go wherever you need in the codebase and data. Challenge its
assumptions, correct anything stale, and form your own independent view.

The intent (owner's words): the bottom-right widget is under-used and is currently a static
form, not a real assistant. Use the first-party journey data we already collect to make it
proactive and journey-aware — (a) recover visitors when a form silently fails (the honeypot/
friction case), and (b) offer a lower-commitment pathway to people with commercial intent
who aren't ready to book a call. Take a few details, ask a couple of qualifying questions,
route them to an alternative path. Reuse what already exists rather than rebuilding.

You have latitude. Make the engineering and product judgement calls that are yours to make,
and decide for yourself how deep to explore, what the right architecture is, whether parts
of the idea are good or bad, and what to recommend. I want your honest assessment — including
"this part isn't worth it" if that's true. Only escalate to me the decisions that genuinely
need an owner: product direction, privacy/tone posture, anything that costs money or touches
production, and trade-offs where you can't pick a clearly-right default.

Process: work in plan mode. Explore and reason as much as you need, design the approach,
use AskUserQuestion to settle the genuine owner-level decisions, then write the plan and call
ExitPlanMode. Build nothing until I approve. Hold the line on: gold-standard quality (never
AI-scammy or thin), consent/PECR (check isTrackingAllowed; be deliberate about behaviour-
referencing vs generic copy), local-first, and explicit sign-off before any production change.
```
