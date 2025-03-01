from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import sys

from generator import generate_summary

load_dotenv()


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback_default_key')
port = int(os.getenv('PORT', "3333"))

@app.route('/')
def index():
    return "RAG Pipeline is running!"

@app.route('/process_link', methods=['POST'])
def handle_post_request():
    data = request.get_json()

    if not data:
        print(data)
        return jsonify({"error": "No JSON data provided"}), 400

    # Perform database check
    
    ########################

    response = {}
    try:
        response = generate_summary(data["link"])
        return jsonify(response), 200
    except:
        return jsonify({"error": "failed response generation"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)