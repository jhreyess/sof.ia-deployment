# SOF.IA (Preview version)

## Table of contents
- [Description](#description)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Description
This project is an academic chatbot that aims to provide up-to-date and precise information to students about various university-related procedures, enrollments, and other relevant topics. The chatbot is built using natural language processing techniques and deployed using Flask, making it accessible through a user-friendly web interface.

## Getting started

### Installation
1. Clone this repository to your local machine.
2. Create a virtual environment (Python 3)
```bash
> python -m venv /path/to/directory
```

3. Activate virtualenv
```bash
# Windows
> .\myenv\Scripts\activate

# Unix / Linux
> source ./myvenv/bin/activate
```

4. Install the project dependencies:
```bash
> pip install -r requirements.txt
``` 

### Project structure
```
project
│   README.md
│
└───Chatbot (venv)
│   │   requirements.txt
│   │   
│   └───source
│       │   agent.py
│       │   app.py
│       │   faq_data.py
│       │   model.joblib
│       │   vectorizer.joblib
│       │   
│       └───static
|       |   
│       └───templates
```
### Usage
Run the application on localhost, port 5000:
```bash
> python app.py
```

## API Endpoints
| Method   | URL             | Description               |
| -------- | --------------- | ------------------------- |
| `POST`   | `/prediction`   | Makes a model prediction. |
| `POST`   | `/feedback`     | Submits feedback to google datasheet.                  |

### Prediction Endpoint

- **Route:** `/predict`
- **Method:** POST
- **Request Body:**
  + `message`: The question provided by the user.
- **Response:**
  + `answer`: The answer to the question provided by the model.
  + `label`: The label/intent of the question predicted by the classifier.
  + `preprocessed`: Tokens used to make the intent detection.
  + `probabilities`: An array of probabilities for each label.

### Feedback Endpoint

- **Route:** `/feedback`
- **Method:** POST
- **Request Body:**
  + `input`: The question provided by the user.
  + `success`: Boolean value indicating whether the answer was successful or not.
  + `got`: The label predicted by the model.
  + `expected`: The label expected by the user.
- **Response:**
  + `success`: Boolean status value indicating the successful submission of feedback.
