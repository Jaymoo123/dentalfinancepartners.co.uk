import io

def patch(path, pairs):
    src = io.open(path, encoding="utf-8").read()
    for old, new, expected in pairs:
        n = src.count(old)
        assert n == expected, f"{path}\n  '{old[:70]}...' found {n}x, expected {expected}"
        src = src.replace(old, new)
    io.open(path, "w", encoding="utf-8", newline="").write(src)
    print(f"patched {path}: {len(pairs)} replacement rules")

DIRECTOR = r"generalist\web\content\blog\can-i-claim-mileage-limited-company-director.md"
patch(DIRECTOR, [
    ("What mileage rate can I claim as a director in 2025/26?",
     "What mileage rate can I claim as a director in 2026/27?", 2),
    ("45p per mile for the first 10,000 business miles in a tax year, then 25p per mile thereafter. This applies to cars and vans.",
     "55p per mile for the first 10,000 business miles in a tax year (the rate from 6 April 2026), then 25p per mile thereafter. This applies to cars and vans.", 2),
    ("using a personal car and claiming 45p per mile is simpler and more tax efficient",
     "using a personal car and claiming 55p per mile is simpler and more tax efficient", 2),
    ("Yes, directors can claim 45p a mile for the first 10,000 business miles, then 25p, tax-free, with the company deducting it against corporation tax.",
     "Yes, directors can claim 55p a mile for the first 10,000 business miles from 6 April 2026, then 25p, tax-free and deductible against corporation tax.", 2),
    ("HMRC Approved Mileage Rates for 2025/26",
     "HMRC Approved Mileage Rates for 2026/27", 1),
    ("The rates for 2025/26 are:", "The rates for 2026/27 are:", 1),
    ("<li><strong>Cars and vans:</strong> 45p per mile for the first 10,000 business miles in a tax year, then 25p per mile thereafter</li>",
     "<li><strong>Cars and vans:</strong> 55p per mile for the first 10,000 business miles in a tax year (up from 45p on 6 April 2026), then 25p per mile thereafter</li>", 1),
    ("The 45p rate applies per vehicle, not per director.",
     "The 55p rate applies per vehicle, not per director.", 1),
    ("for most directors the 45p rate covers all their business miles",
     "for most directors the 55p rate covers all their business miles", 1),
    ("drives 8,000 business miles in 2025/26 in their personal car. The company pays them 45p per mile, which is £3,600. The company saves 19% corporation tax on that £3,600, a saving of £684. The director receives £3,600 tax-free. If the director had instead paid for fuel from their net salary, they would need to earn roughly £5,500 gross to have £3,600 after tax and NI.",
     "drives 8,000 business miles in 2026/27 in their personal car. The company pays them 55p per mile, which is £4,400. The company saves 19% corporation tax on that £4,400, a saving of £836. The director receives £4,400 tax-free. If the director had instead paid for fuel from their net salary, they would need to earn roughly £6,700 gross to have £4,400 after tax and NI.", 1),
    ("<strong>If the company pays less than 45p per mile:</strong>",
     "<strong>If the company pays less than 55p per mile:</strong>", 1),
    ("if your company pays you 25p per mile, you can claim the remaining 20p per mile",
     "if your company pays you 25p per mile, you can claim the remaining 30p per mile", 1),
    ("<strong>If the company pays more than 45p per mile:</strong> The excess over 45p is taxable as earnings and subject to PAYE and National Insurance. So if the company pays you 60p per mile, the first 45p is tax-free, and the remaining 15p is treated as additional salary.",
     "<strong>If the company pays more than 55p per mile:</strong> The excess over 55p is taxable as earnings and subject to PAYE and National Insurance. So if the company pays you 60p per mile, the first 55p is tax-free, and the remaining 5p is treated as additional salary.", 1),
    ("The company pays you 45p per mile for business use. You cover all the running costs (fuel, insurance, servicing, repairs, tax, MOT) from that 45p.",
     "The company pays you 55p per mile for business use. You cover all the running costs (fuel, insurance, servicing, repairs, tax, MOT) from that 55p.", 1),
    ("using a personal car and claiming 45p per mile is the better option",
     "using a personal car and claiming 55p per mile is the better option", 1),
    ("you can still claim 45p per mile from your company",
     "you can still claim 55p per mile from your company", 1),
])

DELIVERY = r"generalist\web\content\blog\accountant-for-delivery-drivers-uk.md"
patch(DELIVERY, [
    ("You can claim 45p per mile for the first 10,000 business miles, then 25p per mile.",
     "You can claim 55p per mile for the first 10,000 business miles (the rate from 6 April 2026), then 25p per mile.", 2),
    ("AMAP) rates are 45p per mile for the first 10,000 business miles in a tax year, and 25p per mile thereafter.",
     "AMAP) rates are 55p per mile for the first 10,000 business miles in a tax year (up from 45p on 6 April 2026), and 25p per mile thereafter.", 1),
    ("the company can pay you a mileage allowance of up to 45p per mile tax-free",
     "the company can pay you a mileage allowance of up to 55p per mile tax-free", 1),
])

# verify no stray 45p-as-current remains (45p may legitimately remain only in
# historical "up from 45p" phrasing)
for path in (DIRECTOR, DELIVERY):
    src = io.open(path, encoding="utf-8").read()
    leftovers = [seg for seg in src.split("45p") if False]
    count = src.count("45p")
    hist = src.count("up from 45p") + src.count("45p in 2025/26")
    print(f"{path}: '45p' remaining={count} (historical phrasings={hist})")
