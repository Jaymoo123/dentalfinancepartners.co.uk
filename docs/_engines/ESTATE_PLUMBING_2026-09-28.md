# Estate plumbing: GSC config, GA4, AdSense (2026-09-28)

Phase 0 plumbing agent. Scope: `agents/config/gsc_config.py` and the GA4 account only. No site
directories or `packages/` touched. Read-only on Supabase and Vercel, no git write commands.

## 1. gsc_config.py

Added 5 entries in the shape of the existing 9 (`crypto`, `ecommerce`, `hospitality`,
`wills-probate`, `divorce-finances`) — `agents/config/gsc_config.py`. `site_url` taken from each
site's `niche.config.json` `domain`, all `sc-domain:` per the owner-level verification the brief
states. `content_dir` / `git_repo_path` confirmed against each site's actual
`web/content/blog` directory (all five follow the standard shape).

Proof it loads:

```
$ python agents/config/gsc_config.py
[OK] Configuration is valid
Configured niches: property, dentists, medical, solicitors, agency, generalist,
  contractors-ir35, care, charities, crypto, ecommerce, hospitality,
  wills-probate, divorce-finances
Enabled niches: property, dentists, agency, generalist, contractors-ir35, care,
  charities, crypto, ecommerce, hospitality, wills-probate, divorce-finances
```

(`medical` and `solicitors` were already `enabled: False` before this change; untouched.)

## 2. GA4

**Token scope**: `secrets/ga4_token.json` carries `analytics.readonly` only. Listing works;
`properties.create` returns `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` (`PERMISSION_DENIED`, confirmed
by a live create call against the existing account, then not persisted — no property was created).
**No property or stream was created by this agent.** Stopping per brief instruction 2.

**Account Summaries read** (`GET accountSummaries`, 2 accounts, 7 properties total, all listed —
no pagination truncation):

- Account `368052787` "Air Fryer Recipes": 3 properties, none match any of the 17 estate domains
  (unrelated personal/other projects — Air Fryer Recipes, SiteNudge, Emplifex).
- Account `389139578` "dentalfinancepartners.co.uk": 4 properties — dentists, property, medical,
  solicitors. These are the same 4 already in `optimisation_engine/clients/ga4_config.py`.

**13 of the 17 estate domains have no GA4 property anywhere the token can see.**

### Site x property x stream table

| site (niche.config `site_key`) | current `google_analytics_id` | GA4 property id | `G-` measurement id | action taken |
|---|---|---|---|---|
| dentists | `null` | 530287964 | G-273RJY0LZQ | none needed — property + stream exist |
| property | `null` | 530522680 | G-B5MCP5NGMY | none needed — property + stream exist |
| medical | `null` | 531115672 | G-CQF7KFZ1P6 | none needed — property + stream exist |
| solicitors | `null` | 531116555 | G-N6ZPRB3DSQ | none needed — property + stream exist |
| care | `null` | none | none | **owner must create** (below) |
| charities | `null` | none | none | **owner must create** |
| construction-cis | `null` | none | none | **owner must create** |
| contractors-ir35 | `null` | none | none | **owner must create** |
| crypto | `null` | none | none | **owner must create** |
| digital-agency (agency) | `null` | none | none | **owner must create** |
| divorce-finances | `null` | none | none | **owner must create** |
| ecommerce | `null` | none | none | **owner must create** |
| generalist | `null` | none | none | **owner must create** |
| hospitality | `null` | none | none | **owner must create** |
| pharmacies | `null` | none | none | **owner must create** |
| startups-tech | `null` | none | none | **owner must create** |
| wills-probate | `null` | none | none | **owner must create** |

No `google_analytics_id` was written to any `niche.config.json` (that field is the manager's to
paste, per the brief; this agent only reads it).

### Owner action list — 13 properties to create

The OAuth token cannot create these (read-only scope; re-authenticating with the `analytics.edit`
scope and re-running the browser consent flow would let a future agent do this instead of the
owner, if that is preferred). Until then, for each site below, in the same GA4 account
(`389139578`, "dentalfinancepartners.co.uk") or a new one of the owner's choosing:

1. Admin -> Create property
2. Time zone: Europe/London, Currency: GBP
3. Add a web data stream with the stream URL below
4. Copy the resulting `G-XXXXXXXXXX` measurement id back to this agent/the manager

| Display name | Stream URL |
|---|---|
| Care Home Tax | https://www.carehometax.co.uk |
| Trustee Tax | https://www.trusteetax.co.uk |
| Trade Tax Specialists | https://www.tradetaxspecialists.co.uk |
| Contractor Tax Accountants | https://www.contractortaxaccountants.co.uk |
| Crypto Tax Partners | https://www.cryptotaxpartners.co.uk |
| Agency Founder Finance | https://www.agencyfounderfinance.co.uk |
| Divorce Finance Specialists | https://www.divorcefinancespecialists.co.uk |
| Ecommerce Finance | https://www.ecommercefinance.co.uk |
| Holloway Davies | https://www.hollowaydavies.co.uk |
| Hospitality Tax | https://www.hospitalitytax.co.uk |
| Pharmacy Tax | https://www.pharmacytax.co.uk |
| Founder Tax Partners | https://www.foundertaxpartners.co.uk |
| Estate Planning Specialists | https://www.estateplanningspecialists.co.uk |

(`ashfield` — the parent trading-entity site — is not one of the 17 parity-plan sites and is out
of this scope.)

## 3. AdSense account-side checklist (owner)

Publisher id `ca-pub-3756285576371279`. This agent has no AdSense API access (out of scope, no
credentials found for it); this is a checklist, not a verified state.

For every one of the 17 domains:

1. AdSense console -> Sites -> Add site -> enter the domain, wait for the review/approval status
   to go from "Getting ready"/"Needs attention" to "Ready".
2. After the per-site builders deploy `public/ads.txt` (copied from `Solicitors/web/public/ads.txt`
   per brief section 6), confirm `https://<domain>/ads.txt` returns 200 and contains the
   `pub-3756285576371279` line — this is a post-deploy check, not doable pre-deploy from here.
3. Confirm each site's `layout.tsx` carries the `google-adsense-account` meta tag and
   `<ConsentedScripts adsenseClientId="ca-pub-3756285576371279" />` — that is the per-site
   builders' job (brief section 6), not this agent's; not verified here.

## 4. gsc_config diff

```diff
--- a/agents/config/gsc_config.py
+++ b/agents/config/gsc_config.py
@@ (end of GSC_CONFIG, after "charities")
+    "crypto": { site_url: sc-domain:cryptotaxpartners.co.uk, site_key: crypto,
+        content_dir: crypto/web/content/blog, git_repo_path: crypto/web, enabled: True },
+    "ecommerce": { site_url: sc-domain:ecommercefinance.co.uk, site_key: ecommerce,
+        content_dir: ecommerce/web/content/blog, git_repo_path: ecommerce/web, enabled: True },
+    "hospitality": { site_url: sc-domain:hospitalitytax.co.uk, site_key: hospitality,
+        content_dir: hospitality/web/content/blog, git_repo_path: hospitality/web, enabled: True },
+    "wills-probate": { site_url: sc-domain:estateplanningspecialists.co.uk, site_key: wills-probate,
+        content_dir: wills-probate/web/content/blog, git_repo_path: wills-probate/web, enabled: True },
+    "divorce-finances": { site_url: sc-domain:divorcefinancespecialists.co.uk, site_key: divorce-finances,
+        content_dir: divorce-finances/web/content/blog, git_repo_path: divorce-finances/web, enabled: True },
```

(Full diff: `git diff --stat -- agents/config/gsc_config.py` shows one file changed, +90/-0 lines,
all inside `GSC_CONFIG`; no other file touched by this agent.)
