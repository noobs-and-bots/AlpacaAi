
import requests
import json
from bs4 import BeautifulSoup

def getAnimeHtml(anime):
    res = requests.get('https://myanimelist.net/anime/' + str(anime))
    if res.status_code != 200:
        raise RuntimeError('status code not 200')
    return res.text

def getAnimeID(user):
    return 37991

def getAnimeName(anime_id):
    return 'JOJO'




