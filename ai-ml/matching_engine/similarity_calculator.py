from __future__ import annotations
import numpy as np
from typing import List, Any


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Return cosine similarity between two 1D numpy arrays.

    Handles zero vectors by returning 0.0.
    """
    if a is None or b is None:
        return 0.0
    a = np.asarray(a, dtype=np.float32)
    b = np.asarray(b, dtype=np.float32)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return float(np.dot(a, b) / (norm_a * norm_b))


def rank_items_by_similarity(query_vector: np.ndarray, candidate_vectors: List[np.ndarray], candidate_payloads: List[Any], top_k: int = 10):
    """Return top_k payloads ranked by cosine similarity to query_vector.

    Returns a list of (payload, score) tuples sorted descending.
    """
    scores = []
    for vec in candidate_vectors:
        scores.append(cosine_similarity(query_vector, vec))

    # Pair payloads with scores
    items = list(zip(candidate_payloads, scores))
    items.sort(key=lambda x: x[1], reverse=True)
    return items[:top_k]
