from pathlib import Path
import os


BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"
RESUME_PARSER_DIR = BASE_DIR / "resume_parser"

# Ensure models directory exists
MODELS_DIR.mkdir(parents=True, exist_ok=True)


class NLPConfig:
    # spaCy model name
    SPACY_MODEL_NAME = os.getenv("SPACY_MODEL_NAME", "en_core_web_sm")

    # Sentence-BERT / huggingface model for embeddings
    HF_EMBEDDING_MODEL = os.getenv(
        "HF_EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

    # Artifact paths
    TFIDF_VECTORIZER_PATH = MODELS_DIR / "tfidf_vectorizer.joblib"
    LOGREG_CLASSIFIER_PATH = MODELS_DIR / "multilabel_logreg.joblib"

    # Transformer training output dir (optional heavy path)
    TRANSFORMER_OUTPUT_DIR = MODELS_DIR / "transformer_classifier"

    # Embedding device: 'cpu' or 'cuda'
    EMBEDDING_DEVICE = os.getenv("EMBEDDING_DEVICE", "cpu")

    # Limits for downloader (used by resume_parser)
    MAX_DOWNLOAD_BYTES = int(
        os.getenv("MAX_DOWNLOAD_BYTES", str(10 * 1024 * 1024)))
    DOWNLOAD_TIMEOUT_SECONDS = int(os.getenv("DOWNLOAD_TIMEOUT_SECONDS", "20"))

    # Optional hostname allowlist for SSRF protection (comma separated)
    ALLOWED_DOWNLOAD_HOSTS = os.getenv("ALLOWED_DOWNLOAD_HOSTS")
