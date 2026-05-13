from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/review", methods=["POST"])
def review():
    try:
        data = request.get_json()
        code = data.get("code", "")
        prompt = "Review this code and find bugs and improvements: " + code
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite",
            contents=prompt
        )
        return jsonify({"result": response.text})
    except Exception as e:
        return jsonify({"result": "Error: " + str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)