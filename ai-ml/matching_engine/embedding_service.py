from __future__ import annotations

from typing import List

import threading

import numpy as np
from sentence_transformers import SentenceTransformer

from config import NLPConfig


_embedder_lock = threading.Lock()
_embedder_instance: SentenceTransformer | None = None


def _get_embedder() -> SentenceTransformer:
    global _embedder_instance
    if _embedder_instance is not None:
        return _embedder_instance
    with _embedder_lock:
        if _embedder_instance is None:
            _embedder_instance = SentenceTransformer(
                NLPConfig.HF_EMBEDDING_MODEL, device=NLPConfig.EMBEDDING_DEVICE
            )
    return _embedder_instance


def get_text_embedding(text: str) -> np.ndarray:
    if not text:
        return np.zeros((384,), dtype=np.float32)  # default dim for MiniLM-L6
    model = _get_embedder()
    emb = model.encode(text, normalize_embeddings=True)
    return np.asarray(emb, dtype=np.float32)


def get_embeddings(texts: List[str]) -> np.ndarray:
    if not texts:
        return np.zeros((0, 384), dtype=np.float32)
    model = _get_embedder()
    embs = model.encode(texts, normalize_embeddings=True)
    return np.asarray(embs, dtype=np.float32)
