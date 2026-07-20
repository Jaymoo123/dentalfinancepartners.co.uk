# ponytail: one-off; marks reviewed near-duplicate wave-2 topic rows used=true
import sys
sys.path.insert(0, "scripts")
from _q import run

IDS = [
    # charities
    "e8ce1070-18bb-4870-b164-46ea892a3928",  # charity annual return
    "dce3ff46-c33e-443a-9225-ce9444c6b261",  # cic funding
    "3b6b18f5-bae0-4633-b595-1bbe7a55458d",  # funding for cic companies
    # hospitality
    "8ca15280-71a2-4ffa-b17f-f35b04d31cf2",  # revenue management hotel industry
    "b69b3ee0-0808-4e6d-936b-7a00e4a060a6",  # vat on food and drinks
    "61265a11-e2fd-4f59-96fa-7b264faa55fc",  # vat rates for food
    # startups-tech
    "d48b1aab-6fc0-4463-8181-23bfdb26c36b",  # kpmg saas revenue recognition guide
    "ce56ef2b-bb78-4bfd-8b20-e43801c9edb1",  # emi share options scheme
    "4f4a1a15-9364-4097-99e8-41ecbe54d98b",  # emi scheme hmrc
    "a6efbfc4-b94f-426e-85d2-548e8169422e",  # emi scheme equity
    "eabd1ed3-1e6f-449a-9c19-efeab31ba2a9",  # emi options annual return
    "4bf3ca78-8036-4cf2-95b2-c01607b460d7",  # emi scheme annual return
    "9e3e5a1d-edf6-4f5a-a0ca-326b103c538c",  # stock option vesting
    "06a18a72-8690-4675-9ccc-778de8be2f5f",  # employee stock options vesting
    "ea90a26d-ae36-4c1e-81e4-75db43229c1e",  # find grants for a small business startup
    # crypto
    "02ef8266-a18d-4b69-ad74-ec85268eec7f",  # can hmrc see crypto
    "458bdbf1-a6b5-4591-976d-b972af3f5170",  # hmrc crypto tax crackdown
    "cfea27b9-4e98-490f-bf2b-1ddb7977b760",  # hmrc crypto tax rules 2026
    "0efc9fb9-ba51-41b6-a61f-85f739cf5c5a",  # do you get taxed on crypto uk
    "b45750fe-12ef-4925-ae3d-3ddc52e84659",  # how much tax do i pay on crypto gains uk
    "35922ac3-acb2-4cf8-b43d-0e8ba1a9c35b",  # do i have to pay tax on crypto gains uk
    "51023061-e9d9-4c52-a34c-3b4eed040f1b",  # how to pay less cgt on crypto (= shipped legitimate-ways-reduce-crypto-cgt-uk)
    # ecommerce
    "2a84a41e-d3b4-4611-aec2-d829c1451764",  # ebay selling tax rules
    "716438e3-b46c-415e-a5ca-aa53608527c5",  # understanding ebay tax rules and regulations
    "d00cafed-cf91-41fc-ad4e-c08d920c6762",  # are etsy seller fees tax deductible
    "f2041839-5ff9-42c0-b59c-ef28f077fd22",  # do etsy charge vat on their fees
]

ids_sql = ",".join(f"'{i}'" for i in IDS)
before = run(f"SELECT count(*) AS n FROM blog_topics WHERE id IN ({ids_sql}) AND used=false")
print("unused rows targeted:", before[0]["n"], "of", len(IDS))
run(f"UPDATE blog_topics SET used=true WHERE id IN ({ids_sql})")
after = run(f"SELECT count(*) AS n FROM blog_topics WHERE id IN ({ids_sql}) AND used=true")
print("now used=true:", after[0]["n"], "of", len(IDS))
assert after[0]["n"] == len(IDS), "update incomplete"
