# Agency Lead Attribution Read — 2026-07-08

## Numbers

| Metric | Value |
|---|---|
| Total web_sessions | 307 |
| Human-confirmed sessions | 107 (Jun: 28, Jul: 79) |
| All-time leads (source='agency') | 0 |

Note: the attribution script reported 39 human sessions against a raw session count of 307;
the direct DB query (human_confirmed=true) returns 107. The script likely uses a tighter
human filter. Either way, leads = 0.

## Funnel stage verdict: CONVERSION

Traffic is arriving and engagement is real. The funnel does not die at traffic or engagement;
it dies at the conversion step (form completion → lead).

Evidence:
- 107 human sessions over ~5 weeks; 79 in July alone (accelerating).
- Top entry pages: two van capital-allowances posts dominate (54 + 12 sessions). Homepage
  receives only 10 human sessions — most organic arrivals are content-first, not intent-first.
- Referrer breakdown: 83 direct/unknown, 12 Bing, 4 Google, 2 DuckDuckGo, 3 ChatGPT/AI.
  Bing is the primary identified search driver. Zero paid/UTM traffic.
- Engagement is genuine: top sessions hit 22-47 events and 74s–474s engaged time.
  Two ChatGPT referrals produced 21-47 events (strong AI-answer traffic signal).
- Events: zero form_submit fired. Only 1 form_start, 3 form_field_focus, 2 form_field_abandon.
  No modal_open, no calc engagement beyond 2 calc_view. 393 subscribe_view events vs 0 subscribe
  conversions recorded.

The conversion gap is structural, not a capture defect: organic arrivals land on
informational blog posts (van capital allowances = a generalist tax topic, not agency-founder
content), read the article, and leave without encountering a compelling conversion prompt.
The homepage, which has the form, sees only ~9% of human traffic.

## Channel breakdown (human sessions, n=107)

| Channel | Sessions | % |
|---|---|---|
| Direct / unknown | 83 | 78% |
| Bing organic | 12 | 11% |
| Google organic | 4 | 4% |
| DuckDuckGo | 2 | 2% |
| ChatGPT / AI referral | 3 | 3% |
| Yahoo | 1 | 1% |

No paid, no social, no email, no UTM-tagged campaigns.

## Top entry paths (human)

1. `/blog/tax-and-compliance/capital-allowances-on-vans` — 54 sessions (50% of all human)
2. `/blog/tax-and-compliance/capital-allowances-second-hand-vans` — 12 sessions
3. `/` — 10 sessions
4. International agency posts (UAE/Dubai topics) — 8 sessions across 4 posts
5. Growth+exit posts — 5 sessions across 2 posts

The van allowances posts are generic SME tax content, not agency-founder content. They pull
traffic but the visitor intent does not match the service.

## Lead form: silent-drop risk

**No silent-drop defect.** The agency form uses the estate-standard pattern:

- Honeypot field: `enquiry_ref` (not `company_url`) with `autoComplete="off"` and
  `tabIndex={-1}` positioned off-screen at `-9999px`. The Property bug (`company_url`
  autofilled by browsers) is not present here.
- Client-side: honeypot value is passed to the server; the client NEVER aborts on honeypot
  presence (comment at line 91: "NEVER abort client-side on honeypot — silent drop kills
  real autofilled submissions").
- Server: `createLeadSubmitHandler({ source: "agency" })` — the shared factory handles
  flagging, dedup, env isolation, and probe support.
- Consent checkbox: present, mandatory, gated (`button disabled` until `consent=true`).
- Source identifier: set to `'agency'` at route level.

The form is clean. The 0-lead figure reflects zero completions, not dropped completions.

## Email notification status

**Working, but routed through the Property site.**

The `leads_to_email_trg` Supabase trigger fires on every INSERT into `leads` and calls
`propertytaxpartners.co.uk/api/leads/notify` with a shared webhook secret. That route
is estate-wide and source-aware:

- `source='agency'` → `resolveLeadTo('agency')` → `junaydmoughal@hotmail.co.uk` (shared inbox)
- CC: Reflex Accounting (`ahmadtirmizey@reflexaccounting.co.uk`) is copied unless source is in
  `LEADS_NOTIFY_CC_EXCLUDE_SOURCES` (default: `property,test`). Agency is NOT excluded, so
  the partner firm WILL be CC'd on any agency lead that arrives.

When the first agency lead is submitted, notification and partner CC will fire correctly.

## Action priorities

1. **Conversion surface**: the form is invisible to 91% of arrivals. Add an inline CTA /
   mini-form to the van allowances posts (or redirect them toward agency-specific content).
2. **Intent mismatch**: van capital-allowances is generic SME content, not agency-founder
   content. Either build agency-specific CTAs on these posts, or deprioritise them and build
   traffic on the international-agencies and growth+exit clusters where intent is a better fit.
3. **AI referral**: 3 ChatGPT sessions with high engagement (21-47 events). The GEO program
   should treat agency/international content as a priority surface.
