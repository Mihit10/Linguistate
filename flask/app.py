from flask import Flask, request, jsonify
from flask_cors import CORS
from text_translator import refine_and_translate
from summary import summarize_conversation_broker
from summary import summarize_conversation_client

app = Flask(__name__)
CORS(app)

@app.route('/refine', methods=['POST'])
def refine():
    try:
        # print("Received request:", request.data)
        data = request.json  # Get JSON data from request
        text = data.get("text")
        brokerLanguage = data.get("brokerLanguage")
        clientLanguage = data.get("clientLanguage")

        if not all([text, brokerLanguage, clientLanguage]):
            return jsonify({"error": "All three strings are required"}), 400

        translatedText = refine_and_translate(text, brokerLanguage, clientLanguage)
        return jsonify({"translated_text": translatedText})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/summarize-client', methods=['POST'])
def summarize_client():
    try:
        # print("Received request:", request.data)
        data = request.json  # Get JSON data from request
        conversations = data.get("text")
        brokerLanguage = data.get("brokerLanguage")
        clientLanguage = data.get("clientLanguage")

        if not all([conversations, brokerLanguage, clientLanguage]):
            return jsonify({"error": "All three strings are required"}), 400

        summary_client = summarize_conversation_client(conversations, brokerLanguage, clientLanguage)
        return jsonify({"summary": summary_client})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/summarize-broker', methods=['POST'])
def summarize_broker():
    try:
        # print("Received request:", request.data)
        data = request.json  # Get JSON data from request
        conversations = data.get("text")
        brokerLanguage = data.get("brokerLanguage")
        clientLanguage = data.get("clientLanguage")

        if not all([conversations, brokerLanguage, clientLanguage]):
            return jsonify({"error": "All three strings are required"}), 400

        summary_broker = summarize_conversation_broker(conversations, brokerLanguage, clientLanguage)
        return jsonify({"summary": summary_broker})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)