-- ============================================================================
-- LEADS -> ENRICHMENT WEBHOOK
-- ============================================================================
-- Migration: 20260608000009_leads_to_enrich_webhook.sql
-- Date: 2026-06-08
-- Purpose: On every INSERT into public.leads, POST the new row to the lead-enrich
--          endpoint, which classifies the message (Opus via AI Gateway) and does a
--          best-effort Companies House lookup, writing public.lead_enrichment.
--          Independent of the email/sheets triggers (a failure never blocks them).
--          Covers all sites (shared leads table; `source` distinguishes).
--
-- IMPORTANT: This file is the version-controlled, SANITISED record. It is NOT
-- applied verbatim. The live trigger is created via the Supabase Management API
-- with the real endpoint URL and shared secret substituted, so the secret is
-- never committed. Placeholders:
--   __ENDPOINT_URL__         e.g. https://www.propertytaxpartners.co.uk/api/leads/enrich
--   __LEADS_ENRICH_SECRET__  matches LEADS_ENRICH_SECRET (or LEADS_NOTIFY_SECRET /
--                            LEADS_SYNC_SECRET) on the endpoint
-- ============================================================================

create extension if not exists pg_net;

create or replace function public.leads_to_enrich()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url     := '__ENDPOINT_URL__',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', '__LEADS_ENRICH_SECRET__'
    ),
    body    := jsonb_build_object(
      'type', 'INSERT',
      'table', 'leads',
      'schema', 'public',
      'record', to_jsonb(NEW)
    ),
    timeout_milliseconds := 5000
  );
  return NEW;
end;
$$;

drop trigger if exists leads_to_enrich_trg on public.leads;

create trigger leads_to_enrich_trg
after insert on public.leads
for each row
execute function public.leads_to_enrich();

-- Rollback:
--   drop trigger if exists leads_to_enrich_trg on public.leads;
--   drop function if exists public.leads_to_enrich();
