from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeRegressor
import os
import tempfile
import time

app = Flask(__name__)
CORS(app, supports_credentials=True)  # TEMP: open CORS for testing

# Firebase setup (done ONCE)
firebase_credentials_json = os.environ.get("FIREBASE_CREDENTIALS_JSON")
if not firebase_credentials_json:
    raise ValueError("Missing FIREBASE_CREDENTIALS_JSON environment variable")

with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.json') as f:
    f.write(firebase_credentials_json)
    firebase_credentials_path = f.name

cred = credentials.Certificate(firebase_credentials_path)
initialize_app(cred)
db = firestore.client()

# Cookie columns expected
cookie_columns = [col.strip() for col in [
    'Adventurefuls', 'CaramelChocolateChip', 'CarameldeLites', 'Samoas',
    'PeanutButterSandwhich', 'Dosidos', 'GirlScoutSmores', 'Lemonades',
    'LemonUps', 'PeanutButterPatties', 'Tagalongs', 'ThinMints',
    'ToastYays', 'ToffeeTastic', 'Trefoils'
]]

# Helper to fetch, clean, and train model for a given troop
def train_model_for_troop(troop_number):
    try:
        orders_ref = db.collection("Troops").document(f"Troop#{troop_number}").collection("Orders")
        docs = list(orders_ref.stream())
        if not docs:
            return None, "No order data found"

        orders_data = {doc.id: doc.to_dict() for doc in docs}
        orders_df = pd.json_normalize(orders_data.values())

        # Ensure all columns exist and clean them
        for col in cookie_columns:
            if col not in orders_df.columns:
                orders_df[col] = 0

            orders_df[col] = (
                orders_df[col]
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

        return model, None
    except Exception as e:
        return None, str(e)

# Cached models per troop (reset every deployment)
cached_models = {}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        input_data = request.get_json()
        troop_number = input_data.get("TroopNumber")
        if not troop_number:
            return jsonify({"error": "TroopNumber is required"}), 400

        # Use cached model if available
        if troop_number not in cached_models:
            model, error = train_model_for_troop(troop_number)
            if error:
                return jsonify({"error": error}), 400
            cached_models[troop_number] = model
        else:
            model = cached_models[troop_number]

        # Predict based on average past orders
        X = model.tree_.value  # model needs input
        avg_input = pd.DataFrame([model.feature_importances_], columns=cookie_columns)
        predicted_total = model.predict(avg_input)[0]

        return jsonify({"predicted_total": int(predicted_total)})

    except Exception as e:
        print(f"[ERROR] Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return "Flask backend is running.", 200