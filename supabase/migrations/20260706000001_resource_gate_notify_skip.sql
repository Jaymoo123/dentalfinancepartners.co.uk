-- ============================================================================
-- RESOURCE-GATE ROWS: SKIP NOTIFY + ENRICH TRIGGERS
-- ============================================================================
-- Migration: 20260706000001_resource_gate_notify_skip.sql
-- Date: 2026-07-06 (estate CRO parity program, R3)
-- Purpose: R3 introduces ResourceGate captures on non-Property sites. Those
--          submissions are taken under IN-HOUSE-ONLY consent wording
--          (resourceConsentText: never shared with the partner firm), so they
--          must not flow through the lead-notify path that CCs the partner
--          (Reflex) on non-Property sources. They also should not consume paid
--          AI/Companies House enrichment. Rows are marked by the submit layer
--          with extras.resource_gate = true.
--
--          Implementation deliberately touches ONLY the triggers (adding WHEN
--          clauses), never the trigger FUNCTIONS, whose live bodies carry
--          substituted secrets and are not applied from this repo verbatim.
--          This file IS applied verbatim.
--
--          Resource-gate contacts remain fully visible in the estate console
--          and the leads table; they are a nurture-pool audience, not
--          notify-and-forward leads.
-- ============================================================================

drop trigger if exists leads_to_email_trg on public.leads;
create trigger leads_to_email_trg
after insert on public.leads
for each row
when (coalesce(NEW.extras->>'resource_gate', '') <> 'true')
execute function public.leads_to_email();

drop trigger if exists leads_to_enrich_trg on public.leads;
create trigger leads_to_enrich_trg
after insert on public.leads
for each row
when (coalesce(NEW.extras->>'resource_gate', '') <> 'true')
execute function public.leads_to_enrich();

-- Rollback: recreate both triggers without the WHEN clause (see
-- 20260601000000_leads_to_email_webhook.sql and
-- 20260608000009_leads_to_enrich_webhook.sql for the original definitions).
