// A varaiable to set the final score needed to win the game
global let FINAL_SCORE = 5;

function processInput(input) {
  // Check the input that has been recieved
  // Determine which functions need to be called
  // If the funtions return false, then don't send anything to the network
  // If unknown input is recieved don't act upon it

}


function checkUp(currPosition) {
  // See if the user would be moving to a -ve positon in the table
  // If not move them up by one block and return true
  // Otherwise do not move them and return false
}

function checkDown(currPosition) {
  // See if the user would be moving to a value greater than the height of the table
  // If not move them down by one block and return true
  // Otherwise do not move them and return false
}

function checkCollision(currRunnner, currObstacle) {
  // Have a switch case menu that will determine what the user has collided with
  // Then run an appropritate method, then check if the method was executed successfully
  // If it wasn't return false
}

function checkFinished(currRunnner) {
  // Will check the runner has reached the finish line
  // If so they will be awarded a point, then checks if they have won
}

function checkWin(currPlayer) {
  // Check if a player has gotten enough points to win
  // If so the game ends and they win
}

function executeDeath(currRunner, successfulStopper) {
  // If the currRunner is hit with a block, then the stopper will receive a point
  // Then checked if they have won
}

function checkPathLegal() {
  // Will read the table, checks if the runner can navigate through the table
  // If there are no possible paths found, return false
}

function checkCanPlaceBlock(droppedPos) {
  // Checks in the table if the current position is taken
  // If not place the block there and replace true
}
