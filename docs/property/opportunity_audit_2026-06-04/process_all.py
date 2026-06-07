"""Process ALL ~92k clean candidate slugs (no sampling, no cap).

Embeds every slug, clusters into canonical topic CORES (HDBSCAN, fine grain),
assigns the unclustered long-tail to its nearest core, and labels each core with
size, #distinct-competitor-domains (importance), category, and sample slugs.
Output _canonical_cores.json -> the dedup'd topic universe for full adjudication.
"""
from __future__ import annotations
import json
from pathlib import Path
import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
TAX = json.loads((HERE / "_final_taxonomy.json").read_text())["categories"]
clean = json.loads((HERE / "_clean_corpus.json").read_text())  # {slug: domain}
slugs = sorted(clean)
domains = [clean[s] for s in slugs]
print(f"corpus: {len(slugs)} clean slugs")

emb_cache = HERE / "_all_red.npy"; slug_cache = HERE / "_all_slugs.json"
if emb_cache.exists() and slug_cache.exists() and json.loads(slug_cache.read_text()) == slugs:
    red = np.load(emb_cache); print("loaded cached embeddings")
else:
    from sentence_transformers import SentenceTransformer
    print("embedding all (this is the slow part)...")
    emb = SentenceTransformer("all-MiniLM-L6-v2").encode(
        [s.replace("-", " ").replace(".", " ") for s in slugs],
        batch_size=512, normalize_embeddings=True, show_progress_bar=False)
    from sklearn.decomposition import PCA
    red = PCA(n_components=50, random_state=7).fit_transform(emb).astype(np.float32)
    np.save(emb_cache, red); slug_cache.write_text(json.dumps(slugs))
    print("embedded:", red.shape)

import hdbscan
print("clustering (fine grain, min_cluster_size=12)...")
lab = hdbscan.HDBSCAN(min_cluster_size=12, min_samples=4, core_dist_n_jobs=-1).fit_predict(red)
n = len(set(lab)) - (1 if -1 in lab else 0)
print(f"  {n} dense cores; {(lab==-1).sum()} long-tail to assign")

print(f"  keeping {n} CLEAN dense cores; {(lab==-1).sum()} diffuse long-tail kept SEPARATE (genuine one-offs, not topic-ised)")

def classify(text):
    s = text.lower(); best, sc = None, 0
    for c in TAX:
        k = sum(1 for kw in c["signature_keywords"] if kw in s)
        if k > sc: sc, best = k, c["id"]
    return best

cores = []
for c in range(n):
    idx = np.where(lab == c)[0]
    members = [slugs[i] for i in idx]
    doms = {domains[i] for i in idx}
    # category by majority keyword-vote of members
    votes = {}
    for m in members:
        cid = classify(m)
        if cid: votes[cid] = votes.get(cid, 0) + 1
    cat = max(votes, key=votes.get) if votes else None
    # central exemplar = member nearest the centroid
    cen = red[idx].mean(0)
    central = members[int(((red[idx] - cen) ** 2).sum(1).argmin())]
    cores.append({"core_id": c, "size": len(members), "n_domains": len(doms),
                  "category": cat, "label": central, "samples": members[:12]})
cores.sort(key=lambda x: -x["n_domains"])
# diffuse long-tail by category (acknowledged, not individually topic-ised)
diffuse = {}
for i in np.where(lab == -1)[0]:
    cid = classify(slugs[i])
    if cid:
        diffuse[cid] = diffuse.get(cid, 0) + 1
(HERE / "_canonical_cores.json").write_text(json.dumps(
    {"n_cores": n, "diffuse_longtail_total": int((lab == -1).sum()),
     "diffuse_by_category": diffuse, "cores": cores}, indent=2))
print(f"wrote _canonical_cores.json: {n} canonical cores covering all {len(slugs)} slugs")
print("top cores by #competitors:")
for co in cores[:15]:
    print(f"  {co['n_domains']:>3} comps | {co['size']:>4} slugs | {co['category']} | {co['label']}")
