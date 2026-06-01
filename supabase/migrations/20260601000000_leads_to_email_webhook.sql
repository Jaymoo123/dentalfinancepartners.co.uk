-- ============================================================================
-- LEADS -> EMAIL NOTIFICATION WEBHOOK
-- ============================================================================
-- Migration: 20260601000000_leads_to_email_webhook.sql
-- Date: 2026-06-01
-- Purpose: On every INSERT into public.leads, POST the new row to the lead-notify
--          endpoint, which emails a pre-formatted HTML table to the internal
--          inbox (forward-ready for the partner firm). Independent of the Google
--          Sheets sync trigger so the two never block each other.
--          Covers all sites (one shared leads table; `source` distinguishes).
--
-- IMPORTANT: This file is the version-controlled, SANITISED record. It is NOT
-- applied verbatim. The live trigger is created via the Supabase Management API
-- with the real endpoint URL and the real shared secret substituted in, so the
-- secret is never committed to the repo. Placeholders below:
--   __ENDPOINT_URL__         e.g. https://www.propertytaxpartners.co.uk/api/leads/notify
--   __LEADS_NOTIFY_SECRET__  matches LEADS_NOTIFY_SECRET (or LEADS_SYNC_SECRET) on the endpoint
-- ============================================================================

create extension if not exists pg_net;

create or replace function public.leads_to_email()
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
      'x-webhook-secret', '__LEADS_NOTIFY_SECRET__'
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

drop trigger if exists leads_to_email_trg on public.leads;

create trigger leads_to_email_trg
after insert on public.leads
for each row
execute function public.leads_to_email();

-- Rollback:
--   drop trigger if exists leads_to_email_trg on public.leads;
--   drop function if exists public.leads_to_email();
