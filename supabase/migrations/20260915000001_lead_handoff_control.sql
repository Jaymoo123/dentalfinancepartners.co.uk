-- Self-arming watermark for the warm-handoff introduction.
--
-- REPLACES a manual step. The first design required an operator to run
-- scripts/seed_handoff_watermark.py before ever setting the mode to live,
-- otherwise the decisions already sitting in the Lead Tracker (112 "Omar", 4
-- "Send", 26 "Yes" as at 2026-09-15, back to April) would be read as fresh
-- instructions and introduce people who were handed over months ago.
--
-- That is precisely the kind of "must happen on the right day, in the right
-- order, and can never be undone" step that gets lost when the person or the
-- agent doing the work changes. So the watermark is now a property of the
-- system instead of an item on a checklist:
--
--   watermarked_at IS NULL  ->  the next run, in ANY mode, claims every decision
--                               currently in the sheet, sends nothing, and
--                               stamps this row.
--   watermarked_at SET      ->  normal operation; only decisions made after that
--                               moment can ever act.
--
-- Because it is the same code path every time, it cannot be skipped, run twice,
-- or forgotten. Singleton row, mirroring lead_nurture_control's shape.

CREATE TABLE IF NOT EXISTS public.lead_handoff_control (
  id              SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  watermarked_at  TIMESTAMPTZ,
  watermark_rows  INTEGER NOT NULL DEFAULT 0,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.lead_handoff_control (id) VALUES (1)
  ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.lead_handoff_control ENABLE ROW LEVEL SECURITY;

-- No policies on purpose: service role only, same posture as lead_nurture_control.

COMMENT ON TABLE public.lead_handoff_control IS
  'Singleton. watermarked_at NULL means the handoff sync has never run: its next '
  'run claims every existing tracker decision without sending, so historic '
  'handoffs can never be re-introduced. Self-arming by design, no manual step.';
