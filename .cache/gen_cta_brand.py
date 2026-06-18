"""Generate Contractor Tax Accountants brand assets (petrol-cyan #0e7490 + amber accent).

Outputs:
  contractors-ir35/web/public/brand/icon-alt.png      512x512 square app/publisher icon
  contractors-ir35/web/public/brand/primary-logo.png  760x200 horizontal wordmark (transparent)
"""
from __future__ import annotations

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "contractors-ir35" / "web" / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)

PETROL = (14, 116, 144, 255)     # #0e7490
PETROL_DK = (21, 94, 117, 255)   # #155e75
AMBER = (251, 191, 36, 255)      # #fbbf24
INK = (30, 41, 59, 255)          # #1e293b
WHITE = (255, 255, 255, 255)


def font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def make_icon():
    S = 512
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    rounded(d, (0, 0, S, S), radius=110, fill=PETROL)
    # subtle inner panel
    rounded(d, (40, 40, S - 40, S - 40), radius=80, fill=PETROL_DK)
    # monogram CTA
    f = font(190, bold=True)
    text = "CTA"
    bb = d.textbbox((0, 0), text, font=f)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    d.text(((S - w) / 2 - bb[0], (S - h) / 2 - bb[1] - 8), text, font=f, fill=WHITE)
    # amber accent underline
    d.rounded_rectangle((150, 360, 362, 384), radius=12, fill=AMBER)
    img.save(OUT / "icon-alt.png")
    print("wrote", (OUT / "icon-alt.png").relative_to(ROOT))


def make_wordmark():
    W, H = 760, 200
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # left mark
    m = 150
    pad = (H - m) // 2
    rounded(d, (12, pad, 12 + m, pad + m), radius=34, fill=PETROL)
    fm = font(70, bold=True)
    bb = d.textbbox((0, 0), "CTA", font=fm)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    d.text((12 + (m - w) / 2 - bb[0], pad + (m - h) / 2 - bb[1] - 4), "CTA", font=fm, fill=WHITE)
    # wordmark text
    fx = font(48, bold=True)
    fy = font(34, bold=False)
    tx = 12 + m + 28
    d.text((tx, 52), "Contractor Tax", font=fx, fill=PETROL)
    d.text((tx, 108), "Accountants", font=fy, fill=INK)
    img.save(OUT / "primary-logo.png")
    print("wrote", (OUT / "primary-logo.png").relative_to(ROOT))


if __name__ == "__main__":
    make_icon()
    make_wordmark()
    print("done")
