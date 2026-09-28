# Estate parity, phase 0: builder brief (2026-09-28)

Owner go given 2026-09-28 evening for phase 0 of `ESTATE_PARITY_PLAN_2026-09-28.md` (about 40
agents). This brief is the single instruction set for the 17 per-site builders and the three
cross-cutting agents. Read it in full, then your site's research report
`docs/<site>/PARITY_RESEARCH_2026-09-28.md` (agency is `docs/agency/`), then work.

## 0. Rules (non-negotiable)

1. **One agent per site. Edit only your site's directory** (`<site>/web`, `<site>/niche.config.json`,
   `<site>/pipeline`, `docs/<site>/STATE.md`). Never edit `packages/`, `agents/`, `scripts/`, or
   another site. The shared-packages agent owns `packages/`; the plumbing agent owns
   `agents/config/gsc_config.py`. If a fix you need lives in `packages/`, write it in your report
   under "Needs the shared agent" and move on.
2. **Never** `git checkout`, `git restore`, `git stash`, `git clean`, `git reset`, `git commit`,
   `git push`. Twenty agents share one working tree and one index. The manager commits per site
   after the serialised build. You may run `git diff --stat -- <site>/` and `git log`.
3. **No `next build`, no dev server, no `npm install`.** Verify with `npx tsc --noEmit -p <site>/web`
   and `npx vitest run` from `<site>/web` if the site has tests. The manager builds every site in
   series afterwards.
4. Scratch goes in `C:\Users\user\.claude\jobs\933e5962\tmp\p0-<site>\`, deleted at the end.
5. British English. No em-dashes in anything a prospect can read. Code comments and commits are
   exempt. Property's wording is the reference for every prospect-facing string.
6. Nothing deploys, nothing is submitted to IndexNow, no monitor, cron, email, popup or banner is
   created or changed.
7. Evidence for every "done": the file and line, and the grep or tsc output that proves it.
8. Reuse before writing. The shared library (`packages/web-shared`), Property and Medical already
   hold every component this brief names. Copy their pattern; do not invent a second one.

## 1. Positioning: the brand IS the firm (decisions 2 and 3)

Every prospect-facing and lead-facing sentence speaks as the firm, in Property's voice. Sweep by
rule, not by the research report's list; the report is a starting point, the grep is the check.

Defect strings (case-insensitive, grep `web/src`, `niche.config.json`, `web/public/llms.txt`,
`web/src/config/lead-nurture.ts`, SMS copy under `web/src/app/api` and `web/src/lib/leads`):
"partner network", "referral network", "not an accountancy practice", "not a law firm, not an
accountancy practice", "a specialist reviews", "a specialist will", "specialist firm from", "the
specialist firm you speak to", "up to six", "regulated firms in our", "matching service",
"accountancy matching", "we are not accountants", "editorial content only", "pre-launch",
"nothing here should be cited", "STUB".

Exempt, do not touch: the consent sentence under the lead form (`leadConsentText` in
`config/site.ts`, verbatim estate-wide), the privacy policy, the terms page, and the post-submit
Aswatax introduction line on thank-you pages.

Replacement voice, from Property: "we", "our accountants", "one of our team", "we reply within 24
hours and one of our accountants comes back to you directly", "Free first call, then a fixed fee in
writing". Copy Property's exact strings where a like-for-like exists (`Property/niche.config.json`
`cta`, `entity`, `Property/web/src/config/site.ts`, `Property/web/src/components/forms/LeadForm.tsx:444`,
`packages/web-shared/design/marketing/LeadCTAPanel.tsx:18`).

**construction-cis** (decision 2): the pool-model copy on privacy section 5, about, contact, complete,
home and services converts to the firm voice like every other site. Privacy keeps its data-sharing
disclosure paragraph (that is the legal text) but no longer describes a "specialist partner network"
in prospect-facing prose.

**wills-probate and divorce-finances** (decision 3): restate the proposition as the money side of
the matter, which we do, with the legal work as a named step: "Where you need a solicitor, we
introduce you to a regulated firm we work with, and we stay on the money side." One sentence of that
shape per page where the old caveat stood; no "network", no "not a practice". Replace
`public/llms.txt` entirely, modelled on `Property/web/public/llms.txt` (firm-first opening, every
link tagged `utm_source=chatgpt&utm_medium=llms`, audiences, services, calculators listed). Fix
divorce `/services` "Full service detail is being built now."

**`niche.config.json` `entity` key**: every site carries one in Property's shape (copy
`Property/niche.config.json` `entity`, adapt the sector words). It feeds schema and llms.txt.

**Organization JSON-LD**: on the shared builder `packages/web-shared/schema/organization.ts`,
`@type` AccountingService, firm-first description, `sameAs`, `parentOrganization` Ashfield Trading
Ltd 16358723, `knowsAbout` from the audience rows, one node per page. Medical's port is the
reference (`Medical/web/src/lib/organization-schema.ts` or `lib/schema.ts`). Diff the emitted JSON
before and after; every existing field survives.

## 2. Free first call and the 24-hour promise (decision 6)

Property's wording everywhere: "Free first call, then a fixed fee in writing" on the lead panel
eyebrow and sticky secondary; "We reply within 24 hours and one of our accountants comes back to
you directly." as the next-step line. Remove "free consultation", "free review", "free practice
health check" style variants in favour of that pair. In `lead-nurture.ts`, the instant
acknowledgement email (the first `delayHours: 0` step) states the promise in one sentence: "One of
our accountants will call you within 24 hours, Monday to Friday." Same sentence on every site.

## 3. Nurture timing

`delayHours` is the GAP between sends. Property's array is correct: `0, 0, 4, 20, 24, 48, 72, 96`.
Sites carrying `0, 0, 4, 24, 48, 96, 168, 264` have the cumulative timeline in the gap field and run
25 days instead of 11; set them to Property's values. Nurture copy in the firm voice per section 1.

## 4. Lead kit on every money page

- **One `LeadCTAPanel` (shared) with the site's `LeadForm` at the foot** of: home, /about,
  /services and every `/services/*`, every `/for/*` or `/for-*`, every blog post, /contact. Use the
  research report's list of pages rendering zero forms; verify by grepping the page files for the
  panel import, not by memory.
- **Exactly one form directly under a calculator result**, no gate, no modal, no PDF offer. Remove
  `ResultGate` / `ResultGateModal` usage where it still gates (Medical, generalist, contractors,
  digital-agency, divorce-finances, and any other you find). Sites stacking two identical forms on a
  calculator page (care, charities) keep one.
- **Header call-to-action** where the site has none at any width (hospitality, care, pharmacies,
  startups-tech): the kit header pattern from Property or Medical, visible at 1280, hidden below
  1024 (verify the hide in rendered DOM later, not the class list).
- **Footer "Book a consultation"** must reach a page that renders a form. generalist's `/book` does;
  Property's and thirteen others' do not. Either point the footer at `/contact#form` or make `/book`
  render the form without a token, whichever is the smaller diff on your site. Wording on the
  booking page: "An accountant will call you then." (contractors-ir35's line).
- **Segment-page closers**: no slug pasted into English ("your miners situation"); no one closer
  shared by every page. Vary by audience in one sentence each, Opus-quality; if you are Sonnet, write
  the closers plainly and flag them for the Opus read.

## 5. Machine layer

- `Service` + `FAQPage` + `BreadcrumbList` on every segment and service page from the shared schema
  lib; Medical `/for-gps` is the reference (7 Service nodes, 1 FAQPage, 1 BreadcrumbList).
- Hub canonicals self-referencing: `/for`, `/services`, `/about`, `/contact`, every `/for/*` and
  `/services/*`. Commit `bb297ab2` shows the fix shape. Grep every page's `alternates.canonical`.
- Sitemap `lastModified`: a real date from the content, or omitted. Never build-time `new Date()`,
  never one frozen constant for every entry. Property's `sitemap.ts` is the pattern.
- `og:image` must return 200 (wills-probate and divorce-finances point at a missing
  `/brand/icon-alt.png`; point at an asset that exists in `public/`).
- Body copy stored with HTML anchors (`startups-services.ts`, `startups-hubs.ts`, and the same
  shape on ecommerce, hospitality, pharmacies) renders through the template's `html` prop or
  `dangerouslySetInnerHTML`, never as a JSX text child. Medical's `CoverageCards`/`FaqSection`
  `html` prop is the pattern.
- `robots.ts`: the AI-crawler allowlist as Property's; keep the site's disallow list.
- `pipeline/submit_indexnow.py`: copy Property's, swap HOST and KEY; the key file already sits in
  `web/public/` on most sites (reuse it; generate a fresh 32-hex key only if none exists).

## 6. Analytics and AdSense (owner 2026-09-28: "set up every site for AdSense, so it needs Google
Analytics where it can")

- **GA4**: `niche.config.json` `google_analytics_id` must be set. The plumbing agent creates or finds
  the property and reports the `G-` id in `docs/_engines/ESTATE_PLUMBING_2026-09-28.md`; the
  manager pastes it. Per-site builders confirm the shared `ConsentProvider` / `AnalyticsProvider` /
  `GoogleAnalytics` chain is mounted in `layout.tsx` exactly as Property's, and leave the id field
  alone.
- **AdSense**: replicate the Solicitors pattern on every site: `layout.tsx` metadata
  `other: { "google-adsense-account": "ca-pub-3756285576371279" }`, `<ConsentedScripts
  adsenseClientId="ca-pub-3756285576371279" />` from `packages/web-shared/analytics/react`,
  `public/ads.txt` copied from `Solicitors/web/public/ads.txt`, and the security-header change is
  already in the shared builder (`next.config.ts` change from `7edc7fd3` if the site's config lacks
  it). Commits `7edc7fd3` and `153e5017` show every line. No ad units on calculator result blocks or
  inside a lead panel.

## 7. Per-site closing tasks

- `docs/<site>/STATE.md`: one dated entry "2026-09-28 phase 0 parity" listing what changed and what
  is live versus HEAD, correcting any stale "not deployed" or "brand not locked" line by reference
  to the research report. wills-probate and divorce-finances: the silent-sites agent owns STATE.md;
  do not touch it.
- Verification: `npx tsc --noEmit`; `npx vitest run` if tests exist; greps that return zero for
  every defect string in section 1 across `web/src`, `niche.config.json`, `web/public/llms.txt`;
  a grep that every money page file imports the lead panel; `git diff --stat -- <site>/` non-empty
  and listing only your site.
- Report: `docs/<site>/PHASE0_2026-09-28.md`, under 120 lines: what changed (file, line), what you
  could not do and why, "Needs the shared agent" items, "Needs the Opus read" items (closers, any
  copy you wrote), the tsc and vitest result lines.

## 8. The three cross-cutting agents

**Shared packages (Sonnet, owns `packages/`)**: visible focus ring on every form control
(`packages/site-styles` and the shared form styles: `outline: 2px solid` in the brand ring token on
`:focus-visible`, never `outline-style: none` without a replacement); `StatsCounter` guard so a
non-numeric value renders as its literal (the mapper defect the readout names on generalist and
Medical); confirm the shared `LeadCTAPanel` defaults carry Property's wording; confirm the schema lib
exports Service, FAQPage, BreadcrumbList, Organization builders the sites need; run the package
tests. Touch no site directory. Report `docs/_engines/PHASE0_SHARED_2026-09-28.md`.

**Plumbing (Sonnet, owns `agents/config/gsc_config.py` and the GA4 account)**: add
`gsc_config.py` entries for crypto, ecommerce, hospitality, wills-probate, divorce-finances in the
shape of the existing nine (all 17 domains are verified `sc-domain:` properties at owner level per
the data read); GA4: using the OAuth token in `ga4_token.json` (memory `ga4_access_setup`) list the
account's properties, match each of the 17 domains, and for any site without a property attempt to
create one via the Admin API with a web data stream; if the token lacks the edit scope, stop and
write the exact list the owner must create, with the stream URLs. Report every `G-` id per site in
`docs/_engines/ESTATE_PLUMBING_2026-09-28.md`, plus the AdSense account-side checklist (each domain
must be added and approved in the AdSense console; `ads.txt` must serve 200 after deploy).
Read-only on everything else.

**Silent sites (Opus, owns `docs/wills-probate/STATE.md`, `docs/divorce-finances/STATE.md`, and
read-only elsewhere)**: the owner reports both sites ARE receiving Search Console data, so re-pull
GSC for both with the impressions dimension over 90 days and record it; then find why `web_sessions`
and `leads` have no rows for either (site key sent by the beacon, the endpoint, the consent gate,
`sites` row `active` flag, RLS); check read-only whether migrations `20260724000001` and
`20260803000002` are applied in production; record the Vercel project ids from the API (token in
root `.env`); write both STATE.md files with the truth (live since when, deployment id, what is
broken) and a fix list for the manager. Report `docs/_engines/PHASE0_SILENT_SITES_2026-09-28.md`.

## 9. After the agents (manager)

Serialised builds per site, per-site commits, four Opus rendered reads at 1280 and real 390 with the
gov.uk control against `next start` on a fresh port per site (kill only the PID you started),
mop-up, `check_dependency_closure.py`, one push, CI watched, then the deploy round on the owner's
word: Property, Medical, contractors, care, charities, then the twelve. `calc_pdf_offer` off the
same day.
