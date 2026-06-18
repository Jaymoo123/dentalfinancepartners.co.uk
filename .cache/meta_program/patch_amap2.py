import io

path = r"generalist\web\content\blog\can-i-claim-mileage-limited-company-director.md"
src = io.open(path, encoding="utf-8").read()
pairs = [
    ("The AMAP rate for electric cars is the same 45p per mile as for petrol or diesel cars.",
     "The AMAP rate for electric cars is the same 55p per mile as for petrol or diesel cars.", 1),
    ("the actual running cost per mile for an electric car is much lower than 45p. You pocket the difference tax-free.",
     "the actual running cost per mile for an electric car is much lower than 55p. You pocket the difference tax-free.", 1),
    ("claim mileage from the company, the 45p per mile covers the cost of electricity.",
     "claim mileage from the company, the 55p per mile covers the cost of electricity.", 1),
    ("The 45p per mile rate is VAT inclusive for the fuel element.",
     "The 55p per mile rate is VAT inclusive for the fuel element.", 1),
    ("HMRC reviews the AMAP rates annually. The 45p rate has been stable for several years, but it can change.",
     "HMRC reviews the AMAP rates annually. The rate rose from 45p to 55p on 6 April 2026, the first change since 2011, so check each April.", 1),
]
for old, new, expected in pairs:
    n = src.count(old)
    assert n == expected, f"'{old[:60]}...' found {n}x"
    src = src.replace(old, new)
io.open(path, "w", encoding="utf-8", newline="").write(src)
count = src.count("45p")
print(f"done; '45p' remaining={count}")
for i, line in enumerate(src.splitlines(), 1):
    if "45p" in line:
        idx = line.find("45p")
        print(f"  L{i}: ...{line[max(0, idx-60):idx+60]}...")
