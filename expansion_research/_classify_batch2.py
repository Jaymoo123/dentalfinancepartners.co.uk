import json

DOMAIN_MAP = {
    "profitwiseaccounting.biz": "SPECIALIST", "designerscpa.com": "SPECIALIST",
    "cpaforcontractor.com": "SPECIALIST", "bulletproofsubs.com": "SPECIALIST",
    "incomebookkeeping.com": "SPECIALIST", "accountingforsubs.com": "SPECIALIST",
    "cpa4subs.com": "SPECIALIST", "prestigebm.co.uk": "SPECIALIST",
    "qaccounting.com": "SPECIALIST", "aktax.co.uk": "SPECIALIST",
    "taxrelax.co.uk": "SPECIALIST", "pulse-accountants.co.uk": "SPECIALIST",
    "bernard-rogers.co.uk": "SPECIALIST", "assuretax.co.uk": "SPECIALIST",
    "tradeaccountant.co.uk": "SPECIALIST", "grahambarnesaccountant.co.uk": "SPECIALIST",
    "swan-books.co.uk": "SPECIALIST", "reactaccountancy.co.uk": "SPECIALIST",
    "ascott-blake.com": "SPECIALIST", "manvic.com.au": "SPECIALIST",
    "djh.co.uk": "SPECIALIST", "pfmdental.co.uk": "SPECIALIST",
    "dentalaccounting.co.uk": "SPECIALIST", "dentalaccountant.com": "SPECIALIST",
    "dentledger.co.uk": "SPECIALIST", "samera.co.uk": "SPECIALIST",
    "a-wise.co.uk": "SPECIALIST", "dentists-cpafirm.com": "SPECIALIST",
    "dentalaccountantsscotland.co.uk": "SPECIALIST", "mdaaccountants-hereford.co.uk": "SPECIALIST",
    "ross-brooke-dental.co.uk": "SPECIALIST", "medicaccountants.co.uk": "SPECIALIST",
    "bw-medical.co.uk": "SPECIALIST", "nicholsmedical.co.uk": "SPECIALIST",
    "accounting-pro.co.uk": "SPECIALIST", "draccountant.org": "SPECIALIST",
    "medicaccountants.com.au": "SPECIALIST", "accountants4nhsdoctors.co.uk": "SPECIALIST",
    "clearcutaccounting.co.uk": "SPECIALIST", "cleartaxgroup.co.uk": "SPECIALIST",
    "reflexaccounting.co.uk": "SPECIALIST", "groupams.co.uk": "SPECIALIST",
    "accoladeaccounting.com": "SPECIALIST", "thedoctorscpa.com": "SPECIALIST",
    "huddlestontaxcpas.com": "SPECIALIST", "1099accountant.com": "SPECIALIST",
    "mytaxdoc.co.uk": "SPECIALIST", "coreadviz.co.uk": "SPECIALIST",
    "pharmacistaccountants.co.uk": "SPECIALIST", "gorillaaccounting.com": "SPECIALIST",
    "arr.co.uk": "SPECIALIST", "stetsonaccountants.co.uk": "SPECIALIST",
    "goforma.com": "SPECIALIST", "freestyleaccounting.com": "SPECIALIST",
    "pharmatax.co.uk": "SPECIALIST", "sykes-cpa.com": "SPECIALIST",
    "pharmacyaccountants.co.uk": "SPECIALIST", "totalbooks.co.uk": "SPECIALIST",
    "ctmp.co.uk": "SPECIALIST", "xitax.co.uk": "SPECIALIST",
    "azlaccounting.solutions": "SPECIALIST", "shreemaccountants.co.uk": "SPECIALIST",
    "rsbc.uk": "SPECIALIST", "fusionaccountants.co.uk": "SPECIALIST",
    "emaccountancy.co.uk": "SPECIALIST", "ibgconsulting.co.uk": "SPECIALIST",
    "moonstoneaccountants.co.uk": "SPECIALIST", "meruaccounting.com": "SPECIALIST",
    "axionstrategicadvisors.com": "SPECIALIST", "lindamcgowan.com.au": "SPECIALIST",
    "dillonadvisors.com": "SPECIALIST", "accurus.co.uk": "SPECIALIST",
    "veterinaryaccountants.com": "SPECIALIST", "granitepeakcpa.com": "SPECIALIST",
    "advantage.cpa": "SPECIALIST", "vpmp.net": "SPECIALIST",
    "vetcpaco.com": "SPECIALIST", "onlyforveterinarians.com": "SPECIALIST",
    "cookcpagroup.com": "SPECIALIST", "vetcpa.org": "SPECIALIST",
    "veterinarianaccountant.com": "SPECIALIST", "veterinariancpa.com": "SPECIALIST",
    "cpaveterinarians.com": "SPECIALIST", "flvetcpa.com": "SPECIALIST",
    "pet-cpa.com": "SPECIALIST", "jacobscpas.com": "SPECIALIST",
    "redtulips.co.uk": "SPECIALIST", "tldraccounting.com": "SPECIALIST",
    "shirleysmithaccountancy.co.uk": "SPECIALIST", "traktionaccounting.com": "SPECIALIST",
    "cpaforrp.ca": "SPECIALIST", "theaccountingstudio.co.uk": "SPECIALIST",
    "broadreachaccountancy.co.uk": "SPECIALIST", "prssmart.com": "SPECIALIST",
    "leichtercpa.com": "SPECIALIST", "leonandcompany.co.uk": "SPECIALIST",
    "account-i.co.uk": "SPECIALIST", "q.tax": "SPECIALIST",
    "taxpathuk.co.uk": "SPECIALIST", "taxrebateservices.co.uk": "SPECIALIST",
    "accountaxzone.com": "SPECIALIST", "medicalhealthaccountants.uk": "SPECIALIST",
    "morriscrocker.co.uk": "SPECIALIST", "franksaccountants.co.uk": "SPECIALIST",
    "careaccounts.co.uk": "SPECIALIST", "clarkwell.co.uk": "SPECIALIST",
    "account-ease.co.uk": "SPECIALIST", "carehomeaccounts.com": "SPECIALIST",
    "taxcare.org.uk": "SPECIALIST", "oxygenaccounting.co.uk": "SPECIALIST",
    "accountantfor.co.uk": "SPECIALIST",
    "audtax.co.uk": "GENERALIST", "accotax.co.uk": "GENERALIST",
    "yourtaxhelp.co.uk": "GENERALIST", "livingstonesaccountants.co.uk": "GENERALIST",
    "btbaccountants.co.uk": "GENERALIST", "accountancee.co.uk": "GENERALIST",
    "zmartly.co.uk": "GENERALIST", "ross-brooke.co.uk": "GENERALIST",
    "archimediaaccounts.co.uk": "GENERALIST", "abmcharteredaccountants.com": "GENERALIST",
    "perrysaccountants.co.uk": "GENERALIST", "e-accounts.co.uk": "GENERALIST",
    "shipleysaccounting.com": "GENERALIST", "coveaccountancyservices.co.uk": "GENERALIST",
    "goverseth.co.uk": "GENERALIST", "mmba.co.uk": "GENERALIST",
    "healthcareaccountants.co.uk": "GENERALIST", "lm.accountants": "GENERALIST",
    "auditox-accountancy.uk": "GENERALIST", "accountantsfordoctors.co.uk": "GENERALIST",
    "taxaccountant.co.uk": "GENERALIST", "lanop.co.uk": "GENERALIST",
    "r-m-t.co.uk": "GENERALIST", "braceys-accountants.co.uk": "GENERALIST",
    "robson-laidler.co.uk": "GENERALIST", "sial-accountants.co.uk": "GENERALIST",
    "bhp.co.uk": "GENERALIST", "gmprofessionalaccountants.co.uk": "GENERALIST",
    "larking-gowen.co.uk": "GENERALIST", "accountingpeople.co.uk": "GENERALIST",
    "targetaccounting.co.uk": "GENERALIST", "pearllemonaccountants.com": "GENERALIST",
    "raaccountants.com": "GENERALIST", "hawsons.co.uk": "GENERALIST",
    "yorkshiremedicalaccountants.co.uk": "GENERALIST", "pricebailey.co.uk": "GENERALIST",
    "tajaccountants.co.uk": "GENERALIST", "ballardsllp.com": "GENERALIST",
    "aims.co.uk": "GENERALIST", "xeinadin.com": "GENERALIST",
    "inspire.accountants": "GENERALIST", "berrydunn.com": "GENERALIST",
    "coopernorman.com": "GENERALIST", "accountantpartners.com": "GENERALIST",
    "dma-accountancyservices.co.uk": "GENERALIST", "careaccountancy.co.uk": "GENERALIST",
    "cruseburke.co.uk": "GENERALIST",
    "bing.com": "INFO", "nasdal.org.uk": "INFO", "bma.org.uk": "INFO",
    "aisma.org.uk": "INFO", "aop.org.uk": "INFO", "tradifyhq.com": "INFO",
    "vettimes.com": "INFO", "buildyourfirm.com": "INFO",
    "business-accounting.co.uk": "INFO", "privatepracticeskills.com": "INFO",
    "practiceoftherapy.com": "INFO", "maydayhealthcareplc.co.uk": "INFO",
    "uktax.tools": "INFO", "insights.phillipsgrouptax.com": "INFO",
    "onelanesolution.com": "INFO", "vintti.com": "INFO",
    "carehome.co.uk": "INFO", "hizconsulting.net": "INFO",
    "ratiobox.co.uk": "INFO", "ve-medical.com": "INFO",
    "pulsetoday.co.uk": "INFO", "uk.indeed.com": "INFO",
    "gponline.com": "INFO", "myjobmag.com": "INFO",
    "companiesnz.com": "INFO", "video-bookmark.com": "INFO",
    "cpe.org.uk": "INFO", "tupeuxcourir.com": "INFO",
    "jobs.nhs.uk": "INFO",
    "medicsmoney.co.uk": "DIRECTORY", "practiceindex.co.uk": "DIRECTORY",
    "adoos.co.uk": "DIRECTORY", "approvedbusiness.co.uk": "DIRECTORY",
    "yell.com": "DIRECTORY", "gov.uk": "INFO", "youtube.com": "INFO",
    "reddit.com": "INFO",
    "find-and-update.company-information.service.gov.uk": "INFO",
}

IN = r"C:\Users\user\Documents\Accounting\expansion_research\r2_class_batch_2_input.json"
OUT = r"C:\Users\user\Documents\Accounting\expansion_research\r2_class_batch_2_output.json"

with open(IN, encoding="utf-8") as f:
    data = json.load(f)

for niche_id, niche_data in data.items():
    for query, rows in niche_data["queries"].items():
        for row in rows:
            if row["class"] is None:
                d = row.get("domain", "")
                if d == "":
                    row["class"] = "INFO"
                else:
                    row["class"] = DOMAIN_MAP.get(d)

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=1, ensure_ascii=False)

valid = {"SPECIALIST","GENERALIST","DIRECTORY","INFO","OWN-ESTATE"}
with open(OUT, encoding="utf-8") as f:
    data = json.load(f)
nulls = []
invalid = []
counts = {}
for niche_id, niche_data in data.items():
    for query, rows in niche_data["queries"].items():
        for row in rows:
            c = row["class"]
            if c is None:
                nulls.append((niche_id, query, row.get("domain",""), row.get("position")))
            elif c not in valid:
                invalid.append((niche_id, query, row.get("domain",""), c))
            counts[c] = counts.get(c, 0) + 1
print("Nulls:", len(nulls))
if nulls:
    for n in nulls[:10]: print(" ", n)
print("Invalid:", len(invalid))
if invalid:
    for i in invalid[:10]: print(" ", i)
print("Counts:", counts)
