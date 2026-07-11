# Clustering, intent classification + launch core — Charities pilot (R3)

Date: 2026-07-11. Volume/KD figures: DataForSEO UK (2826), fetched 2026-07-11
(`raw/dfs_keyword_suggestions.json`, `raw/dfs_ranked_keywords.json`).

## Intent lens (the R2 red-team's key lesson, applied)

Every cluster is tagged **HIRE** (accountant-seeking → lead page), **DIY** (trustee doing it
themselves → answer-box/BLUF content that builds authority and captures via calculators/CTAs),
or **MIXED**. The charity niche is DIY-heavy: trustees are unpaid, price-sensitive, and select
examiners by word of mouth (R2B evidence). The site therefore wins by being the resource
trustees trust, with lead capture on the compliance-pain edges (IE at threshold, SORP-2026
transition, Gift Aid gone wrong, CIC filings).

## Cluster map (pillar / cluster / calculator / research asset)

| Cluster | Intent | Key terms (vol/KD) | Role |
|---|---|---|---|
| Charity accountant head | HIRE | charity accountants near me 720/0; charity accountant 590/27; specialist charity accountants 170/0; charity accountants fees + city terms | Homepage + money pages |
| Independent examination | HIRE-MIXED | IE of charity accounts 210/0; charity IE 90/0; IE threshold 70/0; cost of IE 20/39; who can do an IE 30/0 | Money page + pillar |
| Audit thresholds | MIXED | charity audit threshold 390/0; charity audit 320/0; audit requirements 50/0 | Pillar + **calculator #2** |
| SORP / FRS 102 | MIXED (timely) | charity sorp 1,900/20; charity sorp 2026 480/6; sorp frs 102 320/0; example accounts long tail | Pillar — the SORP-2026 transition is live NOW (new SORP applies to periods from 1 Jan 2026) |
| Gift Aid operations | DIY-heavy | gift aid 8,100/30; claiming gift aid 1,900/14; gift aid rules 1,600/26; hmrc gift aid claims 1,300/9; gift aid declaration 720/9 | Pillar + BLUF plays + **calculator #1** (gift aid calculator 720/0) |
| GASDS / small donations | DIY | gift aid small donations scheme 390/0; gasds limit (autocomplete) | Cluster + **calculator #4** |
| Charity VAT | DIY-MIXED | do charity pay vat 1,000/0; can charity claim back vat 480/0; charity vat 480/2 | Pillar + money page (VAT advice) |
| CIC universe | MIXED (huge) | cic 12,100/10; community interest company 6,600/18; what is a cic 4,400/16; set up a cic 1,300/1; cic34 form 480/0; cic accountant 90/0; cic vs charity 170/0; asset lock 140/0 | Pillar + /for/cics money page — kgaccountantsblog proves a specialist blog owns this today |
| Charity/CIO setup + registration | DIY | charity registration 4,400/38; how to set up a charity 1,000/10; charitable incorporated organisation 6,600/11; set up a cio 140/3 | Pillar (BLUF; feeds structure-chooser tool) |
| Trading + trading subsidiaries | MIXED | charity trading subsidiary 50/0 + long tail (deed of covenant, gift aid to parent) | Cluster + **calculator #3**; low volume, high lead quality |
| Trustee finance duties | DIY | what does a charity trustee do 720/9-390/0; trustees annual report 140/0 | Cluster (authority) |
| Annual returns/filings | DIY-MIXED | charity commission annual return 1,000/0; charity annual return 170/15; trustee annual report 140/0 | Cluster |
| Charity bookkeeping/software | DIY | charity accounting software 390/0; accounting software for small charities (autocomplete) | Cluster — software comparison content (BLUF; capture: "or let us do it") |
| Church/faith accounts | CONTENT-ONLY | church accounts (autocomplete cluster); accountants for churches | Content hub, no lead pages (R2 decision) |
| Small Charity Finance Index | — | — | **Research asset** (DATA_ASSET.md) |

## Launch core (build with the site)

**Money pages (8):**
1. Homepage — "charity accountants" head (590/27 + near-me 720/0)
2. /services/independent-examination (210/0 cluster; rivals iel.org.uk + charityexaminers.co.uk prove the funnel)
3. /services/charity-accounts (SORP accruals + R&P prep)
4. /services/charity-bookkeeping (charity bookkeeping autocomplete cluster; micro-rivals live on it)
5. /services/gift-aid (claims + compliance service edge of the DIY cluster)
6. /services/charity-vat (480/2 + reclaim cluster)
7. /for/cics (cic accountant 90/0; CIC filings; fixed-fee package framing per cicaccountants.co.uk precedent)
8. /for/social-enterprises (social enterprise accountants; accountingforgood/misss lane)

**Pillars (6):** audit-vs-IE thresholds; SORP 2026 transition; Gift Aid complete guide; CIC
complete guide (vs charity/CIO); charity VAT guide; setting up a charity/CIO.

**Calculators (3 at launch, per CALCULATORS.md):** Gift Aid calculator (720/0, KD-free win),
IE-vs-audit threshold checker (390/0), GASDS calculator (390/0). (Small-trading checker = fast
follow #4.)

**Top-priority blogs (first wave, 12):** charity sorp 2026 changes (480/6); cic34 form guide
(480/0); do charities pay vat (1,000/0); can charities claim back vat (480/0); charity
commission annual return guide (1,000/0); who can do an independent examination (30/0 +
cost 20/39); charity trading subsidiary + gift aid (50/0 family); cic vs charity (170/0);
charity accounting software compared (390/0); gift aid declaration wording (720/9); GASDS
rules (390/0); trustees annual report guide (140/0).

**Launch core total: 8 money pages + 6 pillars + 3 calculators + 12 blogs = 29 assets**, plus
the Small Charity Finance Index as the flagship asset (build parallel or fast-follow).

## Queued (not launch)

The remaining ~260 volume-evidenced topics (of 291) and ~1,370 long-tail clusters
(`topic_pool_final.json`), church content hub (content-only), city-intent pages (decision
needed on locations architecture given accountantsforcharities.org.uk's doorway strategy — see
open questions), structure-chooser and remaining calculators (CALCULATORS.md queue tier).

## What we deliberately do NOT chase at launch

- "gift aid" 8,100/30 head — DIY/definitional; answer-box play only.
- "charity registration" 4,400/38 — DIY + Commission owns it; BLUF.
- Audit-tier terms (statutory audit services) — not our client (R2 lead-value correction);
  content references audits, funnels IE-band clients.
