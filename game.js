let blockWidth = 100;
let blockHeight = 100;

let scrollPos = 0;
let scrolldiv = document.getElementById("scroll");

let endpos = 0;
let currentpos = 0;

var frontEndOnUpArrow = null;
var frontEndOnDownArrow = null;
var frontEndOnObstacleDropped = null;
var frontEndOnCollide = null;

if (typeof player != "undefined" && player) {
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 38 && typeof frontEndOnUpArrow == "function") {
      frontEndOnUpArrow();
    }

    if (e.keyCode == 40 && typeof frontEndOnDownArrow == "function") {
      frontEndOnDownArrow();
    }
  });
}

let blocks = scrolldiv.querySelectorAll(".block");
blocks.forEach(function(block) {
  if (typeof player != "undefined" && !player) {
    block.addEventListener('click', function() {

      let x = block.parentElement.id.substr(4);
      let y = block.getAttribute("data-y");

      if (typeof frontEndOnObstacleDropped == "function") {
        frontEndOnObstacleDropped(0, x, y);
      }
    });
  }
});


function createNewColumn(lastChild) {

  let column = document.createElement("div");
  column.className = "column";
  let columnId = lastChild.id.split("-");

  var x = parseInt(columnId.pop()) + 1
  column.id = `col-${x}`;

  for (let i = 0; i < 5; i++) {
    let block = document.createElement("div");
    block.className  = "block";
    block.setAttribute("data-y", i);

    if (typeof player != "undefined" && !player) {
      block.addEventListener('click', function() {
        //let x = block.parent.id.substr(4);
        let y = i;

        if (typeof frontEndOnObstacleDropped == "function") {
          frontEndOnObstacleDropped(0, x, y);
        }
      });
    }

    column.appendChild(block);
  }

  scrolldiv.appendChild(column);

}

function getBlock(x, y) {
  let column = document.getElementById(`col-${x}`);
  let block = column.querySelectorAll(`div[data-y="${y}"]`)[0];
  return block;
}

function checkCollide() {
  let player = document.getElementsByClassName("player")[0];
  let playerRect = player.getBoundingClientRect();

  let obstacles = document.querySelectorAll('div[class*="obstacle-"]');

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
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains("player")) {
      index = i;
      children[i].classList.remove("player");
      break;
    }
  }

  console.log('index is', index)

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

function frontEndSquareExists(x, y) {
    let column = document.getElementById(`col-${x}`);
    if (column == null) {
        return false
    }

    let block = column.querySelectorAll(`div[data-y="${y}"]`);
    return block.length != 0
}

function frontEndHasObstacle(x, y) {
  let block = getBlock(x, y);
  for (var i = 0; i < block.classList.length; i++) {
      if (block.classList[i].indexOf('obstacle-') != -1) {
          return true
      }
  }
  //return block.classList.contains("obstacle");
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
      return i;
    }
  }
  return index;
}

function frontEndGetMidpoint() {
  let columns = document.getElementsByClassName("column");
  let middle = columns[Math.floor(columns.length / 2)];
  return middle.id.substr(4);
}

var gameMover = setInterval(function() {
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
