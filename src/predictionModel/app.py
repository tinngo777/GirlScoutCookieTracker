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

# Load Firebase credentials from environment variable (Render secret)
firebase_credentials_json = os.environ.get("FIREBASE_CREDENTIALS_JSON")
if not firebase_credentials_json:
    raise ValueError("Missing FIREBASE_CREDENTIALS_JSON environment variable")

# Write credentials to a temporary file
with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.json') as f:
    f.write(firebase_credentials_json)
    firebase_credentials_path = f.name

# Initialize Firebase
cred = credentials.Certificate(firebase_credentials_path)
initialize_app(cred)
db = firestore.client()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Cookie columns to expect
cookie_columns = [col.strip() for col in [
    'Adventurefuls', 'CaramelChocolateChip', 'CarameldeLites', 'Samoas',
    'PeanutButterSandwhich', 'Dosidos', 'GirlScoutSmores', 'Lemonades',
    'LemonUps', 'PeanutButterPatties', 'Tagalongs', 'ThinMints',
    'ToastYays', 'ToffeeTastic', 'Trefoils'
]]

# Model training per troop
def train_model(troop_number):
    orders_ref = db.collection("Troops").document(f"Troop#{troop_number}").collection("Orders")
    docs = orders_ref.stream()

    orders_data = {doc.id: doc.to_dict() for doc in docs}
    if not orders_data:
        raise ValueError(f"No order data found for Troop#{troop_number}.")

    orders_df = pd.json_normalize(orders_data.values())

    for col in cookie_columns:
        orders_df[col] = (
            orders_df.get(col, 0)
            .fillna("0")
            .astype(str)
            .str.replace(r"[^\d]", "", regex=True)
            .replace("", "0")
            .astype(int)
        )

    orders_df["TotalBoxes"] = orders_df[cookie_columns].sum(axis=1)
    X = orders_df[cookie_columns]
    y = orders_df["TotalBoxes"]

    model = DecisionTreeRegressor(random_state=10, max_depth=11)
    model.fit(X, y)
    return model

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        print(f"Received input: {input_data}")  # 🔍 Debug log

        troop_number = input_data.get("TroopNumber")
        if not troop_number:
            return jsonify({"error": "TroopNumber is required"}), 400

        orders_ref = db.collection("Troops").document(f"Troop#{troop_number}").collection("Orders")
        docs = list(orders_ref.stream())
        if not docs:
            return jsonify({"error": f"No order data found for Troop#{troop_number}"}), 400

        return jsonify({"message": "Everything looks fine."}), 200

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 400

@app.route('/', methods=['GET', 'HEAD'])
def home():
    return "Flask backend is running.", 200

# Run the app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's port if available
    app.run(host="0.0.0.0", port=port)