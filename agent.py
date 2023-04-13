import nltk
import fuzzywuzzy as fuzz
nltk.download('punkt')
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
# from faq_data import faq_dict
import joblib

class LexiAgent:
    def __init__(self, model_path, vectorizer_path):

        self.stop_words = set(stopwords.words('spanish'))
        self.stemmer = SnowballStemmer('spanish')
        # self.db = faq_dict
        
        # Load the vectorizer & Load the decision from file
        if model_path is not None:
            self.model = joblib.load(model_path)
        else:
            self.model = None

        if vectorizer_path is not None:
            self.vectorizer = joblib.load(vectorizer_path)
        else:
            self.vectorizer = None

    def ask(self, perception):
        features = self.extract_features(perception)
        label = self.model.predict(features[1])[0]
        predicted_prob = self.model.predict_proba(features[1])[0]
        # answer = self.answer_question(perception, label)
        return "", label, features[0], predicted_prob
    
    def clean_question_text(self, question):
        # Remove question marks and other punctuation marks
        question = question.replace("¿", "").replace("?", "")
        # Split the question into words
        words = question.lower().split()
        # Remove stop words and stem the words
        words = [self.stemmer.stem(w) for w in words if w not in self.stop_words]
        # Join the words back into a string and return it
        return " ".join(words)

    def extract_features_tokenizer(self, message):
        features = {}
        for word in nltk.word_tokenize(message.lower()):
            if word not in self.stop_words:
                features[word] = True
        return features

    def extract_features(self, perception):
        # Preprocess the question
        preprocessed_input = self.clean_question_text(perception)
        # Transform the preprocessed question using the vectorizer
        vectorized_input = self.vectorizer.transform([preprocessed_input])
        return preprocessed_input, vectorized_input
    
    # def answer_question(self, perception, label):
    #     category = self.db.get(label)
    #     highest_ratio = 0
    #     matching_question = None
    #     for question in category.keys():
    #         ratio = fuzz.token_set_ratio(perception.lower(), question.lower())
    #         if ratio > highest_ratio:
    #             highest_ratio = ratio
    #             matching_question = question
    #     return category[matching_question]
