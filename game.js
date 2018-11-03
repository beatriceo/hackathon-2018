let blockWidth = 100;
let blockHeight = 100;

let scrollPos = 0;
let scrolldiv = document.getElementById("scroll");

let endpos = 0;
let currentpos = 0;

var frontEndOnUpArrow = null;
var frontEndOnDownArrow = null;
var frontEndOnBlockDropped = null;
var frontEndOnCollide = null;

document.addEventListener("keydown", function(e) {
  if (e.keycode == 38 && typeof frontEndOnUpArrow == "function") {
    frontEndOnUpArrow();
  }

  if (e.keycode == 40 && typeof frontEndOnDownArrow == "function") {
    frontEndOnDownArrow();
  }
});

let blocks = scrolldiv.querySelectorAll(".block");
blocks.forEach(function(block) {
  block.addEventListener('click', function() {

    let x = block.parent.id.substr(4);
    let y = block.getAttribute("data-y");

    if (typeof frontEndOnBlockDropped == "function") {
      frontEndOnBlockDropped();
    }
  });
});


function createNewColumn(lastChild) {

  let column = document.createElement("div");
  column.className = "column";
  let columnId = lastChild.id.split("-");

  column.id = `col-${parseInt(columnId.pop()) + 1}`;

  for (let i = 0; i < 5; i++) {
    let block = document.createElement("div");
    block.className  = "block";
    block.setAttribute("data-y", i);
    column.appendChild(block);
  }

  scrolldiv.appendChild(column);

}

function getBlock(x, y) {
  let column = document.getElementById(`col-${y}`);
  let block = column.querySelectorAll(`div[data-y="${x}"]`)[0];
  return block;
}

function checkCollide() {
  let player = document.getElementsByClassName("player")[0];
  let playerRect = player.getBoundingClientRect();

  let obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach(function(obstacle) {
    let obstacleRect = obstacle.getBoundingClientRect();

    let overlap = !(playerRect.right < obstacleRect.left ||
                    playerRect.left > obstacleRect.right ||
                    playerRect.bottom < obstacleRect.top ||
                    playerRect.top > obstacleRect.bottom);

    if (overlap && typeof frontEndOnCollide == "function") {
      frontEndOnCollide();
    }
  });
}

function frontEndMove() {
  endpos += blockWidth;
}

function frontEndPlayerMove(direction) {
  let playerColumn = document.getElementById("player-column");
  let children = playerColumn.children;

  let index = -1;
  for (let i = 0; i < children; i++) {
    if (children[i].classList.contains("player")) {
      index = i;
      children[i].classList.remove("player");
      break;
    }
  }

  if (direction == "up") {
    children[index - 1].classList.add("player");
  } else {
    children[index + 1].classList.add("player");
  }
}

function frontEndOnDropObstacle(type, x, y) {
  let block = getBlock(x, y);
  block.classList.add("obstacle");
}

function frontEndHasObstacle(x, y) {
  let block = getBlock(x, y);
  return block.classList.contains("obstacle");
}

function frontEndPlaceObstacle(obstacle, x, y) {
  let block = getBlock(x, y);
  block.classList.add(`obstacle-${obstacle}`);
}

function frontEndGetPlayerPosition() {
  let playerColumn = document.getElementById("player-column");
  let children = playerColumn.children;

  let index = -1;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains("player")) {
      return index;
    }
  }
  return index;
}

setInterval(function() {
  if (currentpos != endpos) {
    currentpos += 2;

    scrolldiv.style.marginLeft = scrollPos + "px";
    scrollPos -= 2;

    checkCollide();

    if (scrollPos == blockWidth * -1 /* width of column */) {

      let first = scrolldiv.children[0];
      let last = scrolldiv.lastElementChild;

      scrolldiv.removeChild(first);
      createNewColumn(last);
      scrollPos = 0;
      scrolldiv.style.marginLeft = scrollPos + "px";
    }
  }
}, 20)
