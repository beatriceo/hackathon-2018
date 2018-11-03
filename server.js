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

var websocket = new WebSocket('ws://127.0.0.1:7624/')
var websocketConnected = false


var serverOnGameStart = null
var serverOnAdvanceScreen = null
var serverOnBlockDropped = null
var serverOnPlayerMove = null


function serverDropBlock(block, x, y) {
    if (websocketConnected) {
        var msg = {
            type: 'dropblock',
            block: block
            x: x,
            y: y
        }
        websocket.send(msg)
    }
}


function serverPlayerMove(direction) {
    if (websocketConnected) {
        var msg = {
            type: 'playermove',
            direction: direction
        }
        websocket.send(msg)
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

        case 'blockdrop':
            if (typeof serverOnBlockDropped === 'function') {
                var block = message.block
                var x = message.x
                var y = message.y
                serverOnBlockDropped(block, x, y)
            }
            break

        case 'gamestart':
            if (typeof serverOnGameStart === 'function') {
                serverOnGameStart()
            }
            break
    }

    console.log('message received', message)
}
