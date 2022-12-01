from flask import Flask
# from os import path
# import datetime
# from Website.init import createApp
# from flask_jwt_extended import JWTManager


app = Flask(__name__, static_folder="../build",static_url_path="/")

@app.route('/stuff', methods=['GET', 'POST'])
def index():
    return "app.send_static_file('index.html')"

@app.route('/api/message')
def get_current_time():
    return {'data' : "Hello from Flask!" }


