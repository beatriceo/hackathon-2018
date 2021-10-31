#!/bin/python3

from websocket_server import WebsocketServer
import _thread
import json
import time
import random

MAX_CLIENTS = 2

startGame = False
server = None

def timeTicks():
    global server

    while True:
        if startGame and server:
            msg = {
                "type": "advance"
            }
            server.send_message_to_all(json.dumps(msg))
            time.sleep(0.2)
        else:
            while startGame == False:
                time.sleep(3)
            time.sleep(3)
            server.send_message_to_all('{"type":"gamestart"}')


def newClient(client, server):
    global startGame
    print(str(len(server.clients)) + " clients connected")

    # once we have filled up the clients, start the game
    if len(server.clients) == MAX_CLIENTS:

        runner = random.randint(0, MAX_CLIENTS-1)
        print("runner is " + str(runner))

        for i in range(0, MAX_CLIENTS):
            if i == runner:
                server.send_message(server.clients[i], '{"type":"gametype", "gametype":"runner"}')
            else:
                server.send_message(server.clients[i], '{"type":"gametype", "gametype":"stopper"}')

        startGame = True


def newMessage(client, server, message):
    global startGame

    server.send_message_to_all(message)
    print("relayed message to all:")
    print(message)

    message = json.loads(message)
    type = message['type']
    if type == 'gameend':
        startGame = False
        print("stopped game")
    elif type == 'submitscore':
        score = message['score']
        with open('scores.json', 'r') as f:
            scores = json.load(f)
        scores.append(score)
        with open('scores.json', 'w') as f:
            json.dump(scores, f)


_thread.start_new_thread(timeTicks, ())

PORT=7624

server = WebsocketServer(port=PORT)
server.set_fn_message_received(newMessage)
server.set_fn_new_client(newClient)
server.run_forever()
