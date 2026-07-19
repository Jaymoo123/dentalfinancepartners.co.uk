# Flagship brief: UK Online Seller Index (Ecommerce Finance)

No research slug in nav yet; propose `/research/uk-online-seller-index`. Audience: Amazon FBA/FBM, Shopify, eBay/Etsy/Vinted/TikTok Shop sellers, dropshippers.

## 1. Candidate dataset (honest assessment)
- Platform reporting (UK adoption of OECD model rules, first platform reports to HMRC January 2025): HMRC has NOT yet published statistics from it. Cannot anchor an index on it today; strong future upgrade.
- Primary today: Companies House bulk data filtered to SIC 47910 (retail via internet, plus 47.9x mail order). Monthly incorporations vs dissolutions of online-retail companies. Public, recurring. Confidence: high.
- Secondary: HMRC VAT statistics (annual, registrations/populations by sector, OGL); ONS retail sales index internet-sales share (monthly, OGL) as a demand overlay.

## 2. Source and licensing
- Companies House: free reuse, attribute Companies House.
- HMRC VAT statistics and ONS retail sales: OGL v3.

## 3. Asset shape
- `src/data/uk-online-seller-index.json`; page with Article + Dataset JSON-LD (OGL), CSV route.
- Metrics: monthly online-retail incorporations vs dissolutions; net formation trend; regional splits; ONS internet-sales-share overlay; annual VAT-registered population overlay.

## 4. Refresh plan
Monthly. Script sketch: reuse landlord-index Companies House tooling with SIC 47910 filter; pull ONS internet-sales series; emit snapshot JSON + CSV. Swap in HMRC platform-reporting stats as the headline layer if/when published.

## 5. OWNER SIGN-OFF GATE
- [ ] Approve SIC 47910 proxy (many sellers are sole traders or misclassified; company counts undercount the market; caveat on-page)
- [ ] Approve NOT claiming any platform-reporting/"HMRC side-hustle crackdown" figures until HMRC publishes them
- [ ] Approve proposed slug and index name
- [ ] Confirm claims exposure acceptable: aggregates only
- [ ] Approve monthly refresh promise

## 6. Verdict
**VIABLE-WITH-CAVEATS.** Solid public monthly source via Companies House, but it proxies incorporated sellers only; the topical platform-reporting angle must wait for HMRC publication.
