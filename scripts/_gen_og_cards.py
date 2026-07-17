"""Generate 1200x630 og:image brand cards for sites lacking a raster og image.

ponytail: simple typographic card (brand colour band, name, tagline, domain).
Rerun anytime; deterministic output.
"""
from PIL import Image, ImageDraw, ImageFont

SITES = [
    dict(out=r"Solicitors\web\public\brand\og-card.png", primary="#c41e3a",
         name="Accounts for Lawyers", tagline="Specialist accounting for UK solicitors and law firms",
         domain="accountsforlawyers.co.uk"),
    dict(out=r"Medical\web\public\brand\og-card.png", primary="#0891b2",
         name="Medical Accountants UK", tagline="Specialist accountants for UK medical professionals",
         domain="medicalaccounts.co.uk"),
]

FONT = r"C:\Windows\Fonts\georgia.ttf"
FONTB = r"C:\Windows\Fonts\georgiab.ttf"
FONTS = r"C:\Windows\Fonts\segoeui.ttf"


def make(s):
    img = Image.new("RGB", (1200, 630), "#0f172a")
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 1200, 14], fill=s["primary"])
    d.rectangle([80, 200, 96, 216], fill=s["primary"])
    name_f = ImageFont.truetype(FONTB, 72)
    tag_f = ImageFont.truetype(FONTS, 34)
    dom_f = ImageFont.truetype(FONTS, 28)
    d.text((80, 250), s["name"], font=name_f, fill="#f8fafc")
    d.text((80, 360), s["tagline"], font=tag_f, fill="#cbd5e1")
    d.text((80, 545), s["domain"], font=dom_f, fill=s["primary"])
    import os
    os.makedirs(os.path.dirname(s["out"]), exist_ok=True)
    img.save(s["out"], "PNG")
    print("wrote", s["out"], img.size)


for s in SITES:
    make(s)
