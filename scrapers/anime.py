
import requests
import json
import urllib.parse
import re

from bs4 import BeautifulSoup

def safeHTML(url):
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError('status code not 200')
    return res.text

def _getAnimeHtmlByID(anime):
    return safeHTML('https://myanimelist.net/anime/' + str(anime))
def _getSearchHTML(search):
    return safeHTML('https://myanimelist.net/search/all?q=' + urllib.parse.quote(search))


def getAnimeID(anime_name):
    bs = BeautifulSoup(_getSearchHTML(anime_name), 'html.parser')
    s = bs.find('article').find('a').attrs['href']
    return re.findall('\d+', s)[0]

ugly_dict = dict()

def getAnimeName(anime_id):
    anime_id = str(anime_id)
    if not anime_id in ugly_dict:
        bs = BeautifulSoup(_getAnimeHtmlByID(anime_id), 'html.parser')
        spans = bs.find_all('span')
        ugly_dict[anime_id] = [x for x in spans if 'itemprop' in x.attrs and x.attrs['itemprop'] == 'name'][0].text
    return ugly_dict[anime_id]


