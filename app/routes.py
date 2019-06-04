from app import app
from flask import abort, send_from_directory

@app.route('/')
def homego():
    return send_from_directory('layouts', 'home.html')


@app.route('/index')

def index():
    return 'Siema'

#@app.route('/files/<path:path>')
#def send_file(path):
#    return send_from_directory('files', path)

@app.route('/assets/<path:path>')
def send_file_a(path):
    return send_from_directory('assets', path)

@app.route('/layouts/<path:path>')
def send_file_l(path):
    return send_from_directory('layouts', path)