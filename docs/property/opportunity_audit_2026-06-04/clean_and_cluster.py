"""Full-corpus clean -> embed -> fine-grain HDBSCAN. Derives the data-driven
category structure (count emerges from density; we publish the granularity curve).
Opus labels the resulting clusters afterwards (it does NOT pick the count).

Writes:
  _clean_corpus.json   all kept UK-property-relevant candidate slugs {slug: domain}
  _cluster_samples.json per-cluster sample slugs (input to Opus labelling)
  _cluster_sweep.txt    granularity curve (count vs min_cluster_size)
"""
from __future__ import annotations
import json, re, random
from pathlib import Path
import numpy as np

HERE = Path(__file__).resolve().parent
random.seed(7)

FOREIGN = re.compile(r"(dubai|ajman|abu-dhabi|\buae\b|qatar|riyadh|saudi|\bindia\b|mumbai|delhi|bangalore|pradesh|pakistan|\bspain\b|spanish|\bfrance\b|french|portugal|netherlands|germany|bavaria|warsaw|poland|\bireland\b|\bmalta\b|cyprus|\busa\b|united-states|\b1031\b|\birs\b|texas|florida|california|virginia|kentucky|\biowa\b|wisconsin|illinois|maryland|arundel|riverside|new-castle|santa-ana|san-diego|san-francisco|los-angeles|new-york|miami|chicago|boston|seattle|atlanta|denver|phoenix|dallas|houston|ohio|carolina|tennessee|michigan|oregon|nevada|arizona|colorado|minnesota|indiana|missouri|alabama|\bkansas\b|\butah\b|idaho|montana|wyoming|nebraska|oklahoma|arkansas|mississippi|louisiana|qld|nsw|\bwa\b|\bvic\b|new-zealand|\bnz\b|australia|australian|canada|ontario|toronto|singapore|hong-kong)", re.I)
LISTING = re.compile(r"(for-sale|for-rent|to-rent|-bedroom|bedroom-|apartment-for|flat-for|house-for|villa|\bm2\b|sq-ft|sqft|properties-in|property-agent-in|estate-agent|letting-agent|property-management-ltd|estate-ltd|\.html$|^\d{3,}-|-\d{5,}$|\.\d{4,}(-|$))", re.I)
ACADEMIC = re.compile(r"(\bacca\b|\bcima\b|\baat-|fa20\d\d|-chapter-\d|frs-?10\d|\bias-\d|igcse|gcse|exam|past-paper|revision|syllabus|textbook|resume|\bcv-|job-vacancy|recruitment|career-|-minutes-|special-resolution|ess-version)", re.I)
NOISE = re.compile(r"(athens|greece|kallithea|golden-visa|chalmers|negative-gearing|\bvol-\d|oitr|ptpr|ramadan|quran|fraud|jail|scam|sentenced|fitch|lonely-hearts|nightmare|share-price|shares-are-down|crypto|bitcoin|car-boot|directory|dictionary)", re.I)
CASE = re.compile(r"(\bv-hmrc|vs-hmrc|-vs-|tribunal|\bftt\b|upper-tribunal|judgment|spotlight-\d)", re.I)

def drop(s):
    return bool(FOREIGN.search(s) or LISTING.search(s) or ACADEMIC.search(s) or NOISE.search(s) or CASE.search(s) or not (8 < len(s) < 95))

def main():
    cands = {}
    for cf in (HERE / "_sitemap_cache").glob("*.json"):
        d = json.loads(cf.read_text())
        for t in d["topical"]:
            if t["best_jaccard"] < 0.30:
                cands.setdefault(t["slug"], d["domain"])
    kept = {s: dom for s, dom in cands.items() if not drop(s)}
    (HERE / "_clean_corpus.json").write_text(json.dumps(kept, indent=2))
    print(f"raw {len(cands)} -> clean kept {len(kept)}")

    slugs = sorted(kept)
    sample = random.sample(slugs, min(30000, len(slugs)))
    cache_npy = HERE / "_red.npy"; cache_s = HERE / "_red_slugs.json"
    if cache_npy.exists() and cache_s.exists() and json.loads(cache_s.read_text()) == sample:
        red = np.load(cache_npy); print("loaded cached embeddings")
    else:
        texts = [s.replace("-", " ").replace(".", " ") for s in sample]
        print(f"embedding {len(sample)} (all-MiniLM-L6-v2)...")
        from sentence_transformers import SentenceTransformer
        emb = SentenceTransformer("all-MiniLM-L6-v2").encode(texts, batch_size=256, normalize_embeddings=True, show_progress_bar=False)
        from sklearn.decomposition import PCA
        red = PCA(n_components=50, random_state=7).fit_transform(emb)
        np.save(cache_npy, red); cache_s.write_text(json.dumps(sample))

    import hdbscan
    sweep = []
    chosen = None
    lines = [f"{'min_cluster_size':>16} {'#clusters':>10} {'%clustered':>11}"]
    for mcs in (25, 35, 50, 70, 100):
        cl = hdbscan.HDBSCAN(min_cluster_size=mcs, min_samples=8, core_dist_n_jobs=-1)
        lab = cl.fit_predict(red)
        n = len(set(lab)) - (1 if -1 in lab else 0)
        pct = 100 * (lab != -1).sum() / len(lab)
        lines.append(f"{mcs:>16} {n:>10} {pct:>10.0f}%")
        sweep.append((mcs, n, pct, lab))
    (HERE / "_cluster_sweep.txt").write_text("\n".join(lines))
    print("\n".join(lines))

    # finer grain target ~23 categories (user chose finer, ~20-25)
    mcs, n, _pct, lab = min(sweep, key=lambda x: abs(x[1] - 23))
    print(f"\nCHOSEN (finer grain, ~23 target): min_cluster_size={mcs} -> {n} clusters")

    samples = {}
    for cid in range(n):
        members = [sample[j] for j in range(len(sample)) if lab[j] == cid]
        samples[str(cid)] = {"size": len(members), "slugs": members[:22]}
    (HERE / "_cluster_samples.json").write_text(json.dumps(
        {"min_cluster_size": mcs, "n_clusters": n, "noise": int((lab == -1).sum()), "clusters": samples}, indent=2))
    print(f"wrote _cluster_samples.json ({n} clusters)")

if __name__ == "__main__":
    main()
