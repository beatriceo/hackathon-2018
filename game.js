let blockWidth = 100;
let blockHeight = 100;

let scrollPos = 0;
let scrolldiv = document.getElementById("scroll");

let endpos = 0;
let currentpos = 0;

function move() {
  endpos += blockWidth;
}

function createNewColumn(lastChild) {

  let column = document.createElement("div");
  column.className = "column";
  let columnId = lastChild.id.split("-");

  column.id = `col-${parseInt(columnId.pop()) + 1}`;

  for (let i = 0; i < 5; i++) {
    let block = document.createElement("div");
    block.className  = `block block-${i}`;
    column.appendChild(block);
  }

  scrolldiv.appendChild(column);

}

setInterval(function() {
  if (currentpos != endpos) {
    currentpos += 2;

    scrolldiv.style.marginLeft = scrollPos + "px";
    scrollPos -= 2;

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
