-- Record the whole case-type classification against a lead, not just the tier.
-- docs/CLASSIFY.md:99 says "the classifier's JSON is stored with the lead (case_tier
-- plus intent line) at grading time; the tier on the ping, the delivery and the invoice
-- line are all read from that record, never re-derived". 20260810000001 added case_tier;
-- the case type and the intent line had nowhere to live, so the rubric could not actually
-- be checked against a delivered lead. These two columns close that.
--
-- Deliberately NOT constrained to a fixed list: case_type is an open tag from the
-- published lists (docs/CLASSIFY.md), and pinning it in the database would mean a
-- migration every time the rubric gains an example.

alter table public.lead_value_scores
  add column if not exists case_type text,
  add column if not exists intent_line text;

-- The value-score fields become optional. A lead can now be graded under the published
-- rubric without ever having been value-scored, which is the normal case going forward:
-- the case tier sets the price and the value score is an internal quality signal only
-- (docs/CLASSIFY.md:100). Requiring an estimated value in order to record a classification
-- would force us to invent one, which is exactly what the rubric forbids. Readers already
-- tolerate absence (offerTierFor prefers case_tier; offer-send guards on truthiness).
alter table public.lead_value_scores
  alter column tier          drop not null,
  alter column est_value_gbp drop not null,
  alter column intent        drop not null,
  alter column work_type     drop not null,
  alter column channel       drop not null;

comment on column public.lead_value_scores.case_tier is
  'Published case-type tier (advisory/standard/essential) under docs/CLASSIFY.md. Sets the price. Never derived from est_value_gbp.';
comment on column public.lead_value_scores.case_type is
  'Short case-type tag from the published lists, e.g. incorporation, landlord_sa_complex, basic_return.';
comment on column public.lead_value_scores.intent_line is
  'One sentence, max 15 words, no names, contact details, company names or exact addresses. Shown on the redacted alert.';

-- Rollback:
--   alter table public.lead_value_scores drop column if exists case_type;
--   alter table public.lead_value_scores drop column if exists intent_line;
