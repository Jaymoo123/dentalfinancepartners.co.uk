import json
from collections import Counter

with open(r'C:\Users\user\Documents\Accounting\expansion_research\r2_class_batch_1_input.json', encoding='utf-8') as f:
    data = json.load(f)

CLASS_MAP = {
    "uklandlordtax.co.uk": "SPECIALIST",
    "rogers-spencer.co.uk": "GENERALIST",
    "loucas.org.uk": "GENERALIST",
    "pkb.co.uk": "GENERALIST",
    "fhpaccounting.co.uk": "SPECIALIST",
    "archimediaaccounts.co.uk": "GENERALIST",
    "isaccountancy.co.uk": "SPECIALIST",
    "taxassist.co.uk": "GENERALIST",
    "taxaccountant.co.uk": "SPECIALIST",
    "landlordtaxaccountants.co.uk": "SPECIALIST",
    "usataxgurus.com": "INFO",
    "hayes-accountants.co.uk": "GENERALIST",
    "consultax.co.uk": "GENERALIST",
    "gregoryxlldt.blogaritma.com": "INFO",
    "jkaccountants.com": "GENERALIST",
    "iwnaccountancy.co.uk": "SPECIALIST",
    "buytolettaxaccountants.co.uk": "SPECIALIST",
    "rockstaraccountants.co.uk": "SPECIALIST",
    "ttca.co.uk": "GENERALIST",
    "ibissandco.com": "SPECIALIST",
    "vantage-accounting.co.uk": "GENERALIST",
    "pearllemonaccountants.com": "GENERALIST",
    "pearllemonaccountants.co.uk": "GENERALIST",
    "ukpropertyaccountants.co.uk": "SPECIALIST",
    "goldhouseaccounting.co.uk": "SPECIALIST",
    "dua.co.uk": "SPECIALIST",
    "thepropertyaccountant.co.uk": "SPECIALIST",
    "thepropertyca.co.uk": "SPECIALIST",
    "eccoaccountants.com": "GENERALIST",
    "reflexaccounting.co.uk": "SPECIALIST",
    "auditox-accountancy.uk": "GENERALIST",
    "liondaris.co.uk": "GENERALIST",
    "xeinadin.com": "GENERALIST",
    "edgeaccountants.co.uk": "SPECIALIST",
    "paylessaccountants.co.uk": "GENERALIST",
    "djh.co.uk": "GENERALIST",
    "propertyincomeaccountants.co.uk": "SPECIALIST",
    "business-accounting.co.uk": "GENERALIST",
    "alexander.co.uk": "GENERALIST",
    "xperttaxaccountants.co.uk": "SPECIALIST",
    "gnsassociates.co.uk": "SPECIALIST",
    "thetaxguys.co.uk": "SPECIALIST",
    "property-tax-advice.co.uk": "SPECIALIST",
    "propertytaxadvisor.co.uk": "SPECIALIST",
    "rethinktax.co.uk": "SPECIALIST",
    "taxadvisorypartnership.com": "SPECIALIST",
    "msrgroup.org.uk": "SPECIALIST",
    "bing.com": "INFO",
    "fusionaccountants.co.uk": "GENERALIST",
    "dnsassociates.co.uk": "GENERALIST",
    "provestor.co.uk": "SPECIALIST",
    "maynardjohns.com": "GENERALIST",
    "linggardandthomas.co.uk": "GENERALIST",
    "theaccountancy.co.uk": "GENERALIST",
    "qaccountants.com": "GENERALIST",
    "sherwincurrid.com": "GENERALIST",
    "hhmaccountants.co.uk": "SPECIALIST",
    "gmprofessionalaccountants.co.uk": "GENERALIST",
    "aa-accountants.co.uk": "GENERALIST",
    "freelancer.com": "DIRECTORY",
    "bakerknoyle.co.uk": "GENERALIST",
    "financeaccounting.uonbi.ac.ke": "INFO",
    "moneyfinanceadvisors.com": "INFO",
    "brindleys.co.uk": "GENERALIST",
    "ross-brooke.co.uk": "GENERALIST",
    "aims.co.uk": "GENERALIST",
    "reedaccountants.co.uk": "SPECIALIST",
    "hazlewoods.co.uk": "GENERALIST",
    "cowgills.co.uk": "GENERALIST",
    "goodmanjones.com": "GENERALIST",
    "ljsaccountingservices.com": "GENERALIST",
    "friendandgrant.co.uk": "GENERALIST",
    "optimiseaccountants.co.uk": "SPECIALIST",
    "startups.co.uk": "INFO",
    "forbes.com": "INFO",
    "propertychat.com.au": "INFO",
    "valueplanningreports.com": "INFO",
    "dbs.com.sg": "INFO",
    "investopedia.com": "INFO",
    "comanandco.co.uk": "GENERALIST",
    "coxhinkins.co.uk": "DIRECTORY",
    "e2eaccounting.co.uk": "GENERALIST",
    "mindspaceoutsourcing.co.uk": "GENERALIST",
    "apexaccountants.tax": "GENERALIST",
    "qxglobalgroup.com": "GENERALIST",
    "revela.co": "INFO",
    "davidhoward.co.uk": "GENERALIST",
    "ilkinssouthworth.co.uk": "GENERALIST",
    "blockmanagementuk.ltd": "INFO",
    "blockmanagementcompany.co.uk": "INFO",
    "block-management.co.uk": "INFO",
    "qubeaccountants.co.uk": "SPECIALIST",
    "savills.co.uk": "INFO",
    "fry.co.uk": "SPECIALIST",
    "atsonbuckle.co.uk": "GENERALIST",
    "reed.co.uk": "INFO",
    "uk.indeed.com": "INFO",
    "accotax.co.uk": "GENERALIST",
    "homeaccountants.co.uk": "SPECIALIST",
    "clarkwell.co.uk": "SPECIALIST",
    "axtpropertyaccountants.co.uk": "SPECIALIST",
    "a4g-llp.co.uk": "GENERALIST",
    "accountsandlegal.co.uk": "GENERALIST",
    "plusaccounting.co.uk": "GENERALIST",
    "lettingagenttoday.co.uk": "INFO",
    "mneaccounting.co.uk": "GENERALIST",
    "ruthcgreene.com": "INFO",
    "ellersaccountants.co.uk": "SPECIALIST",
    "ratiobox.co.uk": "GENERALIST",
    "basraandbasra.co.uk": "GENERALIST",
    "lettspay.co.uk": "INFO",
    "infinity-accounting.co.uk": "SPECIALIST",
    "charnwoodaccountants.co.uk": "GENERALIST",
    "livingstonesaccountants.co.uk": "GENERALIST",
    "rwbca.co.uk": "GENERALIST",
    "rousepartners.co.uk": "GENERALIST",
    "saffery.com": "SPECIALIST",
    "begbiesaccountants.co.uk": "SPECIALIST",
    "rpartners.co.uk": "SPECIALIST",
    "bhp.co.uk": "SPECIALIST",
    "pkfsmithcooper.com": "SPECIALIST",
    "dixonwilson.com": "SPECIALIST",
    "hardcastle-burton.co.uk": "SPECIALIST",
    "rtaccountants.co.uk": "SPECIALIST",
    "beavismorgan.com": "SPECIALIST",
    "armstrongwatson.co.uk": "SPECIALIST",
    "carterjonas.co.uk": "SPECIALIST",
    "srgcas.com": "SPECIALIST",
    "brightshire.co.uk": "SPECIALIST",
    "johnstoncarmichael.com": "SPECIALIST",
    "bellingram.co.uk": "SPECIALIST",
    "om.uk": "SPECIALIST",
    "hlca.co.uk": "SPECIALIST",
    "lovewell-blake.co.uk": "SPECIALIST",
    "streets.uk": "SPECIALIST",
    "uhy-uk.com": "GENERALIST",
    "mytaxaccountant.co.uk": "GENERALIST",
    "constructionaccountants.co.uk": "SPECIALIST",
    "eternityaccountants.co.uk": "SPECIALIST",
    "accountancee.co.uk": "GENERALIST",
    "3esaccountants.co.uk": "SPECIALIST",
    "rsbc.uk": "SPECIALIST",
    "orthwhileaccountancy.co.uk": "GENERALIST",
    "jamestoddandco.co.uk": "GENERALIST",
    "askaccountantsukltd.co.uk": "GENERALIST",
    "octaneaccountants.co.uk": "GENERALIST",
    "accountingmatters.co.uk": "GENERALIST",
    "llewellyns.co.uk": "GENERALIST",
    "finistry.co.uk": "GENERALIST",
    "protax.org.uk": "GENERALIST",
    "taptax.co.uk": "GENERALIST",
    "nomi.co.uk": "INFO",
    "gmtaxconsultants.co.uk": "GENERALIST",
    "ukcalculator.com": "INFO",
    "accountantforbuilders.co.uk": "SPECIALIST",
    "grahambarnesaccountant.co.uk": "SPECIALIST",
    "ac-accounts.co.uk": "GENERALIST",
    "swift-accountants.co.uk": "SPECIALIST",
    "accountantforconstruction.co.uk": "SPECIALIST",
    "yorkshireaccountancy.co.uk": "SPECIALIST",
    "numericaccounting.co.uk": "SPECIALIST",
    "psaccountant.co.uk": "GENERALIST",
    "abacusleeds.co.uk": "GENERALIST",
    "taxadvisor.qaccountants.com": "GENERALIST",
    "shipleystax.com": "GENERALIST",
    "yourtaxhelp.co.uk": "SPECIALIST",
    "independent-tax.co.uk": "GENERALIST",
    "taxadvicenetwork.co.uk": "DIRECTORY",
    "pulse-accountants.co.uk": "SPECIALIST",
    "e-accounts.co.uk": "GENERALIST",
    "btbaccountants.co.uk": "GENERALIST",
    "a-wise.co.uk": "GENERALIST",
    "applebymall.co.uk": "GENERALIST",
    "togetherwecount.co.uk": "SPECIALIST",
    "cpaclinics.com": "INFO",
    "meruaccounting.com": "INFO",
    "therapeutictax.com": "INFO",
    "aterfordbusinesssolutions.com": "INFO",
    "cobiaaccounting.co.uk": "SPECIALIST",
    "qaccounting.com": "SPECIALIST",
    "accountantinmiltonkeynes.co.uk": "GENERALIST",
    "zipdo.co": "INFO",
    "relayfi.com": "INFO",
    "northone.com": "INFO",
    "freshbooks.com": "INFO",
    "zarmoney.com": "INFO",
    "exfsm.com": "INFO",
    "prezi.com": "INFO",
    "sparkyaccounting.com": "SPECIALIST",
    "landolio.com": "INFO",
    "carry.com": "INFO",
    "amaccountex.co.uk": "GENERALIST",
    "novo.co": "INFO",
    "nextinsurance.com": "INFO",
    "simpletaxes.co.uk": "GENERALIST",
    "taxeezy.co.uk": "GENERALIST",
    "getholdings.com": "INFO",
    "decoratoraccountants.com": "SPECIALIST",
    "steelefinancial.co.uk": "GENERALIST",
    "mytaxdoc.co.uk": "GENERALIST",
    "jtraccountancy.co.uk": "GENERALIST",
    "accountaholic.co.uk": "GENERALIST",
    "accountantsfordecorators.co.uk": "SPECIALIST",
    "uksmallbusinessdirectory.co.uk": "DIRECTORY",
    "trusted-decorator.co.uk": "DIRECTORY",
    "kgaccountantsblog.com": "GENERALIST",
    "gktaxservices.co.uk": "GENERALIST",
    "h2horganizing.com": "INFO",
    "london-law.co.uk": "INFO",
    "newsanyway.com": "INFO",
    "thedecoratorsforum.com": "INFO",
    "ukstartupmagazine.co.uk": "INFO",
    "aisleplanner.com": "INFO",
    "swisscontact.org": "INFO",
    "myjobquote.co.uk": "INFO",
    "tradesinfo.co.uk": "INFO",
    "crunch.co.uk": "GENERALIST",
    "accurox.co.uk": "INFO",
    "tax2u.co.uk": "GENERALIST",
    "nationalcareers.service.gov.uk": "INFO",
}

NICHE_OVERRIDES = {
    ("pkf-francisclark.co.uk", "3"): "GENERALIST",
    ("pkf-francisclark.co.uk", "7"): "SPECIALIST",
    ("pkf-francisclark.co.uk", "8"): "GENERALIST",
    ("gorillaaccounting.com", "1"): "SPECIALIST",
    ("gorillaaccounting.com", "2"): "SPECIALIST",
    ("gorillaaccounting.com", "9"): "GENERALIST",
}

VALID = {"SPECIALIST", "GENERALIST", "DIRECTORY", "INFO", "OWN-ESTATE"}

classified = 0
unmapped = []

for niche_id, niche_data in data.items():
    for query, rows in niche_data["queries"].items():
        for row in rows:
            if row["class"] is not None:
                continue
            domain = row.get("domain", "").strip()
            if not domain:
                row["class"] = "INFO"
                classified += 1
                continue
            key = (domain, niche_id)
            if key in NICHE_OVERRIDES:
                row["class"] = NICHE_OVERRIDES[key]
                classified += 1
                continue
            if domain == "icsuk.com":
                row["class"] = "SPECIALIST" if niche_id in ("1", "8", "9") else "GENERALIST"
                classified += 1
                continue
            if domain == "gorillaaccounting.com":
                row["class"] = "GENERALIST"
                classified += 1
                continue
            if domain in CLASS_MAP:
                row["class"] = CLASS_MAP[domain]
                classified += 1
            else:
                unmapped.append((niche_id, query, domain))

print(f"Classified this run: {classified}")
if unmapped:
    print(f"UNMAPPED ({len(unmapped)}):")
    for u in unmapped:
        print(" ", u)

nulls = [(nid, q, row.get("domain")) for nid, nd in data.items() for q, rows in nd["queries"].items() for row in rows if row["class"] is None]
bad = [(nid, q, row.get("domain"), row["class"]) for nid, nd in data.items() for q, rows in nd["queries"].items() for row in rows if row["class"] not in VALID]

print(f"Nulls remaining: {len(nulls)}")
print(f"Invalid classes: {len(bad)}")
for n in nulls: print("  NULL:", n)
for b in bad: print("  BAD:", b)

counts = Counter(row["class"] for nd in data.values() for rows in nd["queries"].values() for row in rows)
print("Per-class counts:", dict(counts))

with open(r'C:\Users\user\Documents\Accounting\expansion_research\r2_class_batch_1_output.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=1, ensure_ascii=False)
print("Output written.")
