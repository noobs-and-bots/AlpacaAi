
import requests

def safeHTML(url):
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError('status code not 200')
    return res.text

