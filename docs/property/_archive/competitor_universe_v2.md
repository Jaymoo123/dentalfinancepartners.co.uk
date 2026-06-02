# Property, competitor universe v2 (SERP-derived)

Generated from Supabase `competitor_pages` JOIN `competitor_serps` filtered to `site_key = property`. Replaces the hand-curated 13-domain list in `scripts/property_topic_gap_finder.py`. Charter: section 16.21 of `docs/property/NETNEW_PROGRAM.md`.

**Inputs:** 274 distinct domains across all property-site SERPs in `competitor_pages`.

**After filters:** 235 genuine specialist competitors kept; 8 software/platform vendors kept and annotated; 31 excluded as aggregator / news / gov / Q&A / Big-firm / reference / platform-noise / foreign-locale.

**Filter logic (see `scripts/property_competitor_discovery_v2.py`):**
- Aggregators (Rightmove, Zoopla, MoneySavingExpert, Investopedia, etc.), DROP
- News (BBC, FT, Guardian, Telegraph, Times, Mirror, Mail, etc.), DROP
- Gov (gov.uk, legislation.gov.uk, HMRC, council democracy portals), DROP
- Q&A / forums (Reddit, Quora, JustAnswer, Property118, LandlordZone), DROP
- Big-4 / Big-10 (KPMG, Deloitte, PwC, EY, BDO, Grant Thornton, RSM, Mazars, Crowe, Saffery), DROP
- Reference (Wikipedia, Grokipedia), DROP
- Platform noise (Google/Bing/social), DROP
- Foreign-locale (NZ, AU, US, IE), DROP
- Software vendors (Xero, Sage, etc.), KEEP but annotated; not a direct content competitor

**Note on data sparsity:** the SERP corpus to date covers 83 distinct queries on a single fetch date (2026-05-21). Re-run quarterly as the per-page rewrite playbook continues to populate `competitor_pages`.

---

## Kept, genuine specialist competitors

Sort: total appearances desc.

| Domain | Total appearances | Distinct queries | Avg position | Best position | Top sample queries | Notes |
|---|---:|---:|---:|---:|---|---|
| ukpropertyaccountants.co.uk | 13 | 10 | 2.23 | 1 | accountant for property in london; accounting services for property owners; create btl limited company uk; nrl tax; property development tax planning |  |
| uklandlordtax.co.uk | 8 | 6 | 2.13 | 1 | buy to let accountant london; can a family investment company buy property; property accountant wolverhampton; property tax accountant; uk income tax rates on rental profit 2026 |  |
| charcol.co.uk | 8 | 5 | 2.00 | 1 | create btl limited company uk; how to calculate cgt on property; landlord tax rates; tax on rental property income; uk rental income tax allowable expenses 2026 | John Charcol mortgage broker. Strong BTL mortgage content; tangential to tax but landlord-relevant. |
| landlordstax.co.uk | 6 | 1 | 2.00 | 1 | hmrc self assessment non resident landlord |  |
| rossmartin.co.uk | 5 | 4 | 2.20 | 2 | changes to cgt annual exemption 2027; hmrc cgt reporting requirements 2026; uk cgt rates residential property 2026; uk mortgage interest relief restricted for individual landlords |  |
| dnsassociates.co.uk | 4 | 3 | 1.75 | 1 | can you claim mortgage interest on rental property; property accountant wolverhampton; property accountants liverpool |  |
| geraldedelman.com | 4 | 3 | 1.00 | 1 | accountant for property in london; property tax accountant; property tax accountant in london |  |
| hich.co.uk | 4 | 3 | 2.75 | 2 | can you claim mortgage interest on rental property; income tax on landlord insurance claims; landlord tax rates |  |
| gorillaaccounting.com | 4 | 2 | 2.00 | 1 | accounting services for property owners; buy to let accountant |  |
| taxaccountant.co.uk | 4 | 2 | 1.75 | 1 | accountants property tax; rental property tax accountant |  |
| alexander-ene.co.uk | 4 | 1 | 2.50 | 2 | best property accountants in london |  |
| accountingweb.co.uk | 3 | 3 | 1.67 | 1 | accountant for property in london; property development tax planning; rent a room allowance 2026 | Trade publication. Authority-adjacent; publishes case-law analyses landlords search for. |
| mytaxaccountant.co.uk | 3 | 3 | 2.33 | 1 | income tax on landlord insurance claims; nrl1; property tax accountant |  |
| nrla.org.uk | 3 | 3 | 2.00 | 1 | accountant rental property cost; mtd deadline 2026; property tax advice | Landlord membership body. Authority-adjacent but publishes landlord-tax explainers. |
| alanboswell.com | 3 | 2 | 2.33 | 2 | landlord tax rates; uk income tax rates on rental profit 2026 | Insurance broker with landlord-tax content. Cross-category. |
| jamestoddandco.co.uk | 3 | 2 | 2.00 | 1 | property owner accountant; what does a specialist property accountant do? |  |
| propertyaccountant.co.uk | 3 | 2 | 1.67 | 1 | accountants property tax; rental property tax accountant |  |
| simplybusiness.co.uk | 3 | 2 | 1.33 | 1 | landlord tax rates; tax on rental property income | Insurance broker with landlord guides. Cross-category. |
| thp.co.uk | 3 | 2 | 2.33 | 2 | buy to let accountant; create btl limited company uk |  |
| bhp.co.uk | 3 | 1 | 2.00 | 1 | property accountancy leeds |  |
| att.org.uk | 2 | 2 | 2.50 | 2 | hmrc cgt reporting requirements 2026; uk capital gains tax annual exempt amount 2026 | Association of Taxation Technicians. Authority body; keep for technical briefings. |
| buytolettaxaccountants.co.uk | 2 | 2 | 2.50 | 2 | buy to let accountant; buy to let accountant london | Direct competitor. |
| djh.co.uk | 2 | 2 | 2.00 | 2 | accounting services for property owners; portfolio incorporation guidance | Mid-market accountant. |
| fhpaccounting.co.uk | 2 | 2 | 2.00 | 2 | uk mortgage interest relief restricted for individual landlords; what does a specialist property accountant do? |  |
| perrysaccountants.co.uk | 2 | 2 | 2.00 | 1 | accountant for property in london; buy to let accountant london | General practice with landlord content. |
| qaccounting.com | 2 | 2 | 2.00 | 1 | accounting services for property owners; what does a specialist property accountant do? | Contractor/SME accountant; landlord content overlap. |
| rentalbux.com | 2 | 2 | 2.00 | 2 | best field service software for uk mtd compliance 2026; short term let mtd | Affiliate-style landlord content; soft-keep. |
| shipleystax.com | 2 | 2 | 2.00 | 2 | portfolio incorporation guidance; property portfolio tax planning | Specialist tax firm; landlord/property content. |
| taxationweb.co.uk | 2 | 2 | 2.50 | 2 | accountant for property in london; property development tax planning |  |
| taxscape.deloitte.com | 2 | 2 | 1.50 | 1 | changes to cgt annual exemption 2027; nrl tax |  |
| thebuytoletbroker.co.uk | 2 | 2 | 3.00 | 3 | landlord portfolio incorporation uk; portfolio incorporation guidance |  |
| thepropertyaccountant.co.uk | 2 | 2 | 3.00 | 3 | property accountants liverpool; what does a specialist property accountant do? |  |
| uk.indeed.com | 2 | 2 | 2.50 | 2 | accountant for property in london; property accountant career |  |
| ukcalculator.com | 2 | 2 | 2.50 | 2 | capital gains tax uk property calculator; uk sdlt rates for limited company buying residential property 2026 higher rates surcharge |  |
| atsonbuckle.co.uk | 2 | 1 | 2.00 | 2 | accounting services for property owners | Regional accountant. |
| blog.finexer.com | 2 | 1 | 1.00 | 1 | vat on rental income hmrc |  |
| boltburdon.co.uk | 2 | 1 | 3.00 | 3 | can a family investment company buy property | Law firm; tangential conveyancing/landlord content. |
| business-accounting.co.uk | 2 | 1 | 1.00 | 1 | accountant rental property cost | Generalist with landlord guides. |
| candmproperties.co.uk | 2 | 1 | 2.00 | 2 | oversea landlord tax |  |
| capitalgainstax.co.uk | 2 | 1 | 3.00 | 3 | capital gains tax on gifts | Single-topic affiliate site. |
| dentalandmedical.com | 2 | 1 | 1.00 | 1 | tax-efficient property investment structure |  |
| eaguaranteedrent.co.uk | 2 | 1 | 2.00 | 2 | uk rental income tax allowable expenses 2026 |  |
| elsbyandco.co.uk | 2 | 1 | 2.00 | 2 | property accountants northampton | Regional accountant. |
| everestandco.co.uk | 2 | 1 | 2.50 | 2 | property accountant wolverhampton | Specialist tax firm; borderline keep. |
| godirect.co.uk | 2 | 1 | 1.50 | 1 | current uk limited company buy to let mortgage rates 2026 |  |
| gwaccounting.co.uk | 2 | 1 | 1.00 | 1 | property accountants northampton | Specialist accountant. |
| hwfisher.co.uk | 2 | 1 | 2.00 | 2 | property tax accountant in london | Mid-market accountant. |
| kenbellaccounting.co.uk | 2 | 1 | 2.00 | 1 | property owner accountant | Direct competitor. |
| mipadlettings.com | 2 | 1 | 3.00 | 3 | oversea landlord tax |  |
| nockdeighton.co.uk | 2 | 1 | 1.50 | 1 | yield vs roi |  |
| pettyson.co.uk | 2 | 1 | 3.00 | 3 | how to build a buy to let portfolio |  |
| piccoloproperty.co.uk | 2 | 1 | 2.00 | 2 | how to build a buy to let portfolio |  |
| property-tax-advice.co.uk | 2 | 1 | 1.00 | 1 | property tax advice | Direct competitor (boutique). |
| property-tax-partners.com | 2 | 1 | 1.50 | 1 | property tax partners | Domain-name collision with our brand; investigate. |
| provestor.co.uk | 2 | 1 | 1.00 | 1 | stamp duty on property incorporation uk | Specialist landlord accountant; direct competitor. |
| realpeoplemedia.co.uk | 2 | 1 | 3.00 | 3 | property accountants northampton |  |
| reedsrains.co.uk | 2 | 1 | 2.00 | 2 | overseas landlords |  |
| rentpost.com | 2 | 1 | 3.00 | 3 | what is property accounting | US property mgmt; borderline foreign. |
| rpgcrouchchapman.co.uk | 2 | 1 | 3.00 | 3 | property tax accountant in london | London accountant. |
| saltus.co.uk | 2 | 1 | 1.00 | 1 | can a family investment company buy property | Wealth management; tangential. |
| samconveyancing.co.uk | 2 | 1 | 2.00 | 2 | stamp duty on property incorporation uk | Conveyancing firm; SDLT content overlap. |
| smithbutler.co.uk | 2 | 1 | 1.00 | 1 | accounting services for property owners | Property accountant; direct competitor. |
| taxfix.com | 2 | 1 | 3.00 | 3 | how to calculate rent income |  |
| taxinsider.co.uk | 2 | 1 | 3.00 | 3 | trading property |  |
| taxpartnersuk.com | 2 | 1 | 1.50 | 1 | tax partners blog |  |
| taxradar.co.uk | 2 | 1 | 1.00 | 1 | how to calculate rent income |  |
| tlpi.co.uk | 2 | 1 | 2.50 | 1 | property portfolio tax planning |  |
| totallandlordinsurance.co.uk | 2 | 1 | 1.00 | 1 | how to build a buy to let portfolio |  |
| towerstone.co.uk | 2 | 1 | 2.00 | 2 | vat on rental income hmrc |  |
| ukaccountingfirms.co.uk | 2 | 1 | 1.50 | 1 | property accountant wolverhampton |  |
| urban-base.com | 2 | 1 | 1.00 | 1 | oversea landlord tax |  |
| your-move.co.uk | 2 | 1 | 3.00 | 3 | overseas landlords |  |
| 5bestthings.com | 1 | 1 | 1.00 | 1 | income tax on landlord insurance claims |  |
| aardvarkaccounting.co.uk | 1 | 1 | 3.00 | 3 | buy to let accountant |  |
| accessrecordsmanagement.co.uk | 1 | 1 | 3.00 | 3 | property management records |  |
| accordproperty.co.uk | 1 | 1 | 3.00 | 3 | self assessment landlord |  |
| accountancyntax.co.uk | 1 | 1 | 2.00 | 2 | compare mtd plans benefits |  |
| accountants-for-landlords.co.uk | 1 | 1 | 4.00 | 4 | accounting services for property owners |  |
| accountantsinrotherham.co.uk | 1 | 1 | 1.00 | 1 | accountants peterborough btl landlords |  |
| accountingfirms.co.uk | 1 | 1 | 2.00 | 2 | accountant rental property cost |  |
| accountingpreneur.com | 1 | 1 | 1.00 | 1 | what does a specialist property accountant do? |  |
| albanyaccounting.co.uk | 1 | 1 | 2.00 | 2 | accountants peterborough btl landlords |  |
| andersonstrathern.co.uk | 1 | 1 | 3.00 | 3 | property tax advice |  |
| asher-properties.com | 1 | 1 | 2.00 | 2 | selling a rental property |  |
| assuretax.co.uk | 1 | 1 | 3.00 | 3 | property tax accountant |  |
| ataxa.co.uk | 1 | 1 | 2.00 | 2 | incorporating a property portfolio uk |  |
| atechltd.com | 1 | 1 | 3.00 | 3 | property tax partners |  |
| aviva.co.uk | 1 | 1 | 2.00 | 2 | how to calculate cgt on property |  |
| axa.co.uk | 1 | 1 | 1.00 | 1 | income tax on landlord insurance claims |  |
| belvoir.co.uk | 1 | 1 | 1.00 | 1 | property management records |  |
| bets.com.au | 1 | 1 | 3.00 | 3 | nrl1 |  |
| bevanbuckland.co.uk | 1 | 1 | 2.00 | 2 | accountants specialising in property swansea |  |
| bianchirealtyandpropertymanagement.com | 1 | 1 | 2.00 | 2 | accounting services for property owners |  |
| bkl.co.uk | 1 | 1 | 4.00 | 4 | portfolio incorporation guidance |  |
| bloggers.feedspot.com | 1 | 1 | 2.00 | 2 | tax partners blog |  |
| brearleyandco.co.uk | 1 | 1 | 1.00 | 1 | uk tax year dates 2026–27 |  |
| btlinsider.co.uk | 1 | 1 | 2.00 | 2 | landlord portfolio incorporation uk |  |
| buildingpassport.com | 1 | 1 | 1.00 | 1 | property management records |  |
| campropertytax.com | 1 | 1 | 1.00 | 1 | property tax partners |  |
| capstonetriad.com | 1 | 1 | 1.00 | 1 | accounting services for property owners |  |
| capterra.co.uk | 1 | 1 | 1.00 | 1 | best field service software for uk mtd compliance 2026 |  |
| cbsnews.com | 1 | 1 | 2.00 | 2 | when does this change |  |
| chadwickaccountants.co.uk | 1 | 1 | 2.00 | 2 | property owner accountant |  |
| checkmytax.uk | 1 | 1 | 3.00 | 3 | section 24 calculator |  |
| cia-landlords.co.uk | 1 | 1 | 3.00 | 3 | yield vs roi |  |
| cincinnati.com | 1 | 1 | 3.00 | 3 | when does this change |  |
| clearbooks.co.uk | 1 | 1 | 3.00 | 3 | mtd software for landlords |  |
| coastandcountry.co.uk | 1 | 1 | 1.00 | 1 | is there stamp duty on furnished holiday lettings |  |
| commercialtrust.co.uk | 1 | 1 | 1.00 | 1 | section 24 calculator |  |
| comparebanks.co.uk | 1 | 1 | 1.00 | 1 | current uk limited company buy to let mortgage rates 2026 |  |
| cost-saver.co.uk | 1 | 1 | 2.00 | 2 | uk cgt rates residential property 2026 |  |
| davisllp.co.uk | 1 | 1 | 3.00 | 3 | accountant rental property cost |  |
| easy-accountants.co.uk | 1 | 1 | 1.00 | 1 | self assessment landlord |  |
| ellacotts.co.uk | 1 | 1 | 2.00 | 2 | ppr strategy property |  |
| embarq.co.uk | 1 | 1 | 1.00 | 1 | section 24 calculator |  |
| estateagentpower.com | 1 | 1 | 3.00 | 3 | yield vs roi |  |
| estcotts.uk | 1 | 1 | 3.00 | 3 | property portfolio tax planning |  |
| exoedge.com | 1 | 1 | 3.00 | 3 | property accounting software uk |  |
| extra.ie | 1 | 1 | 3.00 | 3 | short term let mtd |  |
| ezylearn.com.au | 1 | 1 | 3.00 | 3 | are licensing fees tax deductible |  |
| familybuildingsociety.co.uk | 1 | 1 | 3.00 | 3 | current uk limited company buy to let mortgage rates 2026 |  |
| fdcommercial.co.uk | 1 | 1 | 3.00 | 3 | create btl limited company uk |  |
| financialsamurai.com | 1 | 1 | 1.00 | 1 | selling a rental property |  |
| forthcapital.com | 1 | 1 | 3.00 | 3 | uk tax year dates 2026–27 |  |
| g2.com | 1 | 1 | 1.00 | 1 | property accounting software uk |  |
| gb.linkedin.com | 1 | 1 | 2.00 | 2 | accountant for property in london |  |
| getground.co.uk | 1 | 1 | 3.00 | 3 | create btl limited company uk |  |
| gnsassociates.co.uk | 1 | 1 | 3.00 | 3 | self assessment landlord |  |
| gofile.co.uk | 1 | 1 | 2.00 | 2 | hmo landlord tax planning |  |
| goodcalculators.com | 1 | 1 | 2.00 | 2 | section 24 calculator |  |
| gosuperscript.com | 1 | 1 | 3.00 | 3 | income tax on landlord insurance claims |  |
| gozeal.co.uk | 1 | 1 | 1.00 | 1 | short term let mtd |  |
| halalincorp.co.uk | 1 | 1 | 3.00 | 3 | capital gains tax uk property calculator |  |
| hays.co.uk | 1 | 1 | 3.00 | 3 | property accountant career |  |
| helpcentre.10ninety.co.uk | 1 | 1 | 2.00 | 2 | nrl tax |  |
| huston.co.uk | 1 | 1 | 2.00 | 2 | nrl1 |  |
| iab.org.uk | 1 | 1 | 1.00 | 1 | hmo landlord tax planning |  |
| icaew.com | 1 | 1 | 3.00 | 3 | mtd deadline 2026 |  |
| icy-veins.com | 1 | 1 | 1.00 | 1 | when does this change |  |
| ideas.darden.virginia.edu | 1 | 1 | 3.00 | 3 | when does this change |  |
| insurancechoice.co.uk | 1 | 1 | 2.00 | 2 | income tax on landlord insurance claims |  |
| interpolitanmoney.com | 1 | 1 | 1.00 | 1 | special purpose vehicle property |  |
| isaccountancy.co.uk | 1 | 1 | 3.00 | 3 | buy to let accountant london |  |
| iwnaccountancy.co.uk | 1 | 1 | 2.00 | 2 | what does a specialist property accountant do? |  |
| jmcaccountancy.com | 1 | 1 | 3.00 | 3 | accountants peterborough btl landlords |  |
| jonesrobinson.co.uk | 1 | 1 | 3.00 | 3 | portfolio landlord tax strategy |  |
| kaeltripton.com | 1 | 1 | 3.00 | 3 | uk rental income tax allowable expenses 2026 |  |
| kellypartners.com | 1 | 1 | 3.00 | 3 | tax partners blog |  |
| keywest-estateagents.co.uk | 1 | 1 | 3.00 | 3 | accountant for letting agents leicester |  |
| lakelovers.co.uk | 1 | 1 | 2.00 | 2 | is there stamp duty on furnished holiday lettings |  |
| landlordknowledge.co.uk | 1 | 1 | 1.00 | 1 | portfolio landlord tax strategy |  |
| landlordtoday.co.uk | 1 | 1 | 1.00 | 1 | is there stamp duty on furnished holiday lettings |  |
| landlordvision.co.uk | 1 | 1 | 1.00 | 1 | property accounting software uk |  |
| landolio.com | 1 | 1 | 2.00 | 2 | best field service software for uk mtd compliance 2026 |  |
| lanop.co.uk | 1 | 1 | 3.00 | 3 | uk capital gains tax annual exempt amount 2026 |  |
| lasvegas-propertymanagement.com | 1 | 1 | 1.00 | 1 | what is property accounting |  |
| leedsbuildingsociety.co.uk | 1 | 1 | 2.00 | 2 | current uk limited company buy to let mortgage rates 2026 |  |
| legalclarity.org | 1 | 1 | 3.00 | 3 | uk cgt rates residential property 2026 |  |
| leveluppropertymanagement.com | 1 | 1 | 2.00 | 2 | property management records |  |
| lexisnexis.co.uk | 1 | 1 | 2.00 | 2 | property tax partners |  |
| library.croneri.co.uk | 1 | 1 | 1.00 | 1 | are licensing fees tax deductible |  |
| litrg.org.uk | 1 | 1 | 1.00 | 1 | hmrc cgt reporting requirements 2026 |  |
| ljsaccountingservices.com | 1 | 1 | 3.00 | 3 | accounting services for property owners |  |
| lowcostaccounts.co.uk | 1 | 1 | 3.00 | 3 | accountants specialising in property swansea |  |
| mashvisor.com | 1 | 1 | 3.00 | 3 | selling a rental property |  |
| matplus.co.uk | 1 | 1 | 2.00 | 2 | landlord portfolio incorporation uk |  |
| mayesaccountants.co.uk | 1 | 1 | 2.00 | 2 | is there stamp duty on furnished holiday lettings |  |
| meathchronicle.ie | 1 | 1 | 1.00 | 1 | short term let mtd |  |
| mjbushell.co.uk | 1 | 1 | 3.00 | 3 | incorporating a property portfolio uk |  |
| mneaccounting.co.uk | 1 | 1 | 1.00 | 1 | accountant for letting agents leicester |  |
| money-snap.com | 1 | 1 | 3.00 | 3 | hmrc cgt reporting deadlines 2026 |  |
| morganhemp.co.uk | 1 | 1 | 3.00 | 3 | accountants specialising in property swansea |  |
| mtdcompare.co.uk | 1 | 1 | 1.00 | 1 | compare mtd plans benefits |  |
| naailandco.com | 1 | 1 | 1.00 | 1 | landlord portfolio incorporation uk |  |
| nationalpropertybuyers.co.uk | 1 | 1 | 3.00 | 3 | section 24 calculator |  |
| nextbrick.co | 1 | 1 | 3.00 | 3 | accounting services for property owners |  |
| nmec.org.uk | 1 | 1 | 3.00 | 3 | property development tax planning |  |
| nrlgroup.co.uk | 1 | 1 | 3.00 | 3 | nrl tax |  |
| oldgatetrustees.co.uk | 1 | 1 | 2.00 | 2 | portfolio landlord tax strategy |  |
| oneaccounting.cpa | 1 | 1 | 2.00 | 2 | accounting services for property owners |  |
| oodleawills.co.uk | 1 | 1 | 1.00 | 1 | inheritance tax planning for landlords |  |
| orkever.com | 1 | 1 | 3.00 | 3 | best field service software for uk mtd compliance 2026 |  |
| oxfordtax.sbs.ox.ac.uk | 1 | 1 | 3.00 | 3 | tax partners blog |  |
| patma.co.uk | 1 | 1 | 3.00 | 3 | mtd software for landlords |  |
| paylessaccountants.co.uk | 1 | 1 | 1.00 | 1 | property accountants liverpool |  |
| pherrus.com.au | 1 | 1 | 1.00 | 1 | what is property accounting |  |
| pie.tax | 1 | 1 | 3.00 | 3 | uk mortgage interest relief restricted for individual landlords |  |
| pprcapitalmgmt.com | 1 | 1 | 1.00 | 1 | ppr strategy property |  |
| pro-taxman.co.uk | 1 | 1 | 2.00 | 2 | uk tax year dates 2026–27 |  |
| property-tax-portal.co.uk | 1 | 1 | 3.00 | 3 | ppr strategy property |  |
| propertyportfolioinvestor.co.uk | 1 | 1 | 2.00 | 2 | inheritance tax planning for landlords |  |
| propertyreporter.co.uk | 1 | 1 | 1.00 | 1 | landlord portfolio incorporation uk |  |
| propertytaxadvisor.co.uk | 1 | 1 | 2.00 | 2 | property tax advice |  |
| quickmovenow.com | 1 | 1 | 1.00 | 1 | selling a rental property |  |
| reed.co.uk | 1 | 1 | 1.00 | 1 | accountants specialising in property swansea |  |
| reiq.com | 1 | 1 | 2.00 | 2 | property management records |  |
| revenue.ie | 1 | 1 | 1.00 | 1 | rent tax credit ppr meaning |  |
| richterassoc.com | 1 | 1 | 1.00 | 1 | accounting services for property owners |  |
| rkacc.co.uk | 1 | 1 | 3.00 | 3 | property tax advice |  |
| roberthalf.com | 1 | 1 | 4.00 | 4 | accountant for property in london |  |
| rockstaraccountants.co.uk | 1 | 1 | 1.00 | 1 | property portfolio tax planning |  |
| rwbca.co.uk | 1 | 1 | 3.00 | 3 | are licensing fees tax deductible |  |
| sleek.com | 1 | 1 | 1.00 | 1 | uk tax year dates 2026–27 |  |
| smartsmssolutions.com | 1 | 1 | 4.00 | 4 | current uk limited company buy to let mortgage rates 2026 |  |
| socalhomebuyers.com | 1 | 1 | 2.00 | 2 | selling a rental property |  |
| spareroom.co.uk | 1 | 1 | 3.00 | 3 | rent a room allowance 2026 |  |
| sprintlaw.co.uk | 1 | 1 | 2.00 | 2 | special purpose vehicle property |  |
| stampdutycalculator.org | 1 | 1 | 3.00 | 3 | is there stamp duty on furnished holiday lettings |  |
| stevenridercpa.au | 1 | 1 | 2.00 | 2 | accountants specialising in property swansea |  |
| sykescottages.co.uk | 1 | 1 | 3.00 | 3 | is there stamp duty on furnished holiday lettings |  |
| talk-business.co.uk | 1 | 1 | 3.00 | 3 | selling a rental property |  |
| targetaccounting.co.uk | 1 | 1 | 2.00 | 2 | property tax accountant |  |
| tax-wise.co.uk | 1 | 1 | 2.00 | 2 | uk sdlt rates for limited company buying residential property 2026 higher rates surcharge |  |
| taxaccolega.co.uk | 1 | 1 | 3.00 | 3 | vat on rental income hmrc |  |
| taxaid.org.uk | 1 | 1 | 3.00 | 3 | uk tax year dates 2026–27 |  |
| taxcafe.co.uk | 1 | 1 | 3.00 | 3 | how to calculate cgt on property |  |
| taxd.co.uk | 1 | 1 | 3.00 | 3 | nrl1 |  |
| taxesdoneright.co.uk | 1 | 1 | 1.00 | 1 | incorporating a property portfolio uk |  |
| taxpartners.ca | 1 | 1 | 1.00 | 1 | tax partners blog |  |
| taxpilot.org.uk | 1 | 1 | 1.00 | 1 | best field service software for uk mtd compliance 2026 |  |
| taxtool.co.uk | 1 | 1 | 2.00 | 2 | capital gains tax uk property calculator |  |
| taxyz.co.uk | 1 | 1 | 1.00 | 1 | uk cgt rates residential property 2026 |  |
| theaccountancy.co.uk | 1 | 1 | 3.00 | 3 | accounting services for property owners |  |
| thebuytoletaccountant.co.uk | 1 | 1 | 1.00 | 1 | buy to let accountant london |  |
| thegoodlandlord.com | 1 | 1 | 2.00 | 2 | self assessment landlord |  |
| thehmomortgagebroker.co.uk | 1 | 1 | 3.00 | 3 | hmo landlord tax planning |  |
| thepropertyca.co.uk | 1 | 1 | 3.00 | 3 | property accounting software uk |  |
| thetaxcom.co.uk | 1 | 1 | 3.00 | 3 | uk rental income tax allowable expenses 2026 |  |
| thornleygroves.co.uk | 1 | 1 | 3.00 | 3 | uk income tax rates on rental profit 2026 |  |
| timeanddate.com | 1 | 1 | 1.00 | 1 | when does this change |  |
| timtayloraccountants.co.uk | 1 | 1 | 1.00 | 1 | accountants specialising in property swansea |  |
| totaljobs.com | 1 | 1 | 1.00 | 1 | property accountant career |  |
| turnermeakin.com | 1 | 1 | 3.00 | 3 | accounting services for property owners |  |
| twdaccounts.co.uk | 1 | 1 | 2.00 | 2 | accountant rental property cost |  |
| uktaxcalculators.co.uk | 1 | 1 | 3.00 | 3 | capital gains tax uk property calculator |  |

## Software / platform vendors (kept, annotated)

| Domain | Total appearances | Distinct queries | Avg position | Top sample queries | Notes |
|---|---:|---:|---:|---|---|
| mtd.digital | 3 | 3 | 3.00 | best field service software for uk mtd compliance 2026; compare mtd plans benefits; mtd deadline 2026 | Software vendor, authority-adjacent, not a direct content competitor. |
| xero.com | 3 | 3 | 2.33 | property accounting software uk; self assessment landlord; short term let mtd | Software vendor, authority-adjacent, not a direct content competitor. |
| mrisoftware.com | 3 | 1 | 1.67 | property accounting software uk | Software vendor, authority-adjacent, not a direct content competitor. |
| usehammock.com | 3 | 1 | 1.67 | mtd software for landlords | Software vendor, authority-adjacent, not a direct content competitor. |
| gosimpletax.com | 2 | 2 | 2.00 | section 24 calculator; uk tax year dates 2026–27 | Software vendor, authority-adjacent, not a direct content competitor. |
| sage.com | 2 | 2 | 2.00 | mtd software for landlords; property accounting software uk | Software vendor, authority-adjacent, not a direct content competitor. |
| freeagent.com | 1 | 1 | 1.00 | property accounting software uk | Software vendor, authority-adjacent, not a direct content competitor. |
| quickbooks.intuit.com | 1 | 1 | 2.00 | property accounting software uk | Software vendor, authority-adjacent, not a direct content competitor. |

## Dropped (counts only; raw list in `_competitor_universe_v2.json`)

| Reason | Count |
|---|---:|
| foreign-locale | 7 |
| aggregator | 6 |
| platform-noise | 6 |
| gov | 5 |
| qa-forum | 4 |
| reference | 2 |
| news | 1 |

---

## How to re-run

    python scripts/property_competitor_discovery_v2.py

The script is idempotent and quick (single Supabase aggregation). Re-run after each new SERP-fetch sweep.