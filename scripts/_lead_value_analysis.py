# ponytail: point estimates of first-year engagement value (GBP), judged from
# each lead's message; midpoint-of-range precision only, not a pricing model.
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from collections import Counter, defaultdict

# (label, self-selected role, est value GBP, tier, month, channel, intent, work_type)
# channel: form = standard contact/page form; widget = exit-intent/mini-form/
# result-gate/mobile-tool/assistant micro-captures
LEADS = [
    ("Karen Wyatt (12-flat block, £2.25m)", "Large portfolio", 8000, "Very high", "2026-06", "form", "incorporation", "project"),
    ("Steve Mittler (£750k t/o holiday lets)", "Large portfolio", 7000, "Very high", "2026-06", "form", "compliance", "recurring"),
    ("Alistair Huddleston (11 flats + Ltd + LLP)", "Large portfolio", 6000, "Very high", "2026-06", "form", "incorporation", "recurring"),
    ("Anon exit-intent (£1.2m partnership incorp)", "Other", 6000, "Very high", "2026-07", "widget", "incorporation", "project"),
    ("Mark (large portfolio incorp)", "Large portfolio", 5000, "Very high", "2026-05", "form", "incorporation", "project"),
    ("Graham Johns (Ltd, buying 2/yr)", "Individual landlord", 2500, "High", "2026-04", "form", "structure", "recurring"),
    ("Stuart Bloomfield (4 BTLs, incorp)", "Portfolio owner", 2500, "High", "2026-05", "form", "incorporation", "recurring"),
    ("Tom Satterthwaite (4 flats, complex CGT)", "Individual landlord", 2500, "High", "2026-06", "form", "cgt", "project"),
    ("Paul Jury (portfolio incorp)", "Portfolio owner", 2500, "High", "2026-07", "form", "incorporation", "recurring"),
    ("Lucy Gentle (HMO portfolio, Ltd)", "Portfolio owner", 2000, "High", "2026-05", "form", "structure", "recurring"),
    ("panos mita (2-director Ltd, cash buys)", "Other", 2000, "High", "2026-06", "form", "structure", "recurring"),
    ("Herman Belle (new flipping SPV)", "Property developer", 1800, "High", "2026-05", "form", "structure", "recurring"),
    ("Matthew Bottomley (SME dir -> property)", "Other", 1800, "High", "2026-06", "form", "incorporation", "recurring"),
    ("Marcin (Ltd, multi-BTL, loss offset)", "Other", 1500, "High", "2026-05", "form", "cgt", "recurring"),
    ("Emily Crease (BTL Ltd, extraction)", "Individual landlord", 1200, "Medium", "2026-07", "form", "structure", "recurring"),
    ("Ione Schettini (buying in Ltd, wants acct)", "Individual landlord", 1200, "Medium", "2026-06", "form", "structure", "recurring"),
    ("Kayne Sheppard (first Ltd prop, expat)", "Individual landlord", 1000, "Medium", "2026-05", "form", "structure", "recurring"),
    ("David Halford (SA + MTD + CGT)", "Portfolio owner", 1000, "Medium", "2026-07", "form", "compliance", "recurring"),
    ("Carlos Esteves (SDLT, PT company)", "Other", 900, "Medium", "2026-06", "form", "sdlt", "one-off"),
    ("Penny Clemson (60-day CGT, penalties)", "Other", 900, "Medium", "2026-06", "widget", "cgt", "one-off"),
    ("Anne Marie Bennison (£450k sale CGT)", "Other", 800, "Medium", "2026-06", "widget", "cgt", "one-off"),
    ("Farm CGT (surveyor valuation Q)", "Other", 800, "Medium", "2026-06", "widget", "cgt", "one-off"),
    ("Vasiliki Panayiotou (small portfolio plan)", "Individual landlord", 800, "Medium", "2026-05", "form", "structure", "one-off"),
    ("Lingling Hu (99:1 restructure, DoT)", "Individual landlord", 700, "Medium", "2026-07", "form", "structure", "one-off"),
    ("Mark Edwards (Ltd transfer + SDLT refund)", "Individual landlord", 700, "Medium", "2026-06", "form", "sdlt", "one-off"),
    ("Mark McKelvey (bare trust flat purchase)", "Other", 700, "Medium", "2026-06", "form", "sdlt", "one-off"),
    ("Miguel De Sousa (divorce SDLT, urgent)", "Individual landlord", 700, "Medium", "2026-06", "form", "sdlt", "one-off"),
    ("Luca Berardi (NR CGT, Chiswick sale)", "Individual landlord", 700, "Medium", "2026-06", "form", "nrl-expat", "one-off"),
    ("Annie Wolohan (sold London prop, PRR)", "Individual landlord", 600, "Medium", "2026-07", "form", "cgt", "one-off"),
    ("Steve Hodson (transfer prop to business)", "Individual landlord", 600, "Medium", "2026-06", "form", "incorporation", "one-off"),
    ("Fatima Williams (house to Ltd, benefits Q)", "Individual landlord", 600, "Medium", "2026-06", "form", "incorporation", "one-off"),
    ("Guni Izimizy (first BTL + day-trading Q)", "Other", 600, "Medium", "2026-06", "form", "structure", "one-off"),
    ("Cristina Arranz (Form 17 + DoT)", "Individual landlord", 500, "Medium", "2026-06", "form", "structure", "one-off"),
    ("Kamlesh Mistry (LLP setup)", "Individual landlord", 500, "Medium", "2026-06", "form", "structure", "one-off"),
    ("Karol Kalna (rental income compliance)", "Other", 500, "Medium", "2026-07", "widget", "compliance", "recurring"),
    ("Pawel West (VAT on Ltd rental income)", "Other", 500, "Medium", "2026-07", "widget", "vat", "one-off"),
    ("Paula Bright (sell BTL advice)", "Individual landlord", 400, "Medium", "2026-06", "form", "cgt", "one-off"),
    ("Ryan Page (expat disposal rules)", "Individual landlord", 400, "Medium", "2026-06", "form", "nrl-expat", "one-off"),
    ("Raj Sinha (portfolio owner, blank msg)", "Portfolio owner", 400, "Medium", "2026-06", "form", "unknown", "unknown"),
    ("Andrea Randlesome (selling for £230k)", "Other", 400, "Medium", "2026-07", "widget", "cgt", "one-off"),
    ("Bulgarian NRL (single London prop)", "Other", 300, "Medium", "2026-06", "widget", "nrl-expat", "recurring"),
    ("Karin Wanke (MTD threshold Q)", "Individual landlord", 100, "Low", "2026-06", "form", "compliance", "one-off"),
    ("Jane Zhou (vague NRL Q)", "Individual landlord", 100, "Low", "2026-07", "form", "nrl-expat", "unknown"),
    ("Sunny biran (council tax s106)", "Property developer", 100, "Low", "2026-07", "form", "other", "one-off"),
    ("Sarah Shirley (considering selling BTL)", "Other", 100, "Low", "2026-06", "widget", "cgt", "unknown"),
    ("JULIE-ANNE CASEY (paying tax on rental)", "Other", 100, "Low", "2026-06", "widget", "compliance", "unknown"),
    ("Exit: private residence into company", "Other", 100, "Low", "2026-06", "widget", "incorporation", "unknown"),
    ("Exit: reducing tax for property", "Other", 100, "Low", "2026-06", "widget", "structure", "unknown"),
    ("SA109 form request", "Other", 0, "Low", "2026-06", "widget", "other", "none"),
    ("Michael Peace (email bounce report)", "Individual landlord", 0, "Low", "2026-04", "form", "other", "none"),
    ("mm (empty)", "Individual landlord", 0, "Low", "2026-06", "form", "unknown", "none"),
    ("Exit email-only 05-27", "Other", 0, "Low", "2026-05", "widget", "unknown", "none"),
    ("Exit email-only 06-01", "Other", 0, "Low", "2026-06", "widget", "unknown", "none"),
    ("Exit email-only 06-13", "Other", 0, "Low", "2026-06", "widget", "unknown", "none"),
    ("Exit email-only 06-14", "Other", 0, "Low", "2026-06", "widget", "unknown", "none"),
]

def stats(vals):
    v = np.array(vals, float)
    return f"n={len(v):2d}  total=£{v.sum():>7,.0f}  mean=£{v.mean():>6,.0f}  median=£{np.median(v):>6,.0f}"

vals = np.array([l[2] for l in LEADS], float)
print("OVERALL:", stats(vals), f" std=£{vals.std(ddof=1):,.0f}")
top5 = np.sort(vals)[-5:].sum()
print(f"top 5 = £{top5:,.0f} ({top5/vals.sum():.0%} of pipeline); "
      f"top 14 (VH+H) = £{np.sort(vals)[-14:].sum():,.0f} ({np.sort(vals)[-14:].sum()/vals.sum():.0%})")

for dim, idx in [("ROLE", 1), ("CHANNEL", 5), ("INTENT", 6), ("WORK TYPE", 7), ("MONTH", 4)]:
    print(f"\nBy {dim}:")
    for key in sorted(set(l[idx] for l in LEADS)):
        print(f"  {key:22s}", stats([l[2] for l in LEADS if l[idx] == key]))

# tier mix per channel
print("\nTier mix by channel:")
for ch in ("form", "widget"):
    c = Counter(l[3] for l in LEADS if l[5] == ch)
    n = sum(c.values())
    print(f"  {ch:7s} n={n}  " + "  ".join(f"{t}: {c.get(t,0)} ({c.get(t,0)/n:.0%})"
          for t in ("Very high", "High", "Medium", "Low")))

# --- charts ---
colors = {"Very high": "#b30000", "High": "#e6550d", "Medium": "#3182bd", "Low": "#969696"}
fig, axes = plt.subplots(2, 2, figsize=(15, 11))
ax1, ax2, ax3, ax4 = axes.flat

roles = sorted(set(l[1] for l in LEADS))
rng = np.random.default_rng(42)
for i, r in enumerate(roles):
    pts = [l for l in LEADS if l[1] == r]
    x = i + rng.uniform(-0.18, 0.18, len(pts))
    ax1.scatter(x, [max(l[2], 40) for l in pts], c=[colors[l[3]] for l in pts], s=60, zorder=3)
for l in LEADS:
    if l[2] >= 5000:
        ax1.annotate(l[0].split(" (")[0], (roles.index(l[1]), l[2]), fontsize=8,
                     xytext=(8, 0), textcoords="offset points")
ax1.set_yscale("log"); ax1.set_ylim(30, 12000)
ax1.set_yticks([100, 500, 1000, 2500, 5000, 10000])
ax1.set_yticklabels(["£100", "£500", "£1k", "£2.5k", "£5k", "£10k"])
ax1.set_xticks(range(len(roles))); ax1.set_xticklabels([r.replace(" ", "\n") for r in roles])
ax1.set_title("Est. first-year value by self-selected role (log scale)")
ax1.grid(axis="y", alpha=0.3)
ax1.legend(handles=[plt.Line2D([], [], marker="o", ls="", color=c, label=t)
                    for t, c in colors.items()], loc="lower right", fontsize=8)

ax2.hist(vals, bins=[0, 250, 500, 750, 1000, 1500, 2000, 3000, 5000, 8500],
         color="#3182bd", edgecolor="white")
ax2.axvline(np.median(vals), color="k", ls="--", label=f"median £{np.median(vals):,.0f}")
ax2.axvline(vals.mean(), color="#b30000", ls="--", label=f"mean £{vals.mean():,.0f}")
ax2.set_title("Distribution of est. lead value (n=55)")
ax2.set_xlabel("£ first-year value"); ax2.set_ylabel("leads"); ax2.legend()

months = sorted(set(l[4] for l in LEADS))
mn = [sum(1 for l in LEADS if l[4] == m) for m in months]
mv = [sum(l[2] for l in LEADS if l[4] == m) for m in months]
ax3.bar(months, mn, color="#9ecae1", label="leads")
ax3.set_ylabel("leads / month")
ax3b = ax3.twinx()
ax3b.plot(months, mv, "o-", color="#b30000", label="est. value")
ax3b.set_ylabel("est. pipeline £ / month", color="#b30000")
ax3.set_title("Monthly volume + value (Jul = first 9 days only)")
for i, (n_, v_) in enumerate(zip(mn, mv)):
    ax3.annotate(str(n_), (i, n_), ha="center", va="bottom")
    ax3b.annotate(f"£{v_/1000:.0f}k", (i, v_), ha="center", va="bottom", color="#b30000")

intents = sorted(set(l[6] for l in LEADS), key=lambda k: -sum(x[2] for x in LEADS if x[6] == k))
iv = [sum(l[2] for l in LEADS if l[6] == i) for i in intents]
inn = [sum(1 for l in LEADS if l[6] == i) for i in intents]
bars = ax4.barh(intents[::-1], iv[::-1], color="#3182bd")
for b, n_ in zip(bars, inn[::-1]):
    ax4.annotate(f" n={n_}", (b.get_width(), b.get_y() + b.get_height()/2), va="center", fontsize=8)
ax4.set_title("Est. pipeline value by enquiry intent")
ax4.set_xlabel("£ total")

fig.tight_layout()
fig.savefig("docs/property/lead_value_distribution_2026-07.png", dpi=150)
print("\nsaved docs/property/lead_value_distribution_2026-07.png")
