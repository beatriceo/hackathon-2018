'use strict'

var startTime = -1
var collided = false

serverOnGameEnd = function () {
    clearInterval(gameMover)
    document.location.href = "/"
}

serverOnAdvanceScreen = function () {
    frontEndMove()
}

serverOnObstacleDropped = function (obstacle, x, y) {
    //console.log('actually drop an obstacle')
    frontEndPlaceObstacle(obstacle, x, y)
}

serverOnPlayerMove = function (direction) {
    frontEndPlayerMove(direction)
}

frontEndOnCollide = function () {
    if (!collided) {
        collided = true
        var score = Math.floor((Date.now() - startTime) / 1000)
        serverSubmitScore(score)
        serverEndGame()
        if (player = true /* this is a runner */) {
            alert("Your score was " + score)
        }
    }
}

frontEndOnUpArrow = function () {
    var playerPositionY = frontEndGetPlayerPosition()
    console.log('posision', playerPositionY)
    logicCheckUp(playerPositionY)
}

frontEndOnDownArrow = function () {
    var playerPositionY = frontEndGetPlayerPosition()
    logicCheckDown(playerPositionY)
}

frontEndOnObstacleDropped = function (obstacle, x, y) {
    console.log(typeof x, typeof y)
    var midpoint = frontEndGetMidpoint()
    if (x > midpoint) {
        //console.log('obstacle dropped', [x, y])
        logicCheckObstaclePlaceLegal(obstacle, x, y)
    }
}

serverOnGameType = function (type) {
    console.log(type)
    if (type == 'runner') {
        player = true
    } else {
        player = false
    }
}

serverOnGameStart = function () {
    //frontEndGameStart()
    startTime = Date.now()
}

serverOnHighscores = function (highscores) {
    console.log(highscores)
}
