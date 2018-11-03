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
    var valid = logicCheckUp(playerPositionY)
    if (valid) {
        serverPlayerMove('up')
    }
}

frontEndOnDownArrow = function () {
    var playerPositionY = frontEndGetPlayerPosition()
    var valid = logicCheckDown(playerPositionY)
    if (valid) {
        serverPlayerMove('down')
    }
}

frontEndOnObstacleDropped = function (obstacle, x, y) {
    var valid = logicCheckObstaclePlaceLegal(obstacle, x, y)
    if (valid) {
        serverDropObstacle(obstacle, x, y)
    }
}

