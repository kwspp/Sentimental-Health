from flask import Flask, request, jsonify
import spacy
from spacytextblob.spacytextblob import SpacyTextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load spaCy model and add the spaCyTextBlob component to the pipeline
nlp = spacy.load('en_core_web_sm')
nlp.add_pipe('spacytextblob')

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text', '')

    # Process the text
    doc = nlp(text)
    sentiment = doc._.blob.polarity  # Polarity score

    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)
