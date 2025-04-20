from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the JSON data from the request
        data = request.get_json()

        # Example of handling the TroopNumber
        troop_number = data.get('TroopNumber')

        if not troop_number:
            return jsonify({"error": "TroopNumber is required"}), 400

        # Simulate prediction (replace this with actual logic)
        predicted_total = 100  # Example of a predicted value

        return jsonify({"predicted_total": predicted_total}), 200

    except Exception as e:
        # Log the error and return a generic 500 error message
        print(f"Error processing prediction: {e}")
        return jsonify({"error": "An error occurred while processing the prediction"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)