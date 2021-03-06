// A varaiable to set the final score needed to win the game
var FINAL_SCORE = 5;
var MAX_BOARD_HEIGHT = 5;
var TABLE_LENGTH = 10;
var OBSTACLE = 0;


function logicCheckUp(currPosition) {
    console.log(currPosition)
    if(currPosition != 0) {
      serverPlayerMove("up");
    }
}

function logicCheckDown(currPosition) {
  if(currPosition != MAX_BOARD_HEIGHT-1) {
    serverPlayerMove("down");
  }
}

/*function hasObstacle(x,y) {
  if(frontEndHasObstacle(x, y)) {
    return true;
  }
  else {
    return false;
  }
}*/

function logicCheckObstaclePlaceLegal(obstacle, x, y) {
    console.log(obstacle)
  // First check the obstacle can be placed in the current position
  if(frontEndHasObstacle(x,y)) {
    return false;
  }


  // Second check that the obstacle isn't in the vicinity of a surrounding obstacle
  for(var i = -1; i <= 1; i++) {
    for(var j = -1; j <= 1; j++) {
      let xOffset = x+i;
      let yOffset = y+j;

      if (!(x == xOffset && y == yOffset)) {
          console.log(xOffset, yOffset)
          if (frontEndSquareExists(xOffset, yOffset)) {
        //if((!(xOffset < 0 || xOffset > MAX_BOARD_HEIGHT) && !(yOffset < 0 || yOffset > TABLE_LENGTH))) {
          //console.log("x "+xOffset+" y "+yOffset);
          if(frontEndHasObstacle(xOffset,yOffset)) {
            return false;
          }
        }
      }

    }
  }

  // If all the tests have passed, activate this method from the server
  console.log(obstacle)
  serverDropObstacle(obstacle,x,y);
}
