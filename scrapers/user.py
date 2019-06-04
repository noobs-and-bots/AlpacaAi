
import requests
import json
from bs4 import BeautifulSoup

def _getUserHtml(user):
    res = requests.get('https://myanimelist.net/animelist/' + user + '?status=2)')
    if res.status_code != 200:
        raise RuntimeError('status code not 200')
    return res.text

def getUserData(user):
    bs = BeautifulSoup(_getUserHtml(user), 'html.parser')
    tables = bs.find_all('table')
    result = dict()
    for table in tables:
        j = json.loads(table.attrs['data-items'])
        for record in j:
            if record['score'] != 0:
                result[record['anime_id']] = record['score']
    return result

