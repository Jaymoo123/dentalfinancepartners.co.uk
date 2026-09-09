# S0 lane 1: indie SaaS with public revenue proof (agent report, 2026-09-09)

Revenue figures founder-published (X posts, open dashboards, first-party blogs, interviews) unless noted. Pricing "(approx)" = not re-fetched from live pricing page this session.

| Tool | URL | What it does | Pricing | Revenue evidence | Acquisition | Weaknesses | Build-days |
|---|---|---|---|---|---|---|---|
| Zenvoice | zenvoice.io | Self-serve invoice link for Stripe customers (dodges Stripe 0.4% invoice fee) | One-time $49 / $69 unlimited (fetched today) | $236/mo Oct 2025, $729/mo Apr 2025 (Marc Lou monthly X breakdowns) | SEO + WOM: "stripe invoice generator", "let customers download invoices stripe" | Visibly neglected (founder runs 15+ products); one-time price decays without traffic | 2 |
| Bank Statement Converter | bankstatementconverter.com | PDF bank statements to Excel/CSV | Free tiers + paid sub | **$318,112 in 2024** founder-tweeted (Angus Cheng); ~$16k/mo per Founder Reports interview | Almost pure SEO: "convert bank statement pdf to excel", per-bank long-tail pages | Parsing edge cases across bank formats; sensitive docs = trust burden (not FCA-regulated activity) | 5 |
| Healthchecks.io | healthchecks.io | Cron/scheduled-task monitoring (dead-man's switch) | Free 20 jobs; $5/$20/$80 per month (fetched today) | ~$9-10k MRR est; solo 9+ years, sole income since 2022 (founder blog; Latka est $111.5k/yr) | SEO: "cron job monitoring"; open-source repo funnel | Spartan UI; slow part-time shipping; generous free tier hard to undercut | 4 |
| Xnapper | xnapper.com | Mac screenshot beautifier | Free w/ watermark; one-time ~$30 | ~$4k MRR avg, sold $150k (Tony Dinh) | "screenshot beautifier" queries, PH/Twitter + SEO | Mac-only; free web competitors (shots.so) | 3 |
| DevUtils | devutils.com | Offline dev toolbox for Mac | One-time ~$39 | $3-6k/mo avg, ~$8k/mo autopilot 2025; built in 2 weeks (Tony Dinh interviews) | SEO: "json formatter offline", privacy queries; HN | Mac-only; each mini-tool free online, bundle+offline+privacy = moat | 4 |
| CSS Scan | getcssscan.com | Click any element, copy its CSS (extension) | One-time ~$69; Pro ~$20/mo (approx) | $100k+ cumulative (founder IH AMA) | SEO + Chrome Web Store | DevTools does 80% free | 3 |
| Testimonial.to | testimonial.to | Video/text testimonial collection + wall-of-love embed | Free; $25/$50/$95 per month (fetched today) | ~$800k ARR historically; $109k MRR across Damon Chen products (Nov 2025 tweet) | "collect video testimonials", "testimonial.to alternative" heavily searched | **Widely called overpriced; video gated hard; dated UI — classic clone-and-undercut target** | 5 |
| Senja | senja.io | Same category, freemium | Free 15; $29/$59 per month (fetched today) | $32k MRR (co-founder tweet Jun 2024); ~$83k MRR 2025 [secondary, unverified] | PLG + SEO "testimonial.to alternative" pages, free-tool funnels | Two founders shipping fast; proves room for a #2 | 5 |
| ScreenshotOne | screenshotone.com | Screenshot-as-API | Free 100/mo; $17/$79/$259 per month (fetched today) | ~$20k MRR mid-2025, ~$33k plateau; $200k ARR Apr 2025 (builds in public) | 70% of customers from Google: "screenshot API"; free utilities earn backlinks | Headless-browser fleet = real ops burden; crowded | 6 |
| Potion | potion.so | Notion pages to custom-domain site | ~$10/mo | $6k+ MRR, sold $300k (Acquire story) | "notion website builder", "super.so alternative" | Notion private-API dependency | 5 |
| Feather | feather.so | Notion to SEO blog | ~$39-99/mo | $4.2k MRR at 9.5 months; acquired $250k, $20k MRR (Tibo Oct 2024) | "notion blog" queries | Same dependency; portfolio-owner attention | 5 |
| DataFast | datafa.st | Analytics tied to Stripe revenue | $9/$19 per month (fetched today) | $16.3k Oct 2025, $2.4k Apr 2025 (Marc Lou); ~7% churn self-reported | Audience first, now SEO "google analytics alternative revenue" | Crowded; churn; Stripe webhook dependency | 6 |
| Simple Analytics | simpleanalytics.com | Privacy-first GA alternative | From ~€15-19/mo | $35.5k MRR end-2024, open dashboard | SEO rode GDPR: "analytics without cookie banner" | Plausible/Fathom own mindshare | 5 |
| Bannerbear | bannerbear.com | API auto-generates social/e-com images from templates | ~$49/$149/$299 per month | **$1M ARR confirmed Sep 2025** (Jon Yongfook public journey) | SEO: "og image api" + integration long-tail | Template editor = the hard 20%; solo, slow cadence | 7 |
| IndiePage | indiepa.ge | Link-in-bio for makers | ~$5/mo or one-time | $850-1.2k/mo through 2025 (Marc Lou) | Viral footer badges | Tiny ceiling; audience-driven | 2 |
| TrustMRR | trustmrr.com | Directory of Stripe-verified startup revenues | Listing fee (unknown) | $8.6k Oct 2025, ~2 months post-launch (Marc Lou) | Build-in-public virality | Network effect — fails single-player filter, awareness only | 4 |
| Tally | tally.so | Free-first form builder | Free unlimited; Pro $29/mo | $175k MRR Feb 2025, 8-person team (first-party blog) | SEO: "typeform alternative free" | Not solo; free tier too generous to undercut; category proof only | 8 |
| Unicorn Platform | unicornplatform.com | AI landing-page builder | ~$8-15/mo | $25k MRR (John Rush May 2024); $13k at acquisition | SEO + directories | Brutally crowded, AI commoditising | 8 |

Excluded despite public revenue: TypingMind, PDF.ai, SEObot (AI wrappers/churn), PhotoAI/HeadshotPro (ML infra), ShipFast (audience-sold), GummySearch (Reddit API fragility), Tweet Hunter/Taplio/Hypefury (platform-API + network), LogSnag/BrandBird (no verifiable recent figures).

## Agent's 5 fastest clone-to-first-pound bets

1. **Zenvoice clone** — proven one-time $49-69 willingness for a thin Stripe-invoice wrapper; incumbent visibly neglected (revenue fell $729 to $236/mo in 2025); "stripe invoice" problem queries = pure high-intent SEO. Weekend build.
2. **Bank Statement Converter competitor** — $318k/yr solo on "convert [bank] statement to excel" long-tail; win = support the banks it fumbles + per-bank landing page factory. Privacy posture is the marketing angle, not afterthought.
3. **Healthchecks.io-style cron monitor** — 9 years proof, spartan incumbent, $20/mo umbrella, exact-intent dev queries; differentiate on UI/integrations/meaner free tier.
4. **Testimonial.to undercut** — incumbent widely called overpriced ($50/mo for video); Senja proved a #2 takes $30k+ MRR via alternative-SEO; third player at $15/mo unlimited video has room.
5. **Xnapper-style screenshot beautifier (web + Windows)** — $4k MRR one-time-purchase Mac app; obvious improvement = cross-platform/web same price; "beautify screenshot" unowned.

Caveats: Senja $83k 2025 + BSC $38-40k/mo 2026 figures secondary-source; last founder-verified = $32k MRR (Jun 2024) and $318k FY2024. TrustMRR + Tally each fail one hard filter, flagged.
