from model_training import train_tfidf_multilabel_classifier
import sys
import os
import traceback

# Ensure ai-ml package dir is on sys.path
ai_ml_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, ai_ml_dir)


def main():
    csv_path = os.path.join(ai_ml_dir, 'data', 'skills_dataset.csv')
    print('Using CSV:', csv_path)
    try:
        res = train_tfidf_multilabel_classifier(csv_path=csv_path)
        print('TRAINING_RESULT:', res)
    except Exception as e:
        print('Training failed:', type(e).__name__, str(e))
        traceback.print_exc()


if __name__ == '__main__':
    main()
