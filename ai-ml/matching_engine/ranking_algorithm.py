from __future__ import annotations

from typing import List, Dict, Any

import numpy as np


def rank_items_by_similarity(
    query_vector: np.ndarray,
    candidate_vectors: np.ndarray,
    candidate_payloads: List[Dict[str, Any]],
    top_k: int = 10,
) -> List[Dict[str, Any]]:
    if candidate_vectors.size == 0:
        return []
    q = query_vector / (np.linalg.norm(query_vector) + 1e-12)
    c = candidate_vectors / (np.linalg.norm(candidate_vectors, axis=1, keepdims=True) + 1e-12)
    sims = (c @ q).astype(np.float32)

    indices = np.argsort(-sims)[:top_k]
    results = []
    for idx in indices:
        item = dict(candidate_payloads[idx])
        item["score"] = float(sims[idx])
        results.append(item)
    return results
