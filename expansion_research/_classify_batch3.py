import json

with open(r'C:/Users/user/Documents/Accounting/expansion_research/r2_class_batch_3_input.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

domain_map = {
    'elevateaccountancy.co.uk': 'SPECIALIST',
    'applebymall.co.uk': 'GENERALIST',
    'carehome-accountants.co.uk': 'SPECIALIST',
    'livingstonesaccountants.co.uk': 'GENERALIST',
    'loyals.uk': 'SPECIALIST',
    'pearsonmckinsey.co.uk': 'GENERALIST',
    'accountaxzone.com': 'GENERALIST',
    'careaccounts.co.uk': 'SPECIALIST',
    'raaccountants.com': 'SPECIALIST',
    'bloomaccounting.co.uk': 'SPECIALIST',
    'amanahaccountants.co.uk': 'GENERALIST',
    'clarkwell.co.uk': 'GENERALIST',
    'clearcutpartners.co.uk': 'GENERALIST',
    'hawsons.co.uk': 'GENERALIST',
    'mmba.co.uk': 'GENERALIST',
    'auditox-accountancy.uk': 'GENERALIST',
    'qaccounting.com': 'SPECIALIST',
    'caservices.org.uk': 'SPECIALIST',
    'accountancykids.co.uk': 'SPECIALIST',
    'parenta.com': 'INFO',
    'taxbite.uk': 'GENERALIST',
    'childsplayaccounts.co.uk': 'INFO',
    'twinkl.co.uk': 'INFO',
    'eptax.co.uk': 'SPECIALIST',
    'freeagent.com': 'INFO',
    'bradleysaccountants.co.uk': 'SPECIALIST',
    'agileaccountants.co.uk': 'SPECIALIST',
    'nurseryinabox.com': 'INFO',
    'accountantinleicester.co.uk': 'GENERALIST',
    'tes.com': 'INFO',
    'daynurseries.co.uk': 'INFO',
    'samera.co.uk': 'SPECIALIST',
    'business-accounting.co.uk': 'INFO',
    'apexaccountants.tax': 'GENERALIST',
    'thefosteringnetwork.org.uk': 'INFO',
    'xeinadin.com': 'GENERALIST',
    'reactaccountancy.co.uk': 'SPECIALIST',
    'bkplus.co.uk': 'SPECIALIST',
    'octopusfostering.co.uk': 'SPECIALIST',
    'fosterwiki.com': 'INFO',
    'aprobinson.biz': 'GENERALIST',
    'amaccountex.co.uk': 'GENERALIST',
    'kb.taxcalc.com': 'INFO',
    'compassfostering.com': 'INFO',
    'fosterline.info': 'INFO',
    'thomsonreuters.com': 'INFO',
    'fostertalk.org': 'INFO',
    'uata.co.uk': 'SPECIALIST',
    'odiritaxconsultants.com': 'GENERALIST',
    'tax-wise.co.uk': 'GENERALIST',
    'accotax.co.uk': 'GENERALIST',
    'eternityaccountants.co.uk': 'GENERALIST',
    'nichols.co.uk': 'SPECIALIST',
    'lanop.co.uk': 'GENERALIST',
    'arr.co.uk': 'GENERALIST',
    'pertax.co.uk': 'GENERALIST',
    'balancedaccounting.co.uk': 'GENERALIST',
    'samuels.co.uk': 'GENERALIST',
    'stevecollings.co.uk': 'INFO',
    'library.croneri.co.uk': 'INFO',
    'sra.org.uk': 'INFO',
    'jonathanfagan.co.uk': 'INFO',
    'biglawinvestor.com': 'INFO',
    'onlineinvoices.com': 'INFO',
    'lawyers-cpafirm.com': 'SPECIALIST',
    'fitsmallbusiness.com': 'DIRECTORY',
    'amazelaw.com': 'INFO',
    'bookstime.com': 'GENERALIST',
    'slashdot.org': 'INFO',
    'get-recruited.co.uk': 'INFO',
    'taxlawresearch.com': 'SPECIALIST',
    'chambersaccountants.co.uk': 'SPECIALIST',
    'barrister.expert': 'SPECIALIST',
    'theonlineaccountants.uk': 'SPECIALIST',
    'gorillaaccounting.com': 'SPECIALIST',
    'taxaccountant.co.uk': 'GENERALIST',
    'sarahludfordmep.org.uk': 'GENERALIST',
    'azets.com': 'GENERALIST',
    'radcliffechambers.com': 'INFO',
    'devereuxchambers.co.uk': 'INFO',
    'spearswms.com': 'INFO',
    'pumptax.com': 'INFO',
    'burnellchambers.co.uk': 'INFO',
    'taxchambers.com': 'INFO',
    'thebarristergroup.co.uk': 'INFO',
    'templetax.com': 'INFO',
    'barristers.tax': 'INFO',
    'rwbca.co.uk': 'SPECIALIST',
    'barristeraccountantuk.co.uk': 'SPECIALIST',
    'contractor-accountants.org.uk': 'SPECIALIST',
    'contractoruk.com': 'DIRECTORY',
    'contractorcalculator.co.uk': 'INFO',
    'dolanaccountancy.com': 'SPECIALIST',
    'no-worries.co.uk': 'SPECIALIST',
    'icsuk.com': 'SPECIALIST',
    'itcontractorsuk.com': 'DIRECTORY',
    'morethanaccountants.co.uk': 'GENERALIST',
    'fusion-bs.co.uk': 'SPECIALIST',
    'uktaxcalculators.co.uk': 'DIRECTORY',
    'itcontracting.com': 'DIRECTORY',
    'accountingpeople.co.uk': 'GENERALIST',
    'coreadviz.co.uk': 'SPECIALIST',
    'danbro.co.uk': 'SPECIALIST',
    'inniaccounts.co.uk': 'SPECIALIST',
    'freestyleaccounting.com': 'SPECIALIST',
    'nopalaver.co.uk': 'SPECIALIST',
    'nopalavergroup.com': 'SPECIALIST',
    'munrobowman.co.uk': 'SPECIALIST',
    'crunch.co.uk': 'SPECIALIST',
    'techaccounting.co.uk': 'SPECIALIST',
    'finance-equation.co.uk': 'SPECIALIST',
    'theaccountancy.co.uk': 'GENERALIST',
    'swift-accountants.co.uk': 'GENERALIST',
    'a-wise.co.uk': 'GENERALIST',
    'accountantfor.co.uk': 'GENERALIST',
    'youraccountant.co.uk': 'GENERALIST',
    'goforma.com': 'GENERALIST',
    'fusionaccountants.co.uk': 'GENERALIST',
    'rsbc.uk': 'GENERALIST',
    'ipse.co.uk': 'INFO',
    'upwork.com': 'DIRECTORY',
    'odaccountants.co.uk': 'GENERALIST',
    'jobs.aat.org.uk': 'INFO',
    'freelancer.co.uk': 'DIRECTORY',
    'uk.indeed.com': 'INFO',
    'xero.com': 'INFO',
    'stuartcroftontax.co.uk': 'GENERALIST',
    'selftax.co.uk': 'GENERALIST',
    'taxassist.co.uk': 'GENERALIST',
    'lawrencegrant.co.uk': 'GENERALIST',
    'globaltaxconsulting.co.uk': 'GENERALIST',
    'taxadvisermagazine.com': 'INFO',
    'peopleperhour.com': 'DIRECTORY',
    'jamestoddandco.co.uk': 'GENERALIST',
    'accountsandlegal.co.uk': 'GENERALIST',
    'f9consulting.co.uk': 'GENERALIST',
    'accrueaccounting.co.uk': 'SPECIALIST',
    'local.accrueaccounting.co.uk': 'SPECIALIST',
    'king-consultants-accountancy.co.uk': 'GENERALIST',
    'uk-ccm.com': 'GENERALIST',
    'pulse-accountants.co.uk': 'GENERALIST',
    'uk.linkedin.com': 'INFO',
    'ross-brooke.co.uk': 'GENERALIST',
    'xpact.co.uk': 'GENERALIST',
    'jobs.icaew.com': 'INFO',
    'shipleysaccounting.com': 'GENERALIST',
    'the-accountantsmc.co.uk': 'GENERALIST',
    'vanilla-accounting.co.uk': 'SPECIALIST',
    'sureconsultancyaccounting.co.uk': 'SPECIALIST',
    'reedaccountants.co.uk': 'GENERALIST',
    'protaxaccountant.co.uk': 'GENERALIST',
    'mindspaceoutsourcing.co.uk': 'GENERALIST',
    'startupaccountancy.com': 'SPECIALIST',
    'startupbooted.com': 'DIRECTORY',
    'kruzeconsulting.com': 'SPECIALIST',
    'pilot.com': 'SPECIALIST',
    'perrysaccountants.co.uk': 'GENERALIST',
    'braant.co.uk': 'GENERALIST',
    'barnesandscott.com': 'SPECIALIST',
    'fhpaccounting.co.uk': 'GENERALIST',
    'blue-shore.co.uk': 'GENERALIST',
    'melaniecurtisaccountants.co.uk': 'GENERALIST',
    'atkinsonsca.co.uk': 'GENERALIST',
    'rockstaraccountants.co.uk': 'SPECIALIST',
    'nuvo.co.uk': 'SPECIALIST',
    'hallidaystyan.co.uk': 'GENERALIST',
    'edwardsaccountants.co.uk': 'SPECIALIST',
    'parsons.co.uk': 'SPECIALIST',
    'vennaccounts.com': 'SPECIALIST',
    'buttmiller.co.uk': 'SPECIALIST',
    'leraccountancy.co.uk': 'GENERALIST',
    'saasaccountants.co.uk': 'GENERALIST',
    'acctek.co.uk': 'SPECIALIST',
    'chartaccountancy.com': 'SPECIALIST',
    'reflexaccounting.co.uk': 'SPECIALIST',
    'dnsassociates.co.uk': 'GENERALIST',
    'finerva.com': 'SPECIALIST',
    'nd-ca.co.uk': 'SPECIALIST',
    'chacc.co.uk': 'SPECIALIST',
    'jamescowperkreston.co.uk': 'GENERALIST',
    'earlsferryadvisory.com': 'INFO',
    'cpastechnology.com': 'SPECIALIST',
    'approved-accounting.co.uk': 'SPECIALIST',
    'cpafirm-tech.com': 'SPECIALIST',
    'tech-cpas.com': 'SPECIALIST',
    'tech-accountant.com': 'SPECIALIST',
    'a2xaccounting.com': 'DIRECTORY',
    'osome.com': 'SPECIALIST',
    'theecommerceaccountants.com': 'SPECIALIST',
    'oocommerce.com': 'INFO',
    'yourecommerceaccountant.co.uk': 'SPECIALIST',
    'fullyaccountable.com': 'SPECIALIST',
    'thenumbersmith.co.uk': 'SPECIALIST',
    'ecommerceaccountants.co.uk': 'SPECIALIST',
    'sleek.com': 'GENERALIST',
    'xperttaxaccountants.co.uk': 'SPECIALIST',
    'myecommerceaccountant.co.uk': 'SPECIALIST',
    'e-accounts.co.uk': 'SPECIALIST',
    'ecomaccountants.uk': 'SPECIALIST',
    'e2eaccounting.co.uk': 'SPECIALIST',
    'elverecommerceaccountants.co.uk': 'SPECIALIST',
    'unicornaccounting.co.uk': 'SPECIALIST',
    'unicornaccountants.co.uk': 'SPECIALIST',
    'a2zaccounting.co.uk': 'SPECIALIST',
    'ibissandco.com': 'SPECIALIST',
    'beanninjas.com': 'SPECIALIST',
    'archimediaaccounts.co.uk': 'SPECIALIST',
    'fslaccountancy.co.uk': 'SPECIALIST',
    'jpaccountant.info': 'SPECIALIST',
    'syncaccountants.co.uk': 'SPECIALIST',
    'audtax.co.uk': 'SPECIALIST',
    'ecommaccountant.co.uk': 'SPECIALIST',
    'uhc.com': 'INFO',
    'in.gov': 'INFO',
    'medicare.gov': 'INFO',
    'atlantahomecareagency.com': 'INFO',
    'accountancyaction.com': 'INFO',
    'homecare.co.uk': 'INFO',
    'tiktok.com': 'INFO',
    'howett-thorpe.co.uk': 'INFO',
    'accountantsinmiami.com': 'GENERALIST',
    'carecredit.com': 'INFO',
}

niche_overrides = {
    ('gorillaaccounting.com', '29'): 'GENERALIST',
    ('gorillaaccounting.com', '32'): 'GENERALIST',
    ('gorillaaccounting.com', '33'): 'GENERALIST',
}

valid_classes = {'SPECIALIST', 'GENERALIST', 'DIRECTORY', 'INFO', 'OWN-ESTATE'}
classified = 0
skipped = 0

for niche_id, niche_data in data.items():
    for query, rows in niche_data['queries'].items():
        for row in rows:
            if row['class'] is not None:
                skipped += 1
                continue
            domain = row['domain']
            override_key = (domain, niche_id)
            if override_key in niche_overrides:
                row['class'] = niche_overrides[override_key]
            elif domain in domain_map:
                row['class'] = domain_map[domain]
            else:
                print(f'UNMAPPED: niche={niche_id} domain={domain} title={row["title"][:60]}')
                row['class'] = 'GENERALIST'
            classified += 1

print(f'Classified: {classified}, Pre-set: {skipped}')

nulls = []
bad_class = []
for niche_id, niche_data in data.items():
    for query, rows in niche_data['queries'].items():
        for row in rows:
            if row['class'] is None:
                nulls.append((niche_id, query, row['domain']))
            elif row['class'] not in valid_classes:
                bad_class.append((niche_id, query, row['domain'], row['class']))

print(f'Nulls remaining: {len(nulls)}')
print(f'Invalid classes: {len(bad_class)}')
if nulls:
    for n in nulls: print('NULL:', n)
if bad_class:
    for b in bad_class: print('BAD:', b)

from collections import Counter
counts = Counter()
for niche_data in data.values():
    for rows in niche_data['queries'].values():
        for row in rows:
            counts[row['class']] += 1
print('Counts:', dict(counts))

with open(r'C:/Users/user/Documents/Accounting/expansion_research/r2_class_batch_3_output.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=1, ensure_ascii=False)
print('Written.')
