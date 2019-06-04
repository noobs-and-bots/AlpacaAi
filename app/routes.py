from app import app
from flask import abort, send_from_directory, request, jsonify

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

@app.route('/get_recommendation/user/<string:uuu>', methods=['POST', 'GET'])
def userrec(uuu):
    return jsonify([ uuu,'a','b','c'])

@app.route('/get_recommendation/title/<string:ttt>', methods=['POST', 'GET'])
def titlerec(ttt):
    return jsonify([ ttt,'x','y','z'])

from scrapers import anime

@app.route('/scrapper/id/<string:str>')
def animeid(str):
    return jsonify(anime.getAnimeID(str))