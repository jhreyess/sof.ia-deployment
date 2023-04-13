from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from agent import LexiAgent
import requests

app = Flask(__name__)
agent = LexiAgent(model_path='model.joblib', vectorizer_path="vectorizer.joblib")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()['message']
    response, pred_label, preprocessed, prob = agent.ask(input_data)
    data = {
        'answer': response, 
        'label': pred_label, 
        'preprocessed': preprocessed, 
        'probabilities': prob.tolist()
    }
    return jsonify(data)

@app.route('/feedback', methods=['POST'])
def feedback():
    script_url = "https://script.google.com/macros/s/AKfycbwir8-QGpGYs4pATclVVBxbhZ9jDJsm68l0SP_8epvhAEMj_Y8YIs3-W8yUltipI0v0fg/exec"

    # Feedback data from the request body
    feedback_data = request.get_json()
    input_data = feedback_data['input']
    success = feedback_data['success']
    got = feedback_data['got']
    expected = feedback_data['expected']

    # Create a dictionary with the data to submit to the Google Sheet
    data = {'input': input_data, 'success': success, 'got': got, 'expected': expected}

    # Submit the data to the Google Sheet
    response = requests.post(script_url, json=data)

    if response.ok:
        return response.json()
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run()
