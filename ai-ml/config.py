import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"

# Ensure directories exist at runtime
MODELS_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)


class AppConfig:
    # Flask
    PORT: int = int(os.getenv("PORT", "5001"))
    DEBUG: bool = os.getenv("FLASK_DEBUG", "0") == "1"

    # CORS
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "*")


class NLPConfig:
    # spaCy
    SPACY_MODEL_NAME: str = os.getenv("SPACY_MODEL_NAME", "en_core_web_sm")

    # Sentence-Transformers
    HF_EMBEDDING_MODEL: str = os.getenv(
        "HF_EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2"
    )
    EMBEDDING_DEVICE: str = os.getenv("EMBEDDING_DEVICE", "cpu")

    # Transformers text classification model defaults
    HF_CLASSIFIER_MODEL: str = os.getenv(
        "HF_CLASSIFIER_MODEL", "distilbert-base-uncased"
    )

    # Trained classical ML artifacts
    TFIDF_VECTORIZER_PATH: Path = MODELS_DIR / "tfidf_vectorizer.joblib"
    LOGREG_CLASSIFIER_PATH: Path = MODELS_DIR / "multilabel_logreg.joblib"

    # Trained Transformers artifacts
    TRANSFORMER_OUTPUT_DIR: Path = MODELS_DIR / "transformer_classifier"


class TrainingConfig:
    # Generic training parameters
    RANDOM_STATE: int = 42
    TEST_SIZE: float = 0.2

    # Scikit training
    LOGREG_MAX_ITER: int = int(os.getenv("LOGREG_MAX_ITER", "1000"))

    # Transformers training
    NUM_EPOCHS: int = int(os.getenv("HF_NUM_EPOCHS", "2"))
    TRAIN_BATCH_SIZE: int = int(os.getenv("HF_TRAIN_BATCH_SIZE", "8"))
    EVAL_BATCH_SIZE: int = int(os.getenv("HF_EVAL_BATCH_SIZE", "8"))
    LEARNING_RATE: float = float(os.getenv("HF_LEARNING_RATE", "5e-5"))


class DatasetConfig:
    # Expected CSV files
    SKILLS_DATASET_CSV: Path = DATA_DIR / "skills_dataset.csv"
    # columns: text, labels (labels as comma-separated strings)
