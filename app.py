from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from agent import LexiAgent
import requests

app = Flask(__name__)
agent = LexiAgent(model_path='model.joblib', vectorizer_path="vectorizer.joblib")
script_url = "https://script.google.com/macros/s/AKfycbwir8-QGpGYs4pATclVVBxbhZ9jDJsm68l0SP_8epvhAEMj_Y8YIs3-W8yUltipI0v0fg/exec"

def is_greeting(input_data):
    greetings = ["hola", "hola!", "hello", "hi", "buenos", "tál", "estás"]
    words = input_data.lower().split()
    return any(word in greetings for word in words)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()['message']

    if input_data.lower() in ["si", "no", "ok"]:
        return jsonify({"answer": "De acuerdo!"})

    if is_greeting(input_data):
        return jsonify({"answer": "Hola! ¿Cómo puedo ayudarte?"})

    response, pred_label, preprocessed, prob = agent.ask(input_data)

    data = {
        'answer': response, 
        'label': pred_label, 
        'preprocessed': preprocessed, 
        'probabilities': prob.tolist()
    }

    log_data = {'input': input_data, 'success': '', 'got': pred_label, 'expected': ''}
    requests.post(script_url, json=log_data)

    return jsonify(data)

@app.route('/feedback', methods=['POST'])
def feedback():
    # Feedback data from the request body
    feedback_data = request.get_json()
    data = {
        'input': feedback_data['input'],
        'success': feedback_data['success'],
        'got': feedback_data['got'],
        'expected': feedback_data['expected']
    }

    response = requests.post(script_url, json=data)

    if response.ok:
        return response.json()
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(port=5000)
