# -*- coding: utf-8 -*-
#!/bin/python3

import bottle
import socket
import json
import struct

# static files (js/css/etc)
@bottle.route('/static/<filepath:path>')
def static(filepath):
    return bottle.static_file(filepath, root='..')

@bottle.route('/')
@bottle.route('index.html')
def index2():
    bottle.redirect('../static/index.html', 301)


@bottle.route('/highscores')
def highscores():
    with open('scores.json', 'r') as f:
        highscores = json.load(f)
    highscores.sort(reverse=True)
    highscores = highscores[:10]
    return bottle.template('highscores', highscores=highscores)

bottle.run(host='', port=8080)
