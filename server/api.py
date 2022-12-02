from flask import Flask
from model import get_recommendations_text, get_recommendations_title, get_lists
from flask import request
# from os import path
# import datetime
# from Website.init import createApp
# from flask_jwt_extended import JWTManager


app = Flask(__name__, static_folder="../build",static_url_path="/")

@app.route('/stuff', methods=['GET', 'POST'])
def index():
    return "app.send_static_file('index.html')"

@app.route('/input_text', methods=['GET', 'POST'])
def input_rec():
    print(request.get_json()['user_input'])
    return get_recommendations_text(request.get_json()['user_input'])


