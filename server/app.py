from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model ONCE
model = joblib.load("intent_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    user_input = data["message"]

    text_vector = vectorizer.transform([user_input])
    prediction = model.predict(text_vector)

    return jsonify({"intent": prediction[0]})

if __name__ == "__main__":
    app.run(port=5000)