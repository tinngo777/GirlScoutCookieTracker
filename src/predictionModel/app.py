from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeRegressor
import json
import os
import tempfile

# Load Firebase credentials from environment variable
firebase_credentials_json = os.environ.get("FIREBASE_CREDENTIALS_JSON")
if not firebase_credentials_json:
    raise ValueError("Missing FIREBASE_CREDENTIALS_JSON environment variable")

with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.json') as f:
    f.write(firebase_credentials_json)
    firebase_credentials_path = f.name

# Initialize Firebase
cred = credentials.Certificate(firebase_credentials_path)
initialize_app(cred)
db = firestore.client()

# Initialize Flask app
app = Flask(__name__)

# ✅ Explicit CORS setup
CORS(app, resources={r"/predict": {"origins": "*"}})

# Cookie columns expected
cookie_columns = [col.strip() for col in [
    'Adventurefuls', 'CaramelChocolateChip', 'CarameldeLites', 'Samoas',
    'PeanutButterSandwhich', 'Dosidos', 'GirlScoutSmores', 'Lemonades',
    'LemonUps', 'PeanutButterPatties', 'Tagalongs', 'ThinMints',
    'ToastYays', 'ToffeeTastic', 'Trefoils'
]]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        print(f"Received input: {input_data}")

        troop_number = input_data.get("TroopNumber")
        if not troop_number:
            return jsonify({"error": "TroopNumber is required"}), 400

        # Check if troop document exists
        troop_doc = db.collection("Troops").document(f"Troop#{troop_number}").get()
        if not troop_doc.exists:
            return jsonify({"error": "Invalid TroopNumber"}), 400

        # Check if Orders subcollection has any documents
        orders_ref = db.collection("Troops").document(f"Troop#{troop_number}").collection("Orders")
        orders_docs = list(orders_ref.stream())
        if not orders_docs:
            return jsonify({"error": "No orders found for this troop"}), 400

        # ✅ All checks passed
        return jsonify({"message": "Okay"}), 200

    except Exception as e:
        print(f"Error during troop validation: {e}")
        return jsonify({"error": "Server error"}), 500

@app.route('/', methods=['GET', 'HEAD'])
def home():
    return "Flask backend is running.", 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)