'use strict'

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
    console.log('pre:', y)
    //console.log('obstacle dropped', [x, y])
    logicCheckObstaclePlaceLegal(obstacle, x, y)
}
