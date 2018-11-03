'use strict'

serverOnGameEnd = function () {
    clearInterval(gameMover)
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
    //alert('collision!')
    serverEndGame()
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
    if (type == 'runner') {
        player = true
    } else {
        player = false
    }
}
