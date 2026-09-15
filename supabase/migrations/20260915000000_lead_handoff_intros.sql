-- Warm handoff introduction emails: the ledger that makes "never twice" a
-- database guarantee rather than an application promise.
--
-- One row is inserted BEFORE the email is sent, as a claim. The two constraints
-- below are what actually enforce the owner's requirement:
--
--   lead_id PRIMARY KEY   one introduction per lead, so toggling the tracker's
--                         "Send Email?" column off and on, clearing and re-setting
--                         "Sent to Omar", or two overlapping cron runs, cannot
--                         produce a second send. The sheet is only ever an
--                         instruction to CONSIDER sending; this table decides
--                         whether it already happened.
--
--   email_norm UNIQUE     one introduction per PERSON, so the same enquirer across
--                         two different lead rows is introduced once. A genuine
--                         repeat enquiry months later is therefore skipped, by
--                         design; the cron reports those so a human can introduce
--                         them by hand rather than them vanishing silently.
--
-- Claim-then-send (not send-then-record) is deliberate: a crash between the two
-- leaves an unused claim, which blocks one email. The reverse order would send
-- the same customer a second copy, which is the failure we are paying to avoid.
-- The send path deletes its own claim when the send fails, so a transient Resend
-- outage retries on the next pass instead of losing the lead.
--
-- This table is ALSO the go-live watermark. The leads already marked up in the
-- tracker (112 "Omar", 4 "Send", 26 "Yes" as at 2026-09-15, going back to April)
-- are claimed here with mode='watermark' and sent nothing, which makes them
-- permanently unsendable through the same constraint that enforces the dedupe
-- rather than a second parallel mechanism that could drift out of step.
--
-- That claiming happens automatically on the sync's first ever run, driven by
-- lead_handoff_control (see 20260915000001). There is deliberately no script and
-- no manual step: a one-way action that must be remembered on the right day is
-- exactly what gets lost when the person or agent doing the work changes.

CREATE TABLE IF NOT EXISTS public.lead_handoff_intros (
  lead_id     UUID PRIMARY KEY REFERENCES public.leads(id) ON DELETE CASCADE,
  email_norm  TEXT NOT NULL,
  partner_ref TEXT NOT NULL DEFAULT 'aswatax',
  -- 'report' and 'redirect' are test modes; 'live' is the only one that reaches a
  -- real enquirer. 'watermark' rows were never sent at all: they are pre-existing
  -- tracker decisions, claimed so they can never fire retrospectively.
  mode        TEXT NOT NULL,
  provider_id TEXT,
  sent_at     TIMESTAMPTZ,
  claimed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Case/whitespace-insensitive one-per-person. Normalisation happens in the
-- application (lower + trim) and is asserted here.
CREATE UNIQUE INDEX IF NOT EXISTS lead_handoff_intros_email_norm_key
  ON public.lead_handoff_intros (email_norm);

CREATE INDEX IF NOT EXISTS lead_handoff_intros_claimed_at_idx
  ON public.lead_handoff_intros (claimed_at DESC);

ALTER TABLE public.lead_handoff_intros ENABLE ROW LEVEL SECURITY;

-- No policies: service-role only, same posture as the rest of the lead tables.
-- RLS on with zero policies denies every anon/authenticated request outright.

COMMENT ON TABLE public.lead_handoff_intros IS
  'One row per warm-handoff introduction. PK enforces one per lead, the email_norm '
  'unique index enforces one per person. Rows with mode=''watermark'' were never '
  'sent: they block pre-go-live tracker decisions from firing retrospectively.';
