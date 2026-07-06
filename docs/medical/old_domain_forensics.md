# Phantom-Domain Forensics — medicalaccounts.co.uk

**Step**: B4 (second pass, with coverage join)
**Run date**: 2026-07-06
**Artifact**: `.cache/medical_diag/domain_forensics.json` (B4 second-pass section added)
**Coverage snapshot**: B3 index_coverage.json generated 2026-07-06T16:19:12Z (112 URLs, all 112 inspected via GSC URL Inspection API)

DATA-TRUST HEADER: GSC data exists 2026-04-01 to 2026-07-04 only; API-confirmed empty before April. Coverage inspection reflects Google's state at time of each URL's last crawl, not today's live source (important — see Section 2).

---

## 1. Phantom-domain recap

Three domain strings were tracked across the investigation. They must be kept separate.

| Domain | Role | Status |
|---|---|---|
| `medicalaccounts.co.uk` | Current/correct domain | LIVE |
| `medicalaccountantsuk.co.uk` | Old canonical target (46 legacy posts until 2026-06-17) | PHANTOM — never registered |
| `medicalaccountants.co.uk` | Config typo (`diagnostics.py`, fixed 2026-06-03) | Real third-party domain, never in page canonicals |

### medicalaccountantsuk.co.uk — confirmed phantom

Evidence (from `domain_forensics.json`, `domains.medicalaccountantsuk.co.uk`):

- **DNS (dnspython)**: apex NXDOMAIN=true, www NXDOMAIN=true, zero A/AAAA/CNAME records. The domain does not exist in DNS.
- **RDAP (Nominet)**: HTTP 404. Not registered. Owner confirmed never held this domain.
- **HTTP**: All probes skipped — NXDOMAIN blocks connection.
- **GSC properties** (11 enumerated): `sc-domain:medicalaccounts.co.uk` present; neither phantom domain found. `gsc_old_domain_property_found: false`.
- **DDG `site:` count**: 1 raw result returned, classified as noise (see Section 3 below). True indexed count = 0.
- **Serper Google `site:`**: already_queried_today (idempotency). Moot for NXDOMAIN + unregistered domain — Google cannot index a domain that has never existed in DNS. Not an error; see Section 3.

**Timeline of injury**: The 46 legacy blog posts were live with canonical tags pointing to `medicalaccountantsuk.co.uk` from approximately the May 20 era (when those posts were deployed) until 2026-06-17 (when the canonical fix was applied). During that window, Google received canonical hints pointing into a DNS hole. Google's behaviour for NXDOMAIN canonical targets is undefined; the effect was to deprive the posts of consolidation signal.

**Fix**: 2026-06-17. Canonical tags corrected site-wide across all blog posts to point to `medicalaccounts.co.uk`.

### medicalaccountants.co.uk — real third-party domain, not our concern

- **DNS**: Resolves. A records: 3.33.251.168, 15.197.225.128 (AWS Global Accelerator IPs).
- **RDAP**: Registered. Registrar: GoDaddy.com LLC, created 2016-04-05. Fully locked (client update/transfer/delete/renew prohibited).
- **HTTP chains**: All apex/www requests time out (server unresponsive to our probe). Blog sample paths return 404 and 422.
- **DDG `site:`**: 0 real results (1 Startpage /clev tracking URL filtered as noise).
- **Serper Google `site:`**: already_queried_today (idempotency). Retry 2026-07-07 for an indexed-page count, but functionally irrelevant — this domain was ONLY ever present in `optimisation_engine/snapshot/diagnostics.py` (config typo, fixed 2026-06-03). It was never in any page's canonical tag.

---

## 2. Canonical residue TODAY (coverage join, new for B4)

B3 ran the GSC URL Inspection API across all 112 current URLs and stored `google_canonical` and `user_canonical` per page. B4 joined these results against both phantom domain strings.

### google_canonical residue (what Google's index holds today)

| Phantom domain | URLs where google_canonical contains it |
|---|---|
| medicalaccountantsuk.co.uk | **0 / 112** |
| medicalaccountants.co.uk | **0 / 112** |

Google has zero indexed pages pointing to either phantom domain as the authoritative canonical. The `canonical_residue` section of `domain_forensics.json` confirms this.

### user_canonical residue (what the page declares / declared at last crawl)

The `canonical_residue` check in the script only inspects `google_canonical`. The B4 second pass additionally examined `user_canonical`, which reflects what Googlebot saw at the time of each page's last crawl — not necessarily what the live page says today.

| Phantom domain | URLs where user_canonical at last crawl contained it |
|---|---|
| medicalaccountantsuk.co.uk | **2 / 112** |
| medicalaccountants.co.uk | **0 / 112** |

The 2 affected pages:

| Page | user_canonical (at last crawl) | google_canonical | coverage_state | Last crawl |
|---|---|---|---|---|
| /blog/gp-accounting-guide | medicalaccountantsuk.co.uk/blog/gp-accounting-guide | medicalaccounts.co.uk/blog/gp-accounting-guide | Submitted and indexed | 2026-06-01 |
| /blog/locum-doctor-self-assessment-filing-guide | medicalaccountantsuk.co.uk/blog/locum-doctor-self-assessment-filing-guide | medicalaccounts.co.uk/blog/locum-doctor-self-assessment-filing-guide | Crawled - currently not indexed | 2026-05-11 |

**Critical distinction — crawl-lag vs active injury**: Both pages were last crawled by Google BEFORE the Jun 17 fix (Jun 1 and May 11 respectively). The GSC Inspection API returns the canonical state from the stored last-crawl snapshot, not from the live page today. To resolve whether the live source is still injured, B4 fetched the live page source directly:

- `/blog/gp-accounting-guide` live canonical tag (HTTP 200): `https://www.medicalaccounts.co.uk/blog/gp-accounting-guide` — **CLEAN**
- `/blog/locum-doctor-self-assessment-filing-guide` live canonical tag (HTTP 200): `https://www.medicalaccounts.co.uk/blog/locum-doctor-self-assessment-filing-guide` — **CLEAN**

**Conclusion**: The Jun 17 fix was complete. Both pages show the correct canonical in live source. The phantom `user_canonical` in the B3 coverage data is a crawl-lag artifact reflecting pre-fix state that Google's index stores until the next crawl.

### Canonicalised_away bucket interpretation

The B3 tool placed both pages in `canonicalised_away` because `google_canonical != user_canonical` (Google's chosen canonical differed from the page's declared canonical at crawl time). Importantly, the `google_canonical` for BOTH pages = the page's own medicalaccounts.co.uk URL. This means Google sensibly overrode the phantom-domain canonical and chose to treat the correct URL as authoritative. The pages are not "canonicalised away to another page" — Google selected the right URL despite the bad hint.

### How many indexed pages chose a different canonical than the page URL for any reason

Across all 112 URLs inspected:

| Situation | Count |
|---|---|
| Indexed, self-canonical (google_canonical == page URL) | 6 |
| Crawled, not indexed, self-canonical | 1 |
| Canonicalised_away (google_canonical != user_canonical at crawl time) | 2 |
| Unknown to Google (never crawled — no canonical data at all) | 103 |
| Excluded or redirect | 0 |
| Error | 0 |

The 2 canonicalised_away pages are the only cases where canonical divergence occurred, and in both cases Google chose correctly (medicalaccounts.co.uk) over the phantom hint.

The 103 "unknown to Google" pages have no google_canonical data because Google has never crawled them. This is the primary site-wide problem (index absence), not a canonical injury.

---

## 3. Serper probes and DDG false positive

### Serper Google `site:` — both domains

Both `site:medicalaccountantsuk.co.uk` and `site:medicalaccountants.co.uk` hit the Serper cost-log idempotency guard (these queries were already run earlier today; the unique key already exists in the cost log, producing a 409 on insert). This is expected behaviour, not an error.

- For `medicalaccountantsuk.co.uk`: moot. NXDOMAIN + unregistered. Google cannot have indexed content on a domain that has never existed in DNS. The Google site: count is effectively zero regardless.
- For `medicalaccountants.co.uk`: the domain resolves and is real (GoDaddy, AWS IPs). Retry 2026-07-07 to confirm the Google indexed-page count. However this domain was never in page canonicals — it only appeared in a config file typo (fixed). Any indexed content on this third-party domain is unrelated to medicalaccounts.co.uk.

**Retry date for both Serper probes**: 2026-07-07 or later.

### DDG `site:medicalaccountantsuk.co.uk` — false positive

DDG returned 1 result, which the `_is_real_url` filter passed (it starts with `https://`). However, the URL is:

```
https://www.bing.com/aclick?ld=...&u=aHR0cHMlM2El...
```

Decoding the `u=` parameter: `https://www.theaccountancy.co.uk/landing/medical-business-accountants` — a competitor's paid search landing page.

This is a Bing ad click-tracking redirect that appeared in DDG's search results for the `site:medicalaccountantsuk.co.uk` query (likely a bidding artefact on "medical accountants" terms). It is not an indexed page on the phantom domain. The `_is_real_url` filter does not catch `bing.com/aclick` class noise. True indexed count for the phantom domain on DDG/Bing = 0.

---

## 4. Verdict

**Is the phantom-canonical injury still active in Google's index state?**

No. As of today (2026-07-06):

1. Google's chosen canonical (`google_canonical`) for all 112 inspected URLs points to `medicalaccounts.co.uk` (or is empty for 103 unknown pages). Zero phantom-domain google_canonicals.
2. The 2 pages that still show phantom `user_canonical` in the B3 snapshot are crawl-lag artefacts. The live source was verified clean today. Google already overrode the bad hint in both cases.
3. The phantom domain `medicalaccountantsuk.co.uk` is NXDOMAIN + unregistered. Google cannot index content on it regardless.

**Active injury count: 0.** The Jun 17 fix was complete. Recovery from Google's perspective is functionally done, except for crawl-lag on 2 pages.

**Is there any residual drag?**

Yes, minor:

- `/blog/gp-accounting-guide` is indexed ("Submitted and indexed") but Google's stored crawl state still shows the old phantom canonical. When Google next crawls it, the canonical will update to match the live source. This is benign — the page is already indexed under the correct URL.
- `/blog/locum-doctor-self-assessment-filing-guide` is in "Crawled - currently not indexed." Google crawled it in May (before the fix) and declined to index it. Whether this was due to the phantom canonical or content quality is unknown. With the canonical now correct in live source, a fresh crawl gives Google a clean signal.
- 103 pages remain "unknown to Google" — this is an index-discovery failure unrelated to the phantom-canonical injury. It is the primary site-wide problem and is addressed separately in the index_coverage analysis.

**Follow-up to accelerate recovery:**

1. Submit "Request Indexing" in GSC URL Inspection for `/blog/gp-accounting-guide` and `/blog/locum-doctor-self-assessment-filing-guide` to trigger a fresh crawl and clear the stale canonical state. This is low-cost and appropriate given both pages are already live with correct canonicals.
2. No recrawl request is needed for the 103 unknown pages via this route — they require a discovery/sitemap fix (separate workstream from index_coverage).
3. No action needed on `medicalaccountantsuk.co.uk` — NXDOMAIN + unregistered, nothing to reclaim or redirect.
4. Retry Serper `site:` probes for `medicalaccountants.co.uk` on 2026-07-07 to confirm zero indexed pages (diagnostic completeness only; this domain is not a business risk).

---

## 5. Artifact schema summary

`domain_forensics.json` top-level keys after B4 second pass:

| Key | Description |
|---|---|
| `generated_at` | ISO timestamp of initial script run |
| `probe_tool` | `scripts/medical/domain_forensics.py` |
| `domains` | Per-domain object for each of the 2 phantom strings |
| `domains.<d>.dns` | apex + www DNS results (nxdomain, a, aaaa, cname) |
| `domains.<d>.rdap` | Nominet registration status, registrar, creation_date |
| `domains.<d>.http_chains` | Redirect chains for apex/www/blog paths (skipped if NXDOMAIN) |
| `domains.<d>.google_site_count` | Serper `site:` result count (0 if already_queried_today) |
| `domains.<d>.google_site_status` | `ok` or `already_queried_today` |
| `domains.<d>.bing_site_count` | DDG `site:` real result count (noise-filtered) |
| `gsc_properties_all` | All 11 GSC properties enumerated |
| `gsc_old_domain_property_found` | `false` (neither phantom domain registered in GSC) |
| `canonical_residue` | google_canonical residue scan: 0/112 for both domains |
| `b4_second_pass` | Added by B4 run |
| `b4_second_pass.coverage_join_user_canonical_residue` | user_canonical residue: 2 pages (crawl-lag only; live source clean) |
| `b4_second_pass.ddg_false_positive_analysis` | Explains the 1 DDG result for phantom domain (Bing ad redirect, not indexed page) |
| `b4_second_pass.verdict` | `PHANTOM_CANONICAL_INJURY_RESOLVED` — active injury = 0; crawl-lag on 2 pages; recrawl recommended |
