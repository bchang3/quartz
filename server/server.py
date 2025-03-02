from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import sys

from generator import generate_summary

load_dotenv()


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback_default_key')
app.config["MONGODB_URI"] = os.getenv("MONGODB_URI", 'fallback_default_key')

client = MongoClient(app.config["MONGODB_URI"])
print(app.config["MONGODB_URI"])
db = client.get_database()


port = int(os.getenv('PORT', "7777"))

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
        print("Entering")
        email = data["email"]
        link = data["link"]
        title = data["title"]
        notes = data["notes"]
        print("bleh")
        response = generate_summary(link)
        print("HERE")
        db.issue.insert_one({"email": email, "link": link, "title": title, "notes": notes, "summary": response})
        print(response)
        return jsonify(response), 200
    # except:
    #     return jsonify({"error": "failed response generation"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)