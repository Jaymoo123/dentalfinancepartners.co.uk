"""Data-driven category count: embed competitor slugs, cluster with HDBSCAN.

The number of categories EMERGES from the data's density structure (HDBSCAN, no
preset k). We sweep min_cluster_size to show whether the count is stable (real
structure) or knob-sensitive (fuzzy). Opus only LABELS the resulting clusters
later — it does not decide how many there are. This answers 'why 20 and not 24?'.
"""
from __future__ import annotations
import json, re, sys
from pathlib import Path
import numpy as np

HERE = Path(__file__).resolve().parent
CAP = int(sys.argv[1]) if len(sys.argv) > 1 else 20000

NOISE = re.compile(r"(athens|greece|kallithea|smirni|kentro|diamerisma|alfamesitiki|golden-visa|illinois|chicago|texas|sydney|prahran|new-zealand|chalmers|negative-gearing|\.\d{4,}|\bvol-\d|oitr|ptpr|-q-c\b|ramadan|quran|fraud|jail|scam|sentenced|spared|fitch|lonely-hearts|nightmare|boris|blairs|candy-brothers|rayner|reeves|hunt|receipts-hit|\bvero\b|florida|carrollton)", re.I)
CASE = re.compile(r"(\bv-hmrc|vs-hmrc|-vs-|tribunal|\bftt\b|upper-tribunal|judgment|spotlight-\d)", re.I)

print("loading candidate slugs...")
cands = {}
for cf in (HERE / "_sitemap_cache").glob("*.json"):
    d = json.loads(cf.read_text())
    for t in d["topical"]:
        if t["best_jaccard"] < 0.30 and not NOISE.search(t["slug"]) and not CASE.search(t["slug"]):
            cands.setdefault(t["slug"], d["domain"])
slugs = sorted(cands)
print(f"deduped clean candidate slugs: {len(slugs)}")
import random
random.seed(7)
if len(slugs) > CAP:
    slugs = random.sample(slugs, CAP)
    print(f"sampled {CAP} for the proof run")
texts = [s.replace("-", " ") for s in slugs]

print("embedding (all-MiniLM-L6-v2)...")
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
emb = model.encode(texts, batch_size=256, show_progress_bar=False, normalize_embeddings=True)
print("embedded:", emb.shape)

from sklearn.decomposition import PCA
red = PCA(n_components=50, random_state=7).fit_transform(emb) if emb.shape[1] > 50 else emb

import hdbscan
print(f"\n{'min_cluster_size':>16} {'#clusters':>10} {'%clustered':>11} {'median_size':>12}")
results = {}
for mcs in (40, 70, 120, 200):
    cl = hdbscan.HDBSCAN(min_cluster_size=mcs, min_samples=10, metric="euclidean", core_dist_n_jobs=-1)
    labels = cl.fit_predict(red)
    n = len(set(labels)) - (1 if -1 in labels else 0)
    clustered = (labels != -1).sum()
    sizes = [int((labels == i).sum()) for i in range(n)]
    med = int(np.median(sizes)) if sizes else 0
    print(f"{mcs:>16} {n:>10} {100*clustered/len(labels):>10.0f}% {med:>12}")
    results[mcs] = (labels, n)

# show sample clusters at the mid setting (mcs=70)
labels, n = results[70]
print(f"\n=== sample clusters at min_cluster_size=70 ({n} clusters) ===")
import collections
order = [i for i, _ in collections.Counter(labels[labels != -1]).most_common(18)]
for cid in order:
    members = [slugs[j] for j in range(len(slugs)) if labels[j] == cid]
    print(f"\n--- cluster {cid}  (n={len(members)}) ---")
    for s in members[:6]:
        print("   ", s)
