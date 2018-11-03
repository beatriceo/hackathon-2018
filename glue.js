'use strict'

serverOnAdvanceGame = function () {
    frontEndMove()
}

serverOnObstacleDropped = function (obstacle, x, y) {
    frontEndPlaceObstacle(obstacle, x, y)
}

serverOnPlayerMove = function (direction) {
    frontEndPlayerMove(direction)
}

frontEndOnCollide = function () {
    alert('collision!')
}

frontEndOnUpArrow = function () {
    var playerPositionY = frontEndGetPlayerPosition()
    logicCheckUp(playerPositionY)
}

frontEndOnDownArrow = function () {
    var playerPositionY = frontEndGetPlayerPosition()
    logicCheckDown(playerPositionY)
}

frontEndOnObstacleDropped = function (obstacle, x, y) {
    logicCheckObstaclePlaceLegal(obstacle, x, y)
}

