import joblib
import sys

# Load model ONCE
model = joblib.load("intent_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def predict(text):
    text_vector = vectorizer.transform([text])
    prediction = model.predict(text_vector)
    return prediction[0]

# If called from Node.js
if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_input = sys.argv[1]
        result = predict(user_input)
        print(result)
    else:
        print("No input provided")