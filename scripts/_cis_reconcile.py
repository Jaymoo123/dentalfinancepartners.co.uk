"""Coverage reconciliation for construction-cis blog_topics — 2026-07-14."""
import httpx, json, os, sys
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
REF = "dhlxwmvmkrfnmcgjbntk"
URL = f"https://api.supabase.com/v1/projects/{REF}/database/query"

def q(sql):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
                   json={"query": sql}, timeout=120)
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:500]}", file=sys.stderr)
        sys.exit(1)
    return r.json()

# IDs confirmed covered by live pages — see comments for evidence page
COVERED = [
    # /blog/cis-compliance/cis-monthly-return-guide
    "c8563dcb-f529-4898-9540-5a8ee295b35a",  # cis return 1900
    "8ca9eff8-7cfa-4fb3-93d1-c70c7c30c888",  # submit cis return 140
    "34be3c9e-3b59-4ad4-984d-9ea3f59e1ce3",  # file cis return 90
    "d9a06dda-90ea-4ba9-ac6b-e4cbc916200d",  # online cis return 90
    "560ae081-1e78-4fe9-b7db-56dff065e92f",  # file cis return online 50
    "8808b2a1-a504-4e38-8f66-87ef7c09ef56",  # when does cis return have to be submitted 30
    "7bef564c-8eb4-4603-8404-ec97164767ff",  # how to fill in cis return online 20
    "1b5a4856-1a1f-4069-8485-40bf1041e363",  # cis monthly return deadline 20
    "9a51a291-d773-4e0f-9813-bc4d051e2406",  # how to pay cis monthly return 10
    "25fe0744-faa5-4691-bfe8-9768a4c36cb4",  # hmrc cis monthly return 10
    "9b49bd12-ed58-4e38-81b2-0d59e62a19a2",  # completing cis monthly return 10
    "722ebfd9-54c8-4c0d-90eb-9579ecb6e555",  # how to complete cis return online 10
    "df38f182-1577-45d0-a0d1-cd21cc751c5d",  # completing cis return online 10
    "09c157b6-ddae-4740-9d2e-e5321ed142f2",  # cis monthly return guidance notes 10
    "db797498-e484-4ce0-887b-6e5f6a7c97e5",  # government gateway cis monthly return 10
    "caca9228-e077-4be9-858e-c42e54ebe3b5",  # cis monthly return form 10
    "63ebd27d-7bfc-4a40-b6db-c55749331da7",  # cis contractors monthly return form 10
    "ac1f3044-2eab-407c-bbcf-1417d56094fd",  # cis return form 10
    "cd4dd477-66d6-4461-abd5-cc9708589324",  # cis monthly return template 10
    "d36ba7bd-0a32-49ea-8276-d74a70ece742",  # cis return total payments made 20
    "3baf3f77-d703-4d89-b987-14a311eaa952",  # cis return online filing 0
    "16aa1b8d-846c-4e51-ad5a-e2da2d5c80f0",  # cis paper return 10
    "a9677f3b-6a05-44e2-9d6f-8825c63cf953",  # cis online monthly return 10
    "3634ec57-2063-42c1-8f97-af7be1a648b8",  # what does a cis return look like 10
    "86b5529c-6ec1-43bf-897d-a6fedc0c6255",  # where to put cis on tax return 10
    "bdc600d9-982d-4ed2-9035-f71fe87c4b24",  # hmrc cis return 170
    "32519f91-5909-4aea-a645-8318937265d5",  # cis return meaning 50
    # /blog/cis-compliance/cis-deadline-calendar-2026-27
    "4ec75ecd-5c23-4d04-9330-36c27c303882",  # cis return deadlines 320
    "218ebe12-fa41-4b4e-9dcf-9a56bd4d3461",  # cis return date 50
    "e43e957e-f8e8-465d-b3b6-00b1e7a91f27",  # when is cis return due 70
    "3f9b4a8f-29f8-438f-be56-25786d1ecbe9",  # cis return submission deadline 10
    "c264d910-fddc-4508-a525-1f536a594c36",  # cis return dates 2026-27 null
    "1b5a4856-1a1f-4069-8485-40bf1041e363",  # cis monthly return deadline 20 [dup ok]
    # /blog/cis-refunds/cis-self-assessment-complete-guide
    "b4995c0f-f27d-4000-a3b4-09100fb7040e",  # tax return for cis 720
    "840165d3-696a-4d79-85ed-4136132b3db1",  # self assessment tax return cis 90
    "ab209564-b7cc-4151-b3fd-d06f5e80ed7a",  # cis subcontractor tax return 30
    "2dd8c672-fdb6-40d9-b72f-b11ba73be65c",  # self employed cis tax return 20
    "5bd09abe-28b0-4902-9de9-e637e7352caf",  # how to complete tax return for cis 10
    "4103ae27-990d-4a44-aea1-588ffb73a3c7",  # online tax return cis 10
    "a14b67bc-553c-4c43-8c26-d9709a9adae3",  # self-assessment for cis subcontractors null
    "3d787dcd-2d8f-4b18-b8bd-c3a73af9689b",  # cis tax return guide 10
    "f94461aa-0b7f-4306-9c35-3fdbd339bf6e",  # cis tax return example 70
    "202f53db-c008-42c6-b219-dd642ea81475",  # how does cis tax return work 10
    "22da6c75-2029-41cd-916b-841b0b1f3c16",  # cis deductions on tax return 10
    "5e9210ea-e302-4f4b-84da-35f83ba14ead",  # how to fill in a cis tax return 10
    "b38c9456-bcc8-4578-ad9d-605ffd987594",  # cis scheme tax return 10
    "a2924acb-65a9-4f71-955f-39116bf40121",  # cis income on tax return 10
    "0d95a789-676a-4503-b44d-ddc3ef1f7163",  # how to enter cis on tax return 10
    "cc3ddd89-64ec-41c5-9f33-d077140688b5",  # cis tax return 2026 10
    "090932fa-515d-4fc9-9711-d6c1d4e5a418",  # cis contractor tax return 10
    "0f18d631-5a19-490c-b018-f717d9da7b7d",  # cis payments on tax return 10
    "47618f55-5815-484b-a424-cf5fabf19973",  # cis worker tax return 10
    # /calculators/cis-refund-estimator + /calculators/cis-self-assessment-calculator
    "be9b2ad9-3543-4800-8b41-6bae627117db",  # cis tax refund calculator 390
    "0160e3d6-20c4-4af5-9636-a4b9b1180296",  # tax return calculator cis 390
    # /blog/cis-compliance/cis-subcontractor-verification
    "7c2e89dd-f497-4d5b-99ab-5908dc20f683",  # verifying cis subcontractor 210
    "27b6e8d7-ae25-4ebe-9892-8b68928e8123",  # check subcontractor cis status 20
    "0f3ed868-4952-4bbb-b173-b2dcc6dd340b",  # cis helpline verify subcontractor 10
    "fd243f04-ff63-4a29-8cee-6975198e4cae",  # cis unmatched subcontractor null
    # /blog/cis-compliance/cis-payment-deduction-statements-guide
    "4c0e49ef-939e-4173-b3f8-64c46538a6ed",  # cis tax deduction statement 140
    "91174f77-9307-407d-aacd-a942e81bfabd",  # cis tax deduction certificate 40
    "6aae2dac-400d-4b0d-b8e1-eb207483fc97",  # cis subcontractor monthly statement 10
    "7929a4f1-d670-4c0a-8bd2-1bc22a933897",  # cis payment and deduction forms null
    # /blog/cis-compliance/cis-nil-return-explained
    "1581405b-7fff-40b8-ae74-ec185328e4e2",  # hmrc nil return cis null
    "9459ba30-4ea9-4206-aba3-0cdd763ea0b0",  # cis nil return for 6 months null
    "7a3b5f98-2c01-4ea0-914e-e5d905704cff",  # cis nil return penalty 10
    "a112a5aa-97f3-4caa-b7e5-419be41f5afa",  # cis annual return 10
    # /blog/cis-compliance/cis-penalties-and-appeals
    "a9db594b-ca96-4aae-9797-bf7f1dbbe96c",  # cis late filing penalty null
    "3491d639-3e4e-4ed2-b45e-e0119b16a2cd",  # appeal cis penalty null
    "60a968fc-0138-4d6b-b3b1-0c067704574e",  # amend cis return 10
    "2ced3efa-4539-44a3-852b-b58270734051",  # can you amend a cis return null
    "e2b72044-403b-4c2f-9c79-ea80bb9cbc30",  # amend cis return penalty null
    "ca157df4-3d1b-432b-b652-1c70cbbfebfa",  # correcting cis return errors 10
    "69d8e417-3050-46e3-86f1-fe068038eb88",  # error on cis return null
    "d19983c6-260b-4543-b147-acf1c0ea10df",  # cis penalty hmrc null
    # /blog/cis-compliance/cis-gross-payment-status-guide + /gross-payment-status
    "d31b3ddf-33b0-49df-9d05-7a7a4d9fd382",  # cis gross payment status turnover test null
    "45c47400-f1a5-4136-885e-4ca6a5fd1e61",  # cis gross payment status annual review null
    "704f9cdd-0ea0-424a-8098-112e86a06ffd",  # how long does it take to get gross payment status null
    "4050b04c-3507-49fd-95ac-e7eccb2a1634",  # how to apply for cis gross payment status online null
    "f4e1fdca-994d-4c7f-8e90-65d65a672cab",  # construction industry scheme gross payment status 10
    "fdf752c6-7932-4941-a422-df4e76a5d22d",  # gross payment status limited company 30
    "98ab618a-1e90-477e-8425-015bcd5a95b5",  # gross status cis return 10
    # /cis-refund + /blog/cis-refunds/cis-tax-refund-how-to-claim
    "0986eecb-22fa-4d34-9208-845da7573fb4",  # cis reclaim null
    "69c392c4-c14b-47df-941a-cb02543224fd",  # cis tax refund services null
    "151b6b21-fc00-4c7e-b9f5-4d9b2e62b90e",  # cis reclaim services null
    "2d99cb49-4312-40bf-9cbb-654cd7a6d2be",  # cis reclaims and tax null
    "cd02f5f3-7fa3-4a54-859d-ad8a65028eaa",  # cis tax refund how long 30
    # /blog/cis-basics/how-to-register-for-cis
    "8b22733f-5f22-49a6-9b0c-758b0215ccb6",  # apply for cis subcontractor 50
    "a020181a-cde7-4196-9ed1-4607861e4b4f",  # register for cis subcontractor online 40
    "93532e18-85fe-4450-adbe-e99744fa4307",  # register for cis as a subcontractor limited company 20
    "714d9845-c7f1-444b-9a3b-4a45c1c6d7d5",  # how do i register as a subcontractor under cis null
    "72eea84e-027c-4937-b3c8-2af6e0fcdb43",  # cis subcontractor registration form 10
    "4b004c34-e57b-480d-a6b8-7abff2fd20f4",  # cis helpline register as a subcontractor 10
    "13f6b95b-fc8c-4aff-b313-955e88c6d9bf",  # subcontractor not cis registered null
    # /blog/software-and-tools/cis-payroll-software-guide
    "aeae6db0-2df2-4c4f-a421-241b8758ab08",  # cis payroll 140
    "3eb7f413-0135-491a-80d8-10e35214fd12",  # cis payroll companies 50
    "682c3bb3-fe20-4e8f-bd00-ce3def25063d",  # cis payroll company 50
    "9cc1492e-6e18-4300-aae3-1d5ceaacaaf9",  # cis payroll service 40
    "df18f753-7d13-4989-aa4f-7742ab85c120",  # cis payroll provider 20
    "50722216-b1d6-4732-b5c6-ee56d37c700d",  # cis payroll meaning 10
    "87816659-54a5-4a22-9a4d-947be7d17bb9",  # cis payroll solutions 10
    "76e760eb-4437-4d53-9c7b-b74dafe4d0b9",  # cis payroll portal 10
    # /blog/software-and-tools/quickbooks-cis-guide
    "1848fe03-0d95-4275-baba-cdbb9fdaf276",  # quickbooks cis subcontractor 30
    "95516b74-076f-4557-ae4c-c79a2fbf2791",  # quickbooks cis return 10
    # /blog/software-and-tools/xero-cis-guide
    "4c8974d3-3ced-4ae4-8fbe-77b3f4be963f",  # how to add cis deduction on xero 30
    "80c85ce5-138e-433d-81bc-5384ddc66e12",  # how to add cis deduction on xero invoice 10
    "f73c726d-65b8-4b7c-9220-4af2ce68c17f",  # cis suffered xero payroll null
    "a6b76cd0-cb01-4505-8c39-4ec514d2d8b9",  # cis return on xero null
    # /blog/software-and-tools/sage-cis-guide
    "fc5021e7-050a-4322-8517-6516fd9a603d",  # sage payroll cis deductions 10
    "62bea58a-3f3c-49c2-bfc6-3e9efa633d8a",  # sage payroll cis 10
    "7a4ef63c-ec2a-4ec1-9d45-6214537ce151",  # how to amend a cis return on sage null
    # /blog/cis-basics/what-is-a-cis-accountant
    "d7f814e4-0cdf-4aba-82e9-a7710c209a6b",  # accountant construction 320
    "df611190-1930-4b96-ae98-b344a9e4b6a5",  # accountant for construction business 170
    "0abf6056-43f0-4ed2-9a69-284fd58e0de4",  # accountant for construction company 170
    "ba73144a-ff1c-4ae2-9dae-bf2466ab7868",  # construction industry accountant 70
    "878bcb68-9c49-4cc3-90e4-dfe010f6400d",  # cis accountant near me 70
    "f4ef64bc-a2ae-4f25-a44e-a829f63cf62a",  # construction project accountant 20
    "e07c1604-3dcd-4b37-b324-2f06301217b8",  # what is the role of accountant in construction company 10
    "8ee2bac5-9724-43c6-a449-85be127599b2",  # accountant responsibilities in construction company 10
    "51f59bbb-51b0-4004-bd56-b93d161a83b7",  # duties and responsibilities of accountant in construction 10
    # /blog/cis-basics/what-is-cis
    "1eda33ea-ecde-4536-844e-2717f4706b2f",  # what is subcontractor under cis 50
    "17b8fa34-76eb-4f41-8251-c2786a983b33",  # subcontractor under cis meaning 30
    "dbe9bf92-2293-4c42-a5c6-64deb919f85d",  # cis contractor and subcontractor 10
    "eff902d2-2ae0-4242-850b-556835f22c13",  # cis subcontractor obligations null
    "ae139dde-1439-4fc0-9aa3-663d0f2712ec",  # what you must do as a cis subcontractor 40
    "19bc2509-553f-41e9-8823-d781b3a5e080",  # cis subcontractor accounting null
    # /blog/vat-and-mtd/* pages
    "620619b5-040d-4690-97da-1c3ed588238e",  # gov.uk vat reverse charge for building and construction 10
    "76647311-3dc0-454f-ba92-8185e823f6c5",  # vat reverse charge construction flat rate scheme null
    # /calculators/cis-deduction-calculator
    "bb2e1258-381e-446c-bf91-4dbb72ce6ffa",  # how to work out cis tax deduction 10
    # /blog/cis-basics/cis-employment-status-self-employed-test
    "0367693c-9360-43ff-b260-f6c2d747f2e8",  # do i have to deduct cis from a subcontractor 20
    # /for/* trade pages
    "a15f5438-41aa-4d9c-b2be-c24a5df74182",  # accountants for roofers null
    "fa4a5db8-dfab-4808-ab51-e6bc1ca52735",  # accountant for tilers null
    "283dc4d9-ebd6-4fc7-a685-d8831541bfba",  # bricklayer accountants null
    "09d6606d-8663-4ce0-9977-742307870925",  # plasterers accountant null
    "f58df002-b7c8-459f-b019-f33f12b07735",  # accounting for joiners null
    "9c817893-e131-49ff-8efc-97c38ce82864",  # accounting for insulation companies null
    "40e1a6a6-723c-4c27-914e-e6b77f7c3265",  # m&e accounting null
    "be52d0ed-1b23-4395-beed-2655fc37ccac",  # accountant for tradesmen 40
    "addae308-33ca-4aee-8e64-2bff0d3c7144",  # accountant for structural engineer null
    "2b4bfd13-0e49-4454-a6fc-7767dcf49f1d",  # construction accountants west midlands null
    # /locations/* pages
    "f50a6dca-872c-48bc-95e9-f83fe2ba3708",  # cis returns stoke null
    "7b06a634-9f98-4cd2-93d1-fe72947ea611",  # cis accountants stoke-on-trent null
    "532afcd0-a731-4e5b-a2b7-b73e268fa8d4",  # contractor accountants cardiff null
    "fe184ef1-e56b-4996-92d2-265d5eee304c",  # cis tax advice coventry null
    "7c557935-6442-4d71-8316-32814cb6e526",  # cis southampton null
    "cf54e59a-94bc-40e0-9c4d-8006f1bbb7c2",  # cis returns london null
    "5c0de02e-61c2-4f36-a75d-26104d2d33b7",  # cis returns sunderland null -- id from data
    # /blog/cis-basics/cis-and-mortgages
    "14659b32-4e41-4b32-9f34-0ee53e6286ad",  # cis subcontractor mortgage null
    # /blog/expenses/allowable-expenses-cis-subcontractor
    "472c3fce-87e7-40ef-bae4-bc2619b6a72d",  # cis tax return what can i claim 20
    "51620695-1aa5-4652-b377-c23083aa0bfa",  # cis tax return allowable expenses null
    # /blog/cis-basics/cis-deduction-rates-explained
    "7bac07e4-7ce7-4bee-b211-b3a937861098",  # cis higher rate tax deduction 20
    "7d9c7f3a-9c76-4470-bf37-b944d570bd89",  # cis tax deduction rules 10
    # /blog/cis-basics/cis-invoice-splitting-labour-materials
    "68e873ce-fdd3-42ae-83eb-d6f0154fda31",  # cis subcontractor invoice 10
    "2a325661-a3cb-4182-b30e-d1b57b5c8879",  # cis subcontractor payments 10
    # misc covered
    "a03ec104-fe96-4615-9b78-ec8f2f329b25",  # cis tax return accountants 30
    "07cc82ea-d805-4ed3-9ac2-590a89acd27a",  # construction accountants nottingham null -- /locations/nottingham
]

covered_ids = list(set(COVERED))
print(f"Unique IDs to flip: {len(covered_ids)}")

ids_str = ", ".join(f"'{i}'" for i in covered_ids)
update_sql = f"""
UPDATE blog_topics
SET used = true,
    notes = COALESCE(notes || ' ', '') || 'coverage-reconcile-2026-07-14'
WHERE site_key = 'construction-cis'
  AND used = false
  AND id IN ({ids_str})
RETURNING id, primary_keyword, search_volume
"""
result = q(update_sql)
print(f"Flipped: {len(result)} rows")
for row in sorted(result, key=lambda x: (x["search_volume"] or 0), reverse=True):
    print(f"  {row['primary_keyword']} ({row['search_volume']})")

# Final stats
stats = q("SELECT COUNT(*) total, SUM(CASE WHEN used=true THEN 1 ELSE 0 END) used_count FROM blog_topics WHERE site_key='construction-cis'")
print(f"\nFinal: total={stats[0]['total']} used={stats[0]['used_count']} remaining={int(stats[0]['total'])-int(stats[0]['used_count'])}")
