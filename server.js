'use strict'

/*
 * this implements the following functions:
 *  - serverDropBlock(block, x, y)
 *  - serverPlayerMove(direction)
 *
 * and the following events:
 *  - serverOnGameStart()
 *  - serverOnAdvanceScreen()
 *  - serverOnBlockDropped(block, x, y)
 *  - serverOnPlayerMove(direction)
 */

var websocket = new WebSocket("ws://" + window.location.hostname + ":7624/")
var websocketConnected = false


var serverOnGameStart = null
var serverOnGameEnd = null
var serverOnAdvanceScreen = null
var serverOnObstacleDropped = null
var serverOnPlayerMove = null
var serverOnGameType = null
var serverOnHighscores = null


function serverDropObstacle(obstacle, x, y) {
    //console.log('currently: ', [x, y])
    if (websocketConnected) {
        var msg = {
            type: 'dropobstacle',
            obstacle: obstacle,
            x: x,
            y: y
        }
        websocket.send(JSON.stringify(msg))
    }
}


function serverPlayerMove(direction) {
    if (websocketConnected) {
        var msg = {
            type: 'playermove',
            direction: direction
        }
        websocket.send(JSON.stringify(msg))
    }
}


function serverEndGame() {
    if (websocketConnected) {
        var msg = {
            type: 'gameend'
        }
        websocket.send(JSON.stringify(msg))
    }
}


function serverSubmitScore(score) {
    if (websocketConnected) {
        var msg = {
            type: 'submitscore',
            score: score
        }
        websocket.send(JSON.stringify(msg))
    }
}


function serverGetScores() {
    if (websocketConnected) {
        var msg = {
            type: 'getscores'
        }
        websocket.send(JSON.stringify(msg))
    }
}


websocket.onopen = function (evt) {
    console.log('websocket connected')
    websocketConnected = true
}
websocket.onerror = function (evt) {
    console.error('websocket error', evt.data)
    websocketConnected = false
}
websocket.onclose = function (evt) {
    console.error('websocket closed')
    websocketConnected = false
}


websocket.onmessage = function(evt) {
    var message = evt.data
    try {
        message = JSON.parse(message)
    } catch (e) {
        console.error('unable to parse JSON message')
        return
    }

    // process the messages
    var type = message.type
    //console.log(type)
    switch (type) {
        case 'playermove':
            if (typeof serverOnPlayerMove === 'function') {
                var direction = message.direction
                serverOnPlayerMove(direction)
            }
            break

        case 'advance':
            if (typeof serverOnAdvanceScreen === 'function') {
                serverOnAdvanceScreen()
            }
            break

        case 'dropobstacle':
            if (typeof serverOnObstacleDropped === 'function') {
                var obstacle = message.obstacle
                var x = message.x
                var y = message.y
                serverOnObstacleDropped(obstacle, x, y)
            }
            break

        case 'gametype':
            if (typeof serverOnGameType === 'function') {
                var gametype = message.gametype
                serverOnGameType(gametype)
            }
            break

        case 'gamestart':
            if (typeof serverOnGameStart === 'function') {
                serverOnGameStart()
            }
            break

        case 'gameend':
            if (typeof serverOnGameEnd === 'function') {
                serverOnGameEnd()
            }
            break

        case 'highscores':
            if (typeof serverOnHighscores === 'function') {
                var scores = message.scores
                serverOnHighscores(scores)
            }
            break
    }

    //console.log('message received', message)
}
