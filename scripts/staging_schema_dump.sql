-- ── table leads ──────────────────────────────
create table if not exists public."leads" (
  "id" uuid default gen_random_uuid() not null,
  "created_at" timestamp with time zone default now() not null,
  "submitted_at" timestamp with time zone,
  "full_name" text not null,
  "email" text not null,
  "phone" text not null,
  "role" text not null,
  "practice_name" text,
  "message" text,
  "source_url" text,
  "status" text default 'new'::text,
  "source" text,
  "consent_given" boolean default false not null,
  "consent_text" text,
  "consent_at" timestamp with time zone,
  "visitor_id" text,
  "session_id" text,
  "extras" jsonb
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'leads'
      and c.conname = 'leads_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (id)'
  ) then
    execute 'alter table public."leads" drop constraint if exists "leads_pkey"';
    execute 'alter table public."leads" add constraint "leads_pkey" PRIMARY KEY (id)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'leads'
      and c.conname = 'leads_source_valid'
      and pg_get_constraintdef(c.oid) = 'CHECK (((source = ANY (ARRAY[''dentists''::text, ''property''::text, ''medical''::text, ''solicitors''::text, ''generalist''::text, ''general''::text, ''agency''::text, ''agency-founder-finance''::text, ''contractors-ir35''::text, ''construction-cis''::text, ''test''::text])) OR (source IS NULL)))'
  ) then
    execute 'alter table public."leads" drop constraint if exists "leads_source_valid"';
    execute 'alter table public."leads" add constraint "leads_source_valid" CHECK (((source = ANY (ARRAY[''dentists''::text, ''property''::text, ''medical''::text, ''solicitors''::text, ''generalist''::text, ''general''::text, ''agency''::text, ''agency-founder-finance''::text, ''contractors-ir35''::text, ''construction-cis''::text, ''test''::text])) OR (source IS NULL)))';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'leads'
      and c.conname = 'leads_status_check'
      and pg_get_constraintdef(c.oid) = 'CHECK ((status = ANY (ARRAY[''new''::text, ''contacted''::text, ''qualified''::text, ''converted''::text, ''archived''::text])))'
  ) then
    execute 'alter table public."leads" drop constraint if exists "leads_status_check"';
    execute 'alter table public."leads" add constraint "leads_status_check" CHECK ((status = ANY (ARRAY[''new''::text, ''contacted''::text, ''qualified''::text, ''converted''::text, ''archived''::text])))';
  end if;
end $$;
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads USING btree (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads USING btree (email);
CREATE INDEX IF NOT EXISTS idx_leads_visitor_id ON public.leads USING btree (visitor_id) WHERE (visitor_id IS NOT NULL);
alter table public."leads" enable row level security;
drop policy if exists "anon_can_only_insert_leads" on public."leads";
create policy "anon_can_only_insert_leads" on public."leads" as permissive for insert to "anon" with check (true);
drop policy if exists "anon_cannot_delete_leads" on public."leads";
create policy "anon_cannot_delete_leads" on public."leads" as restrictive for delete to "anon" using (false);
drop policy if exists "anon_cannot_select_leads" on public."leads";
create policy "anon_cannot_select_leads" on public."leads" as permissive for select to "anon" using (false);
drop policy if exists "anon_cannot_update_leads" on public."leads";
create policy "anon_cannot_update_leads" on public."leads" as restrictive for update to "anon" using (false);
drop policy if exists "authenticated_can_delete_leads" on public."leads";
create policy "authenticated_can_delete_leads" on public."leads" as permissive for delete to "authenticated" using (true);
drop policy if exists "authenticated_can_read_leads" on public."leads";
create policy "authenticated_can_read_leads" on public."leads" as permissive for select to "authenticated" using (true);
drop policy if exists "authenticated_can_update_leads" on public."leads";
create policy "authenticated_can_update_leads" on public."leads" as permissive for update to "authenticated" using (true) with check (true);

-- ── table subscribers ──────────────────────────────
create table if not exists public."subscribers" (
  "id" uuid default gen_random_uuid() not null,
  "site_key" text default 'property'::text not null,
  "email" text not null,
  "status" text default 'active'::text not null,
  "consent_given" boolean default false not null,
  "consent_text" text,
  "consent_at" timestamp with time zone,
  "visitor_id" text,
  "entry_topic" text,
  "source" text,
  "unsubscribe_token" uuid default gen_random_uuid() not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "confirmed_at" timestamp with time zone
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'subscribers'
      and c.conname = 'subscribers_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (id)'
  ) then
    execute 'alter table public."subscribers" drop constraint if exists "subscribers_pkey"';
    execute 'alter table public."subscribers" add constraint "subscribers_pkey" PRIMARY KEY (id)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'subscribers'
      and c.conname = 'subscribers_status_check'
      and pg_get_constraintdef(c.oid) = 'CHECK ((status = ANY (ARRAY[''pending''::text, ''active''::text, ''unsubscribed''::text, ''bounced''::text, ''complained''::text])))'
  ) then
    execute 'alter table public."subscribers" drop constraint if exists "subscribers_status_check"';
    execute 'alter table public."subscribers" add constraint "subscribers_status_check" CHECK ((status = ANY (ARRAY[''pending''::text, ''active''::text, ''unsubscribed''::text, ''bounced''::text, ''complained''::text])))';
  end if;
end $$;
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_site_email_uidx ON public.subscribers USING btree (site_key, lower(email));
CREATE INDEX IF NOT EXISTS subscribers_visitor_idx ON public.subscribers USING btree (visitor_id) WHERE (visitor_id IS NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_unsub_token_uidx ON public.subscribers USING btree (unsubscribe_token);
alter table public."subscribers" enable row level security;

-- ── table web_sessions ──────────────────────────────
create table if not exists public."web_sessions" (
  "session_id" text not null,
  "visitor_id" text not null,
  "site_key" text not null,
  "started_at" timestamp with time zone default now() not null,
  "last_seen_at" timestamp with time zone default now() not null,
  "entry_path" text,
  "exit_path" text,
  "referrer" text,
  "referrer_host" text,
  "utm_source" text,
  "utm_medium" text,
  "utm_campaign" text,
  "utm_term" text,
  "utm_content" text,
  "device_type" text,
  "viewport_w" integer,
  "viewport_h" integer,
  "ua_family" text,
  "os_family" text,
  "country" text,
  "is_embed" boolean default false not null,
  "embed_slug" text,
  "embed_referrer_host" text,
  "consent_state" text,
  "is_bot" boolean default false not null,
  "bot_reason" text,
  "botid_verified" boolean,
  "human_confirmed" boolean default false not null,
  "lead_id" uuid,
  "event_count" integer default 0 not null,
  "engaged_ms" integer default 0 not null,
  "max_scroll_pct" integer default 0 not null,
  "bot_score" real,
  "city" text,
  "region" text,
  "timezone" text
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'web_sessions'
      and c.conname = 'web_sessions_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (session_id)'
  ) then
    execute 'alter table public."web_sessions" drop constraint if exists "web_sessions_pkey"';
    execute 'alter table public."web_sessions" add constraint "web_sessions_pkey" PRIMARY KEY (session_id)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'web_sessions'
      and c.conname = 'web_sessions_site_key_fkey'
      and pg_get_constraintdef(c.oid) = 'FOREIGN KEY (site_key) REFERENCES sites(site_key)'
  ) then
    execute 'alter table public."web_sessions" drop constraint if exists "web_sessions_site_key_fkey"';
    execute 'alter table public."web_sessions" add constraint "web_sessions_site_key_fkey" FOREIGN KEY (site_key) REFERENCES sites(site_key)';
  end if;
end $$;
CREATE INDEX IF NOT EXISTS web_sessions_visitor_idx ON public.web_sessions USING btree (visitor_id);
CREATE INDEX IF NOT EXISTS web_sessions_site_started_idx ON public.web_sessions USING btree (site_key, started_at DESC);
CREATE INDEX IF NOT EXISTS web_sessions_lead_idx ON public.web_sessions USING btree (lead_id) WHERE (lead_id IS NOT NULL);
CREATE INDEX IF NOT EXISTS web_sessions_human_idx ON public.web_sessions USING btree (site_key, started_at DESC) WHERE ((is_bot = false) AND (human_confirmed = true));
alter table public."web_sessions" enable row level security;
drop policy if exists "authenticated_can_read_web_sessions" on public."web_sessions";
create policy "authenticated_can_read_web_sessions" on public."web_sessions" as permissive for select to "authenticated" using (true);

-- ── table web_events ──────────────────────────────
create table if not exists public."web_events" (
  "id" uuid default gen_random_uuid() not null,
  "ts" timestamp with time zone default now() not null,
  "client_ts" timestamp with time zone,
  "session_id" text not null,
  "visitor_id" text not null,
  "site_key" text not null,
  "event_name" text not null,
  "page_path" text,
  "page_query" text,
  "props" jsonb default '{}'::jsonb not null,
  "is_embed" boolean default false not null,
  "is_bot" boolean default false not null
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'web_events'
      and c.conname = 'web_events_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (id, ts)'
  ) then
    execute 'alter table public."web_events" drop constraint if exists "web_events_pkey"';
    execute 'alter table public."web_events" add constraint "web_events_pkey" PRIMARY KEY (id, ts)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'web_events'
      and c.conname = 'web_events_site_key_fkey'
      and pg_get_constraintdef(c.oid) = 'FOREIGN KEY (site_key) REFERENCES sites(site_key)'
  ) then
    execute 'alter table public."web_events" drop constraint if exists "web_events_site_key_fkey"';
    execute 'alter table public."web_events" add constraint "web_events_site_key_fkey" FOREIGN KEY (site_key) REFERENCES sites(site_key)';
  end if;
end $$;
CREATE INDEX IF NOT EXISTS web_events_session_ts_idx ON public.web_events USING btree (session_id, ts);
CREATE INDEX IF NOT EXISTS web_events_site_name_ts_idx ON public.web_events USING btree (site_key, event_name, ts DESC);
CREATE INDEX IF NOT EXISTS web_events_visitor_idx ON public.web_events USING btree (visitor_id);
CREATE INDEX IF NOT EXISTS web_events_human_idx ON public.web_events USING btree (site_key, event_name, ts DESC) WHERE (is_bot = false);
alter table public."web_events" enable row level security;
drop policy if exists "authenticated_can_read_web_events" on public."web_events";
create policy "authenticated_can_read_web_events" on public."web_events" as permissive for select to "authenticated" using (true);

-- ── table nurture_sends ──────────────────────────────
create table if not exists public."nurture_sends" (
  "id" uuid default gen_random_uuid() not null,
  "subscriber_id" uuid not null,
  "sequence" text not null,
  "step" integer not null,
  "resend_id" text,
  "sent_at" timestamp with time zone default now() not null,
  "opened_at" timestamp with time zone,
  "clicked_at" timestamp with time zone,
  "bounced_at" timestamp with time zone,
  "complained_at" timestamp with time zone
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'nurture_sends'
      and c.conname = 'nurture_sends_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (id)'
  ) then
    execute 'alter table public."nurture_sends" drop constraint if exists "nurture_sends_pkey"';
    execute 'alter table public."nurture_sends" add constraint "nurture_sends_pkey" PRIMARY KEY (id)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'nurture_sends'
      and c.conname = 'nurture_sends_subscriber_id_sequence_step_key'
      and pg_get_constraintdef(c.oid) = 'UNIQUE (subscriber_id, sequence, step)'
  ) then
    execute 'alter table public."nurture_sends" drop constraint if exists "nurture_sends_subscriber_id_sequence_step_key"';
    execute 'alter table public."nurture_sends" add constraint "nurture_sends_subscriber_id_sequence_step_key" UNIQUE (subscriber_id, sequence, step)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'nurture_sends'
      and c.conname = 'nurture_sends_subscriber_id_fkey'
      and pg_get_constraintdef(c.oid) = 'FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE'
  ) then
    execute 'alter table public."nurture_sends" drop constraint if exists "nurture_sends_subscriber_id_fkey"';
    execute 'alter table public."nurture_sends" add constraint "nurture_sends_subscriber_id_fkey" FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE';
  end if;
end $$;
CREATE INDEX IF NOT EXISTS nurture_sends_resend_idx ON public.nurture_sends USING btree (resend_id) WHERE (resend_id IS NOT NULL);
alter table public."nurture_sends" enable row level security;

-- ── table nurture_state ──────────────────────────────
create table if not exists public."nurture_state" (
  "subscriber_id" uuid not null,
  "sequence" text default 'property_updates'::text not null,
  "step" integer default 0 not null,
  "status" text default 'active'::text not null,
  "next_send_at" timestamp with time zone,
  "last_sent_at" timestamp with time zone,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'nurture_state'
      and c.conname = 'nurture_state_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (subscriber_id, sequence)'
  ) then
    execute 'alter table public."nurture_state" drop constraint if exists "nurture_state_pkey"';
    execute 'alter table public."nurture_state" add constraint "nurture_state_pkey" PRIMARY KEY (subscriber_id, sequence)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'nurture_state'
      and c.conname = 'nurture_state_status_check'
      and pg_get_constraintdef(c.oid) = 'CHECK ((status = ANY (ARRAY[''active''::text, ''completed''::text, ''paused''::text])))'
  ) then
    execute 'alter table public."nurture_state" drop constraint if exists "nurture_state_status_check"';
    execute 'alter table public."nurture_state" add constraint "nurture_state_status_check" CHECK ((status = ANY (ARRAY[''active''::text, ''completed''::text, ''paused''::text])))';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'nurture_state'
      and c.conname = 'nurture_state_subscriber_id_fkey'
      and pg_get_constraintdef(c.oid) = 'FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE'
  ) then
    execute 'alter table public."nurture_state" drop constraint if exists "nurture_state_subscriber_id_fkey"';
    execute 'alter table public."nurture_state" add constraint "nurture_state_subscriber_id_fkey" FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE';
  end if;
end $$;
CREATE INDEX IF NOT EXISTS nurture_state_due_idx ON public.nurture_state USING btree (next_send_at) WHERE (status = 'active'::text);
alter table public."nurture_state" enable row level security;

-- ── table lead_enrichment ──────────────────────────────
create table if not exists public."lead_enrichment" (
  "lead_id" uuid not null,
  "intent_category" text,
  "intent_confidence" numeric,
  "quality_score" integer,
  "summary" text,
  "ch_company_number" text,
  "ch_company_name" text,
  "ch_company_status" text,
  "ch_confidence" text,
  "model" text,
  "enriched_at" timestamp with time zone default now() not null,
  "raw" jsonb
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'lead_enrichment'
      and c.conname = 'lead_enrichment_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (lead_id)'
  ) then
    execute 'alter table public."lead_enrichment" drop constraint if exists "lead_enrichment_pkey"';
    execute 'alter table public."lead_enrichment" add constraint "lead_enrichment_pkey" PRIMARY KEY (lead_id)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'lead_enrichment'
      and c.conname = 'lead_enrichment_lead_id_fkey'
      and pg_get_constraintdef(c.oid) = 'FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE'
  ) then
    execute 'alter table public."lead_enrichment" drop constraint if exists "lead_enrichment_lead_id_fkey"';
    execute 'alter table public."lead_enrichment" add constraint "lead_enrichment_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE';
  end if;
end $$;
CREATE INDEX IF NOT EXISTS lead_enrichment_intent_idx ON public.lead_enrichment USING btree (intent_category);
CREATE INDEX IF NOT EXISTS lead_enrichment_quality_idx ON public.lead_enrichment USING btree (quality_score);
alter table public."lead_enrichment" enable row level security;

-- ── table sites ──────────────────────────────
create table if not exists public."sites" (
  "site_key" text not null,
  "display_name" text not null,
  "domain" text not null,
  "gsc_property_url" text,
  "bing_property_url" text,
  "niche" text,
  "target_buyer_persona" text,
  "brand_voice_notes" text,
  "content_dir" text,
  "git_repo_path" text,
  "blog_topics_table" text,
  "active" boolean default true not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null
);
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'sites'
      and c.conname = 'sites_pkey'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (site_key)'
  ) then
    execute 'alter table public."sites" drop constraint if exists "sites_pkey"';
    execute 'alter table public."sites" add constraint "sites_pkey" PRIMARY KEY (site_key)';
  end if;
end $$;
do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'sites'
      and c.conname = 'sites_site_key_check'
      and pg_get_constraintdef(c.oid) = 'CHECK ((site_key = ANY (ARRAY[''property''::text, ''dentists''::text, ''medical''::text, ''solicitors''::text, ''agency''::text, ''generalist''::text, ''contractors-ir35''::text, ''construction-cis''::text])))'
  ) then
    execute 'alter table public."sites" drop constraint if exists "sites_site_key_check"';
    execute 'alter table public."sites" add constraint "sites_site_key_check" CHECK ((site_key = ANY (ARRAY[''property''::text, ''dentists''::text, ''medical''::text, ''solicitors''::text, ''agency''::text, ''generalist''::text, ''contractors-ir35''::text, ''construction-cis''::text])))';
  end if;
end $$;
alter table public."sites" enable row level security;
drop policy if exists "Enable insert for authenticated users only" on public."sites";
create policy "Enable insert for authenticated users only" on public."sites" as permissive for insert to "public" with check ((auth.role() = 'authenticated'::text));
drop policy if exists "Enable read access for all users" on public."sites";
create policy "Enable read access for all users" on public."sites" as permissive for select to "public" using (true);
drop policy if exists "Enable update for authenticated users only" on public."sites";
create policy "Enable update for authenticated users only" on public."sites" as permissive for update to "public" using ((auth.role() = 'authenticated'::text));

-- ── function ingest_web_events ──────────────────────────────
CREATE OR REPLACE FUNCTION public.ingest_web_events(p_session jsonb, p_events jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO public.web_sessions AS s (
    session_id, visitor_id, site_key, last_seen_at,
    entry_path, exit_path, referrer, referrer_host,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    device_type, viewport_w, viewport_h, ua_family, os_family, country, city, region, timezone,
    is_embed, embed_slug, embed_referrer_host, consent_state,
    is_bot, bot_reason, botid_verified, human_confirmed,
    event_count, engaged_ms, max_scroll_pct
  )
  VALUES (
    p_session->>'session_id',
    p_session->>'visitor_id',
    p_session->>'site_key',
    COALESCE((p_session->>'last_seen_at')::timestamptz, now()),
    p_session->>'entry_path',
    p_session->>'exit_path',
    p_session->>'referrer',
    p_session->>'referrer_host',
    p_session->>'utm_source', p_session->>'utm_medium', p_session->>'utm_campaign',
    p_session->>'utm_term', p_session->>'utm_content',
    p_session->>'device_type',
    NULLIF(p_session->>'viewport_w', '')::int,
    NULLIF(p_session->>'viewport_h', '')::int,
    p_session->>'ua_family', p_session->>'os_family', p_session->>'country',
    p_session->>'city', p_session->>'region', p_session->>'timezone',
    COALESCE((p_session->>'is_embed')::boolean, false),
    p_session->>'embed_slug', p_session->>'embed_referrer_host',
    p_session->>'consent_state',
    COALESCE((p_session->>'is_bot')::boolean, false),
    p_session->>'bot_reason',
    NULLIF(p_session->>'botid_verified', '')::boolean,
    COALESCE((p_session->>'human_confirmed')::boolean, false),
    COALESCE((p_session->>'event_count')::int, 0),
    COALESCE((p_session->>'engaged_ms')::int, 0),
    COALESCE((p_session->>'max_scroll_pct')::int, 0)
  )
  ON CONFLICT (session_id) DO UPDATE SET
    last_seen_at    = GREATEST(s.last_seen_at, EXCLUDED.last_seen_at),
    exit_path       = COALESCE(EXCLUDED.exit_path, s.exit_path),
    -- context: keep the first-seen values (entry stays from first page_view)
    entry_path      = COALESCE(s.entry_path, EXCLUDED.entry_path),
    referrer        = COALESCE(s.referrer, EXCLUDED.referrer),
    referrer_host   = COALESCE(s.referrer_host, EXCLUDED.referrer_host),
    utm_source      = COALESCE(s.utm_source, EXCLUDED.utm_source),
    utm_medium      = COALESCE(s.utm_medium, EXCLUDED.utm_medium),
    utm_campaign    = COALESCE(s.utm_campaign, EXCLUDED.utm_campaign),
    utm_term        = COALESCE(s.utm_term, EXCLUDED.utm_term),
    utm_content     = COALESCE(s.utm_content, EXCLUDED.utm_content),
    device_type     = COALESCE(s.device_type, EXCLUDED.device_type),
    viewport_w      = COALESCE(s.viewport_w, EXCLUDED.viewport_w),
    viewport_h      = COALESCE(s.viewport_h, EXCLUDED.viewport_h),
    ua_family       = COALESCE(s.ua_family, EXCLUDED.ua_family),
    os_family       = COALESCE(s.os_family, EXCLUDED.os_family),
    country         = COALESCE(s.country, EXCLUDED.country),
    city            = COALESCE(s.city, EXCLUDED.city),
    region          = COALESCE(s.region, EXCLUDED.region),
    timezone        = COALESCE(s.timezone, EXCLUDED.timezone),
    -- sticky monotonic flags
    is_bot          = s.is_bot OR EXCLUDED.is_bot,
    bot_reason      = COALESCE(s.bot_reason, EXCLUDED.bot_reason),
    botid_verified  = COALESCE(EXCLUDED.botid_verified, s.botid_verified),
    human_confirmed = s.human_confirmed OR EXCLUDED.human_confirmed,
    -- counters (this batch's deltas)
    event_count     = s.event_count + EXCLUDED.event_count,
    engaged_ms      = s.engaged_ms + EXCLUDED.engaged_ms,
    max_scroll_pct  = GREATEST(s.max_scroll_pct, EXCLUDED.max_scroll_pct);

  INSERT INTO public.web_events (
    session_id, visitor_id, site_key, event_name, ts, client_ts,
    page_path, page_query, props, is_embed, is_bot
  )
  SELECT
    e->>'session_id',
    e->>'visitor_id',
    e->>'site_key',
    e->>'event_name',
    COALESCE((e->>'ts')::timestamptz, now()),
    NULLIF(e->>'client_ts', '')::timestamptz,
    e->>'page_path',
    e->>'page_query',
    COALESCE(e->'props', '{}'::jsonb),
    COALESCE((e->>'is_embed')::boolean, false),
    COALESCE((e->>'is_bot')::boolean, false)
  FROM jsonb_array_elements(p_events) e;
END;
$function$
;

-- ── triggers leads ──────────────────────────────
CREATE OR REPLACE FUNCTION public.stitch_lead_to_session()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.web_sessions
     set lead_id = NEW.id
   where session_id = NEW.session_id
     and lead_id is null;
  return NEW;
end;
$function$
;
drop trigger if exists "stitch_lead_to_session_trg" on public."leads";
CREATE TRIGGER stitch_lead_to_session_trg AFTER INSERT ON public.leads FOR EACH ROW WHEN ((new.session_id IS NOT NULL)) EXECUTE FUNCTION stitch_lead_to_session();

-- ── view vw_visitor_journey ──────────────────────────────
create or replace view public."vw_visitor_journey" as
 WITH ev AS (
         SELECT web_events.site_key,
            web_events.visitor_id,
            count(*) FILTER (WHERE web_events.event_name = 'page_view'::text) AS page_views,
            count(*) FILTER (WHERE web_events.event_name = 'cta_click'::text) AS cta_clicks
           FROM web_events
          WHERE web_events.is_bot = false
          GROUP BY web_events.site_key, web_events.visitor_id
        ), first_touch AS (
         SELECT DISTINCT ON (s_1.site_key, s_1.visitor_id) s_1.site_key,
            s_1.visitor_id,
            s_1.referrer_host AS first_referrer_host,
            s_1.utm_source AS first_utm_source
           FROM web_sessions s_1
          WHERE s_1.is_bot = false
          ORDER BY s_1.site_key, s_1.visitor_id, s_1.started_at
        )
 SELECT s.site_key,
    s.visitor_id,
    min(s.started_at) AS first_seen,
    max(s.last_seen_at) AS last_seen,
    count(DISTINCT s.session_id) AS total_sessions,
    sum(s.event_count) AS total_events,
    sum(s.engaged_ms) AS total_engaged_ms,
    max(s.max_scroll_pct) AS max_scroll_pct,
    bool_or(s.lead_id IS NOT NULL) AS converted,
    max(s.lead_id::text) AS lead_id,
    mode() WITHIN GROUP (ORDER BY s.device_type) AS device_type,
    mode() WITHIN GROUP (ORDER BY s.os_family) AS os_family,
    mode() WITHIN GROUP (ORDER BY s.country) AS country,
    ft.first_referrer_host AS referrer_host,
    ft.first_utm_source AS utm_source,
    COALESCE(max(ev.page_views), 0::bigint) AS page_views,
    COALESCE(max(ev.cta_clicks), 0::bigint) AS cta_clicks,
    array_agg(DISTINCT s.entry_path) FILTER (WHERE s.entry_path IS NOT NULL) AS entry_paths
   FROM web_sessions s
     LEFT JOIN ev ON ev.site_key = s.site_key AND ev.visitor_id = s.visitor_id
     LEFT JOIN first_touch ft ON ft.site_key = s.site_key AND ft.visitor_id = s.visitor_id
  WHERE s.is_bot = false
  GROUP BY s.site_key, s.visitor_id, ft.first_referrer_host, ft.first_utm_source;;