# Import the necessary modules
from flask import Flask , render_template , request , jsonify

# Importing sentiment_analysis file as sa
from sentiment_analysis import *

app = Flask(__name__)

# App route for index page
@app.route('/')
def home():
    return render_template('index.html')

# Write a route for post request
@app.route('/predict_emotion', methods = ['POST'])
def review():

    # Extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get('text')

    # Check if the customer_review is empty, return error
    if not review:
        return jsonify({'status' : 'error' , 'message' : 'Empty response'})

    # If review is not empty, pass it through the 'predict' function.
    # Predict function returns 2 things : sentiment and path of image in static folder
    # Example : Positive , ./static/assets/emoticons/positive.png

    else:
        predicted_emotion , predicted_emotion_img_url = predict(review)
        return jsonify({'status': 'success' , 'data': { 'predicted_emotion': predicted_emotion, "predicted_emotion_img_url": predicted_emotion_img_url }})

if __name__  ==  "__main__":
    app.run(debug = True)