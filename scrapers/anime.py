
import requests
import json
from bs4 import BeautifulSoup

def _getAnimeHtmlByID(anime):
    res = requests.get('https://myanimelist.net/anime/' + str(anime))
    if res.status_code != 200:
        raise RuntimeError('status code not 200')
    return res.text

def getAnimeID(anime_name):
    return 37991

def getAnimeName(anime_id):
    bs = BeautifulSoup(_getAnimeHtmlByID(anime_id), 'html.parser')
    spans = bs.find_all('span')
    return [x for x in spans if 'itemprop' in x.attrs and x.attrs['itemprop'] == 'name'][0].text



