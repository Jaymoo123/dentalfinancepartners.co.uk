-- Add 're_consented' to the lead_contact_events vocabulary.
--
-- Why: an opted-out lead who SUBMITS A FRESH FORM has given fresh consent
-- (a new Article 6 basis), so the contactability gate must stop treating the
-- historical opted_out event as absolute. The submit route records
-- re_consented (channel 'web') when a dedupe hit reopens a closed/unreachable
-- lead; evaluateContactability then blocks on opted_out ONLY when it is not
-- followed by a later re_consented.
--
-- Same drop-then-add pattern as the booking_viewed extension (idempotent on
-- fresh and already-applied DBs).

alter table public.lead_contact_events drop constraint if exists lead_contact_events_event_type_check;
alter table public.lead_contact_events add constraint lead_contact_events_event_type_check
  check (event_type in
    ('verify_pass','verify_fail','sent','delivered','opened','clicked',
     'replied','confirmed','booked','opted_out','handed_off','send_failed',
     'ack_sent','operator_update','booking_viewed','re_consented'));
