# INV_A: non-blog commercial surface inventory, Property (www.propertytaxpartners.co.uk)

Read-only investigation, 7 October 2026. 90 non-blog surfaces. Nothing was changed and nothing was deployed.

## How this was measured

| What | Method |
|---|---|
| Surface list | 74 non-blog URLs from `sitemap.txt`, plus 16 live routes the sitemap deliberately omits (`/book`, `/complete`, `/thank-you`, 5 `/embed/*`, 8 `/resources/*`). Route list from `Property\web\src\app`; sitemap source `Property\web\src\app\sitemap.ts`. |
| Title, H1, meta, words, JSON-LD, forms | Live HTML fetched for all 90 surfaces and parsed. JSON-LD read from the `application/ld+json` blocks, not from code comments. Word count is body text only, header and footer stripped. |
| Internal inlinks | All 888 sitemap URLs plus the 16 extras fetched (904 pages, 8 threads). Header and footer were stripped from every page before counting hrefs, so "body inlinks" means a real in-content link, not chrome. |
| Chrome membership | Measured from the rendered home page HTML, then cross-checked against `Property\niche.config.json` (`navigation`, `footer_links`), `Property\web\src\components\layout\SiteHeader.tsx` and `SiteFooter.tsx`. |
| Google state | URL Inspection API on all 90 surfaces. |
| Google queries | Search Console, 10 Aug to 5 Oct 2026 (56 days). Per-page totals pulled with the `page` dimension alone; the `page,query` pull is used only for the top-query column, because summing query rows undercounts. |
| Bing | `bing_query_data` where `site_key='property'`. |

## Headline

Google's commercial head terms are being answered by the city pages and by the blog, not by `/services/*`. For "property accountant", "property tax accountant", "landlord accountant", "buy to let accountants near me" and "property accountants near me", every ranking URL is a `/locations/*` page or a `/blog/property-accountant-services/*` post. `/services/property-accountant` took 8 impressions in 56 days and `/services/landlord-accountant` took 27. Both were last fetched by Google on 5 to 6 August.

Three structural facts sit behind that:

1. The header emits only three crawlable links (`/`, `/about`, `/contact`). Services, Resources and Calculators are `<button>` elements whose child links render only when the dropdown is open, so no `/services/*` link exists in the served HTML of any page. Evidence: `SiteHeader.tsx` line 128 renders a `<button>`, and line 144 gates the panel on `{open ? ...}`; a scan of the home page header found exactly five anchors, all to `/`, `/about` and `/contact`.
2. The footer carries the money pages instead, which is why `/services/property-accountant` has 904 chrome links but only 4 in-content links from the whole site.
3. All 15 `/for/*` audience pages have zero in-content inlinks and appear in no nav, no footer and not on the home page. They exist only in the sitemap. Verified twice: the 904-page body crawl found zero, and a repo grep finds `/for/` referenced only by `sitemap.ts`, `niche-loader.ts` (a type comment) and `data/audiences.ts`.

## Master table

Columns: role; title with the " | Property Tax Partners" brand suffix trimmed; JSON-LD types beyond the base set that every page emits (`AccountingService`, `Organization`, `PostalAddress`, `Country`, `ImageObject`, `PropertyValue`, `BreadcrumbList`, `ListItem`); `<form>` count; chrome link (H = header anchor, F = footer, Home = home page body, NONE = neither); body inlinks = in-content links from the other 903 pages; Google coverage and last crawl from URL Inspection; impressions/clicks/average position over 56 days from the page dimension.
| URL | Role | Title (brand suffix trimmed) | H1 | Words | JSON-LD beyond base | Forms | Chrome link | Body inlinks | Google | Last crawl | Imp/Clk/Pos 56d | Top Google query |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | home (money) | Property Accountants UK / Specialist Landlord Tax Advice | Property accountants for UK landlords and investors | 1679 | FAQPage,Service,Offer,OfferCatalog,WebSite | 5 | H+F | 895 | indexed | 2026-10-06 | 458/43/32.4 | uk property accountants (127i/0c/p40.1) |
| /services | money page | Property Accounting Services | Property accounting services for UK landlords | 930 | ItemList | 1 | F | 19 | indexed | 2026-08-29 | 87/0/29.5 | rental property tax accountant (16i/0c/p96.7) |
| /services/property-accountant | money page | Property Accountant for UK Landlords and Investors | A property accountant for UK landlords and investors | 2726 | FAQPage,Service,Offer,OfferCatalog,Audience | 5 | F | 4 | indexed | 2026-08-06 | 8/0/4.1 | - |
| /services/landlord-accountant | money page | Landlord Accountant / Accountants for Landlords & Buy to Let | Landlord accountant for UK rental income | 3036 | FAQPage,Service,Audience | 5 | F | 5 | indexed | 2026-08-05 | 27/0/34.3 | landlords accountant (2i/0c/p76.5) |
| /services/property-tax-advice | money page | Property Tax Advice from Specialist Advisors | Property tax advice from specialist advisors | 3261 | FAQPage,Service,Audience | 5 | F | 9 | indexed | 2026-08-06 | 187/0/53.1 | property tax advice (126i/0c/p70.3) |
| /services/non-resident-landlord | money page | Non-Resident Landlord Accountant / UK Tax for Overseas Landlords | Non-resident landlord accountant | 4006 | FAQPage,Service,Audience | 4 | F | 3 | indexed | 2026-08-05 | 29/0/16.2 | non resident landlord tax services (6i/0c/p54.3) |
| /landlord-tax | topic hub | Landlord Tax Explained: What UK Landlords Pay in 2026/27 | Landlord tax explained: what you pay on UK rental property in 2026/27 | 4797 | FAQPage,Article | 5 | F | 11 | indexed | 2026-08-05 | 403/0/76.1 | landlord tax advice (109i/0c/p72.9) |
| /landlord-compliance | topic hub | Landlord Compliance: Duties, Costs and Penalties in England | Landlord compliance: the duties, the renewal cycle, the cost and the tax treatment | 5055 | FAQPage,Article | 1 | F | 2 | indexed | 2026-08-21 | 125/1/29.0 | landlord compliance (32i/0c/p78.4) |
| /section-24 | topic hub | Section 24 Explained: Mortgage Interest Relief for Landlords | Section 24 explained: mortgage interest relief for landlords | 3558 | FAQPage,Article | 5 | F | 9 | indexed | 2026-08-05 | 42/1/10.9 | section 24 mortgage interest caravan lettings (1i/0c/p69.0) |
| /leasehold | topic hub | Leasehold Explained: Extensions, RTM and Service Charges | Leasehold explained: extensions, right to manage, service charges and ground rent | 3666 | FAQPage,Article | 2 | F | 1 | indexed | 2026-08-21 | 216/3/11.0 | peppercorn ground rent explained (6i/0c/p8.2) |
| /landed-estates | topic hub | Landed Estates: The £2.5m Farm Inheritance Tax Allowance | Landed estates and farm inheritance tax: the £2.5 million allowance | 2460 | FAQPage,Article | 1 | F | 5 | indexed | 2026-08-21 | 109/1/23.9 | landed estate trust (18i/0c/p28.0) |
| /cost-of-selling-a-property | topic hub | Cost of Selling a House in the UK: The Full Bill | The cost of selling a house in the UK | 5131 | FAQPage,Article | 2 | F | 13 | indexed | 2026-08-21 | 115/2/32.4 | cost of selling a property (18i/0c/p62.9) |
| /for-letting-agents | audience page (B2B) | For Letting Agents: What Your Landlords Will Ask You This Year | For letting agents: what your landlords will ask you this year | 2504 | Article | 4 | F | 5 | indexed | 2026-08-21 | 1/0/7 | - |
| /making-tax-digital-landlords | topic hub | Making Tax Digital for Landlords: Rules and Deadlines | Making Tax Digital for landlords | 3661 | FAQPage,Article,Service | 5 | F | 4 | indexed | 2026-10-06 | 216/0/19.4 | making tax digital deadlines (53i/0c/p12.1) |
| /about | trust/conversion | About Us / Property-Only Landlord Tax | About Property Tax Partners | 738 | base only | 1 | H+F | 803 | indexed | 2026-09-17 | 141/10/9.2 | property tax partners (46i/8c/p2.8) |
| /contact | trust/conversion | Contact Us | Contact | 723 | base only | 1 | H+F+Home | 52 | indexed | 2026-10-06 | 141/3/7.7 | property tax partners (36i/1c/p6.3) |
| /incorporation | topic hub | Should I Incorporate My Buy-to-Let? / CGT & SDLT Cost Analysis | Should you incorporate your buy-to-let portfolio? | 2558 | FAQPage | 2 | F+Home | 21 | indexed | 2026-09-25 | 11/0/4.7 | site:www.propertytaxpartners.co.uk (2i/0c/p6.0) |
| /spv-company | topic hub | SPV Company for UK Property / Set Up, Run & Close | SPV company: set up, run and close a UK property company | 1756 | FAQPage | 2 | NONE | 28 | indexed | 2026-10-05 | 0/0/- | - |
| /calculators | hub | Free Property Tax Calculators / SDLT, CGT, Section 24, Incorporation & MTD | Property tax calculators for UK landlords | 843 | base only | 5 | F+Home | 38 | indexed | 2026-08-08 | 1220/1/38.9 | rental mortgage calculator (106i/0c/p11.1) |
| /embed | utility (embed) | Embed Our Free Property Tax Calculators | Add our free property tax calculators to your site | 1467 | base only | 0 | NONE | 2 | noindex | 2026-08-14 | 0/0/- | - |
| /property-tax-rates | topic hub | UK Property Tax Rates 2026/27 / Landlord Tax Reference | UK property tax rates 2026/27 | 1600 | FAQPage,Article | 5 | F | 6 | indexed | 2026-07-24 | 199/0/9.4 | - |
| /research | hub | Property tax research and data | Property tax research and data | 61 | base only | 0 | NONE | 1 | indexed | 2026-07-25 | 0/0/- | - |
| /research/landlord-tax-index | data asset | UK SPV Incorporation Index | New UK landlord limited companies rose 3.5x between 2016 and 2025 | 1788 | FAQPage,Article,Dataset | 3 | F | 12 | indexed | 2026-07-24 | 15/0/7.3 | incorporation trends (2i/0c/p12.0) |
| /locations | hub | Locations / Property Accountants Across the UK | Locations | 266 | base only | 1 | F+Home | 8 | UNKNOWN | never | 0/0/- | - |
| /privacy-policy | utility (legal) | Privacy policy | Privacy policy | 1776 | base only | 0 | F+Home | 883 | indexed | 2026-09-11 | 55/1/6.6 | site:www.propertytaxpartners.co.uk (18i/0c/p4.3) |
| /terms | utility (legal) | Terms of use | Terms of use | 871 | base only | 0 | F | 0 | indexed | 2026-09-11 | 108/0/37.3 | site:www.propertytaxpartners.co.uk (80i/0c/p48.3) |
| /cookie-policy | utility (legal) | Cookie policy | Cookie policy | 514 | base only | 0 | F | 1 | DISCOVERED | never | 0/0/- | - |
| /locations/london | money page (city) | Property Accountant in London / Landlord Tax Specialists | Property accountant London | 2339 | FAQPage,City | 1 | Home | 4 | indexed | 2026-10-02 | 547/2/41.4 | landlord accountant in london (55i/0c/p39.8) |
| /locations/manchester | money page (city) | Property Accountant in Manchester / Landlord Tax Specialists | Property accountant Manchester | 2345 | FAQPage,City | 1 | Home | 5 | indexed | 2026-09-24 | 1135/2/39.4 | property tax accountant (159i/0c/p48.1) |
| /locations/birmingham | money page (city) | Property Accountant in Birmingham / Landlord Tax Specialists | Property accountant Birmingham | 2562 | FAQPage,City | 1 | Home | 4 | indexed | 2026-09-28 | 1331/14/33.0 | property accountant west midlands (98i/0c/p25.0) |
| /locations/leeds | money page (city) | Property Accountant in Leeds / Landlord Tax Specialists | Property accountant Leeds | 2255 | FAQPage,City | 1 | Home | 5 | indexed | 2026-09-14 | 1042/5/26.8 | rental accountant headingley (133i/0c/p11.1) |
| /locations/bristol | money page (city) | Property Accountant in Bristol / Landlord Tax Specialists | Property accountant Bristol | 2648 | FAQPage,City | 1 | Home | 4 | indexed | 2026-08-30 | 814/1/18.9 | property accountant (130i/0c/p12.5) |
| /calculators/stamp-duty-calculator | tool | Stamp Duty Calculator UK (2026/27): How Much You Pay | Stamp Duty Calculator UK (2026/27) | 1572 | FAQPage,WebApplication,Offer | 2 | F | 24 | indexed | 2026-07-04 | 4/0/5.8 | - |
| /calculators/section-24-calculator | tool | Section 24 Tax Calculator / Mortgage Interest Relief Impact (UK) | Section 24 Tax Calculator | 781 | WebApplication,Offer | 2 | F | 18 | indexed | 2026-10-02 | 298/5/10.2 | mortgage interest tax relief calculator uk (44i/0c/p35.8) |
| /calculators/incorporation-cost-calculator | tool | Incorporation Cost Calculator / CGT, SDLT & Break-Even (Landlords) | Incorporation Cost Calculator | 953 | WebApplication,Offer | 2 | F | 12 | indexed | 2026-06-06 | 14/1/5.6 | - |
| /calculators/mtd-checker | tool | Making Tax Digital (MTD) Checker / Do Landlords Need to Comply? | Making Tax Digital (MTD) Checker | 683 | WebApplication,Offer | 2 | NONE | 11 | indexed | 2026-07-24 | 0/0/- | - |
| /calculators/portfolio-profitability-calculator | tool | Portfolio Profitability Calculator / Rental Yield & Net Profit (UK) | Portfolio Profitability Calculator | 641 | WebApplication,Offer | 2 | F | 11 | indexed | 2026-09-18 | 865/4/11.1 | profit rent valuation (30i/0c/p25.4) |
| /calculators/capital-gains-tax-calculator | tool | Capital Gains Tax Calculator UK 2026/27: Property & Shares | UK Capital Gains Tax Calculator | 1157 | FAQPage,WebApplication,Offer | 2 | F | 14 | indexed | 2026-07-24 | 140/0/9.1 | - |
| /calculators/rental-income-tax-calculator | tool | Tax on Rental Income Calculator / UK Landlord Tax | Tax on Rental Income Calculator | 1412 | FAQPage,WebApplication,Offer | 2 | NONE | 23 | indexed | 2026-07-29 | 2/0/4 | - |
| /calculators/rental-yield-calculator | tool | Rental Yield Calculator: Gross and Net Yield (UK) | Rental Yield Calculator | 1518 | FAQPage,WebApplication,Offer | 2 | NONE | 5 | indexed | 2026-07-25 | 8/0/3.4 | - |
| /calculators/buy-to-let-cashflow-calculator | tool | Rental Property ROI Calculator / Buy-to-Let Cashflow | Buy-to-Let ROI and Cashflow Calculator | 1343 | FAQPage,WebApplication,Offer | 2 | NONE | 6 | indexed | 2026-07-25 | 30/0/28.3 | buy to let calculator (4i/0c/p94.0) |
| /calculators/lbtt-calculator-scotland | tool | LBTT Calculator Scotland 2026/27: Instant LBTT and 8% ADS | LBTT Calculator (Scotland) | 735 | FAQPage,WebApplication,Offer | 2 | NONE | 5 | indexed | 2026-09-30 | 128/0/13.7 | land and buildings transaction tax lbtt calculator scotland (18i/0c/p45.6) |
| /calculators/ltt-calculator-wales | tool | LTT Calculator Wales / Land Transaction Tax (2026/27) | LTT Calculator (Wales) | 727 | FAQPage,WebApplication,Offer | 2 | NONE | 5 | indexed | 2026-07-24 | 31/0/7.1 | - |
| /calculators/first-time-buyer-stamp-duty-calculator | tool | First-Time Buyer Stamp Duty Calculator / SDLT Relief (England & NI) | First-Time Buyer Stamp Duty Calculator | 1158 | FAQPage,WebApplication,Offer | 2 | NONE | 3 | indexed | 2026-07-24 | 7/0/5.4 | - |
| /calculators/corporation-tax-calculator | tool | Corporation Tax Calculator / Property Company (19% / 25%) | Corporation Tax Calculator | 809 | FAQPage,WebApplication,Offer | 2 | NONE | 6 | indexed | 2026-07-24 | 180/3/5.7 | - |
| /calculators/dividend-tax-calculator | tool | Dividend Tax Calculator / Property Company Dividends (UK 2026/27) | Dividend Tax Calculator | 797 | FAQPage,WebApplication,Offer | 2 | NONE | 2 | indexed | 2026-08-05 | 32/1/6.0 | - |
| /calculators/property-company-extraction-calculator | tool | Property Company Extraction Calculator / Salary vs Dividends | Property Company Extraction Calculator | 900 | FAQPage,WebApplication,Offer | 2 | NONE | 6 | DISCOVERED | never | 0/0/- | - |
| /calculators/rent-a-room-relief-calculator | tool | Rent-a-Room Relief Calculator / £7,500 Allowance (UK 2026/27) | Rent-a-Room Relief Calculator | 827 | FAQPage,WebApplication,Offer | 2 | NONE | 2 | indexed | 2026-09-25 | 294/9/6.4 | rent a room relief 2026 (34i/0c/p8.0) |
| /calculators/property-allowance-checker | tool | £1,000 Property Allowance Checker / UK Landlords (2026/27) | Property Allowance Checker | 818 | FAQPage,WebApplication,Offer | 2 | NONE | 3 | indexed | 2026-07-25 | 24/0/6.9 | - |
| /calculators/rd-tax-credit-calculator | tool | R&D Tax Credit Calculator / Merged Scheme & ERIS (UK 2026/27) | R&D Tax Credit Calculator | 888 | FAQPage,WebApplication,Offer | 2 | NONE | 2 | indexed | 2026-08-05 | 314/0/43.7 | r&d tax credit calculator (38i/0c/p46.6) |
| /calculators/capital-allowances-calculator | tool | Capital Allowances Calculator / Commercial Property (UK 2026/27) | Capital Allowances Calculator | 1094 | FAQPage,WebApplication,Offer | 2 | NONE | 19 | indexed | 2026-08-04 | 36/1/21.2 | capital allowance tax savings calculator (4i/0c/p65.5) |
| /calculators/buy-to-let-mortgage-calculator | tool | Buy to Let Mortgage Calculator / Interest-Only and Repayment | Buy to Let Mortgage Calculator | 1707 | FAQPage,WebApplication,Offer | 2 | NONE | 20 | indexed | 2026-08-04 | 1/0/1 | buy to let mortgages calculator repayments (3i/0c/p33.7) |
| /calculators/buy-to-let-rental-stress-test-calculator | tool | BTL Stress Test Calculator / Maximum Loan (UK) | Buy-to-Let Stress Test Calculator | 742 | FAQPage,WebApplication,Offer | 2 | NONE | 22 | indexed | 2026-08-04 | 73/0/19 | btl calculator (4i/0c/p92.0) |
| /calculators/commercial-mortgage-calculator | tool | Commercial Mortgage Calculator / Payments & DSCR | Commercial Mortgage Calculator | 677 | FAQPage,WebApplication,Offer | 2 | NONE | 5 | indexed | 2026-08-04 | 6607/1/58.4 | commercial mortgage calculator (659i/0c/p55.7) |
| /calculators/bridging-loan-calculator | tool | Bridging Loan Calculator / Total Cost of Finance | Bridging Loan Calculator | 716 | FAQPage,WebApplication,Offer | 2 | NONE | 14 | indexed | 2026-10-06 | 0/0/- | - |
| /calculators/development-finance-calculator | tool | Development Finance Calculator / Max Facility | Development Finance Calculator | 742 | FAQPage,WebApplication,Offer | 2 | NONE | 7 | indexed | 2026-08-04 | 73/1/66.5 | development finance calculator (27i/0c/p68.7) |
| /calculators/lease-extension-premium-calculator | tool | Lease Extension Premium Calculator / Marriage Value 2026 | Lease Extension Premium Calculator | 2079 | FAQPage,WebApplication,Offer | 2 | NONE | 4 | indexed | 2026-08-21 | 603/2/53.2 | lease extension calculator (16i/0c/p94.3) |
| /calculators/bpr-apr-allowance-calculator | tool | BPR and APR Allowance Calculator / £2.5m Cap 2026 | BPR and APR Allowance Calculator | 2006 | FAQPage,WebApplication,Offer | 2 | NONE | 6 | indexed | 2026-08-23 | 56/2/5.9 | - |
| /calculators/cost-of-selling-calculator | tool | Cost of Selling a House Calculator / Agent Fees UK | Cost of Selling a House Calculator | 1842 | FAQPage,WebApplication,Offer | 2 | NONE | 16 | indexed | 2026-08-22 | 3055/8/8.3 | cost of selling property (17i/0c/p51.1) |
| /for/moving-property-into-a-limited-company | audience page | Accountant to Transfer Property Into a Company | Accountants for landlords moving property into a limited company | 1061 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 31/0/4 | transferring a property to a limited company (10i/0c/p4.5) |
| /for/selling-a-buy-to-let | audience page | CGT Accountant for Selling a Buy-to-Let Property | Accountants for landlords selling a buy-to-let | 1062 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 16/0/7.8 | selling a buy to let property (5i/0c/p8.8) |
| /for/portfolio-landlords-incorporating-a-partnership | audience page | Property Partnership Incorporation: Portfolio Landlords | Accountants for portfolio landlords incorporating a lettings partnership | 1108 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 8/0/32.1 | should i incorporate my property portfolio? (3i/0c/p17.3) |
| /for/non-resident-landlords | audience page | Non-Resident Landlord Accountants / Overseas | Accountants for non-resident and overseas landlords | 1105 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 31/1/21.1 | overseas landlord tax (3i/0c/p4.3) |
| /for/property-spv-set-up | audience page | SPV Accountant for Property Investors / UK | Accountants for landlords setting up a property SPV | 1089 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 24/0/14.4 | property investment accountant (12i/0c/p19.2) |
| /for/gifting-property-to-family | audience page | Accountants for Gifting Property to Children | Accountants for owners gifting property to family | 1007 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 22/0/44.8 | how much stamp duty on gift deed (7i/0c/p34.0) |
| /for/couples-splitting-rental-income | audience page | Form 17 & Declaration of Trust Accountants | Accountants for couples splitting rental income between them | 1075 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-10-05 | 0/0/- | - |
| /for/landlord-self-assessment-and-mtd | audience page | Landlord Self Assessment & MTD Filing Service | Accountants filing landlord self assessment and MTD quarterly updates | 1125 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 21/0/7.1 | landlord self assessment (4i/0c/p4.5) |
| /for/first-time-and-accidental-landlords | audience page | Accountant for First Time Landlords / Former Home | Accountants for first-time and accidental landlords | 1120 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 1/0/35 | less tax for landlords reviews (1i/0c/p35.0) |
| /for/inherited-property | audience page | Probate Property Tax / Executors & Beneficiaries | Accountants for executors and beneficiaries of an inherited property | 1044 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 7/0/8.4 | probate tax calculator (3i/0c/p13.3) |
| /for/property-company-profit-extraction | audience page | Property Company Profit Extraction Accountant | Accountants for property company directors taking money out | 1028 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-10-05 | 0/0/- | - |
| /for/rental-income-disclosure | audience page | Let Property Campaign Accountant for Landlords | Accountants for landlords making an HMRC rental income disclosure | 1068 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 16/0/5.1 | accountant for rental property (7i/0c/p5.4) |
| /for/holiday-let-and-serviced-accommodation | audience page | Holiday Let Accountant / Serviced Accommodation | Accountants for holiday let and serviced accommodation operators | 1065 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 22/0/25.9 | holiday let tax calculator (5i/0c/p40.0) |
| /for/hmo-and-multi-let-landlords | audience page | HMO Accountant / Multi-Let and Student Landlords | Accountants for HMO and multi-let landlords | 1079 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 8/0/42.1 | hmo landlord tax planning (3i/0c/p95.3) |
| /for/landlord-retirement-and-succession | audience page | Landlord Succession Planning Accountant / UK | Accountants for landlords planning retirement and succession | 1079 | FAQPage,Service,Audience | 1 | NONE | 0 | indexed | 2026-09-29 | 23/0/4.2 | property tax accountant (19i/0c/p3.9) |
| /book | utility (funnel) | Book your free review | Book your free review call | 143 | base only | 0 | F | 0 | noindex | 2026-08-24 | 0/0/- | - |
| /complete | utility (funnel) | Complete your details | Complete your details | 151 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /thank-you | utility (funnel) | Thank you | Thank you | 322 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /embed/stamp-duty-calculator | utility (embed) | Stamp Duty Calculator |  | 151 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /embed/section-24-calculator | utility (embed) | Section 24 Tax Calculator |  | 112 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /embed/incorporation-cost-calculator | utility (embed) | Incorporation Cost Calculator |  | 118 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /embed/mtd-checker | utility (embed) | Making Tax Digital (MTD) Checker |  | 97 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /embed/portfolio-profitability-calculator | utility (embed) | Portfolio Profitability Calculator |  | 126 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/capital-gains | gated asset (noindex) | Capital Gains Tax on property: the complete guide for landlords and second-home owners (free guide) | Capital Gains Tax on property: the complete guide for landlords and second-home owners | 2674 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/incorporation | gated asset (noindex) | Incorporating a property portfolio: the complete landlord guide (free guide) | Incorporating a property portfolio: the complete landlord guide | 3218 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/landlord-compliance | gated asset (noindex) | Landlord compliance in England: the duty map, the source law and the tax treatment (free guide) | Landlord compliance in England: the duty map, the source law and the tax treatment | 2516 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/landlord-essentials | gated asset (noindex) | Landlord tax essentials: the complete guide for UK residential landlords (free guide) | Landlord tax essentials: the complete guide for UK residential landlords | 3088 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/leasehold | gated asset (noindex) | Leasehold resource hub: the primary sources, in one place (free guide) | Leasehold resource hub: the primary sources, in one place | 1476 | base only | 0 | NONE | 1 | UNKNOWN | never | 0/0/- | - |
| /resources/mtd | gated asset (noindex) | Making Tax Digital for Income Tax: the complete landlord guide (free guide) | Making Tax Digital for Income Tax: the complete landlord guide | 2567 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/section-24 | gated asset (noindex) | Section 24 and mortgage interest relief: the complete landlord guide (free guide) | Section 24 and mortgage interest relief: the complete landlord guide | 2336 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
| /resources/stamp-duty | gated asset (noindex) | Stamp Duty (SDLT) for property investors: the complete guide (free guide) | Stamp Duty (SDLT) for property investors: the complete guide | 2665 | base only | 0 | NONE | 0 | UNKNOWN | never | 0/0/- | - |
## Bing

`bing_query_data` is sparse, as expected. Only five non-blog URLs have any page-level row at all. The `__site__` row is the site-total feed from `GetRankAndTrafficStats`, not a page.

| URL | Impressions | Clicks | Avg position | Last date |
|---|---|---|---|---|
| `__site__` (site total, all URLs incl. blog) | 47,024 | 9,932 | 4.5 | 2026-10-07 |
| /calculators/lbtt-calculator-scotland | 7,801 | 271 | 6.1 | 2026-10-07 |
| /calculators/ltt-calculator-wales | 2,317 | 8 | 6.8 | 2026-10-07 |
| /property-tax-rates | 1,239 | 55 | 5.0 | 2026-10-07 |
| /calculators/capital-gains-tax-calculator | 278 | 14 | 6.6 | 2026-10-07 |
| / | 70 | 11 | 2.9 | 2026-10-07 |

The other 84 surfaces have no Bing page rows. That is an ingestion limit, not proof of zero Bing traffic: the site total is 47,024 impressions and 9,932 clicks, so most of it lands on URLs the per-page feed does not carry.

## Flag 1: not fetched in 30+ days, or not indexed

40 of 90 surfaces have not been fetched by Google since 7 September. The money pages and the whole calculator fleet dominate the list.

| Last crawl | Surface | Role | 56d impressions |
|---|---|---|---|
| 2026-06-06 | /calculators/incorporation-cost-calculator | tool | 14 |
| 2026-07-04 | /calculators/stamp-duty-calculator | tool | 4 |
| 2026-07-24 | /property-tax-rates | topic hub | 199 |
| 2026-07-24 | /research/landlord-tax-index | data asset | 15 |
| 2026-07-24 | /calculators/mtd-checker | tool | 0 |
| 2026-07-24 | /calculators/capital-gains-tax-calculator | tool | 140 |
| 2026-07-24 | /calculators/ltt-calculator-wales | tool | 31 |
| 2026-07-24 | /calculators/first-time-buyer-stamp-duty-calculator | tool | 7 |
| 2026-07-24 | /calculators/corporation-tax-calculator | tool | 180 |
| 2026-07-25 | /research | hub | 0 |
| 2026-07-25 | /calculators/rental-yield-calculator | tool | 8 |
| 2026-07-25 | /calculators/buy-to-let-cashflow-calculator | tool | 30 |
| 2026-07-25 | /calculators/property-allowance-checker | tool | 24 |
| 2026-07-29 | /calculators/rental-income-tax-calculator | tool | 2 |
| 2026-08-04 | /calculators/capital-allowances-calculator | tool | 36 |
| 2026-08-04 | /calculators/buy-to-let-mortgage-calculator | tool | 173 |
| 2026-08-04 | /calculators/buy-to-let-rental-stress-test-calculator | tool | 73 |
| 2026-08-04 | /calculators/commercial-mortgage-calculator | tool | 6,607 |
| 2026-08-04 | /calculators/development-finance-calculator | tool | 73 |
| 2026-08-05 | /services/landlord-accountant | money page | 27 |
| 2026-08-05 | /services/non-resident-landlord | money page | 29 |
| 2026-08-05 | /landlord-tax | topic hub | 403 |
| 2026-08-05 | /section-24 | topic hub | 42 |
| 2026-08-05 | /calculators/dividend-tax-calculator | tool | 32 |
| 2026-08-05 | /calculators/rd-tax-credit-calculator | tool | 314 |
| 2026-08-06 | /services/property-accountant | money page | 8 |
| 2026-08-06 | /services/property-tax-advice | money page | 187 |
| 2026-08-08 | /calculators | hub | 1,220 |
| 2026-08-14 | /embed | utility, noindex | 0 |
| 2026-08-21 | /landlord-compliance | topic hub | 125 |
| 2026-08-21 | /leasehold | topic hub | 216 |
| 2026-08-21 | /landed-estates | topic hub | 109 |
| 2026-08-21 | /cost-of-selling-a-property | topic hub | 115 |
| 2026-08-21 | /for-letting-agents | audience, B2B | 1 |
| 2026-08-21 | /calculators/lease-extension-premium-calculator | tool | 603 |
| 2026-08-22 | /calculators/cost-of-selling-calculator | tool | 3,055 |
| 2026-08-23 | /calculators/bpr-apr-allowance-calculator | tool | 56 |
| 2026-08-24 | /book | utility, noindex | 0 |
| 2026-08-29 | /services | money page | 87 |
| 2026-08-30 | /locations/bristol | money page, city | 814 |

Indexable surfaces Google has never fetched or is refusing to index:

| Surface | Coverage | Chrome link | Body inlinks |
|---|---|---|---|
| /locations | URL is unknown to Google | footer, home body | 8 |
| /cookie-policy | Discovered, currently not indexed | footer | 1 |
| /calculators/property-company-extraction-calculator | Discovered, currently not indexed | none | 6 |

`/locations` is the one that does not add up: it is in the sitemap, it is linked from the footer of all 904 pages and from the home page body, and Google still records it as unknown. It returns HTTP 200 and carries `robots: index, follow`. The footer entry was added in `SiteFooter.tsx` (line 45) and `/locations/page.tsx` was last touched 22 August, so the link has existed for at least six weeks.

The 15 other never-crawled surfaces are all deliberately `noindex, nofollow` and out of the sitemap: `/complete`, `/thank-you`, the 5 `/embed/*` calculators and the 8 `/resources/*` guides. `/book` and `/embed` are `noindex` too. Nothing to flag there.

Separate point: `/spv-company` and `/calculators/bridging-loan-calculator` were both fetched in the last two days and are indexed, yet took zero impressions in 56 days. Indexed and ignored is a different problem from uncrawled.

## Flag 2: no nav, footer or home link

| Count | Surfaces | Reachable only via |
|---|---|---|
| 15 | all `/for/*` audience pages | sitemap.xml |
| 3 | /complete, /thank-you, /book | form flow (noindex, intended) |
| 5 | /embed/* calculators | third-party iframes (noindex, intended) |
| 8 | /resources/* guides | calculator and page gates (noindex, intended) |
| 1 | /calculators/property-company-extraction-calculator | 6 body inlinks only, not in the footer calculator list |

The 15 `/for/*` pages are the real finding. Each is 1,000 to 1,130 words, carries `Service`, `Audience` and `FAQPage` schema and one lead form, and Google has indexed all 15 (last crawled 29 September to 5 October). They collectively took 230 impressions and 1 click in 56 days. Their nearest competitors inside the site are the blog posts, which outrank them on their own phrases: `/for/portfolio-landlords-incorporating-a-partnership` sits at position 100 for "incorporating a property portfolio uk" while four blog posts sit at positions 4.6 to 58 for the same query.

Separately, the header's three dropdowns mean `/services`, `/services/*`, `/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`, `/leasehold`, `/landlord-compliance`, `/landed-estates`, `/cost-of-selling-a-property`, `/for-letting-agents`, `/property-tax-rates`, `/research/landlord-tax-index`, `/blog` and `/calculators` are in the nav for a human but not for a crawler. They are all rescued by the footer, so none is orphaned, but the header contributes no link equity to any of them.

## Flag 3: role duplication

Evidence is query-level overlap from Search Console, 56 days.

| Query | Impressions | URLs competing (position) |
|---|---|---|
| property accountant | 540 | blog/how-to-become-property-accountant (24.3), locations/bristol (12.5), blog/belfast (23.0), locations/birmingham (60.1), blog/what-does-a-property-accountant-do (29.9), blog/how-much-does-a-property-accountant-cost (3.0), locations/leeds, locations/manchester |
| property tax accountant | 456 | locations/manchester (48.1), blog/belfast (32.8), locations/birmingham (56.6), locations/bristol (25.6), **/for/landlord-retirement-and-succession (3.9)**, blog/glasgow, / (52.0), locations/leeds |
| property accountants near me | 185 | locations/manchester (31.2), locations/leeds (27.3), locations/birmingham (14.8), blog/how-much-does-a-property-accountant-cost (2.1), blog/belfast, locations/bristol |
| landlord accountant | 123 | locations/manchester (23.1), locations/birmingham (70.0), locations/bristol (33.6), blog/what-does-a-property-accountant-do (20.8), blog/belfast, blog/cost, locations/london |
| property specialist accountant | 121 | locations/bristol (18.2), locations/manchester (79.6), blog/cost (4.3), locations/leeds (7.0) |
| property accountants | 118 | locations/birmingham (52.3), locations/manchester (29.7), blog/manchester-property-accountant (69.2), locations/leeds (6.8), blog/cost (3.0) |
| landlord tax accountant | 128 | locations/manchester (62.3), locations/bristol (22.0), blog/belfast (22.0), / (78.9), locations/birmingham (85.2) |
| property accountant manchester | 141 | locations/manchester (21.6), blog/property-accountant-services/manchester-property-accountant (10.2) |
| hmo landlord tax planning | 81 | two blog posts (21.5, 6.7), **/for/hmo-and-multi-let-landlords (95.3)**, blog/portfolio (8.5), locations/bristol |
| incorporating a property portfolio uk | 85 | five blog posts (4.6 to 58), **/for/portfolio-landlords-incorporating-a-partnership (100.0)** |

Read as roles:

- **/services/property-accountant vs /locations/* vs /blog/property-accountant-services/***: three surfaces aimed at the same phrase family. The `/services` page is absent from every head term above. The city pages and the blog hub's posts hold the positions. Per the known context, the blog hub `/blog/property-accountant-services` was 301-shadowed from April to 22 August and Google still records it as a redirect, which makes its children the de facto service pages.
- **/services/landlord-accountant vs /landlord-tax**: `/landlord-tax` takes the advice intent ("landlord tax advice", 109 impressions at position 72.9; "tax advice for landlords", 98 at 83.3) while `/services/landlord-accountant` takes the hiring intent at 27 impressions. Neither ranks. The city pages rank for "landlord accountant" instead.
- **/incorporation vs /spv-company vs /for/property-spv-set-up vs /for/portfolio-landlords-incorporating-a-partnership vs /calculators/incorporation-cost-calculator**: five surfaces on the incorporation decision. Combined 56-day impressions: 11, 0, 24, 8, 14. The blog owns the topic.
- **/cost-of-selling-a-property vs /calculators/cost-of-selling-calculator**: the calculator took 3,055 impressions at position 8.3; the prose page took 115 at 32.4. Both target "cost of selling property".
- **/services/non-resident-landlord vs /for/non-resident-landlords**: same audience, same intent, 29 and 31 impressions.
- **/landlord-compliance vs /resources/landlord-compliance**: near-identical body content; the second is `noindex`, so no index-level conflict.
- **/research vs /research/landlord-tax-index**: the hub is 61 words and exists only to point at its single child.

## Flag 4: stale copy

Searched all 90 surfaces for old tax years, old rate references, the retired paid PDF, the deep-scroll modal and the reverted "free first call then a fixed fee" wording.

| Check | Result |
|---|---|
| "free first call", "then a fixed fee" | Zero occurrences anywhere. |
| "free consultation" / "free review" | Present on 86 surfaces. This is current copy after the 30 September revert, so not a flag. |
| Paid PDF, price-to-download, paywall, "unlock", "buy now" | Zero occurrences in served HTML. |
| Deep-scroll modal, exit-intent | Zero occurrences in served HTML. |
| Old tax years | No stale ones. Every `2024/25`, `2025/26`, `2020/21` and `2023/24` hit reads correctly in context: `/making-tax-digital-landlords` uses 2024/25 as the MTD testing year (correct), `/for/landlord-self-assessment-and-mtd` the same, `/for/property-company-profit-extraction` cites 2025/26 as the prior-year dividend rate for comparison (correct against the 10.75/35.75/39.35 from 6 April 2026), `/section-24` says the restriction has applied in full since 2020/21 (correct), `/calculators/bpr-apr-allowance-calculator` uses 2024/25 as an IHT baseline. |
| `GBP 49` hits | Worked-example arithmetic on `/calculators/cost-of-selling-calculator` and `/calculators/capital-gains-tax-calculator`, not a price. |
| Apparent old years on /landlord-compliance, /leasehold, /for-letting-agents | Statutory instrument numbers (SI 2015/962 and similar), not tax years. |

One cosmetic defect: `/research/landlord-tax-index` emits the title `UK SPV Incorporation Index | Property Tax Partners | Property Tax Partners`, the brand suffix twice.

## Flag 5: titles and H1s without the commercial phrase

The `/services/*` and `/locations/*` pages all carry the phrase. The gap is the topic hubs, which are titled as explainers:

| Surface | Title | H1 | 56d impressions |
|---|---|---|---|
| /landlord-tax | Landlord Tax Explained: What UK Landlords Pay in 2026/27 | Landlord tax explained: what you pay on UK rental property in 2026/27 | 403 |
| /section-24 | Section 24 Explained: Mortgage Interest Relief for Landlords | Section 24 explained: mortgage interest relief for landlords | 42 |
| /leasehold | Leasehold Explained: Extensions, RTM and Service Charges | Leasehold explained: extensions, right to manage, service charges and ground rent | 216 |
| /landlord-compliance | Landlord Compliance: Duties, Costs and Penalties in England | Landlord compliance: the duties, the renewal cycle, the cost and the tax treatment | 125 |
| /cost-of-selling-a-property | Cost of Selling a House in the UK: The Full Bill | The cost of selling a house in the UK | 115 |
| /landed-estates | Landed Estates: The GBP 2.5m Farm Inheritance Tax Allowance | Landed estates and farm inheritance tax: the GBP 2.5 million allowance | 109 |
| /making-tax-digital-landlords | Making Tax Digital for Landlords: Rules and Deadlines | Making Tax Digital for landlords | 216 |
| /incorporation | Should I Incorporate My Buy-to-Let? / CGT and SDLT Cost Analysis | Should you incorporate your buy-to-let portfolio? | 11 |
| /spv-company | SPV Company for UK Property / Set Up, Run and Close | SPV company: set up, run and close a UK property company | 0 |
| /for-letting-agents | For Letting Agents: What Your Landlords Will Ask You This Year | For letting agents: what your landlords will ask you this year | 1 |
| /property-tax-rates | UK Property Tax Rates 2026/27 / Landlord Tax Reference | UK property tax rates 2026/27 | 199 |
| /research | Property tax research and data | Property tax research and data | 0 |
| /research/landlord-tax-index | UK SPV Incorporation Index | New UK landlord limited companies rose 3.5x between 2016 and 2025 | 15 |
| /locations | Locations / Property Accountants Across the UK | **Locations** | 0 |

Two specific mismatches rather than a general absence:

- `/locations` has the commercial phrase in its title but its H1 is the single word "Locations".
- `/research/landlord-tax-index`'s H1 is a finding sentence, not a phrase anyone searches; its only query in 56 days was "incorporation trends" (2 impressions).

Also worth noting: the home page title is `Property Accountants UK | Specialist Landlord Tax Advice`, and the header wordmark reads "Property Accountants UK", while the brand everywhere else and in schema is "Property Tax Partners". The brand query "property tax partners" (145 impressions) is split across `/about` (46), `/contact` (36), `/` (33), `/services` (10) and four city pages.

## Flag 6: visible FAQs vs FAQPage schema

Compared each surface's FAQPage question set against the questions actually visible in its FAQ section. 58 of the 66 surfaces that have either are consistent. No surface has schema questions that are missing from the page.

| Surface | Schema questions | Visible FAQ questions | Mismatch |
|---|---|---|---|
| /section-24 | 10 | 16 | 6 visible questions carry no schema entry: "How much is the tax reducer worth in 2026/27 and 2027/28?", "Who does Section 24 hit hardest?", "Who is not affected?", "How can you reduce the cost of Section 24?", "What changes in April 2027, and should you wait for it?", "What does a Section 24 review actually involve?" |
| /resources/* (7 of 8) | 0 | 1 to 8 | The guide pages render FAQ blocks with no FAQPage schema at all. All are `noindex, nofollow`, so this has no search consequence. |

Four calculators emit no FAQPage and have no FAQ section, which is internally consistent but makes them the only four in a fleet of 28 without one: `/calculators/section-24-calculator`, `/calculators/incorporation-cost-calculator`, `/calculators/mtd-checker`, `/calculators/portfolio-profitability-calculator`. These four are the hand-written routes; the other 24 come from `calculators/[slug]`.

## City schema, building on the known context

The five `/locations/*` pages now emit `City` plus the estate-wide `AccountingService` node. They do not emit a city-scoped `LocalBusiness` with `PostalAddress`, `priceRange` or `openingHoursSpecification`, consistent with the 5 August rewrite in `bbfe04378`. The `PostalAddress` that does appear on every city page belongs to the global organisation node and carries the Shipley registered office, not a city address. No city page claims a local address.

## What I could not verify

- **Client-rendered UI.** Everything here is read from served HTML. Anything that appears only after JavaScript runs is invisible to this pass: the header dropdown contents, any post-calculation offer panel, modals, and the `/resources/*` gate behaviour. The `/api/calc/pdf-offer` and `/api/calc/pdf-request` routes still exist in the app; whether any surface still presents that offer to a user after a calculation is not something a server-HTML read can answer.
- **Why `/locations` is unknown to Google.** Confirmed 200, indexable, sitemapped and footer-linked on 904 pages. The cause is not visible from the data I have.
- **Bing per-page truth for 84 surfaces.** The table has no rows for them. The site total shows substantial Bing traffic, so absence of rows is an ingestion gap, not zero traffic.
- **Whether the sitemap omissions are intended.** `/book` out of the sitemap is a recorded owner ruling. The `/resources/*`, `/embed/*`, `/complete` and `/thank-you` omissions pair with explicit `noindex` in code, so they read as deliberate, but I did not find a written ruling for each.
- **Historic crawl cadence.** URL Inspection gives one last-crawl date, not a history, so I cannot say whether a surface crawled on 5 August was crawled frequently before that.
- **One stray 404 with an impression.** `/property-tax-partners-cgt-overseas-property-uk-residents-foreign-disposals` took 1 impression and returns 404. Where Google found it is unknown. The naked domain and trailing-slash variants both redirect to the canonical www form correctly.

## Files

- `INV_A_inventory.csv`, 90 rows, full per-surface data including meta descriptions, canonicals, robots, inlink source lists and top 5 queries.
- `INV_A_gsc_inspect.csv` URL Inspection raw. `INV_A_gsc_page.csv` and `INV_A_gsc_pq.csv` Search Console raw. `INV_A_bing.tsv` Bing rollup.
