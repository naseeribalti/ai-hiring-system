import sys
from pathlib import Path
import joblib

try:
    from config import NLPConfig, MODELS_DIR
except Exception:
    # allow running from scripts/ when ai-ml is not a package
    import os
    ai_ml_dir = Path(__file__).resolve().parents[1]
    sys.path.insert(0, str(ai_ml_dir))
    from config import NLPConfig, MODELS_DIR


def load_models():
    vec_path = NLPConfig.TFIDF_VECTORIZER_PATH
    clf_path = NLPConfig.LOGREG_CLASSIFIER_PATH
    mlb_path = MODELS_DIR / 'mlb.joblib'

    print('Loading vectorizer from', vec_path)
    vectorizer = joblib.load(vec_path)
    print('Loading classifier from', clf_path)
    clf = joblib.load(clf_path)
    print('Loading mlb from', mlb_path)
    mlb = joblib.load(mlb_path)
    return vectorizer, clf, mlb


def predict_texts(texts):
    vectorizer, clf, mlb = load_models()
    X_vec = vectorizer.transform(texts)
    y_pred = clf.predict(X_vec)
    labels = mlb.inverse_transform(y_pred)
    for i, t in enumerate(texts):
        print('---')
        print('Text:', t)
        print('Predicted labels:', labels[i])


def main():
    samples = [
        'Experienced backend engineer with Java and SQL',
        'Senior frontend developer skilled in React and TypeScript',
        'Machine learning engineer familiar with PyTorch and NLP'
    ]
    # Allow passing quick custom sample via CLI
    if len(sys.argv) > 1:
        samples = sys.argv[1:]
    predict_texts(samples)


if __name__ == '__main__':
    main()
