from app import app
from flask import abort, send_from_directory, request, jsonify
import numpy as np

@app.route('/')
def homego():
    return send_from_directory('layouts', 'home.html')


@app.route('/index')

def index():
    return 'Siema'

#@app.route('/files/<path:path>')
#def send_file(path):
#    return send_from_directory('files', path)

@app.route('/assets/<path:path>', methods=['POST', 'GET'])
def send_file_a(path):
    return send_from_directory('assets', path)

@app.route('/layouts/<path:path>', methods=['POST', 'GET'])
def send_file_l(path):
    return send_from_directory('layouts', path)

@app.route('/get_recommendation/user/<string:uuu>', methods=['POST', 'GET'])
def userrec(uuu):
    return jsonify( ['234'] )

@app.route('/get_recommendation/id/<int:ttt>', methods=['POST', 'GET'])
def titlerec(ttt):
    return jsonify([234,5081,14813,4224])

from scrapers import anime

@app.route('/scrapper/id/<string:str>', methods=['POST', 'GET'])
def animeid(str):
    try:
        x =  jsonify(anime.getAnimeID(str))
    except:
        abort(503)
    return x

@app.route('/scrapper/name/<int:str>', methods=['POST', 'GET'])
def animename(str):
    try:
        x = jsonify(anime.getAnimeName(str))
    except:
        abort(503)
    return x